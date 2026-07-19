'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProfileDropdownProps {
  user?: {
    id: string;
    email: string;
    fullName: string;
    profilePicture?: string;
  };
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('instajob_token');
    localStorage.removeItem('instajob_user');
    router.push('/');
  };

  const getInitials = () => {
    if (!user?.fullName) return '?';
    return user.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = () => {
    const colors = ['#0051FF', '#7C3AED', '#EC4899', '#F59E0B', '#10B981'];
    const index = (user?.email.charCodeAt(0) || 0) % colors.length;
    return colors[index];
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: user?.profilePicture ? 'transparent' : getAvatarColor(),
          color: '#fff',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '600',
          fontSize: '14px',
          transition: 'all 0.2s ease',
          boxShadow: 'none',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
        title={user?.fullName}
      >
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.fullName || 'Avatar'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          getInitials()
        )}
      </button>

      {/* Dropdown Menu - YouTube Style */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: 0,
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 2px 16px rgba(0, 0, 0, 0.08)',
            zIndex: 1000,
            minWidth: '280px',
            overflow: 'hidden',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          {/* User Info Section */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #f0f0f0',
          }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#030303',
              marginBottom: '4px',
              letterSpacing: '-0.3px',
            }}>
              {user?.fullName || 'User'}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#606060',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {user?.email}
            </div>
          </div>

          {/* Menu Items - Lean Design */}
          <div style={{ padding: '8px 0' }}>
            {/* Profile */}
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 20px',
                color: '#030303',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '400',
                transition: 'background 0.15s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9f9f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>View profile</span>
            </Link>

            {/* Subscriptions */}
            <div
              onClick={() => {
                router.push('/subscription');
                setIsOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 20px',
                color: '#030303',
                fontSize: '13px',
                fontWeight: '400',
                transition: 'background 0.15s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9f9f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Subscriptions</span>
            </div>

            {/* Withdrawal */}
            <div
              onClick={() => { router.push('/withdrawal'); setIsOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 20px', color: '#030303', fontSize: '13px', fontWeight: '400', transition: 'background 0.15s ease', cursor: 'pointer' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f9f9f9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <span>Penarikan Dana</span>
            </div>

            {/* Affiliate Dashboard */}
            <div
              onClick={() => { router.push('/affiliate/dashboard'); setIsOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 20px', color: '#030303', fontSize: '13px', fontWeight: '400', transition: 'background 0.15s ease', cursor: 'pointer' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f9f9f9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              <span>Dashboard Affiliate</span>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: '#f0f0f0', margin: '8px 0' }}></div>

            {/* Referral */}
            <div
              onClick={() => {
                router.push('/referral');
                setIsOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 20px',
                color: '#030303',
                fontSize: '13px',
                fontWeight: '400',
                transition: 'background 0.15s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9f9f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span>Referrals</span>
            </div>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: '#f0f0f0',
              margin: '8px 0',
            }}></div>

            {/* Settings */}
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 20px',
                color: '#030303',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '400',
                transition: 'background 0.15s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9f9f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m2.12-2.12l4.24-4.24"></path>
              </svg>
              <span>Settings</span>
            </Link>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: '#f0f0f0',
              margin: '8px 0',
            }}></div>

            {/* Sign Out */}
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 20px',
                color: '#030303',
                background: 'transparent',
                border: 'none',
                fontSize: '13px',
                fontWeight: '400',
                transition: 'background 0.15s ease',
                cursor: 'pointer',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9f9f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
