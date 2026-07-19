'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import ProfileDropdown from '@/components/ProfileDropdown';
import { useI18n } from '@/context/I18nContext';
import { Home, Settings, Puzzle, Calendar, CheckCircle, Lock, Clock } from 'lucide-react';
import { JobsIcon, ApplicationsIcon } from '@/components/DashboardIcons';

interface User { id: string; email: string; fullName: string; }
interface AddOn {
  id: string;
  title: string;
  description: string;
  type: 'class' | 'tool' | 'affiliate';
  tokenCost: number; // 0 = free with token
  price?: number;
  badge?: string;
  dates?: string[];
  status: 'available' | 'locked' | 'pending' | 'owned';
  instructor?: string;
  category: string;
}

const STATIC_ADDONS: AddOn[] = [
  {
    id: 'cv-booster',
    title: 'Kelas CV Booster',
    description: 'Optimalkan CV kamu agar lolos ATS dan menarik perhatian HRD. Template premium + review 1-on-1.',
    type: 'class',
    tokenCost: 1,
    badge: '🔥 Terpopuler',
    dates: ['Sabtu, 26 Jul 2026 10:00', 'Sabtu, 2 Agu 2026 10:00', 'Sabtu, 9 Agu 2026 10:00'],
    status: 'available',
    instructor: 'Tim InstaJob',
    category: 'Career Booster',
  },
  {
    id: 'portfolio-booster',
    title: 'Kelas Portfolio Booster',
    description: 'Bangun portfolio yang standout untuk developer, designer, dan marketer. Praktik langsung + feedback.',
    type: 'class',
    tokenCost: 1,
    badge: '⭐ Rekomendasi',
    dates: ['Minggu, 27 Jul 2026 13:00', 'Minggu, 3 Agu 2026 13:00'],
    status: 'available',
    instructor: 'Tim InstaJob',
    category: 'Career Booster',
  },
  {
    id: 'ai-interview-coach',
    title: 'AI Interview Coach',
    description: 'Latihan interview berbasis AI. Simulasi pertanyaan HRD & user, feedback real-time, tips negotiasi gaji.',
    type: 'tool',
    tokenCost: 0,
    price: 49000,
    badge: '🤖 AI-Powered',
    status: 'available',
    category: 'Tools',
  },
];

function NavLink({ href, label, icon, active }: { href: string; label: string; icon: React.ReactNode; active: boolean }) {
  return (
    <Link href={href} style={{
      padding: '16px 20px',
      textDecoration: 'none',
      color: active ? 'var(--color-primary)' : '#64748B',
      fontWeight: active ? '700' : '600',
      fontSize: '14px',
      borderBottom: active ? '2px solid var(--color-primary)' : '2px solid transparent',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      whiteSpace: 'nowrap',
    }}>
      {icon}{label}
    </Link>
  );
}

