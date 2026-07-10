'use client';

import { ScrollAnimation } from '@/components/Animations';
import Icons from '@/components/Icons';
import { useI18n } from '@/context/I18nContext';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function CTASection() {
  const { t } = useI18n();
  const router = useRouter();

  const handleRegister = useCallback(() => {
    router.push('/register');
  }, [router]);

  return (
    <section
      style={{
        padding: '80px 24px',
        background: '#FFFFFF',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ScrollAnimation delay={0}>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '32px',
              padding: '80px 64px',
              background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40FF 55%, #3B82F6 100%)',
              textAlign: 'center',
              boxShadow: '0 30px 80px rgba(30, 64, 255, 0.35)',
            }}
          >
            {/* Decorative glow orbs */}
            <div
              style={{
                position: 'absolute',
                top: '-120px',
                right: '-80px',
                width: '360px',
                height: '360px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-140px',
                left: '-100px',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto' }}>
              {/* Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  background: 'rgba(255, 255, 255, 0.14)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '100px',
                  marginBottom: '32px',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {Icons.zap(16, '#FFFFFF')}
                {t('cta.badge')}
              </div>

              {/* Headline */}
              <h2
                style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  margin: '0 0 20px 0',
                  lineHeight: '1.15',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.02em',
                }}
              >
                {t('cta.headline')}
              </h2>

              {/* Subheadline */}
              <p
                style={{
                  fontSize: '18px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '40px',
                  maxWidth: '560px',
                  margin: '0 auto 40px',
                  lineHeight: '1.7',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {t('cta.subtitle')}
              </p>

              {/* CTA Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '16px',
                  marginBottom: '40px',
                }}
              >
                <button
                  onClick={handleRegister}
                  style={{
                    padding: '16px 40px',
                    background: '#FFFFFF',
                    color: '#1E40FF',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontFamily: 'var(--font-heading)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.24)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.18)';
                  }}
                >
                  {t('cta.primaryBtn')}
                  {Icons.arrowRight(18, '#1E40FF')}
                </button>
                <button
                  style={{
                    padding: '16px 32px',
                    background: 'transparent',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                  }}
                >
                  {t('cta.secondaryBtn')}
                </button>
              </div>

              {/* Trust Indicators */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '28px',
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { text: t('cta.trust1') },
                  { text: t('cta.trust2') },
                  { text: t('cta.trust3') },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontSize: '14px',
                      fontWeight: '500',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {Icons.check(14, '#FFFFFF')}
                    </span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding: 48px 16px;
          }
          div :global(h2) {
            font-size: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
