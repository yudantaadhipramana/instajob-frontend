'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import Icons from '@/components/Icons';

export default function AffiliateDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/affiliate/login');
      return;
    }

    const fetchDashboard = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/affiliate/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/affiliate/login');
          return;
        }

        if (!response.ok) throw new Error('Gagal memuat data dashboard');

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/affiliate/login');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('YUDANTA-ADHIPRAM-CODE');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/register?ref=YUDANTA-ADHIPRAM-CODE`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid #E5E7EB',
          borderTop: '3px solid #3B82F6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          textAlign: 'center',
          maxWidth: '400px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            marginBottom: '12px',
            fontFamily: 'var(--font-heading)',
            color: '#1F2937'
          }}>
            Error
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#6B7280',
            marginBottom: '24px',
            fontFamily: 'var(--font-body)'
          }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)'
            }}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      {/* Header */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '20px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none'
        }}>
          <img 
            src="/logo-instajob.png" 
            alt="InstaJob Logo" 
            style={{ height: '36px', width: 'auto' }}
          />
        </Link>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            background: '#F3F4F6',
            color: '#374151',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#E5E7EB';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#F3F4F6';
          }}
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '32px' }}
        >
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '12px',
            fontFamily: 'var(--font-heading)'
          }}>
            Affiliate Dashboard
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              padding: '6px 14px',
              background: '#DBEAFE',
              color: '#1E40AF',
              fontSize: '12px',
              fontWeight: '600',
              borderRadius: '8px',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              PAYOUT SETIAP JUMAT
            </span>
            <span style={{
              fontSize: '14px',
              color: '#6B7280',
              fontFamily: 'var(--font-body)'
            }}>
              Komisi 20% diberikan satu kali dari pembayaran subscription pertama customer.
            </span>
          </div>
        </motion.div>

        {/* Affiliate Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '24px'
          }}>
            <div>
              <div style={{
                fontSize: '13px',
                color: '#6B7280',
                fontWeight: '600',
                marginBottom: '4px',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Status
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  background: '#10B981',
                  borderRadius: '50%'
                }} />
                <span style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1F2937',
                  fontFamily: 'var(--font-body)'
                }}>
                  Active
                </span>
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '13px',
                color: '#6B7280',
                fontWeight: '600',
                marginBottom: '4px',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Rate Komisi
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#3B82F6',
                fontFamily: 'var(--font-heading)'
              }}>
                {data?.commission || '20%'}
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '13px',
                color: '#6B7280',
                fontWeight: '600',
                marginBottom: '4px',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Masa Validasi
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1F2937',
                fontFamily: 'var(--font-body)'
              }}>
                7 Hari
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handleCopyCode}
              style={{
                padding: '10px 18px',
                background: '#F3F4F6',
                color: '#374151',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#E5E7EB';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#F3F4F6';
              }}
            >
              {copiedCode ? '✓' : '📋'} {copiedCode ? 'Tersalin!' : 'Copy Code'}
            </button>
            <button
              onClick={handleCopyLink}
              style={{
                padding: '10px 18px',
                background: '#F3F4F6',
                color: '#374151',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#E5E7EB';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#F3F4F6';
              }}
            >
              {copiedLink ? '✓' : '🔗'} {copiedLink ? 'Tersalin!' : 'Copy Link'}
            </button>
          </div>
        </motion.div>

        {/* Stats Grid - 5 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {[
            { label: 'Total Referrals', value: data?.referralCount || 0, desc: '0 paid tenant', icon: '👥' },
            { label: 'Pending', value: formatIDR(data?.pendingPayout || 0), desc: 'Validasi 7 hari', icon: '⏳' },
            { label: 'Payable', value: formatIDR(data?.totalEarnings || 0), desc: 'Siap payout', icon: '💰' },
            { label: 'Paid', value: 'Rp 0', desc: 'Sudah dibayar', icon: '✓' },
            { label: 'Next Payout', value: 'Jumat', desc: 'Manual transfer', icon: '📅' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = '#D1D5DB';
                el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = '#E5E7EB';
                el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{
                fontSize: '12px',
                color: '#9CA3AF',
                fontWeight: '600',
                marginBottom: '8px',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '4px',
                fontFamily: 'var(--font-heading)',
                lineHeight: '1.2'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#9CA3AF',
                fontFamily: 'var(--font-body)'
              }}>
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content Cards - 3 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }}>
          {[
            { title: 'Latest Referrals', icon: '👥', message: 'No referrals yet', desc: 'Referral yang masuk dari link atau kode kamu akan tampil di sini.' },
            { title: 'Latest Commissions', icon: '📝', message: 'No commissions yet', desc: 'Komisi akan muncul setelah invoice subscription pertama customer dibayar.' },
            { title: 'Latest Payouts', icon: '📋', message: 'No payouts yet', desc: 'Payout setiap Jumat akan tampil setelah komisi masuk payable.' }
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                padding: '32px',
                textAlign: 'center',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{section.icon}</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1F2937',
                marginBottom: '8px',
                fontFamily: 'var(--font-heading)'
              }}>
                {section.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6B7280',
                marginBottom: '4px',
                fontFamily: 'var(--font-body)'
              }}>
                {section.message}
              </p>
              <p style={{
                fontSize: '13px',
                color: '#9CA3AF',
                fontFamily: 'var(--font-body)',
                lineHeight: '1.5'
              }}>
                {section.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 1024px) {
          main {
            padding: 32px;
          }
          h1 {
            font-size: 28px;
          }
        }
        @media (max-width: 768px) {
          main {
            padding: 24px;
          }
          div[style*="gridTemplateColumns: 'repeat(5"] {
            grid-template-columns: repeat(2, 1fr);
          }
          div[style*="gridTemplateColumns: 'repeat(3"] {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
