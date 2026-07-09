'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ScrollAnimation } from '@/components/Animations';
import { Logo } from '@/components/Logo';
import { JobsIcon, ApplicationsIcon, ProfileIcon } from '@/components/DashboardIcons';
import ProfileDropdown from '@/components/ProfileDropdown';

interface AutoApplyStats {
  isActive: boolean;
  jobsProcessedToday: number;
  successRate: number;
  applicationsToday: number;
  failedAttempts: number;
  pendingJobs: number;
}

interface CurrentActivity {
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'processing' | 'success' | 'failed' | 'pending';
  startTime: string;
  elapsedSeconds: number;
}

interface ActivityLog {
  id: string;
  jobTitle: string;
  company: string;
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
  details?: string;
}

interface User {
  id: string;
  email: string;
  fullName: string;
}

// Format time helper
const formatRelativeTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
};

// Get status badge color
const getStatusColor = (status: string): { bg: string; text: string; label: string } => {
  switch (status) {
    case 'success':
      return { bg: '#ECFDF5', text: '#065F46', label: '✓ Success' };
    case 'failed':
      return { bg: '#FEE2E2', text: '#991B1B', label: '✗ Failed' };
    case 'processing':
      return { bg: '#FEF3C7', text: '#92400E', label: '⟳ Processing' };
    case 'pending':
      return { bg: '#EFF6FF', text: '#0369A1', label: '⋯ Pending' };
    default:
      return { bg: '#F1F5F9', text: '#64748B', label: '? Unknown' };
  }
};

