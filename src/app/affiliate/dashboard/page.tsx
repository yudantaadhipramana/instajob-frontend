'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

export default function AffiliateDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

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
          border: '4px solid rgba(30, 64, 255, 0.1)',
          borderTop: '4px solid var(--color-primary)',
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
          borderRadius: '20px',
          border: '1px solid rgba(0,0,0,0.06)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            ⚠️
          </div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            marginBottom: '12px',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-foreground)'
          }}>
            Error
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#64748B',
            marginBottom: '24px',
            fontFamily: 'var(--font-body)'
          }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
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
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '20px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
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
            background: 'transparent',
            color: '#64748B',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(30, 64, 255, 0.05)';
            e.currentTarget.style.borderColor = 'var(--color-primary)';
            e.currentTarget.style.color = 'var(--color-primary)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
            e.currentTarget.style.color = '#64748B';
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
          style={{ marginBottom: '40px' }}
        >
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: 'var(--color-foreground)',
            marginBottom: '12px',
            fontFamily: 'var(--font-heading)'
          }}>
            Affiliate Dashboard
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              padding: '6px 14px',
              background: 'linear-gradient(135deg, rgba(30, 64, 255, 0.1) 0%, rgba(59, 130, 246, 0.15) 100%)',
              color: 'var(--color-primary)',
              fontSize: '12px',
              fontWeight: '700',
              borderRadius: '100px',
              fontFamily: 'var(--font-body)'
            }}>
              PAYOUT SETIAP JUMAT
            </span>
            <span style={{
              fontSize: '14px',
              color: '#64748B',
              fontFamily: 'var(--font-body)'
            }}>
              Komisi diberikan dari pembayaran subscription customer.
            </span>
          </div>
        </motion.div>

        {/* Affiliate Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, rgba(30, 64, 255, 0.03) 0%, rgba(59, 130, 246, 0.06) 100%)',
            border: '1px solid rgba(30, 64, 255, 0.15)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '40px'
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}>
            {/* Status */}
            <div>
              <div style={{
                fontSize: '12px',
                color: '#94A3B8',
                fontWeight: '600',
                marginBottom: '8px',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Status
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  background: '#10B981',
                  borderRadius: '50%'
                }} />
                <span style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: 'var(--color-foreground)',
                  fontFamily: 'var(--font-heading)'
                }}>
                  Active
                </span>
              </div>
            </div>

            {/* Commission Rate */}
            <div>
              <div style={{
                fontSize: '12px',
                color: '#94A3B8',
                fontWeight: '600',
                marginBottom: '8px',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Rate Komisi
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '800',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-heading)'
              }}>
                {data?.commission || '20%'} <span style={{ fontSize: '14px', fontWeight: '600', color: '#94A3B8' }}>({data?.tierName})</span>
              </div>
            </div>

            {/* Validation Period */}
            <div>
              <div style={{
                fontSize: '12px',
                color: '#94A3B8',
                fontWeight: '600',
                marginBottom: '8px',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Masa Validasi
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: 'var(--color-foreground)',
                fontFamily: 'var(--font-heading)'
              }}>
                7 Hari
              </div>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              gridColumn: 'span 100%'
            }}>
              <button
                onClick={handleCopyCode}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #1E40FF 0%, #3B82F6 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {copiedCode ? '✓ Tersalin!' : 'Copy Kode Affiliate'}
              </button>
              <button
                style={{
                  padding: '12px 24px',
                  background: 'white',
                  color: 'var(--color-primary)',
                  border: '1.5px solid var(--color-primary)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(30, 64, 255, 0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'white'}
              >
                Copy Referral Link
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {[
            { label: 'Total Referrals', value: data?.referralCount || 0, icon: '👥', color: '#7C3AED' },
            { label: 'Pending', value: formatIDR(data?.pendingPayout || 0), icon: '⏳', color: '#F59E0B' },
            { label: 'Payable', value: formatIDR(data?.totalEarnings || 0), icon: '💰', color: '#10B981' },
            { label: 'Next Payout', value: 'Jumat', icon: '📅', color: '#3B82F6' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: `rgba(${stat.color === '#7C3AED' ? '124, 58, 237' : stat.color === '#F59E0B' ? '245, 158, 11' : stat.color === '#10B981' ? '16, 185, 129' : '59, 130, 246'}, 0.1)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  {stat.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#94A3B8',
                    fontWeight: '600',
                    fontFamily: 'var(--font-body)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: '800',
                color: 'var(--color-foreground)',
                fontFamily: 'var(--font-heading)'
              }}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {[
            { title: 'Latest Referrals', icon: '👥', message: 'No referrals yet', desc: 'Share your link to get started.' },
            { title: 'Latest Commissions', icon: '📝', message: 'No commissions yet', desc: 'Commissions appear after first subscription.' },
            { title: 'Latest Payouts', icon: '📅', message: 'No payouts yet', desc: 'Payouts appear after commission becomes payable.' }
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              style={{
                background: 'white',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.06)',
                padding: '32px',
                textAlign: 'center',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{section.icon}</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: 'var(--color-foreground)',
                marginBottom: '8px',
                fontFamily: 'var(--font-heading)'
              }}>
                {section.title}
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#64748B',
                marginBottom: '4px',
                fontFamily: 'var(--font-body)'
              }}>
                {section.message}
              </p>
              <p style={{
                fontSize: '13px',
                color: '#94A3B8',
                fontFamily: 'var(--font-body)'
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
      `}</style>
    </div>
  );
}
