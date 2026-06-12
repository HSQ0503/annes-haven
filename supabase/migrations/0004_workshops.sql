-- Workshops & classes (flyer cards on /workshops). Safe to run once.
create table if not exists workshops (
  id uuid primary key default gen_random_uuid(),
  flyer_url text,
  tag text,
  tone text default '',
  icon text default 'palette',
  title text not null,
  blurb text,
  sort_order int not null default 0,
  updated_at timestamptz default now()
);

alter table workshops enable row level security;
drop policy if exists "public read" on workshops;
create policy "public read" on workshops for select using (true);
drop policy if exists "auth write" on workshops;
create policy "auth write" on workshops for all to authenticated using (true) with check (true);
