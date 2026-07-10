'use client';

import { motion } from 'motion/react';
import { useI18n } from '@/context/I18nContext';
import Icons from '@/components/Icons';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const { t } = useI18n();
  const router = useRouter();

  const handleRegister = () => router.push('/register');
  const handleDemo = () => {
    const element = document.getElementById('cara-kerja');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    { icon: Icons.check(16, 'var(--color-accent)'), label: t('hero.features.jobScouting') },
    { icon: Icons.check(16, 'var(--color-accent)'), label: t('hero.features.ai') },
    { icon: Icons.check(16, 'var(--color-accent)'), label: t('hero.features.emailApply') },
    { icon: Icons.check(16, 'var(--color-accent)'), label: t('hero.features.linkedinApply') },
    { icon: Icons.check(16, 'var(--color-accent)'), label: t('hero.features.tracking') },
    { icon: Icons.check(16, 'var(--color-accent)'), label: t('hero.features.telegram') },
  ];

  return (
    <section
      id="hero"
      style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        paddingLeft: '48px',
        paddingRight: '48px',
        background: '#FFFFFF',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Removed background grid for cleaner look */}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'rgba(22, 163, 74, 0.1)',
            border: '1px solid rgba(22, 163, 74, 0.3)',
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-body)',
          }}
        >
          <span>🚀</span>
          {t('hero.badge').replace('🚀 ', '')}
        </motion.div>

        {/* Pricing Hook */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '13px',
            fontWeight: '700',
            color: '#fff',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '0.02em',
          }}
        >
          Mulai dari Rp 6.000/hari
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: '52px',
            fontWeight: '800',
            color: 'var(--color-foreground)',
            margin: '0 0 24px 0',
            lineHeight: '1.2',
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em',
          }}
        >
          {t('hero.title1')}
          <br />
          <span style={{ color: 'var(--color-primary)' }}>
            {t('hero.title2')}
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            fontSize: '18px',
            color: '#64748B',
            marginBottom: '32px',
            maxWidth: '700px',
            margin: '0 auto 32px',
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.6',
          }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          {features.map((item, i) => (
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
                color: 'var(--color-foreground)',
                border: '1px solid var(--color-border)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
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
              background: 'var(--color-primary)',
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
              fontFamily: 'var(--font-body)',
            }}
          >
            {t('hero.cta')} →
          </button>
          <button
            onClick={handleDemo}
            style={{
              padding: '16px 40px',
              background: 'transparent',
              color: 'var(--color-primary)',
              border: '2px solid var(--color-primary)',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'var(--font-body)',
            }}
          >
            {t('hero.demo')}
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
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
            {[
              { id: 1, seed: 12 },
              { id: 2, seed: 25 },
              { id: 3, seed: 41 },
            ].map((user, i) => (
              <div
                key={i}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--color-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: i > 0 ? '-12px' : 0,
                  border: '2px solid #fff',
                  zIndex: 3 - i,
                  overflow: 'hidden',
                }}
              >
                <img 
                  src={`https://i.pravatar.cc/150?img=${user.seed}`} 
                  alt="Avatar" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            ))}
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-foreground)',
                fontFamily: 'var(--font-body)',
              }}
            >
              ⭐⭐⭐⭐⭐ {t('hero.social_proof')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
