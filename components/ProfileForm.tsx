'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
type Profile={ id:string; name:string|null; thar:string|null; region:string|null; skills:string[]|null; photo:string|null; guthi_key:string|null; phone:string|null; bioSig:string|null; };
export default function ProfileForm(){
  const [p,setP]=useState<Profile|null>(null); const [msg,setMsg]=useState<string|null>(null);
  useEffect(()=>{ (async()=>{
    const { data:{user} } = await supabase.auth.getUser();
    if(!user){ location.href='/signin'; return; }
    const { data } = await supabase.from('users').select('*').eq('id', user.id).maybeSingle();
    setP(data as any);
  })(); },[]);
  async function save(e:React.FormEvent){ e.preventDefault(); if(!p) return; setMsg(null);
    const { error } = await supabase.from('users').update(p).eq('id', p.id);
    setMsg(error? error.message : 'Saved ✅');
  }
  if(!p) return <div>Loading…</div>;
  return <form onSubmit={save} className="space-y-4 max-w-xl">
    {msg && <div className="card">{msg}</div>}
    <div><div className="label">Name</div><input className="input" value={p.name??''} onChange={e=>setP({...p!, name:e.target.value})}/></div>
    <div className="grid grid-cols-2 gap-3">
      <div><div className="label">Thar</div><input className="input" value={p.thar??''} onChange={e=>setP({...p!, thar:e.target.value})}/></div>
      <div><div className="label">Region</div><input className="input" value={p.region??''} onChange={e=>setP({...p!, region:e.target.value})}/></div>
    </div>
    <div><div className="label">Skills (comma separated)</div><input className="input" value={(p.skills??[]).join(', ')} onChange={e=>setP({...p!, skills:e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})}/></div>
    <div><div className="label">Photo URL</div><input className="input" value={p.photo??''} onChange={e=>setP({...p!, photo:e.target.value})}/></div>
    <div className="grid grid-cols-2 gap-3">
      <div><div className="label">Guthi Key</div><input className="input" value={p.guthi_key??''} onChange={e=>setP({...p!, guthi_key:e.target.value})}/></div>
      <div><div className="label">Phone (OTP recovery)</div><input className="input" value={p.phone??''} onChange={e=>setP({...p!, phone:e.target.value})}/></div>
    </div>
    <div><div className="label">BioSig</div><input className="input" value={p.bioSig??''} onChange={e=>setP({...p!, bioSig:e.target.value})}/></div>
    <button className="btn">Save</button>
  </form>;
}
