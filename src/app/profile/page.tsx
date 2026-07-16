'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, FileText, Upload, ArrowLeft, Save, X, Loader, CheckCircle, Camera, Plus, Trash2 } from 'lucide-react';

interface ExperienceEntry { title: string; company: string; years: number; }
interface EducationEntry { degree: string; field: string; }
interface CertEntry { name: string; issuer: string; }
interface PortfolioEntry { title: string; url: string; }

interface ProfileUser {
  id: string; email: string; fullName: string;
  bio?: string; phone?: string; location?: string; profilePicture?: string;
  website?: string; linkedIn?: string;
  skills?: string[];
  experience?: ExperienceEntry[];
  education?: EducationEntry[];
  certifications?: CertEntry[];
  portfolio?: PortfolioEntry[];
}

const API = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
const INPUT_STYLE: React.CSSProperties = { width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', background: '#FFFFFF', fontFamily: 'inherit', boxSizing: 'border-box' };
const LABEL_STYLE: React.CSSProperties = { fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' };
const CARD_STYLE: React.CSSProperties = { background: '#F8FAFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', marginBottom: '12px', position: 'relative' };
const ADD_BTN: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: '600', color: '#0051FF', background: 'rgba(0,81,255,0.06)', border: '1px dashed rgba(0,81,255,0.3)', borderRadius: '8px', cursor: 'pointer', marginTop: '8px' };
const DEL_BTN: React.CSSProperties = { position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '2px' };
const HINT: React.CSSProperties = { fontSize: '12px', color: '#94A3B8', marginTop: '4px' };

function parseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<ProfileUser>({ id: '', email: '', fullName: '' });
  const [formData, setFormData] = useState<ProfileUser>({ id: '', email: '', fullName: '' });
  const [skillsInput, setSkillsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isParsingCV, setIsParsingCV] = useState(false);
  const [cvMsg, setCvMsg] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>();
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const cvRef = useRef<HTMLInputElement>(null);
  const picRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const token = localStorage.getItem('instajob_token');
    if (!token) { router.push('/login'); return; }
    fetch(`${API}/api/user/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { if (r.status === 401) { router.push('/login'); return null; } return r.json(); })
      .then(data => {
        if (!data) return;
        const p = data.profile || {};
        const d: ProfileUser = {
          id: data.id, email: data.email, fullName: data.fullName,
          phone: p.phone || '', location: p.location || '', bio: p.bio || '',
          skills: parseJson<string[]>(p.skills, []),
          experience: parseJson<ExperienceEntry[]>(p.experience, []),
          education: parseJson<EducationEntry[]>(p.education, []),
          certifications: parseJson<CertEntry[]>(p.certifications, []),
          portfolio: parseJson<PortfolioEntry[]>(p.portfolio, []),
          profilePicture: p.profilePicture,
          website: p.website || '',
          linkedIn: p.linkedIn || '',
        };
        setUser(d); setFormData(d);
        setSkillsInput((d.skills || []).join(', '));
        if (p.profilePicture) setProfileImageUrl(p.profilePicture);
      }).catch(console.error);
  }, [router]);

  const setField = (field: keyof ProfileUser, val: any) => setFormData(p => ({ ...p, [field]: val }));

  // Experience helpers
  const addExp = () => setField('experience', [...(formData.experience || []), { title: '', company: '', years: 0 }]);
  const updExp = (i: number, k: keyof ExperienceEntry, v: string | number) => {
    const arr = [...(formData.experience || [])];
    arr[i] = { ...arr[i], [k]: k === 'years' ? Number(v) : v };
    setField('experience', arr);
  };
  const delExp = (i: number) => setField('experience', (formData.experience || []).filter((_, j) => j !== i));

  // Education helpers
  const addEdu = () => setField('education', [...(formData.education || []), { degree: '', field: '' }]);
  const updEdu = (i: number, k: keyof EducationEntry, v: string) => {
    const arr = [...(formData.education || [])];
    arr[i] = { ...arr[i], [k]: v };
    setField('education', arr);
  };
  const delEdu = (i: number) => setField('education', (formData.education || []).filter((_, j) => j !== i));

  // Cert helpers
  const addCert = () => setField('certifications', [...(formData.certifications || []), { name: '', issuer: '' }]);
  const updCert = (i: number, k: keyof CertEntry, v: string) => {
    const arr = [...(formData.certifications || [])];
    arr[i] = { ...arr[i], [k]: v };
    setField('certifications', arr);
  };
  const delCert = (i: number) => setField('certifications', (formData.certifications || []).filter((_, j) => j !== i));

  // Portfolio helpers
  const addPort = () => setField('portfolio', [...(formData.portfolio || []), { title: '', url: '' }]);
  const updPort = (i: number, k: keyof PortfolioEntry, v: string) => {
    const arr = [...(formData.portfolio || [])];
    arr[i] = { ...arr[i], [k]: v };
    setField('portfolio', arr);
  };
  const delPort = (i: number) => setField('portfolio', (formData.portfolio || []).filter((_, j) => j !== i));

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const token = localStorage.getItem('instajob_token');
    if (!token) { router.push('/login'); return; }
    setIsParsingCV(true); setCvMsg('');
    const fd = new FormData(); fd.append('file', file);
    try {
      const res = await fetch(`${API}/api/user/resume/parse`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      const json = await res.json();
      if (!res.ok) { setCvMsg(json.error || 'Gagal parsing CV'); return; }
      const p = json.data || {};
      setFormData(prev => ({
        ...prev,
        ...(p.fullName && { fullName: p.fullName }),
        ...(p.phone && { phone: p.phone }),
        ...(p.location && { location: p.location }),
        ...(Array.isArray(p.skills) && p.skills.length > 0 && { skills: p.skills }),
        ...(Array.isArray(p.experience) && p.experience.length > 0 && { experience: p.experience }),
        ...(Array.isArray(p.education) && p.education.length > 0 && { education: p.education }),
        ...(Array.isArray(p.certifications) && p.certifications.length > 0 && { certifications: p.certifications }),
        ...(Array.isArray(p.portfolio) && p.portfolio.length > 0 && { portfolio: p.portfolio }),
      }));
      if (Array.isArray(p.skills) && p.skills.length > 0) setSkillsInput(p.skills.join(', '));
      setCvMsg('CV berhasil diparsing! Cek dan lengkapi data di bawah.');
    } catch { setCvMsg('Network error. Coba lagi.'); }
    finally { setIsParsingCV(false); if (cvRef.current) cvRef.current.value = ''; }
  };

  const handlePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const url = ev.target?.result as string;
      setProfileImageUrl(url);
      setFormData(p => ({ ...p, profilePicture: url }));
      setUser(p => ({ ...p, profilePicture: url }));
    };
    reader.readAsDataURL(file);
    if (picRef.current) picRef.current.value = '';
  };

  const handleSave = async () => {
    const token = localStorage.getItem('instajob_token');
    if (!token) { router.push('/login'); return; }
    setIsSaving(true); setSaveSuccess(false);
    try {
      const res = await fetch(`${API}/api/user/profile`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone || null,
          location: formData.location || null,
          bio: formData.bio || null,
          skills: formData.skills || [],
          experience: formData.experience || [],
          education: formData.education || [],
          certifications: formData.certifications || [],
          portfolio: formData.portfolio || [],
          website: formData.website || null,
          linkedIn: formData.linkedIn || null,
        }),
      });
      if (res.status === 401) { router.push('/login'); return; }
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const errMsg = errData.error || errData.message || `HTTP ${res.status}: Gagal simpan profil`;
        showToast(errMsg, 'error');
        console.error('Save error:', errMsg);
        setIsSaving(false);
        return;
      }
      setUser(formData); setSaveSuccess(true);
      showToast('Profil berhasil tersimpan! ✓', 'success');
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error('Save error:', err);
      showToast(err.message || 'Terjadi kesalahan saat simpan profil', 'error');
    }
    finally { setIsSaving(false); }
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => e.currentTarget.style.borderColor = '#0051FF';
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', color: '#1E293B', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button onClick={() => router.push('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
            <ArrowLeft size={16} /> Kembali
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#1E293B' }}>Profil Saya</h1>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>Lengkapi profil agar AI dapat mencarikan pekerjaan terbaik untukmu</p>
          </div>
        </div>

        {/* CV Upload */}
        <div style={{ marginBottom: '32px', padding: '20px', background: 'rgba(0,81,255,0.04)', border: '2px dashed rgba(0,81,255,0.25)', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(0,81,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Upload size={20} color="#0051FF" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 2px 0', fontSize: '15px', fontWeight: '700', color: '#1E293B' }}>Upload CV / Resume</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                {isParsingCV ? 'Sedang parsing CV...' : 'Upload PDF — AI akan otomatis mengisi semua kolom di bawah'}
              </p>
              {cvMsg && <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: cvMsg.includes('berhasil') ? '#10B981' : '#EF4444' }}>{cvMsg}</p>}
            </div>
            <button onClick={() => cvRef.current?.click()} disabled={isParsingCV}
              style={{ padding: '10px 18px', fontSize: '14px', fontWeight: '600', color: '#FFFFFF', background: isParsingCV ? '#94A3B8' : '#0051FF', border: 'none', borderRadius: '8px', cursor: isParsingCV ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
              {isParsingCV ? <Loader size={15} /> : <Upload size={15} />}
              {isParsingCV ? 'Parsing...' : 'Pilih File'}
            </button>
          </div>
          <input ref={cvRef} type="file" accept=".pdf" onChange={handleCVUpload} style={{ display: 'none' }} />
        </div>

        {/* Profile Picture */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', padding: '20px', background: '#F8FAFF', borderRadius: '12px' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => picRef.current?.click()}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: profileImageUrl ? 'transparent' : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '3px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              {profileImageUrl ? <img src={profileImageUrl} alt="foto profil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={32} color="#94A3B8" />}
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderRadius: '50%', background: '#0051FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Camera size={13} color="white" />
            </div>
          </div>
          <div>
            <p style={{ margin: '0 0 2px 0', fontWeight: '700', color: '#1E293B', fontSize: '16px' }}>{formData.fullName || 'Nama Lengkap'}</p>
            <p style={{ margin: 0, color: '#64748B', fontSize: '14px' }}>{formData.email}</p>
            <button onClick={() => picRef.current?.click()} style={{ marginTop: '6px', fontSize: '12px', color: '#0051FF', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: '600' }}>
              Ganti foto profil
            </button>
          </div>
          <input ref={picRef} type="file" accept="image/*" onChange={handlePicUpload} style={{ display: 'none' }} />
        </div>

        {/* Basic Info */}
        <Section title="Informasi Dasar">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Field label="Nama Lengkap" hint="Contoh: Budi Santoso">
              <input style={INPUT_STYLE} value={formData.fullName || ''} onChange={e => setField('fullName', e.target.value)} placeholder="Budi Santoso" onFocus={focusStyle} onBlur={blurStyle} />
            </Field>
            <Field label="Nomor HP" hint="Contoh: +62 812 3456 7890">
              <input style={INPUT_STYLE} value={formData.phone || ''} onChange={e => setField('phone', e.target.value)} placeholder="+62 812 3456 7890" onFocus={focusStyle} onBlur={blurStyle} />
            </Field>
            <Field label="Lokasi" hint="Contoh: Jakarta Selatan, Indonesia">
              <input style={INPUT_STYLE} value={formData.location || ''} onChange={e => setField('location', e.target.value)} placeholder="Jakarta Selatan, Indonesia" onFocus={focusStyle} onBlur={blurStyle} />
            </Field>
            <Field label="LinkedIn URL" hint="Contoh: https://linkedin.com/in/namaanda">
              <input style={INPUT_STYLE} value={formData.linkedIn || ''} onChange={e => setField('linkedIn', e.target.value)} placeholder="https://linkedin.com/in/namaanda" onFocus={focusStyle} onBlur={blurStyle} />
            </Field>
            <Field label="Website / Portfolio URL" hint="Contoh: https://namaanda.dev">
              <input style={INPUT_STYLE} value={formData.website || ''} onChange={e => setField('website', e.target.value)} placeholder="https://namaanda.dev" onFocus={focusStyle} onBlur={blurStyle} />
            </Field>
          </div>
        </Section>

        {/* Skills */}
        <Section title="Keahlian / Skills">
          <Field label="Skills teknis (pisahkan dengan koma)" hint="Contoh: React, Node.js, TypeScript, Docker, PostgreSQL">
            <input style={INPUT_STYLE} value={skillsInput}
              onChange={e => setSkillsInput(e.target.value)}
              onBlur={e => {
                const skills = e.target.value.split(/[,]+/).map(s => s.trim()).filter(Boolean);
                setField('skills', skills); blurStyle(e);
              }}
              placeholder="React, Node.js, TypeScript, Docker, PostgreSQL..."
              onFocus={focusStyle} />
          </Field>
          {(formData.skills || []).length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
              {(formData.skills || []).map((s, i) => (
                <span key={i} style={{ padding: '4px 10px', background: 'rgba(0,81,255,0.08)', color: '#0051FF', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>{s}</span>
              ))}
            </div>
          )}
        </Section>

        {/* Experience */}
        <Section title="Pengalaman Kerja">
          <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748B' }}>Tambahkan semua pengalaman kerja kamu — bisa lebih dari satu.</p>
          {(formData.experience || []).map((exp, i) => (
            <div key={i} style={CARD_STYLE}>
              <button style={DEL_BTN} onClick={() => delExp(i)}><Trash2 size={15} /></button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: '12px' }}>
                <Field label="Jabatan / Posisi" hint="Contoh: Senior Frontend Engineer">
                  <input style={INPUT_STYLE} value={exp.title} onChange={e => updExp(i, 'title', e.target.value)} placeholder="Senior Frontend Engineer" onFocus={focusStyle} onBlur={blurStyle} />
                </Field>
                <Field label="Nama Perusahaan" hint="Contoh: PT Tokopedia">
                  <input style={INPUT_STYLE} value={exp.company} onChange={e => updExp(i, 'company', e.target.value)} placeholder="PT Tokopedia" onFocus={focusStyle} onBlur={blurStyle} />
                </Field>
                <Field label="Lama (tahun)" hint="Contoh: 3">
                  <input style={INPUT_STYLE} type="number" min="0" max="50" value={exp.years || ''} onChange={e => updExp(i, 'years', e.target.value)} placeholder="3" onFocus={focusStyle} onBlur={blurStyle} />
                </Field>
              </div>
            </div>
          ))}
          <button style={ADD_BTN} onClick={addExp}><Plus size={14} /> Tambah Pengalaman</button>
        </Section>

        {/* Education */}
        <Section title="Pendidikan">
          <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748B' }}>Tambahkan semua riwayat pendidikan kamu.</p>
          {(formData.education || []).map((edu, i) => (
            <div key={i} style={CARD_STYLE}>
              <button style={DEL_BTN} onClick={() => delEdu(i)}><Trash2 size={15} /></button>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '12px' }}>
                <Field label="Jenjang Pendidikan" hint="Contoh: S1, S2, D3, SMA">
                  <input style={INPUT_STYLE} value={edu.degree} onChange={e => updEdu(i, 'degree', e.target.value)} placeholder="S1" onFocus={focusStyle} onBlur={blurStyle} />
                </Field>
                <Field label="Jurusan / Bidang Studi" hint="Contoh: Teknik Informatika, Manajemen Bisnis">
                  <input style={INPUT_STYLE} value={edu.field} onChange={e => updEdu(i, 'field', e.target.value)} placeholder="Teknik Informatika" onFocus={focusStyle} onBlur={blurStyle} />
                </Field>
              </div>
            </div>
          ))}
          <button style={ADD_BTN} onClick={addEdu}><Plus size={14} /> Tambah Pendidikan</button>
        </Section>

        {/* Certifications */}
        <Section title="Sertifikasi (Opsional)">
          <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748B' }}>Contoh: AWS Certified, Google Analytics, TOEFL.</p>
          {(formData.certifications || []).map((cert, i) => (
            <div key={i} style={CARD_STYLE}>
              <button style={DEL_BTN} onClick={() => delCert(i)}><Trash2 size={15} /></button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Field label="Nama Sertifikasi" hint="Contoh: AWS Solutions Architect">
                  <input style={INPUT_STYLE} value={cert.name} onChange={e => updCert(i, 'name', e.target.value)} placeholder="AWS Solutions Architect" onFocus={focusStyle} onBlur={blurStyle} />
                </Field>
                <Field label="Penerbit / Issuer" hint="Contoh: Amazon Web Services">
                  <input style={INPUT_STYLE} value={cert.issuer} onChange={e => updCert(i, 'issuer', e.target.value)} placeholder="Amazon Web Services" onFocus={focusStyle} onBlur={blurStyle} />
                </Field>
              </div>
            </div>
          ))}
          <button style={ADD_BTN} onClick={addCert}><Plus size={14} /> Tambah Sertifikasi</button>
        </Section>

        {/* Portfolio */}
        <Section title="Portfolio (Opsional)">
          <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748B' }}>Proyek atau karya terbaikmu. Contoh: GitHub repo, website, aplikasi.</p>
          {(formData.portfolio || []).map((item, i) => (
            <div key={i} style={CARD_STYLE}>
              <button style={DEL_BTN} onClick={() => delPort(i)}><Trash2 size={15} /></button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Field label="Nama Proyek" hint="Contoh: InstaJob Platform">
                  <input style={INPUT_STYLE} value={item.title} onChange={e => updPort(i, 'title', e.target.value)} placeholder="InstaJob Platform" onFocus={focusStyle} onBlur={blurStyle} />
                </Field>
                <Field label="Link URL" hint="Contoh: https://github.com/user/repo">
                  <input style={INPUT_STYLE} value={item.url} onChange={e => updPort(i, 'url', e.target.value)} placeholder="https://github.com/user/repo" onFocus={focusStyle} onBlur={blurStyle} />
                </Field>
              </div>
            </div>
          ))}
          <button style={ADD_BTN} onClick={addPort}><Plus size={14} /> Tambah Portfolio</button>
        </Section>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #E2E8F0' }}>
          <button onClick={() => setFormData(user)} style={{ padding: '12px 24px', fontSize: '14px', fontWeight: '600', color: '#64748B', background: 'transparent', border: '1px solid #CBD5E1', borderRadius: '8px', cursor: 'pointer' }}>
            Reset
          </button>
          <button onClick={handleSave} disabled={isSaving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', fontSize: '14px', fontWeight: '700', color: '#FFFFFF', background: isSaving ? '#94A3B8' : '#0051FF', border: 'none', borderRadius: '8px', cursor: isSaving ? 'not-allowed' : 'pointer' }}>
            {isSaving ? <Loader size={16} /> : saveSuccess ? <CheckCircle size={16} /> : <Save size={16} />}
            {isSaving ? 'Menyimpan...' : saveSuccess ? 'Tersimpan!' : 'Simpan Profil'}
          </button>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div style={{ position: 'fixed', bottom: '24px', right: '24px', padding: '16px 20px', background: toast.type === 'success' ? '#10B981' : '#EF4444', color: '#FFFFFF', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontSize: '14px', fontWeight: '600', zIndex: 9999, maxWidth: '400px' }}>
            {toast.msg}
          </div>
        )}

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '800', color: '#1E293B', borderBottom: '2px solid #EEF2FF', paddingBottom: '8px' }}>{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={LABEL_STYLE}>{label}</label>
      {children}
      {hint && <p style={HINT}>{hint}</p>}
    </div>
  );
}
