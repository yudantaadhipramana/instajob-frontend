'use client';

import { ScrollAnimation } from '@/components/Animations';
import Icons from '@/components/Icons';
import { useI18n } from '@/context/I18nContext';

export default function FeaturesSection() {
  const { t } = useI18n();
  const features = [
    {
      icon: Icons.jobMatch(32, '#0051FF'),
      title: t('features.ai_job.title'),
      description: t('features.ai_job.desc'),
      color: '#0051FF',
    },
    {
      icon: Icons.coverLetter(32, '#7C3AED'),
      title: t('features.cover.title'),
      description: t('features.cover.desc'),
      color: '#7C3AED',
    },
    {
      icon: Icons.autoApply(32, '#22C55E'),
      title: t('features.apply.title'),
      description: t('features.apply.desc'),
      color: '#22C55E',
    },
    {
      icon: Icons.tracking(32, '#0051FF'),
      title: t('features.tracking.title'),
      description: t('features.tracking.desc'),
      color: '#0051FF',
    },
    {
      icon: Icons.telegram(32, '#FFB800'),
      title: t('features.telegram.title'),
      description: t('features.telegram.desc'),
      color: '#FFB800',
    },
    {
      icon: Icons.analytics(32, '#1E293B'),
      title: t('features.analytics.title'),
      description: t('features.analytics.desc'),
      color: '#1E293B',
    },
  ];

  return (
    <section
      style={{
        padding: '100px 48px',
        background: '#FFFFFF',
        position: 'relative',
      }}
    >
      {/* Background Decoration */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-200px',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,81,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
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
              FITUR UNGGULAN
            </p>
            <h2
              style={{
                fontSize: '40px',
                fontWeight: '800',
                color: '#1E293B',
                margin: '0 0 16px 0',
              }}
            >
              {t('features.title')}
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#64748B',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              {t('features.subtitle')}
            </p>
          </div>
        </ScrollAnimation>

        {/* Features Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {features.map((feature, i) => (
            <ScrollAnimation key={i} delay={i * 100}>
              <div
                style={{
                  padding: '40px 32px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${feature.color}15`;
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    background: `${feature.color}10`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    position: 'relative',
                  }}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1E293B',
                    margin: '0 0 12px 0',
                    position: 'relative',
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '15px',
                    color: '#64748B',
                    margin: 0,
                    lineHeight: '1.7',
                    position: 'relative',
                  }}
                >
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div
                  style={{
                    marginTop: '24px',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: feature.color,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Pelajari Lebih Lanjut {Icons.arrowRight(16, feature.color)}
                  </span>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
