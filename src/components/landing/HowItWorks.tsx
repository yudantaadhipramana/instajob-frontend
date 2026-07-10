'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useI18n } from '@/context/I18nContext';
import Icons from '@/components/Icons';

export default function HowItWorks() {
  const { t } = useI18n();
  const [demoStep, setDemoStep] = useState(0);
  const [jobsApplied, setJobsApplied] = useState(0);

  // Auto-advance demo animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep((prev) => {
        if (prev === 3) {
          setJobsApplied((j) => (j < 15 ? j + 1 : j));
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const resetDemo = () => {
    setDemoStep(0);
    setJobsApplied(0);
  };

  return (
    <section
      id="cara-kerja"
      style={{
        padding: '80px 48px',
        background: 'linear-gradient(135deg, #FFFFFF 0%, var(--color-background) 100%)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p
            style={{
              fontSize: '14px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-primary)',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {t('howItWorks.badge')}
          </p>
          <h2
            style={{
              fontSize: '40px',
              fontWeight: '800',
              color: 'var(--color-foreground)',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {t('howItWorks.title')}
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#64748B',
              maxWidth: '600px',
              margin: '16px auto 0',
              fontFamily: 'var(--font-body)',
            }}
          >
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Interactive Demo Area */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left: Step Indicators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { num: '01', title: 'Set Preferences', desc: 'Job type, location, experience', icon: Icons.setup(28) },
              { num: '02', title: 'Start AI Scout', desc: 'AI finds matching jobs', icon: Icons.search(28) },
              { num: '03', title: 'Auto-Apply', desc: 'Send applications instantly', icon: Icons.envelope(28) },
              { num: '04', title: 'Track Progress', desc: 'Real-time dashboard', icon: Icons.chartBars(28) },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  padding: '20px',
                  background: demoStep >= i ? '#fff' : 'transparent',
                  borderRadius: '12px',
                  border: `2px solid ${demoStep >= i ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  transition: 'all 0.3s',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: demoStep >= i ? 'var(--color-primary)' : 'var(--color-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {step.num}
                    </span>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: 'var(--color-foreground)',
                        margin: 0,
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#64748B',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Animated Mockup */}
          <div
            style={{
              position: 'relative',
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              border: '1px solid var(--color-border)',
              minHeight: '500px',
            }}
          >
            <AnimatePresence mode="wait">
              {demoStep === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ padding: '20px' }}
                >
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
                    Job Preferences
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input
                      type="text"
                      placeholder="Job Title (e.g., Software Engineer)"
                      readOnly
                      value="Software Engineer"
                      style={{
                        padding: '12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontFamily: 'var(--font-body)',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      readOnly
                      value="Jakarta, Indonesia"
                      style={{
                        padding: '12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontFamily: 'var(--font-body)',
                      }}
                    />
                    <button
                      style={{
                        padding: '12px',
                        background: 'var(--color-primary)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Start AI Scout →
                    </button>
                  </div>
                </motion.div>
              )}

              {demoStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ padding: '20px', textAlign: 'center' }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    style={{ fontSize: '48px', marginBottom: '16px' }}
                  >
                    🔍
                  </motion.div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                    Scanning Job Boards...
                  </h4>
                  <p style={{ fontSize: '14px', color: '#64748B', fontFamily: 'var(--font-body)' }}>
                    AI finding matching jobs
                  </p>
                  <div style={{ marginTop: '16px', background: 'var(--color-muted)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2 }}
                      style={{ background: 'var(--color-primary)', height: '100%' }}
                    />
                  </div>
                </motion.div>
              )}

              {demoStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ padding: '20px' }}
                >
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
                    Found 47 Jobs
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {['Senior Software Engineer - Tech Corp', 'Full Stack Developer - Startup Inc', 'Backend Engineer - Finance Ltd'].map((job, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        style={{
                          padding: '12px',
                          background: 'var(--color-background)',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', fontFamily: 'var(--font-body)' }}>{job}</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>✓ Auto-applying...</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {demoStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ padding: '20px', textAlign: 'center' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    style={{ fontSize: '64px', marginBottom: '16px' }}
                  >
                    {jobsApplied}
                  </motion.div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                    Applications Sent Today
                  </h4>
                  <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
                    AI is working 24/7 for you
                  </p>
                  <button
                    onClick={resetDemo}
                    style={{
                      padding: '10px 20px',
                      background: 'var(--color-accent)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    ↻ Replay Demo
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <p
            style={{
              fontSize: '16px',
              color: '#64748B',
              marginBottom: '24px',
              fontFamily: 'var(--font-body)',
            }}
          >
            {t('howItWorks.cta.title')}
          </p>
          <button
            onClick={() => window.location.href = '/register'}
            style={{
              padding: '14px 36px',
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
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
            {t('howItWorks.cta.button')}
            {Icons.arrowRight(20, '#fff')}
          </button>
        </div>
      </div>
    </section>
  );
}
