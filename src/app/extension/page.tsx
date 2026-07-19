'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { HomeIcon, JobsIcon, ApplicationsIcon } from '@/components/DashboardIcons';
import { Settings, Puzzle } from 'lucide-react';
import ProfileDropdown from '@/components/ProfileDropdown';
import HeaderActions from '@/components/HeaderActions';

interface User { id: string; email: string; fullName: string; }

export default function ExtensionPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('instajob_token');
    const userData = localStorage.getItem('instajob_user');
    if (!token || !userData) { router.push('/login'); return; }
    setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  const copyToken = () => {
    const token = localStorage.getItem('instajob_token') || '';
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <Logo size={48} showText={true} />
    </div>
  );

  const steps = [
    { num: '01', title: 'Download Extension', desc: 'Download file extension InstaLinkedIn dari link di bawah.', action: true },
    { num: '02', title: 'Buka Chrome Extensions', desc: 'Buka chrome://extensions di browser Chrome kamu.' },
    { num: '03', title: 'Aktifkan Developer Mode', desc: 'Toggle "Developer mode" di pojok kanan atas.' },
    { num: '04', title: 'Load Extension', desc: 'Klik "Load unpacked" → pilih folder extension yang sudah didownload.' },
    { num: '05', title: 'Hubungkan Akun', desc: 'Klik ikon extension → masukkan InstaJob Token di bawah.' },
    { num: '06', title: 'Mulai Apply', desc: 'Buka LinkedIn → temukan job → klik Easy Apply → extension akan berjalan otomatis.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Logo size={36} showText={true} />
          <div style={{ display: 'flex', gap: '4px' }}>
            {[
              { href: '/dashboard', icon: <HomeIcon size={16} color="currentColor" />, label: 'Dashboard' },
              { href: '/jobs', icon: <JobsIcon size={16} color="currentColor" />, label: 'Browse Jobs' },
              { href: '/applications', icon: <ApplicationsIcon size={16} color="currentColor" />, label: 'Applications' },
              { href: '/preferences', icon: <Settings size={16} />, label: 'Preferences' },
              { href: '/add-ons', icon: <Puzzle size={16} />, label: 'Add-ons' },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', color: '#64748B', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
                {item.icon}{item.label}
              </Link>
            ))}
          </div>
        </div>
        <HeaderActions user={user || undefined} />
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(30,64,255,0.08), rgba(59,130,246,0.12))', border: '1px solid rgba(30,64,255,0.2)', borderRadius: '100px', padding: '8px 20px', marginBottom: '16px', fontSize: '13px', fontWeight: '700', color: '#1E40FF' }}>
            🔌 LinkedIn Extension
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1E293B', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            InstaLinkedIn — Auto Apply Bot
          </h1>
          <p style={{ fontSize: '16px', color: '#64748B', margin: 0, fontWeight: '600' }}>
            AI-powered LinkedIn Easy Apply automation. Powered by InstaJob.
          </p>
        </div>

        {/* Steps */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #E2E8F0', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1E293B', margin: '0 0 24px' }}>Cara Install</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #1E40FF, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: '#fff' }}>
                  {step.num}
                </div>
                <div style={{ flex: 1, paddingTop: '8px' }}>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: '#1E293B', marginBottom: '4px' }}>{step.title}</div>
                  <div style={{ fontSize: '14px', color: '#64748B', fontWeight: '600' }}>{step.desc}</div>
                  {step.action && (
                    <a
                      href="https://github.com/yudantaadhipramana/InstaLinkedIn_Extension/archive/refs/heads/main.zip"
                      download
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px', padding: '8px 16px', background: '#1E40FF', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: '700', textDecoration: 'none' }}
                    >
                      ⬇️ Download Extension
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Card */}
        <div style={{ background: 'linear-gradient(135deg, #1E3A8A, #1E40FF)', borderRadius: '16px', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#fff', margin: '0 0 8px' }}>🔑 InstaJob Token</h2>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: '0 0 16px', fontWeight: '600' }}>
            Copy token ini dan paste di popup extension setelah install.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {typeof window !== 'undefined' ? (localStorage.getItem('instajob_token') || '')?.substring(0, 40) + '...' : ''}
            </div>
            <button
              onClick={copyToken}
              style={{ padding: '10px 18px', background: copied ? '#16A34A' : '#fff', color: copied ? '#fff' : '#1E40FF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {copied ? '✅ Tersalin' : '📋 Copy Token'}
            </button>
          </div>
        </div>

        {/* API Info */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1E293B', margin: '0 0 12px' }}>⚙️ Info Teknis</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Backend URL', value: process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app' },
              { label: 'Sync Endpoint', value: '/api/extension/sync-apply' },
              { label: 'Extension Version', value: 'InstaLinkedIn v3.0.1' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none' }}>
                <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>{item.label}</span>
                <span style={{ fontSize: '12px', color: '#1E293B', fontFamily: 'monospace', fontWeight: '700' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
