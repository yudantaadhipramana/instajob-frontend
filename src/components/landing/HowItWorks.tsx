'use client';

import { ScrollAnimation, HighlightText } from '@/components/Animations';
import Icons from '@/components/Icons';
import { useI18n } from '@/context/I18nContext';

export default function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    {
      number: '01',
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.desc'),
      icon: Icons.profile(32, '#FF6B6B'),
      color: '#FF6B6B',
    },
    {
      number: '02',
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.desc'),
      icon: Icons.analysis(32, '#0051FF'),
      color: '#0051FF',
    },
    {
      number: '03',
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.desc'),
      icon: Icons.autoApply(32, '#FFB800'),
      color: '#FFB800',
    },
    {
      number: '04',
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.desc'),
      icon: Icons.tracking(32, '#22C55E'),
      color: '#22C55E',
    },
  ];

  return (
    <section
      style={{
        padding: '80px 48px',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <ScrollAnimation delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p
              style={{
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#0051FF',
                margin: '0 0 16px 0',
              }}
            >
              {t('howItWorks.badge')}
            </p>
            <h2
              style={{
                fontSize: '40px',
                fontWeight: '800',
                color: '#1E293B',
                margin: '0 0 16px 0',
              }}
            >
              {t('howItWorks.title')}
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#64748B',
                maxWidth: '600px',
                margin: '16px auto 0',
              }}
            >
              {t('howItWorks.subtitle')}
            </p>
          </div>
        </ScrollAnimation>

        {/* Steps Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          {steps.map((step, i) => (
            <ScrollAnimation key={i} delay={i * 100}>
              <div
                style={{
                  position: 'relative',
                  padding: '32px 24px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,81,255,0.15)`;
                  e.currentTarget.style.borderColor = step.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                {/* Number Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '24px',
                    width: '48px',
                    height: '48px',
                    background: step.color,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
                  }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  style={{
                    marginBottom: '16px',
                    marginTop: '16px',
                  }}
                >
                  {step.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1E293B',
                    margin: '0 0 12px 0',
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '14px',
                    color: '#64748B',
                    margin: 0,
                    lineHeight: '1.6',
                  }}
                >
                  {step.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollAnimation delay={400}>
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                fontSize: '16px',
                color: '#64748B',
                marginBottom: '24px',
              }}
            >
              {t('howItWorks.cta.title')}
            </p>
            <button
              style={{
                padding: '14px 36px',
                background: '#0051FF',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,81,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {t('howItWorks.cta.button')}
              {Icons.arrowRight(20, '#fff')}
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
