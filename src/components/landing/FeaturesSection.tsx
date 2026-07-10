'use client';

import { motion } from 'motion/react';
import Icons from '@/components/Icons';
import { useI18n } from '@/context/I18nContext';
import { useState } from 'react';

export default function FeaturesSection() {
  const { t } = useI18n();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 0,
      icon: Icons.jobMatch(32, 'var(--color-primary)'),
      title: 'AI Job Scouting',
      description: 'Cari pekerjaan yang sesuai dengan skill dan preferensi Anda secara otomatis',
    },
    {
      id: 1,
      icon: Icons.analysis(32, 'var(--color-primary)'),
      title: 'AI Matching',
      description: 'Analisis kecocokan profil dengan lowongan menggunakan algoritma cerdas',
    },
    {
      id: 2,
      icon: Icons.coverLetter(32, 'var(--color-primary)'),
      title: 'AI Email Auto Apply',
      description: 'Generate dan kirim email lamaran otomatis ke ribuan perusahaan',
    },
    {
      id: 3,
      icon: Icons.linkedin(32, 'var(--color-primary)'),
      title: 'AI LinkedIn Auto Apply',
      description: 'Otomatis apply ke lowongan di LinkedIn tanpa effort manual',
    },
    {
      id: 4,
      icon: Icons.tracking(32, 'var(--color-primary)'),
      title: 'Job Tracking System',
      description: 'Monitor status aplikasi, feedback, dan progress wawancara di satu dashboard',
    },
    {
      id: 5,
      icon: Icons.telegram(32, 'var(--color-primary)'),
      title: 'Telegram Bot Automation',
      description: 'Terima notifikasi real-time dan kelola aplikasi via Telegram',
    },
  ];

  return (
    <section
      id="fitur"
      style={{
        padding: '100px 48px',
        background: 'var(--color-background)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
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
            FITUR UNGGULAN
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
            {t('features.title')}
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#64748B',
              maxWidth: '600px',
              margin: '0 auto',
              fontFamily: 'var(--font-body)',
            }}
          >
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Carousel / Tabs Style Features */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left: Feature List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                onClick={() => setActiveFeature(i)}
                style={{
                  padding: '24px',
                  background: activeFeature === i ? '#FFFFFF' : 'transparent',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  border: `1px solid ${activeFeature === i ? 'var(--color-border)' : 'transparent'}`,
                  boxShadow: activeFeature === i ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: activeFeature === i ? 'var(--color-background)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: 'var(--color-foreground)',
                      margin: '0 0 8px 0',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#64748B',
                      margin: 0,
                      lineHeight: '1.6',
                      fontFamily: 'var(--font-body)',
                      display: activeFeature === i ? 'block' : 'none',
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Feature Image/Mockup */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '48px',
              minHeight: '400px',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
              position: 'relative',
            }}
          >
            {/* Dynamic UI Mockup based on active feature */}
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                background: 'var(--color-background)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '8px' }} />
                <div>
                  <div style={{ width: '120px', height: '12px', background: 'var(--color-primary)', borderRadius: '4px', marginBottom: '6px' }} />
                  <div style={{ width: '80px', height: '8px', background: '#cbd5e1', borderRadius: '4px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[1, 2, 3].map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '100%',
                      height: '60px',
                      background: '#fff',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
