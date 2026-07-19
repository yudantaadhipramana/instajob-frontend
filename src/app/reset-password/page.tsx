'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) setError('Token tidak valid. Minta link reset ulang.');
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Password tidak sama'); return; }
    if (password.length < 6) { setError('Password minimal 6 karakter'); return; }
    setError('');
    setStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'Gagal reset password');
      setStatus('done');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.message);
      setStatus('idle');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Logo size={40} showText={true} />
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', margin: '16px 0 8px' }}>Reset Password</h1>
          <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>Masukkan password baru Anda</p>
        </div>

        {status === 'done' ? (
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#16A34A', padding: '16px', borderRadius: '8px', textAlign: 'center', fontSize: '14px' }}>
            ✅ Password berhasil direset! Mengarahkan ke halaman login...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
                {error}
              </div>
            )}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Password Baru</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Minimal 6 karakter"
                style={{ width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #CBD5E1', borderRadius: '8px', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
              {password.length > 0 && (
                <PasswordStrengthIndicator password={password} />
              )}
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Konfirmasi Password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                placeholder="Ulangi password baru"
                style={{ width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #CBD5E1', borderRadius: '8px', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || !token}
              style={{ width: '100%', padding: '12px', background: '#1E40FF', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: (status === 'loading' || !token) ? 'not-allowed' : 'pointer', opacity: (status === 'loading' || !token) ? 0.7 : 1 }}
            >
              {status === 'loading' ? 'Menyimpan...' : 'Reset Password'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/forgot-password" style={{ color: '#1E40FF', fontWeight: '600' }}>Minta link baru</Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
