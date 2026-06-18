"use client";

import React from 'react';
import { LayoutDashboard, Briefcase, Send, User, Settings, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ 
      background: '#FFFFFF', 
      borderRight: '1px solid #E2E8F0', 
      backdropFilter: 'blur(40px)', 
      padding: '32px 24px', 
      display: 'flex', 
      flexDirection: 'column',
      height: '100vh'
    }}>
      {/* Logo */}
      <div style={{ marginBottom: '32px' }}>
        <Logo />
      </div>
      
      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', paddingLeft: '12px', marginBottom: '12px' }}>Intelligence</p>
        <SidebarLink href="/" icon={LayoutDashboard} label="Overview" active={pathname === '/'} />
        <SidebarLink href="/jobs" icon={Briefcase} label="Opportunity" active={pathname === '/jobs'} />
        <SidebarLink href="/applications" icon={Send} label="Live Status" active={pathname === '/applications'} />
        
        <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', paddingLeft: '12px', marginBottom: '12px', marginTop: '32px' }}>Personal</p>
        <SidebarLink href="/profile" icon={User} label="Profile & CV" active={pathname === '/profile'} />
        <SidebarLink href="/settings" icon={Settings} label="Preferences" active={pathname === '/settings'} />
      </nav>

      {/* Profile Section */}
      <div style={{ 
        marginTop: '24px', 
        padding: '16px', 
        borderRadius: '16px', 
        background: '#F8FAFC', 
        border: '1px solid #E2E8F0', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '12px', 
          background: 'linear-gradient(135deg, #0051FF, #0051FF)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '14px', 
          fontWeight: 700, 
          color: '#1E293B',
          boxShadow: '0 8px 16px rgba(0, 81, 255, 0.3)'
        }}>
          YA
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Yudanta A.</p>
          <p style={{ fontSize: '10px', fontWeight: 800, color: '#0051FF', textTransform: 'uppercase' }}>PRO PLAN</p>
        </div>
        <ChevronRight size={16} color="#CBD5E1" />
      </div>
    </aside>
  );
}

function SidebarLink({ icon: Icon, label, href, active }: any) {
  return (
    <Link href={href} style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      padding: '10px 12px', 
      borderRadius: '8px', 
      textDecoration: 'none',
      color: active ? '#1E293B' : '#94A3B8',
      background: active ? '#F1F5F9' : 'transparent',
      border: active ? '1px solid #CBD5E1' : '1px solid transparent',
      transition: 'all 0.2s ease',
      fontSize: '14px',
      fontWeight: 600
    }}>
      <Icon size={18} color={active ? '#0051FF' : 'currentColor'} />
      {label}
    </Link>
  );
}
