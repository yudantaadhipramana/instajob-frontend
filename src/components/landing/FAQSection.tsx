'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icons from '@/components/Icons';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Bagaimana cara kerja AI InstaJob dalam mencari lowongan?',
      a: 'AI kami melakukan scouting cerdas melalui 4 layer pencarian (termasuk Google Jobs dan platform karir besar), mencocokkan algoritma dengan profil, pengalaman, dan preferensi lokasi Anda setiap harinya secara otomatis.',
    },
    {
      q: 'Apakah saya perlu memberikan password email atau LinkedIn?',
      a: 'Tidak. Untuk email, kami menggunakan sistem App Password resmi (seperti Gmail App Password) yang sangat aman. Untuk LinkedIn, kami menggunakan integrasi ekstensi browser yang tidak memerlukan password Anda sama sekali.',
    },
    {
      q: 'Apakah email lamaran yang dikirim AI akan terlihat seperti robot?',
      a: 'Sama sekali tidak. AI kami membaca Job Description (JD) dari setiap lowongan, lalu men-generate cover letter dan body email secara unik, natural, dan sangat spesifik menyesuaikan kebutuhan perusahaan tersebut.',
    },
    {
      q: 'Berapa banyak lamaran yang bisa dikirim otomatis?',
      a: 'Untuk paket Free, AI mengirimkan maksimal 5 aplikasi per bulan. Untuk pengguna Pro, AI akan mengirimkan aplikasi secara unlimited setiap harinya selama lowongan tersebut memenuhi kriteria ketat Anda.',
    },
    {
      q: 'Bagaimana jika AI melamar ke perusahaan yang tidak saya inginkan?',
      a: 'Anda memegang kendali penuh. Anda bisa mengatur "Blacklist Perusahaan", kata kunci negatif, atau mengaktifkan mode "Manual Review" di mana AI hanya menyiapkan draft dan Anda yang menekan tombol kirim.',
    },
    {
      q: 'Apakah akun LinkedIn saya aman dari pemblokiran?',
      a: 'Sangat aman. Sistem kami dilengkapi dengan Human-Mimicking Delay dan Rate-Limiting ketat yang mensimulasikan perilaku manusia asli, sehingga akun Anda terlindungi 100% dari flag spam.',
    },
  ];

  return (
    <section
      id="faq"
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
            style={{
              fontSize: '40px',
              fontWeight: '800',
              color: 'var(--color-foreground)',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Pertanyaan yang Sering Diajukan
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#64748B',
              fontFamily: 'var(--font-body)',
            }}
          >
            Pelajari lebih lanjut tentang bagaimana InstaJob bekerja untuk karir Anda.
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
