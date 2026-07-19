'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ScrollAnimation } from '@/components/Animations';
import { Logo } from '@/components/Logo';
import { JobsIcon, ApplicationsIcon, ProfileIcon } from '@/components/DashboardIcons';
import ProfileDropdown from '@/components/ProfileDropdown';
import HeaderActions from '@/components/HeaderActions';
import { Home, Settings } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  remote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  postedAt?: string;
  postedDate?: string;
  createdAt?: string;
  workType?: string;
  industry?: string;
  tags?: string;
  sourceUrl?: string;
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

// Get work type badge color — derived from remote boolean (no workType field in DB)
const getWorkTypeBadge = (remote?: boolean): { bg: string; text: string; label: string } => {
  return remote
    ? { bg: '#EFF6FF', text: '#0369A1', label: '🌐 Remote' }
    : { bg: '#FEF3C7', text: '#92400E', label: '🏢 Onsite' };
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
  const [toast, setToast] = useState<{msg:string,type:'success'|'error'}|null>(null);
  const [allLocations, setAllLocations] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const showToast = (msg:string, type:'success'|'error'='success') => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  // Auth & Fetch Jobs
  useEffect(() => {
    const checkAuthAndFetchJobs = async (page = 1) => {
      const token = localStorage.getItem('instajob_token');
      const userData = localStorage.getItem('instajob_user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      setUser(JSON.parse(userData));
      setLoading(true);

      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
        const params = new URLSearchParams();
        params.set('page', String(page));
        if (searchQuery.trim()) params.set('search', searchQuery.trim());
        if (filterWorkType === 'remote') params.set('remote', 'true');
        if (filterWorkType === 'onsite') params.set('remote', 'false');
        if (filterLocation !== 'all') params.set('location', filterLocation);

        const response = await fetch(`${apiBase}/api/jobs?${params.toString()}`, {
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
          setTotalPages(data.pagination?.pages || 1);
          setTotalJobs(data.pagination?.total || jobsList.length);
          setCurrentPage(page);
        } else {
          setError('Failed to load jobs');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchJobs(1);

    // Fetch all distinct locations for dropdown
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
    fetch(`${apiBase}/api/jobs/locations`)
      .then(r => r.json())
      .then(setAllLocations)
      .catch(() => {});

  }, [router]);

  // Re-fetch when filters change (reset to page 1)
  useEffect(() => {
    const token = localStorage.getItem('instajob_token');
    if (!token) return;
    const fetchWithFilters = async () => {
      setLoading(true);
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
        const params = new URLSearchParams();
        params.set('page', '1');
        if (searchQuery.trim()) params.set('search', searchQuery.trim());
        if (filterWorkType === 'remote') params.set('remote', 'true');
        if (filterWorkType === 'onsite') params.set('remote', 'false');
        if (filterLocation !== 'all') params.set('location', filterLocation);
        const r = await fetch(`${apiBase}/api/jobs?${params}`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (r.ok) {
          const data = await r.json();
          const list = data.data || data.jobs || data;
          setJobs(list);
          setFilteredJobs(list);
          setTotalPages(data.pagination?.pages || 1);
          setTotalJobs(data.pagination?.total || list.length);
          setCurrentPage(1);
        }
      } finally { setLoading(false); }
    };
    const debounce = setTimeout(fetchWithFilters, 400);
    return () => clearTimeout(debounce);
  }, [searchQuery, filterLocation, filterWorkType]);

  const handleViewJob = (job: Job) => {
    if (job.sourceUrl) {
      window.open(job.sourceUrl, '_blank');
    } else {
      showToast('Link lowongan tidak tersedia', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('instajob_token');
    localStorage.removeItem('instajob_user');
    router.push('/');
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
          <HeaderActions user={user || undefined} />
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
          <ApplicationsIcon size={18} color="currentColor" />
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
                  {allLocations.map(location => (
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
                  {filteredJobs.length} / {totalJobs}
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
              const workTypeBadge = getWorkTypeBadge(job.remote);
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
                        ⏱️ {formatPostDate(job.postedAt || job.postedDate || job.createdAt)}
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
                        {job.salaryMin ? `Rp ${(job.salaryMin/1000000).toFixed(0)}jt${job.salaryMax ? ` - ${(job.salaryMax/1000000).toFixed(0)}jt` : '+'}` : 'Negotiable'}
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

                    {/* View Job Button */}
                    <button
                      onClick={() => handleViewJob(job)}
                      title="Buka lowongan di halaman asli"
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
                    >
                      View Job →
                    </button>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '32px', paddingBottom: '24px' }}>
            <button
              onClick={() => { if (currentPage > 1) { const t = localStorage.getItem('instajob_token'); if (t) { setLoading(true); const apiBase = process.env.NEXT_PUBLIC_API_URL||'https://instajob-backend-production.up.railway.app'; const p=new URLSearchParams(); p.set('page',String(currentPage-1)); if(searchQuery.trim())p.set('search',searchQuery.trim()); if(filterWorkType==='remote')p.set('remote','true'); fetch(`${apiBase}/api/jobs?${p}`,{headers:{'Authorization':`Bearer ${t}`}}).then(r=>r.json()).then(d=>{const l=d.data||[];setJobs(l);setFilteredJobs(l);setCurrentPage(currentPage-1);setTotalPages(d.pagination?.pages||1);setTotalJobs(d.pagination?.total||l.length);}).finally(()=>setLoading(false)); } } }}
              disabled={currentPage <= 1}
              style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', background: currentPage<=1?'#F8FAFC':'#FFFFFF', color: currentPage<=1?'#94A3B8':'#1E293B', cursor: currentPage<=1?'not-allowed':'pointer', fontWeight: '600', fontSize: '14px' }}
            >← Prev</button>

            {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
              const start = Math.max(1, currentPage - 2);
              const page = start + i;
              if (page > totalPages) return null;
              return (
                <button key={page}
                  onClick={() => { const t = localStorage.getItem('instajob_token'); if (!t) return; setLoading(true); const apiBase = process.env.NEXT_PUBLIC_API_URL||'https://instajob-backend-production.up.railway.app'; const p=new URLSearchParams(); p.set('page',String(page)); if(searchQuery.trim())p.set('search',searchQuery.trim()); if(filterWorkType==='remote')p.set('remote','true'); fetch(`${apiBase}/api/jobs?${p}`,{headers:{'Authorization':`Bearer ${t}`}}).then(r=>r.json()).then(d=>{const l=d.data||[];setJobs(l);setFilteredJobs(l);setCurrentPage(page);setTotalPages(d.pagination?.pages||1);setTotalJobs(d.pagination?.total||l.length);}).finally(()=>setLoading(false)); }}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: page===currentPage?'2px solid #0051FF':'1px solid #E2E8F0', background: page===currentPage?'#0051FF':'#FFFFFF', color: page===currentPage?'#FFFFFF':'#1E293B', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
                >{page}</button>
              );
            })}

            <button
              onClick={() => { if (currentPage < totalPages) { const t = localStorage.getItem('instajob_token'); if (t) { setLoading(true); const apiBase = process.env.NEXT_PUBLIC_API_URL||'https://instajob-backend-production.up.railway.app'; const p=new URLSearchParams(); p.set('page',String(currentPage+1)); if(searchQuery.trim())p.set('search',searchQuery.trim()); if(filterWorkType==='remote')p.set('remote','true'); fetch(`${apiBase}/api/jobs?${p}`,{headers:{'Authorization':`Bearer ${t}`}}).then(r=>r.json()).then(d=>{const l=d.data||[];setJobs(l);setFilteredJobs(l);setCurrentPage(currentPage+1);setTotalPages(d.pagination?.pages||1);setTotalJobs(d.pagination?.total||l.length);}).finally(()=>setLoading(false)); } } }}
              disabled={currentPage >= totalPages}
              style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', background: currentPage>=totalPages?'#F8FAFC':'#FFFFFF', color: currentPage>=totalPages?'#94A3B8':'#1E293B', cursor: currentPage>=totalPages?'not-allowed':'pointer', fontWeight: '600', fontSize: '14px' }}
            >Next →</button>

            <span style={{ fontSize: '13px', color: '#64748B', marginLeft: '8px' }}>Hal {currentPage} / {totalPages}</span>
          </div>
        )}
      </main>
      {toast && <div style={{position:'fixed',bottom:'24px',right:'24px',padding:'12px 20px',borderRadius:'8px',background:toast.type==='success'?'#10B981':'#EF4444',color:'white',fontWeight:'600',fontSize:'14px',zIndex:9999,boxShadow:'0 4px 12px rgba(0,0,0,0.15)'}}>{toast.msg}</div>}
    </div>
  );
}
