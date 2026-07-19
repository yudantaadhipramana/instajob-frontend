'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import Icons from '@/components/Icons';
import { useI18n } from '@/context/I18nContext';
import { Logo } from '@/components/Logo';
import ProfileDropdown from '@/components/ProfileDropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function SubscriptionPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'quarterly'>('monthly');

  const plans = billingPeriod === 'monthly' ? [
    {
      key: 'pro',
      name: t('pricing.plan.pro.name'),
      price: 179000,
      originalPrice: 279000,
      period: t('pricing.period.monthly'),
      description: t('pricing.plan.pro.desc'),
      features: [
        t('pricing.feat.scouting'),
        t('pricing.feat.matching'),
        t('pricing.feat.email'),
        t('pricing.feat.linkedin'),
        t('pricing.feat.tracking'),
        t('pricing.feat.telegram'),
      ],
      cta: t('pricing.cta.start'),
      highlighted: false,
    },
    {
      key: 'premium',
      name: t('pricing.plan.premium.name'),
      price: 239000,
      originalPrice: 350000,
      period: t('pricing.period.monthly'),
      description: t('pricing.plan.premium.desc'),
      features: [
        t('pricing.feat.all_pro'),
        t('pricing.feat.token_linkedin'),
        t('pricing.feat.token_career'),
        t('pricing.feat.cv'),
        t('pricing.feat.portfolio'),
        t('pricing.feat.support'),
      ],
      cta: t('pricing.cta.premium'),
      highlighted: true,
    },
  ] : [
    {
      key: 'pro',
      name: t('pricing.plan.pro.name'),
      price: 499000,
      originalPrice: 837000,
      period: t('pricing.period.quarterly'),
      description: t('pricing.plan.pro.desc'),
      features: [
        t('pricing.feat.scouting'),
        t('pricing.feat.matching'),
        t('pricing.feat.email'),
        t('pricing.feat.linkedin'),
        t('pricing.feat.tracking'),
        t('pricing.feat.telegram'),
      ],
      cta: t('pricing.cta.start'),
      highlighted: false,
    },
    {
      key: 'premium',
      name: t('pricing.plan.premium.name'),
      price: 650000,
      originalPrice: 1050000,
      period: t('pricing.period.quarterly'),
      description: t('pricing.plan.premium.desc'),
      features: [
        t('pricing.feat.all_pro'),
        t('pricing.feat.token_linkedin'),
        t('pricing.feat.token_career'),
        t('pricing.feat.cv'),
        t('pricing.feat.portfolio'),
        t('pricing.feat.support'),
      ],
      cta: t('pricing.cta.premium'),
      highlighted: true,
    },
  ];

  const handleSelectPlan = (planKey: string) => {
    router.push(`/checkout?plan=${planKey}&period=${billingPeriod}`);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC', overflow: 'hidden' }}>
      {/* Header */}
      <header style={{
        padding: '0 40px',
        height: '60px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--color-border)',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: '600', fontSize: '13px', textDecoration: 'none' }}>
          <ArrowLeft size={15} />
          {t('nav.dashboard')}
        </Link>
        <Logo size={28} showText={true} />
        <ProfileDropdown />
      </header>

      {/* Main — fill remaining height, no scroll */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px 40px 20px', minHeight: 0 }}>
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: '16px' }}
        >
          <p style={{
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--color-primary)',
            margin: '0 0 6px',
            fontFamily: 'var(--font-heading)',
          }}>
            {t('pricing.badge')}
          </p>
          <h1 style={{
            fontSize: '26px',
            fontWeight: '800',
            color: 'var(--color-foreground)',
            margin: '0 0 6px',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em',
          }}>
            {t('pricing.page.title')}
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#64748B',
            margin: 0,
            fontFamily: 'var(--font-body)',
          }}>
            {t('pricing.page.subtitle')}
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{
            display: 'inline-flex',
            background: '#F1F5F9',
            borderRadius: '10px',
            padding: '4px',
            gap: '4px',
            border: '1px solid var(--color-border)',
          }}>
            {(['monthly', 'quarterly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setBillingPeriod(period)}
                style={{
                  padding: '7px 20px',
                  borderRadius: '7px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '700',
                  fontFamily: 'var(--font-body)',
                  background: billingPeriod === period ? '#fff' : 'transparent',
                  color: billingPeriod === period ? 'var(--color-primary)' : '#64748B',
                  boxShadow: billingPeriod === period ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {period === 'monthly' ? t('pricing.toggle.monthly') : t('pricing.toggle.quarterly')}
                {period === 'quarterly' && (
                  <span style={{
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '1px 6px',
                    borderRadius: '4px',
                  }}>
                    {t('pricing.toggle.save')}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          maxWidth: '760px',
          margin: '0 auto',
          width: '100%',
        }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                position: 'relative',
                background: plan.highlighted
                  ? 'linear-gradient(135deg, #1E3A8A 0%, #1E40FF 55%, #3B82F6 100%)'
                  : '#FFFFFF',
                borderRadius: '16px',
                border: plan.highlighted ? 'none' : '1.5px solid var(--color-border)',
                padding: '20px 22px',
                boxShadow: plan.highlighted
                  ? '0 12px 40px rgba(30,64,255,0.25)'
                  : '0 2px 12px rgba(15,23,42,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {plan.highlighted && (
                <div style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '18px',
                  background: 'var(--color-accent)',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: '0 0 8px 8px',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.05em',
                }}>
                  {t('pricing.badge.popular')}
                </div>
              )}

              {/* Plan name + desc */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  color: plan.highlighted ? '#fff' : 'var(--color-foreground)',
                  margin: '0 0 3px',
                  fontFamily: 'var(--font-heading)',
                }}>
                  {plan.name}
                </h3>
                <p style={{
                  fontSize: '12px',
                  color: plan.highlighted ? 'rgba(255,255,255,0.7)' : '#64748B',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: plan.highlighted ? '#fff' : 'var(--color-primary)',
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1,
                }}>
                  Rp {plan.price.toLocaleString('id-ID')}
                </span>
                <span style={{
                  fontSize: '12px',
                  color: plan.highlighted ? 'rgba(255,255,255,0.6)' : '#94A3B8',
                  fontFamily: 'var(--font-body)',
                }}>
                  {plan.period}
                </span>
                <span style={{
                  fontSize: '11px',
                  color: plan.highlighted ? 'rgba(255,255,255,0.45)' : '#CBD5E1',
                  textDecoration: 'line-through',
                  fontFamily: 'var(--font-body)',
                }}>
                  Rp {plan.originalPrice.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', flex: 1 }}>
                {plan.features.map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {Icons.check(13, plan.highlighted ? '#fff' : 'var(--color-accent)')}
                    <span style={{
                      fontSize: '12px',
                      color: plan.highlighted ? 'rgba(255,255,255,0.88)' : 'var(--color-foreground)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: '600',
                    }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => handleSelectPlan(plan.key)}
                style={{
                  width: '100%',
                  padding: '11px',
                  background: plan.highlighted ? '#fff' : 'var(--color-primary)',
                  color: plan.highlighted ? 'var(--color-primary)' : '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '14px' }}>
          {[
            { icon: '🔒', text: t('cta.trust1') },
            { icon: '⚡', text: t('cta.trust2') },
            { icon: '↩️', text: t('cta.trust3') },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-body)', fontWeight: '600' }}>
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
