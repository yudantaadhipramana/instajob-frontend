'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import HeaderActions from '@/components/HeaderActions';
import { Copy, Check, TrendingUp, Users, DollarSign, Award } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

const TIERS = [
  { name: 'Bronze', icon: '🥉', color: '#CD7F32', pct: 10, min: 1,  max: 4  },
  { name: 'Silver', icon: '🥈', color: '#94A3B8', pct: 13, min: 5,  max: 14 },
  { name: 'Gold',   icon: '🥇', color: '#F59E0B', pct: 16, min: 15, max: 29 },
  { name: 'Platinum', icon: '💎', color: '#7C3AED', pct: 20, min: 30, max: Infinity },
];

function getTier(conversions: number) {
  return TIERS.find(t => conversions >= t.min && conversions <= t.max) || null;
}

interface User { id: string; email: string; fullName: string; }

export default function MemberDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('instajob_token');
    const ud = localStorage.getItem('instajob_user');
    if (!token || !ud) { router.push('/login'); return; }
    setUser(JSON.parse(ud));

    fetch(`${API}/api/referral/my-code`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => { if (r.status === 401) { router.push('/login'); return null; } return r.json(); })
      .then(d => {
        if (!d) return;
        const raw = d.data || d;
        const stats = raw.stats || raw;
        setData({
          code: raw.code || '',
          referralsSent: stats.referralsSent ?? stats.totalReferrals ?? 0,
          conversions: stats.conversions ?? stats.totalConversions ?? 0,
          earningsTotal: stats.earningsTotal ?? stats.totalEarnings ?? 0,
          earningsThisMonth: stats.earningsThisMonth ?? stats.monthlyEarnings ?? 0,
        });
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [router]);

  const copyCode = () => {
    navigator.clipboard.writeText(data?.code || '');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };
  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/register?ref=${data?.code || ''}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const tier = getTier(data?.conversions ?? 0);
  const nextTier = tier ? TIERS[TIERS.indexOf(tier) + 1] : TIERS[0];

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid #E5E7EB', borderTop: '3px solid #1E40FF', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', fontFamily: 'var(--font-body)' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ fontSize: '18px', color: '#EF4444', fontWeight: '700', marginBottom: '12px' }}>⚠️ {error}</p>
        <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', background: '#1E40FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Coba Lagi</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FF 50%, #EEF2FF 100%)', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <header style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.5)', padding: '0 40px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <Logo size={32} showText={true} />
        <HeaderActions user={user || undefined} />
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Page title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            Dashboard Referral 🎯
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px', fontWeight: '600', margin: 0 }}>
            Undang teman dan dapatkan komisi setiap konversi berhasil.
          </p>
        </div>

        {/* Tier badge — THE differentiator vs affiliate-dashboard */}
        <div style={{
          background: tier ? `linear-gradient(135deg, ${tier.color}18, ${tier.color}08)` : 'rgba(30,64,255,0.04)',
          border: `2px solid ${tier?.color || '#E2E8F0'}`,
          borderRadius: '16px', padding: '20px 24px', marginBottom: '24px',
          display: 'flex', alignItems: 'center', gap: '16px',
        }}>
          <span style={{ fontSize: '40px' }}>{tier?.icon || '🚀'}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: tier?.color || '#64748B', margin: '0 0 2px' }}>Tier Saat Ini</p>
            <p style={{ fontSize: '22px', fontWeight: '900', color: tier?.color || '#1E293B', margin: '0 0 2px' }}>
              {tier ? tier.name : '—'} <span style={{ fontSize: '16px' }}>({tier?.pct ?? 0}% komisi)</span>
            </p>
            {nextTier && (
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0, fontWeight: '600' }}>
                {tier ? `${nextTier.min - (data?.conversions ?? 0)} konversi lagi → ${nextTier.name} (${nextTier.pct}%)` : `${nextTier.min} konversi untuk masuk tier ${nextTier.name}`}
              </p>
            )}
          </div>
          {tier && (
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', color: '#94A3B8', margin: '0 0 2px', fontWeight: '700' }}>Konversi</p>
              <p style={{ fontSize: '28px', fontWeight: '900', color: tier.color, margin: 0 }}>{data?.conversions ?? 0}</p>
            </div>
          )}
        </div>

        {/* Tier progress */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid var(--color-border)', padding: '20px 24px', marginBottom: '24px' }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#475569', margin: '0 0 14px' }}>Progres Tier</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {TIERS.map(t => {
              const conv = data?.conversions ?? 0;
              const reached = conv >= t.min;
              const current = conv >= t.min && conv <= t.max;
              return (
                <div key={t.name} style={{ padding: '12px', borderRadius: '10px', textAlign: 'center', border: `2px solid ${current ? t.color : reached ? t.color + '60' : '#E2E8F0'}`, background: current ? `${t.color}10` : 'transparent', opacity: reached ? 1 : 0.5 }}>
                  <div style={{ fontSize: '22px', marginBottom: '4px' }}>{t.icon}</div>
                  <p style={{ fontSize: '12px', fontWeight: '800', color: t.color, margin: '0 0 1px' }}>{t.name}</p>
                  <p style={{ fontSize: '18px', fontWeight: '900', color: '#1E293B', margin: '0 0 1px' }}>{t.pct}%</p>
                  <p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>
                    {t.max === Infinity ? `${t.min}+` : `${t.min}–${t.max}`} konversi
                  </p>
                  {current && <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '9px', fontWeight: '700', background: t.color, color: '#fff', padding: '1px 6px', borderRadius: '20px' }}>AKTIF</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Referral', value: data?.referralsSent ?? 0, icon: <Users size={18} />, color: '#1E40FF' },
            { label: 'Konversi', value: data?.conversions ?? 0, icon: <TrendingUp size={18} />, color: '#10B981' },
            { label: 'Total Pendapatan', value: `Rp ${(data?.earningsTotal ?? 0).toLocaleString('id-ID')}`, icon: <DollarSign size={18} />, color: '#F59E0B' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '14px', border: '1px solid var(--color-border)', padding: '20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 2px', fontWeight: '600' }}>{s.label}</p>
                <p style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: 0 }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Referral code + link */}
        {data?.code && (
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid var(--color-border)', padding: '24px' }}>
            <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: '0 0 16px' }}>Kode & Link Referral</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <div style={{ flex: 1, padding: '10px 14px', background: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '15px', fontWeight: '800', color: '#1E40FF', letterSpacing: '0.05em' }}>
                {data.code}
              </div>
              <button onClick={copyCode} style={{ padding: '10px 16px', background: copiedCode ? '#10B981' : 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'background 0.2s' }}>
                {copiedCode ? <><Check size={14} /> Disalin</> : <><Copy size={14} /> Salin Kode</>}
              </button>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1, padding: '10px 14px', background: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '12px', color: '#64748B', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {typeof window !== 'undefined' ? `${window.location.origin}/register?ref=${data.code}` : '...'}
              </div>
              <button onClick={copyLink} style={{ padding: '10px 16px', background: copiedLink ? '#10B981' : '#475569', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'background 0.2s' }}>
                {copiedLink ? <><Check size={14} /> Disalin</> : <><Copy size={14} /> Salin Link</>}
              </button>
            </div>
          </div>
        )}

        {/* Info footer */}
        <div style={{ marginTop: '20px', padding: '14px 18px', background: 'rgba(30,64,255,0.03)', border: '1px solid rgba(30,64,255,0.1)', borderRadius: '10px' }}>
          <p style={{ fontSize: '12px', color: '#475569', margin: 0, fontWeight: '600', lineHeight: 1.6 }}>
            💡 Komisi dihitung dari harga paket yang dibeli referral kamu. Transfer setiap <strong>Jumat</strong> ke rekening terdaftar di halaman <Link href="/withdrawal" style={{ color: '#1E40FF', textDecoration: 'none' }}>Penarikan Dana</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}
