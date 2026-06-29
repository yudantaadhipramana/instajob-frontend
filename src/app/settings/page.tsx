'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { JobsIcon, ApplicationsIcon, ProfileIcon } from '@/components/DashboardIcons';
import ProfileDropdown from '@/components/ProfileDropdown';
import { Lock, Bell, Eye, Trash2, LogOut, Settings, Mail, Shield, Database, ArrowLeft, Save, Loader, CheckCircle, AlertCircle, Home } from 'lucide-react';

interface User {
  id: string;
  email: string;
  fullName: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Account Settings State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Privacy Settings State
  const [profileVisibility, setProfileVisibility] = useState('private');
  const [showEmail, setShowEmail] = useState(false);
  const [allowMessages, setAllowMessages] = useState(true);

  // Notification Settings State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [telegramNotifications, setTelegramNotifications] = useState(false);
  const [applicationUpdates, setApplicationUpdates] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // Subscription Settings State
  const [currentPlan, setCurrentPlan] = useState('monthly');
  const [autoRenew, setAutoRenew] = useState(true);

  // Auth & Load Settings
  useEffect(() => {
    const checkAuthAndLoadSettings = async () => {
      const token = localStorage.getItem('instajob_token');
      const userData = localStorage.getItem('instajob_user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFullName(parsedUser.fullName || '');
      setEmail(parsedUser.email || '');
      setLoading(false);
    };

    checkAuthAndLoadSettings();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('instajob_token');
    localStorage.removeItem('instajob_user');
    router.push('/');
  };

  const handleSaveAccountSettings = async () => {
    setSaveLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setSaveLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage('Account settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setErrorMessage('Failed to save settings');
    } finally {
      setSaveLoading(false);
    }
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
        <div style={{ textAlign: 'center' }}>
          <Logo size={48} showText={true} />
          <div style={{ marginTop: '20px', color: '#64748B', fontSize: '16px', fontWeight: '500' }}>
            Loading settings...
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

      {/* Navigation Tabs — CONSISTENT WITH /dashboard AND /applications */}
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
          <ProfileIcon size={18} color="currentColor" />
          Profile
        </Link>
      </div>

      {/* Main Content Area */}
      <main style={{
        maxWidth: '1000px',
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
            Settings
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#64748B',
            margin: 0,
          }}>
            Manage your account, privacy, notifications, and preferences
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div style={{
            marginBottom: '24px',
            padding: '16px',
            background: '#DCFCE7',
            border: '1px solid #86EFAC',
            borderRadius: '8px',
            color: '#166534',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <CheckCircle size={18} />
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div style={{
            marginBottom: '24px',
            padding: '16px',
            background: '#FEE2E2',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            color: '#991B1B',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <AlertCircle size={18} />
            {errorMessage}
          </div>
        )}

        {/* Account Settings Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(0, 81, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Settings size={20} color="#0051FF" />
            </div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              margin: 0,
              color: '#1E293B',
            }}>
              Account Settings
            </h2>
          </div>

          {/* Full Name Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1E293B',
              marginBottom: '8px',
            }}>
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '14px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => e.target.style.borderColor = '#0051FF'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          {/* Email Display (Read-only) */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1E293B',
              marginBottom: '8px',
            }}>
              Email Address
            </label>
            <div style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              background: '#F8FAFC',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Mail size={16} />
              {email}
            </div>
          </div>

          {/* Current Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1E293B',
              marginBottom: '8px',
            }}>
              Current Password (to update password)
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '14px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => e.target.style.borderColor = '#0051FF'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          {/* New Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1E293B',
              marginBottom: '8px',
            }}>
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '14px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => e.target.style.borderColor = '#0051FF'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1E293B',
              marginBottom: '8px',
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '14px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => e.target.style.borderColor = '#0051FF'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveAccountSettings}
            disabled={saveLoading}
            style={{
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
              cursor: saveLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: saveLoading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => !saveLoading && (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => !saveLoading && (e.currentTarget.style.opacity = '1')}
          >
            {saveLoading ? (
              <>
                <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>

        {/* Privacy Settings Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(0, 81, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Shield size={20} color="#0051FF" />
            </div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              margin: 0,
              color: '#1E293B',
            }}>
              Privacy Settings
            </h2>
          </div>

          {/* Profile Visibility */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1E293B',
              marginBottom: '8px',
            }}>
              Profile Visibility
            </label>
            <select
              value={profileVisibility}
              onChange={(e) => setProfileVisibility(e.target.value)}
              style={{
                width: '100%',
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
              onFocus={(e) => e.target.style.borderColor = '#0051FF'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
            >
              <option value="public">Public (Visible to everyone)</option>
              <option value="private">Private (Only visible to me)</option>
              <option value="recruiters">Recruiters Only</option>
            </select>
          </div>

          {/* Show Email */}
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', margin: '0 0 4px 0' }}>
                Show Email Address
              </p>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Let recruiters see your email address
              </p>
            </div>
            <input
              type="checkbox"
              checked={showEmail}
              onChange={(e) => setShowEmail(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Allow Messages */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', margin: '0 0 4px 0' }}>
                Allow Messages from Recruiters
              </p>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Enable direct messaging from recruiters
              </p>
            </div>
            <input
              type="checkbox"
              checked={allowMessages}
              onChange={(e) => setAllowMessages(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>

        {/* Notification Settings Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(0, 81, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Bell size={20} color="#0051FF" />
            </div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              margin: 0,
              color: '#1E293B',
            }}>
              Notification Preferences
            </h2>
          </div>

          {/* Email Notifications */}
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', margin: '0 0 4px 0' }}>
                Email Notifications
              </p>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Receive notifications via email
              </p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Telegram Notifications */}
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', margin: '0 0 4px 0' }}>
                Telegram Notifications
              </p>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Receive notifications via Telegram
              </p>
            </div>
            <input
              type="checkbox"
              checked={telegramNotifications}
              onChange={(e) => setTelegramNotifications(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Application Updates */}
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', margin: '0 0 4px 0' }}>
                Application Updates
              </p>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Get notified when application status changes
              </p>
            </div>
            <input
              type="checkbox"
              checked={applicationUpdates}
              onChange={(e) => setApplicationUpdates(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Weekly Digest */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', margin: '0 0 4px 0' }}>
                Weekly Digest
              </p>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Receive weekly summary of job opportunities
              </p>
            </div>
            <input
              type="checkbox"
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>

        {/* Subscription Settings Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(0, 81, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Lock size={20} color="#0051FF" />
            </div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              margin: 0,
              color: '#1E293B',
            }}>
              Subscription & Billing
            </h2>
          </div>

          {/* Current Plan Display */}
          <div style={{
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(0, 81, 255, 0.05) 0%, rgba(0, 81, 255, 0.02) 100%)',
            border: '1px solid rgba(0, 81, 255, 0.1)',
            borderRadius: '8px',
            marginBottom: '24px',
          }}>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 4px 0', fontWeight: '500' }}>
              Current Plan
            </p>
            <p style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0', color: '#0051FF', textTransform: 'capitalize' }}>
              {currentPlan} Plan
            </p>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
              Next billing date: July 29, 2026
            </p>
          </div>

          {/* Auto-Renew Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', margin: '0 0 4px 0' }}>
                Auto-Renew Subscription
              </p>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Automatically renew when subscription expires
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoRenew}
              onChange={(e) => setAutoRenew(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Manage Subscription Button */}
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
            Manage Subscription
          </button>
        </div>

        {/* Data & Privacy Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(0, 81, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Database size={20} color="#0051FF" />
            </div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              margin: 0,
              color: '#1E293B',
            }}>
              Data & Privacy
            </h2>
          </div>

          <div style={{ marginBottom: '20px', padding: '16px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px' }}>
            <p style={{ fontSize: '13px', color: '#0369A1', fontWeight: '500', margin: 0 }}>
              📋 Your data is encrypted and secure. We never share your personal information with third parties.
            </p>
          </div>

          {/* Download Data */}
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(0, 81, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(0, 81, 255, 0.1)' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', margin: '0 0 4px 0' }}>
                Download Your Data
              </p>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Export all your data in JSON format
              </p>
            </div>
            <button style={{
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#0051FF',
              background: 'transparent',
              border: '1px solid #0051FF',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 81, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}>
              Download
            </button>
          </div>

          {/* Delete Data */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(239, 68, 68, 0.03)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', margin: '0 0 4px 0' }}>
                Delete Account
              </p>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Permanently delete your account and all associated data
              </p>
            </div>
            <button style={{
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#EF4444',
              background: 'transparent',
              border: '1px solid #EF4444',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}>
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        {/* Logout Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            margin: '0 0 12px 0',
            color: '#1E293B',
          }}>
            Sign Out
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#64748B',
            margin: '0 0 24px 0',
          }}>
            Sign out of your account on this device
          </p>
          <button
            onClick={handleLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 32px',
              fontSize: '14px',
              fontWeight: '700',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #EF4444, #DC2626)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
