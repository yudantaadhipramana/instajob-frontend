'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AutoApplyButton from '@/components/AutoApplyButton';

interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  remote: boolean;
  postedAt: string;
}

interface ApplicationStatus {
  applied: boolean;
  status?: string;
  appliedAt?: string;
}

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuth();
  const jobId = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [appStatus, setAppStatus] = useState<ApplicationStatus>({ applied: false });
  const [isApplying, setIsApplying] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchJob = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
        const response = await fetch(`${apiBase}/api/jobs/${jobId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setJob(data);
          
          // Check if already applied
          const appResponse = await fetch(`${apiBase}/api/applications?jobId=${jobId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (appResponse.ok) {
            const apps = await appResponse.json();
            setAppStatus({ applied: true, status: apps.status, appliedAt: apps.appliedAt });
          }
        } else {
          setError('Job not found');
        }
      } catch (err) {
        setError('Failed to load job details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, token, router]);

  const handleApply = async () => {
    if (appStatus.applied) {
      alert('You already applied to this job');
      return;
    }

    setIsApplying(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
      const response = await fetch(`${apiBase}/api/applications`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          notes: '',
        }),
      });

      if (response.ok) {
        setAppStatus({ applied: true, status: 'pending' });
        alert('Application submitted successfully!');
      } else {
        const errData = await response.json();
        alert('Failed to apply: ' + (errData.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting application');
    } finally {
      setIsApplying(false);
    }
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    // TODO: Save to backend or localStorage
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0B1120', color: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>Loading job details...</div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0B1120', color: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', color: '#EF4444', marginBottom: '16px' }}>{error || 'Job not found'}</div>
          <Link href="/jobs" style={{ color: '#2563EB', textDecoration: 'underline' }}>Back to Jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0B1120', color: '#F8FAFC' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/jobs" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: '600' }}>← Back to Jobs</Link>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={toggleBookmark}
              style={{
                padding: '8px 16px',
                backgroundColor: bookmarked ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: bookmarked ? '#38BDF8' : '#94A3B8',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              {bookmarked ? '❤️ Bookmarked' : '🤍 Bookmark'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Job Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {job.remote ? '🌍 Remote' : '📍 ' + job.location}
            </p>
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(to right, #F8FAFC, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {job.title}
            </h1>
            <p style={{ fontSize: '18px', color: '#94A3B8' }}>{job.company}</p>
          </div>

          {/* Salary & Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px', textTransform: 'uppercase' }}>Salary Range</p>
              <p style={{ fontSize: '18px', fontWeight: '700' }}>
                {job.salaryMin ? `IDR ${(job.salaryMin/1000000).toFixed(0)}M` : 'Not specified'}
                {job.salaryMax ? ` - ${(job.salaryMax/1000000).toFixed(0)}M` : ''}
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px', textTransform: 'uppercase' }}>Location</p>
              <p style={{ fontSize: '18px', fontWeight: '700' }}>{job.location}</p>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px', textTransform: 'uppercase' }}>Posted</p>
              <p style={{ fontSize: '18px', fontWeight: '700' }}>{new Date(job.postedAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Apply Button */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleApply}
              disabled={isApplying || appStatus.applied}
              style={{
                padding: '16px 24px',
                backgroundColor: appStatus.applied ? '#10B981' : '#2563EB',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: appStatus.applied ? 'default' : 'pointer',
                transition: 'all 0.2s',
                opacity: appStatus.applied ? 0.7 : 1,
              }}
            >
              {isApplying ? 'Submitting...' : appStatus.applied ? '✓ Already Applied' : '🚀 Apply Now'}
            </button>
            <AutoApplyButton
              jobId={job.id}
              jobTitle={job.title}
              company={job.company}
              onSuccess={() => alert('Added to auto-apply queue!')}
            />
          </div>
        </div>

        {/* Description */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '32px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>About this job</h2>
          <p style={{ lineHeight: '1.6', color: '#94A3B8', whiteSpace: 'pre-wrap' }}>
            {job.description}
          </p>
        </div>

        {/* Status Badge */}
        {appStatus.applied && (
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '16px', color: '#34D399' }}>
            ✓ You applied to this job on {new Date(appStatus.appliedAt || Date.now()).toLocaleDateString()} · Status: <strong>{appStatus.status}</strong>
          </div>
        )}
      </main>
    </div>
  );
}
