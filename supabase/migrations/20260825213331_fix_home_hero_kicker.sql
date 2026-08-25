-- Fix home page hero_kicker: remove "IL" after "Chicago"
-- Only updates the home slug; preserves all other keys in the jsonb data.

update page_content
set
  data = jsonb_set(
    data,
    '{hero_kicker}',
    '"A Woman-Founded 501(c)(3) peace center · Portage Park, Chicago"'::jsonb
  ),
  updated_at = now()
where slug = 'home'
  and data->>'hero_kicker' like '%Portage Park, Chicago IL%';
