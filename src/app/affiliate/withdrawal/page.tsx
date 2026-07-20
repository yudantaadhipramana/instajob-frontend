'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AffiliateHeaderActions from '@/components/AffiliateHeaderActions';
import { ArrowLeft } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

export default function AffiliateWithdrawalPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/affiliate/login'); return; }
    fetch(`${API}/api/affiliate/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setUser(d.affiliate || d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F9FAFB' }}>
      <div style={{ width:'40px', height:'40px', border:'3px solid #E5E7EB', borderTop:'3px solid #1E40FF', borderRadius:'50%', animation:'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'#F9FAFB', fontFamily:'var(--font-body)' }}>
      <header style={{ background:'#FFFFFF', borderBottom:'1px solid #E5E7EB', padding:'0 48px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100, boxShadow:'0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <Link href="/affiliate/affiliate-dashboard" style={{ display:'flex', alignItems:'center', gap:'6px', color:'#1E40FF', fontWeight:'600', fontSize:'13px', textDecoration:'none' }}>
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <h1 style={{ fontSize:'16px', fontWeight:'700', color:'#111827', margin:0 }}>Withdrawal</h1>
        </div>
        <AffiliateHeaderActions user={{ name: user?.name, email: user?.email }} />
      </header>
      <main style={{ maxWidth:'800px', margin:'0 auto', padding:'40px 24px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px' }}>
            {[
              { label:'Siap Ditarik', value: `Rp ${(user?.payableBalance||0).toLocaleString('id-ID')}`, color:'#10B981' },
              { label:'Pending', value: `Rp ${(user?.pendingBalance||0).toLocaleString('id-ID')}`, color:'#F59E0B' },
              { label:'Total Dibayar', value: `Rp ${(user?.paidTotal||0).toLocaleString('id-ID')}`, color:'#1E40FF' },
            ].map((c,i) => (
              <div key={i} style={{ background:'#fff', borderRadius:'12px', border:`1.5px solid ${c.color}30`, padding:'18px' }}>
                <p style={{ fontSize:'12px', color:'#6B7280', margin:'0 0 4px', fontWeight:'600' }}>{c.label}</p>
                <p style={{ fontSize:'20px', fontWeight:'900', color: c.color, margin:0 }}>{c.value}</p>
              </div>
            ))}
          </div>
          <div style={{ background:'#FEF9C3', border:'1px solid #FDE047', borderRadius:'10px', padding:'12px 16px' }}>
            <p style={{ fontSize:'13px', color:'#713F12', margin:0, fontWeight:'600' }}>⚠️ Transfer setiap Jumat oleh admin. Min saldo Rp 50.000.</p>
          </div>
          <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'24px' }}>
            <h3 style={{ fontSize:'15px', fontWeight:'800', margin:'0 0 16px' }}>Rekening Bank</h3>
            <p style={{ fontSize:'13px', color:'#6B7280' }}>Daftarkan rekening bank di halaman pengaturan atau hubungi admin untuk konfigurasi withdrawal.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
