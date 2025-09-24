import { createClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import AuthButtons from '@/components/AuthButtons';

export default async function SignIn(){
  const supabase = createClient();
  const { data:{ user } } = await supabase.auth.getUser();
  if(user) redirect('/dashboard');
  return (<div className="max-w-md">
    <h1 className="text-3xl font-bold mb-6">Sign in</h1>
    <AuthButtons/>
    <p className="text-xs opacity-70 mt-3">Profile is created automatically on first login.</p>
  </div>);
}
