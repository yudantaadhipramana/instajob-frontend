'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Set mock auth data
    const mockUser = {
      id: '1',
      email: 'danta@example.com',
      fullName: 'Danta Wijaya'
    };

    const mockToken = 'mock-token-12345';

    localStorage.setItem('instajob_user', JSON.stringify(mockUser));
    localStorage.setItem('instajob_token', mockToken);

    // Redirect to dashboard
    router.push('/dashboard');
  }, [router]);

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
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', margin: '0 0 8px 0' }}>
          Setting up test authentication...
        </h1>
        <p style={{ color: '#64748B', margin: '0' }}>
          Redirecting to dashboard in a moment...
        </p>
      </div>
    </div>
  );
}
