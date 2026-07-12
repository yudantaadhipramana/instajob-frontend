'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ScrollAnimation } from '@/components/Animations';
import { Logo } from '@/components/Logo';
import { JobsIcon, ApplicationsIcon, ProfileIcon } from '@/components/DashboardIcons';
import ProfileDropdown from '@/components/ProfileDropdown';
import { Home, Settings } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  createdAt: string;
  workType?: string; // 'remote', 'onsite', 'hybrid'
}

interface User {
  id: string;
  email: string;
  fullName: string;
}

// Format date function
const formatPostDate = (dateString: string): string => {
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
    return 'Recently posted';
  }
};

// Get work type badge color
const getWorkTypeBadgeColor = (workType?: string): { bg: string; text: string; label: string } => {
  switch (workType?.toLowerCase()) {
    case 'remote':
      return { bg: '#EFF6FF', text: '#0369A1', label: '🌐 Remote' };
    case 'onsite':
      return { bg: '#FEF3C7', text: '#92400E', label: '🏢 Onsite' };
    case 'hybrid':
      return { bg: '#F3E8FF', text: '#6B21A8', label: '🔄 Hybrid' };
    default:
      return { bg: '#F1F5F9', text: '#64748B', label: '📍 Location' };
  }
};

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterWorkType, setFilterWorkType] = useState('all');
  const [user, setUser] = useState<User | null>(null);

  // Auth & Fetch Jobs
  useEffect(() => {
    const checkAuthAndFetchJobs = async () => {
      const token = localStorage.getItem('instajob_token');
      const userData = localStorage.getItem('instajob_user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      setUser(JSON.parse(userData));

      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
        const response = await fetch(`${apiBase}/api/jobs`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const jobsList = data.data || data.jobs || data;
          setJobs(jobsList);
          setFilteredJobs(jobsList);
        } else {
          setError('Failed to load jobs');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchJobs();
  }, [router]);

  // Apply Filters
  useEffect(() => {
    let filtered = jobs;

    if (searchQuery.trim()) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterLocation !== 'all') {
      filtered = filtered.filter(job => job.location === filterLocation);
    }

    if (filterWorkType !== 'all') {
      filtered = filtered.filter(job => job.workType?.toLowerCase() === filterWorkType.toLowerCase());
    }

    setFilteredJobs(filtered);
  }, [searchQuery, filterLocation, filterWorkType, jobs]);

  const handleApply = async (jobId: string) => {
    const token = localStorage.getItem('instajob_token');
    const userData = localStorage.getItem('instajob_user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userData);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
      const response = await fetch(`${apiBase}/api/applications`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          jobId: jobId,
          status: 'pending',
        }),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
      } else {
        const responseText = await response.text();
        alert('Failed to submit application: ' + responseText);
      }
    } catch (err) {
      alert('Error submitting application');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('instajob_token');
    localStorage.removeItem('instajob_user');
    router.push('/');
  };

  const uniqueLocations = Array.from(new Set(jobs.map(job => job.location)));
  const uniqueWorkTypes = Array.from(new Set(jobs.map(job => job.workType).filter(Boolean)));

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
            Loading job opportunities...
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
          <Home size={18} color="currentColor" />
          Dashboard
        </Link>
        <Link
          href="/jobs"
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
          <JobsIcon size={18} color="#0051FF" />
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
          href="/preferences"
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
          <Settings size={18} color="currentColor" />
          Preferences
        </Link>
      </div>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px', position: 'relative', zIndex: 1 }}>
        {/* Error Alert */}
        {error && (
          <div style={{
            background: '#FEE2E2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '32px',
            fontSize: '0.875rem',
          }}>
            {error}
          </div>
        )}

        {/* Search & Filter Section */}
        <ScrollAnimation delay={0}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '48px',
            transition: 'all 0.3s ease',
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1E293B', margin: '0 0 24px 0' }}>
              Search & Filter
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {/* Search Input */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>
                  Search Jobs
                </label>
                <input
                  type="text"
                  placeholder="Job title, company, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(0, 81, 255, 0.2)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0051FF';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 81, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 81, 255, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Location Filter */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>
                  Location
                </label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(0, 81, 255, 0.2)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0051FF';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 81, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 81, 255, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <option value="all">All Locations</option>
                  {uniqueLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Work Type Filter */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>
                  Work Type
                </label>
                <select
                  value={filterWorkType}
                  onChange={(e) => setFilterWorkType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(0, 81, 255, 0.2)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0051FF';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 81, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 81, 255, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <option value="all">All Work Types</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Results Counter */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>
                  Results
                </label>
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(0, 81, 255, 0.08)',
                  borderRadius: '8px',
                  color: '#0051FF',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                }}>
                  {filteredJobs.length} / {jobs.length}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Empty State */}
        {filteredJobs.length === 0 ? (
          <ScrollAnimation delay={100}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              padding: '64px 32px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '1.125rem', color: '#64748B', marginBottom: '24px' }}>
                No jobs found matching your criteria.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setFilterLocation('all'); setFilterWorkType('all'); }}
                style={{
                  padding: '12px 32px',
                  background: 'linear-gradient(135deg, #0051FF, #003AA3)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all 0.3s ease',
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
                Clear Filters
              </button>
            </div>
          </ScrollAnimation>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {filteredJobs.map((job, idx) => {
              const workTypeBadge = getWorkTypeBadgeColor(job.workType);
              return (
                <ScrollAnimation key={job.id} delay={idx * 50}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    borderRadius: '16px',
                    padding: '24px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.borderColor = '#0051FF';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 81, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Job Header */}
                    <div style={{ marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1E293B', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                        {job.title}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: '#0051FF', fontWeight: '600', margin: 0 }}>
                        {job.company}
                      </p>
                    </div>

                    {/* Work Type & Posted Badge */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 12px',
                        background: workTypeBadge.bg,
                        color: workTypeBadge.text,
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                      }}>
                        {workTypeBadge.label}
                      </span>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 12px',
                        background: '#F1F5F9',
                        color: '#64748B',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                      }}>
                        ⏱️ {formatPostDate(job.createdAt)}
                      </span>
                    </div>

                    {/* Job Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.875rem' }}>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {job.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.875rem' }}>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753 1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H8.5z" />
                        </svg>
                        {job.salary}
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#64748B',
                      marginBottom: '20px',
                      lineHeight: '1.6',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flex: 1,
                    }}>
                      {job.description}
                    </p>

                    {/* Apply Button */}
                    <button
                      onClick={() => handleApply(job.id)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'linear-gradient(135deg, #0051FF, #003AA3)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(0, 81, 255, 0.15)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 81, 255, 0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 81, 255, 0.15)';
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
