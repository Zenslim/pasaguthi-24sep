'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import PublicProfileCard from '@/components/PublicProfileCard';
type Pub={name:string|null; thar:string|null; region:string|null; photo:string|null};
export default function Guthyars(){
  const [rows,setRows]=useState<Pub[]>([]); const [loading,setLoading]=useState(true);
  useEffect(()=>{ (async()=>{
    const { data } = await supabase.from('guthyars').select('*').order('name');
    setRows((data??[]) as Pub[]); setLoading(false);
  })(); },[]);
  return (<div className="space-y-6">
    <h1 className="text-3xl font-bold">🧑‍🤝‍🧑 Guthyars (Public Directory)</h1>
    {loading? <div>Loading…</div> :
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rows.map((p,i)=><PublicProfileCard key={(p.name??'anon')+i} p={p}/>)}
      </div>}
    <p className="text-xs opacity-70">Public view exposes only: name, thar, region, photo.</p>
  </div>);
}
