'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { JobsIcon, ApplicationsIcon, ProfileIcon } from '@/components/DashboardIcons';
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

    if (searchQuery.trim()) {
      filtered = filtered.filter(app =>
        app.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.company?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(app => app.status === filterStatus);
    }

    setFilteredApplications(filtered);
  }, [searchQuery, filterStatus, applications]);

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

      {/* Navigation Tabs */}
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
            color: '#0051FF',
            fontWeight: '700',
            fontSize: '14px',
            borderBottom: '2px solid #0051FF',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ApplicationsIcon size={18} color="#0051FF" />
          My Applications
        </Link>
      </div>

      {/* Main Content */}
      <main style={{
        position: 'relative',
        zIndex: 1,
        padding: '40px',
      }}>

        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#1E293B',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px',
          }}>
            My Applications
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#64748B',
            margin: 0,
          }}>
            Track and manage all your job applications in one place
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#FEE2E2',
            border: '1px solid #FECACA',
            color: '#991B1B',
            padding: '14px 16px',
            borderRadius: '10px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '500',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Stats Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}>
          {[
            { label: 'Total', value: stats.total, icon: '📋', color: '#0051FF' },
            { label: 'Pending', value: stats.pending, icon: '⏳', color: '#92400E' },
            { label: 'Accepted', value: stats.accepted, icon: '✅', color: '#166534' },
            { label: 'Rejected', value: stats.rejected, icon: '❌', color: '#991B1B' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 81, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{stat.icon}</div>
              <div style={{
                fontSize: '28px',
                fontWeight: '800',
                color: stat.color,
                marginBottom: '4px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#64748B',
                fontWeight: '600',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          {/* Search Input */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid rgba(0, 81, 255, 0.2)',
                borderRadius: '10px',
                fontSize: '14px',
                color: '#1E293B',
                background: 'rgba(255, 255, 255, 0.5)',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#0051FF';
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 81, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 81, 255, 0.2)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Status Filter Buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { value: 'all', label: 'All' },
              { value: 'pending', label: 'Pending' },
              { value: 'accepted', label: 'Accepted' },
              { value: 'rejected', label: 'Rejected' },
            ].map((btn) => {
              const isActive = filterStatus === btn.value;
              return (
                <button
                  key={btn.value}
                  onClick={() => setFilterStatus(btn.value)}
                  style={{
                    padding: '10px 16px',
                    background: isActive ? '#0051FF' : 'rgba(255, 255, 255, 0.5)',
                    color: isActive ? '#fff' : '#64748B',
                    border: isActive ? '1px solid #0051FF' : '1px solid rgba(0, 81, 255, 0.1)',
                    borderRadius: '10px',
                    fontWeight: isActive ? '600' : '500',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(0, 81, 255, 0.08)';
                      e.currentTarget.style.borderColor = '#0051FF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                      e.currentTarget.style.borderColor = 'rgba(0, 81, 255, 0.1)';
                    }
                  }}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Applications List or Empty State */}
        {filteredApplications.length === 0 ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            padding: '60px 40px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📋</div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1E293B',
              margin: '0 0 8px 0',
            }}>
              No applications yet
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#64748B',
              margin: '0 0 24px 0',
            }}>
              {searchQuery || filterStatus !== 'all'
                ? 'No applications match your filters'
                : 'Start applying to jobs to see them here'}
            </p>
            <Link
              href="/jobs"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                background: 'linear-gradient(135deg, #0051FF, #0051FF)',
                color: '#fff',
                borderRadius: '10px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(0, 81, 255, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 81, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 81, 255, 0.2)';
              }}
            >
              Browse Available Jobs
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredApplications.map((app) => {
              const statusConfig = getStatusConfig(app.status);
              return (
                <div
                  key={app.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '12px',
                    padding: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 81, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Header Row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#1E293B',
                        margin: '0 0 4px 0',
                      }}>
                        {app.jobTitle || 'Unknown Position'}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#0051FF',
                        fontWeight: '600',
                        margin: '0 0 4px 0',
                      }}>
                        {app.company || 'Unknown Company'}
                      </p>
                      {app.location && (
                        <p style={{
                          fontSize: '13px',
                          color: '#64748B',
                          margin: 0,
                        }}>
                          📍 {app.location}
                        </p>
                      )}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      background: statusConfig.bg,
                      color: statusConfig.text,
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '13px',
                      whiteSpace: 'nowrap',
                    }}>
                      <span>{statusConfig.icon}</span>
                      <span>{statusConfig.label}</span>
                    </div>
                  </div>

                  {/* Footer Row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(0, 81, 255, 0.05)',
                    fontSize: '12px',
                    color: '#64748B',
                  }}>
                    <span>
                      📅 Applied: {new Date(app.appliedAt || app.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    {app.notes && (
                      <span style={{ fontStyle: 'italic', color: '#94A3B8', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        💬 "{app.notes}"
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
