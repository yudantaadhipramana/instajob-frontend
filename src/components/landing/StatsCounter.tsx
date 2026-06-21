'use client';

import { ScrollAnimation, AnimatedCounter, HighlightText } from '@/components/Animations';
import Icons from '@/components/Icons';
import { useI18n } from '@/context/I18nContext';

export default function StatsCounter() {
  const { t } = useI18n();
  const stats = [
    { number: 47000, suffix: '+', label: t('stats.applications'), icon: Icons.briefcase(40, '#fff') },
    { number: 8500, suffix: '+', label: t('stats.interviews'), icon: Icons.target(40, '#fff') },
    { number: 73, suffix: '%', label: t('stats.successRate'), icon: Icons.chart(40, '#fff') },
    { number: 150, suffix: '+', label: t('stats.cities'), icon: Icons.city(40, '#fff') },
  ];

  return (
    <section
      style={{
        padding: '100px 48px',
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Glow Effect */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(0,81,255,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <ScrollAnimation delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2
              style={{
                fontSize: '40px',
                fontWeight: '800',
                color: '#FFFFFF',
                margin: '0 0 16px 0',
              }}
            >
              {t('stats.title')}
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#94A3B8',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              {t('stats.subtitle')}
            </p>
          </div>
        </ScrollAnimation>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
          }}
        >
          {stats.map((stat, i) => (
            <ScrollAnimation key={i} delay={i * 100}>
              <div
                style={{
                  padding: '40px 32px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,81,255,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(0,81,255,0.5)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Icon */}
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'rgba(0,81,255,0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>

                {/* Number */}
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    marginBottom: '8px',
                  }}
                >
                  <AnimatedCounter
                    target={stat.number}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>

                {/* Label */}
                <p
                  style={{
                    fontSize: '16px',
                    color: '#94A3B8',
                    margin: 0,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollAnimation delay={400}>
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
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
              {t('stats.cta')}
              {Icons.arrowRight(20, '#fff')}
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