export default function MonitorPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Run status state machine: idle | running | paused
  // ponytail: hardcoded idle — fetch real status from GET /api/bot/status when endpoint ready
  const [runStatus, setRunStatus] = useState<'idle' | 'running' | 'paused'>('idle');

  // Stats
  const [stats, setStats] = useState<AutoApplyStats>({
    isActive: true,
    jobsProcessedToday: 24,
    successRate: 85,
    applicationsToday: 20,
    failedAttempts: 3,
    pendingJobs: 1,
  });

  // Current activity
  const [currentActivity] = useState<CurrentActivity | null>({
    jobId: 'job-123',
    jobTitle: 'Senior Frontend Engineer',
    company: 'Tech Company Inc',
    status: 'processing',
    startTime: new Date(Date.now() - 45000).toISOString(),
    elapsedSeconds: 45,
  });

  // Activity logs
  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: 'log-1',
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'success',
    },
    {
      id: 'log-2',
      jobTitle: 'UI/UX Designer',
      company: 'Creative Studio',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      status: 'failed',
    },
    {
      id: 'log-3',
      jobTitle: 'Product Manager',
      company: 'Innovation Labs',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      status: 'success',
    },
  ]);

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('instajob_token');
      const userData = localStorage.getItem('instajob_user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      setUser(JSON.parse(userData));
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('instajob_token');
    localStorage.removeItem('instajob_user');
    router.push('/');
  };

  const handleStart = () => {
    setRunStatus('running');
    setStats(prev => ({ ...prev, isActive: true }));
  };

  const handlePause = () => {
    setRunStatus('paused');
  };

  const handleStop = () => {
    setRunStatus('idle');
    setStats(prev => ({ ...prev, isActive: false }));
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FF 50%, #EEF2FF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <Logo size={48} showText={true} />
          <div style={{ marginTop: '20px', color: '#64748B', fontSize: '16px', fontWeight: '500' }}>
            Loading monitor...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FF 50%, #EEF2FF 100%)',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'fixed',
        width: '1000px',
        height: '1000px',
        borderRadius: '50%',
        top: '-300px',
        right: '-200px',
        background: 'radial-gradient(circle, rgba(0, 81, 255, 0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
        padding: '0 40px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Logo size={32} showText={true} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <ProfileDropdown user={user || undefined} />
        </div>
      </header>

      {/* Navigation Tabs — CONSISTENT WITH /dashboard AND /applications */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '0 40px',
        display: 'flex',
        gap: '8px',
      }}>
        <Link
          href="/dashboard"
          style={{
            padding: '16px 24px',
            textDecoration: 'none',
            color: '#64748B',
            fontWeight: '500',
            fontSize: '14px',
            borderBottom: '2px solid transparent',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0051FF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748B';
          }}
        >
          <JobsIcon size={18} color="currentColor" />
          Dashboard
        </Link>
        <Link
          href="/jobs"
          style={{
            padding: '16px 24px',
            textDecoration: 'none',
            color: '#64748B',
            fontWeight: '500',
            fontSize: '14px',
            borderBottom: '2px solid transparent',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0051FF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748B';
          }}
        >
          <JobsIcon size={18} color="currentColor" />
          Browse Jobs
        </Link>
        <Link
          href="/applications"
          style={{
            padding: '16px 24px',
            textDecoration: 'none',
            color: '#64748B',
            fontWeight: '500',
            fontSize: '14px',
            borderBottom: '2px solid transparent',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0051FF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748B';
          }}
        >
          <ApplicationsIcon size={18} color="currentColor" />
          Applications
        </Link>
        <Link
          href="/profile"
          style={{
            padding: '16px 24px',
            textDecoration: 'none',
            color: '#64748B',
            fontWeight: '500',
            fontSize: '14px',
            borderBottom: '2px solid transparent',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0051FF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748B';
          }}
        >
          <ProfileIcon size={18} color="currentColor" />
          Profile
        </Link>
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px', position: 'relative', zIndex: 1 }}>
        {/* Page Title */}
        <ScrollAnimation delay={0}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1E293B', margin: '0 0 8px 0' }}>
              Auto-Apply Monitor
            </h1>
            <p style={{ fontSize: '1rem', color: '#64748B', margin: 0 }}>
              Real-time monitoring of your automatic job applications
            </p>
          </div>
        </ScrollAnimation>

        {/* Current Activity Section */}
        <ScrollAnimation delay={200}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '40px',
            transition: 'all 0.3s ease',
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1E293B', margin: '0 0 24px 0' }}>
              Currently Processing
            </h2>

            {currentActivity ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px',
                alignItems: 'start',
              }}>
                {/* Job Details */}
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: '600', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                      Job Title
                    </p>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1E293B', margin: 0 }}>
                      {currentActivity.jobTitle}
                    </h3>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: '600', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                      Company
                    </p>
                    <p style={{ fontSize: '1rem', color: '#0051FF', fontWeight: '600', margin: 0 }}>
                      {currentActivity.company}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: '600', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                      Status
                    </p>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: getStatusColor(currentActivity.status).bg,
                      color: getStatusColor(currentActivity.status).text,
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                    }}>
                      <span style={{ display: 'inline-block', animation: 'pulse 2s infinite' }}>
                        ⟳
                      </span>
                      {getStatusColor(currentActivity.status).label}
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px 20px',
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'conic-gradient(#0051FF 0deg, #0051FF 180deg, #EFF6FF 180deg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}>
                      <span style={{ fontSize: '24px', fontWeight: '800', color: '#0051FF' }}>
                        {currentActivity.elapsedSeconds}s
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
                        elapsed
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', textAlign: 'center', margin: 0 }}>
                    Processing your application
                  </p>
                </div>
              </div>
            ) : (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: '#64748B',
              }}>
                <p>No jobs currently processing</p>
              </div>
            )}
          </div>
        </ScrollAnimation>

        {/* Configuration Panel */}
        <ScrollAnimation delay={300}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '40px',
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1E293B', margin: '0 0 24px 0' }}>
              Configuration
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Auto-Apply Toggle */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: '600', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                    Auto-Apply Status
                  </p>
                  <p style={{ fontSize: '1rem', color: '#1E293B', fontWeight: '600', margin: 0 }}>
                    Control automatic job applications
                  </p>
                </div>
                {/* State machine: IDLE→RUNNING→PAUSED. STOPPED=IDLE. */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {/* IDLE: Start only */}
                  {runStatus === 'idle' && (
                    <button
                      onClick={handleStart}
                      style={{
                        padding: '10px 20px',
                        background: 'linear-gradient(135deg, #10B981, #059669)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      ▶ Start
                    </button>
                  )}

                  {/* RUNNING: Pause + Stop */}
                  {runStatus === 'running' && (
                    <>
                      <button
                        onClick={handlePause}
                        style={{
                          padding: '10px 20px',
                          background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        ⏸ Pause
                      </button>
                      <button
                        onClick={handleStop}
                        style={{
                          padding: '10px 20px',
                          background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        ⏹ Stop
                      </button>
                    </>
                  )}

                  {/* PAUSED: Resume + Stop */}
                  {runStatus === 'paused' && (
                    <>
                      <button
                        onClick={handleStart}
                        style={{
                          padding: '10px 20px',
                          background: 'linear-gradient(135deg, #10B981, #059669)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        ▶ Resume
                      </button>
                      <button
                        onClick={handleStop}
                        style={{
                          padding: '10px 20px',
                          background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        ⏹ Stop
                      </button>
                    </>
                  )}
                </div>

                {/* Status badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  width: 'fit-content',
                  background: runStatus === 'running' ? '#ECFDF5' : runStatus === 'paused' ? '#FEF3C7' : '#F1F5F9',
                  color: runStatus === 'running' ? '#065F46' : runStatus === 'paused' ? '#92400E' : '#64748B',
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: runStatus === 'running' ? '#10B981' : runStatus === 'paused' ? '#F59E0B' : '#94A3B8',
                    animation: runStatus === 'running' ? 'pulse 2s infinite' : 'none',
                    display: 'inline-block',
                  }} />
                  {runStatus === 'running' ? 'Running' : runStatus === 'paused' ? 'Paused' : 'Idle'}
                </div>

                {/* Status badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  width: 'fit-content',
                  background: runStatus === 'running' ? '#ECFDF5' : runStatus === 'paused' ? '#FEF3C7' : '#F1F5F9',
                  color: runStatus === 'running' ? '#065F46' : runStatus === 'paused' ? '#92400E' : '#64748B',
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: runStatus === 'running' ? '#10B981' : runStatus === 'paused' ? '#F59E0B' : '#94A3B8',
                    animation: runStatus === 'running' ? 'pulse 2s infinite' : 'none',
                    display: 'inline-block',
                  }} />
                  {runStatus === 'running' ? 'Running' : runStatus === 'paused' ? 'Paused' : 'Idle'}
                </div>
              </div>

              {/* Settings Info */}
              <div>
                <p style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: '600', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                  Quick Settings
                </p>
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(0, 81, 255, 0.05)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: '#64748B',
                  lineHeight: '1.6',
                }}>
                  <p style={{ margin: '0 0 8px 0' }}>
                    • Scan jobs every 5 minutes
                  </p>
                  <p style={{ margin: '0 0 8px 0' }}>
                    • Match threshold: 80%
                  </p>
                  <p style={{ margin: 0 }}>
                    • Apply to: All locations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Activity Timeline */}
        <ScrollAnimation delay={400}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {activityLogs.length > 0 ? (
              activityLogs.map((log, idx) => {
                const statusColor = getStatusColor(log.status);
                return (
                  <div key={log.id} style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    borderRadius: '12px',
                    padding: '20px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.borderColor = '#0051FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                    }}
                  >
                    {/* Status Icon */}
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: statusColor.bg,
                      color: statusColor.text,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      fontWeight: '800',
                      flexShrink: 0,
                    }}>
                      {log.status === 'success' ? '✓' : log.status === 'failed' ? '✗' : '•'}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1E293B', margin: 0 }}>
                          {log.jobTitle}
                        </h4>
                        <span style={{ fontSize: '0.875rem', color: '#64748B' }}>
                          at {log.company}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0 }}>
                        {formatRelativeTime(log.timestamp)}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div style={{
                      padding: '6px 12px',
                      background: statusColor.bg,
                      color: statusColor.text,
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}>
                      {statusColor.label}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                padding: '40px',
                textAlign: 'center',
                color: '#64748B',
              }}>
                <p>No activity yet. Start auto-apply to see real-time updates here.</p>
              </div>
            )}
          </div>
        </ScrollAnimation>

        {/* Footer Section */}
        <ScrollAnimation delay={500}>
          <div style={{
            marginTop: '60px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
            textAlign: 'center',
            color: '#64748B',
            fontSize: '0.875rem',
          }}>
            <p style={{ margin: '0 0 16px 0' }}>
              💡 Tip: Auto-Apply is checking for new jobs and applying automatically in the background.
            </p>
            <p style={{ margin: 0 }}>
              Last synced: Just now • Next sync in ~5 minutes
            </p>
          </div>
        </ScrollAnimation>
      </main>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}


