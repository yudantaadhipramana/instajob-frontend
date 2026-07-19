'use client';

import { motion, AnimatePresence } from 'motion/react';
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
            {t('features.badge')}
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
          className="landing-two-col-grid landing-two-col-grid-reverse"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left: Feature List */}
          <div className="grid-col-left" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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

          {/* Right: Dynamic Feature Visualization */}
          <div
            className="grid-col-right"
            style={{
              background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40FF 55%, #3B82F6 100%)',
              borderRadius: '24px',
              padding: '48px',
              minHeight: '400px',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(30, 64, 255, 0.25)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <AnimatePresence mode="wait">
              {activeFeature === 0 && (
                <motion.div key={0} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} style={{ width: '100%', textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 24px' }}>
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)' }} />
                    <div style={{ position: 'absolute', inset: '30px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.6)' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '16px', height: '16px', background: '#fff', borderRadius: '50%', transform: 'translate(-50%,-50%)' }} />
                  </div>
                  {['PT Teknologi Maju', 'Startup Digital ID', 'Global Corp Asia'].map((company, idx) => (
                    <motion.div key={company} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.2 }} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 16px', marginBottom: '8px', color: '#fff', fontSize: '13px', fontWeight: '600', textAlign: 'left', fontFamily: 'var(--font-body)' }}>
                      {t('features.found')} {company}
                    </motion.div>
                  ))}
                </motion.div>
              )}
              {activeFeature === 1 && (
                <motion.div key={1} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} style={{ width: '100%' }}>
                  <div style={{ color: '#fff', fontSize: '14px', fontWeight: '700', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Skor Kecocokan Profil</div>
                  {[{ label: 'Skill Match', val: 94 }, { label: 'Pengalaman', val: 87 }, { label: 'Lokasi & Gaji', val: 91 }].map((item, idx) => (
                    <div key={item.label} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.9)', fontSize: '13px', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>
                        <span>{item.label}</span><span>{item.val}%</span>
                      </div>
                      <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${item.val}%` }} transition={{ duration: 0.8, delay: idx * 0.15 }} style={{ height: '100%', background: '#fff', borderRadius: '4px' }} />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
              {activeFeature === 2 && (
                <motion.div key={2} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} style={{ width: '100%', textAlign: 'center' }}>
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: '56px', marginBottom: '16px' }}>✉️</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ color: '#fff', fontSize: '32px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>127</motion.span> Email Terkirim
                  </motion.div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginTop: '8px', fontFamily: 'var(--font-body)' }}>Personalized cover letter per perusahaan</div>
                </motion.div>
              )}
              {activeFeature === 3 && (
                <motion.div key={3} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} style={{ width: '100%' }}>
                  {['Software Engineer @ Gojek', 'Product Manager @ Traveloka', 'UX Designer @ Bukalapak'].map((job, idx) => (
                    <motion.div key={job} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.2 }} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '14px 16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', fontFamily: 'var(--font-body)' }}>{job}</span>
                      <span style={{ background: 'var(--color-accent)', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px' }}>Applied</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              {activeFeature === 4 && (
                <motion.div key={4} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} style={{ width: '100%', display: 'flex', gap: '10px' }}>
                  {[{ label: 'Applied', count: 24 }, { label: 'Interview', count: 8 }, { label: 'Offer', count: 2 }].map((col, idx) => (
                    <motion.div key={col.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.15 }} style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: '12px', padding: '16px 10px', textAlign: 'center' }}>
                      <div style={{ color: '#fff', fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>{col.count}</div>
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: '600', marginTop: '4px', fontFamily: 'var(--font-body)' }}>{col.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              {activeFeature === 5 && (
                <motion.div key={5} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} style={{ width: '100%' }}>
                  <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '16px', padding: '16px' }}>
                    {['🎉 Lamaran ke Gojek terkirim!', '📅 Interview terjadwal besok 10:00', '✅ 15 lowongan baru cocok denganmu'].map((msg, idx) => (
                      <motion.div key={msg} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.25 }} style={{ background: '#fff', color: 'var(--color-foreground)', borderRadius: '10px', padding: '10px 14px', marginBottom: '8px', fontSize: '13px', fontWeight: '600', fontFamily: 'var(--font-body)' }}>
                        {msg}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
