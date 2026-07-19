'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import ProfileDropdown from '@/components/ProfileDropdown';
import { useI18n } from '@/context/I18nContext';
import { Home, Settings, Puzzle, CheckCircle, Lock, Clock, ArrowRight } from 'lucide-react';
import { JobsIcon, ApplicationsIcon } from '@/components/DashboardIcons';

interface User { id: string; email: string; fullName: string; }
interface AddOn {
  id: string;
  title: string;
  description: string;
  type: 'class' | 'tool' | 'affiliate';
  price: number;
  badge?: string;
  status: 'available' | 'locked' | 'pending' | 'owned';
  instructor?: string;
  category: string;
  duration?: string;
  highlights?: string[];
}

const STATIC_ADDONS: AddOn[] = [
  {
    id: 'cv-booster',
    title: 'Kelas CV Booster',
    description: 'Optimalkan CV agar lolos ATS dan menarik HRD. Termasuk template premium + review 1-on-1 bersama mentor.',
    type: 'class',
    price: 60000,
    badge: '🔥 Terpopuler',
    status: 'available',
    instructor: 'Tim InstaJob',
    category: 'Career Booster',
    duration: '2 jam',
    highlights: ['Template CV premium', 'Review 1-on-1', 'Tips lolos ATS', 'Rekaman kelas'],
  },
  {
    id: 'portfolio-booster',
    title: 'Kelas Portfolio Booster',
    description: 'Bangun portfolio standout untuk developer, designer, dan marketer. Praktik langsung + feedback mentor.',
    type: 'class',
    price: 60000,
    badge: '⭐ Rekomendasi',
    status: 'available',
    instructor: 'Tim InstaJob',
    category: 'Career Booster',
    duration: '2 jam',
    highlights: ['Framework portfolio', 'Case study nyata', 'Feedback langsung', 'Rekaman kelas'],
  },
  {
    id: 'ai-interview-coach',
    title: 'AI Interview Coach',
    description: 'Latihan interview berbasis AI. Simulasi pertanyaan HRD & user, feedback real-time, tips negotiasi gaji.',
    type: 'tool',
    price: 49000,
    badge: '🤖 AI-Powered',
    status: 'available',
    category: 'Tools',
    highlights: ['100+ pertanyaan interview', 'Feedback AI real-time', 'Tips negosiasi gaji', 'Akses 30 hari'],
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

export default function AddOnsPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(0);
  const [dynamicAddons, setDynamicAddons] = useState<AddOn[]>([]);
  const [activeCategory, setActiveCategory] = useState('Semua');

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

    fetch(`${apiBase}/api/addons?status=published`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.addons) setDynamicAddons(d.addons); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const allAddons = [...STATIC_ADDONS, ...dynamicAddons];
  const categories = ['Semua', ...Array.from(new Set(allAddons.map(a => a.category)))];
  const filtered = activeCategory === 'Semua' ? allAddons : allAddons.filter(a => a.category === activeCategory);

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
          {tokens > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              color: '#fff', fontSize: '13px', fontWeight: '700',
            }}>
              🎟️ {tokens}x Token Career Booster
            </div>
          )}
          <ProfileDropdown user={user || undefined} />
        </div>
      </header>

      {/* Nav tabs */}
      <div style={{
        background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.3)', padding: '0 40px',
        display: 'flex', overflowX: 'auto',
      }}>
        <NavLink href="/dashboard" label="Dashboard" icon={<Home size={16} />} active={false} />
        <NavLink href="/jobs" label="Browse Jobs" icon={<JobsIcon size={16} color="currentColor" />} active={false} />
        <NavLink href="/applications" label="Applications" icon={<ApplicationsIcon size={16} color="currentColor" />} active={false} />
        <NavLink href="/preferences" label="Preferences" icon={<Settings size={16} />} active={false} />
        <NavLink href="/add-ons" label="Add-ons" icon={<Puzzle size={16} />} active={true} />
      </div>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Add-ons & Kelas 🎯
          </h1>
          <p style={{ color: '#64748B', fontSize: '15px', fontWeight: '600', margin: 0 }}>
            Percepat karir dengan kelas eksklusif dan tools premium.
          </p>
        </div>

        {/* Token banner */}
        {tokens > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(217,119,6,0.04))',
            border: '1.5px solid rgba(245,158,11,0.3)',
            borderRadius: '12px', padding: '14px 20px', marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ fontSize: '20px' }}>🎟️</span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#92400E' }}>
              Kamu punya <strong>{tokens}x token Career Booster</strong> — redeem di halaman checkout kelas untuk gratis!
            </span>
          </div>
        )}

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '7px 18px', borderRadius: '20px',
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {filtered.map((addon) => (
            <div key={addon.id} style={{
              background: '#fff', borderRadius: '18px',
              border: addon.status === 'owned' ? '1.5px solid #10B981' : '1px solid var(--color-border)',
              padding: '24px', boxShadow: '0 2px 16px rgba(15,23,42,0.05)',
              display: 'flex', flexDirection: 'column', gap: '14px',
              opacity: addon.status === 'locked' ? 0.6 : 1,
              transition: 'all 0.2s ease',
              cursor: addon.status === 'locked' ? 'not-allowed' : 'pointer',
            }}
              onMouseEnter={e => { if (addon.status !== 'locked') { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(30,64,255,0.12)'; }}}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(15,23,42,0.05)'; }}
              onClick={() => addon.status !== 'locked' && addon.status !== 'owned' && router.push(`/add-ons/${addon.id}`)}
            >
              {/* Badge row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {addon.badge && (
                    <span style={{
                      fontSize: '11px', fontWeight: '700', padding: '3px 10px',
                      borderRadius: '20px', background: 'rgba(30,64,255,0.08)', color: 'var(--color-primary)',
                    }}>{addon.badge}</span>
                  )}
                  <span style={{
                    fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: addon.type === 'class' ? '#7C3AED' : addon.type === 'tool' ? '#0891B2' : '#D97706',
                    background: addon.type === 'class' ? 'rgba(124,58,237,0.08)' : addon.type === 'tool' ? 'rgba(8,145,178,0.08)' : 'rgba(217,119,6,0.08)',
                    padding: '2px 8px', borderRadius: '4px',
                  }}>
                    {addon.type === 'class' ? 'Kelas' : addon.type === 'tool' ? 'Tool' : 'Affiliate'}
                  </span>
                </div>
                {statusIcon(addon.status)}
              </div>

              {/* Title + instructor */}
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px' }}>{addon.title}</h3>
                {addon.instructor && <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0, fontWeight: '600' }}>👤 {addon.instructor} {addon.duration && `• ⏱ ${addon.duration}`}</p>}
              </div>

              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6, fontWeight: '500' }}>{addon.description}</p>

              {/* Highlights */}
              {addon.highlights && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {addon.highlights.map((h, i) => (
                    <span key={i} style={{
                      fontSize: '11px', fontWeight: '700', padding: '3px 10px',
                      borderRadius: '6px', background: '#F1F5F9', color: '#475569',
                    }}>✓ {h}</span>
                  ))}
                </div>
              )}

              {/* Price + CTA */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '4px' }}>
                <div>
                  {addon.status === 'owned' ? (
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle size={14} /> Sudah dimiliki
                    </span>
                  ) : (
                    <div>
                      <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                        Rp {addon.price.toLocaleString('id-ID')}
                      </span>
                      {tokens > 0 && addon.type === 'class' && (
                        <p style={{ fontSize: '11px', color: '#F59E0B', fontWeight: '700', margin: '2px 0 0' }}>
                          🎟️ Bisa redeem token
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {addon.status !== 'owned' && addon.status !== 'locked' && (
                  <button
                    onClick={(e) => { e.stopPropagation(); router.push(`/add-ons/${addon.id}`); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '10px 18px',
                      background: 'var(--color-primary)',
                      color: '#fff', border: 'none', borderRadius: '10px',
                      fontWeight: '700', fontSize: '13px', cursor: 'pointer',
                      fontFamily: 'var(--font-body)', transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Lihat Detail <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
              <Puzzle size={40} style={{ marginBottom: '12px', opacity: 0.4 }} />
              <p style={{ fontWeight: '600' }}>Belum ada add-on di kategori ini</p>
            </div>
          )}
        </div>

        {/* Token info */}
        <div style={{
          marginTop: '40px', padding: '20px 24px',
          background: 'rgba(30,64,255,0.03)', border: '1px solid rgba(30,64,255,0.1)',
          borderRadius: '12px',
        }}>
          <p style={{ fontSize: '13px', color: '#475569', margin: 0, fontWeight: '600', lineHeight: 1.7 }}>
            💡 <strong>Cara kerja token:</strong> Subscriber Premium dapat 2x token Career Booster per periode. Token bisa di-redeem saat checkout kelas CV Booster atau Portfolio Booster untuk mendapat harga Rp 0. Token didapat via email setelah subscribe Premium atau bisa dicek di halaman Inbox.
          </p>
        </div>
      </main>
    </div>
  );
}
