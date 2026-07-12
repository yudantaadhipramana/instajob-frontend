'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';

interface QueueItem {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'pending' | 'processing' | 'sent' | 'failed';
  scheduledFor: string;
  appliedAt?: string;
  error?: string;
}

interface QueueStats {
  totalQueued: number;
  processing: number;
  sent: number;
  failed: number;
  nextApplyIn: number; // seconds
}

export default function AutoApplyPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [stats, setStats] = useState<QueueStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [autoApplyEnabled, setAutoApplyEnabled] = useState(false);
  const [toast, setToast] = useState<{msg:string,type:'success'|'error'}|null>(null);
  const showToast = (msg:string, type:'success'|'error'='success') => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    fetchQueue();
    const interval = setInterval(fetchQueue, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [token, router]);

  const fetchQueue = async () => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
    try {
      const response = await fetch(`${apiBase}/api/auto-apply/queue`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        // Map API response to UI state
        const mappedQueue = (data.queue || []).map((item: any) => ({
          id: item.applicationId,
          jobId: item.jobId,
          jobTitle: item.title,
          company: item.company,
          status: item.status === 'queued' ? 'pending' : item.status === 'applied' ? 'sent' : item.status,
          scheduledFor: item.appliedAt || new Date().toISOString(),
          appliedAt: item.appliedAt,
          error: item.status === 'failed' ? 'Application failed' : undefined,
        }));
        setQueue(mappedQueue);
        setStats({
          totalQueued: data.quota?.used || 0,
          processing: 0,
          sent: mappedQueue.filter((q: any) => q.status === 'sent').length,
          failed: mappedQueue.filter((q: any) => q.status === 'failed').length,
          nextApplyIn: Math.max(0, (data.quota?.remaining || 0) > 0 ? 0 : 86400),
        });
      }
    } catch (err) {
      console.error('Failed to fetch queue:', err);
      setError('Failed to load auto-apply queue');
    } finally {
      setLoading(false);
    }
  };

  const toggleAutoApply = async () => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
    try {
      const endpoint = autoApplyEnabled ? '/api/bot/stop' : '/api/bot/start';
      const response = await fetch(`${apiBase}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setAutoApplyEnabled(!autoApplyEnabled);
        fetchQueue();
      }
    } catch (err) {
      console.error('Error toggling auto-apply:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#94A3B8';
      case 'processing': return '#F59E0B';
      case 'sent': return '#10B981';
      case 'failed': return '#EF4444';
      default: return '#64748B';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'processing': return '⚙️';
      case 'sent': return '✓';
      case 'failed': return '✕';
      default: return '?';
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B1120' }}>
        <Sidebar />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8FAFC' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>Loading auto-apply queue...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B1120', color: '#F8FAFC' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Auto-Apply Queue</h1>
              <p style={{ color: '#94A3B8' }}>Manage automated job applications</p>
            </div>
            <button
              onClick={toggleAutoApply}
              style={{
                padding: '12px 24px',
                backgroundColor: autoApplyEnabled ? '#10B981' : '#334155',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {autoApplyEnabled ? '🟢 Auto-Apply Active' : '⭕ Auto-Apply Inactive'}
            </button>
          </div>

          {error && (
            <div style={{ padding: '12px 16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#F87171', borderRadius: '8px' }}>
              {error}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px', textTransform: 'uppercase' }}>Total Queued</p>
              <p style={{ fontSize: '28px', fontWeight: '700' }}>{stats.totalQueued}</p>
            </div>
            <div style={{ backgroundColor: 'rgba(255,165,0,0.1)', border: '1px solid rgba(255,165,0,0.2)', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontSize: '12px', color: '#FFA500', marginBottom: '8px', textTransform: 'uppercase' }}>Processing</p>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#FFA500' }}>{stats.processing}</p>
            </div>
            <div style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontSize: '12px', color: '#10B981', marginBottom: '8px', textTransform: 'uppercase' }}>Sent</p>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#10B981' }}>{stats.sent}</p>
            </div>
            <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontSize: '12px', color: '#EF4444', marginBottom: '8px', textTransform: 'uppercase' }}>Failed</p>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#EF4444' }}>{stats.failed}</p>
            </div>
          </div>
        )}

        {/* Queue Table */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px', fontWeight: '600', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
            <span>Job</span>
            <span>Status</span>
            <span>Scheduled</span>
            <span>Action</span>
          </div>

          {queue.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>
              <p style={{ fontSize: '16px' }}>Queue is empty</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>Browse jobs and add to queue to get started</p>
            </div>
          ) : (
            queue.map(item => (
              <div key={item.id} style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '4px' }}>{item.jobTitle}</p>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>{item.company}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '16px' }}>{getStatusIcon(item.status)}</span>
                  <span style={{ color: getStatusColor(item.status), fontWeight: '600', fontSize: '12px', textTransform: 'capitalize' }}>{item.status}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#94A3B8' }}>{new Date(item.scheduledFor).toLocaleString()}</p>
                <button 
                  onClick={() => {
                    if (confirm(`Remove "${item.jobTitle}" from queue?`)) {
                      showToast('Remove from queue feature coming soon.', 'error');
                    }
                  }}
                  style={{ padding: '6px 12px', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#EF4444', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
      {toast && <div style={{position:'fixed',bottom:'24px',right:'24px',padding:'12px 20px',borderRadius:'8px',background:toast.type==='success'?'#10B981':'#EF4444',color:'white',fontWeight:'600',fontSize:'14px',zIndex:9999,boxShadow:'0 4px 12px rgba(0,0,0,0.15)'}}>{toast.msg}</div>}
    </>
  );
}
