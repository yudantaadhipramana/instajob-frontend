'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icons from '@/components/Icons';
import { useI18n } from '@/context/I18nContext';

export default function FAQSection() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: t('faq.q1'),
      a: t('faq.a1'),
    },
    {
      q: t('faq.q2'),
      a: t('faq.a2'),
    },
    {
      q: t('faq.q3'),
      a: t('faq.a3'),
    },
    {
      q: t('faq.q4'),
      a: t('faq.a4'),
    },
    {
      q: t('faq.q5'),
      a: t('faq.a5'),
    },
    {
      q: t('faq.q6'),
      a: t('faq.a6'),
    },
  ];

  return (
    <section
      id="faq"
      className="faq-section"
      style={{
        padding: '100px 48px',
        background: 'var(--color-background)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
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
            FAQ
          </p>
          <h2
            className="section-h2"
            style={{
              fontSize: '40px',
              fontWeight: '800',
              color: 'var(--color-foreground)',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {t('faq.title')}
          </h2>
          <p
            className="section-subtitle"
            style={{
              fontSize: '18px',
              color: '#64748B',
              fontFamily: 'var(--font-body)',
            }}
          >
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: openIndex === i ? 'var(--color-primary)' : 'var(--color-foreground)',
                    fontFamily: 'var(--font-heading)',
                    transition: 'color 0.2s',
                  }}
                >
                  {faq.q}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: openIndex === i ? 'var(--color-primary)' : 'var(--color-muted)',
                    color: openIndex === i ? '#fff' : 'var(--color-primary)',
                    transition: 'all 0.3s',
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                >
                  ↓
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      style={{
                        padding: '0 24px 24px 24px',
                        fontSize: '15px',
                        color: '#64748B',
                        lineHeight: '1.7',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
