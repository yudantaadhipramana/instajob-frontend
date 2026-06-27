'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

interface User {
  id: string;
  email: string;
  fullName: string;
}

export default function ProfilePage() {
  const [user] = useState<User>({
    id: 'test-user-123',
    email: 'test@instajob.com',
    fullName: 'Test User',
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '40px',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
          <Logo size={32} showText={false} />
          <span style={{ fontSize: '14px', color: '#0051FF', fontWeight: '500' }}>← Back to Dashboard</span>
        </Link>

        <div style={{
          padding: '32px',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          background: '#fafafa',
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#030303', margin: '0 0 24px 0' }}>
            My Profile
          </h1>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#606060', marginBottom: '8px' }}>
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user.fullName}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '13px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#606060', marginBottom: '8px' }}>
                Email
              </label>
              <input
                type="email"
                defaultValue={user.email}
                disabled
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '13px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  background: '#f9f9f9',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#606060', marginBottom: '8px' }}>
                Bio
              </label>
              <textarea
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '13px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  minHeight: '100px',
                  fontFamily: 'inherit',
                }}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button style={{
              padding: '10px 24px',
              fontSize: '13px',
              fontWeight: '500',
              color: '#fff',
              background: '#0051FF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>
              Save Profile
            </button>
            <button style={{
              padding: '10px 24px',
              fontSize: '13px',
              fontWeight: '500',
              color: '#0051FF',
              background: 'transparent',
              border: '1px solid #e5e5e5',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
