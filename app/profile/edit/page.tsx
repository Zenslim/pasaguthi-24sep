import { createClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import ProfileForm from '@/components/ProfileForm';

export default async function EditProfile(){
  const supabase = createClient();
  const { data:{ user } } = await supabase.auth.getUser();
  if(!user) redirect('/signin');
  return (<div className="space-y-6">
    <h1 className="text-3xl font-bold">Edit Profile</h1>
    <ProfileForm/>
  </div>);
}
