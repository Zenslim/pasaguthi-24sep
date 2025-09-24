'use client';
import { supabase } from '@/lib/supabaseClient';
export default function AuthButtons(){
  async function google(){ await supabase.auth.signInWithOAuth({ provider:'google', options:{ redirectTo: location.origin + '/dashboard' } }); }
  async function magic(e:React.FormEvent){
    e.preventDefault();
    const email = (new FormData(e.target as HTMLFormElement).get('email') as string || '').trim();
    if(!email) return alert('Enter email');
    const {error} = await supabase.auth.signInWithOtp({ email });
    alert(error? error.message : 'Check your email for a sign-in link.');
  }
  return (<div className="space-y-4">
    <button onClick={google} className="btn w-full">Continue with Google</button>
    <div className="text-center text-sm opacity-70">or</div>
    <form onSubmit={magic} className="space-y-3">
      <input name="email" type="email" placeholder="you@example.com" className="input" />
      <button className="btn w-full">Email me a sign-in link</button>
    </form>
    <p className="text-xs opacity-70">Email link also serves as recovery.</p>
  </div>);
}
