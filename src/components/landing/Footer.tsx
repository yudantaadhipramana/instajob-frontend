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
        padding: '80px 48px 32px',
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
              gridTemplateColumns: '2.2fr 1fr 1fr 1fr',
              gap: '56px',
              marginBottom: '56px',
            }}
          >
            {/* Brand Column */}
            <div>
              <div style={{ marginBottom: '20px' }}>
                <Logo size={32} showText={true} />
              </div>
              <p
                style={{
                  margin: '20px 0',
                  fontSize: '15px',
                  lineHeight: '1.7',
                  maxWidth: '340px',
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
                  gap: '10px',
                  marginTop: '28px',
                }}
              >
                {[
                  { name: 'WhatsApp', icon: Icons.whatsapp, href: '#' },
                  { name: 'Instagram', icon: Icons.instagramBrand, href: '#' },
                  { name: 'Threads', icon: Icons.threads, href: '#' },
                  { name: 'Twitter', icon: Icons.twitterX, href: '#' },
                  { name: 'TikTok', icon: Icons.tiktok, href: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    style={{
                      width: '40px',
                      height: '40px',
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
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--color-muted)';
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {social.icon(18, 'var(--color-foreground-secondary)')}
                  </a>
                ))}
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4
                style={{
                  color: 'var(--color-foreground)',
                  fontSize: '14px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  margin: '0 0 24px 0',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {t('footer.product')}
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {[
                  { label: t('footer.features'), href: '#fitur' },
                  { label: t('footer.pricing'), href: '#harga' },
                  { label: t('footer.integrations'), href: '#integrasi' },
                  { label: t('footer.demo'), href: '#demo' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        color: 'var(--color-foreground-secondary)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontFamily: 'var(--font-body)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-primary)';
                        e.currentTarget.style.paddingLeft = '4px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-foreground-secondary)';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4
                style={{
                  color: 'var(--color-foreground)',
                  fontSize: '14px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  margin: '0 0 24px 0',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {t('footer.company')}
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {[
                  { label: t('footer.about'), href: '#tentang' },
                  { label: t('footer.blog'), href: '#blog' },
                  { label: t('footer.careers'), href: '#karir' },
                  { label: t('footer.contact'), href: '#kontak' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        color: 'var(--color-foreground-secondary)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontFamily: 'var(--font-body)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-primary)';
                        e.currentTarget.style.paddingLeft = '4px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-foreground-secondary)';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4
                style={{
                  color: 'var(--color-foreground)',
                  fontSize: '14px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  margin: '0 0 24px 0',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {t('footer.legal')}
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {[
                  { label: t('footer.privacy'), href: '#privasi' },
                  { label: t('footer.terms'), href: '#syarat' },
                  { label: t('footer.cookies'), href: '#cookies' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        color: 'var(--color-foreground-secondary)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontFamily: 'var(--font-body)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-primary)';
                        e.currentTarget.style.paddingLeft = '4px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-foreground-secondary)';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              borderTop: '1px solid var(--color-border)',
              paddingTop: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                color: 'var(--color-foreground-secondary)',
                fontFamily: 'var(--font-body)',
              }}
            >
              © {new Date().getFullYear()} InstaJob. All rights reserved.
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                color: 'var(--color-foreground-secondary)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Made with ❤️ in Malang
            </p>
          </div>
        </ScrollAnimation>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          footer {
            padding: 56px 24px 24px;
          }
          div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
