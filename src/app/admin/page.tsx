'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
const hdr = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('instajob_token') || '' : ''}` });
const fmt = (n: number) => `Rp ${(n||0).toLocaleString('id-ID')}`;
const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('id-ID') : '—';

const TABS = ['Overview','Members','Affiliates','Add-ons','Vouchers','Tokens'] as const;
type Tab = typeof TABS[number];

const S = {
  th: { padding:'10px 14px', textAlign:'left' as const, fontWeight:700, fontSize:12, background:'#F1F5F9', borderBottom:'1px solid #E5E7EB', color:'#475569' },
  td: { padding:'9px 14px', fontSize:13, borderBottom:'1px solid #F8FAFC', color:'#374151' },
  card: { background:'#fff', borderRadius:12, padding:'20px 24px', boxShadow:'0 1px 4px rgba(0,0,0,0.07)', marginBottom:16 },
  btn: { padding:'7px 14px', border:'none', borderRadius:8, cursor:'pointer', fontWeight:600, fontSize:12, fontFamily:'var(--font-body)' } as React.CSSProperties,
  inp: { padding:'8px 12px', border:'1.5px solid #E5E7EB', borderRadius:8, fontSize:13, width:'100%', boxSizing:'border-box' as const, fontFamily:'var(--font-body)' },
  label: { fontSize:12, fontWeight:700, color:'#475569', display:'block', marginBottom:4, textTransform:'uppercase' as const, letterSpacing:'0.4px' },
};

function Tbl({ cols, rows }: { cols:string[]; rows:(string|React.ReactNode)[][] }) {
  return (
    <div style={{overflowX:'auto'}}>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
        <thead><tr>{cols.map(c=><th key={c} style={S.th}>{c}</th>)}</tr></thead>
        <tbody>{rows.map((r,i)=><tr key={i} style={{background:i%2===0?'#fff':'#FAFAFA'}}>{r.map((c,j)=><td key={j} style={S.td}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function StatCard({label,value,color='#1E40FF'}:{label:string;value:string|number;color?:string}) {
  return (
    <div style={{...S.card,flex:'1 1 130px',marginBottom:0}}>
      <div style={{fontSize:11,color:'#94A3B8',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:6}}>{label}</div>
      <div style={{fontSize:26,fontWeight:900,color}}>{value}</div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('Overview');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);
  const [d, setD] = useState<any>({});
  const [msg, setMsg] = useState('');
  const [memberFilter, setMemberFilter] = useState('all');
  const [revNote, setRevNote] = useState<Record<string,string>>({});
  const [vForm, setVForm] = useState({code:'',discountType:'percent',discountValue:'',maxUsage:'',expiresAt:''});
  const [aForm, setAForm] = useState({title:'',category:'Career Booster',description:'',price:'',instructor:'',duration:'',maxParticipants:'20'});
  const [tForm, setTForm] = useState({userId:'',type:'career_booster',quantity:'1'});

  const load = useCallback(async (t:Tab) => {
    setLoading(true); setMsg('');
    const h = hdr();
    try {
      if (t==='Overview') {
        const [hR,uR,sR] = await Promise.all([
          fetch(`${API}/api/admin/health`,{headers:h}),
          fetch(`${API}/api/admin/users`,{headers:h}),
          fetch(`${API}/api/admin/subscriptions`,{headers:h}),
        ]);
        if (hR.status===403||uR.status===403){setErr('Akses ditolak. Pastikan ADMIN_IDS sudah diset di Railway.');setLoading(false);return;}
        const health = hR.ok?await hR.json():null;
        const users = uR.ok?(await uR.json()).users||[]:[];
        const subs = sR.ok?await sR.json():null;
        setD((p:any)=>({...p,health,users,subs}));
      } else if (t==='Members') {
        const r = await fetch(`${API}/api/admin/users`,{headers:h});
        if(r.ok){const x=await r.json();setD((p:any)=>({...p,users:x.users||[]}));}
      } else if (t==='Affiliates') {
        const [aR,pR]=await Promise.all([fetch(`${API}/api/admin/affiliates`,{headers:h}),fetch(`${API}/api/admin/payouts`,{headers:h})]);
        setD((p:any)=>({...p,affiliates:aR.ok?(await aR.json()).affiliates||[]:[], payouts:pR.ok?(await pR.json()).payouts||[]:[] }));
      } else if (t==='Add-ons') {
        const r=await fetch(`${API}/api/admin/addons/submissions`,{headers:h});
        setD((p:any)=>({...p,submissions:r.ok?(await r.json()).submissions||[]:[] }));
      } else if (t==='Vouchers') {
        const r=await fetch(`${API}/api/admin/vouchers`,{headers:h});
        setD((p:any)=>({...p,vouchers:r.ok?(await r.json()).vouchers||[]:[] }));
      } else if (t==='Tokens') {
        const [eR,cR,uR]=await Promise.all([
          fetch(`${API}/api/admin/tokens?type=extension`,{headers:h}),
          fetch(`${API}/api/admin/tokens?type=career_booster`,{headers:h}),
          fetch(`${API}/api/admin/users`,{headers:h}),
        ]);
        setD((p:any)=>({...p,
          extTokens:eR.ok?(await eR.json()).tokens||[]:[],
          cbTokens:cR.ok?(await cR.json()).tokens||[]:[],
          users:uR.ok?(await uR.json()).users||[]:[],
        }));
      }
    } catch { setMsg('Gagal load data.'); }
    finally { setLoading(false); }
  },[]);

  useEffect(()=>{
    const tok=localStorage.getItem('instajob_token');
    if(!tok){router.push('/login');return;}
    load('Overview');
  },[load,router]);

  useEffect(()=>{load(tab);},[tab,load]);

  const act = async(url:string,method='POST',body?:object)=>{
    setMsg('');
    try {
      const r=await fetch(`${API}${url}`,{method,headers:hdr(),body:body?JSON.stringify(body):undefined});
      const x=await r.json().catch(()=>({}));
      setMsg(r.ok?(x.message||'Berhasil!'):(x.error||x.message||'Gagal.'));
      load(tab);
    } catch { setMsg('Error.'); }
  };

  if(err) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#F8FAFC',flexDirection:'column',gap:12}}>
      <div style={{color:'#EF4444',fontWeight:700,fontSize:16}}>{err}</div>
      <button onClick={()=>router.push('/dashboard')} style={{...S.btn,background:'#1E40FF',color:'#fff'}}>Kembali</button>
    </div>
  );

  const users:any[]=d.users||[];
  const filteredUsers=memberFilter==='all'?users:users.filter((u:any)=>u.subscriptionType===memberFilter);
  const affiliates:any[]=d.affiliates||[];
  const payouts:any[]=d.payouts||[];
  const submissions:any[]=d.submissions||[];
  const vouchers:any[]=d.vouchers||[];

  return (
    <div style={{display:'flex',minHeight:'100vh'}}>
      {/* Sidebar */}
      <aside style={{width:200,background:'#1E293B',position:'fixed',top:0,left:0,bottom:0,zIndex:50,display:'flex',flexDirection:'column'}}>
        <div style={{padding:'20px 16px 16px',borderBottom:'1px solid #334155'}}>
          <Logo size={26} showText />
          <div style={{fontSize:10,color:'#64748B',marginTop:4,fontWeight:700,letterSpacing:'0.5px'}}>ADMIN PANEL</div>
        </div>
        <nav style={{flex:1,paddingTop:8}}>
          {TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{
              display:'block',width:'100%',textAlign:'left',padding:'10px 16px',
              border:'none',cursor:'pointer',fontSize:13,fontWeight:600,
              background:tab===t?'#1E40FF':'transparent',
              color:tab===t?'#fff':'#94A3B8',
              transition:'all 0.15s',fontFamily:'var(--font-body)',
            }}>{t}</button>
          ))}
        </nav>
        <div style={{padding:16}}>
          <button onClick={()=>{localStorage.removeItem('instajob_token');router.push('/login');}}
            style={{...S.btn,background:'rgba(239,68,68,0.15)',color:'#EF4444',width:'100%',fontSize:12}}>Logout</button>
        </div>
      </aside>

      {/* Content */}
      <main style={{marginLeft:200,flex:1,background:'#F8FAFC',minHeight:'100vh',padding:32}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <h1 style={{fontSize:20,fontWeight:800,color:'#0F172A',margin:0}}>{tab}</h1>
          {msg&&<div style={{padding:'8px 14px',borderRadius:8,background:msg.includes('Berhasil')?'rgba(16,185,129,0.08)':'rgba(239,68,68,0.08)',color:msg.includes('Berhasil')?'#065F46':'#991B1B',fontSize:13,fontWeight:600}}>{msg}</div>}
        </div>
        {loading&&<div style={{color:'#94A3B8',fontSize:13}}>Memuat...</div>}

        {!loading&&<>
          {/* OVERVIEW */}
          {tab==='Overview'&&<>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:24}}>
              {d.health&&<>
                <StatCard label="Users" value={d.health.database?.users||0}/>
                <StatCard label="Jobs" value={d.health.database?.jobs||0} color="#8B5CF6"/>
                <StatCard label="Lamaran" value={d.health.database?.applications||0} color="#10B981"/>
                <StatCard label="Subs" value={d.health.database?.subscriptions||0} color="#F59E0B"/>
              </>}
              {d.subs&&<>
                <StatCard label="Free" value={d.subs.free||0} color="#64748B"/>
                <StatCard label="Pro" value={d.subs.pro||0} color="#3B82F6"/>
                <StatCard label="Premium" value={d.subs.premium||0} color="#8B5CF6"/>
              </>}
            </div>
            <div style={S.card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Recent Users</div>
              <Tbl cols={['Email','Nama','Plan','Level','Telegram','Bergabung']}
                rows={users.slice(0,10).map((u:any)=>[u.email,u.fullName,u.subscriptionType||'free',u.level||0,u.isTelegramLinked?'✅':'—',fmtDate(u.createdAt)])}/>
            </div>
          </>}

          {/* MEMBERS */}
          {tab==='Members'&&<>
            <div style={{display:'flex',gap:8,marginBottom:16}}>
              {['all','free','pro','premium'].map(f=><button key={f} onClick={()=>setMemberFilter(f)}
                style={{...S.btn,background:memberFilter===f?'#1E40FF':'#F1F5F9',color:memberFilter===f?'#fff':'#475569'}}>{f}</button>)}
            </div>
            <div style={S.card}>
              <Tbl cols={['Email','Nama','Plan','Level','Points','Telegram','Bergabung']}
                rows={filteredUsers.map((u:any)=>[u.email,u.fullName,u.subscriptionType||'free',u.level||0,u.points||0,u.isTelegramLinked?'✅':'—',fmtDate(u.createdAt)])}/>
            </div>
          </>}

          {/* AFFILIATES */}
          {tab==='Affiliates'&&<>
            <div style={S.card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Pending Approval ({affiliates.filter((a:any)=>a.status==='pending').length})</div>
              {affiliates.filter((a:any)=>a.status==='pending').length===0&&<p style={{color:'#94A3B8',fontSize:13}}>Tidak ada pending.</p>}
              {affiliates.filter((a:any)=>a.status==='pending').map((a:any)=>(
                <div key={a.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #F1F5F9'}}>
                  <div><div style={{fontWeight:700,fontSize:13}}>{a.name||a.fullName}</div><div style={{fontSize:12,color:'#64748B'}}>{a.email} · {fmtDate(a.createdAt)}</div></div>
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>act(`/api/admin/affiliates/${a.id}/approve`)} style={{...S.btn,background:'#10B981',color:'#fff'}}>Approve</button>
                    <button onClick={()=>act(`/api/admin/affiliates/${a.id}/reject`)} style={{...S.btn,background:'#EF4444',color:'#fff'}}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={S.card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Aktif ({affiliates.filter((a:any)=>a.status==='active').length})</div>
              <Tbl cols={['Nama','Email','Tier','Earnings','Code']}
                rows={affiliates.filter((a:any)=>a.status==='active').map((a:any)=>[a.name||a.fullName,a.email,a.tier||'—',fmt(a.totalEarnings||0),a.code||'—'])}/>
            </div>
            <div style={S.card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Transfer History</div>
              {payouts.length===0&&<p style={{color:'#94A3B8',fontSize:13}}>Belum ada payout.</p>}
              {payouts.map((p:any)=>(
                <div key={p.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #F1F5F9'}}>
                  <div><div style={{fontWeight:700,fontSize:13}}>{p.affiliateName||p.email}</div>
                    <div style={{fontSize:12,color:'#64748B'}}>{fmt(p.amount)} · {fmtDate(p.date||p.createdAt)} · <span style={{color:p.status==='paid'?'#10B981':'#F59E0B'}}>{p.status}</span></div>
                  </div>
                  {p.status!=='paid'&&<button onClick={()=>act(`/api/admin/payouts/${p.id}/mark-paid`,'PATCH')} style={{...S.btn,background:'#10B981',color:'#fff'}}>Mark Paid</button>}
                </div>
              ))}
            </div>
          </>}

          {/* ADD-ONS */}
          {tab==='Add-ons'&&<>
            <div style={S.card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Submissions ({submissions.length})</div>
              {submissions.length===0&&<p style={{color:'#94A3B8',fontSize:13}}>Tidak ada submission.</p>}
              {submissions.map((s:any)=>(
                <div key={s.id} style={{padding:'12px 0',borderBottom:'1px solid #F1F5F9'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:13}}>{s.title}</div>
                      <div style={{fontSize:12,color:'#64748B'}}>{s.instructor} · {fmt(s.price||0)} · {fmtDate(s.createdAt)} · <span style={{color:s.status==='approved'?'#10B981':s.status==='rejected'?'#EF4444':'#F59E0B'}}>{s.status}</span></div>
                    </div>
                    {s.status==='pending'&&(
                      <div style={{display:'flex',gap:8,alignItems:'center',flexShrink:0}}>
                        <input placeholder="Catatan revisi" value={revNote[s.id]||''} onChange={e=>setRevNote(p=>({...p,[s.id]:e.target.value}))}
                          style={{...S.inp,width:180,fontSize:12}}/>
                        <button onClick={()=>act(`/api/admin/addons/${s.id}/approve`)} style={{...S.btn,background:'#10B981',color:'#fff'}}>Approve</button>
                        <button onClick={()=>act(`/api/admin/addons/${s.id}/reject`,'POST',{note:revNote[s.id]||''})} style={{...S.btn,background:'#EF4444',color:'#fff'}}>Reject</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={S.card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>Tambah Kelas Langsung</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                {([['title','Judul *'],['instructor','Instruktur *'],['duration','Durasi'],['maxParticipants','Maks Peserta']] as [keyof typeof aForm,string][]).map(([k,lbl])=>(
                  <div key={k}><label style={S.label}>{lbl}</label><input value={aForm[k]} onChange={e=>setAForm(p=>({...p,[k]:e.target.value}))} style={S.inp}/></div>
                ))}
                <div><label style={S.label}>Kategori</label>
                  <select value={aForm.category} onChange={e=>setAForm(p=>({...p,category:e.target.value}))} style={S.inp}>
                    {['Career Booster','Interview Prep','Portfolio','Skill Upgrade','Other'].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={S.label}>Harga (Rp)</label><input type="number" value={aForm.price} onChange={e=>setAForm(p=>({...p,price:e.target.value}))} style={S.inp}/></div>
                <div style={{gridColumn:'1/-1'}}><label style={S.label}>Deskripsi</label><input value={aForm.description} onChange={e=>setAForm(p=>({...p,description:e.target.value}))} style={S.inp}/></div>
              </div>
              <button onClick={()=>{act('/api/admin/addons','POST',{...aForm,price:parseFloat(aForm.price),maxParticipants:parseInt(aForm.maxParticipants)});setAForm({title:'',category:'Career Booster',description:'',price:'',instructor:'',duration:'',maxParticipants:'20'});}}
                style={{...S.btn,background:'#1E40FF',color:'#fff',marginTop:14}}>Publish Kelas</button>
            </div>
          </>}

          {/* VOUCHERS */}
          {tab==='Vouchers'&&<>
            <div style={S.card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>Buat Voucher</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div><label style={S.label}>Kode *</label><input value={vForm.code} onChange={e=>setVForm(p=>({...p,code:e.target.value.toUpperCase()}))} placeholder="SUMMER25" style={S.inp}/></div>
                <div><label style={S.label}>Tipe</label>
                  <select value={vForm.discountType} onChange={e=>setVForm(p=>({...p,discountType:e.target.value}))} style={S.inp}>
                    <option value="percent">Persen (%)</option><option value="fixed">Fixed (Rp)</option>
                  </select>
                </div>
                <div><label style={S.label}>Nilai</label><input type="number" value={vForm.discountValue} onChange={e=>setVForm(p=>({...p,discountValue:e.target.value}))} style={S.inp}/></div>
                <div><label style={S.label}>Maks Penggunaan</label><input type="number" value={vForm.maxUsage} onChange={e=>setVForm(p=>({...p,maxUsage:e.target.value}))} style={S.inp}/></div>
                <div><label style={S.label}>Expired</label><input type="date" value={vForm.expiresAt} onChange={e=>setVForm(p=>({...p,expiresAt:e.target.value}))} style={S.inp}/></div>
              </div>
              <button onClick={()=>{act('/api/admin/vouchers','POST',{...vForm,discountValue:parseFloat(vForm.discountValue),maxUsage:parseInt(vForm.maxUsage)});setVForm({code:'',discountType:'percent',discountValue:'',maxUsage:'',expiresAt:''}); }}
                style={{...S.btn,background:'#1E40FF',color:'#fff',marginTop:14}}>Buat Voucher</button>
            </div>
            <div style={S.card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Daftar Voucher</div>
              {vouchers.length===0&&<p style={{color:'#94A3B8',fontSize:13}}>Belum ada voucher.</p>}
              <Tbl cols={['Kode','Tipe','Diskon','Used/Max','Expired','Status','Aksi']}
                rows={vouchers.map((v:any)=>[
                  v.code,v.discountType,v.discountType==='percent'?`${v.discountValue}%`:fmt(v.discountValue),
                  `${v.usedCount||0}/${v.maxUsage||'∞'}`,v.expiresAt?fmtDate(v.expiresAt):'—',
                  v.isActive?<span style={{color:'#10B981',fontWeight:700}}>Aktif</span>:<span style={{color:'#94A3B8',fontWeight:700}}>Nonaktif</span>,
                  <div key={v.id} style={{display:'flex',gap:6}}>
                    <button onClick={()=>act(`/api/admin/vouchers/${v.id}`,'PATCH',{isActive:!v.isActive})} style={{...S.btn,background:'#F59E0B',color:'#fff'}}>{v.isActive?'Nonaktifkan':'Aktifkan'}</button>
                    <button onClick={()=>act(`/api/admin/vouchers/${v.id}`,'DELETE')} style={{...S.btn,background:'#EF4444',color:'#fff'}}>Hapus</button>
                  </div>
                ])}/>
            </div>
          </>}

          {/* TOKENS */}
          {tab==='Tokens'&&<>
            <div style={S.card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>Generate Token</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 120px',gap:12,marginBottom:14}}>
                <div><label style={S.label}>User</label>
                  <select value={tForm.userId} onChange={e=>setTForm(p=>({...p,userId:e.target.value}))} style={S.inp}>
                    <option value="">Pilih user...</option>
                    {users.map((u:any)=><option key={u.id} value={u.id}>{u.fullName} ({u.email})</option>)}
                  </select>
                </div>
                <div><label style={S.label}>Tipe</label>
                  <select value={tForm.type} onChange={e=>setTForm(p=>({...p,type:e.target.value}))} style={S.inp}>
                    <option value="career_booster">Career Booster</option>
                    <option value="extension">Extension Chrome</option>
                  </select>
                </div>
                <div><label style={S.label}>Jumlah</label><input type="number" min="1" value={tForm.quantity} onChange={e=>setTForm(p=>({...p,quantity:e.target.value}))} style={S.inp}/></div>
              </div>
              <button onClick={()=>{if(!tForm.userId){setMsg('Pilih user dulu.');return;}act('/api/admin/tokens/generate','POST',{userId:tForm.userId,type:tForm.type,quantity:parseInt(tForm.quantity)});}}
                style={{...S.btn,background:'#1E40FF',color:'#fff'}}>Generate Token</button>
            </div>
            <div style={S.card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Extension Tokens</div>
              {(d.extTokens||[]).length===0&&<p style={{color:'#94A3B8',fontSize:13}}>Tidak ada data.</p>}
              <Tbl cols={['User ID','Email','Token (truncated)','Dibuat','Last Used']}
                rows={(d.extTokens||[]).map((t:any)=>[t.userId,t.email||'—',<code style={{fontSize:11}}>{(t.tokenValue||'').substring(0,24)}...</code>,fmtDate(t.createdAt),t.lastUsed?fmtDate(t.lastUsed):'—'])}/>
            </div>
            <div style={S.card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Career Booster Tokens</div>
              {(d.cbTokens||[]).length===0&&<p style={{color:'#94A3B8',fontSize:13}}>Tidak ada data.</p>}
              <Tbl cols={['User ID','Email','Total','Digunakan','Dibuat']}
                rows={(d.cbTokens||[]).map((t:any)=>[t.userId,t.email||'—',t.quantity||0,t.used||0,fmtDate(t.createdAt)])}/>
            </div>
          </>}
        </>}
      </main>
    </div>
  );
}
