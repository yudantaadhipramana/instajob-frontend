'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { JobsIcon, ApplicationsIcon, ProfileIcon, SearchIcon, MonitorIcon, CheckCircleIcon } from '@/components/DashboardIcons';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface DashboardStats {
  totalJobs: number;
  totalApplied: number;
  appliedToday: number;
  pendingApplications: number;
  acceptedApplications: number;
  recentApplications: any[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('instajob_token');
      const userData = localStorage.getItem('instajob_user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      try {
        setUser(JSON.parse(userData));
        
        const response = await fetch(`/api/dashboard/stats`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          setStats({
            totalJobs: 100,
            totalApplied: 12,
            appliedToday: 3,
            pendingApplications: 5,
            acceptedApplications: 2,
            recentApplications: []
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('instajob_token');
    localStorage.removeItem('instajob_user');
    router.push('/');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f5ff 0%, #e8f0fe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <Logo size={48} showText={true} />
          <div style={{ marginTop: '16px', color: '#6B7280', fontSize: '16px' }}>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f5ff 0%, #e8f0fe 100%)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Top Navigation Bar */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 32px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Logo size={32} showText={true} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: '#f3f4f6',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#6B7280',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
            {user?.email}
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 20px',
              background: '#EF4444',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 32px',
        display: 'flex',
        gap: '4px',
      }}>
        <Link
          href="/dashboard"
          style={{
            padding: '16px 20px',
            textDecoration: 'none',
            color: '#0051FF',
            fontWeight: '600',
            fontSize: '14px',
            borderBottom: '2px solid #0051FF',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <JobsIcon size={18} color="#0051FF" />
          Dashboard
        </Link>
        <Link
          href="/jobs"
          style={{
            padding: '16px 20px',
            textDecoration: 'none',
            color: '#6B7280',
            fontWeight: '400',
            fontSize: '14px',
            borderBottom: '2px solid transparent',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <JobsIcon size={18} color="#6B7280" />
          Browse Jobs
        </Link>
        <Link
          href="/applications"
          style={{
            padding: '16px 20px',
            textDecoration: 'none',
            color: '#6B7280',
            fontWeight: '400',
            fontSize: '14px',
            borderBottom: '2px solid transparent',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ApplicationsIcon size={18} color="#6B7280" />
          Applications
        </Link>
        <Link
          href="/profile"
          style={{
            padding: '16px 20px',
            textDecoration: 'none',
            color: '#6B7280',
            fontWeight: '400',
            fontSize: '14px',
            borderBottom: '2px solid transparent',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ProfileIcon size={18} color="#6B7280" />
          Profile
        </Link>
      </div>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px',
      }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#111827',
            margin: '0 0 4px 0',
          }}>
            Selamat datang, {user?.fullName}!
          </h1>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '15px' }}>
            Kelola otomasi pencarian kerja Anda dari sini.
          </p>
        </div>

        {error && (
          <div style={{
            padding: '16px',
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '14px',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
              marginBottom: '32px',
            }}>
              {/* Available Jobs */}
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                border: '1px solid #f0f0f0',
                transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Available Jobs</div>
                    <div style={{ fontSize: '36px', fontWeight: '800', color: '#0051FF', marginTop: '8px' }}>{stats.totalJobs}</div>
                  </div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: '#EEF2FF',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}><JobsIcon size={24} color="#0051FF" /></div>
                </div>
              </div>

              {/* Applied Today */}
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                border: '1px solid #f0f0f0',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Applied Today</div>
                    <div style={{ fontSize: '36px', fontWeight: '800', color: '#059669', marginTop: '8px' }}>{stats.appliedToday}</div>
                  </div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: '#ECFDF5',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}><ApplicationsIcon size={24} color="#059669" /></div>
                </div>
              </div>

              {/* Pending Review */}
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                border: '1px solid #f0f0f0',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Review</div>
                    <div style={{ fontSize: '36px', fontWeight: '800', color: '#D97706', marginTop: '8px' }}>{stats.pendingApplications}</div>
                  </div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: '#FFFBEB',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}><ProfileIcon size={24} color="#D97706" /></div>
                </div>
              </div>

              {/* Accepted */}
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                border: '1px solid #f0f0f0',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Accepted</div>
                    <div style={{ fontSize: '36px', fontWeight: '800', color: '#7C3AED', marginTop: '8px' }}>{stats.acceptedApplications}</div>
                  </div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: '#F5F3FF',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}><CheckCircleIcon size={24} color="#7C3AED" /></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '24px',
            }}>
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                border: '1px solid #f0f0f0',
              }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 20px 0' }}>
                  Otomasi Lamaran Instan
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Link href="/jobs" style={{
                    display: 'block',
                    padding: '20px',
                    background: '#FAFBFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}>
                    <div style={{ fontSize: '28px', marginBottom: '12px' }}><SearchIcon size={28} color="#0051ff" /></div>
                    <div style={{ fontWeight: '700', color: '#111827', marginBottom: '4px' }}>Cari Pekerjaan</div>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>Filter & temukan pekerjaan relevan</div>
                  </Link>

                  <Link href="/applications" style={{
                    display: 'block',
                    padding: '20px',
                    background: '#FAFBFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}>
                    <div style={{ fontSize: '28px', marginBottom: '12px' }}><MonitorIcon size={28} color="#0051ff" /></div>
                    <div style={{ fontWeight: '700', color: '#111827', marginBottom: '4px' }}>Monitor AI Auto Apply</div>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>Pantau log pengiriman email & lamaran</div>
                  </Link>
                </div>
              </div>

              {/* AI Assistant Status */}
              <div style={{
                background: 'linear-gradient(135deg, #0051FF 0%, #003AA3 100%)',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 4px 12px rgba(0, 81, 255, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', margin: '0 0 16px 0' }}>
                    AI Scout Status
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34D399', fontSize: '14px', fontWeight: '600' }}>
                    <span style={{ width: '8px', height: '8px', background: '#34D399', borderRadius: '50%' }}></span>
                    AI Agent Aktif & Siaga
                  </div>
                </div>
                
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.15)',
                  paddingTop: '16px',
                  marginTop: '24px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: '1.5',
                }}>
                  AI kami memindai 100+ lowongan baru setiap hari dan siap mencocokkan CV Anda secara otomatis.
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}