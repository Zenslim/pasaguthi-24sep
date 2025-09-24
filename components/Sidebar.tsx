'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { href:'/about', label:'What is Pasaguthi?', icon:'✨' },
  { href:'/guthi', label:'What is Guthi?', icon:'🔱' },
  { href:'/guthyars', label:'Our Members', icon:'🌿' },
  { href:'/nepalsambat', label:'Nepal Sambat Calendar', icon:'📅' },
  { href:'/whisper', label:'Whisper Something', icon:'🗣️' },
  { href:'/become', label:'Become a Member', icon:'🌞' },
  { divider:true },
  { href:'/vision', label:'Our Vision', icon:'🧭' },
  { href:'/how', label:'How Pasaguthi Works', icon:'📖' },
  { href:'/reflections', label:'Member Reflections', icon:'🪞' },
  { href:'/diaspora', label:'Diaspora Stories', icon:'🌏' },
  { href:'/faq', label:'Frequently Asked Questions', icon:'❓' },
  { divider:true },
  { href:'/signin', label:'LOGIN', icon:'🔒' },
];

export default function Sidebar(){
  const [open,setOpen]=useState(true);
  const pathname = usePathname();
  return (
    <aside className={clsx('fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 border-r border-white/10 bg-black/70 backdrop-blur overflow-y-auto transition-transform z-30',
      open? 'translate-x-0':'-translate-x-full')}>
      <div className="p-3 space-y-1">
        {links.map((l,i)=> l.divider? <hr key={'d'+i} className="border-white/10 my-2"/> :
          <Link key={l.href} href={l.href} className={clsx('sidebar-link', pathname===l.href && 'bg-white/10')}>
            <span>{l.icon}</span><span>{l.label}</span>
          </Link>
        )}
      </div>
      <button className="absolute -right-3 top-3 bg-white text-black rounded-full size-6 text-xs" onClick={()=>setOpen(!open)}>{open? '⟨':'⟩'}</button>
    </aside>
  );
}
