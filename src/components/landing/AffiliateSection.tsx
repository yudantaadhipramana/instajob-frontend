'use client';

import { motion } from 'motion/react';
import Icons from '@/components/Icons';

export default function AffiliateSection() {
  return (
    <section
      id="affiliate"
      style={{
        padding: '100px 48px',
        background: '#FFFFFF',
        position: 'relative',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Background glow effects */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '-200px',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(30, 64, 255, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-200px',
          right: '-150px',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(30, 64, 255, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              style={{
                fontSize: '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-primary)',
                margin: '0 0 16px 0',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Program Affiliate
            </p>

            <h2
              style={{
                fontSize: '48px',
                fontWeight: '800',
                color: 'var(--color-foreground)',
                margin: '0 0 24px 0',
                fontFamily: 'var(--font-heading)',
                lineHeight: '1.2',
              }}
            >
              Dapatkan Penghasilan Tambahan
            </h2>

            <p
              style={{
                fontSize: '18px',
                color: 'var(--color-foreground-secondary)',
                margin: '0 0 48px 0',
                fontFamily: 'var(--font-body)',
                lineHeight: '1.7',
              }}
            >
              Rekomendasikan InstaJob kepada bisnis Anda dan dapatkan komisi berkelanjutan.
              Dashboard real-time, pembayaran otomatis, dan dukungan penuh dari tim kami.
            </p>

            {/* Features list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
              {[
                { icon: Icons.check(24, 'var(--color-primary)'), label: 'Komisi 20% untuk setiap referral' },
                { icon: Icons.check(24, 'var(--color-primary)'), label: 'Dashboard tracking real-time' },
                { icon: Icons.check(24, 'var(--color-primary)'), label: 'Pembayaran mingguan otomatis' },
                { icon: Icons.check(24, 'var(--color-primary)'), label: 'Support team tersedia 24/7' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  <div style={{ flexShrink: 0 }}>{item.icon}</div>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: 'var(--color-foreground)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              onClick={() => (window.location.href = '/affiliate/daftar')}
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
                boxShadow: '0 4px 12px rgba(30, 64, 255, 0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 64, 255, 0.35)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 255, 0.25)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Daftar Sebagai Affiliate
              {Icons.arrowRight(20, '#fff')}
            </motion.button>

            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-foreground-tertiary)',
                marginTop: '16px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Gratis. Tanpa biaya tersembunyi.
            </p>
          </motion.div>

          {/* Right: Stats cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {[
              { number: '20%', label: 'Komisi Referral', desc: 'Per pelanggan berlangganan' },
              { number: '500+', label: 'Affiliate Aktif', desc: 'Menghasilkan bersama kami' },
              { number: '$50K+', label: 'Dibayarkan', desc: 'Ke affiliate partners tahun ini' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                style={{
                  padding: '32px 28px',
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = 'rgba(30, 64, 255, 0.04)';
                  el.style.borderColor = 'rgba(30, 64, 255, 0.2)';
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 8px 24px rgba(30, 64, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = 'rgba(255, 255, 255, 0.5)';
                  el.style.borderColor = 'var(--color-border)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: '900',
                    color: 'var(--color-primary)',
                    marginBottom: '8px',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: '1',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--color-foreground)',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-foreground-secondary)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding: 60px 24px;
          }
          div:nth-child(1) > div:nth-child(3) {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          h2 {
            font-size: 32px;
          }
          p {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}
