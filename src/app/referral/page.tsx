'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Share2, Users, TrendingUp, Award, Gift, Trophy, ExternalLink } from 'lucide-react';

interface ReferralUser {
  id: string;
  name: string;
  referralsCount: number;
  conversionsCount: number;
  earningsTotal: number;
  rank: number;
}

export default function ReferralPage() {
  const [referralLink, setReferralLink] = useState('https://instajob.my.id/ref/USER123ABC');
  const [copied, setCopied] = useState(false);
  const [shareMethod, setShareMethod] = useState<'link' | 'email' | null>(null);

  // User referral stats
  const userStats = {
    referralsSent: 12,
    conversions: 4,
    conversionRate: 33,
    earningsTotal: 1200000,
    earningsThisMonth: 400000,
    currentRank: 8,
  };

  // Top referrers leaderboard
  const topReferrers: ReferralUser[] = [
    { id: '1', name: 'Ahmad Sudarja', referralsCount: 48, conversionsCount: 24, earningsTotal: 12000000, rank: 1 },
    { id: '2', name: 'Siti Nurhaliza', referralsCount: 35, conversionsCount: 17, earningsTotal: 8500000, rank: 2 },
    { id: '3', name: 'Budi Santoso', referralsCount: 28, conversionsCount: 12, earningsTotal: 6000000, rank: 3 },
    { id: '4', name: 'Dewi Kusuma', referralsCount: 22, conversionsCount: 9, earningsTotal: 4500000, rank: 4 },
    { id: '5', name: 'Rinto Harahap', referralsCount: 18, conversionsCount: 8, earningsTotal: 4000000, rank: 5 },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (method: 'link' | 'email') => {
    setShareMethod(method);
    // Implement share logic here
    setTimeout(() => setShareMethod(null), 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FF 50%, #EEF2FF 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Glow Effects */}
      <div style={{
        position: 'fixed',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        top: '-200px',
        right: '-100px',
        background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(120px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        bottom: '-200px',
        left: '-100px',
        background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(120px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 24px',
      }}>
        {/* Header with Back Link */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
        }}>
          <Link href="/dashboard" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#0051FF',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'color 0.2s',
          }}>
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            margin: 0,
          }}>
            Referral Program
          </h1>
          <div style={{ width: '140px' }} />
        </div>

        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 81, 255, 0.1) 0%, rgba(0, 81, 255, 0.05) 100%)',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '40px',
          border: '1px solid rgba(0, 81, 255, 0.2)',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #0051FF 0%, #003AA3 100%)',
              borderRadius: '12px',
            }}>
              <Gift size={32} color="#FFFFFF" />
            </div>
          </div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '800',
            margin: '0 0 12px 0',
            color: '#1E293B',
          }}>
            Refer Friends & Earn Rewards
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#64748B',
            margin: 0,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Share your unique referral link with friends. When they join and upgrade to premium, you both earn rewards!
          </p>
        </div>

        {/* Referral Link Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            margin: '0 0 20px 0',
            color: '#1E293B',
          }}>
            Your Referral Link
          </h2>
          
          {/* Referral Link Display */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
          }}>
            <input
              type="text"
              readOnly
              value={referralLink}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '14px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                background: '#F8FAFC',
                color: '#0051FF',
                fontWeight: '500',
              }}
            />
            <button onClick={handleCopyLink} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '12px 16px',
              fontSize: '13px',
              fontWeight: '600',
              color: copied ? '#059669' : '#0051FF',
              background: copied ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0, 81, 255, 0.1)',
              border: `1px solid ${copied ? 'rgba(16, 185, 129, 0.3)' : '#0051FF'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              {copied ? (
                <>
                  <Check size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Link
                </>
              )}
            </button>
          </div>

          {/* Share Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}>
            <button onClick={() => handleShare('email')} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#FFFFFF',
              background: '#0051FF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
              <Share2 size={16} />
              Share via Email
            </button>
            <button onClick={() => handleShare('link')} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#0051FF',
              background: 'rgba(0, 81, 255, 0.1)',
              border: '1px solid #0051FF',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
              <ExternalLink size={16} />
              Share Link
            </button>
          </div>
        </div>

        {/* How It Works Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            margin: '0 0 24px 0',
            color: '#1E293B',
          }}>
            How It Works
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}>
            {[
              { step: 1, title: 'Share Link', desc: 'Send your referral link to friends' },
              { step: 2, title: 'Friend Joins', desc: 'They sign up using your link' },
              { step: 3, title: 'Upgrade Plan', desc: 'They upgrade to Premium' },
              { step: 4, title: 'Earn Reward', desc: 'You both get rewards!' },
            ].map((item) => (
              <div key={item.step} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #0051FF 0%, #003AA3 100%)',
                  borderRadius: '50%',
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  marginBottom: '12px',
                }}>
                  {item.step}
                </div>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  margin: '0 0 6px 0',
                  color: '#1E293B',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '12px',
                  color: '#64748B',
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '32px',
        }}>
          {[
            { icon: Users, label: 'Referrals Sent', value: userStats.referralsSent, suffix: '' },
            { icon: TrendingUp, label: 'Conversions', value: userStats.conversions, suffix: `(${userStats.conversionRate}%)` },
            { icon: Award, label: 'Total Earnings', value: `Rp ${(userStats.earningsTotal / 1000000).toFixed(1)}M`, suffix: '' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(0, 81, 255, 0.1)',
                  borderRadius: '8px',
                  marginBottom: '12px',
                }}>
                  <Icon size={20} color="#0051FF" />
                </div>
                <p style={{
                  fontSize: '12px',
                  color: '#64748B',
                  margin: '0 0 8px 0',
                  fontWeight: '500',
                }}>
                  {stat.label}
                </p>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  margin: '0 0 4px 0',
                  color: '#1E293B',
                }}>
                  {typeof stat.value === 'number' ? stat.value : stat.value}
                </h3>
                {stat.suffix && (
                  <p style={{
                    fontSize: '12px',
                    color: '#0051FF',
                    margin: 0,
                    fontWeight: '600',
                  }}>
                    {stat.suffix}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Rewards Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            margin: '0 0 24px 0',
            color: '#1E293B',
          }}>
            Referral Rewards
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}>
            {[
              { tier: 'Friend Joins', reward: 'Free 1-month access', desc: 'For both you and your friend' },
              { tier: 'Friend Upgrades', reward: 'Rp 500.000 commission', desc: 'When they upgrade to Premium' },
              { tier: '5 Conversions', reward: 'Bonus Rp 1.000.000', desc: 'Get 5 friends to upgrade' },
              { tier: '10 Conversions', reward: 'VIP Status', desc: 'Unlock exclusive benefits' },
            ].map((reward, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, rgba(0, 81, 255, 0.05) 0%, rgba(0, 81, 255, 0.02) 100%)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid rgba(0, 81, 255, 0.15)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}>
                  <Gift size={20} color="#0051FF" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <h3 style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      margin: '0 0 4px 0',
                      color: '#1E293B',
                    }}>
                      {reward.tier}
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#0051FF',
                      margin: '0 0 4px 0',
                    }}>
                      {reward.reward}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#64748B',
                      margin: 0,
                    }}>
                      {reward.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            margin: '0 0 24px 0',
            color: '#1E293B',
          }}>
            Top Referrers Leaderboard
          </h2>
          
          <div style={{
            display: 'grid',
            gap: '12px',
          }}>
            {topReferrers.map((referrer, idx) => (
              <div key={referrer.id} style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 1fr 1fr 1fr',
                gap: '16px',
                alignItems: 'center',
                padding: '16px',
                background: referrer.rank <= 3 ? 'rgba(0, 81, 255, 0.05)' : 'transparent',
                borderRadius: '12px',
                border: `1px solid ${referrer.rank <= 3 ? 'rgba(0, 81, 255, 0.2)' : '#E2E8F0'}`,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}>
                  {referrer.rank <= 3 ? (
                    <Trophy size={20} color={referrer.rank === 1 ? '#F59E0B' : referrer.rank === 2 ? '#A1A1A1' : '#CD7F32'} />
                  ) : (
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#64748B',
                    }}>
                      #{referrer.rank}
                    </span>
                  )}
                </div>
                <div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    margin: 0,
                    color: '#1E293B',
                  }}>
                    {referrer.name}
                  </p>
                </div>
                <div style={{
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontSize: '12px',
                    color: '#64748B',
                    margin: '0 0 4px 0',
                  }}>
                    Referrals
                  </p>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '800',
                    margin: 0,
                    color: '#0051FF',
                  }}>
                    {referrer.referralsCount}
                  </p>
                </div>
                <div style={{
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontSize: '12px',
                    color: '#64748B',
                    margin: '0 0 4px 0',
                  }}>
                    Conversions
                  </p>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '800',
                    margin: 0,
                    color: '#059669',
                  }}>
                    {referrer.conversionsCount}
                  </p>
                </div>
                <div style={{
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontSize: '12px',
                    color: '#64748B',
                    margin: '0 0 4px 0',
                  }}>
                    Earnings
                  </p>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '800',
                    margin: 0,
                    color: '#1E293B',
                  }}>
                    Rp {(referrer.earningsTotal / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Your Rank Info */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(0, 81, 255, 0.08) 0%, rgba(0, 81, 255, 0.04) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(0, 81, 255, 0.2)',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: '13px',
              color: '#64748B',
              margin: '0 0 8px 0',
              fontWeight: '500',
            }}>
              Your Current Rank
            </p>
            <p style={{
              fontSize: '18px',
              fontWeight: '800',
              margin: 0,
              color: '#0051FF',
            }}>
              #8 on Leaderboard
            </p>
            <p style={{
              fontSize: '12px',
              color: '#64748B',
              margin: '8px 0 0 0',
            }}>
              Keep referring to climb higher!
            </p>
          </div>
        </div>

        {/* This Month Earnings Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0051FF 0%, #003AA3 100%)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          color: '#FFFFFF',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '13px',
            margin: '0 0 8px 0',
            opacity: 0.9,
            fontWeight: '500',
          }}>
            This Month's Earnings
          </p>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '800',
            margin: '0 0 12px 0',
          }}>
            Rp {(userStats.earningsThisMonth / 1000000).toFixed(2)}M
          </h2>
          <p style={{
            fontSize: '13px',
            margin: 0,
            opacity: 0.9,
          }}>
            {userStats.conversions} conversions this month
          </p>
        </div>

        {/* CTA Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            margin: '0 0 12px 0',
            color: '#1E293B',
          }}>
            Ready to Start Earning?
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#64748B',
            margin: '0 0 24px 0',
          }}>
            Share your referral link now and start earning rewards today!
          </p>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '700',
            color: '#FFFFFF',
            background: '#0051FF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
            <Share2 size={16} />
            Copy & Share Link Now
          </button>
        </div>
      </div>
    </div>
  );
}
