import { createClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Dashboard(){
  const supabase = createClient();
  const { data:{ user } } = await supabase.auth.getUser();
  if(!user) redirect('/signin');
  const { data:profile } = await supabase.from('users').select('name, thar, region, skills, photo, guthi_key').eq('id', user.id).maybeSingle();
  return (<div className="space-y-6">
    <h1 className="text-3xl font-bold">Welcome{profile?.name?`, ${profile.name}`:''} 👋</h1>
    <div className="card space-y-2">
      <div>ID: <code>{user.id}</code></div>
      <div>Guthi Key: <code>{profile?.guthi_key ?? '—'}</code></div>
      <div>Thar: {profile?.thar ?? '—'}</div>
      <div>Region: {profile?.region ?? '—'}</div>
      <div>Skills: {Array.isArray(profile?.skills)? profile!.skills.join(', ') : '—'}</div>
    </div>
    <div className="flex gap-3">
      <Link href="/profile/edit" className="btn">Edit Profile</Link>
      <form action="/api/signout" method="post"><button className="btn-outline" formMethod="post">Sign out</button></form>
    </div>
  </div>);
}
