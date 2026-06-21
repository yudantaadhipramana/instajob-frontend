'use client';

import { ScrollAnimation } from '@/components/Animations';
import Icons from '@/components/Icons';
import { useI18n } from '@/context/I18nContext';

export default function CTASection() {
  const { t } = useI18n();
  return (
    <section
      style={{
        padding: '100px 48px',
        background: 'linear-gradient(135deg, #0051FF 0%, #003AA3 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decoration */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <ScrollAnimation delay={0}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '100px',
              marginBottom: '32px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            <span>⚡</span> FREE untuk selamanya
          </div>
        </ScrollAnimation>

        {/* Headline */}
        <ScrollAnimation delay={100}>
          <h2
            style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#FFFFFF',
              margin: '0 0 24px 0',
              lineHeight: '1.2',
            }}
          >
            {t('cta.title')}
                        </h2>
                    </ScrollAnimation>

                    {/* Subheadline */}
                    <ScrollAnimation delay={200}>
                      <p
                        style={{
                          fontSize: '20px',
                          color: 'rgba(255,255,255,0.9)',
                          marginBottom: '48px',
                          maxWidth: '600px',
                          margin: '0 auto 48px',
                        }}
                      >
                        {t('cta.subtitle')}
                      </p>
                    </ScrollAnimation>

        {/* CTA Buttons */}
        <ScrollAnimation delay={300}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <button
              style={{
                padding: '18px 48px',
                background: '#FFFFFF',
                color: '#0051FF',
                border: 'none',
                borderRadius: '14px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
            >
              <span style={{ fontSize: '24px' }}>🚀</span>
              {t('cta.primaryBtn')}
            </button>
            <button
              style={{
                padding: '14px 32px',
                background: 'transparent',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.5)',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
              }}
            >
              {t('cta.secondaryBtn')}
            </button>
          </div>
        </ScrollAnimation>

        {/* Trust Indicators */}
        <ScrollAnimation delay={400}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: '✓', text: t('cta.trust1') },
              { icon: '✓', text: t('cta.trust2') },
              { icon: '✓', text: t('cta.trust3') },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    background: 'rgba(34,197,94,0.3)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#22C55E',
                    fontWeight: '700',
                    fontSize: '12px',
                  }}
                >
                  {item.icon}
                </span>
                {item.text}
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}