'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import ProfileDropdown from '@/components/ProfileDropdown';
import { ArrowLeft, Inbox, CheckCircle, Clock } from 'lucide-react';

interface User { id: string; email: string; fullName: string; }
interface Message {
  id: string; title: string; body: string;
  type: 'info' | 'promo' | 'token' | 'system';
  read: boolean; createdAt: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

const TYPE_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  token:  { bg: 'rgba(245,158,11,0.1)',  color: '#D97706', label: '🎟️ Token'  },
  promo:  { bg: 'rgba(139,92,246,0.1)',  color: '#7C3AED', label: '🎁 Promo'  },
  info:   { bg: 'rgba(30,64,255,0.08)',  color: '#1E40FF', label: '📢 Info'   },
  system: { bg: 'rgba(100,116,139,0.1)', color: '#475569', label: '⚙️ System' },
};

export default function InboxPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('instajob_token');
    const ud = localStorage.getItem('instajob_user');
    if (!token || !ud) { router.push('/login'); return; }
    setUser(JSON.parse(ud));
    fetch(`${API}/api/inbox`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : { messages: [] })
      .then(d => setMessages(d.messages || d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const markRead = async (msg: Message) => {
    if (msg.read) { setSelected(msg); return; }
    const token = localStorage.getItem('instajob_token');
    fetch(`${API}/api/inbox/${msg.id}/read`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
    setSelected({ ...msg, read: true });
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'var(--font-body)' }}>
      <header style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <Logo size={28} showText={true} />
        <ProfileDropdown user={user || undefined} />
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', margin: 0 }}>Inbox</h1>
          {unreadCount > 0 && (
            <span style={{ background: '#EF4444', color: '#fff', fontSize: '12px', fontWeight: '700', padding: '2px 9px', borderRadius: '20px' }}>{unreadCount} baru</span>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>Memuat...</div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94A3B8' }}>
            <Inbox size={40} style={{ marginBottom: '12px', opacity: 0.3 }} />
            <p style={{ fontWeight: '600' }}>Inbox kosong</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '8px' }}>
            {messages.map(msg => {
              const tc = TYPE_COLORS[msg.type] || TYPE_COLORS.info;
              return (
                <div key={msg.id} onClick={() => markRead(msg)} style={{
                  background: msg.read ? '#fff' : 'rgba(30,64,255,0.03)',
                  border: `1px solid ${msg.read ? 'var(--color-border)' : 'rgba(30,64,255,0.15)'}`,
                  borderRadius: '12px', padding: '16px 20px', cursor: 'pointer',
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  transition: 'all 0.15s ease',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: msg.read ? 'transparent' : 'var(--color-primary)', flexShrink: 0, marginTop: '6px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', background: tc.bg, color: tc.color }}>{tc.label}</span>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>{new Date(msg.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: msg.read ? '600' : '800', color: '#0F172A', margin: '0 0 3px' }}>{msg.title}</p>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '500px' }}>{msg.body}</p>
                  </div>
                  {msg.read ? <CheckCircle size={15} color="#CBD5E1" style={{ flexShrink: 0 }} /> : <Clock size={15} color="var(--color-primary)" style={{ flexShrink: 0 }} />}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Message detail modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelected(null)}>
          <div style={{ background: '#fff', borderRadius: '18px', padding: '32px', maxWidth: '520px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '4px', background: (TYPE_COLORS[selected.type] || TYPE_COLORS.info).bg, color: (TYPE_COLORS[selected.type] || TYPE_COLORS.info).color }}>
                {(TYPE_COLORS[selected.type] || TYPE_COLORS.info).label}
              </span>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>{new Date(selected.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '0 0 12px' }}>{selected.title}</h2>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: '0 0 20px', whiteSpace: 'pre-wrap' }}>{selected.body}</p>
            <button onClick={() => setSelected(null)} style={{ padding: '10px 24px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}
