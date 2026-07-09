'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { Logo } from '@/components/Logo';
import ProfileDropdown from '@/components/ProfileDropdown';
import { useRouter } from 'next/navigation';

export default function SubscriptionPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('instajob_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      originalPrice: null,
      period: '',
      description: 'Get started',
      recommended: false,
      features: [
        'AI Job Scouting (max 10)',
        'AI Job Matching',
        'AI Email Auto Apply (max 5/7d)',
        'AI LinkedIn Auto Apply (max 5/7d)',
        'Job Tracking System'
      ]
    },
    {
      id: 'twoweeks',
      name: '2 Weeks',
      price: 120000,
      originalPrice: null,
      period: 'per 2 weeks',
      description: 'Short-term trial',
      recommended: false,
      features: [
        'AI Job Scouting (unlimited)',
        'AI Job Matching (unlimited)',
        'AI Email Auto Apply (unlimited)',
        'AI LinkedIn Auto Apply (unlimited)',
        'Job Tracking System (unlimited)',
        'Telegram Bot Automation',
        'Priority Support',
        'Advanced Analytics'
      ]
    },
    {
      id: 'monthly',
      name: 'Monthly',
      price: 179000,
      originalPrice: 279000,
      period: 'per month',
      description: 'Most popular',
      recommended: true,
      features: [
        'AI Job Scouting (unlimited)',
        'AI Job Matching (unlimited)',
        'AI Email Auto Apply (unlimited)',
        'AI LinkedIn Auto Apply (unlimited)',
        'Job Tracking System (unlimited)',
        'Telegram Bot Automation',
        'Priority Support',
        'Advanced Analytics'
      ]
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      price: 650000,
      originalPrice: 897000,
      period: 'per 3 months',
      description: 'Best value',
      recommended: false,
      features: [
        'AI Job Scouting (unlimited)',
        'AI Job Matching (unlimited)',
        'AI Email Auto Apply (unlimited)',
        'AI LinkedIn Auto Apply (unlimited)',
        'Job Tracking System (unlimited)',
        'Telegram Bot Automation',
        'Priority Support',
        'Advanced Analytics'
      ]
    }
  ];

  const formatPrice = (price) => {
    if (price === 0) return 'Gratis';
    return `Rp ${price.toLocaleString('id-ID')}`;
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
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, rgba(0, 81, 255, 0) 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-300px',
        left: '-300px',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0) 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        zIndex: 0,
      }} />

      {/* Header */}
      <header style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
      }}>
        <Link href="/dashboard" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#0051FF',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '600',
          transition: 'all 0.3s ease',
        }}>
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <Logo />

        <ProfileDropdown />
      </header>

      {/* Main Content */}
      <main style={{ padding: '32px 40px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '900',
            color: '#0F172A',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
          }}>
            Pilih Paket Terbaik Untuk Anda
          </h1>
          <p style={{
            fontSize: '12px',
            color: '#64748B',
            margin: '0',
            fontWeight: '500',
            lineHeight: '1.4',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Mulai gratis atau upgrade ke paket premium untuk akses unlimited.
          </p>
        </div>

        {/* Pricing Cards Container — 4-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '14px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {plans.map((plan) => (
            <div key={plan.id} style={{
              background: plan.recommended 
                ? 'linear-gradient(135deg, #0051FF 0%, #003AA3 100%)' 
                : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              padding: '20px 16px',
              boxShadow: plan.recommended 
                ? '0 20px 50px rgba(0, 81, 255, 0.3)' 
                : '0 2px 12px rgba(0, 81, 255, 0.06)',
              border: plan.recommended 
                ? '2px solid rgba(255, 255, 255, 0.25)' 
                : '1px solid rgba(255, 255, 255, 0.6)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              transform: plan.recommended ? 'scale(1.01)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = plan.recommended ? 'scale(1.03)' : 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = plan.recommended ? 'scale(1.01)' : 'scale(1)';
            }}>
              {plan.recommended && (
                <div style={{
                  position: 'absolute',
                  top: '-11px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#FFFFFF',
                  color: '#0051FF',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '9px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                }}>
                  RECOMMENDED
                </div>
              )}
              <h3 style={{
                fontSize: plan.recommended ? '16px' : '15px',
                fontWeight: '800',
                color: plan.recommended ? '#FFFFFF' : '#0F172A',
                margin: plan.recommended ? '10px 0 3px 0' : '0 0 3px 0',
                letterSpacing: '-0.2px',
              }}>
                {plan.name}
              </h3>
              <p style={{
                fontSize: '10px',
                color: plan.recommended ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                margin: '0 0 10px 0',
                fontWeight: '500',
              }}>
                {plan.description}
              </p>
              <div style={{
                marginBottom: '12px',
                paddingBottom: '12px',
                borderBottom: `1px solid ${plan.recommended ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 81, 255, 0.06)'}`,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                  flexWrap: 'wrap',
                }}>
                  {plan.originalPrice && (
                    <span style={{
                      fontSize: '9px',
                      color: plan.recommended ? 'rgba(255, 255, 255, 0.5)' : '#94A3B8',
                      textDecoration: 'line-through',
                      fontWeight: '600',
                    }}>
                      {formatPrice(plan.originalPrice)}
                    </span>
                  )}
                  <span style={{
                    fontSize: plan.recommended ? '18px' : '16px',
                    fontWeight: '900',
                    color: plan.recommended ? '#FFFFFF' : '#0051FF',
                    letterSpacing: '-0.4px',
                  }}>
                    {formatPrice(plan.price)}
                  </span>
                </div>
                {plan.period && (
                  <p style={{
                    fontSize: '9px',
                    color: plan.recommended ? 'rgba(255, 255, 255, 0.65)' : '#64748B',
                    margin: '3px 0 0 0',
                    fontWeight: '500',
                  }}>
                    {plan.period}
                  </p>
                )}
              </div>
              <div style={{ marginBottom: '8px' }}>
                {plan.features.map((feature, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '5px',
                    marginBottom: '5px',
                    paddingBottom: '5px',
                    borderBottom: idx !== plan.features.length - 1 
                      ? `1px solid ${plan.recommended ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 81, 255, 0.04)'}` 
                      : 'none',
                  }}>
                    <Check size={11} color={plan.recommended ? '#34D399' : '#10B981'} strokeWidth={3} style={{ marginTop: '0.5px', flexShrink: 0 }} />
                    <span style={{
                      fontSize: '9px',
                      fontWeight: '500',
                      color: plan.recommended ? '#FFFFFF' : '#1E293B',
                      lineHeight: '1.2',
                    }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              <button onClick={handleUpgrade} disabled={isProcessing} style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '10px',
                fontWeight: '700',
                color: plan.recommended ? '#0051FF' : '#FFFFFF',
                background: plan.recommended ? '#FFFFFF' : '#0051FF',
                border: 'none',
                borderRadius: '6px',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: isProcessing ? 0.9 : 1,
                letterSpacing: '-0.15px',
                marginTop: '12px',
              }}
              onMouseEnter={(e) => !isProcessing && (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => !isProcessing && (e.currentTarget.style.opacity = '1')}>
                {isProcessing ? 'Processing...' : plan.id === 'free' ? 'Get Started' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
