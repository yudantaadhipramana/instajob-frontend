'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Gagal mengirim email');
      }
      setStatus('done');
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
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', margin: '16px 0 8px' }}>Lupa Password</h1>
          <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>Masukkan email Anda untuk mendapat link reset password</p>
        </div>

        {status === 'done' ? (
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#16A34A', padding: '16px', borderRadius: '8px', textAlign: 'center', fontSize: '14px' }}>
            ✅ Link reset password sudah dikirim ke <strong>{email}</strong>.<br />
            Cek inbox Anda (berlaku 1 jam).
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
                {error}
              </div>
            )}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="nama@email.com"
                style={{ width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #CBD5E1', borderRadius: '8px', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{ width: '100%', padding: '12px', background: '#1E40FF', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}
            >
              {status === 'loading' ? 'Mengirim...' : 'Kirim Link Reset'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#64748B' }}>
          Ingat password? <Link href="/login" style={{ color: '#1E40FF', fontWeight: '600' }}>Masuk</Link>
        </p>
      </div>
    </div>
  );
}
