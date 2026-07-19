'use client';

import { motion } from 'motion/react';
import Icons from '@/components/Icons';
import { useI18n } from '@/context/I18nContext';

export default function AffiliateSection() {
  const { t } = useI18n();

  return (
    <section
      id="affiliate"
      style={{
        padding: '56px 48px',
        background: '#FFFFFF',
        position: 'relative',
        borderTop: '1px solid var(--color-border)',
      }}
    >

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0px',
            alignItems: 'stretch',
            background: '#FFFFFF',
            borderRadius: '28px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 20px 60px rgba(15, 23, 42, 0.06)',
            overflow: 'hidden',
          }}
        >
          {/* Left accent strip */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '6px',
              background: 'linear-gradient(180deg, #1E40FF 0%, #3B82F6 100%)',
            }}
          />

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ padding: '40px 40px 40px 48px' }}
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
              {t('affiliate.badge')}
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
              {t('affiliate.title')}
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
              {t('affiliate.subtitle')}
            </p>

            {/* Features list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
              {[
                { key: 'affiliate.feature1' },
                { key: 'affiliate.feature2' },
                { key: 'affiliate.feature3' },
                { key: 'affiliate.feature4' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  <div style={{ flexShrink: 0 }}>{Icons.check(24, 'var(--color-primary)')}</div>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--color-foreground)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {t(item.key)}
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
              onClick={() => (window.location.href = '/affiliate')}
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
              {t('affiliate.btn')}
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
              {t('affiliate.note')}
            </p>
          </motion.div>

          {/* Right: Stats cards + Leveling system */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              padding: '40px 48px 40px 32px',
              background: 'var(--color-muted)',
              borderLeft: '1px solid var(--color-border)',
            }}
          >
            {/* Commission & Stats */}
            {[
              { 
                numKey: 'affiliate.stat1.num', 
                labelKey: 'affiliate.stat1.label', 
                descKey: 'affiliate.stat1.desc' 
              },
              { 
                numKey: 'affiliate.stat2.num', 
                labelKey: 'affiliate.stat2.label', 
                descKey: 'affiliate.stat2.desc' 
              },
              { 
                numKey: 'affiliate.stat3.num', 
                labelKey: 'affiliate.stat3.label', 
                descKey: 'affiliate.stat3.desc' 
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                style={{
                  padding: '28px 24px',
                  background: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: '14px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(30, 64, 255, 0.3)';
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 8px 24px rgba(30, 64, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
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
                  {t(stat.numKey)}
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
                  {t(stat.labelKey)}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-foreground-secondary)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {t(stat.descKey)}
                </div>
              </motion.div>
            ))}

            {/* Leveling/Badge System Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
              style={{
                padding: '28px 24px',
                background: 'linear-gradient(135deg, rgba(30, 64, 255, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
                border: '2px solid rgba(30, 64, 255, 0.2)',
                borderRadius: '14px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(30, 64, 255, 0.4)';
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 8px 24px rgba(30, 64, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(30, 64, 255, 0.2)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>🏆</span>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {t('affiliate.level.num')}
                </div>
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: 'var(--color-foreground)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {t('affiliate.level.label')}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--color-foreground-secondary)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.6',
                }}
              >
                {t('affiliate.level.desc')}
              </div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  t('affiliate.level.bronze'),
                  t('affiliate.level.silver'),
                  t('affiliate.level.gold'),
                  t('affiliate.level.platinum'),
                ].map((badge, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '6px 12px',
                      background: i === 0 ? '#CD7F32' : i === 1 ? '#C0C0C0' : i === 2 ? '#FFD700' : '#E5E4E2',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '700',
                      color: i < 2 ? '#fff' : '#333',
                      fontFamily: 'var(--font-body)',
                      textAlign: 'center',
                    }}
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </motion.div>
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
