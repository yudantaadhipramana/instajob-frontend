'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import ProfileDropdown from '@/components/ProfileDropdown';
import { ArrowLeft, Calendar, CheckCircle, Tag, Loader } from 'lucide-react';

interface User { id: string; email: string; fullName: string; }

const ADDONS: Record<string, {
  title: string; description: string; longDesc: string; price: number;
  instructor: string; duration: string; type: string;
  highlights: string[]; curriculum: string[]; dates: string[];
  badge?: string;
}> = {
  'cv-booster': {
    title: 'Kelas CV Booster',
    badge: '🔥 Terpopuler',
    type: 'class',
    price: 60000,
    instructor: 'Tim InstaJob',
    duration: '2 jam',
    description: 'Optimalkan CV agar lolos ATS dan menarik HRD.',
    longDesc: 'Workshop intensif 2 jam untuk membuat CV yang lolos sistem ATS (Applicant Tracking System) dan langsung menarik perhatian HRD. Kamu akan mendapat template premium eksklusif, review 1-on-1 dari mentor berpengalaman, dan rekaman kelas untuk review ulang kapanpun.',
    highlights: ['Template CV premium', 'Review 1-on-1 mentor', 'Tips lolos ATS', 'Rekaman kelas', 'Certificate of completion'],
    curriculum: [
      'Anatomi CV yang memenangkan interview',
      'ATS optimization: keyword dan formatting',
      'Personal branding dalam 6 detik pertama',
      'Workshop: tulis ulang CV kamu live',
      'Review & feedback sesi Q&A',
    ],
    dates: [
      'Sabtu, 26 Jul 2026 — 10:00 WIB',
      'Sabtu, 2 Agu 2026 — 10:00 WIB',
      'Sabtu, 9 Agu 2026 — 10:00 WIB',
      'Sabtu, 16 Agu 2026 — 10:00 WIB',
    ],
  },
  'portfolio-booster': {
    title: 'Kelas Portfolio Booster',
    badge: '⭐ Rekomendasi',
    type: 'class',
    price: 60000,
    instructor: 'Tim InstaJob',
    duration: '2 jam',
    description: 'Bangun portfolio standout untuk developer, designer, dan marketer.',
    longDesc: 'Workshop praktis membangun portfolio profesional yang membedakan kamu dari ratusan kandidat lain. Cocok untuk developer, designer, dan marketer yang ingin tampil standout. Praktik langsung + feedback dari mentor industri.',
    highlights: ['Framework portfolio', 'Case study nyata', 'Feedback mentor live', 'Rekaman kelas', 'Certificate of completion'],
    curriculum: [
      'Framework portfolio yang convert',
      'Pilih & presentasi project terbaik',
      'Personal website vs PDF portfolio',
      'Workshop: buat section "About" yang kuat',
      'Review & feedback sesi Q&A',
    ],
    dates: [
      'Minggu, 27 Jul 2026 — 13:00 WIB',
      'Minggu, 3 Agu 2026 — 13:00 WIB',
      'Minggu, 10 Agu 2026 — 13:00 WIB',
    ],
  },
  'ai-interview-coach': {
    title: 'AI Interview Coach',
    badge: '🤖 AI-Powered',
    type: 'tool',
    price: 49000,
    instructor: 'AI InstaJob',
    duration: 'Akses 30 hari',
    description: 'Latihan interview berbasis AI dengan simulasi pertanyaan nyata.',
    longDesc: 'Platform latihan interview AI yang mensimulasikan pertanyaan HRD dan user interview dari perusahaan top Indonesia. Dapat feedback real-time, analisis performa, dan tips negosiasi gaji berdasarkan role & industri kamu.',
    highlights: ['100+ pertanyaan interview', 'Feedback AI real-time', 'Tips negosiasi gaji', 'Akses 30 hari penuh', 'Progress tracking'],
    curriculum: [
      'Simulasi behavioral interview (STAR method)',
      'Simulasi technical interview per role',
      'Tips negosiasi gaji & benefits',
      'Common pitfalls & cara hindarinya',
      'Progress report & area improvement',
    ],
    dates: [],
  },
};

