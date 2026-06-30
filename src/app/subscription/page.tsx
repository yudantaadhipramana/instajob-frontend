'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppNavigation from '@/components/shared/AppNavigation';

interface Subscription {
  plan: string;
  features: string;
  expiresAt: string | null;
}

export default function SubscriptionPage() {
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('instajob_token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
        const response = await fetch(`${apiBase}/api/subscription`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentPlan(data);
        }
      } catch (err) {
        console.error('Failed to fetch subscription:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleUpgrade = async () => {
    setError('');
    setSuccess('');
    setUpgrading(true);

    try {
      const token = sessionStorage.getItem('instajob_token');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

      // Call payment gateway to create checkout session
      const response = await fetch(`${apiBase}/api/payment/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId: 'premium' }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Mengarahkan ke payment gateway...');

        // Simulate payment success callback
        const processResponse = await fetch(`${apiBase}/api/payment/mock-process`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId: data.sessionId, success: true }),
        });

        if (processResponse.ok) {
          // Re-fetch current plan after webhook processes
          const planResponse = await fetch(`${apiBase}/api/subscription`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (planResponse.ok) {
            setCurrentPlan(await planResponse.json());
          }
          setSuccess('Pembayaran berhasil! Akun Anda telah diupgrade ke Pro Plan.');
        } else {
          setError('Pembayaran gagal diproses.');
        }
      } else {
        setError('Gagal membuat sesi pembayaran. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const isPro = currentPlan?.plan === 'premium';

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavigation />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #0051FF 0%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 16px 0',
          }}>
            Pilih Paket Anda
          </h1>
          <p style={{ fontSize: '18px', color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
            Upgrade ke Pro Plan untuk fitur unlimited dan prioritas support
          </p>
        </div>

        {error && (
          <div style={{
            maxWidth: '800px',
            margin: '0 auto 32px',
            padding: '16px',
            background: '#FEE2E2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            borderRadius: '12px',
            fontSize: '14px',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            maxWidth: '800px',
            margin: '0 auto 32px',
            padding: '16px',
            background: '#D1FAE5',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            borderRadius: '12px',
            fontSize: '14px',
            textAlign: 'center',
          }}>
            {success}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px 32px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            border: '2px solid #E5E7EB',
            position: 'relative',
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '16px',
            }}>
              FREE
            </div>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '48px', fontWeight: '800', color: '#111827' }}>Rp 0</span>
              <span style={{ fontSize: '16px', color: '#6B7280', fontWeight: '600' }}>/bulan</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
              {[
                '10 lamaran per hari',
                'AI job matching dasar',
                'Browse lowongan',
                'Track aplikasi',
              ].map((feature, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 0',
                  borderBottom: '1px solid #F3F4F6',
                  fontSize: '14px',
                  color: '#374151',
                }}>
                  <span style={{ color: '#10B981', fontSize: '18px' }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {!isPro && (
              <div style={{
                padding: '12px 24px',
                background: '#F3F4F6',
                color: '#6B7280',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '14px',
              }}>
                Paket Saat Ini
              </div>
            )}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #0051FF 0%, #7C3AED 100%)',
            borderRadius: '20px',
            padding: '40px 32px',
            boxShadow: '0 8px 32px rgba(0, 81, 255, 0.3)',
            position: 'relative',
            border: '2px solid rgba(255,255,255,0.2)',
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '24px',
              background: '#10B981',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              RECOMMENDED
            </div>

            <div style={{
              fontSize: '14px',
              fontWeight: '700',
              color: 'rgba(255,255,255,0.9)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '16px',
            }}>
              PRO PLAN
            </div>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '48px', fontWeight: '800', color: '#fff' }}>Rp 99K</span>
              <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>/bulan</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
              {[
                'Unlimited lamaran per hari',
                'AI job matching advanced',
                'Auto-apply ke puluhan jobs',
                'Priority support 24/7',
                'Email scout automation',
                'Analytics & insights',
              ].map((feature, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '14px',
                  color: '#fff',
                }}>
                  <span style={{ color: '#34D399', fontSize: '18px' }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {isPro ? (
              <div style={{
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '14px',
              }}>
                Paket Aktif
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={upgrading}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: '#fff',
                  color: '#0051FF',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '16px',
                  cursor: upgrading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: upgrading ? 0.6 : 1,
                }}
              >
                {upgrading ? 'Processing...' : 'Upgrade Sekarang'}
              </button>
            )}
          </div>
        </div>

        {isPro && currentPlan?.expiresAt && (
          <div style={{
            maxWidth: '600px',
            margin: '48px auto 0',
            padding: '20px 24px',
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
              Paket Pro Anda aktif hingga{' '}
              <strong style={{ color: '#111827' }}>
                {new Date(currentPlan.expiresAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </strong>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
