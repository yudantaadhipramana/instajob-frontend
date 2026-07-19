'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { z } from 'zod';
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator';

const InstagramSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const ThreadsSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 12.5a2.5 2.5 0 1 1-2.5-2.5h.5" />
    <path d="M18.7 15.5c-1.3 2.7-4 4.5-7.2 4.5-4.4 0-8-3.6-8-8s3.6-8 8-8c3.9 0 7.2 2.8 7.9 6.5.1.7.2 1.4.2 2 0 3.3-2.7 6-6 6s-6-2.7-6-6" />
  </svg>
);

const schema = z.object({
  name: z.string().min(2, 'Nama wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  phone: z.string().min(10, 'Nomor WhatsApp tidak valid'),
  instagram: z.string().min(3, 'Instagram wajib diisi untuk verifikasi'),
  tiktok: z.string().optional(),
  threads: z.string().optional(),
  fypLink: z.string().optional(),
  agreed: z.boolean().refine(v => v, 'Setujui syarat & ketentuan'),
});

type Form = z.infer<typeof schema>;

export default function AffiliateDaftarPage() {
  const router = useRouter();
  const [form, setForm] = useState<Form>({
    name: '', email: '', password: '', phone: '',
    instagram: '', tiktok: '', threads: '', fypLink: '',
    agreed: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name as keyof Form]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      const v = schema.parse(form);
      const bio = `IG:${v.instagram}|TT:${v.tiktok||'-'}|TH:${v.threads||'-'}|FYP:${v.fypLink||'-'}`;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: v.name, email: v.email, password: v.password, phone: v.phone, role: 'AFFILIATE', bio }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Pendaftaran gagal');
      router.push('/affiliate/login');
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fe: any = {};
        err.issues.forEach((i: any) => { if (i.path[0]) fe[i.path[0]] = i.message; });
        setErrors(fe);
      } else {
        setErrors({ agreed: err.message });
      }
      setLoading(false);
    }
  };

  const fieldStyle = (err?: string): React.CSSProperties => ({
    width: '100%',
    padding: '12px 12px 12px 40px',
    border: `1px solid ${err ? '#FECACA' : 'rgba(0,0,0,0.1)'}`,
    borderRadius: '12px',
    fontSize: '15px',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: err ? '#FEF2F2' : 'white',
    boxSizing: 'border-box' as const,
  });

  const noIconFieldStyle = (err?: string): React.CSSProperties => ({
    ...fieldStyle(err),
    padding: '12px',
  });

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--color-foreground)',
    fontFamily: 'var(--font-body)',
  };

  const iconWrap: React.CSSProperties = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94A3B8',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      {/* Header — same pattern as login page */}
      <header style={{
        padding: '24px 48px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link href="/affiliate" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', cursor: 'pointer' }}>
          <img src="/logo-instajob.png" alt="InstaJob Logo" style={{ height: '40px', width: 'auto' }} />
        </Link>
        <Link href="/affiliate/login" style={{ fontSize: '14px', color: 'var(--color-primary)', fontFamily: 'var(--font-body)', textDecoration: 'none', fontWeight: '600' }}>
          Sudah punya akun? Login →
        </Link>
      </header>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 24px 64px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '520px' }}
        >
          {/* Title */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '800',
              color: 'var(--color-foreground)',
              marginBottom: '12px',
              fontFamily: 'var(--font-heading)',
            }}>
              Daftar Akun Afiliator
            </h1>
            <p style={{ fontSize: '16px', color: '#64748B', fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>
              Akun dengan <strong>followers besar</strong> atau konten FYP akan diprioritaskan untuk Tier tinggi.
            </p>
          </div>

          {/* Card */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.06)',
            padding: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          }}>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

              {/* === SECTION 1: INFORMASI PRIBADI === */}
              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
                  Informasi Pribadi
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                  {/* Nama */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={labelStyle}>Nama Lengkap</label>
                    <div style={{ position: 'relative' }}>
                      <span style={iconWrap}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </span>
                      <input name="name" type="text" value={form.name} onChange={onChange} placeholder="Nama lengkap kamu"
                        style={fieldStyle(errors.name)}
                        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                        onBlur={e => e.target.style.borderColor = errors.name ? '#FECACA' : 'rgba(0,0,0,0.1)'} />
                    </div>
                    {errors.name && <span style={{ fontSize: '13px', color: '#DC2626', fontFamily: 'var(--font-body)' }}>{errors.name}</span>}
                  </div>

                  {/* Email + Phone in grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={labelStyle}>Email</label>
                      <div style={{ position: 'relative' }}>
                        <span style={iconWrap}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </span>
                        <input name="email" type="email" value={form.email} onChange={onChange} placeholder="email@kamu.com"
                          style={fieldStyle(errors.email)}
                          onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                          onBlur={e => e.target.style.borderColor = errors.email ? '#FECACA' : 'rgba(0,0,0,0.1)'} />
                      </div>
                      {errors.email && <span style={{ fontSize: '12px', color: '#DC2626', fontFamily: 'var(--font-body)' }}>{errors.email}</span>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={labelStyle}>No WhatsApp</label>
                      <div style={{ position: 'relative' }}>
                        <span style={iconWrap}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.42 6.18a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.91 12a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                        </span>
                        <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="08xxxxxxxxxx"
                          style={fieldStyle(errors.phone)}
                          onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                          onBlur={e => e.target.style.borderColor = errors.phone ? '#FECACA' : 'rgba(0,0,0,0.1)'} />
                      </div>
                      {errors.phone && <span style={{ fontSize: '12px', color: '#DC2626', fontFamily: 'var(--font-body)' }}>{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Password */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={labelStyle}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <span style={iconWrap}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                      </span>
                      <input name="password" type="password" value={form.password} onChange={onChange} placeholder="Min 8 karakter"
                        style={fieldStyle(errors.password)}
                        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                        onBlur={e => e.target.style.borderColor = errors.password ? '#FECACA' : 'rgba(0,0,0,0.1)'} />
                      {form.password.length > 0 && (
                        <PasswordStrengthIndicator password={form.password} />
                      )}
                    </div>
                    {errors.password && <span style={{ fontSize: '13px', color: '#DC2626', fontFamily: 'var(--font-body)' }}>{errors.password}</span>}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', marginBottom: '32px' }} />

              {/* === SECTION 2: SOSIAL MEDIA === */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', fontFamily: 'var(--font-body)', margin: 0 }}>
                    Otoritas Sosial Media
                  </p>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-primary)', background: '#EFF6FF', padding: '3px 10px', borderRadius: '20px', fontFamily: 'var(--font-body)' }}>
                    Syarat Approval
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                  {/* Instagram — Wajib */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <InstagramSVG /> Instagram <span style={{ fontSize: '12px', color: '#DC2626' }}>*</span>
                    </label>
                    <input name="instagram" type="text" value={form.instagram} onChange={onChange} placeholder="https://instagram.com/username"
                      style={noIconFieldStyle(errors.instagram)}
                      onFocus={e => { e.target.style.borderColor = '#EC4899'; e.target.style.boxShadow = '0 0 0 3px rgba(236,72,153,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = errors.instagram ? '#FECACA' : 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'none'; }} />
                    {errors.instagram && <span style={{ fontSize: '13px', color: '#DC2626', fontFamily: 'var(--font-body)' }}>{errors.instagram}</span>}
                  </div>

                  {/* TikTok + Threads */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <TikTokSVG /> TikTok <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '400' }}>(opsional)</span>
                      </label>
                      <input name="tiktok" type="text" value={form.tiktok} onChange={onChange} placeholder="https://tiktok.com/@username"
                        style={noIconFieldStyle()}
                        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ThreadsSVG /> Threads <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '400' }}>(opsional)</span>
                      </label>
                      <input name="threads" type="text" value={form.threads} onChange={onChange} placeholder="https://threads.net/@username"
                        style={noIconFieldStyle()}
                        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'} />
                    </div>
                  </div>

                  {/* FYP Link */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                      Link Konten FYP / Viral <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '400' }}>(opsional)</span>
                    </label>
                    <input name="fypLink" type="url" value={form.fypLink} onChange={onChange} placeholder="https://tiktok.com/... atau https://instagram.com/p/..."
                      style={noIconFieldStyle()}
                      onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'} />

                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', marginBottom: '24px' }} />

              {/* === SECTION 3: AGREE + SUBMIT === */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <input type="checkbox" name="agreed" checked={form.agreed} onChange={onChange}
                    style={{ marginTop: '2px', width: '16px', height: '16px', accentColor: 'var(--color-primary)', cursor: 'pointer', flexShrink: 0 }} />
                  <label style={{ fontSize: '14px', color: '#64748B', fontFamily: 'var(--font-body)', lineHeight: '1.6', cursor: 'pointer' }}>
                    Saya menyatakan data benar dan setuju dengan{' '}
                    <Link href="/terms" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '600' }}>Syarat & Ketentuan</Link>
                    {' '}InstaJob Creator Network.
                  </label>
                </div>

                {errors.agreed && (
                  <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '12px', padding: '14px 16px', fontSize: '14px', color: '#DC2626', fontFamily: 'var(--font-body)' }}>
                    {errors.agreed}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '14px',
                    background: loading ? 'rgba(30,64,255,0.5)' : 'linear-gradient(135deg, #1E40FF 0%, #3B82F6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  onMouseOver={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(30,64,255,0.3)'; } }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {loading ? (
                    <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  ) : 'Kirim Pendaftaran Afiliator'}
                </button>
              </div>

            </form>

            {/* Footer links */}
            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <Link href="/affiliate" style={{ fontSize: '14px', color: '#64748B', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseOut={e => (e.currentTarget.style.color = '#64748B')}>
                ← Kembali ke halaman affiliate
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
