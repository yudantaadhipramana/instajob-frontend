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
        padding: '120px 48px',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)'
      }}
    >
      {/* Background Decoration Removed */}

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
              padding: '8px 24px',
              background: 'var(--color-muted)',
              border: '1px solid var(--color-border)',
              borderRadius: '100px',
              marginBottom: '32px',
              color: 'var(--color-primary)',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-heading)'
            }}
          >
            Mulai Transformasi Karir
          </div>
        </ScrollAnimation>

        {/* Headline */}
        <ScrollAnimation delay={100}>
          <h2
            style={{
              fontSize: '56px',
              fontWeight: '800',
              color: 'var(--color-foreground)',
              margin: '0 0 24px 0',
              lineHeight: '1.15',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.03em',
            }}
          >
            Ubah proses mencari kerja <br/>jadi lebih otomatis dan terukur.
          </h2>
        </ScrollAnimation>

        {/* Subheadline */}
        <ScrollAnimation delay={200}>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--color-foreground-secondary)',
              marginBottom: '48px',
              maxWidth: '640px',
              margin: '0 auto 48px',
              lineHeight: '1.7',
              fontFamily: 'var(--font-body)'
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
              onClick={handleRegister}
              style={{
                padding: '18px 48px',
                background: 'var(--color-primary)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '14px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: 'var(--font-heading)',
                boxShadow: '0 8px 24px rgba(30, 64, 255, 0.25)',
              }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(30, 64, 255, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 64, 255, 0.25)';
            }}
          >
            {t('cta.primaryBtn')}
          </button>
          <button
            style={{
              padding: '14px 32px',
              background: 'transparent',
              color: 'var(--color-foreground)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-muted)';
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'var(--color-border)';
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