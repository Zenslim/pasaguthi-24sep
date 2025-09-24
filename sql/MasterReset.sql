-- MasterReset.sql — run in Supabase SQL Editor

-- CLEAN
drop table if exists public.whispers cascade;
drop view if exists public.guthyars;
drop table if exists public.users cascade;

-- USERS
create table public.users(
  id uuid primary key references auth.users(id) on delete cascade,
  name text, thar text, region text,
  skills text[] default '{}',
  photo text, guthi_key text unique,
  phone text, bioSig text,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.users enable row level security;
create policy users_select_own on public.users for select using (auth.uid() = id);
create policy users_update_own on public.users for update using (auth.uid() = id);
create policy users_insert_own on public.users for insert with check (auth.uid() = id);

-- GUTHYARS PUBLIC VIEW
create view public.guthyars as
select name, thar, region, photo from public.users where coalesce(name,'')<>'';
grant usage on schema public to anon, authenticated;
grant select on public.guthyars to anon, authenticated;

-- AUTO PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name) values (new.id, coalesce(new.raw_user_meta_data->>'name', new.email));
  return new;
end; $$ language plpgsql security definer;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- WHISPERS
create table public.whispers(
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users(id) on delete set null,
  text text not null,
  image_url text,
  created_at timestamptz default now()
);
alter table public.whispers enable row level security;

-- Anyone can whisper (anon or authed)
create policy whispers_insert_anyone on public.whispers for insert with check (true);

-- Only owner can read their own items; public can view counts via RPC or head counts.
create policy whispers_select_own on public.whispers for select using (auth.uid() = author_id);

-- Index for stats
create index if not exists idx_whispers_created on public.whispers(created_at desc);
