'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Password strength validation
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password: string) => {
    setPasswordStrength({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      localStorage.setItem('instajob_token', data.token);
      localStorage.setItem('instajob_user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Google login failed');
        return;
      }

      localStorage.setItem('instajob_token', data.token);
      localStorage.setItem('instajob_user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
      <style>{`
        @media (max-width: 640px) {
          .register-container { padding: 16px !important; }
          .register-card { 
            padding: 32px 20px !important; 
            borderRadius: 12px !important;
          }
          .register-title { fontSize: 24px !important; }
          .register-subtitle { fontSize: 13px !important; }
          .register-input { padding: 9px 10px !important; fontSize: 13px !important; }
          .register-button { padding: 11px !important; fontSize: 13px !important; }
          .register-label { fontSize: 13px !important; }
          .register-error { fontSize: 12px !important; padding: 10px 12px !important; }
          .register-divider { gap: 10px !important; margin: 20px 0 !important; }
          .register-footer { fontSize: 13px !important; marginTop: 16px !important; }
        }
      `}</style>
      <div
        className="register-container"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
          padding: '20px',
        }}
      >
        {/* Logo Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <a href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <Logo size={40} showText={true} />
          </a>
        </div>

        <div
          className="register-card"
          style={{
            width: '100%',
            maxWidth: '420px',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '48px 32px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1
              className="register-title"
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1E293B',
                margin: '0 0 8px 0',
              }}
            >
              Create Account
            </h1>
            <p className="register-subtitle" style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Join 50k+ job seekers automating their search
            </p>
          </div>

          {/* Google OAuth */}
          <div style={{ marginBottom: '24px' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google login failed')}
              text="signup_with"
              width="100%"
            />
          </div>

          {/* Divider */}
          <div
            className="register-divider"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              margin: '24px 0',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="register-error"
              style={{
                background: '#FEE2E2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                padding: '12px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                marginBottom: '20px',
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister}>
            {/* Full Name */}
            <div style={{ marginBottom: '16px' }}>
              <label
                className="register-label"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#334155',
                  marginBottom: '6px',
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="register-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label
                className="register-label"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#334155',
                  marginBottom: '6px',
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="register-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <label
                className="register-label"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#334155',
                  marginBottom: '6px',
                }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  handleInputChange(e);
                  validatePassword(e.target.value);
                }}
                required
                className="register-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
              {formData.password.length > 0 && (
                <PasswordStrengthIndicator password={formData.password} />
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '24px' }}>
              <label
                className="register-label"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#334155',
                  marginBottom: '6px',
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="register-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="register-button"
              style={{
                width: '100%',
                padding: '12px',
                background: loading ? '#94A3B8' : '#0051FF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <p className="register-footer" style={{ textAlign: 'center', fontSize: '14px', color: '#64748B', marginTop: '20px' }}>
            Already have an account?{' '}
            <Link
              href="/login"
              style={{
                color: '#0051FF',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
