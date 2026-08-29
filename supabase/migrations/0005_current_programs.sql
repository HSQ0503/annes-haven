-- Current Programs flyer cards (on /workshops). Safe to run once.
create table if not exists current_programs (
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

alter table current_programs enable row level security;
drop policy if exists "public read" on current_programs;
create policy "public read" on current_programs for select using (true);
drop policy if exists "auth write" on current_programs;
create policy "auth write" on current_programs for all to authenticated using (true) with check (true);
