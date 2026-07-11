'use client';

import { motion } from 'motion/react';
import { useI18n } from '@/context/I18nContext';
import NavigationBar from '@/components/landing/NavigationBar';
import Footer from '@/components/landing/Footer';
import { useRouter } from 'next/navigation';

export default function AffiliateLandingPage() {
  const { t } = useI18n();
  const router = useRouter();

  const benefits = [
    { rate: '20-30%', label: 'Komisi Tiering' },
    { rate: '7 hari', label: 'Masa Validasi' }
  ];

  const steps = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      title: 'Bagikan Link',
      desc: 'Gunakan /register?ref=CODE atau berikan kode affiliate secara langsung.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: 'Customer Berlangganan',
      desc: 'Komisi dari invoice subscription pertama yang berhasil dibayar.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Validasi 7 Hari',
      desc: 'Komisi masuk pending lalu menjadi payable setelah validasi.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Payout Jumat',
      desc: 'Transfer manual setiap Jumat oleh tim admin.'
    }
  ];

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <NavigationBar />

      {/* Hero Section */}
      <section style={{
        paddingTop: '160px',
        paddingBottom: '80px',
        paddingLeft: '48px',
        paddingRight: '48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at top, rgba(30, 64, 255, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, rgba(30, 64, 255, 0.08) 0%, rgba(59, 130, 246, 0.12) 100%)',
              border: '1px solid rgba(30, 64, 255, 0.2)',
              borderRadius: '100px',
              marginBottom: '24px',
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)'
            }}
          >
            💰 AFFILIATE PROGRAM
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: '52px',
              fontWeight: '800',
              color: 'var(--color-foreground)',
              margin: '0 0 24px 0',
              lineHeight: '1.2',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.02em'
            }}
          >
            Gabung Affiliate<br />
            <span style={{ color: 'var(--color-primary)' }}>InstaJob</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: '18px',
              color: '#64748B',
              marginBottom: '32px',
              maxWidth: '700px',
              margin: '0 auto 32px',
              lineHeight: '1.7',
              fontFamily: 'var(--font-body)'
            }}
          >
            InstaJob adalah platform otomasi pencarian kerja berbasis AI. Dapatkan komisi hingga{' '}
            <strong style={{ color: 'var(--color-primary)' }}>30%</strong> dari setiap referral yang berlangganan.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <button
              onClick={() => router.push('/affiliate/login')}
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #1E40FF 0%, #3B82F6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 14px rgba(30, 64, 255, 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 64, 255, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(30, 64, 255, 0.3)';
              }}
            >
              Daftar Affiliate →
            </button>
            <button
              onClick={() => router.push('/affiliate/login')}
              style={{
                padding: '16px 32px',
                background: 'white',
                color: 'var(--color-primary)',
                border: '2px solid var(--color-primary)',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(30, 64, 255, 0.05)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'white'}
            >
              Login Affiliate
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Cards */}
      <section style={{
        padding: '0 48px 80px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px'
          }}
        >
          {benefits.map((b, i) => (
            <div
              key={i}
              style={{
                background: 'linear-gradient(135deg, rgba(30, 64, 255, 0.03) 0%, rgba(59, 130, 246, 0.06) 100%)',
                border: '1px solid rgba(30, 64, 255, 0.1)',
                borderRadius: '20px',
                padding: '32px',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: '40px',
                fontWeight: '800',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-heading)',
                marginBottom: '8px'
              }}>
                {b.rate}
              </div>
              <div style={{
                fontSize: '15px',
                color: '#64748B',
                fontFamily: 'var(--font-body)'
              }}>
                {b.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section style={{
        padding: '80px 48px',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: '36px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '60px',
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-foreground)'
            }}
          >
            Cara Kerja Program Affiliate
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, rgba(30, 64, 255, 0.1) 0%, rgba(59, 130, 246, 0.15) 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: 'var(--color-primary)'
                }}>
                  {step.icon}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-foreground)'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: '#64748B',
                  fontFamily: 'var(--font-body)'
                }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits List */}
      <section style={{ padding: '80px 48px', maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, rgba(30, 64, 255, 0.03) 0%, rgba(59, 130, 246, 0.06) 100%)',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid rgba(30, 64, 255, 0.1)'
          }}
        >
          <h3 style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '32px',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-foreground)'
          }}>
            Keuntungan Bergabung
          </h3>
          {[
            'Komisi 20%-30% (4 tier) dari pembayaran subscription pertama.',
            'Komisi satu kali, bukan recurring.',
            'Validasi 7 hari sebelum komisi siap dibayar.',
            'Payout setiap Jumat melalui transfer manual.',
            'Referral bisa memakai link atau kode affiliate.',
            'Tier naik otomatis berdasarkan jumlah konversi.'
          ].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1E40FF 0%, #3B82F6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#334155',
                fontFamily: 'var(--font-body)'
              }}>
                {text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 48px',
        background: 'linear-gradient(135deg, #1E40FF 0%, #3B82F6 100%)',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{
            fontSize: '36px',
            fontWeight: '800',
            color: 'white',
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)'
          }}>
            Siap Mulai Dapatkan Passive Income?
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px',
            fontFamily: 'var(--font-body)'
          }}>
            Daftar sekarang dan mulai ajak job seeker menggunakan InstaJob.
          </p>
          <button
            onClick={() => router.push('/affiliate/login')}
            style={{
              padding: '18px 40px',
              background: 'white',
              color: 'var(--color-primary)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '17px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Daftar Affiliate Sekarang →
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