export default function AddOnDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [voucher, setVoucher] = useState('');
  const [voucherStatus, setVoucherStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherMsg, setVoucherMsg] = useState('');
  const [redeemToken, setRedeemToken] = useState(false);
  const [processing, setProcessing] = useState(false);

  const addon = ADDONS[id];

  useEffect(() => {
    const token = localStorage.getItem('instajob_token');
    const userData = localStorage.getItem('instajob_user');
    if (!token || !userData) { router.push('/login'); return; }
    setUser(JSON.parse(userData));

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
    fetch(`${apiBase}/api/user/tokens`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setTokens(d.careerBoosterTokens || 0); })
      .catch(() => {});
  }, [router]);

  if (!addon) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <p style={{ fontSize: '18px', fontWeight: '700', color: '#64748B' }}>Add-on tidak ditemukan</p>
      <Link href="/add-ons" style={{ color: 'var(--color-primary)', fontWeight: '700', textDecoration: 'none' }}>← Kembali ke Add-ons</Link>
    </div>
  );

  const hasToken = tokens > 0 && addon.type === 'class';
  const finalPrice = redeemToken && hasToken ? 0 : Math.max(0, addon.price - voucherDiscount);

  const validateVoucher = async () => {
    if (!voucher.trim()) return;
    setVoucherStatus('loading');
    try {
      const token = localStorage.getItem('instajob_token');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
      const res = await fetch(`${apiBase}/api/vouchers/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ code: voucher, addonId: id }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setVoucherStatus('valid');
        setVoucherDiscount(data.discountAmount || 0);
        setVoucherMsg(data.message || `Diskon Rp ${(data.discountAmount || 0).toLocaleString('id-ID')}`);
      } else {
        setVoucherStatus('invalid');
        setVoucherMsg(data.message || 'Voucher tidak valid');
        setVoucherDiscount(0);
      }
    } catch {
      setVoucherStatus('invalid');
      setVoucherMsg('Gagal memvalidasi voucher');
    }
  };

  const handlePurchase = async () => {
    if (addon.dates.length > 0 && !selectedDate) {
      alert('Pilih tanggal kelas terlebih dahulu');
      return;
    }
    setProcessing(true);
    try {
      const token = localStorage.getItem('instajob_token');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

      if (redeemToken && hasToken) {
        const res = await fetch(`${apiBase}/api/addons/${id}/activate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ selectedDate, useToken: true }),
        });
        const data = await res.json();
        if (res.ok) {
          alert(`Berhasil! Kelas ${addon.title} pada ${selectedDate} sudah terdaftar.`);
          router.push('/add-ons');
        } else {
          alert(data.message || 'Gagal redeem token');
        }
      } else {
        const res = await fetch(`${apiBase}/api/payments/create-addon-invoice`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ addonId: id, selectedDate, voucherCode: voucherStatus === 'valid' ? voucher : undefined }),
        });
        const data = await res.json();
        if (res.ok && data.invoiceUrl) {
          window.location.href = data.invoiceUrl;
        } else {
          alert(data.message || 'Gagal membuat invoice');
        }
      }
    } catch {
      alert('Terjadi kesalahan. Coba lagi.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)', padding: '0 40px',
        height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link href="/add-ons" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Kembali
        </Link>
        <Logo size={28} showText={true} />
        <ProfileDropdown user={user || undefined} />
      </header>

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
        {/* Left: Detail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Title section */}
          <div>
            {addon.badge && (
              <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: '700', padding: '3px 12px', borderRadius: '20px', background: 'rgba(30,64,255,0.08)', color: 'var(--color-primary)', marginBottom: '12px' }}>
                {addon.badge}
              </span>
            )}
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.02em' }}>{addon.title}</h1>
            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748B', fontWeight: '600' }}>
              <span>👤 {addon.instructor}</span>
              <span>⏱ {addon.duration}</span>
            </div>
          </div>

          {/* Long desc */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid var(--color-border)', padding: '24px' }}>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7', margin: 0, fontWeight: '500' }}>{addon.longDesc}</p>
          </div>

          {/* Highlights */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid var(--color-border)', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: '0 0 16px' }}>Yang kamu dapat</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {addon.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={15} color="#10B981" />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid var(--color-border)', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: '0 0 16px' }}>Materi kelas</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {addon.curriculum.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ minWidth: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', fontSize: '11px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151', lineHeight: '1.5', paddingTop: '3px' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Purchase panel */}
        <div style={{ position: 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '24px', boxShadow: '0 4px 20px rgba(15,23,42,0.07)' }}>
            {/* Price */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-primary)', margin: '0 0 2px', fontFamily: 'var(--font-heading)' }}>
                {finalPrice === 0 ? 'GRATIS 🎟️' : `Rp ${finalPrice.toLocaleString('id-ID')}`}
              </p>
              {finalPrice < addon.price && (
                <p style={{ fontSize: '12px', color: '#94A3B8', textDecoration: 'line-through', margin: 0 }}>
                  Rp {addon.price.toLocaleString('id-ID')}
                </p>
              )}
            </div>

            {/* Token redeem option */}
            {hasToken && (
              <div style={{
                padding: '12px 16px', borderRadius: '10px', marginBottom: '16px',
                background: redeemToken ? 'rgba(245,158,11,0.08)' : '#F8FAFC',
                border: `1.5px solid ${redeemToken ? '#F59E0B' : 'var(--color-border)'}`,
                cursor: 'pointer',
              }} onClick={() => setRedeemToken(!redeemToken)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: `2px solid ${redeemToken ? '#F59E0B' : '#CBD5E1'}`, background: redeemToken ? '#F59E0B' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {redeemToken && <span style={{ color: '#fff', fontSize: '11px', fontWeight: '900' }}>✓</span>}
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#92400E', margin: 0 }}>🎟️ Gunakan token Career Booster</p>
                    <p style={{ fontSize: '11px', color: '#B45309', margin: '2px 0 0', fontWeight: '600' }}>Kamu punya {tokens}x token — kelas jadi gratis!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Date picker (for classes) */}
            {addon.dates.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#374151', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="var(--color-primary)" /> Pilih tanggal kelas
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {addon.dates.map((d) => (
                    <button key={d} onClick={() => setSelectedDate(d)} style={{
                      padding: '9px 14px', borderRadius: '8px', textAlign: 'left',
                      border: `1.5px solid ${selectedDate === d ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      background: selectedDate === d ? 'rgba(30,64,255,0.04)' : '#fff',
                      color: selectedDate === d ? 'var(--color-primary)' : '#64748B',
                      fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: 'var(--font-body)',
                    }}>
                      📅 {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Voucher (only if not using token) */}
            {!redeemToken && (
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#374151', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Tag size={13} color="var(--color-primary)" /> Kode voucher (opsional)
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input value={voucher} onChange={e => { setVoucher(e.target.value.toUpperCase()); setVoucherStatus('idle'); }}
                    onKeyDown={e => e.key === 'Enter' && validateVoucher()}
                    placeholder="Masukkan kode"
                    style={{ flex: 1, padding: '9px 12px', border: `1.5px solid ${voucherStatus === 'valid' ? '#10B981' : voucherStatus === 'invalid' ? '#EF4444' : 'var(--color-border)'}`, borderRadius: '8px', fontSize: '12px', fontWeight: '700', fontFamily: 'var(--font-body)', outline: 'none', background: '#F8FAFC', letterSpacing: '0.05em' }} />
                  <button onClick={validateVoucher} disabled={!voucher.trim() || voucherStatus === 'loading'}
                    style={{ padding: '9px 14px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: 'var(--font-body)', opacity: !voucher.trim() ? 0.5 : 1 }}>
                    {voucherStatus === 'loading' ? <Loader size={12} /> : 'Pakai'}
                  </button>
                </div>
                {voucherStatus !== 'idle' && voucherStatus !== 'loading' && (
                  <p style={{ fontSize: '11px', margin: '6px 0 0', fontWeight: '700', color: voucherStatus === 'valid' ? '#10B981' : '#EF4444' }}>
                    {voucherStatus === 'valid' ? '✓' : '✗'} {voucherMsg}
                  </p>
                )}
              </div>
            )}

            {/* CTA */}
            <button onClick={handlePurchase} disabled={processing}
              style={{
                width: '100%', padding: '14px',
                background: processing ? '#94A3B8' : redeemToken ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'linear-gradient(135deg, #1E3A8A, #1E40FF)',
                color: '#fff', border: 'none', borderRadius: '12px',
                fontWeight: '700', fontSize: '14px', cursor: processing ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
              {processing ? <><Loader size={15} /> Memproses...</> : redeemToken ? '🎟️ Redeem Token — Gratis' : `🔒 Bayar Rp ${finalPrice.toLocaleString('id-ID')}`}
            </button>

            <p style={{ textAlign: 'center', fontSize: '11px', color: '#CBD5E1', margin: '10px 0 0', fontWeight: '600' }}>
              {redeemToken ? 'Token dipotong setelah konfirmasi' : 'Pembayaran aman via Xendit'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
