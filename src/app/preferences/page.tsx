'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sliders, Briefcase, Ban, Plus, X, ArrowRight } from 'lucide-react';
import AppNavigation from '@/components/shared/AppNavigation';

interface JobPreferences {
  id: number;
  jobTypes: string[];
  locations: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  skills: string[];
  experienceLevel: string | null;
  customJobTitles: string[];
  blockedCompanies: string[];
  autoApply: boolean;
  maxApplicationsPerDay: number;
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#FFFFFF',
    color: '#1E293B',
  },
  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '80px 24px',
    position: 'relative' as const,
    zIndex: 1,
  },
  backgroundGlow1: {
    position: 'fixed' as const,
    width: '800px',
    height: '800px',
    borderRadius: '50%',
    top: '100px',
    right: '-200px',
    background: 'radial-gradient(circle, rgba(0, 81, 255, 0.1) 0%, transparent 70%)',
    filter: 'blur(120px)',
    pointerEvents: 'none' as const,
    zIndex: 0,
  },
  backgroundGlow2: {
    position: 'fixed' as const,
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    bottom: '200px',
    left: '-100px',
    background: 'radial-gradient(circle, rgba(0, 81, 255, 0.08) 0%, transparent 70%)',
    filter: 'blur(100px)',
    pointerEvents: 'none' as const,
    zIndex: 0,
  },
  header: {
    marginBottom: '80px',
    textAlign: 'center' as const,
  },
  headerBadge: {
    display: 'inline-flex' as const,
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(0, 81, 255, 0.08)',
    border: '1px solid rgba(0, 81, 255, 0.2)',
    borderRadius: '99px',
    padding: '8px 20px',
    marginBottom: '24px',
    backdropFilter: 'blur(12px)',
    fontSize: '12px',
    fontWeight: 600,
    color: '#0051FF',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  },
  title: {
    fontSize: '56px',
    fontWeight: 900,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    marginBottom: '16px',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: '18px',
    color: '#475569',
    lineHeight: 1.6,
    maxWidth: '600px',
    margin: '0 auto',
  },
  alertBox: {
    marginBottom: '32px',
    padding: '16px 20px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 500,
    border: '1px solid',
    backdropFilter: 'blur(12px)',
  },
  errorAlert: {
    background: 'rgba(239, 68, 68, 0.08)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
    color: '#DC2626',
  },
  successAlert: {
    background: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
    color: '#059669',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(0, 81, 255, 0.1)',
    borderRadius: '20px',
    padding: '40px',
    marginBottom: '32px',
    backdropFilter: 'blur(24px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#1E293B',
    marginBottom: '12px',
    display: 'flex' as const,
    alignItems: 'center',
    gap: '12px',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#64748B',
    lineHeight: 1.6,
    marginBottom: '32px',
  },
  inputGroup: {
    display: 'flex' as const,
    gap: '12px',
    marginBottom: '24px',
  },
  input: {
    flex: 1,
    padding: '14px 18px',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(0, 81, 255, 0.2)',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#1E293B',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  },
  button: {
    display: 'inline-flex' as const,
    alignItems: 'center',
    gap: '8px',
    padding: '14px 24px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  },
  buttonPrimary: {
    background: 'linear-gradient(135deg, #0051FF, #0051FF)',
    color: '#FFFFFF',
    boxShadow: '0 4px 16px rgba(0, 81, 255, 0.3)',
  },
  tagContainer: {
    display: 'flex' as const,
    flexWrap: 'wrap' as const,
    gap: '12px',
    alignItems: 'center',
  },
  tag: {
    display: 'inline-flex' as const,
    alignItems: 'center',
    gap: '8px',
    paddingLeft: '14px',
    paddingRight: '10px',
    paddingTop: '8px',
    paddingBottom: '8px',
    borderRadius: '99px',
    background: 'rgba(0, 81, 255, 0.12)',
    border: '1px solid rgba(0, 81, 255, 0.25)',
    color: '#0051FF',
    fontSize: '14px',
    fontWeight: 500,
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '0',
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s',
  },
  emptyState: {
    color: '#94A3B8',
    fontSize: '14px',
    fontStyle: 'italic' as const,
  },
  actionContainer: {
    display: 'flex' as const,
    justifyContent: 'flex-end',
    gap: '16px',
    marginTop: '48px',
    paddingTop: '32px',
    borderTop: '1px solid rgba(0, 81, 255, 0.1)',
  },
  saveButton: {
    display: 'inline-flex' as const,
    alignItems: 'center',
    gap: '8px',
    padding: '16px 40px',
    background: 'linear-gradient(135deg, #0051FF, #0051FF)',
    color: '#FFFFFF',
    fontWeight: 700,
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 8px 24px rgba(0, 81, 255, 0.3)',
    fontSize: '15px',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'rgba(0, 81, 255, 0.12)',
    border: '1px solid rgba(0, 81, 255, 0.2)',
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default function PreferencesPage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<JobPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [newJobTitle, setNewJobTitle] = useState('');
  const [newBlockedCompany, setNewBlockedCompany] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('instajob_token');
      if (!token) {
        router.push('/login');
        return;
      }

      await fetchPreferences();
    };

    checkAuth();
  }, [router]);

  const fetchPreferences = async () => {
    const token = sessionStorage.getItem('instajob_token');
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

    try {
      const response = await fetch(`${apiBase}/api/preferences`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setPreferences(data);
      }
    } catch (err) {
      console.error('Failed to fetch preferences:', err);
      setError('Failed to load preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const token = sessionStorage.getItem('instajob_token');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

      const response = await fetch(`${apiBase}/api/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(preferences),
      });

      if (response.ok) {
        setSuccess('✓ Preferences saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to save preferences');
      }
    } catch (err) {
      setError('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const handleAddJobTitle = async () => {
    if (!newJobTitle.trim()) return;

    setError('');
    try {
      const token = sessionStorage.getItem('instajob_token');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

      const response = await fetch(`${apiBase}/api/preferences/custom-titles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newJobTitle.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setPreferences(data);
        setNewJobTitle('');
        setSuccess('✓ Job title added!');
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError('Failed to add job title');
      }
    } catch (err) {
      setError('Failed to add job title');
    }
  };

  const handleRemoveJobTitle = async (title: string) => {
    setError('');
    try {
      const token = sessionStorage.getItem('instajob_token');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

      const response = await fetch(`${apiBase}/api/preferences/custom-titles/${encodeURIComponent(title)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setPreferences(data);
      }
    } catch (err) {
      console.error('Failed to remove job title:', err);
    }
  };

  const handleAddBlockedCompany = async () => {
    if (!newBlockedCompany.trim()) return;

    setError('');
    try {
      const token = sessionStorage.getItem('instajob_token');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

      const response = await fetch(`${apiBase}/api/preferences/blocked-companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ company: newBlockedCompany.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setPreferences(data);
        setNewBlockedCompany('');
        setSuccess('✓ Company blocked!');
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError('Failed to block company');
      }
    } catch (err) {
      setError('Failed to block company');
    }
  };

  const handleRemoveBlockedCompany = async (company: string) => {
    setError('');
    try {
      const token = sessionStorage.getItem('instajob_token');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

      const response = await fetch(`${apiBase}/api/preferences/blocked-companies/${encodeURIComponent(company)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setPreferences(data);
      }
    } catch (err) {
      console.error('Failed to remove blocked company:', err);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.backgroundGlow1}></div>
        <div style={styles.backgroundGlow2}></div>
        <AppNavigation />
        <div style={{ ...styles.mainContent, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 200px)' }}>
          <div style={{ color: '#64748B', fontSize: '16px' }}>Loading preferences...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Background Glows */}
      <div style={styles.backgroundGlow1}></div>
      <div style={styles.backgroundGlow2}></div>

      <AppNavigation />

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerBadge}>
            <Sliders size={14} />
            Customize Your Search
          </div>
          <h1 style={styles.title}>Job Search Preferences</h1>
          <p style={styles.subtitle}>
            Fine-tune your job search with custom titles and company filters. Our AI will use these preferences to find better matches.
          </p>
        </div>

        {/* Alerts */}
        {error && <div style={{ ...styles.alertBox, ...styles.errorAlert }}>{error}</div>}
        {success && <div style={{ ...styles.alertBox, ...styles.successAlert }}>{success}</div>}

        {preferences && (
          <div>
            {/* Custom Job Titles Card */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>
                <div style={styles.iconBox}>
                  <Briefcase size={24} color="#0051FF" />
                </div>
                Custom Job Titles
              </div>
              <p style={styles.cardDescription}>
                Add specific job titles you want to target. The scout will generate queries based on these titles to find the best matches for you.
              </p>

              <div style={styles.inputGroup}>
                <input
                  type="text"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddJobTitle()}
                  placeholder="e.g., Senior Data Engineer, Product Manager"
                  style={{ ...styles.input }}
                />
                <button
                  onClick={handleAddJobTitle}
                  style={{ ...styles.button, ...styles.buttonPrimary }}
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>

              <div style={styles.tagContainer}>
                {preferences.customJobTitles.map((title) => (
                  <div key={title} style={styles.tag}>
                    <span>{title}</span>
                    <button
                      onClick={() => handleRemoveJobTitle(title)}
                      style={styles.removeButton}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {preferences.customJobTitles.length === 0 && (
                  <p style={styles.emptyState}>No custom job titles yet. Add one to get started!</p>
                )}
              </div>
            </div>

            {/* Blocked Companies Card */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>
                <div style={styles.iconBox}>
                  <Ban size={24} color="#0051FF" />
                </div>
                Blocked Companies
              </div>
              <p style={styles.cardDescription}>
                Companies you want to exclude from job discovery. They won't appear in your search results or auto-apply recommendations.
              </p>

              <div style={styles.inputGroup}>
                <input
                  type="text"
                  value={newBlockedCompany}
                  onChange={(e) => setNewBlockedCompany(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddBlockedCompany()}
                  placeholder="e.g., Amazon, Google, Meta"
                  style={{ ...styles.input }}
                />
                <button
                  onClick={handleAddBlockedCompany}
                  style={{ ...styles.button, ...styles.buttonPrimary }}
                >
                  <Plus size={18} />
                  Block
                </button>
              </div>

              <div style={styles.tagContainer}>
                {preferences.blockedCompanies.map((company) => (
                  <div key={company} style={styles.tag}>
                    <span>{company}</span>
                    <button
                      onClick={() => handleRemoveBlockedCompany(company)}
                      style={styles.removeButton}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {preferences.blockedCompanies.length === 0 && (
                  <p style={styles.emptyState}>No blocked companies yet. Add one to exclude companies from results!</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.actionContainer}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  ...styles.saveButton,
                  opacity: saving ? 0.7 : 1,
                  cursor: saving ? 'not-allowed' : 'pointer',
                }}
              >
                <ArrowRight size={18} />
                {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
