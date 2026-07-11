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
        const response = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/affiliate/dashboard', {
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
    navigator.clipboard.writeText(data?.code || 'YUDANTA-ADHIPRAM-CODE');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/register?ref=${data?.code || 'CODE'}`);
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

  // Badge tier system: Bronze 0, Silver 30, Gold 100, Platinum 250
  const referralCount = data?.referralCount || 0;
  const getCurrentTier = () => {
    if (referralCount >= 250) return { emoji: '💎', name: 'Platinum', rate: '35%', color: '#E5E4E2', next: null, progress: 100 };
    if (referralCount >= 100) return { emoji: '🥇', name: 'Gold', rate: '30%', color: '#FFD700', next: 250, progress: ((referralCount - 100) / 150) * 100 };
    if (referralCount >= 30) return { emoji: '🥈', name: 'Silver', rate: '25%', color: '#C0C0C0', next: 100, progress: ((referralCount - 30) / 70) * 100 };
    return { emoji: '🥉', name: 'Bronze', rate: '20%', color: '#CD7F32', next: 30, progress: (referralCount / 30) * 100 };
  };

  const currentTier = getCurrentTier();

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Header - Compact dengan Title di samping Logo */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '16px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img 
              src="/logo-instajob.png" 
              alt="InstaJob Logo" 
              style={{ height: '32px', width: 'auto' }}
            />
          </Link>
          <div style={{ borderLeft: '1px solid #E5E7EB', paddingLeft: '24px' }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1F2937',
              margin: 0,
              fontFamily: 'var(--font-heading)'
            }}>
              Affiliate Dashboard
            </h1>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 18px',
            background: '#F3F4F6',
            color: '#374151',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            fontSize: '13px',
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

      {/* Main Content - Compact Layout untuk Fit 1 halaman */}
      <main style={{ padding: '24px 48px', maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Info Badge + Action Row */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '16px 24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{
              padding: '6px 12px',
              background: '#DBEAFE',
              color: '#1E40AF',
              fontSize: '11px',
              fontWeight: '700',
              borderRadius: '6px',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              PAYOUT SETIAP JUMAT
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: '#10B981',
                  borderRadius: '50%'
                }} />
                <span style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#10B981',
                  fontFamily: 'var(--font-body)'
                }}>
                  Active
                </span>
              </div>
              <span style={{ color: '#E5E7EB' }}>•</span>
              <span style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#3B82F6',
                fontFamily: 'var(--font-body)'
              }}>
                Rate: {currentTier.rate}
              </span>
              <span style={{ color: '#E5E7EB' }}>•</span>
              <span style={{
                fontSize: '13px',
                color: '#6B7280',
                fontFamily: 'var(--font-body)'
              }}>
                Validasi 7 hari
              </span>
              <span style={{ color: '#E5E7EB' }}>•</span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                background: 'linear-gradient(135deg, rgba(205, 127, 50, 0.1) 0%, rgba(205, 127, 50, 0.15) 100%)',
                borderRadius: '6px',
                border: `1px solid ${currentTier.color}`
              }}>
                <span style={{ fontSize: '14px' }}>{currentTier.emoji}</span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#374151',
                  fontFamily: 'var(--font-body)'
                }}>
                  {currentTier.name}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCopyCode}
              style={{
                padding: '8px 16px',
                background: copiedCode ? '#10B981' : '#F3F4F6',
                color: copiedCode ? 'white' : '#374151',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {copiedCode ? '✓' : '📋'} {copiedCode ? 'Tersalin!' : 'Copy Code'}
            </button>
            <button
              onClick={handleCopyLink}
              style={{
                padding: '8px 16px',
                background: copiedLink ? '#10B981' : '#F3F4F6',
                color: copiedLink ? 'white' : '#374151',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
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
          marginBottom: '20px'
        }}>
          {[
            { 
              label: 'Total Referrals', 
              value: referralCount, 
              desc: `${referralCount} paid tenant`,
              iconColor: '#6366F1'
            },
            { 
              label: 'Pending', 
              value: formatIDR(data?.pendingPayout || 0), 
              desc: 'Validasi 7 hari',
              iconColor: '#F97316'
            },
            { 
              label: 'Payable', 
              value: formatIDR(data?.totalEarnings || 0), 
              desc: 'Siap payout',
              iconColor: '#10B981'
            },
            { 
              label: 'Paid', 
              value: 'Rp 0', 
              desc: 'Sudah dibayar',
              iconColor: '#10B981'
            },
            { 
              label: 'Next Payout', 
              value: 'Jumat', 
              desc: 'Manual transfer',
              iconColor: '#3B82F6'
            }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.03 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
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
                el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
              }}
            >
              <div style={{
                fontSize: '11px',
                color: '#9CA3AF',
                fontWeight: '700',
                marginBottom: '8px',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '26px',
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

        {/* Content Cards - 4 Columns dengan Badge Journey/Progress */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          {[
            { 
              title: 'Latest Referrals', 
              iconComponent: Icons.users(36, '#6366F1'),
              message: 'No referrals yet', 
              desc: 'Referral yang masuk dari link atau kode kamu akan tampil di sini.' 
            },
            { 
              title: 'Latest Commissions', 
              iconComponent: Icons.money(36, '#F97316'),
              message: 'No commissions yet', 
              desc: 'Komisi akan muncul setelah invoice subscription pertama customer dibayar.' 
            },
            { 
              title: 'Latest Payouts', 
              iconComponent: Icons.payment(36, '#10B981'),
              message: 'No payouts yet', 
              desc: 'Payout setiap Jumat akan tampil setelah komisi masuk payable.' 
            }
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                padding: '28px',
                textAlign: 'center',
                minHeight: '240px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
              }}
            >
              <div style={{ 
                marginBottom: '16px',
                opacity: 0.5
              }}>
                {section.iconComponent}
              </div>
              <h3 style={{
                fontSize: '17px',
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
                marginBottom: '6px',
                fontFamily: 'var(--font-body)',
                fontWeight: '500'
              }}>
                {section.message}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#9CA3AF',
                fontFamily: 'var(--font-body)',
                lineHeight: '1.5'
              }}>
                {section.desc}
              </p>
            </motion.div>
          ))}

          {/* Badge Journey/Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            style={{
              background: 'linear-gradient(135deg, rgba(30, 64, 255, 0.05) 0%, rgba(59, 130, 246, 0.08) 100%)',
              borderRadius: '12px',
              padding: '28px',
              border: '1px solid rgba(30, 64, 255, 0.2)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'all 0.2s',
              minHeight: '240px',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = 'rgba(30, 64, 255, 0.3)';
              el.style.boxShadow = '0 4px 12px rgba(30, 64, 255, 0.12)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = 'rgba(30, 64, 255, 0.2)';
              el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '32px' }}>{currentTier.emoji}</span>
              <div>
                <div style={{
                  fontSize: '11px',
                  color: '#3B82F6',
                  fontWeight: '700',
                  fontFamily: 'var(--font-body)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Current Tier
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1F2937',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {currentTier.name}
                </div>
              </div>
            </div>

            {currentTier.next && (
              <>
                <div style={{
                  fontSize: '13px',
                  color: '#6B7280',
                  marginBottom: '12px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)'
                }}>
                  {referralCount} / {currentTier.next} referrals
                </div>

                {/* Progress Bar */}
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(30, 64, 255, 0.1)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    width: `${Math.min(currentTier.progress, 100)}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #1E40FF 0%, #3B82F6 100%)',
                    borderRadius: '10px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>

                <div style={{
                  fontSize: '12px',
                  color: '#3B82F6',
                  fontWeight: '600',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                  marginBottom: '16px'
                }}>
                  {currentTier.next - referralCount} referral lagi ke tier berikutnya
                </div>
              </>
            )}

            {!currentTier.next && (
              <div style={{
                fontSize: '13px',
                color: '#10B981',
                fontWeight: '600',
                textAlign: 'center',
                fontFamily: 'var(--font-body)',
                marginTop: '12px'
              }}>
                🎉 Tier tertinggi tercapai!
              </div>
            )}

            {/* Tier Badges */}
            <div style={{
              marginTop: 'auto',
              paddingTop: '16px',
              borderTop: '1px solid rgba(30, 64, 255, 0.15)'
            }}>
              <div style={{
                fontSize: '10px',
                color: '#9CA3AF',
                marginBottom: '8px',
                textAlign: 'center',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Semua Tier
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px'
              }}>
                {[
                  { emoji: '🥉', name: 'Bronze', rate: '20%', req: '0' },
                  { emoji: '🥈', name: 'Silver', rate: '25%', req: '30' },
                  { emoji: '🥇', name: 'Gold', rate: '30%', req: '100' },
                  { emoji: '💎', name: 'Platinum', rate: '35%', req: '250' }
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '6px',
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                      fontSize: '9px',
                      fontWeight: '600',
                      color: '#374151',
                      fontFamily: 'var(--font-body)',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px'
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{badge.emoji}</span>
                    <span style={{ fontSize: '10px', fontWeight: '700' }}>{badge.rate}</span>
                    <span style={{ fontSize: '8px', color: '#9CA3AF' }}>{badge.req}+</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 1280px) {
          main {
            padding: 20px 32px;
          }
          div[style*="gridTemplateColumns: 'repeat(5"] {
            grid-template-columns: repeat(3, 1fr);
          }
          div[style*="gridTemplateColumns: 'repeat(4"] {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          main {
            padding: 16px 24px;
          }
          div[style*="gridTemplateColumns: 'repeat(5"] {
            grid-template-columns: repeat(2, 1fr);
          }
          div[style*="gridTemplateColumns: 'repeat(4"] {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
