'use client';

import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { JobsIcon, ApplicationsIcon, ProfileIcon, SearchIcon, MonitorIcon, CheckCircleIcon } from '@/components/DashboardIcons';
import Link from 'next/link';

// Mock user data for preview
const mockUser = {
  id: '1',
  email: 'danta@example.com',
  fullName: 'Danta Wijaya'
};

const mockStats = {
  totalJobs: 2450,
  totalApplied: 87,
  appliedToday: 12,
  pendingApplications: 23,
  acceptedApplications: 5,
  recentApplications: []
};

export default function DashboardPreviewPage() {
  const [user] = useState(mockUser);
  const [stats] = useState(mockStats);

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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 14px',
            background: 'rgba(0, 81, 255, 0.05)',
            border: '1px solid rgba(0, 81, 255, 0.1)',
            borderRadius: '10px',
            fontSize: '14px',
            color: '#64748B',
            fontWeight: '600',
          }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: '#10B981',
              boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)'
            }}></span>
            {user?.email}
          </div>
          <button
            style={{
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #EF4444, #DC2626)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.2)';
            }}
          >
            Sign Out
          </button>
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
        <div
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
          Dashboard
        </div>
        <div
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
        </div>
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
                <div style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(0, 81, 255, 0.1)',
                  fontSize: '12px',
                  color: '#64748B',
                }}>
                  📈 Job market update
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
