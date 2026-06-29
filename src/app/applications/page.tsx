'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { JobsIcon, ApplicationsIcon, ProfileIcon } from '@/components/DashboardIcons';
import ProfileDropdown from '@/components/ProfileDropdown';
import { Home, Settings } from 'lucide-react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  status: 'applied' | 'interviewing' | 'accepted' | 'rejected';
  appliedAt: string;
  createdAt: string;
  notes?: string;
}

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'Tech Corp',
      location: 'Jakarta, Indonesia',
      status: 'interviewing',
      appliedAt: '2026-06-25',
      createdAt: '2026-06-25',
      notes: 'Round 2 scheduled for next week',
    },
    {
      id: '2',
      jobTitle: 'Full Stack Engineer',
      company: 'Startup XYZ',
      location: 'Remote',
      status: 'applied',
      appliedAt: '2026-06-24',
      createdAt: '2026-06-24',
    },
    {
      id: '3',
      jobTitle: 'Product Manager',
      company: 'Digital Agency',
      location: 'Surabaya, Indonesia',
      status: 'accepted',
      appliedAt: '2026-06-20',
      createdAt: '2026-06-20',
      notes: 'Start date: July 15, 2026',
    },
    {
      id: '4',
      jobTitle: 'UI/UX Designer',
      company: 'Creative Studio',
      location: 'Bandung, Indonesia',
      status: 'rejected',
      appliedAt: '2026-06-18',
      createdAt: '2026-06-18',
    },
    {
      id: '5',
      jobTitle: 'Data Analyst',
      company: 'Finance Corp',
      location: 'Jakarta, Indonesia',
      status: 'interviewing',
      appliedAt: '2026-06-22',
      createdAt: '2026-06-22',
      notes: 'Technical assessment completed',
    },
  ]);

  const [filteredApplications, setFilteredApplications] = useState<Application[]>(applications);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter((app) => app.status === statusFilter));
    }
  }, [statusFilter, applications]);

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; bg: string; text: string }> = {
      applied: { label: '📬 Applied', bg: '#F3F4F6', text: '#6B7280' },
      interviewing: { label: '🗣️ Interviewing', bg: '#DBEAFE', text: '#1E40AF' },
      accepted: { label: '✅ Accepted', bg: '#DCFCE7', text: '#15803D' },
      rejected: { label: '❌ Rejected', bg: '#FEE2E2', text: '#DC2626' },
    };
    return configs[status] || configs.applied;
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FF 50%, #EEF2FF 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated Gradient Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 50%, rgba(0, 81, 255, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0, 81, 255, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Logo />
        <ProfileDropdown />
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

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Page Title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            margin: '0 0 12px 0',
            color: '#1E293B',
          }}>
            Your Applications
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#64748B',
            margin: 0,
          }}>
            Track all your job applications in one place
          </p>
        </div>

        {/* Filter Section */}
        <div style={{
          marginBottom: '32px',
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
        }}>
          <label style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: '600',
            color: '#1E293B',
            marginBottom: '8px',
          }}>
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '12px 14px',
              fontSize: '14px',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.2s',
              backgroundColor: '#FFFFFF',
              color: '#1E293B',
              cursor: 'pointer',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#0051FF'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
          >
            <option value="all">All Applications</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
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
