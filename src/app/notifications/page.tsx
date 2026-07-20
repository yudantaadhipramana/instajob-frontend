'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import HeaderActions from '@/components/HeaderActions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface User { id: string; email: string; fullName: string; }
interface Notif {
  id: string; title: string; body?: string;
  type: 'info' | 'promo' | 'token' | 'system' | 'success' | 'warning';
  read: boolean; createdAt: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

const TYPE_CONFIG: Record<string, { icon: string; bg: string; color: string; label: string }> = {
  token:   { icon: '🎟️', bg: 'rgba(245,158,11,0.08)',  color: '#D97706', label: 'Token'   },
  promo:   { icon: '🎁', bg: 'rgba(139,92,246,0.08)',  color: '#7C3AED', label: 'Promo'   },
  success: { icon: '✅', bg: 'rgba(16,185,129,0.08)',  color: '#059669', label: 'Sukses'  },
  warning: { icon: '⚠️', bg: 'rgba(245,158,11,0.08)',  color: '#D97706', label: 'Penting' },
  system:  { icon: '⚙️', bg: 'rgba(100,116,139,0.08)', color: '#475569', label: 'Sistem'  },
  info:    { icon: '📢', bg: 'rgba(30,64,255,0.06)',   color: '#1E40FF', label: 'Info'    },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Baru saja';
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} hari lalu`;
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function NotificationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [selected, setSelected] = useState<Notif | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('instajob_token');
    const ud = localStorage.getItem('instajob_user');
    if (!token || !ud) { router.push('/login'); return; }
    setUser(JSON.parse(ud));
    fetch(`${API}/api/notifications`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : { notifications: [] })
      .then(d => setNotifs(d.notifications || d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const markRead = async (id: string) => {
    const token = localStorage.getItem('instajob_token');
    fetch(`${API}/api/notifications/${id}/read`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = async () => {
    const token = localStorage.getItem('instajob_token');
    fetch(`${API}/api/notifications/read-all`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClick = (n: Notif) => {
    if (!n.read) markRead(n.id);
    setSelected(n);
  };

  const displayed = filter === 'unread' ? notifs.filter(n => !n.read) : notifs;
  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)', padding: '0 40px',
        height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <Logo size={28} showText={true} />
        <HeaderActions user={user || undefined} />
      </header>

      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              Notifikasi
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, fontWeight: '600' }}>
              {unreadCount > 0 ? `${unreadCount} belum dibaca` : 'Semua sudah dibaca'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Filter tabs */}
            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '8px', padding: '3px', border: '1px solid var(--color-border)' }}>
              {(['all', 'unread'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '5px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                  fontSize: '12px', fontWeight: '700', fontFamily: 'var(--font-body)',
                  background: filter === f ? '#fff' : 'transparent',
                  color: filter === f ? 'var(--color-primary)' : '#64748B',
                  boxShadow: filter === f ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s',
                }}>
                  {f === 'all' ? 'Semua' : 'Belum Dibaca'}
                </button>
              ))}
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={{
                padding: '7px 14px', background: 'transparent', border: '1px solid var(--color-border)',
                borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                color: '#475569', fontFamily: 'var(--font-body)', transition: 'all 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)'}
              >
                Tandai semua dibaca
              </button>
            )}
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ background: '#fff', borderRadius: '14px', border: '1px solid var(--color-border)', padding: '18px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F1F5F9', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: '14px', background: '#F1F5F9', borderRadius: '4px', marginBottom: '8px', width: '60%' }} />
                  <div style={{ height: '11px', background: '#F8FAFC', borderRadius: '4px', width: '80%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.4 }}>🔔</div>
            <p style={{ fontSize: '16px', fontWeight: '700', color: '#64748B', margin: '0 0 8px' }}>
              {filter === 'unread' ? 'Semua sudah dibaca' : 'Belum ada notifikasi'}
            </p>
            <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
              Notifikasi dari admin dan sistem akan muncul di sini.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {displayed.map(n => {
              const tc = TYPE_CONFIG[n.type] || TYPE_CONFIG.info;
              return (
                <div key={n.id} onClick={() => handleClick(n)} style={{
                  background: n.read ? '#fff' : 'rgba(30,64,255,0.02)',
                  border: `1px solid ${n.read ? 'var(--color-border)' : 'rgba(30,64,255,0.12)'}`,
                  borderRadius: '14px', padding: '16px 18px',
                  cursor: 'pointer', display: 'flex', gap: '14px', alignItems: 'flex-start',
                  transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: tc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px',
                  }}>
                    {tc.icon}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '3px' }}>
                      <p style={{ fontSize: '14px', fontWeight: n.read ? '600' : '800', color: '#0F172A', margin: 0, lineHeight: 1.4 }}>
                        {n.title}
                      </p>
                      <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', flexShrink: 0 }}>{timeAgo(n.createdAt)}</span>
                    </div>
                    {n.body && (
                      <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 6px', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
                        {n.body}
                      </p>
                    )}
                    <span style={{
                      display: 'inline-block', fontSize: '10px', fontWeight: '700',
                      padding: '2px 8px', borderRadius: '4px',
                      background: tc.bg, color: tc.color, textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                      {tc.label}
                    </span>
                  </div>

                  {/* Unread dot */}
                  {!n.read && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0, marginTop: '6px' }} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Detail modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          onClick={() => setSelected(null)}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', maxWidth: '500px', width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.15)' }}
            onClick={e => e.stopPropagation()}>
            {(() => {
              const tc = TYPE_CONFIG[selected.type] || TYPE_CONFIG.info;
              return (
                <>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: tc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                      {tc.icon}
                    </div>
                    <div>
                      <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', background: tc.bg, color: tc.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                        {tc.label}
                      </span>
                      <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', margin: '0 0 2px' }}>{selected.title}</h2>
                      <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0, fontWeight: '600' }}>{timeAgo(selected.createdAt)}</p>
                    </div>
                  </div>
                  {selected.body && (
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: '0 0 20px', whiteSpace: 'pre-wrap' }}>{selected.body}</p>
                  )}
                  <button onClick={() => setSelected(null)} style={{ width: '100%', padding: '12px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                    Tutup
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
