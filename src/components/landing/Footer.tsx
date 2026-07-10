'use client';

import { Logo } from '@/components/Logo';
import { ScrollAnimation } from '@/components/Animations';
import { useI18n } from '@/context/I18nContext';
import Icons from '@/components/Icons';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer
      style={{
        padding: '80px 48px 40px',
        background: '#FFFFFF',
        color: 'var(--color-foreground-secondary)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ScrollAnimation delay={0}>
          {/* Footer Content */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '48px',
              marginBottom: '64px',
            }}
          >
            {/* Brand Column */}
            <div>
              <div style={{ marginBottom: '16px' }}>
                <Logo size={28} showText={true} />
              </div>
              <p
                style={{
                  margin: '16px 0',
                  fontSize: '14px',
                  lineHeight: '1.7',
                  maxWidth: '320px',
                  color: 'var(--color-foreground-secondary)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {t('footer.description')}
              </p>
              {/* Social Links */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '24px',
                }}
              >
                {[
                  { name: 'Twitter', icon: Icons.twitterX },
                  { name: 'LinkedIn', icon: Icons.linkedinBrand },
                  { name: 'Instagram', icon: Icons.instagramBrand },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    aria-label={social.name}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'var(--color-muted)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-primary)';
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--color-muted)';
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                    }}
                  >
                    {social.icon(16, 'var(--color-foreground-secondary)')}
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {[
              {
                title: t('footer.product'),
                links: [t('footer.features'), t('footer.pricing'), t('footer.integrations'), t('footer.demo')],
              },
              {
                title: t('footer.company'),
                links: [t('footer.about'), t('footer.blog'), t('footer.careers'), t('footer.contact')],
              },
              {
                title: t('footer.legal'),
                links: [t('footer.privacy'), t('footer.terms'), t('footer.cookies')],
              },
            ].map((column) => (
              <div key={column.title}>
                <h4
                  style={{
                    color: 'var(--color-foreground)',
                    fontSize: '13px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    margin: '0 0 24px 0',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {column.title}
                </h4>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        style={{
                          color: 'var(--color-foreground-secondary)',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontFamily: 'var(--font-body)',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--color-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--color-foreground-secondary)';
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div
            style={{
              paddingTop: '32px',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-foreground-tertiary)', fontFamily: 'var(--font-body)' }}>
              © 2026 InstaJob. Hak cipta dilindungi.
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-foreground-tertiary)', fontFamily: 'var(--font-body)' }}>
              Dibuat dengan ❤️ di Jakarta, Indonesia
            </p>
          </div>
        </ScrollAnimation>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          footer > div > div:last-of-type {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
