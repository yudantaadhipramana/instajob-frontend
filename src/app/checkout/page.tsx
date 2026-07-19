'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { useI18n } from '@/context/I18nContext';
import { ArrowLeft, Tag, CheckCircle, XCircle, Loader } from 'lucide-react';
import Icons from '@/components/Icons';

const PLANS = {
  pro: {
    monthly: { name: 'Pro', price: 179000, originalPrice: 279000, period: '/bulan' },
    quarterly: { name: 'Pro', price: 499000, originalPrice: 837000, period: '/3 bulan' },
  },
  premium: {
    monthly: { name: 'Premium', price: 239000, originalPrice: 350000, period: '/bulan' },
    quarterly: { name: 'Premium', price: 650000, originalPrice: 1050000, period: '/3 bulan' },
  },
};

const FEATURES = {
  pro: [
    'AI Job Scouting', 'AI Matching Algorithm', 'AI Email Auto Apply',
    'AI LinkedIn Auto Apply', 'Job Tracking System', 'Telegram Bot Notification',
  ],
  premium: [
    'Semua fitur Pro', '1x token LinkedIn Auto Apply', '2x token Kelas Career Booster',
    'Kelas CV Booster + Template', 'Kelas Portfolio Booster', 'Priority Support 24/7',
  ],
};

function CheckoutContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { t } = useI18n();

  const planKey = (params.get('plan') || 'pro') as 'pro' | 'premium';
  const period = (params.get('period') || 'monthly') as 'monthly' | 'quarterly';

  const plan = PLANS[planKey]?.[period] || PLANS.pro.monthly;
  const features = FEATURES[planKey] || FEATURES.pro;

  const [voucher, setVoucher] = useState('');
  const [voucherStatus, setVoucherStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [discount, setDiscount] = useState(0);
  const [voucherMsg, setVoucherMsg] = useState('');
  const [processing, setProcessing] = useState(false);

  const finalPrice = Math.max(0, plan.price - discount);

  const validateVoucher = async () => {
    if (!voucher.trim()) return;
    setVoucherStatus('loading');
    try {
      const token = localStorage.getItem('instajob_token');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
      const res = await fetch(`${apiBase}/api/vouchers/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ code: voucher, plan: planKey, period }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setVoucherStatus('valid');
        setDiscount(data.discountAmount || 0);
        setVoucherMsg(data.message || `Diskon Rp ${(data.discountAmount || 0).toLocaleString('id-ID')}`);
      } else {
        setVoucherStatus('invalid');
        setVoucherMsg(data.message || 'Voucher tidak valid');
        setDiscount(0);
      }
    } catch {
      setVoucherStatus('invalid');
      setVoucherMsg('Gagal memvalidasi voucher');
      setDiscount(0);
    }
  };

  const handleCheckout = async () => {
    setProcessing(true);
    try {
      const token = localStorage.getItem('instajob_token');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
      const res = await fetch(`${apiBase}/api/payments/create-invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          plan: planKey,
          period,
          voucherCode: voucherStatus === 'valid' ? voucher : undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.invoiceUrl) {
        window.location.href = data.invoiceUrl;
      } else {
        alert(data.message || 'Gagal membuat invoice. Coba lagi.');
        setProcessing(false);
      }
    } catch {
      alert('Terjadi kesalahan. Coba lagi.');
      setProcessing(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 40px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Link href="/subscription" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: '600', fontSize: '13px', textDecoration: 'none' }}>
          <ArrowLeft size={15} /> Pilih Paket
        </Link>
        <Logo size={28} showText={true} />
        <div style={{ width: '80px' }} />
      </header>

      <main style={{ maxWidth: '880px', margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: Order Summary */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '28px', boxShadow: '0 2px 12px rgba(15,23,42,0.05)' }}>
          <p style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)', margin: '0 0 16px' }}>Ringkasan Pesanan</p>

          <div style={{
            background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40FF 55%, #3B82F6 100%)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: 0 }}>
                Paket {plan.name}
              </h2>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '700',
                padding: '3px 10px',
                borderRadius: '20px',
              }}>
                {period === 'monthly' ? 'Bulanan' : '3 Bulanan'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {Icons.check(12, 'rgba(255,255,255,0.8)')}
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.88)', fontWeight: '600' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px 0', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748B' }}>
              <span>Harga normal</span>
              <span style={{ textDecoration: 'line-through' }}>Rp {plan.originalPrice.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#10B981', fontWeight: '700' }}>
              <span>Diskon paket</span>
              <span>-Rp {(plan.originalPrice - plan.price).toLocaleString('id-ID')}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#F59E0B', fontWeight: '700' }}>
                <span>Diskon voucher</span>
                <span>-Rp {discount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '800', color: 'var(--color-foreground)', paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
              <span>Total</span>
              <span style={{ color: 'var(--color-primary)' }}>Rp {finalPrice.toLocaleString('id-ID')}</span>
            </div>
            <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0, textAlign: 'right' }}>{plan.period}</p>
          </div>
        </div>

        {/* Right: Voucher + CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Voucher */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '24px', boxShadow: '0 2px 12px rgba(15,23,42,0.05)' }}>
            <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-foreground)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={14} color="var(--color-primary)" /> Kode Voucher
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                value={voucher}
                onChange={(e) => { setVoucher(e.target.value.toUpperCase()); setVoucherStatus('idle'); }}
                onKeyDown={(e) => e.key === 'Enter' && validateVoucher()}
                placeholder="Masukkan kode voucher"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: `1.5px solid ${voucherStatus === 'valid' ? '#10B981' : voucherStatus === 'invalid' ? '#EF4444' : 'var(--color-border)'}`,
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '700',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  letterSpacing: '0.05em',
                  background: '#F8FAFC',
                }}
              />
              <button
                onClick={validateVoucher}
                disabled={voucherStatus === 'loading' || !voucher.trim()}
                style={{
                  padding: '10px 16px',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  opacity: !voucher.trim() ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {voucherStatus === 'loading' ? <Loader size={13} className="animate-spin" /> : 'Pakai'}
              </button>
            </div>
            {voucherStatus !== 'idle' && voucherStatus !== 'loading' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '12px', color: voucherStatus === 'valid' ? '#10B981' : '#EF4444', fontWeight: '600' }}>
                {voucherStatus === 'valid' ? <CheckCircle size={13} /> : <XCircle size={13} />}
                {voucherMsg}
              </div>
            )}
          </div>

          {/* Payment CTA */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '24px', boxShadow: '0 2px 12px rgba(15,23,42,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>Total Pembayaran</span>
              <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                Rp {finalPrice.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={processing}
              style={{
                width: '100%',
                padding: '14px',
                background: processing ? '#94A3B8' : 'linear-gradient(135deg, #1E3A8A 0%, #1E40FF 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: processing ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                letterSpacing: '0.02em',
              }}
            >
              {processing ? <><Loader size={16} /> Memproses...</> : '🔒 Bayar Sekarang'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '14px' }}>
              {['Tanpa kartu kredit', 'SSL Terenkripsi', 'Cancel kapan saja'].map((t, i) => (
                <span key={i} style={{ fontSize: '10px', color: '#94A3B8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {['🔒', '🛡️', '↩️'][i]} {t}
                </span>
              ))}
            </div>

            <p style={{ textAlign: 'center', fontSize: '11px', color: '#CBD5E1', margin: '10px 0 0', fontWeight: '600' }}>
              Pembayaran aman via Xendit
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
        <Logo size={48} showText={true} />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
