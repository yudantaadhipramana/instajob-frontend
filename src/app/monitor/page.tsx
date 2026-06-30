'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppNavigation from '@/components/shared/AppNavigation';

interface ScoutStats {
  totalDiscovered: number;
  pendingJobs: number;
  sentJobs: number;
  failedJobs: number;
}

interface DiscoveredJob {
  id: number;
  email: string;
  role: string;
  companyName: string | null;
  sourceQuery: string;
  sourceUrl: string | null;
  discoveredAt: string;
  status: string;
  sentAt: string | null;
}

export default function MonitorPage() {
  const router = useRouter();
  const [stats, setStats] = useState<ScoutStats | null>(null);
  const [discoveredJobs, setDiscoveredJobs] = useState<DiscoveredJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pollingActive, setPollingActive] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('instajob_token');
      if (!token) {
        router.push('/login');
        return;
      }

      await fetchStats();
    };

    checkAuth();
  }, [router]);

  // Auto-refresh stats when polling is active (every 3 seconds)
  useEffect(() => {
    if (!pollingActive) return;

    const intervalId = setInterval(() => {
      fetchStats();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [pollingActive]);

  const fetchStats = async () => {
    const token = sessionStorage.getItem('instajob_token');
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

    try {
      const response = await fetch(`${apiBase}/api/scout/stats`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setDiscoveredJobs(data.jobs || []);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedQueries = async () => {
    setError('');
    setSuccess('');
    setSeeding(true);

    try {
      const token = sessionStorage.getItem('instajob_token');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

      const response = await fetch(`${apiBase}/api/scout/seed`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setSuccess('Queries berhasil di-seed! Sekarang Anda bisa menjalankan scout.');
        await fetchStats();
      } else {
        setError('Gagal seed queries. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat seed queries.');
    } finally {
      setSeeding(false);
    }
  };

  const handleRunScout = async () => {
    setError('');
    setRunning(true);
    setPollingActive(true);

    try {
      const token = sessionStorage.getItem('instajob_token');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

      const response = await fetch(`${apiBase}/api/scout/run`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(`Scout job queued! Monitoring for results...`);
        setError('');
        await fetchStats();

        // Stop polling after 2 minutes
        setTimeout(() => {
          setPollingActive(false);
        }, 120000);
      } else {
        setError('Gagal menjalankan scout. Silakan coba lagi.');
        setPollingActive(false);
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setPollingActive(false);
    } finally {
      setRunning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavigation />

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 32px' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#111827',
            margin: '0 0 8px 0',
          }}>
            Auto-Apply Monitor
          </h1>
          <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
            Pantau aktivitas AI Scout dan status pengiriman email otomatis
          </p>
        </div>

        {error && (
          <div style={{
            padding: '16px',
            background: '#FEE2E2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            borderRadius: '12px',
            fontSize: '14px',
            marginBottom: '32px',
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            padding: '16px',
            background: '#D1FAE5',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            borderRadius: '12px',
            fontSize: '14px',
            marginBottom: '32px',
          }}>
            {success}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #E5E7EB',
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Total Ditemukan
            </div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#0051FF' }}>
              {stats?.totalDiscovered || 0}
            </div>
          </div>

          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #E5E7EB',
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Pending
            </div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#F59E0B' }}>
              {stats?.pendingJobs || 0}
            </div>
          </div>

          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #E5E7EB',
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Terkirim
            </div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#10B981' }}>
              {stats?.sentJobs || 0}
            </div>
          </div>

          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #E5E7EB',
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Gagal
            </div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#EF4444' }}>
              {stats?.failedJobs || 0}
            </div>
          </div>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #E5E7EB',
          marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
              Scout Controls
            </h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSeedQueries}
                disabled={seeding}
                style={{
                  padding: '12px 24px',
                  background: seeding ? '#9CA3AF' : '#10B981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: seeding ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {seeding ? 'Seeding...' : 'Seed Queries'}
              </button>
              <button
                onClick={handleRunScout}
                disabled={running}
                style={{
                  padding: '12px 24px',
                  background: running ? '#9CA3AF' : 'linear-gradient(135deg, #0051FF 0%, #7C3AED 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: running ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {running ? 'Running...' : 'Run Scout Now'}
              </button>
            </div>
          </div>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
            <strong>First time?</strong> Klik "Seed Queries" terlebih dahulu untuk mengisi database dengan query pencarian. Setelah itu, klik "Run Scout Now" untuk menjalankan scout.
          </p>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #E5E7EB',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
            Discovered Jobs
          </h2>

          {discoveredJobs.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>Role</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>Company</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>Discovered</th>
                  </tr>
                </thead>
                <tbody>
                  {discoveredJobs.slice(0, 50).map((job) => (
                    <tr key={job.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '16px 12px', fontSize: '14px', color: '#111827', fontWeight: '600' }}>{job.role}</td>
                      <td style={{ padding: '16px 12px', fontSize: '14px', color: '#6B7280' }}>{job.companyName || 'N/A'}</td>
                      <td style={{ padding: '16px 12px', fontSize: '13px', color: '#0051FF', fontFamily: 'monospace' }}>{job.email}</td>
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: job.status === 'sent' ? '#D1FAE5' : job.status === 'pending' ? '#FEF3C7' : '#FEE2E2',
                          color: job.status === 'sent' ? '#065F46' : job.status === 'pending' ? '#92400E' : '#991B1B',
                        }}>
                          {job.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 12px', fontSize: '13px', color: '#9CA3AF' }}>
                        {new Date(job.discoveredAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{
              padding: '48px 24px',
              textAlign: 'center',
              background: '#F9FAFB',
              borderRadius: '12px',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Belum Ada Data
              </p>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                Jalankan scout untuk menemukan lowongan pekerjaan baru
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
