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
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
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
            PROGRAM AFFILIATE
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
            <br />
            dengan Merekomendasikan InstaJob
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--color-foreground-secondary)',
              maxWidth: '700px',
              margin: '0 auto 48px',
              fontFamily: 'var(--font-body)',
              lineHeight: '1.7',
            }}
          >
            Dapatkan komisi 20% untuk setiap pengguna yang mendaftar melalui link referral Anda.
            Dashboard real-time, pembayaran otomatis, dan support 24/7.
          </p>

          {/* Benefits Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '48px',
            }}
          >
            {[
              { icon: Icons.money(40), title: '20% Komisi', desc: 'Per referral yang berlangganan Pro' },
              { icon: Icons.dashboard(40), title: 'Dashboard Real-time', desc: 'Tracking lengkap performa affiliate' },
              { icon: Icons.payment(40), title: 'Pembayaran Mudah', desc: 'Transfer bank atau e-wallet' },
              { icon: Icons.support(40), title: 'Support 24/7', desc: 'Tim kami siap membantu' },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: '32px 24px',
                  background: 'var(--color-muted)',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '16px', color: 'var(--color-primary)' }}>{benefit.icon}</div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--color-foreground)',
                    margin: '0 0 8px 0',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {benefit.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-foreground-secondary)',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => (window.location.href = '/affiliate/daftar')}
              style={{
                padding: '18px 48px',
                background: '#fff',
                color: 'var(--color-primary)',
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
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              }}
            >
              Daftar Sebagai Affiliate
              {Icons.arrowRight(20, 'var(--color-primary)')}
            </button>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.7)',
                marginTop: '16px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Gratis, tanpa biaya pendaftaran
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
