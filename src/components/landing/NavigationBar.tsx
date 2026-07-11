'use client';

import { useI18n } from '@/context/I18nContext';
import { Logo } from './Logo';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NavigationBar() {
  const { t, lang, setLang } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  const handleRegister = useCallback(() => {
    router.push('/register');
  }, [router]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  // Scrollspy - detect active section in viewport
  useEffect(() => {
    const sections = ['cara-kerja', 'fitur', 'harga', 'affiliate', 'faq'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { label: t('nav.howItWorks'), id: 'cara-kerja' },
    { label: t('nav.features'), id: 'fitur' },
    { label: t('nav.pricing'), id: 'harga' },
    { label: t('nav.affiliate'), id: 'affiliate' },
    { label: t('nav.faq'), id: 'faq' },
  ];

  return (
    <nav
      className="nav-wrapper"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '16px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px',
      }}
    >
      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <img 
          src="/logo-instajob.png" 
          alt="InstaJob Logo" 
          style={{ height: '48px', width: 'auto' }}
        />
      </a>

      {/* Desktop Menu - Nav Links */}
      <div className="nav-desktop-links" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                background: isActive ? 'var(--color-primary)' : 'transparent',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                color: isActive ? '#fff' : 'var(--color-foreground)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-body)',
                padding: '8px 16px',
                borderRadius: '999px',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--color-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--color-foreground)';
                }
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right: Language + Auth (Desktop) */}
      <div className="nav-desktop-actions" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {/* Language Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px',
            background: 'var(--color-muted)',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
          }}
        >
          <button
            onClick={() => setLang('id')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '700',
              background: lang === 'id' ? 'var(--color-primary)' : 'transparent',
              color: lang === 'id' ? '#fff' : '#64748B',
              transition: 'all 0.2s ease',
            }}
          >
            ID
          </button>
          <button
            onClick={() => setLang('en')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '700',
              background: lang === 'en' ? 'var(--color-primary)' : 'transparent',
              color: lang === 'en' ? '#fff' : '#64748B',
              transition: 'all 0.2s ease',
            }}
          >
            EN
          </button>
        </div>

        {/* Auth Buttons */}
        <button
          onClick={handleLogin}
          style={{
            padding: '10px 24px',
            background: 'transparent',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-primary)',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: '0.2s',
            fontFamily: 'var(--font-body)',
          }}
        >
          {t('nav.login')}
        </button>
        <button
          onClick={handleRegister}
          style={{
            padding: '10px 24px',
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: '0.2s',
            fontFamily: 'var(--font-body)',
          }}
        >
          {t('nav.signup')}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="nav-mobile-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
        style={{
          display: 'none',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {mobileMenuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            borderBottom: '1px solid var(--color-border)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 20px 24px',
            gap: '4px',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: isActive ? 'var(--color-primary)' : 'transparent',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: isActive ? '#fff' : 'var(--color-foreground)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {item.label}
              </button>
            );
          })}
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button
              onClick={handleLogin}
              style={{
                flex: 1,
                padding: '12px 16px',
                background: 'transparent',
                color: 'var(--color-primary)',
                border: '1px solid var(--color-primary)',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              {t('nav.login')}
            </button>
            <button
              onClick={handleRegister}
              style={{
                flex: 1,
                padding: '12px 16px',
                background: 'var(--color-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              {t('nav.signup')}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-mobile-btn {
          display: none;
        }
        @media (max-width: 1024px) {
          .nav-mobile-btn {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
