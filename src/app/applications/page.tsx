'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import AutoApplyQueuePanel from '@/components/AutoApplyQueuePanel';

interface Application {
  id: string;
  jobId: string;
  status: string;
  appliedAt: string;
  job: {
    title: string;
    company: string;
    location: string;
  };
}

type ColumnType = 'applied' | 'interview' | 'offer' | 'rejected';

const COLUMNS: { id: ColumnType; title: string; color: string }[] = [
  { id: 'applied', title: 'Applied', color: '#3B82F6' },
  { id: 'interview', title: 'Interviewing', color: '#F59E0B' },
  { id: 'offer', title: 'Offers', color: '#10B981' },
  { id: 'rejected', title: 'Rejected', color: '#EF4444' },
];

export default function ApplicationsPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [draggedItem, setDraggedItem] = useState<Application | null>(null);
  const [activeTab, setActiveTab] = useState<'kanban' | 'queue'>('kanban');

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchApplications = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
        const response = await fetch(`${apiBase}/api/applications`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setApplications(data.applications || []);
        } else {
          setError('Failed to load applications');
        }
      } catch (err) {
        console.error(err);
        setError('Error loading applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token, router]);

  const handleDragStart = (app: Application) => {
    setDraggedItem(app);
  };

  const handleDrop = async (newStatus: ColumnType) => {
    if (!draggedItem || draggedItem.status === newStatus) {
      setDraggedItem(null);
      return;
    }

    // Optimistic update
    const updated = applications.map(app =>
      app.id === draggedItem.id ? { ...app, status: newStatus } : app
    );
    setApplications(updated);

    // Call API to update status
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
      const response = await fetch(`${apiBase}/api/applications/${draggedItem.id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        // Rollback on failure
        setApplications(applications);
        setError('Failed to update status on server');
      }
    } catch (err) {
      console.error(err);
      setApplications(applications);
      setError('Connection error updating status');
    }
    setDraggedItem(null);
  };

  const getApplicationsByStatus = (status: ColumnType) =>
    applications.filter(app => app.status === status);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0B1120', color: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>Loading applications...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B1120', color: '#F8FAFC' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '24px', overflowX: 'auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Application Tracker</h1>
          <p style={{ color: '#94A3B8' }}>Track your job applications across all stages</p>
        </div>

        {/* Tab Navigation */}
        <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setActiveTab('kanban')}
            style={{
              padding: '10px 16px',
              backgroundColor: activeTab === 'kanban' ? '#3B82F6' : 'rgba(255,255,255,0.1)',
              color: activeTab === 'kanban' ? '#FFFFFF' : '#94A3B8',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Kanban Board
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            style={{
              padding: '10px 16px',
              backgroundColor: activeTab === 'queue' ? '#3B82F6' : 'rgba(255,255,255,0.1)',
              color: activeTab === 'queue' ? '#FFFFFF' : '#94A3B8',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Auto-Apply Queue
          </button>
        </div>

        {error && (
          <div style={{ padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#F87171', borderRadius: '8px', marginBottom: '24px' }}>
            {error}
          </div>
        )}

        {/* Kanban Board Tab */}
        {activeTab === 'kanban' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', minWidth: '100%' }} role="main" aria-label="Application tracking kanban board">
              {COLUMNS.map(column => (
                <div
                  key={column.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(column.id)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: `2px solid ${column.color}33`,
                    borderRadius: '12px',
                    padding: '16px',
                    minHeight: '600px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  role="region"
                  aria-label={`${column.title} column with ${getApplicationsByStatus(column.id).length} applications`}
                >
                  <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: `2px solid ${column.color}` }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: column.color }}>{column.title}</h3>
                    <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }} aria-live="polite">
                      {getApplicationsByStatus(column.id).length} applications
                    </p>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {getApplicationsByStatus(column.id).map(app => (
                      <div
                        key={app.id}
                        draggable
                        onDragStart={() => handleDragStart(app)}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          padding: '12px',
                          cursor: 'grab',
                          transition: 'all 0.2s',
                          borderLeft: `4px solid ${column.color}`,
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`${app.job.title} at ${app.job.company}, applied on ${new Date(app.appliedAt).toLocaleDateString()}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleDragStart(app);
                          }
                        }}
                      >
                        <p style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{app.job.title}</p>
                        <p style={{ fontSize: '12px', color: '#64748B' }}>{app.job.company}</p>
                        <p style={{ fontSize: '11px', color: '#475569', marginTop: '8px' }}>
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {applications.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
                <p style={{ fontSize: '18px', marginBottom: '16px' }}>No applications yet</p>
                <Link href="/jobs" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: '600' }}>
                  Browse jobs and start applying →
                </Link>
              </div>
            )}
          </>
        )}

        {/* Auto-Apply Queue Tab */}
        {activeTab === 'queue' && (
          <AutoApplyQueuePanel />
        )}
      </main>
    </div>
  );
}
