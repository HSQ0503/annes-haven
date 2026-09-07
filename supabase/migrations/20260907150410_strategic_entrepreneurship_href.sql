alter table public.current_programs
  add column if not exists href text;

update public.current_programs
set href = '/strategic-entrepreneurship'
where id = 'df524cba-9a4e-4167-83a0-afd6f227b8b7'
  and href is distinct from '/strategic-entrepreneurship';
