'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader, CheckCircle, AlertCircle, MapPin, Briefcase, DollarSign, Clock, Bell, Link2, Filter, X, Settings, Puzzle, Home } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { JobsIcon, ApplicationsIcon } from '@/components/DashboardIcons';
import ProfileDropdown from '@/components/ProfileDropdown';

interface PreferencesData {
  jobTitles: string[];
  locations: string[];
  salaryMin: number;
  salaryMax: number;
  workTypes: string[];
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  telegramNotifications: boolean;
  emailTemplate: string;
  noticePeriod: string;
  remoteOnly: boolean;
  skipAgencies: boolean;
  skipExpMismatch: boolean;
}

export default function PreferencesPage() {
  const router = useRouter();

  const defaultPrefs: PreferencesData = {
    jobTitles: ['Software Engineer'],
    locations: ['Jakarta, Indonesia', 'Bandung, West Java, Indonesia'],
    salaryMin: 5000000,
    salaryMax: 15000000,
    workTypes: ['Full-time', 'Contract'],
    notificationsEnabled: true,
    emailNotifications: true,
    telegramNotifications: false,
    emailTemplate: '',
    noticePeriod: 'Immediately',
    remoteOnly: false,
    skipAgencies: false,
    skipExpMismatch: false,
  };

  const [preferences, setPreferences] = useState<PreferencesData>(defaultPrefs);
  const [formData, setFormData] = useState<PreferencesData>(defaultPrefs);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  // Auth check + load prefs from real API
  useEffect(() => {
    const loadPreferences = async () => {
      const token = localStorage.getItem('instajob_token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/preferences`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.status === 401) {
          router.push('/login');
          return;
        }

        if (res.ok) {
          const data = await res.json();
          const loaded: PreferencesData = {
            jobTitles: data.jobTitles?.length ? data.jobTitles : defaultPrefs.jobTitles,
            locations: data.locations?.length ? data.locations : defaultPrefs.locations,
            salaryMin: data.salaryMin ?? defaultPrefs.salaryMin,
            salaryMax: data.salaryMax ?? defaultPrefs.salaryMax,
            workTypes: data.workTypes?.length ? data.workTypes : defaultPrefs.workTypes,
            notificationsEnabled: data.notificationsEnabled ?? defaultPrefs.notificationsEnabled,
            emailNotifications: data.emailNotifications ?? defaultPrefs.emailNotifications,
            telegramNotifications: data.telegramNotifications ?? defaultPrefs.telegramNotifications,
            emailTemplate: data.emailTemplate ?? defaultPrefs.emailTemplate,
            noticePeriod: data.noticePeriod ?? defaultPrefs.noticePeriod,
            remoteOnly: data.remoteOnly ?? defaultPrefs.remoteOnly,
            skipAgencies: data.skipAgencies ?? defaultPrefs.skipAgencies,
            skipExpMismatch: data.skipExpMismatch ?? defaultPrefs.skipExpMismatch,
          };
          setPreferences(loaded);
          setFormData(loaded);
        }
        // ponytail: if GET fails (non-401), fallback to defaultPrefs — acceptable for dev
      } catch {
        // network error → keep defaults
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, [router]);

  const availableWorkTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship',
  ];



  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInput(e.target.value);
    setShowLocationSuggestions(e.target.value.length > 0);
  };

  const addLocation = (location: string) => {
    if (location.trim() && !formData.locations.includes(location)) {
      setFormData(prev => ({
        ...prev,
        locations: [...prev.locations, location],
      }));
      setLocationInput('');
      setShowLocationSuggestions(false);
    }
  };

  const removeLocation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index),
    }));
  };

  const handleWorkTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      workTypes: prev.workTypes.includes(type)
        ? prev.workTypes.filter(t => t !== type)
        : [...prev.workTypes, type],
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('instajob_token');
    if (!token) {
      router.push('/login');
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/preferences`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitles: formData.jobTitles.filter(t => t.trim()),
          locations: formData.locations,
          salaryMin: formData.salaryMin,
          salaryMax: formData.salaryMax,
          workTypes: formData.workTypes,
          notificationsEnabled: formData.notificationsEnabled,
          emailNotifications: formData.emailNotifications,
          telegramNotifications: formData.telegramNotifications,
          noticePeriod: formData.noticePeriod,
          remoteOnly: formData.remoteOnly,
          skipAgencies: formData.skipAgencies,
          skipExpMismatch: formData.skipExpMismatch,
          emailTemplate: formData.emailTemplate,
        }),
      });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save preferences');
      }

      setPreferences(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error('Save preferences error:', err);
      setSaveError(true);
      setTimeout(() => setSaveError(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FF 50%, #EEF2FF 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Glow Effects */}
      <div style={{
        position: 'fixed',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        top: '-200px',
        right: '-100px',
        background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(120px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        bottom: '-200px',
        left: '-100px',
        background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(120px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Nav Bar — same as extension */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Logo size={36} showText={true} />
          <div style={{ display: 'flex', gap: '4px' }}>
            {[
              { href: '/dashboard', icon: <Home size={16} />, label: 'Dashboard' },
              { href: '/jobs', icon: <JobsIcon size={16} color="currentColor" />, label: 'Browse Jobs' },
              { href: '/applications', icon: <ApplicationsIcon size={16} color="currentColor" />, label: 'Applications' },
              { href: '/preferences', icon: <Settings size={16} />, label: 'Preferences' },
              { href: '/add-ons', icon: <Puzzle size={16} />, label: 'Add-ons' },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', color: item.href === '/preferences' ? '#1E40FF' : '#64748B', textDecoration: 'none', fontSize: '14px', fontWeight: item.href === '/preferences' ? '700' : '600', background: item.href === '/preferences' ? 'rgba(30,64,255,0.06)' : 'transparent' }}>
                {item.icon}{item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 24px',
      }}>
        {/* Header with Back Link */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
        }}>
          <Link href="/dashboard" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#0051FF',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'color 0.2s',
          }}>
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            margin: 0,
          }}>
            Job Preferences
          </h1>
          <div style={{ width: '140px' }} />
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div style={{
            marginBottom: '24px',
            padding: '12px 16px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            color: '#059669',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <CheckCircle size={18} />
            Preferences saved successfully
          </div>
        )}

        {/* Error Message */}
        {saveError && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', color: '#EF4444', fontSize: '14px' }}>
            Failed to save preferences. Please try again.
          </div>
        )}

        {/* Preferences Form */}
        <div style={{
          display: 'grid',
          gap: '32px',
        }}>

          {/* Job Titles Section — FREE TEXT INPUTS */}

          {/* Personal Links Section */}
          {/* Locations Section — GOOGLE MAPS STYLE AUTOCOMPLETE */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                background: 'rgba(0, 81, 255, 0.1)',
                borderRadius: '8px',
              }}>
                <MapPin size={20} color="#0051FF" />
              </div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                margin: 0,
              }}>
                Work Locations
              </h2>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#64748B',
              margin: '0 0 20px 0',
            }}>
              Search and add locations where you'd like to work (City, Province, Country)
            </p>
            
            {/* Location Input with Autocomplete */}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Search location (e.g., Jakarta, Indonesia or Remote)"
                value={locationInput}
                onChange={handleLocationChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addLocation(locationInput);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#0051FF'}
                onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
              />
              
              {/* Autocomplete Suggestions (Mock Google Maps style) */}
              {showLocationSuggestions && locationInput && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '4px',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  zIndex: 100,
                }}>
                  {['Jakarta, Indonesia', 'Bandung, West Java, Indonesia', 'Surabaya, East Java, Indonesia', 'Remote (Anywhere)']
                    .filter(loc => loc.toLowerCase().includes(locationInput.toLowerCase()))
                    .map((suggestion, idx) => (
                      <div
                        key={idx}
                        onClick={() => addLocation(suggestion)}
                        style={{
                          padding: '12px',
                          fontSize: '13px',
                          color: '#1E293B',
                          borderBottom: idx < 3 ? '1px solid #F1F5F9' : 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <MapPin size={14} color="#0051FF" />
                        {suggestion}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Selected Locations as Tags/Chips */}
            {formData.locations.length > 0 && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '12px',
              }}>
                {formData.locations.map((location, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    background: 'rgba(0, 81, 255, 0.1)',
                    border: '1px solid rgba(0, 81, 255, 0.3)',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#0051FF',
                  }}>
                    <MapPin size={14} />
                    {location}
                    <button onClick={() => removeLocation(index)} style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      marginLeft: '4px',
                    }}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Salary Range Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                background: 'rgba(0, 81, 255, 0.1)',
                borderRadius: '8px',
              }}>
                <DollarSign size={20} color="#0051FF" />
              </div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                margin: 0,
              }}>
                Salary Range
              </h2>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#64748B',
              margin: '0 0 20px 0',
            }}>
              Set your minimum and maximum salary expectations
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}>
              <div>
                <label style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#475569',
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  Minimum Salary (Rp)
                </label>
                <input
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    salaryMin: parseInt(e.target.value) || 0,
                  }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '14px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0051FF'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                />
              </div>
              <div>
                <label style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#475569',
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  Maximum Salary (Rp)
                </label>
                <input
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    salaryMax: parseInt(e.target.value) || 0,
                  }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '14px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0051FF'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                />
              </div>
            </div>
            {formData.salaryMin > 0 && formData.salaryMax > 0 && (
              <p style={{
                marginTop: '12px',
                fontSize: '13px',
                color: '#0051FF',
                fontWeight: '600',
              }}>
                Range: Rp {formData.salaryMin.toLocaleString('id-ID')} - Rp {formData.salaryMax.toLocaleString('id-ID')}
              </p>
            )}
          </div>

          {/* Work Types Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                background: 'rgba(0, 81, 255, 0.1)',
                borderRadius: '8px',
              }}>
                <Clock size={20} color="#0051FF" />
              </div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                margin: 0,
              }}>
                Work Types
              </h2>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#64748B',
              margin: '0 0 16px 0',
            }}>
              Select the types of work you're open to
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}>
              {availableWorkTypes.map((type) => (
                <label key={type} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  background: formData.workTypes.includes(type) ? 'rgba(0, 81, 255, 0.08)' : 'transparent',
                  borderRadius: '8px',
                  border: `1px solid ${formData.workTypes.includes(type) ? '#0051FF' : '#E2E8F0'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}>
                  <input
                    type="checkbox"
                    checked={formData.workTypes.includes(type)}
                    onChange={() => handleWorkTypeToggle(type)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: '#0051FF',
                    }}
                  />
                  <span style={{
                    marginLeft: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1E293B',
                  }}>
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px',
                background: 'rgba(0, 81, 255, 0.1)', borderRadius: '8px',
              }}>
                <Clock size={20} color="#0051FF" />
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Availability</h2>
            </div>
            <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 20px 0' }}>
              When can you start a new role?
            </p>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>
                Notice Period
              </label>
              <select
                value={formData.noticePeriod}
                onChange={(e) => setFormData(prev => ({ ...prev, noticePeriod: e.target.value }))}
                style={{
                  width: '100%', padding: '12px', fontSize: '14px',
                  border: '1px solid #E2E8F0', borderRadius: '8px',
                  outline: 'none', transition: 'border-color 0.2s',
                  background: '#fff', cursor: 'pointer', boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = '#0051FF'}
                onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
              >
                {['Immediately', '1 week', '2 weeks', '1 month', '2 months', '3 months+'].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notification Preferences Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                background: 'rgba(0, 81, 255, 0.1)',
                borderRadius: '8px',
              }}>
                <Bell size={20} color="#0051FF" />
              </div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                margin: 0,
              }}>
                Notification Preferences
              </h2>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#64748B',
              margin: '0 0 20px 0',
            }}>
              Manage how you receive job alerts
            </p>
            <div style={{
              display: 'grid',
              gap: '16px',
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                background: 'transparent',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}>
                <input
                  type="checkbox"
                  checked={formData.notificationsEnabled}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    notificationsEnabled: e.target.checked,
                  }))}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#0051FF',
                  }}
                />
                <span style={{
                  marginLeft: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1E293B',
                }}>
                  Enable job notifications
                </span>
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                background: 'transparent',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: formData.notificationsEnabled ? 1 : 0.5,
                pointerEvents: formData.notificationsEnabled ? 'auto' : 'none',
              }}>
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    emailNotifications: e.target.checked,
                  }))}
                  disabled={!formData.notificationsEnabled}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#0051FF',
                  }}
                />
                <span style={{
                  marginLeft: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1E293B',
                }}>
                  Email notifications
                </span>
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                background: 'transparent',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: formData.notificationsEnabled ? 1 : 0.5,
                pointerEvents: formData.notificationsEnabled ? 'auto' : 'none',
              }}>
                <input
                  type="checkbox"
                  checked={formData.telegramNotifications}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    telegramNotifications: e.target.checked,
                  }))}
                  disabled={!formData.notificationsEnabled}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#0051FF',
                  }}
                />
                <span style={{
                  marginLeft: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1E293B',
                }}>
                  Telegram notifications
                </span>
              </label>
            </div>
          </div>

          {/* Email Template */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '24px',
            marginTop: '24px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                background: 'rgba(0, 81, 255, 0.1)',
                borderRadius: '8px',
              }}>
                <Save size={20} color="#0051FF" />
              </div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                margin: 0,
              }}>
                Email Template
              </h2>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#64748B',
              margin: '0 0 20px 0',
            }}>
              Custom template untuk email lamaran otomatis. AI akan mengisi placeholder berikut: {'{role}'}, {'{company}'}, {'{recruiter}'}. Kosongkan untuk pakai template default AI.
            </p>
            <textarea
              value={formData.emailTemplate}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                emailTemplate: e.target.value,
              }))}
              placeholder={"Contoh:\nDear {recruiter},\n\nSaya tertarik dengan posisi {role} di {company}...\n\nHormat saya,"}
              rows={6}
              maxLength={2000}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                fontFamily: 'inherit',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                outline: 'none',
                resize: 'vertical',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#0051FF'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
            />
            <p style={{
              marginTop: '8px',
              fontSize: '12px',
              color: '#94A3B8',
              textAlign: 'right',
            }}>
              {formData.emailTemplate.length}/2000
            </p>
          </div>

          {/* Advanced Filters Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px',
                background: 'rgba(0, 81, 255, 0.1)', borderRadius: '8px',
              }}>
                <Filter size={20} color="#0051FF" />
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Advanced Filters</h2>
            </div>
            <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 20px 0' }}>
              Fine-tune which jobs you want to see
            </p>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { label: 'Remote Work Only', field: 'remoteOnly' as const, desc: 'Only show remote positions' },
                { label: 'Skip Recruiting/Outsourcing Agencies', field: 'skipAgencies' as const, desc: 'Hide jobs posted by staffing or outsourcing firms' },
                { label: "Skip Jobs That Don't Fit Experience", field: 'skipExpMismatch' as const, desc: 'Hide jobs with mismatched seniority requirements' },
              ].map(({ label, field, desc }) => (
                <div key={field} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{desc}</div>
                  </div>
                  <select
                    value={formData[field] ? 'yes' : 'no'}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value === 'yes' }))}
                    style={{
                      padding: '8px 12px',
                      fontSize: '14px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '6px',
                      outline: 'none',
                      background: '#fff',
                      cursor: 'pointer',
                      minWidth: '80px',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0051FF'}
                    onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Save Button */}
        <div style={{ marginTop: '40px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button onClick={() => setFormData(preferences)} disabled={isSaving} style={{
            padding: '12px 24px', fontSize: '14px', fontWeight: '600', color: '#64748B',
            background: 'transparent', border: '1px solid #CBD5E1', borderRadius: '8px',
            cursor: isSaving ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease',
          }}>
            Reset
          </button>
          <button onClick={handleSave} disabled={isSaving} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '700',
            color: '#FFFFFF',
            background: '#0051FF',
            border: 'none',
            borderRadius: '8px',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            opacity: isSaving ? 0.8 : 1,
          }}
          onMouseEnter={(e) => !isSaving && (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => !isSaving && (e.currentTarget.style.opacity = '1')}>
            {isSaving ? (
              <>
                <Loader size={16} style={{ animation: 'spin 0.8s linear infinite' }} />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Preferences
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
