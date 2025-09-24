'use client';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

function useSpeech(){
  const recRef = useRef<SpeechRecognition|null>(null);
  const [listening,setListening]=useState(false);
  useEffect(()=>{
    const SR:any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if(SR){ recRef.current = new SR(); recRef.current.continuous=false; recRef.current.lang='en-US'; }
  },[]);
  function start(onResult:(t:string)=>void){
    if(!recRef.current) return alert('Speech not supported in this browser.');
    setListening(true);
    recRef.current!.onresult = (e:any)=>{
      const t = Array.from(e.results).map((r:any)=>r[0].transcript).join(' ');
      onResult(t);
    };
    recRef.current!.onend = ()=> setListening(false);
    recRef.current!.start();
  }
  return { start, listening };
}

export default function Whisper(){
  const [text,setText]=useState('');
  const [imageUrl,setImageUrl]=useState('');
  const [count,setCount]=useState<number|null>(null);
  const { start, listening } = useSpeech();

  useEffect(()=>{ (async()=>{
    const { count, error } = await supabase.from('whispers').select('*', { count:'exact', head:true });
    if(!error) setCount(count ?? 0);
  })(); },[]);

  useEffect(()=>{
    // starfield
    const container = document.querySelector('.stars');
    if(!container) return;
    container.innerHTML='';
    for(let i=0;i<120;i++){
      const s=document.createElement('div'); s.className='star';
      s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*100+'%';
      s.style.opacity=String(0.3+Math.random()*0.7);
      s.style.transform=`scale(${0.5+Math.random()*1.5})`;
      container.appendChild(s);
    }
  },[]);

  async function send(){
    const { data:{ user } } = await supabase.auth.getUser();
    if(!text.trim()) return alert('Whisper something first.');
    const { error } = await supabase.from('whispers').insert({ author_id: user?.id ?? null, text: text.trim(), image_url: imageUrl || null });
    if(error) alert(error.message); else{
      setText(''); setImageUrl('');
      const { count } = await supabase.from('whispers').select('*',{count:'exact', head:true});
      setCount(count ?? 0);
      alert('Sent. Thank you for whispering. 🌌');
    }
  }

  return (<div className="space-y-8">
    <div className="stars"></div>
    <div className="text-center mt-6">
      <div className="mx-auto size-32 rounded-full overflow-hidden border border-white/20 shadow-lg">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg" alt="Earth" className="w-full h-full object-cover"/>
      </div>
      <h2 className="text-xl mt-6 opacity-90">Where else would you like to live? Why?</h2>
    </div>
    <div className="max-w-2xl mx-auto space-y-3">
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Type Your Whisper..." className="w-full h-36 rounded bg-white/5 border border-white/10 p-3 focus:outline-none"></textarea>
      <div className="flex gap-3">
        <button onClick={()=>start(t=>setText((prev)=> (prev? prev+' ':'') + t))} className="btn">🎙️ {listening? 'Listening…':'Speak'}</button>
        <input placeholder="Optional image URL" className="input flex-1" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
        <button onClick={send} className="btn">Send</button>
      </div>
      <div className="text-center opacity-80 text-sm mt-2">{count!==null? `${Math.min(count,13)} of 13 Whispers Awakened!` : 'Loading…'}<br/>
        <span className="opacity-70">13 Whisper Activation mechanic</span>
      </div>
    </div>
  </div>);
}
