'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      sessionStorage.setItem('instajob_token', data.token);
      sessionStorage.setItem('instajob_user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError('');
    setLoading(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
      const response = await fetch(`${apiBase}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Google login failed');
        return;
      }

      sessionStorage.setItem('instajob_token', data.token);
      sessionStorage.setItem('instajob_user', JSON.stringify(data.user));
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
          .login-container { padding: 16px !important; }
          .login-card { 
            padding: 32px 20px !important; 
            borderRadius: 12px !important;
          }
          .login-title { fontSize: 24px !important; }
          .login-subtitle { fontSize: 13px !important; }
          .login-input { padding: 9px 10px !important; fontSize: 13px !important; }
          .login-button { padding: 11px !important; fontSize: 13px !important; }
          .login-label { fontSize: 13px !important; }
          .login-error { fontSize: 12px !important; padding: 10px 12px !important; }
          .login-divider { gap: 10px !important; margin: 20px 0 !important; }
          .login-footer { fontSize: 13px !important; marginTop: 16px !important; }
          .login-forgot { fontSize: 12px !important; }
        }
      `}</style>
      <div
        className="login-container"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
          padding: '20px',
        }}
      >
        <div
          className="login-card"
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
              className="login-title"
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1E293B',
                margin: '0 0 8px 0',
              }}
            >
              Welcome Back
            </h1>
            <p className="login-subtitle" style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Sign in to continue your job search
            </p>
          </div>

          {/* Google OAuth */}
          <div style={{ marginBottom: '24px' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google login failed')}
              text="signin_with"
              width="100%"
            />
          </div>

          {/* Divider */}
          <div
            className="login-divider"
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
              className="login-error"
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
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label
                className="login-label"
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
                className="login-input"
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
            <div style={{ marginBottom: '8px' }}>
              <label
                className="login-label"
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
                onChange={handleInputChange}
                required
                className="login-input"
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

            {/* Forgot Password */}
            <div style={{ textAlign: 'right', marginBottom: '24px' }}>
              <Link
                href="#"
                className="login-forgot"
                style={{
                  fontSize: '13px',
                  color: '#0051FF',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="login-button"
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
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <p className="login-footer" style={{ textAlign: 'center', fontSize: '14px', color: '#64748B', marginTop: '20px' }}>
            Don't have an account?{' '}
            <Link
              href="/register"
              style={{
                color: '#0051FF',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
