'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { JobsIcon, ApplicationsIcon, HomeIcon } from '@/components/DashboardIcons';
import { Settings } from 'lucide-react';
import ProfileDropdown from '@/components/ProfileDropdown';

interface Application {
  id: string;
  jobId: string;
  status: string;
  notes?: string;
  appliedAt: string;
  createdAt: string;
  jobTitle?: string;
  company?: string;
  location?: string;
}

interface User {
  id: string;
  email: string;
  fullName: string;
}

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [user, setUser] = useState<User | null>(null);

  // Auth & Fetch Applications
  useEffect(() => {
    const checkAuthAndFetchApplications = async () => {
      const token = localStorage.getItem('instajob_token');
      const userData = localStorage.getItem('instajob_user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      setUser(JSON.parse(userData));

      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
        const response = await fetch(`${apiBase}/api/applications`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const appsList = data.applications || data;
          setApplications(appsList);
          setFilteredApplications(appsList);
        } else {
          setError('Failed to load applications');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchApplications();
  }, [router]);

  // Apply Filters
  useEffect(() => {
    let filtered = applications;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(app => app.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(app =>
        app.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.company?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  }, [applications, filterStatus, searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem('instajob_token');
    localStorage.removeItem('instajob_user');
    router.push('/');
  };

  // Get Status Badge Config
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { bg: '#FEF3C7', text: '#92400E', label: '⏳ Pending', icon: '⏳' };
      case 'accepted':
        return { bg: '#DCFCE7', text: '#166534', label: '✅ Accepted', icon: '✅' };
      case 'rejected':
        return { bg: '#FEE2E2', text: '#991B1B', label: '❌ Rejected', icon: '❌' };
      default:
        return { bg: '#F1F5F9', text: '#64748B', label: '❓ Unknown', icon: '❓' };
    }
  };

  // Stats
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  // Loading State
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
        <div style={{ textAlign: 'center', animation: 'fadeIn 0.6s ease-out' }}>
          <Logo size={48} showText={true} />
          <div style={{ marginTop: '20px', color: '#64748B', fontSize: '16px', fontWeight: '500' }}>
            Loading your applications...
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
      {/* Premium Background Glow Effects */}
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

      {/* Top Navigation Bar */}
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

      {/* Navigation Tabs — CONSISTENT WITH /dashboard */}
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
            fontWeight: '600',
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
          <HomeIcon size={18} color="currentColor" />
          Dashboard
        </Link>
        <Link
          href="/jobs"
          style={{
            padding: '16px 24px',
            textDecoration: 'none',
            color: '#64748B',
            fontWeight: '600',
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
            color: '#0051FF',
            fontWeight: '700',
            fontSize: '14px',
            borderBottom: '2px solid #0051FF',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <ApplicationsIcon size={18} color="#0051FF" />
          Applications
        </Link>
        <Link
          href="/preferences"
          style={{
            padding: '16px 24px',
            textDecoration: 'none',
            color: '#64748B',
            fontWeight: '600',
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
          <Settings size={18} color="currentColor" />
          Preferences
        </Link>
      </div>

      {/* Main Content Area */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Page Title */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            margin: '0 0 12px 0',
            color: '#1E293B',
          }}>
            My Applications
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#64748B',
            margin: 0,
          }}>
            Track all your job applications in one place
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            marginBottom: '24px',
            padding: '16px',
            background: '#FEE2E2',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            color: '#991B1B',
            fontSize: '14px',
            fontWeight: '600',
          }}>
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px',
        }}>
          {[
            { label: 'Total', value: stats.total, color: '#0051FF' },
            { label: 'Pending', value: stats.pending, color: '#F59E0B' },
            { label: 'Accepted', value: stats.accepted, color: '#10B981' },
            { label: 'Rejected', value: stats.rejected, color: '#EF4444' },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 81, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: '12px',
                color: '#64748B',
                margin: '0 0 8px 0',
                fontWeight: '600',
              }}>
                {stat.label}
              </p>
              <p style={{
                fontSize: '28px',
                fontWeight: '800',
                margin: 0,
                color: stat.color,
              }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filter & Search Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '24px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '10px 12px',
              fontSize: '13px',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#0051FF'}
            onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '10px 12px',
              fontSize: '13px',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              outline: 'none',
              transition: 'border-color 0.2s',
              backgroundColor: '#FFFFFF',
              color: '#1E293B',
              cursor: 'pointer',
            }}
            onFocus={(e) => e.target.style.borderColor = '#0051FF'}
            onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Applications List */}
        {filteredApplications.length > 0 ? (
          <div style={{
            display: 'grid',
            gap: '12px',
          }}>
            {filteredApplications.map((app) => {
              const statusConfig = getStatusConfig(app.status);
              return (
                <div key={app.id} style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0, 81, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto auto',
                  gap: '16px',
                  alignItems: 'center',
                }}>
                  {/* Job Info */}
                  <div>
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: '700',
                      margin: '0 0 6px 0',
                      color: '#1E293B',
                    }}>
                      {app.jobTitle || 'Job Position'}
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: '#64748B',
                      margin: '0 0 4px 0',
                    }}>
                      {app.company || 'Company'} • {app.location || 'Location'}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#94A3B8',
                      margin: 0,
                    }}>
                      Applied on {new Date(app.appliedAt || app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  {/* Notes (if any) */}
                  {app.notes && (
                    <div style={{
                      fontSize: '12px',
                      color: '#64748B',
                      fontStyle: 'italic',
                      maxWidth: '200px',
                      textAlign: 'right',
                    }}>
                      {app.notes}
                    </div>
                  )}

                  {/* Status Badge */}
                  <div style={{
                    padding: '8px 12px',
                    background: statusConfig.bg,
                    color: statusConfig.text,
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                  }}>
                    {statusConfig.label}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 81, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}>
            <p style={{
              fontSize: '16px',
              color: '#64748B',
              margin: 0,
            }}>
              No applications found. Start applying for jobs now!
            </p>
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
