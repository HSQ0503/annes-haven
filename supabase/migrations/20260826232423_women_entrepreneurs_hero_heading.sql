-- Update women-entrepreneurs hero_heading from "Women Entrepreneurship & Peace Education"
-- to "Women Entrepreneurship". Preserves any other keys in the data JSONB column.

update page_content
set
  data = jsonb_set(data, '{hero_heading}', '"Women Entrepreneurship"'),
  updated_at = now()
where slug = 'women-entrepreneurs'
  and data->>'hero_heading' = 'Women Entrepreneurship & Peace Education';
