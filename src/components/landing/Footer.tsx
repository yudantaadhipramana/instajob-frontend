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
        background: '#0F172A',
        color: '#94A3B8',
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
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.1)',
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
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    }}
                  >
                    {social.icon(16, '#CBD5E1')}
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
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: '700',
                    margin: '0 0 24px 0',
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
                          color: '#94A3B8',
                          textDecoration: 'none',
                          fontSize: '14px',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--color-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#94A3B8';
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
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p style={{ margin: 0, fontSize: '14px' }}>
              © 2026 InstaJob. Hak cipta dilindungi.
            </p>
            <p style={{ margin: 0, fontSize: '14px' }}>
              Dibuat dengan ❤️ di Jakarta, Indonesia
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </footer>
  );
}
