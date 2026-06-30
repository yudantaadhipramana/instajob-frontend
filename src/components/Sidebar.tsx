'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/jobs', label: 'Browse Jobs', icon: '💼' },
  { href: '/applications', label: 'Applications', icon: '📋' },
  { href: '/auto-apply', label: 'Auto-Apply Queue', icon: '🚀' },
  { href: '/profile', label: 'Profile', icon: '👤' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: '#0F172A',
        borderBottom: '1px solid #1E293B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 50,
      }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#F8FAFC',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          {isOpen ? '✕' : '☰'}
        </button>
        <span style={{ color: '#F8FAFC', fontWeight: '600' }}>InstaJob</span>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 40,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: isOpen ? 0 : '-280px',
        width: '280px',
        height: '100vh',
        backgroundColor: '#0F172A',
        borderRight: '1px solid #1E293B',
        padding: '24px 16px',
        zIndex: 60,
        transition: 'left 0.3s ease',
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '32px', paddingLeft: '8px' }}>
          <h1 style={{ color: '#F8FAFC', fontSize: '20px', fontWeight: '700' }}>InstaJob</h1>
          <p style={{ color: '#64748B', fontSize: '12px' }}>AI Job Hunting</p>
        </div>

        {/* Navigation */}
        <nav style={{ marginBottom: '24px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  marginBottom: '4px',
                  borderRadius: '8px',
                  backgroundColor: isActive ? '#1E40AF' : 'transparent',
                  color: isActive ? '#F8FAFC' : '#94A3B8',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.2s',
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
        }}>
          <div style={{
            padding: '12px',
            backgroundColor: '#1E293B',
            borderRadius: '8px',
            marginBottom: '12px',
          }}>
            <p style={{ color: '#F8FAFC', fontSize: '14px', fontWeight: '500' }}>
              {user?.fullName || 'User'}
            </p>
            <p style={{ color: '#64748B', fontSize: '12px' }}>
              {user?.email || 'user@email.com'}
            </p>
          </div>
          <button
            onClick={logout}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'transparent',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#EF4444',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Spacer for fixed header on mobile */}
      <div style={{ height: '64px' }} />
    </>
  );
}
