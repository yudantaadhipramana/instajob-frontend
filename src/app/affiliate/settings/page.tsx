'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AffiliateHeaderActions from '@/components/AffiliateHeaderActions';
import { ArrowLeft } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

export default function AffiliateSettingsPage() {
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
          <h1 style={{ fontSize:'16px', fontWeight:'700', color:'#111827', margin:0 }}>Settings</h1>
        </div>
        <AffiliateHeaderActions user={{ name: user?.name, email: user?.email }} />
      </header>
      <main style={{ maxWidth:'800px', margin:'0 auto', padding:'40px 24px' }}>
        <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'28px', display:'flex', flexDirection:'column', gap:'20px' }}>
          <div>
            <h3 style={{ fontSize:'15px', fontWeight:'800', color:'#111827', margin:'0 0 4px' }}>Ubah Password</h3>
            <p style={{ fontSize:'13px', color:'#6B7280', margin:'0 0 14px' }}>Gunakan password kuat minimal 8 karakter.</p>
            {['Password Lama','Password Baru','Konfirmasi Password'].map((lbl,i) => (
              <div key={i} style={{ marginBottom:'10px' }}>
                <label style={{ fontSize:'12px', fontWeight:'700', color:'#374151', display:'block', marginBottom:'4px' }}>{lbl}</label>
                <input type="password" style={{ width:'100%', padding:'9px 12px', border:'1.5px solid #E5E7EB', borderRadius:'8px', fontSize:'13px', fontFamily:'var(--font-body)', outline:'none', boxSizing:'border-box' as any }} />
              </div>
            ))}
            <button style={{ padding:'10px 20px', background:'#1E40FF', color:'#fff', border:'none', borderRadius:'8px', fontWeight:'700', fontSize:'13px', cursor:'pointer', marginTop:'6px' }}>Simpan Password</button>
          </div>
          <div style={{ borderTop:'1px solid #F3F4F6', paddingTop:'20px' }}>
            <h3 style={{ fontSize:'15px', fontWeight:'800', color:'#111827', margin:'0 0 4px' }}>Notifikasi</h3>
            <p style={{ fontSize:'13px', color:'#6B7280', margin:0 }}>Pengaturan notifikasi akan segera tersedia.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
