'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import Icons from '@/components/Icons';

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'quarterly'>('monthly');

  const plans = billingPeriod === 'monthly' ? [
    {
      name: 'Pro',
      price: 179000,
      originalPrice: 279000,
      period: '/bulan',
      description: 'Otomatisasi lamaran standar',
      features: [
        'AI Job Scouting',
        'AI Matching Algorithm',
        'AI Email Auto Apply',
        'AI LinkedIn Auto Apply',
        'Job Tracking System',
        'Telegram Bot Notification',
      ],
      cta: 'Mulai Sekarang',
      highlighted: false,
    },
    {
      name: 'Premium',
      price: 239000,
      originalPrice: 350000,
      period: '/bulan',
      description: 'Termasuk optimasi profil & CV',
      features: [
        'Semua fitur di paket Pro',
        '3x token LinkedIn Auto Apply',
        'Kelas CV Booster + Template',
        'Kelas Portfolio Booster',
        'Priority Support 24/7',
      ],
      cta: 'Mulai Premium',
      highlighted: true,
    },
  ] : [
    {
      name: 'Pro',
      price: 499000,
      originalPrice: 837000,
      period: '/3 bulan',
      description: 'Otomatisasi lamaran standar',
      features: [
        'AI Job Scouting',
        'AI Matching Algorithm',
        'AI Email Auto Apply',
        'AI LinkedIn Auto Apply',
        'Job Tracking System',
        'Telegram Bot Notification',
      ],
      cta: 'Mulai Sekarang',
      highlighted: false,
    },
    {
      name: 'Premium',
      price: 650000,
      originalPrice: 1050000,
      period: '/3 bulan',
      description: 'Termasuk optimasi profil & CV',
      features: [
        'Semua fitur di paket Pro',
        '3x token LinkedIn Auto Apply',
        'Kelas CV Booster + Template',
        'Kelas Portfolio Booster',
        'Priority Support 24/7',
      ],
      cta: 'Mulai Premium',
      highlighted: true,
    },
  ];

  return (
    <section
      id="harga"
      style={{
        padding: '100px 48px',
        background: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <p
            style={{
              fontSize: '14px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-primary)',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-heading)',
            }}
          >
            HARGA
          </p>
          <h2
            style={{
              fontSize: '40px',
              fontWeight: '800',
              color: 'var(--color-foreground)',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Mulai dari{' '}
            <span style={{ color: 'var(--color-primary)' }}>Rp 6.000/hari</span>
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#64748B',
              maxWidth: '600px',
              margin: '0 auto 32px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Investasi kecil untuk peluang karir yang lebih besar. Tanpa kartu kredit.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '48px',
            gap: '12px',
          }}
        >
          <button
            onClick={() => setBillingPeriod('monthly')}
            style={{
              padding: '10px 24px',
              background: billingPeriod === 'monthly' ? 'var(--color-primary)' : 'var(--color-muted)',
              color: billingPeriod === 'monthly' ? '#fff' : 'var(--color-foreground)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-body)',
            }}
          >
            Bulanan
          </button>
          <button
            onClick={() => setBillingPeriod('quarterly')}
            style={{
              padding: '10px 24px',
              background: billingPeriod === 'quarterly' ? 'var(--color-primary)' : 'var(--color-muted)',
              color: billingPeriod === 'quarterly' ? '#fff' : 'var(--color-foreground)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-body)',
              position: 'relative',
            }}
          >
            3 Bulanan
            {billingPeriod === 'quarterly' && (
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'var(--color-accent)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                Hemat 15%
              </span>
            )}
          </button>
        </motion.div>

        {/* Pricing Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '40px',
                background: plan.highlighted ? 'var(--color-primary)' : '#FFFFFF',
                borderRadius: '24px',
                border: plan.highlighted ? 'none' : '1px solid var(--color-border)',
                boxShadow: plan.highlighted
                  ? '0 20px 60px rgba(30, 64, 255, 0.2)'
                  : '0 4px 20px rgba(0,0,0,0.05)',
                position: 'relative',
                transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {plan.highlighted && (
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'var(--color-accent)',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: '700',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  POPULER
                </div>
              )}

              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  color: plan.highlighted ? '#fff' : 'var(--color-foreground)',
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {plan.name}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: plan.highlighted ? 'rgba(255,255,255,0.8)' : '#64748B',
                  margin: '0 0 24px 0',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {plan.description}
              </p>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: plan.highlighted ? 'rgba(255,255,255,0.6)' : '#94A3B8',
                      textDecoration: 'line-through',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Rp {plan.originalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '48px',
                    fontWeight: '800',
                    color: plan.highlighted ? '#fff' : 'var(--color-foreground)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {`Rp ${plan.price.toLocaleString('id-ID')}`}
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    color: plan.highlighted ? 'rgba(255,255,255,0.8)' : '#64748B',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {plan.period}
                </span>
              </div>

              <button
                onClick={() => (window.location.href = '/register')}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: plan.highlighted ? '#fff' : 'var(--color-primary)',
                  color: plan.highlighted ? 'var(--color-primary)' : '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginBottom: '32px',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {plan.cta}
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {plan.features.map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {Icons.check(16, plan.highlighted ? '#fff' : 'var(--color-accent)')}
                    <span
                      style={{
                        fontSize: '14px',
                        color: plan.highlighted ? 'rgba(255,255,255,0.9)' : 'var(--color-foreground)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
