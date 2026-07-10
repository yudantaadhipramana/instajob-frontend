'use client';

import { useI18n } from '@/context/I18nContext';
import { Logo } from './Logo';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function NavigationBar() {
  const { t, lang, setLang } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  };

  return (
    <nav
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
        <Logo size={32} showText={true} />
      </a>

      {/* Desktop Menu - Nav Links */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {[
          { label: 'Cara Kerja', id: 'cara-kerja' },
          { label: 'Fitur', id: 'fitur' },
          { label: 'Harga', id: 'harga' },
          { label: 'Affiliate', id: 'affiliate' },
          { label: 'FAQ', id: 'faq' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '15px',
              fontWeight: '600',
              color: 'var(--color-foreground)',
              cursor: 'pointer',
              transition: 'color 0.2s',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-foreground)';
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right: Language + Auth */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
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
    </nav>
  );
}
