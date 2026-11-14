-- Allow hiding a Current Programs card without deleting its row.
alter table public.current_programs
  add column if not exists is_active boolean not null default true;
