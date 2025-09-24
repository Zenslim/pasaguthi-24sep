import { createClient } from '@/lib/supabaseServer'; import { NextResponse } from 'next/server';
export async function POST(){ const s = createClient(); await s.auth.signOut();
  return NextResponse.redirect(new URL('/signin', process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000')); }
