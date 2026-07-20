'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AffiliateUser { name?: string; email?: string; }
interface Notif { id: string; title: string; body?: string; read: boolean; createdAt: string; }

const API = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
const BTN: React.CSSProperties = {
  width: '36px', height: '36px', borderRadius: '8px',
  background: '#F3F4F6', border: '1px solid #E5E7EB',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: '#374151', position: 'relative', flexShrink: 0,
};

export default function AffiliateHeaderActions({ user }: { user?: AffiliateUser }) {
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [unread, setUnread] = useState(0);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch(`${API}/api/affiliate/notifications`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d) {
          const list = d.notifications || d.data || [];
          setNotifs(list.slice(0, 8));
          setUnread(list.filter((n: Notif) => !n.read).length);
        }
      }).catch(() => {});
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/affiliate/login');
  };

  const getInitials = () => {
    if (!user?.name) return 'A';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const MENU_ITEM: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '10px 16px', fontSize: '13px', fontWeight: '500',
    color: '#374151', cursor: 'pointer', transition: 'background 0.15s',
    textDecoration: 'none', background: 'transparent', border: 'none',
    width: '100%', textAlign: 'left', fontFamily: 'var(--font-body)',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

      {/* Notif Bell */}
      <div ref={notifRef} style={{ position: 'relative' }}>
        <button aria-label="Notifications" onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }} style={BTN}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#E5E7EB'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#F3F4F6'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {unread > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#EF4444', color: '#fff', fontSize: '9px', fontWeight: '800', minWidth: '15px', height: '15px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 2px', border: '2px solid #fff' }}>{unread > 9 ? '9+' : unread}</span>}
        </button>

        {notifOpen && (
          <div style={{ position: 'absolute', top: '44px', right: 0, background: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 300, width: '300px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>Notifikasi</span>
              {unread > 0 && <span style={{ fontSize: '11px', color: '#3B82F6', fontWeight: '700' }}>{unread} baru</span>}
            </div>
            <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
              {notifs.length === 0 ? (
                <div style={{ padding: '28px 16px', textAlign: 'center', fontSize: '12px', color: '#9CA3AF' }}>Tidak ada notifikasi</div>
              ) : notifs.map(n => (
                <div key={n.id} style={{ padding: '10px 16px', borderBottom: '1px solid #F9FAFB', background: n.read ? '#fff' : 'rgba(59,130,246,0.03)', display: 'flex', gap: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: n.read ? 'transparent' : '#3B82F6', marginTop: '5px', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', fontWeight: n.read ? '500' : '700', color: '#111827', margin: '0 0 2px' }}>{n.title}</p>
                    {n.body && <p style={{ fontSize: '11px', color: '#6B7280', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.body}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile Avatar Dropdown */}
      <div ref={profileRef} style={{ position: 'relative' }}>
        <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #1E40FF, #3B82F6)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}>
          {getInitials()}
        </button>

        {profileOpen && (
          <div style={{ position: 'absolute', top: '44px', right: 0, background: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 300, minWidth: '200px', overflow: 'hidden' }}>
            {/* User info */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #F3F4F6' }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{user?.name || 'Affiliate'}</p>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: 0 }}>{user?.email || ''}</p>
            </div>
            <div style={{ padding: '4px 0' }}>
              {[
                { href: '/affiliate/profile', icon: '👤', label: 'Profile' },
                { href: '/affiliate/withdrawal', icon: '💰', label: 'Withdrawal' },
                { href: '/affiliate/referrals', icon: '🎯', label: 'Referrals' },
                { href: '/affiliate/settings', icon: '⚙️', label: 'Settings' },
              ].map(item => (
                <Link key={item.href} href={item.href} onClick={() => setProfileOpen(false)}
                  style={MENU_ITEM}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#F9FAFB'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              <div style={{ height: '1px', background: '#F3F4F6', margin: '4px 0' }} />
              <button onClick={handleLogout} style={{ ...MENU_ITEM, color: '#EF4444' }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#FFF5F5'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}>
                <span>🚪</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
