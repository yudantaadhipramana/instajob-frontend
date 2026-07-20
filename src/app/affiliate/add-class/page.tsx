'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AffiliateHeaderActions from '@/components/AffiliateHeaderActions';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
const INPUT: React.CSSProperties = { width:'100%', padding:'10px 12px', border:'1.5px solid #E5E7EB', borderRadius:'8px', fontSize:'13px', fontFamily:'var(--font-body)', outline:'none', boxSizing:'border-box', background:'#FAFAFA' };
const LABEL: React.CSSProperties = { fontSize:'12px', fontWeight:'700', color:'#374151', display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.4px' };

export default function AffiliateAddClassPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type:'success'|'error'; text:string }|null>(null);

  const [form, setForm] = useState({
    title: '', category: 'Career Booster', description: '',
    longDesc: '', price: '', duration: '', maxParticipants: '',
    instructor: '', instructorBio: '', curriculum: '',
    deliverables: '', prerequisites: '', sampleSchedule: '',
    thumbnailUrl: '', promoVideoUrl: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/affiliate/login'); return; }
    fetch(`${API}/api/affiliate/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setUser(d.affiliate || d); })
      .catch(() => {});
  }, [router]);

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.price || !form.duration || !form.instructor) {
      setMsg({ type:'error', text:'Lengkapi semua field yang wajib diisi (*).' });
      return;
    }
    setSaving(true); setMsg(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/api/affiliate/submit-class`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), maxParticipants: parseInt(form.maxParticipants)||20 }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg({ type:'success', text:'Kelas berhasil diajukan! Tim admin akan mereview dalam 3-5 hari kerja.' });
        setForm({ title:'', category:'Career Booster', description:'', longDesc:'', price:'', duration:'', maxParticipants:'', instructor:'', instructorBio:'', curriculum:'', deliverables:'', prerequisites:'', sampleSchedule:'', thumbnailUrl:'', promoVideoUrl:'' });
      } else {
        setMsg({ type:'error', text: data.message || 'Gagal mengajukan kelas.' });
      }
    } catch { setMsg({ type:'error', text:'Terjadi kesalahan. Coba lagi.' }); }
    finally { setSaving(false); }
  };

  return (
    <div style={{ minHeight:'100vh', background:'#F9FAFB', fontFamily:'var(--font-body)' }}>
      <header style={{ background:'#fff', borderBottom:'1px solid #E5E7EB', padding:'0 48px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100, boxShadow:'0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <Link href="/affiliate/affiliate-dashboard" style={{ display:'flex', alignItems:'center', gap:'6px', color:'#1E40FF', fontWeight:'600', fontSize:'13px', textDecoration:'none' }}>
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <h1 style={{ fontSize:'16px', fontWeight:'700', color:'#111827', margin:0 }}>Ajukan Kelas Baru</h1>
        </div>
        <AffiliateHeaderActions user={{ name: user?.name, email: user?.email }} />
      </header>

      <main style={{ maxWidth:'720px', margin:'0 auto', padding:'40px 24px' }}>
        {/* Revenue info banner */}
        <div style={{ background:'linear-gradient(135deg, rgba(30,64,255,0.06), rgba(59,130,246,0.04))', border:'1.5px solid rgba(30,64,255,0.15)', borderRadius:'14px', padding:'20px 24px', marginBottom:'28px' }}>
          <p style={{ fontSize:'15px', fontWeight:'800', color:'#1E40FF', margin:'0 0 6px' }}>💰 Bagi Hasil: 70% untuk kamu, 30% untuk platform</p>
          <p style={{ fontSize:'13px', color:'#475569', margin:0, lineHeight:1.6 }}>
            Setiap pembelian kelas akan dibagi otomatis: <strong>70% langsung ke rekening kamu</strong> (setelah 7 hari validasi), 30% untuk operasional platform InstaJob. Transfer setiap Jumat.
          </p>
          <div style={{ display:'flex', gap:'12px', marginTop:'12px' }}>
            <div style={{ flex:1, background:'rgba(30,64,255,0.08)', borderRadius:'8px', padding:'10px 14px', textAlign:'center' }}>
              <p style={{ fontSize:'22px', fontWeight:'900', color:'#1E40FF', margin:0 }}>70%</p>
              <p style={{ fontSize:'11px', color:'#64748B', margin:0, fontWeight:'600' }}>Pembuat Kelas</p>
            </div>
            <div style={{ flex:1, background:'rgba(100,116,139,0.06)', borderRadius:'8px', padding:'10px 14px', textAlign:'center' }}>
              <p style={{ fontSize:'22px', fontWeight:'900', color:'#64748B', margin:0 }}>30%</p>
              <p style={{ fontSize:'11px', color:'#64748B', margin:0, fontWeight:'600' }}>Platform InstaJob</p>
            </div>
          </div>
        </div>

        {/* Approval info */}
        <div style={{ background:'#FEF9C3', border:'1px solid #FDE047', borderRadius:'10px', padding:'12px 16px', marginBottom:'24px' }}>
          <p style={{ fontSize:'12px', color:'#713F12', margin:0, fontWeight:'600' }}>
            ⚠️ Kelas yang kamu ajukan akan direview oleh admin 3-5 hari kerja. Setelah disetujui, kelas akan otomatis muncul di halaman Add-ons untuk member.
          </p>
        </div>

        {msg && (
          <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'12px 16px', borderRadius:'10px', marginBottom:'20px', background: msg.type==='success' ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border:`1px solid ${msg.type==='success'?'#10B981':'#EF4444'}` }}>
            {msg.type==='success' ? <CheckCircle size={16} color="#10B981" /> : <AlertCircle size={16} color="#EF4444" />}
            <p style={{ fontSize:'13px', color: msg.type==='success'?'#065F46':'#991B1B', margin:0, fontWeight:'600' }}>{msg.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'24px', display:'flex', flexDirection:'column', gap:'16px' }}>
            <h3 style={{ fontSize:'14px', fontWeight:'800', color:'#111827', margin:0, borderBottom:'1px solid #F3F4F6', paddingBottom:'10px' }}>Informasi Dasar</h3>
            <div><label style={LABEL}>Judul Kelas *</label><input value={form.title} onChange={f('title')} placeholder="Contoh: Kelas CV Booster — ATS Ready" style={INPUT} required /></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
              <div>
                <label style={LABEL}>Kategori *</label>
                <select value={form.category} onChange={f('category')} style={INPUT}>
                  <option>Career Booster</option>
                  <option>Interview Prep</option>
                  <option>Portfolio</option>
                  <option>Skill Upgrade</option>
                  <option>Other</option>
                </select>
              </div>
              <div><label style={LABEL}>Durasi * (cth: 2 jam)</label><input value={form.duration} onChange={f('duration')} placeholder="2 jam" style={INPUT} required /></div>
            </div>
            <div><label style={LABEL}>Deskripsi Singkat * (1-2 kalimat)</label><input value={form.description} onChange={f('description')} placeholder="Ringkasan singkat kelas untuk ditampilkan di card add-on" style={INPUT} required /></div>
            <div><label style={LABEL}>Deskripsi Lengkap *</label><textarea value={form.longDesc} onChange={f('longDesc')} rows={4} placeholder="Jelaskan detail kelas: apa yang akan dipelajari, metode pembelajaran, outcome..." style={{ ...INPUT, resize:'vertical' }} /></div>
          </div>

          <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'24px', display:'flex', flexDirection:'column', gap:'16px' }}>
            <h3 style={{ fontSize:'14px', fontWeight:'800', color:'#111827', margin:0, borderBottom:'1px solid #F3F4F6', paddingBottom:'10px' }}>Instruktur & Konten</h3>
            <div><label style={LABEL}>Nama Instruktur *</label><input value={form.instructor} onChange={f('instructor')} placeholder="Nama lengkap instruktur" style={INPUT} required /></div>
            <div><label style={LABEL}>Bio Instruktur</label><textarea value={form.instructorBio} onChange={f('instructorBio')} rows={3} placeholder="Pengalaman, latar belakang, dan keahlian instruktur..." style={{ ...INPUT, resize:'vertical' }} /></div>
            <div><label style={LABEL}>Kurikulum / Materi (pisahkan per baris)</label><textarea value={form.curriculum} onChange={f('curriculum')} rows={5} placeholder={"Sesi 1: Anatomi CV\nSesi 2: ATS Optimization\nSesi 3: Workshop Live\nSesi 4: Q&A"} style={{ ...INPUT, resize:'vertical' }} /></div>
            <div><label style={LABEL}>Yang Peserta Dapatkan</label><textarea value={form.deliverables} onChange={f('deliverables')} rows={3} placeholder={"Template CV premium\nRekaman kelas\nCertificate of completion"} style={{ ...INPUT, resize:'vertical' }} /></div>
            <div><label style={LABEL}>Prasyarat (jika ada)</label><input value={form.prerequisites} onChange={f('prerequisites')} placeholder="Cth: Tidak ada / Peserta sudah memiliki CV dasar" style={INPUT} /></div>
          </div>

          <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'24px', display:'flex', flexDirection:'column', gap:'16px' }}>
            <h3 style={{ fontSize:'14px', fontWeight:'800', color:'#111827', margin:0, borderBottom:'1px solid #F3F4F6', paddingBottom:'10px' }}>Jadwal & Harga</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
              <div><label style={LABEL}>Harga (Rp) *</label><input type="number" value={form.price} onChange={f('price')} placeholder="60000" style={INPUT} required /></div>
              <div><label style={LABEL}>Maks Peserta per Sesi</label><input type="number" value={form.maxParticipants} onChange={f('maxParticipants')} placeholder="20" style={INPUT} /></div>
            </div>
            <div><label style={LABEL}>Contoh Jadwal Sesi (opsional)</label><textarea value={form.sampleSchedule} onChange={f('sampleSchedule')} rows={3} placeholder={"Sabtu, 09:00-11:00 WIB\nMinggu, 13:00-15:00 WIB\n(Admin akan konfirmasi tanggal final)"} style={{ ...INPUT, resize:'vertical' }} /></div>
          </div>

          <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'24px', display:'flex', flexDirection:'column', gap:'16px' }}>
            <h3 style={{ fontSize:'14px', fontWeight:'800', color:'#111827', margin:0, borderBottom:'1px solid #F3F4F6', paddingBottom:'10px' }}>Media (opsional)</h3>
            <div><label style={LABEL}>URL Thumbnail / Cover Kelas</label><input value={form.thumbnailUrl} onChange={f('thumbnailUrl')} placeholder="https://..." style={INPUT} /></div>
            <div><label style={LABEL}>URL Promo Video (YouTube/Drive)</label><input value={form.promoVideoUrl} onChange={f('promoVideoUrl')} placeholder="https://youtube.com/..." style={INPUT} /></div>
          </div>

          <button type="submit" disabled={saving} style={{ padding:'14px', background: saving ? '#9CA3AF' : 'linear-gradient(135deg, #1E3A8A, #1E40FF)', color:'#fff', border:'none', borderRadius:'12px', fontWeight:'700', fontSize:'14px', cursor: saving ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', fontFamily:'var(--font-body)', letterSpacing:'0.02em' }}>
            {saving ? <><Loader size={16} /> Mengirim...</> : '🚀 Ajukan Kelas ke Admin'}
          </button>
        </form>
      </main>
    </div>
  );
}
