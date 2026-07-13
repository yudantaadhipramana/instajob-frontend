'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { JobsIcon, ApplicationsIcon, ProfileIcon, SearchIcon, MonitorIcon, CheckCircleIcon } from '@/components/DashboardIcons';
import { Home, Settings } from 'lucide-react';
import ProfileDropdown from '@/components/ProfileDropdown';

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
  const [completeness, setCompleteness] = useState<{score:number,missing:string[]}|null>(null);

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
        
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
        const response = await fetch(`${apiBase}/api/dashboard/stats`, {
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

        // Fetch profile completeness
        fetch(`${apiBase}/api/user/completeness`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.json()).then(d => {
          if (d.score !== undefined) setCompleteness(d);
        }).catch(() => {});
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
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FF 50%, #EEF2FF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        <div style={{ 
          textAlign: 'center',
          animation: 'fadeIn 0.6s ease-out'
        }}>
          <Logo size={48} showText={true} />
          <div style={{ marginTop: '20px', color: '#64748B', fontSize: '16px', fontWeight: '500' }}>
            Loading your dashboard...
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
          <Home size={18} color="#0051FF" />
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

      {/* Main Content */}
      <main style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '40px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '40px', animation: 'fadeIn 0.6s ease-out' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#0F172A',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
          }}>
            Selamat datang, {user?.fullName}! 👋
          </h1>
          <p style={{
            color: '#64748B',
            margin: 0,
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Kelola otomasi pencarian kerja Anda dengan dashboard premium kami.
          </p>
        </div>

        {error && (
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #FEE2E2, #FEF2F2)',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            color: '#DC2626',
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600',
            animation: 'slideDown 0.3s ease-out',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Profile Completeness Widget */}
        {completeness && completeness.score < 100 && (
          <div style={{ background: '#fff', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', border: '1px solid #E2E8F0', animation: 'fadeIn 0.6s ease-out 0.15s both' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontWeight: '700', fontSize: '15px', color: '#1E293B' }}>📋 Kelengkapan Profil</span>
              <span style={{ fontWeight: '800', fontSize: '18px', color: completeness.score >= 70 ? '#16A34A' : completeness.score >= 40 ? '#D97706' : '#DC2626' }}>{completeness.score}%</span>
            </div>
            <div style={{ background: '#F1F5F9', borderRadius: '8px', height: '8px', overflow: 'hidden', marginBottom: '12px' }}>
              <div style={{ background: completeness.score >= 70 ? '#16A34A' : completeness.score >= 40 ? '#F59E0B' : '#EF4444', height: '100%', width: `${completeness.score}%`, borderRadius: '8px', transition: 'width 0.6s ease' }} />
            </div>
            {completeness.missing.length > 0 && (
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 8px' }}>
                Lengkapi: {completeness.missing.slice(0, 3).join(', ')}{completeness.missing.length > 3 ? ` +${completeness.missing.length - 3} lainnya` : ''}
              </p>
            )}
            <a href="/preferences" style={{ fontSize: '13px', color: '#1E40FF', fontWeight: '600', textDecoration: 'none' }}>Lengkapi Profil →</a>
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              marginBottom: '40px',
              animation: 'fadeIn 0.6s ease-out 0.1s both',
            }}>
              {/* Available Jobs Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(0, 81, 255, 0.06), 0 0 1px rgba(0, 81, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 81, 255, 0.12), 0 0 1px rgba(0, 81, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 81, 255, 0.06), 0 0 1px rgba(0, 81, 255, 0.1)';
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      color: '#94A3B8', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.08em',
                      marginBottom: '8px'
                    }}>
                      Available Jobs
                    </div>
                    <div style={{ fontSize: '42px', fontWeight: '900', color: '#0051FF', margin: 0 }}>
                      {stats.totalJobs}
                    </div>
                  </div>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    boxShadow: '0 4px 12px rgba(0, 81, 255, 0.15)',
                  }}>
                    <JobsIcon size={28} color="#0051FF" />
                  </div>
                </div>
              </div>

              {/* Applied Today Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.06), 0 0 1px rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.12), 0 0 1px rgba(16, 185, 129, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.06), 0 0 1px rgba(16, 185, 129, 0.1)';
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      color: '#94A3B8', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.08em',
                      marginBottom: '8px'
                    }}>
                      Applied Today
                    </div>
                    <div style={{ fontSize: '42px', fontWeight: '900', color: '#10B981', margin: 0 }}>
                      {stats.appliedToday}
                    </div>
                  </div>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
                  }}>
                    <ApplicationsIcon size={28} color="#10B981" />
                  </div>
                </div>
              </div>

              {/* Pending Review Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(251, 191, 36, 0.06), 0 0 1px rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(251, 191, 36, 0.12), 0 0 1px rgba(251, 191, 36, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(251, 191, 36, 0.06), 0 0 1px rgba(251, 191, 36, 0.1)';
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      color: '#94A3B8', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.08em',
                      marginBottom: '8px'
                    }}>
                      Pending Review
                    </div>
                    <div style={{ fontSize: '42px', fontWeight: '900', color: '#F59E0B', margin: 0 }}>
                      {stats.pendingApplications}
                    </div>
                  </div>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    boxShadow: '0 4px 12px rgba(251, 191, 36, 0.15)',
                  }}>
                    <MonitorIcon size={28} color="#F59E0B" />
                  </div>
                </div>
              </div>

              {/* Accepted Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(124, 58, 237, 0.06), 0 0 1px rgba(124, 58, 237, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(124, 58, 237, 0.12), 0 0 1px rgba(124, 58, 237, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(124, 58, 237, 0.06), 0 0 1px rgba(124, 58, 237, 0.1)';
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      color: '#94A3B8', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.08em',
                      marginBottom: '8px'
                    }}>
                      Accepted
                    </div>
                    <div style={{ fontSize: '42px', fontWeight: '900', color: '#7C3AED', margin: 0 }}>
                      {stats.acceptedApplications}
                    </div>
                  </div>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)',
                  }}>
                    <CheckCircleIcon size={28} color="#7C3AED" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & AI Status Section */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '24px',
              marginBottom: '40px',
              animation: 'fadeIn 0.6s ease-out 0.2s both',
            }}>
              {/* Quick Actions */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0, 81, 255, 0.06), 0 0 1px rgba(0, 81, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
              }}>
                <h2 style={{ 
                  fontSize: '20px', 
                  fontWeight: '800', 
                  color: '#0F172A', 
                  margin: '0 0 24px 0',
                  letterSpacing: '-0.01em'
                }}>
                  ⚡ Otomasi Lamaran Instan
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Link href="/jobs" style={{
                    display: 'block',
                    padding: '24px',
                    background: 'rgba(0, 81, 255, 0.03)',
                    border: '1px solid rgba(0, 81, 255, 0.1)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 81, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 81, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 81, 255, 0.03)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                      <SearchIcon size={32} color="#0051ff" />
                    </div>
                    <div style={{ fontWeight: '700', color: '#0F172A', marginBottom: '6px', fontSize: '15px' }}>
                      Cari Pekerjaan
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                      Filter & temukan pekerjaan yang relevan
                    </div>
                  </Link>

                  <Link href="/monitor" style={{
                    display: 'block',
                    padding: '24px',
                    background: 'rgba(0, 81, 255, 0.03)',
                    border: '1px solid rgba(0, 81, 255, 0.1)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 81, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 81, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 81, 255, 0.03)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                      <MonitorIcon size={32} color="#0051ff" />
                    </div>
                    <div style={{ fontWeight: '700', color: '#0F172A', marginBottom: '6px', fontSize: '15px' }}>
                      Monitor AI Agent
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                      Pantau log & status lamaran AI
                    </div>
                  </Link>
                </div>
              </div>

              {/* AI Assistant Status */}
              <div style={{
                background: 'linear-gradient(135deg, #0051FF 0%, #003AA3 100%)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 8px 32px rgba(0, 81, 255, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  top: '-50px',
                  right: '-50px',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}></div>
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '800', 
                    color: '#fff', 
                    margin: '0 0 16px 0',
                    letterSpacing: '-0.01em'
                  }}>
                    🤖 AI Scout Status
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    color: '#34D399', 
                    fontSize: '14px', 
                    fontWeight: '700',
                    padding: '8px 12px',
                    background: 'rgba(52, 211, 153, 0.1)',
                    borderRadius: '8px',
                    width: 'fit-content'
                  }}>
                    <span style={{ 
                      width: '8px', 
                      height: '8px', 
                      background: '#34D399', 
                      borderRadius: '50%',
                      boxShadow: '0 0 12px rgba(52, 211, 153, 0.6)',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}></span>
                    AI Agent Aktif
                  </div>
                </div>
                
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.2)',
                  paddingTop: '20px',
                  marginTop: '24px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: '1.6',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  AI kami memindai <strong>100+ lowongan</strong> baru setiap hari dan siap mencocokkan CV Anda secara otomatis.
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 12px rgba(52, 211, 153, 0.6);
          }
          50% {
            opacity: 0.6;
            box-shadow: 0 0 24px rgba(52, 211, 153, 0.4);
          }
        }
      `}</style>
    </div>
  );
}
