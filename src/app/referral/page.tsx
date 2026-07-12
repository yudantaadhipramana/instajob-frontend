'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Share2, Users, TrendingUp, Award, Gift, Trophy, ExternalLink } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

interface ReferralUser {
  id: string;
  name: string;
  referralsCount: number;
  conversionsCount: number;
  earningsTotal: number;
  rank: number;
}

interface UserStats {
  referralsSent: number;
  conversions: number;
  conversionRate: number;
  earningsTotal: number;
  earningsThisMonth: number;
  currentRank: number;
}

interface Reward {
  tier: string;
  reward: string;
  desc: string;
  icon: string;
  color: string;
  required: number;
  achieved: boolean;
}

export default function ReferralPage() {
  const [referralLink, setReferralLink] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [shareMethod, setShareMethod] = useState<'link' | 'email' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [userStats, setUserStats] = useState<UserStats>({
    referralsSent: 0,
    conversions: 0,
    conversionRate: 0,
    earningsTotal: 0,
    earningsThisMonth: 0,
    currentRank: 0,
  });

  const [topReferrers, setTopReferrers] = useState<ReferralUser[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('instajob_token');
      if (!token) {
        setLoadError('Token tidak ditemukan. Silakan login ulang.');
        setIsLoading(false);
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [codeRes, leaderboardRes, rewardsRes] = await Promise.all([
          fetch(`${API_BASE}/api/referral/my-code`, { headers }),
          fetch(`${API_BASE}/api/referral/leaderboard`, { headers }),
          fetch(`${API_BASE}/api/referral/rewards`, { headers }),
        ]);

        if (codeRes.status === 401 || leaderboardRes.status === 401 || rewardsRes.status === 401) {
          setLoadError('Sesi berakhir. Silakan login ulang.');
          setIsLoading(false);
          return;
        }

        // Parse my-code response
        if (codeRes.ok) {
          const codeData = await codeRes.json();
          const code = codeData.data?.code || codeData.code || '';
          const stats = codeData.data?.stats || codeData.stats || codeData.data || codeData;
          setReferralCode(code);
          setReferralLink(`https://instajob.my.id/ref/${code}`);
          setUserStats({
            referralsSent: stats.referralsSent ?? stats.totalReferrals ?? 0,
            conversions: stats.conversions ?? stats.totalConversions ?? 0,
            conversionRate: stats.conversionRate ?? 0,
            earningsTotal: stats.earningsTotal ?? stats.totalEarnings ?? 0,
            earningsThisMonth: stats.earningsThisMonth ?? stats.monthlyEarnings ?? 0,
            currentRank: stats.currentRank ?? stats.rank ?? 0,
          });
        }

        // Parse leaderboard response
        if (leaderboardRes.ok) {
          const lbData = await leaderboardRes.json();
          const list: ReferralUser[] = (lbData.data || lbData.leaderboard || lbData || []).map((item: any, idx: number) => ({
            id: item.id || String(idx + 1),
            name: item.name || item.fullName || item.userName || 'Pengguna',
            referralsCount: item.referralsCount ?? item.totalReferrals ?? 0,
            conversionsCount: item.conversionsCount ?? item.totalConversions ?? 0,
            earningsTotal: item.earningsTotal ?? item.totalEarnings ?? 0,
            rank: item.rank ?? idx + 1,
          }));
          setTopReferrers(list);
        }

        // Parse rewards response
        if (rewardsRes.ok) {
          const rwData = await rewardsRes.json();
          const list: Reward[] = (rwData.data || rwData.rewards || rwData || []).map((item: any) => ({
            tier: item.tier || item.name || '',
            reward: item.reward || item.rewardDescription || '',
            desc: item.desc || item.description || '',
            icon: item.icon || '🎁',
            color: item.color || '#0051FF',
            required: item.required ?? item.requiredReferrals ?? 0,
            achieved: item.achieved ?? false,
          }));
          setRewards(list);
        }
      } catch (err) {
        setLoadError('Gagal memuat data referral. Periksa koneksi internet.');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink || `https://instajob.my.id/ref/${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (method: 'link' | 'email') => {
    setShareMethod(method);
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
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
        filter: 'blur(120px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <Link href="/dashboard" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: '#64748B', textDecoration: 'none', fontSize: '14px',
          }}>
            <ArrowLeft size={16} />
            Kembali ke Dashboard
          </Link>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1E293B', margin: '0 0 8px 0' }}>
            Program Referral
          </h1>
          <p style={{ fontSize: '15px', color: '#64748B', margin: 0 }}>
            Undang teman dan dapatkan komisi untuk setiap konversi berhasil.
          </p>
        </div>

        {/* Loading/Error Banner */}
        {isLoading && (
          <div style={{
            background: 'rgba(0, 81, 255, 0.05)',
            border: '1px solid rgba(0, 81, 255, 0.2)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            color: '#0051FF',
            fontSize: '14px',
          }}>
            ⏳ Memuat data referral...
          </div>
        )}

        {loadError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            color: '#DC2626',
            fontSize: '14px',
          }}>
            ⚠️ {loadError}
          </div>
        )}

        {/* Referral Link Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #0051FF 0%, #6366F1 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Share2 size={20} color="#FFFFFF" />
            </div>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: '700', margin: 0, color: '#1E293B' }}>Link Referral Kamu</h2>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Bagikan link ini untuk mendapatkan komisi</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              flex: 1,
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '12px 16px',
              fontSize: '14px',
              color: '#1E293B',
              fontFamily: 'monospace',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {referralLink || (isLoading ? 'Memuat...' : 'Tidak tersedia')}
            </div>
            <button
              onClick={handleCopyLink}
              disabled={!referralLink}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 20px',
                fontSize: '14px', fontWeight: '600',
                color: copied ? '#16A34A' : '#0051FF',
                background: copied ? 'rgba(22, 163, 74, 0.1)' : 'rgba(0, 81, 255, 0.08)',
                border: `1px solid ${copied ? 'rgba(22, 163, 74, 0.3)' : 'rgba(0, 81, 255, 0.2)'}`,
                borderRadius: '10px',
                cursor: referralLink ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                opacity: referralLink ? 1 : 0.5,
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Tersalin!' : 'Salin Link'}
            </button>
          </div>

          {referralCode && (
            <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748B' }}>
              Kode referral kamu: <span style={{ fontWeight: '700', color: '#0051FF', fontFamily: 'monospace' }}>{referralCode}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={() => handleShare('link')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 16px', fontSize: '13px', fontWeight: '600',
                color: '#FFFFFF',
                background: shareMethod === 'link' ? '#0040CC' : '#0051FF',
                border: 'none', borderRadius: '8px', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <ExternalLink size={14} />
              Bagikan via WhatsApp
            </button>
            <button
              onClick={() => handleShare('email')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 16px', fontSize: '13px', fontWeight: '600',
                color: '#0051FF',
                background: 'transparent',
                border: '1px solid rgba(0, 81, 255, 0.3)',
                borderRadius: '8px', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Bagikan via Email
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '24px',
        }}>
          {[
            { label: 'Total Referral', value: userStats.referralsSent, icon: <Users size={20} />, color: '#0051FF' },
            { label: 'Konversi', value: userStats.conversions, icon: <TrendingUp size={20} />, color: '#16A34A' },
            { label: 'Tingkat Konversi', value: `${userStats.conversionRate}%`, icon: <Award size={20} />, color: '#F59E0B' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: `${stat.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: stat.color, marginBottom: '12px',
              }}>
                {stat.icon}
              </div>
              <p style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', margin: '0 0 4px 0' }}>
                {isLoading ? '—' : stat.value}
              </p>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Earnings Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          marginBottom: '24px',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0', color: '#1E293B' }}>
            Pendapatan Referral
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 4px 0' }}>Total Pendapatan</p>
              <p style={{ fontSize: '22px', fontWeight: '800', color: '#1E293B', margin: 0 }}>
                {isLoading ? '—' : `Rp ${(userStats.earningsTotal / 1000).toFixed(0)}K`}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 4px 0' }}>Bulan Ini</p>
              <p style={{ fontSize: '22px', fontWeight: '800', color: '#16A34A', margin: 0 }}>
                {isLoading ? '—' : `Rp ${(userStats.earningsThisMonth / 1000).toFixed(0)}K`}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 4px 0' }}>Peringkat Saat Ini</p>
              <p style={{ fontSize: '22px', fontWeight: '800', color: '#F59E0B', margin: 0 }}>
                {isLoading ? '—' : (userStats.currentRank > 0 ? `#${userStats.currentRank}` : '—')}
              </p>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        {rewards.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 2px 12px rgba(0, 81, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            marginBottom: '32px',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 24px 0', color: '#1E293B' }}>
              Reward Program
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {rewards.map((reward, idx) => (
                <div key={idx} style={{
                  padding: '20px',
                  borderRadius: '12px',
                  border: `1px solid ${reward.achieved ? 'rgba(22, 163, 74, 0.3)' : '#E2E8F0'}`,
                  background: reward.achieved ? 'rgba(22, 163, 74, 0.05)' : 'transparent',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      background: `${reward.color}18`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px',
                    }}>
                      {reward.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 4px 0', color: '#1E293B' }}>
                        {reward.tier}
                      </h3>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#0051FF', margin: '0 0 4px 0' }}>
                        {reward.reward}
                      </p>
                      <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                        {reward.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

          {isLoading ? (
            <p style={{ fontSize: '14px', color: '#64748B' }}>Memuat leaderboard...</p>
          ) : topReferrers.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#64748B' }}>Belum ada data leaderboard.</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {topReferrers.map((referrer) => (
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
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '8px',
                  }}>
                    {referrer.rank <= 3 ? (
                      <Trophy size={20} color={referrer.rank === 1 ? '#F59E0B' : referrer.rank === 2 ? '#A1A1A1' : '#CD7F32'} />
                    ) : (
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#64748B' }}>
                        #{referrer.rank}
                      </span>
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '700', margin: 0, color: '#1E293B' }}>
                      {referrer.name}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 2px 0' }}>Referral</p>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', margin: 0 }}>
                      {referrer.referralsCount}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 2px 0' }}>Konversi</p>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#16A34A', margin: 0 }}>
                      {referrer.conversionsCount}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 2px 0' }}>Pendapatan</p>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#0051FF', margin: 0 }}>
                      Rp {(referrer.earningsTotal / 1000000).toFixed(1)}jt
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Bottom */}
        <div style={{
          background: 'linear-gradient(135deg, #0051FF 0%, #6366F1 100%)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          color: '#FFFFFF',
        }}>
          <Gift size={40} style={{ margin: '0 auto 16px', display: 'block' }} />
          <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 12px 0' }}>
            Mulai Hasilkan Komisi Sekarang!
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.8)',
            margin: '0 0 24px 0',
          }}>
            Share your referral link now and start earning rewards today!
          </p>
          <button
            onClick={handleCopyLink}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '700',
              color: '#0051FF',
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <Share2 size={16} />
            Copy & Share Link Now
          </button>
        </div>

      </div>
    </div>
  );
}
