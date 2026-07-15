'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

interface AdminUser { id: string; email: string; fullName: string; subscriptionType: string; level: number; points: number; createdAt: string; isTelegramLinked: boolean; }
interface Health { status: string; timestamp: string; database: { users: number; jobs: number; applications: number; subscriptions: number; }; }
interface SubStats { total: number; free: number; pro: number; premium: number; active: number; expired: number; }

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [health, setHealth] = useState<Health | null>(null);
  const [subs, setSubs] = useState<SubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'users' | 'health'>('health');

  useEffect(() => {
    const token = localStorage.getItem('instajob_token');
    if (!token) { router.push('/login'); return; }

    const h = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`${API}/api/admin/health`, { headers: h }),
      fetch(`${API}/api/admin/users`, { headers: h }),
      fetch(`${API}/api/admin/subscriptions`, { headers: h }),
    ]).then(async ([hRes, uRes, sRes]) => {
      if (hRes.status === 403 || uRes.status === 403) { setError('Akses ditolak. Admin only.'); return; }
      if (hRes.ok) setHealth(await hRes.json());
      if (uRes.ok) { const d = await uRes.json(); setUsers(d.users || []); }
      if (sRes.ok) setSubs(await sRes.json());
    }).catch(() => setError('Gagal load data admin.'))
    .finally(() => setLoading(false));
  }, [router]);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#F5F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Logo size={40} showText />
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', background: '#F5F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
      <div style={{ color: '#EF4444', fontWeight: 700, fontSize: 18 }}>{error}</div>
      <button onClick={() => router.push('/dashboard')} style={{ padding: '8px 20px', background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Kembali</button>
    </div>
  );

  const statCard = (label: string, value: string | number, color = '#3B82F6') => (
    <div key={label} style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', minWidth: 140 }}>
      <div style={{ fontSize: 13, color: '#64748B', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F5F8FF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo size={32} showText />
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1E293B' }}>Admin Dashboard</span>
        <button onClick={() => router.push('/dashboard')} style={{ padding: '6px 16px', background: '#F1F5F9', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#64748B', fontWeight: 600 }}>← Kembali</button>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats row */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          {health && <>
            {statCard('Total Users', health.database.users)}
            {statCard('Total Jobs', health.database.jobs, '#8B5CF6')}
            {statCard('Lamaran', health.database.applications, '#10B981')}
            {statCard('Subscriptions', health.database.subscriptions, '#F59E0B')}
          </>}
          {subs && <>
            {statCard('Free', subs.free, '#64748B')}
            {statCard('Pro', subs.pro, '#3B82F6')}
            {statCard('Premium', subs.premium, '#8B5CF6')}
            {statCard('Active', subs.active, '#10B981')}
          </>}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {(['health', 'users'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === t ? '#3B82F6' : '#E2E8F0', color: tab === t ? '#fff' : '#64748B',
            }}>{t === 'health' ? 'System Health' : `Users (${users.length})`}</button>
          ))}
        </div>

        {/* Health tab */}
        {tab === 'health' && health && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: health.status === 'healthy' ? '#10B981' : '#EF4444', display: 'inline-block' }} />
              <span style={{ fontWeight: 700, color: '#1E293B' }}>{health.status.toUpperCase()}</span>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>{new Date(health.timestamp).toLocaleString('id-ID')}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              {Object.entries(health.database).map(([k, v]) => (
                <div key={k} style={{ background: '#F8FAFC', borderRadius: 8, padding: '12px 16px' }}>
                  <div style={{ fontSize: 12, color: '#94A3B8', textTransform: 'capitalize' }}>{k}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#1E293B' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users tab */}
        {tab === 'users' && (
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    {['Email', 'Nama', 'Plan', 'Level', 'Points', 'Telegram', 'Bergabung'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#64748B', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #F1F5F9', background: i % 2 === 0 ? '#fff' : '#FAFBFF' }}>
                      <td style={{ padding: '10px 16px', color: '#1E293B', fontWeight: 600 }}>{u.email}</td>
                      <td style={{ padding: '10px 16px', color: '#475569' }}>{u.fullName || '—'}</td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: u.subscriptionType === 'premium' ? '#EDE9FE' : u.subscriptionType === 'pro' ? '#DBEAFE' : '#F1F5F9', color: u.subscriptionType === 'premium' ? '#7C3AED' : u.subscriptionType === 'pro' ? '#1D4ED8' : '#64748B' }}>{u.subscriptionType || 'free'}</span>
                      </td>
                      <td style={{ padding: '10px 16px', color: '#475569', textAlign: 'center' }}>{u.level}</td>
                      <td style={{ padding: '10px 16px', color: '#475569', textAlign: 'center' }}>{u.points}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center' }}>{u.isTelegramLinked ? '✅' : '—'}</td>
                      <td style={{ padding: '10px 16px', color: '#94A3B8', fontSize: 12 }}>{new Date(u.createdAt).toLocaleDateString('id-ID')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
