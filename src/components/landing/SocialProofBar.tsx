'use client';

import { ScrollAnimation } from '@/components/Animations';
import { useI18n } from '@/context/I18nContext';

export default function SocialProofBar() {
  const { t } = useI18n();
  // Curated list of top companies in Indonesia & Global Tech Giants
  const companies = [
    { name: 'Google', domain: 'google.com' },
    { name: 'Microsoft', domain: 'microsoft.com' },
    { name: 'Apple', domain: 'apple.com' },
    { name: 'Amazon', domain: 'amazon.com' },
    { name: 'Netflix', domain: 'netflix.com' },
    { name: 'Shopee', domain: 'shopee.co.id' },
    { name: 'Tokopedia', domain: 'tokopedia.com' },
    { name: 'Gojek', domain: 'gojek.com' },
    { name: 'Grab', domain: 'grab.com' },
    { name: 'Bukalapak', domain: 'bukalapak.com' },
    { name: 'BCA', domain: 'bca.co.id' },
    { name: 'Mandiri', domain: 'bankmandiri.co.id' },
    { name: 'BRI', domain: 'bri.co.id' },
    { name: 'Telkom', domain: 'telkom.co.id' },
    { name: 'Blibli', domain: 'blibli.com' },
    { name: 'Tiket', domain: 'tiket.com' },
  ];

  const row1 = companies.slice(0, 8);
  const row2 = companies.slice(8, 16);

  // Get logo URL from Google Favicon API
  const getLogoUrl = (domain: string) => 
    `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <section
      style={{
        padding: '60px 48px',
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        overflow: 'hidden',
      }}
    >
      <ScrollAnimation delay={0}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#1E293B',
              margin: '0 0 8px 0',
            }}
          >
            {t('social.title')}
          </p>
          <p
            style={{
              fontSize: '15px',
              color: '#64748B',
              marginTop: '8px',
            }}
          >
            {t('social.subtitle')}
          </p>
        </div>
      </ScrollAnimation>

      {/* Running Text Animation Container */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        {/* ROW 1 - LTR */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            marginBottom: '32px',
            animation: 'scrollLeft 45s linear infinite',
            width: 'max-content',
          }}
        >
          {[...row1, ...row1, ...row1].map((company, i) => (
            <div
              key={`row1-${i}`}
              style={{
                minWidth: '140px',
                height: '80px',
                padding: '0 24px',
                background: '#F8FAFC',
                border: '2px solid #E2E8F0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = '#0051FF';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,81,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
              }}
            >
              <img
                src={getLogoUrl(company.domain)}
                alt={company.name}
                style={{
                  width: '48px',
                  height: '48px',
                  objectFit: 'contain',
                  opacity: 0.85,
                  transition: 'all 0.3s ease',
                  filter: 'grayscale(100%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%)';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(100%)';
                  e.currentTarget.style.opacity = '0.85';
                }}
              />
            </div>
          ))}
        </div>

        {/* ROW 2 - RTL (Reverse) */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            animation: 'scrollRight 45s linear infinite',
            width: 'max-content',
          }}
        >
          {[...row2, ...row2, ...row2].map((company, i) => (
            <div
              key={`row2-${i}`}
              style={{
                minWidth: '140px',
                height: '80px',
                padding: '0 24px',
                background: '#F8FAFC',
                border: '2px solid #E2E8F0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = '#0051FF';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,81,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
              }}
            >
              <img
                src={getLogoUrl(company.domain)}
                alt={company.name}
                style={{
                  width: '48px',
                  height: '48px',
                  objectFit: 'contain',
                  opacity: 0.85,
                  transition: 'all 0.3s ease',
                  filter: 'grayscale(100%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%)';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(100%)';
                  e.currentTarget.style.opacity = '0.85';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <p
        style={{
          textAlign: 'center',
          marginTop: '48px',
          fontSize: '14px',
          color: '#64748B',
        }}
      >
        {t('hero.source')}
      </p>
    </section>
  );
}
