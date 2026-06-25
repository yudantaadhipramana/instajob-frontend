'use client';

import { useI18n } from '@/context/I18nContext';
import { Logo } from './Logo';
import { HighlightText, GradientText } from './Animations';
import Icons from '@/components/Icons';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const { t, lang, setLang } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  const handleRegister = useCallback(() => {
    router.push('/register');
  }, [router]);

  return (
    <>
      {/* Sticky Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
          padding: '16px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo size={32} showText={true} />
        </div>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
          {/* Language Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px',
              background: '#F1F5F9',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
            }}
          >
            <button
              onClick={() => { console.log('Setting lang to: id'); setLang('id'); }}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '700',
                background: lang === 'id' ? '#0051FF' : 'transparent',
                color: lang === 'id' ? '#fff' : '#64748B',
                transition: 'all 0.2s ease',
              }}
            >
              ID
            </button>
            <button
              onClick={() => { console.log('Setting lang to: en'); setLang('en'); }}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '700',
                background: lang === 'en' ? '#0051FF' : 'transparent',
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
              color: '#0051FF',
              border: '1px solid #0051FF',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: '0.2s',
            }}
          >
            {t('nav.login')}
          </button>
          <button
            onClick={handleRegister}
            style={{
              padding: '10px 24px',
              background: '#0051FF',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: '0.2s',
            }}
          >
            {t('nav.signup')}
          </button>
        </div>
      </nav>

      {/* Hero Section with Gradient Background */}
      <section
        style={{
          paddingTop: '120px',
          paddingBottom: '80px',
          paddingLeft: '48px',
          paddingRight: '48px',
          background: 'linear-gradient(135deg, #F0F4FF 0%, #FFFFFF 100%)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Grid */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(0,81,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,81,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Trust Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '12px',
              marginBottom: '24px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#22C55E',
            }}
          >
            <span>🚀</span>
            {t('hero.badge').replace('🚀 ', '')}
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '800',
              color: '#1E293B',
              margin: '0 0 24px 0',
              lineHeight: '1.2',
              textAlign: 'center',
            }}
          >
            {t('hero.title1')}
            <br />
            <GradientText from="#0051FF" to="#7C3AED">
              {t('hero.title2')}
            </GradientText>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: '18px',
              color: '#64748B',
              marginBottom: '32px',
              maxWidth: '700px',
              margin: '0 auto 32px',
              textAlign: 'center',
            }}
          >
            {t('hero.subtitle')}
          </p>

          {/* Feature Pills */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              marginBottom: '32px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: Icons.check(16, '#22C55E'), label: t('hero.features.jobScouting') },
              { icon: Icons.check(16, '#22C55E'), label: t('hero.features.ai') },
              { icon: Icons.check(16, '#22C55E'), label: t('hero.features.emailApply') },
              { icon: Icons.check(16, '#22C55E'), label: t('hero.features.linkedinApply') },
              { icon: Icons.check(16, '#22C55E'), label: t('hero.features.tracking') },
              { icon: Icons.check(16, '#22C55E'), label: t('hero.features.telegram') },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: '#F8FAFC',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1E293B',
                  border: '1px solid #E2E8F0',
                }}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              marginBottom: '48px',
            }}
          >
            <button
              onClick={handleRegister}
              style={{
                padding: '16px 40px',
                background: '#0051FF',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
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
                e.currentTarget.style.boxShadow =
                  '0 10px 30px rgba(0,81,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {t('hero.cta')} →
            </button>
            <button
              onClick={handleLogin}
              style={{
                padding: '16px 40px',
                background: 'transparent',
                color: '#0051FF',
                border: '2px solid #0051FF',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F0F4FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {t('hero.demo')}
            </button>
          </div>

          {/* Social Proof */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px',
              background: '#fff',
              borderRadius: '12px',
              maxWidth: '600px',
              margin: '0 auto',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div style={{ display: 'flex', gap: '-8px' }}>
              {['RS', 'BH', 'MW'].map((init, i) => (
                <div
                  key={i}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, #0051FF, #7C3AED)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '12px',
                    marginLeft: i > 0 ? '-12px' : 0,
                    border: '2px solid #fff',
                    zIndex: 3 - i,
                  }}
                >
                  {init}
                </div>
              ))}
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1E293B',
                }}
              >
                ⭐⭐⭐⭐⭐ {t('hero.social_proof')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
