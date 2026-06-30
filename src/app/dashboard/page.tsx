'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Activity, Briefcase, CheckCircle, Clock, Target } from 'lucide-react';
import AppNavigation from '@/components/shared/AppNavigation';
import QuotaWidget from '@/components/QuotaWidget';

// Style objects translated from globals.css
const styles = {
  appContainer: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    height: '100vh',
    overflow: 'hidden',
  },
  mainScroll: {
    overflowY: 'auto',
    position: 'relative',
    padding: '48px',
  },
  glowSpot: {
    position: 'fixed',
    width: '800px',
    height: '800px',
    borderRadius: '50%',
    filter: 'blur(120px)',
    opacity: 0.12,
    pointerEvents: 'none',
    zIndex: 0,
  },
  heroText: {
    fontSize: '3.5rem',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    lineHeight: 1.1,
    background: 'linear-gradient(180deg, #fff 0%, #94a3b8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '24px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    marginBottom: '48px',
  },
  cardPremium: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(24px)',
    borderRadius: '16px',
    padding: '32px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  dashboardSplit: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '48px',
  },
  metaLabel: {
    fontSize: '10px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: '#94a3b8',
    marginBottom: '8px',
  },
  btnPrimary: {
    background: '#fff',
    color: '#0B1120',
    fontWeight: 700,
    padding: '12px 24px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
  },
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div style={styles.cardPremium}>
    <div style={{...styles.metaLabel, color: '#94a3b8'}}>{title}</div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '2.25rem', fontWeight: 'bold', color }}>{value}</div>
      <Icon style={{ width: '32px', height: '32px', color }} />
    </div>
  </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch logic remains the same
    useEffect(() => {
      const token = sessionStorage.getItem('instajob_token');
      const userData = sessionStorage.getItem('instajob_user');
        if (!token || !userData) {
          router.push('/login');
          return;
        }
        setUser(JSON.parse(userData));

        try {
          const [statsRes, recsRes] = await Promise.all([
            fetch('/api/dashboard/stats', { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch('/api/jobs/recommended?limit=3', { headers: { 'Authorization': `Bearer ${token}` } }),
          ]);
          if (!statsRes.ok || !recsRes.ok) throw new Error('Failed to fetch data');
          const statsData = await statsRes.json();
          const recsData = await recsRes.json();
          setStats(statsData);
          setRecommendedJobs(recsData.recommendations || []);
        } catch (e) {
          setError('Failed to load dashboard data.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--navy-dark)', color: '#cbd5e1' }}>
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div style={styles.appContainer}>
      <AppNavigation />
      <main style={styles.mainScroll}>
        <div style={{...styles.glowSpot, top: '-200px', left: '-200px', background: 'var(--blue-primary)'}}></div>
        <div style={{...styles.glowSpot, bottom: '-200px', right: '-200px', background: 'var(--purple-primary)'}}></div>

        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ marginBottom: '48px' }}>
            <h1 style={styles.heroText}>Welcome back, {user?.fullName}!</h1>
            <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>Here's your job hunting dashboard.</p>
          </div>

          <div style={{ marginBottom: '48px' }}>
            <QuotaWidget />
          </div>

          {error && <div style={{ marginBottom: '32px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', color: '#fca5a5' }}>{error}</div>}

          {stats && (
            <div style={styles.statsGrid}>
              <StatCard title="Available Jobs" value={stats.totalJobs} icon={Briefcase} color="#60a5fa" />
              <StatCard title="Applied Today" value={stats.appliedToday} icon={Target} color="#4ade80" />
              <StatCard title="Pending" value={stats.pendingApplications} icon={Clock} color="#facc15" />
              <StatCard title="Accepted" value={stats.acceptedApplications} icon={CheckCircle} color="#a78bfa" />
            </div>
          )}

          <div style={styles.dashboardSplit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e2e8f0' }}>🎯 AI Recommended Jobs</h2>
              {recommendedJobs.length > 0 ? (
                recommendedJobs.map((rec) => (
                  <div key={rec.jobId} style={styles.cardPremium}>
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span style={styles.metaLabel}>AI Match Score</span>
                      <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#60a5fa' }}>{rec.matchScore}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '9999px', marginBottom: '24px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', width: `${rec.matchScore}%` }}></div>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f1f5f9', marginBottom: '8px' }}>{rec.job.title}</h3>
                    <p style={{ fontWeight: '600', color: '#60a5fa', marginBottom: '8px' }}>{rec.job.company}</p>
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '16px' }}>{rec.job.location} • {rec.job.salary}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                      {rec.matchReasons.map((reason) => (
                        <span key={reason} style={{ padding: '4px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#93c5fd', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '9999px' }}>{reason}</span>
                      ))}
                    </div>
                    <Link href={`/jobs`} style={{...styles.btnPrimary, width: '100%', justifyContent: 'center' }}>View & Apply</Link>
                  </div>
                ))
              ) : (
                <div style={{...styles.cardPremium, textAlign: 'center', padding: '64px 32px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '8px' }}>No Recommendations Yet</h3>
                  <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Complete your profile to get AI-powered job matches.</p>
                  <Link href="/profile" style={styles.btnPrimary}>Complete Profile</Link>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
               <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e2e8f0' }}>Quick Actions</h2>
               <div style={{...styles.cardPremium, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <Link href="/jobs" style={{ padding: '16px', background: 'rgba(51, 65, 85, 0.5)', border: '1px solid #475569', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <Search style={{ width: '24px', height: '24px', color: '#60a5fa' }} />
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#e2e8f0' }}>Search Jobs</div>
                        <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Find relevant jobs</div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/monitor" style={{ padding: '16px', background: 'rgba(51, 65, 85, 0.5)', border: '1px solid #475569', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <Activity style={{ width: '24px', height: '24px', color: '#60a5fa' }} />
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#e2e8f0' }}>Monitor AI Auto-Apply</div>
                        <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Track application logs</div>
                      </div>
                    </div>
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
