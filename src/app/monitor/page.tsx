'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ScrollAnimation } from '@/components/Animations';
import { Logo } from '@/components/Logo';
import { JobsIcon, ApplicationsIcon, ProfileIcon } from '@/components/DashboardIcons';
import ProfileDropdown from '@/components/ProfileDropdown';
import { Home, Settings } from 'lucide-react';

interface AutoApplyStats {
  isActive: boolean;
  totalApplied: number;
  successRate: number;
  pendingApplications: number;
  lastRun: string;
}

export default function MonitorPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AutoApplyStats>({
    isActive: true,
    totalApplied: 847,
    successRate: 68,
    pendingApplications: 24,
    lastRun: '2026-06-29T08:30:00',
  });

  const [isActive, setIsActive] = useState(stats.isActive);
  const [autoApplyEnabled, setAutoApplyEnabled] = useState(true);

  const handleToggle = () => {
    setIsActive(!isActive);
    setStats({ ...stats, isActive: !isActive });
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
          href="/preferences"
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
          <Settings size={18} color="#0051FF" />
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
            Auto-Apply Monitor
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#64748B',
            margin: 0,
          }}>
            Monitor your automated job applications in real-time
          </p>
        </div>

        {/* Status Toggle Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              margin: '0 0 4px 0',
              color: '#1E293B',
            }}>
              Auto-Apply Status
            </h2>
            <p style={{
              fontSize: '13px',
              color: '#64748B',
              margin: 0,
            }}>
              {isActive ? '🟢 Active' : '🔴 Inactive'}
            </p>
          </div>
          <button
            onClick={handleToggle}
            style={{
              padding: '12px 32px',
              fontSize: '14px',
              fontWeight: '700',
              color: '#FFFFFF',
              background: isActive ? '#DC2626' : '#10B981',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {isActive ? 'Pause' : 'Resume'}
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}>
          {/* Total Applied */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}>
            <p style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#64748B',
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
            }}>
              Total Applications
            </p>
            <p style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#0051FF',
              margin: 0,
            }}>
              {stats.totalApplied}
            </p>
          </div>

          {/* Success Rate */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}>
            <p style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#64748B',
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
            }}>
              Success Rate
            </p>
            <p style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#10B981',
              margin: 0,
            }}>
              {stats.successRate}%
            </p>
          </div>

          {/* Pending Applications */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}>
            <p style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#64748B',
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
            }}>
              Pending
            </p>
            <p style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#F59E0B',
              margin: 0,
            }}>
              {stats.pendingApplications}
            </p>
          </div>
        </div>

        {/* Last Run Info */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '32px',
        }}>
          <p style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#64748B',
            margin: '0 0 8px 0',
            textTransform: 'uppercase',
          }}>
            Last Run
          </p>
          <p style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#1E293B',
            margin: 0,
          }}>
            {new Date(stats.lastRun).toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        {/* Settings Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            margin: '0 0 24px 0',
            color: '#1E293B',
          }}>
            Auto-Apply Settings
          </h2>

          {/* Enable Auto-Apply */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '24px',
            borderBottom: '1px solid #E2E8F0',
            marginBottom: '24px',
          }}>
            <div>
              <p style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#1E293B',
                margin: '0 0 4px 0',
              }}>
                Enable Auto-Apply
              </p>
              <p style={{
                fontSize: '12px',
                color: '#64748B',
                margin: 0,
              }}>
                Automatically apply to jobs matching your preferences
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoApplyEnabled}
              onChange={(e) => setAutoApplyEnabled(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Apply Frequency */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1E293B',
              marginBottom: '8px',
            }}>
              Apply Frequency
            </label>
            <select style={{
              width: '100%',
              maxWidth: '300px',
              padding: '12px 14px',
              fontSize: '14px',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              outline: 'none',
              backgroundColor: '#FFFFFF',
              color: '#1E293B',
              cursor: 'pointer',
            }}>
              <option>Every hour</option>
              <option>Every 2 hours</option>
              <option>Every 4 hours</option>
              <option>Every 8 hours</option>
              <option>Daily</option>
            </select>
          </div>

          {/* Save Settings Button */}
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '700',
            color: '#FFFFFF',
            background: '#0051FF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
            Save Settings
          </button>
        </div>

        {/* Info Card */}
        <div style={{
          padding: '20px',
          background: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: '8px',
          marginTop: '32px',
        }}>
          <p style={{
            fontSize: '13px',
            color: '#0369A1',
            fontWeight: '500',
            margin: 0,
          }}>
            💡 Pro Tip: Adjust your preferences to get better job matches and higher success rates. The more specific your criteria, the better the results!
          </p>
        </div>
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
