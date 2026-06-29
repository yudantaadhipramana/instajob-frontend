'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Loader, CheckCircle, AlertCircle, MapPin, Briefcase, DollarSign, Clock, Bell, Plus, X } from 'lucide-react';

interface PreferencesData {
  jobTitles: string[];
  locations: string[];
  salaryMin: number;
  salaryMax: number;
  workTypes: string[];
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  telegramNotifications: boolean;
}

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState<PreferencesData>({
    jobTitles: ['Software Engineer', 'Full Stack Developer'],
    locations: ['Jakarta, Indonesia', 'Bandung, West Java, Indonesia'],
    salaryMin: 5000000,
    salaryMax: 15000000,
    workTypes: ['Full-time', 'Contract'],
    notificationsEnabled: true,
    emailNotifications: true,
    telegramNotifications: false,
  });

  const [formData, setFormData] = useState(preferences);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const availableWorkTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship',
  ];

  const handleJobTitleChange = (index: number, value: string) => {
    const newTitles = [...formData.jobTitles];
    newTitles[index] = value;
    setFormData(prev => ({
      ...prev,
      jobTitles: newTitles,
    }));
  };

  const addJobTitle = () => {
    setFormData(prev => ({
      ...prev,
      jobTitles: [...prev.jobTitles, ''],
    }));
  };

  const removeJobTitle = (index: number) => {
    setFormData(prev => ({
      ...prev,
      jobTitles: prev.jobTitles.filter((_, i) => i !== index),
    }));
  };

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
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPreferences(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
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
            fontWeight: '500',
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
            fontWeight: '500',
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
          <div style={{
            marginBottom: '24px',
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#DC2626',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <AlertCircle size={18} />
            Failed to save preferences. Please try again.
          </div>
        )}

        {/* Preferences Form */}
        <div style={{
          display: 'grid',
          gap: '32px',
        }}>

          {/* Job Titles Section — FREE TEXT INPUTS */}
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
                <Briefcase size={20} color="#0051FF" />
              </div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                margin: 0,
              }}>
                Job Titles
              </h2>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#64748B',
              margin: '0 0 20px 0',
            }}>
              Add job titles you're interested in applying for
            </p>
            <div style={{
              display: 'grid',
              gap: '12px',
            }}>
              {formData.jobTitles.map((title, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}>
                  <input
                    type="text"
                    placeholder="e.g., Senior Software Engineer"
                    value={title}
                    onChange={(e) => handleJobTitleChange(index, e.target.value)}
                    style={{
                      flex: 1,
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
                  {formData.jobTitles.length > 1 && (
                    <button onClick={() => removeJobTitle(index)} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      background: '#FEE2E2',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}>
                      <X size={18} color="#DC2626" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addJobTitle} style={{
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#0051FF',
              background: 'rgba(0, 81, 255, 0.08)',
              border: '1px solid #0051FF',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 81, 255, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 81, 255, 0.08)';
            }}>
              <Plus size={16} />
              Add another title
            </button>
          </div>

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
                    fontWeight: '500',
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
                    fontWeight: '500',
                    color: '#1E293B',
                  }}>
                    {type}
                  </span>
                </label>
              ))}
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
                  fontWeight: '500',
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
                  fontWeight: '500',
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
                  fontWeight: '500',
                  color: '#1E293B',
                }}>
                  Telegram notifications
                </span>
              </label>
            </div>
          </div>

        </div>

        {/* Save Button */}
        <div style={{
          marginTop: '40px',
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
        }}>
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
