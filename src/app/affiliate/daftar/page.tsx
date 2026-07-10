'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Logo } from '@/components/Logo';

export default function AffiliateDaftarPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    socialMedia: '',
    experience: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend API
    console.log('Affiliate registration:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-background)',
          padding: '24px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            maxWidth: '500px',
            background: '#fff',
            borderRadius: '24px',
            padding: '48px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '800',
              color: 'var(--color-foreground)',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Pendaftaran Berhasil!
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#64748B',
              marginBottom: '32px',
              fontFamily: 'var(--font-body)',
              lineHeight: '1.6',
            }}
          >
            Tim kami akan menghubungi Anda dalam 1-2 hari kerja untuk verifikasi akun affiliate.
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            style={{
              padding: '14px 32px',
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            Kembali ke Beranda
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-background)',
        padding: '48px 24px',
      }}
    >
      {/* Logo Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <a href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <Logo size={40} showText={true} />
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '800',
            color: 'var(--color-foreground)',
            margin: '0 0 16px 0',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Daftar Program Affiliate
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: '#64748B',
            marginBottom: '32px',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.6',
          }}
        >
          Isi formulir di bawah untuk bergabung dengan program affiliate InstaJob. Dapatkan komisi 20% untuk setiap referral yang berlangganan.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label
              htmlFor="fullName"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-foreground)',
                marginBottom: '8px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Nama Lengkap *
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-foreground)',
                marginBottom: '8px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-foreground)',
                marginBottom: '8px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Nomor WhatsApp *
            </label>
            <input
              id="phone"
              type="tel"
              required
              placeholder="08123456789"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          <div>
            <label
              htmlFor="socialMedia"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-foreground)',
                marginBottom: '8px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Social Media / Website (opsional)
            </label>
            <input
              id="socialMedia"
              type="text"
              placeholder="Instagram, Twitter, Blog, dll"
              value={formData.socialMedia}
              onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          <div>
            <label
              htmlFor="experience"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-foreground)',
                marginBottom: '8px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Pengalaman Affiliate / Marketing
            </label>
            <textarea
              id="experience"
              rows={4}
              placeholder="Ceritakan pengalaman Anda di bidang marketing atau affiliate (opsional)"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                transition: 'border-color 0.2s',
                resize: 'vertical',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-body)',
            }}
          >
            Daftar Sekarang
          </button>
        </form>

        <p
          style={{
            fontSize: '13px',
            color: '#94a3b8',
            marginTop: '24px',
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
          }}
        >
          Dengan mendaftar, Anda menyetujui{' '}
          <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
            Syarat & Ketentuan
          </a>{' '}
          program affiliate kami.
        </p>
      </motion.div>
    </div>
  );
}
