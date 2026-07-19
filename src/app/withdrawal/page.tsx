'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import ProfileDropdown from '@/components/ProfileDropdown';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle, Loader, Clock } from 'lucide-react';

interface User { id: string; email: string; fullName: string; }
interface BankAccount { bank: string; accountNumber: string; accountName: string; }
interface Transfer { id: string; amount: number; status: 'paid' | 'pending' | 'processing'; date: string; method: string; }

const API = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

export default function WithdrawalPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [paidTotal, setPaidTotal] = useState(0);
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);

  // Bank form
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [savingBank, setSavingBank] = useState(false);
  const [bankMsg, setBankMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Confirm dialog
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmStep, setConfirmStep] = useState(0); // 0=hidden,1=step1,2=step2
  const [confirmInput, setConfirmInput] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('instajob_token');
    const ud = localStorage.getItem('instajob_user');
    if (!token || !ud) { router.push('/login'); return; }
    setUser(JSON.parse(ud));

    Promise.all([
      fetch(`${API}/api/referral/my-code`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : null),
      fetch(`${API}/api/withdrawal/bank-account`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : null),
      fetch(`${API}/api/withdrawal/history`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : null),
    ]).then(([codeData, bankData, histData]) => {
      if (codeData) {
        const stats = codeData.data?.stats || codeData.stats || codeData.data || codeData;
        setBalance(stats.earningsThisMonth ?? stats.monthlyEarnings ?? 0);
        setPendingBalance(stats.pendingBalance ?? 0);
        setPaidTotal(stats.earningsTotal ?? stats.totalEarnings ?? 0);
      }
      if (bankData?.bankAccount) {
        setBankAccount(bankData.bankAccount);
        setBank(bankData.bankAccount.bank || '');
        setAccountNumber(bankData.bankAccount.accountNumber || '');
        setAccountName(bankData.bankAccount.accountName || '');
      }
      if (histData) {
        setTransfers((histData.transfers || histData.data || []).slice(0, 10));
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, [router]);

  const saveBank = async () => {
    if (!bank || !accountNumber || !accountName) return;
    // Multi-confirm flow
    if (confirmStep === 0) { setShowConfirm(true); setConfirmStep(1); return; }
  };

  const handleConfirmStep1 = () => { setConfirmStep(2); setConfirmInput(''); };
  const handleConfirmStep2 = async () => {
    if (confirmInput.toLowerCase() !== 'konfirmasi') return;
    setSavingBank(true);
    setShowConfirm(false); setConfirmStep(0); setConfirmInput('');
    try {
      const token = localStorage.getItem('instajob_token');
      const res = await fetch(`${API}/api/withdrawal/bank-account`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ bank, accountNumber, accountName }),
      });
      const data = await res.json();
      if (res.ok) {
        setBankAccount({ bank, accountNumber, accountName });
        setBankMsg({ type: 'success', text: 'Rekening berhasil disimpan.' });
      } else {
        setBankMsg({ type: 'error', text: data.message || 'Gagal menyimpan rekening.' });
      }
    } catch { setBankMsg({ type: 'error', text: 'Terjadi kesalahan.' }); }
    finally { setSavingBank(false); }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <Logo size={48} showText={true} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'var(--font-body)' }}>
      <header style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <Logo size={28} showText={true} />
        <ProfileDropdown user={user || undefined} />
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', margin: 0 }}>Penarikan Dana 💰</h1>

        {/* Balance cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { label: 'Siap Ditarik', value: balance, color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
            { label: 'Menunggu (30 hari)', value: pendingBalance, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
            { label: 'Total Dibayar', value: paidTotal, color: '#1E40FF', bg: 'rgba(30,64,255,0.08)' },
          ].map(c => (
            <div key={c.label} style={{ background: c.bg, border: `1px solid ${c.color}30`, borderRadius: '14px', padding: '20px' }}>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 6px', fontWeight: '600' }}>{c.label}</p>
              <p style={{ fontSize: '22px', fontWeight: '900', color: c.color, margin: 0 }}>Rp {c.value.toLocaleString('id-ID')}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#FEF9C3', border: '1px solid #FDE047', borderRadius: '10px', padding: '12px 16px' }}>
          <p style={{ fontSize: '13px', color: '#713F12', margin: 0, fontWeight: '600' }}>
            ⚠️ Transfer dilakukan setiap Jumat oleh admin ke rekening terdaftar. Minimum saldo Rp 50.000.
          </p>
        </div>

        {/* Bank account */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '28px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} color="var(--color-primary)" /> Rekening Bank
          </h2>
          {bankAccount && (
            <div style={{ background: 'rgba(30,64,255,0.04)', border: '1px solid rgba(30,64,255,0.15)', borderRadius: '10px', padding: '14px 18px', marginBottom: '20px', display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '11px', color: '#94A3B8', margin: '0 0 2px', fontWeight: '700', textTransform: 'uppercase' }}>Bank</p>
                <p style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', margin: 0 }}>{bankAccount.bank}</p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#94A3B8', margin: '0 0 2px', fontWeight: '700', textTransform: 'uppercase' }}>No. Rekening</p>
                <p style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', margin: 0 }}>{bankAccount.accountNumber}</p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#94A3B8', margin: '0 0 2px', fontWeight: '700', textTransform: 'uppercase' }}>Nama</p>
                <p style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', margin: 0 }}>{bankAccount.accountName}</p>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Nama Bank</label>
              <input value={bank} onChange={e => setBank(e.target.value)} placeholder="BCA / BNI / Mandiri / ..." style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--color-border)', borderRadius: '8px', fontSize: '13px', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>No. Rekening</label>
              <input value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="1234567890" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--color-border)', borderRadius: '8px', fontSize: '13px', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Nama Pemilik Rekening</label>
              <input value={accountName} onChange={e => setAccountName(e.target.value)} placeholder="Sesuai buku tabungan" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--color-border)', borderRadius: '8px', fontSize: '13px', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>

          {bankMsg && (
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: bankMsg.type === 'success' ? '#10B981' : '#EF4444', fontWeight: '600' }}>
              {bankMsg.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />} {bankMsg.text}
            </div>
          )}

          <button onClick={saveBank} disabled={savingBank || !bank || !accountNumber || !accountName}
            style={{ marginTop: '16px', padding: '11px 24px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)', opacity: !bank || !accountNumber || !accountName ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
            {savingBank ? <><Loader size={13} /> Menyimpan...</> : 'Simpan Rekening'}
          </button>
        </div>

        {/* Transfer history */}
        {transfers.length > 0 && (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '28px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: '0 0 16px' }}>Riwayat Transfer</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {transfers.map(t => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {t.status === 'paid' ? <CheckCircle size={16} color="#10B981" /> : <Clock size={16} color="#F59E0B" />}
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', margin: 0 }}>Rp {t.amount.toLocaleString('id-ID')}</p>
                      <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0 }}>{new Date(t.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', background: t.status === 'paid' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: t.status === 'paid' ? '#10B981' : '#D97706' }}>
                    {t.status === 'paid' ? 'Selesai' : 'Diproses'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Multi-confirm modal */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '18px', padding: '32px', maxWidth: '400px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            {confirmStep === 1 ? (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '0 0 12px' }}>⚠️ Perhatian!</h3>
                <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 8px', lineHeight: 1.6 }}>
                  Pastikan data rekening <strong>sudah benar</strong>. Kesalahan data rekening bisa menyebabkan transfer gagal dan proses koreksi membutuhkan waktu.
                </p>
                <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 20px' }}>Bank: <strong>{bank}</strong> — No: <strong>{accountNumber}</strong> — Nama: <strong>{accountName}</strong></p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => { setShowConfirm(false); setConfirmStep(0); }} style={{ flex: 1, padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', background: '#fff', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>Koreksi Data</button>
                  <button onClick={handleConfirmStep1} style={{ flex: 1, padding: '10px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>Data Sudah Benar</button>
                </div>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '0 0 12px' }}>Konfirmasi Final</h3>
                <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 16px', lineHeight: 1.6 }}>Ketik <strong>KONFIRMASI</strong> untuk menyimpan rekening.</p>
                <input value={confirmInput} onChange={e => setConfirmInput(e.target.value)} placeholder="KONFIRMASI"
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--color-border)', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box', letterSpacing: '0.05em', fontWeight: '700' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => { setShowConfirm(false); setConfirmStep(0); }} style={{ flex: 1, padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', background: '#fff', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>Batal</button>
                  <button onClick={handleConfirmStep2} disabled={confirmInput.toLowerCase() !== 'konfirmasi'}
                    style={{ flex: 1, padding: '10px', background: confirmInput.toLowerCase() === 'konfirmasi' ? '#10B981' : '#CBD5E1', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>Simpan</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
