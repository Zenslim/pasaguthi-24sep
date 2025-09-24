import { NextResponse, NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
export async function middleware(req:NextRequest){
  const res = NextResponse.next();
  const s = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies:{ get:n=>req.cookies.get(n)?.value, set:(n,v,o)=>res.cookies.set({name:n,value:v,...o}), remove:(n,o)=>res.cookies.set({name:n,value:'',...o}) }
  });
  const { data:{ user } } = await s.auth.getUser();
  const needsAuth = ['/dashboard','/profile'].some(p=>req.nextUrl.pathname.startsWith(p));
  if(needsAuth && !user){ const url=req.nextUrl.clone(); url.pathname='/signin'; return NextResponse.redirect(url); }
  return res;
}
export const config = { matcher: ['/dashboard','/profile/:path*'] };