function DatePicker({ dates, selected, onSelect }: { dates: string[]; selected: string; onSelect: (d: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
      <p style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', margin: 0 }}>Pilih Tanggal</p>
      {dates.map((d) => (
        <button key={d} onClick={() => onSelect(d)} style={{
          padding: '8px 12px',
          borderRadius: '8px',
          border: `1.5px solid ${selected === d ? 'var(--color-primary)' : 'var(--color-border)'}`,
          background: selected === d ? 'rgba(30,64,255,0.05)' : '#fff',
          color: selected === d ? 'var(--color-primary)' : '#64748B',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'var(--font-body)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Calendar size={12} />{d}
        </button>
      ))}
    </div>
  );
}

export default function AddOnsPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(0);
  const [addons, setAddons] = useState<AddOn[]>(STATIC_ADDONS);
  const [dynamicAddons, setDynamicAddons] = useState<AddOn[]>([]);
  const [selectedDates, setSelectedDates] = useState<Record<string, string>>({});
  const [activating, setActivating] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('Semua');

  useEffect(() => {
    const token = localStorage.getItem('instajob_token');
    const userData = localStorage.getItem('instajob_user');
    if (!token || !userData) { router.push('/login'); return; }
    setUser(JSON.parse(userData));

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
    // Fetch user tokens
    fetch(`${apiBase}/api/user/tokens`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setTokens(d.careerBoosterTokens || 0); })
      .catch(() => {});

    // Fetch dynamic add-ons from admin/affiliate
    fetch(`${apiBase}/api/addons?status=published`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.addons) setDynamicAddons(d.addons.map((a: any) => ({ ...a, status: 'available' })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const allAddons = [...addons, ...dynamicAddons];
  const categories = ['Semua', ...Array.from(new Set(allAddons.map(a => a.category)))];
  const filtered = activeCategory === 'Semua' ? allAddons : allAddons.filter(a => a.category === activeCategory);

  const handleActivate = async (addon: AddOn) => {
    const token = localStorage.getItem('instajob_token');
    if (!token) return;
    if (addon.dates && !selectedDates[addon.id]) {
      alert('Pilih tanggal kelas terlebih dahulu');
      return;
    }
    setActivating(addon.id);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
      const res = await fetch(`${apiBase}/api/addons/${addon.id}/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ selectedDate: selectedDates[addon.id] }),
      });
      const data = await res.json();
      if (res.ok) {
        setAddons(prev => prev.map(a => a.id === addon.id ? { ...a, status: 'owned' } : a));
        if (addon.tokenCost > 0) setTokens(t => t - addon.tokenCost);
        alert('Add-on berhasil diaktifkan!');
      } else {
        alert(data.message || 'Gagal mengaktifkan add-on');
      }
    } catch { alert('Terjadi kesalahan'); }
    finally { setActivating(null); }
  };

  const statusIcon = (status: string) => {
    if (status === 'owned') return <CheckCircle size={14} color="#10B981" />;
    if (status === 'locked') return <Lock size={14} color="#94A3B8" />;
    if (status === 'pending') return <Clock size={14} color="#F59E0B" />;
    return null;
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <Logo size={48} showText={true} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FF 50%, #EEF2FF 100%)', fontFamily: 'var(--font-body)' }}>
      {/* Top bar */}
      <header style={{
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.5)', padding: '0 40px',
        height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Logo size={32} showText={true} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Token badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 14px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #F59E0B, #D97706)',
            color: '#fff', fontSize: '13px', fontWeight: '700',
          }}>
            🎟️ {tokens} Token Career Booster
          </div>
          <ProfileDropdown user={user || undefined} />
        </div>
      </header>

      {/* Nav tabs */}
      <div style={{
        background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.3)', padding: '0 40px',
        display: 'flex', gap: '0', overflowX: 'auto',
      }}>
        <NavLink href="/dashboard" label="Dashboard" icon={<Home size={16} />} active={false} />
        <NavLink href="/jobs" label="Browse Jobs" icon={<JobsIcon size={16} color="currentColor" />} active={false} />
        <NavLink href="/applications" label="Applications" icon={<ApplicationsIcon size={16} color="currentColor" />} active={false} />
        <NavLink href="/preferences" label="Preferences" icon={<Settings size={16} />} active={false} />
        <NavLink href="/add-ons" label="Add-ons" icon={<Puzzle size={16} />} active={true} />
      </div>

      {/* Main */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Add-ons & Kelas 🎯
          </h1>
          <p style={{ color: '#64748B', fontSize: '15px', fontWeight: '600', margin: 0 }}>
            Gunakan token Career Booster kamu atau beli add-on tambahan untuk percepat karir.
          </p>
        </div>

        {/* Token info banner */}
        {tokens > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(217,119,6,0.05))',
            border: '1.5px solid rgba(245,158,11,0.3)',
            borderRadius: '12px', padding: '14px 20px', marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ fontSize: '20px' }}>🎟️</span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#92400E' }}>
              Kamu punya <strong>{tokens}x token Career Booster</strong> — bisa digunakan untuk kelas CV Booster atau Portfolio Booster secara gratis!
            </span>
          </div>
        )}

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '6px 16px', borderRadius: '20px',
              border: `1.5px solid ${activeCategory === cat ? 'var(--color-primary)' : 'var(--color-border)'}`,
              background: activeCategory === cat ? 'var(--color-primary)' : '#fff',
              color: activeCategory === cat ? '#fff' : '#64748B',
              fontSize: '13px', fontWeight: '700', cursor: 'pointer',
              fontFamily: 'var(--font-body)', transition: 'all 0.2s',
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Add-on grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map((addon) => (
            <div key={addon.id} style={{
              background: '#fff', borderRadius: '16px',
              border: addon.status === 'owned' ? '1.5px solid #10B981' : '1px solid var(--color-border)',
              padding: '24px', boxShadow: '0 2px 12px rgba(15,23,42,0.05)',
              display: 'flex', flexDirection: 'column', gap: '12px',
              opacity: addon.status === 'locked' ? 0.6 : 1,
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => { if (addon.status !== 'locked') (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
            >
              {/* Badge + status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {addon.badge && (
                  <span style={{
                    fontSize: '11px', fontWeight: '700', padding: '3px 10px',
                    borderRadius: '20px', background: 'rgba(30,64,255,0.08)',
                    color: 'var(--color-primary)',
                  }}>{addon.badge}</span>
                )}
                {statusIcon(addon.status)}
              </div>

              {/* Type chip */}
              <span style={{
                alignSelf: 'flex-start', fontSize: '10px', fontWeight: '700',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                color: addon.type === 'class' ? '#7C3AED' : addon.type === 'tool' ? '#0891B2' : '#D97706',
                background: addon.type === 'class' ? 'rgba(124,58,237,0.08)' : addon.type === 'tool' ? 'rgba(8,145,178,0.08)' : 'rgba(217,119,6,0.08)',
                padding: '2px 8px', borderRadius: '4px',
              }}>
                {addon.type === 'class' ? 'Kelas' : addon.type === 'tool' ? 'Tool' : 'Affiliate'}
              </span>

              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: 0 }}>{addon.title}</h3>
              {addon.instructor && <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0, fontWeight: '600' }}>👤 {addon.instructor}</p>}
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6, fontWeight: '500' }}>{addon.description}</p>

              {/* Date picker for classes */}
              {addon.dates && addon.status !== 'owned' && (
                <DatePicker
                  dates={addon.dates}
                  selected={selectedDates[addon.id] || ''}
                  onSelect={(d) => setSelectedDates(prev => ({ ...prev, [addon.id]: d }))}
                />
              )}

              {/* Price / token info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
                {addon.status === 'owned' ? (
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={14} /> Sudah dimiliki
                  </span>
                ) : addon.tokenCost > 0 && tokens >= addon.tokenCost ? (
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#F59E0B' }}>
                    🎟️ Gratis (gunakan {addon.tokenCost} token)
                  </span>
                ) : addon.price ? (
                  <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--color-primary)' }}>
                    Rp {addon.price.toLocaleString('id-ID')}
                  </span>
                ) : addon.tokenCost > 0 ? (
                  <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>
                    Butuh {addon.tokenCost} token • Upgrade ke Premium
                  </span>
                ) : null}
              </div>

              {/* CTA */}
              {addon.status !== 'owned' && addon.status !== 'locked' && (
                <button
                  onClick={() => handleActivate(addon)}
                  disabled={activating === addon.id}
                  style={{
                    width: '100%', padding: '10px',
                    background: addon.tokenCost > 0 && tokens >= addon.tokenCost
                      ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                      : 'var(--color-primary)',
                    color: '#fff', border: 'none', borderRadius: '10px',
                    fontWeight: '700', fontSize: '13px', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', opacity: activating === addon.id ? 0.7 : 1,
                  }}
                >
                  {activating === addon.id ? 'Memproses...' :
                    addon.tokenCost > 0 && tokens >= addon.tokenCost ? '🎟️ Gunakan Token' :
                    addon.price ? `Beli — Rp ${addon.price.toLocaleString('id-ID')}` : 'Aktifkan'}
                </button>
              )}
            </div>
          ))}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
              <Puzzle size={40} style={{ marginBottom: '12px', opacity: 0.4 }} />
              <p style={{ fontWeight: '600' }}>Belum ada add-on di kategori ini</p>
            </div>
          )}
        </div>

        {/* Info box */}
        <div style={{
          marginTop: '40px', padding: '20px 24px',
          background: 'rgba(30,64,255,0.03)', border: '1px solid rgba(30,64,255,0.1)',
          borderRadius: '12px',
        }}>
          <p style={{ fontSize: '13px', color: '#475569', margin: 0, fontWeight: '600', lineHeight: 1.7 }}>
            💡 <strong>Cara kerja token:</strong> Subscriber Premium mendapat 2x token Career Booster per periode. Token bisa digunakan untuk kelas CV Booster atau Portfolio Booster secara gratis. Token tidak expire selama subscription aktif.
          </p>
        </div>
      </main>
    </div>
  );
}
