-- Anne's Haven content schema. Run once in the Supabase SQL editor.

-- Singletons --------------------------------------------------------------
create table if not exists site_settings (
  id int primary key default 1,
  phone text, cell text, email text, peace_email text,
  address_street text, address_city text, donate_url text,
  instagram_url text, facebook_url text, youtube_url text, linkedin_url text,
  footer_year text, footer_tagline text,
  updated_at timestamptz default now(),
  constraint singleton check (id = 1)
);

create table if not exists page_content (
  slug text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- Collections -------------------------------------------------------------
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null, role text, category text not null default 'staff',
  photo_url text, bio text, quote text, sort_order int not null default 0,
  updated_at timestamptz default now()
);
create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  title text not null, blurb text, image_url text,
  status text not null default 'current', event_date date,
  sort_order int not null default 0, updated_at timestamptz default now()
);
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null, author text, sort_order int not null default 0,
  updated_at timestamptz default now()
);
create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  youtube_id text, title text not null, blurb text,
  featured boolean not null default false,
  sort_order int not null default 0, updated_at timestamptz default now()
);
create table if not exists volunteer_roles (
  id uuid primary key default gen_random_uuid(),
  title text not null, icon text, body text, items text[] default '{}',
  description_url text, sort_order int not null default 0,
  updated_at timestamptz default now()
);
create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null, logo_url text, blurb text, links jsonb default '[]'::jsonb,
  sort_order int not null default 0, updated_at timestamptz default now()
);
create table if not exists funders (
  id uuid primary key default gen_random_uuid(),
  name text not null, logo_url text, website_url text,
  sort_order int not null default 0,
  updated_at timestamptz default now()
);

-- RLS: anyone can READ, only logged-in admins can WRITE -------------------
do $$
declare t text;
begin
  foreach t in array array['site_settings','page_content','team_members',
    'programs','testimonials','videos','volunteer_roles','partners','funders']
  loop
    execute format('alter table %I enable row level security;', t);
    execute format('drop policy if exists "public read" on %I;', t);
    execute format('create policy "public read" on %I for select using (true);', t);
    execute format('drop policy if exists "auth write" on %I;', t);
    execute format('create policy "auth write" on %I for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- Media bucket ------------------------------------------------------------
insert into storage.buckets (id, name, public) values ('media','media', true)
  on conflict (id) do nothing;
drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');
drop policy if exists "auth write media" on storage.objects;
create policy "auth write media" on storage.objects
  for all to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');

-- Seed the settings singleton --------------------------------------------
insert into site_settings (id) values (1) on conflict do nothing;
