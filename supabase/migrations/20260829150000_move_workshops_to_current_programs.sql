-- Move ongoing offerings out of workshops and into current programs.
-- Safe to run when 0005_current_programs.sql has not been applied and safe to rerun.
begin;

create table if not exists public.current_programs (
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

alter table public.current_programs enable row level security;
drop policy if exists "public read" on public.current_programs;
create policy "public read"
  on public.current_programs for select
  using (true);
drop policy if exists "auth write" on public.current_programs;
create policy "auth write"
  on public.current_programs for all to authenticated
  using (true)
  with check (true);

-- Remove CMS placeholder records if they were saved as real rows.
delete from public.current_programs
where regexp_replace(lower(title), '[^a-z0-9]+', '', 'g') = 'addyourflyer';

-- If a prior partial run already copied either offering, refresh that row from
-- the workshop source instead of creating a duplicate.
with source_rows as (
  select distinct on (normalized_title)
    flyer_url,
    tag,
    tone,
    icon,
    title,
    blurb,
    normalized_title
  from (
    select
      id,
      flyer_url,
      tag,
      tone,
      icon,
      title,
      blurb,
      sort_order,
      regexp_replace(lower(title), '[^a-z0-9]+', '', 'g') as normalized_title
    from public.workshops
  ) normalized_workshops
  where normalized_title in (
    'portageplaycircle',
    'anneshavenshealthhub'
  )
  order by normalized_title, sort_order, id
)
update public.current_programs as target
set
  flyer_url = source.flyer_url,
  tag = source.tag,
  tone = source.tone,
  icon = source.icon,
  title = source.title,
  blurb = source.blurb,
  sort_order = case source.normalized_title
    when 'portageplaycircle' then 0
    else 1
  end,
  updated_at = now()
from source_rows as source
where regexp_replace(lower(target.title), '[^a-z0-9]+', '', 'g')
  = source.normalized_title;

-- Copy offerings that are not already present in current programs. Normalizing
-- punctuation and case handles straight/curly apostrophes and title casing.
with source_rows as (
  select distinct on (normalized_title)
    flyer_url,
    tag,
    tone,
    icon,
    title,
    blurb,
    normalized_title
  from (
    select
      id,
      flyer_url,
      tag,
      tone,
      icon,
      title,
      blurb,
      sort_order,
      regexp_replace(lower(title), '[^a-z0-9]+', '', 'g') as normalized_title
    from public.workshops
  ) normalized_workshops
  where normalized_title in (
    'portageplaycircle',
    'anneshavenshealthhub'
  )
  order by normalized_title, sort_order, id
)
insert into public.current_programs (
  flyer_url,
  tag,
  tone,
  icon,
  title,
  blurb,
  sort_order
)
select
  source.flyer_url,
  source.tag,
  source.tone,
  source.icon,
  source.title,
  source.blurb,
  case source.normalized_title
    when 'portageplaycircle' then 0
    else 1
  end
from source_rows as source
where not exists (
  select 1
  from public.current_programs as target
  where regexp_replace(lower(target.title), '[^a-z0-9]+', '', 'g')
    = source.normalized_title
);

delete from public.workshops
where regexp_replace(lower(title), '[^a-z0-9]+', '', 'g') in (
  'portageplaycircle',
  'anneshavenshealthhub'
);

commit;
