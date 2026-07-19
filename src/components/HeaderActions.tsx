'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ProfileDropdown from '@/components/ProfileDropdown';

interface User { id: string; email: string; fullName: string; profilePicture?: string; }

interface Notification {
  id: string; title: string; body?: string;
  read: boolean; createdAt: string;
  type?: 'info' | 'promo' | 'token' | 'system';
}

const API = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

const BTN_STYLE = {
  width: '40px', height: '40px', borderRadius: '10px',
  background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.4)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: '#64748B', transition: 'all 0.2s ease',
  position: 'relative' as const, flexShrink: 0,
} as const;

export default function HeaderActions({ user }: { user?: User }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [inboxCount, setInboxCount] = useState(0);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('instajob_token');
    if (!token) return;

    // Fetch notif count
    fetch(`${API}/api/notifications`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d) {
          const list = d.notifications || d.data || [];
          setNotifications(list.slice(0, 10));
          setUnreadCount(list.filter((n: Notification) => !n.read).length);
        }
      }).catch(() => {});

    // Fetch inbox count
    fetch(`${API}/api/inbox`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d) {
          const list = d.messages || d.data || [];
          setInboxCount(list.filter((m: any) => !m.read).length);
        }
      }).catch(() => {});
  }, []);

  // Close notif dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markRead = async (id: string) => {
    const token = localStorage.getItem('instajob_token');
    fetch(`${API}/api/notifications/${id}/read`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

      {/* 🔔 Notifications Bell */}
      <div ref={notifRef} style={{ position: 'relative' }}>
        <button
          aria-label="Notifications"
          onClick={() => setNotifOpen(!notifOpen)}
          style={BTN_STYLE}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.9)'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.6)'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: '-4px', right: '-4px',
              background: '#EF4444', color: '#fff',
              fontSize: '10px', fontWeight: '800',
              minWidth: '16px', height: '16px', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0 3px', border: '2px solid #fff',
            }}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Notif Dropdown */}
        {notifOpen && (
          <div style={{
            position: 'absolute', top: '48px', right: 0,
            background: '#fff', borderRadius: '14px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 8px 32px rgba(15,23,42,0.12)',
            zIndex: 300, width: '320px', overflow: 'hidden',
          }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>Notifikasi</span>
              {unreadCount > 0 && <span style={{ fontSize: '11px', fontWeight: '700', color: '#1E40FF' }}>{unreadCount} belum dibaca</span>}
            </div>
            <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                <div style={{ padding: '32px 18px', textAlign: 'center', fontSize: '13px', color: '#94A3B8', fontWeight: '600' }}>
                  Tidak ada notifikasi
                </div>
              ) : (
                notifications.map(n => (
                  <div key={n.id} onClick={() => markRead(n.id)} style={{
                    padding: '12px 18px', borderBottom: '1px solid #F8FAFC',
                    background: n.read ? '#fff' : 'rgba(30,64,255,0.03)',
                    cursor: 'pointer', display: 'flex', gap: '10px',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#F8FAFC'}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = n.read ? '#fff' : 'rgba(30,64,255,0.03)'}
                  >
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: n.read ? 'transparent' : '#1E40FF', flexShrink: 0, marginTop: '5px' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', fontWeight: n.read ? '500' : '700', color: '#0F172A', margin: '0 0 2px' }}>{n.title}</p>
                      {n.body && <p style={{ fontSize: '11px', color: '#64748B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.body}</p>}
                      <p style={{ fontSize: '10px', color: '#94A3B8', margin: '3px 0 0', fontWeight: '600' }}>
                        {new Date(n.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div style={{ padding: '10px 18px', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
              <Link href="/inbox" onClick={() => setNotifOpen(false)} style={{ fontSize: '12px', fontWeight: '700', color: '#1E40FF', textDecoration: 'none' }}>
                Lihat semua di Inbox →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 📬 Inbox Button */}
      <Link
        href="/inbox"
        aria-label="Inbox"
        style={{ ...BTN_STYLE, textDecoration: 'none', position: 'relative' }}
        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.9)'}
        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.6)'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
        </svg>
        {inboxCount > 0 && (
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            background: '#EF4444', color: '#fff',
            fontSize: '10px', fontWeight: '800',
            minWidth: '16px', height: '16px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 3px', border: '2px solid #fff',
          }}>
            {inboxCount > 9 ? '9+' : inboxCount}
          </span>
        )}
      </Link>

      {/* 👤 Profile Dropdown */}
      <ProfileDropdown user={user} />
    </div>
  );
}
