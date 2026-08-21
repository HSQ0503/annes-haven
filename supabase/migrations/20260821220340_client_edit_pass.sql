-- Apply the August 2026 client copy/content pass to both existing projects and
-- fresh databases. Collection updates preserve editor-supplied role links.

alter table funders add column if not exists website_url text;

insert into site_settings (id, email, peace_email, linkedin_url, updated_at)
values (1, 'AnnesHaven.Chicago@gmail.com', 'annespeacecenter@gmail.com', '', now())
on conflict (id) do update
set
  email = excluded.email,
  peace_email = excluded.peace_email,
  linkedin_url = excluded.linkedin_url,
  updated_at = now();

insert into page_content (slug, data, updated_at)
values
  (
    'home',
    jsonb_build_object(
      'hero_kicker', 'A Woman-Founded 501(c)(3) peace center · Portage Park, Chicago',
      'hero_lead', 'Anne''s Haven is a homey little spot for Chicagoans — community gatherings, youth programs, and classes to take or teach. And for women building something of their own, it''s a soft place to grow.',
      'history_tagline', 'Inspiring women to learn from each other since 2016 & expanding to build peace for all since 2026',
      'mission_body', 'We make room for people to gather, learn, grow, and ponder peace- with a soft spot for women entrepreneurs in the healing arts. Everyone''s welcome at the table.',
      'cta_text', 'However you pitch in — a class, a donation, a Saturday morning — you''re helping women grow and Chicagoans find their footing.'
    ),
    now()
  ),
  (
    'about',
    jsonb_build_object(
      'hero_lead', 'A woman-founded peace center and women''s incubator providing programming and dedicated space for people of all ethnic, racial, sexual, religious, and nondiscriminatory ideological identities.',
      'mission_body_1', 'Anne''s Haven 501(c)(3) provides programming and dedicated space for people of all ethnic, racial, sexual, religious, and nondiscriminatory ideological identities. Our mission is to create safe spaces, build relationships, educate, and promote personal growth.',
      'mission_body_2', 'Our primary focus is supporting women entrepreneurs, especially those in the healing arts, and building peace. We carry out our mission through programming dedicated to entrepreneurship and Peace Education, and by creating space for a peace center and a women''s incubator.',
      'connection_body', 'At the core of our strength is the ability to accept, connect with, and uplift other people of all identities, fostering compassionate, peaceful communities.',
      'collaboration_body', 'Working together is the only path toward change, to build sustainable peace and support women entrepreneurs.',
      'empowerment_body', 'Through entrepreneurship and Peace Education, we equip people with the knowledge and skills to take their businesses, and communities, to new heights.',
      'resurrection_body', 'Our lives move through stages. We are constantly growing wiser, embracing our imperfection and beginning new chapters.',
      'work_heading', 'Women Entrepreneurship & Peace Education',
      'aspiring_body', 'Our Aspiring Entrepreneur program supports women, with a soft spot on those in the healing arts, as they pursue their passions, while strengthening collaboration. It''s conducted as a collective, engaging each individual''s voice and demonstrating the power of “WE.”',
      'peace_programs_body', 'Our Peace Education programs, also operating as a collective, center on our “Peace Payoff” framework.'
    ),
    now()
  ),
  (
    'peace-education',
    jsonb_build_object(
      'intro_text', 'Our Peace Education programs are centered around our “Peace Payoff” framework. They help people and communities become agents of peace.',
      'payoff_1_title', 'Peace Payoff',
      'payoff_1_body', 'The clear economic, emotional, social, and community benefits of embracing peaceful practices in your personal life and professional career.',
      'payoff_2_title', 'Peace Knowledge',
      'payoff_2_body', 'Knowledge of the key goals of peacebuilding and conflict resolution, and of the basic peaceful practices you can commit to in your everyday life, in your community, and in your professional career.',
      'payoff_3_title', 'Peace Assets',
      'payoff_3_body', 'A clear understanding of the many benefits of peace and what specific benefits you connect with the most- why you are a peacebuilder.',
      'payoff_4_title', 'Peace Awareness',
      'payoff_4_body', 'Being aware of your and your community''s exceptional potential to build peace, the unique abilities of other people and communities, and opportunities to work together.',
      'payoff_5_title', 'Peace Tools',
      'payoff_5_body', 'Personal qualities and aspects of a community that are needed to build peace, and obtain all the economic, emotional, social, and community benefits that come with peace.',
      'payoff_6_title', 'Peace Skills',
      'payoff_6_body', 'The concrete, learned skills (communication, conflict resolution, emotional regulation, etc.) that are necessary to effectively engage in peaceful practices in your everyday life, professional career, and community.'
    ),
    now()
  ),
  (
    'get-involved',
    jsonb_build_object(
      'hero_lead', 'Join a community, in-person or virtually, dedicated to supporting women entrepreneurs and building peace.',
      'apply_url', 'https://docs.google.com/forms/d/e/1FAIpQLSfje4iSaZ8R62BQXrEao3J7M0CClkB_8TOv2StJZ9PhYyjRzQ/viewform?usp=header'
    ),
    now()
  ),
  (
    'support',
    jsonb_build_object(
      'why_title', 'There''s no place like Anne''s',
      'why_body', 'Anne''s is the first secular community peace center in Chicago and a creative incubator for all women who are living with a dream. It''s about freedom, about people learning from people and helping each other grow. Anne''s is exciting, life changing, fertile ground for the seeds of the future of women and all people who envision a better life for all, and are ready to get to work! Please help provide us with the tools we need.'
    ),
    now()
  ),
  (
    'contact',
    jsonb_build_object(
      'hero_lead', 'Please contact us to sign up for a program! You can also use this form to come to us with any idea or concern you may have.'
    ),
    now()
  )
on conflict (slug) do update
set
  data = page_content.data || excluded.data,
  updated_at = now();

-- Place the two client-provided videos first and feature the announcement.
update videos
set
  sort_order = sort_order + 2,
  featured = false
where youtube_id is distinct from '8OHpawJ41ig'
  and youtube_id is distinct from '8C1BeWK4PSI';

update videos
set
  title = 'Anne''s Haven Announcement Video',
  blurb = 'An update from Anne''s Haven about the center and the work ahead.',
  featured = true,
  sort_order = 0,
  updated_at = now()
where youtube_id = '8OHpawJ41ig';

insert into videos (youtube_id, title, blurb, featured, sort_order)
select
  '8OHpawJ41ig',
  'Anne''s Haven Announcement Video',
  'An update from Anne''s Haven about the center and the work ahead.',
  true,
  0
where not exists (
  select 1 from videos where youtube_id = '8OHpawJ41ig'
);

update videos
set
  title = 'Meet Jacopo DeMarinis, the Director of Peace Education programs at Anne''s Haven!',
  blurb = 'Meet the director guiding Anne''s Haven''s Peace Education programs.',
  featured = false,
  sort_order = 1,
  updated_at = now()
where youtube_id = '8C1BeWK4PSI';

insert into videos (youtube_id, title, blurb, featured, sort_order)
select
  '8C1BeWK4PSI',
  'Meet Jacopo DeMarinis, the Director of Peace Education programs at Anne''s Haven!',
  'Meet the director guiding Anne''s Haven''s Peace Education programs.',
  false,
  1
where not exists (
  select 1 from videos where youtube_id = '8C1BeWK4PSI'
);

-- Normalize role names and copy while retaining any description_url Janet set.
update volunteer_roles
set title = 'Partnerships Lead'
where title = 'Outreach & Partnerships';
update volunteer_roles
set title = 'Grant Research & Writing Assistant'
where title = 'Grant Research & Writing';
update volunteer_roles
set title = 'Social Media & Marketing Manager'
where title = 'Social Media & Marketing';

with role_data(title, icon, body, items, sort_order) as (
  values
    ('Partnerships Lead', 'handshake', 'Build meaningful relationships with community organizations, businesses, and people who share Anne''s Haven''s mission.', array['Partner outreach','Relationship building','Community engagement']::text[], 0),
    ('Grant Research & Writing Assistant', 'book', 'Support fundraising by researching aligned opportunities and helping craft clear, compelling grant proposals.', array['Grant research','Draft writing support','Donor reporting']::text[], 1),
    ('Program & Events Admin', 'calendar', 'Help plan and organize programs and events that empower, connect, and inspire.', array['Event coordination','Logistics & scheduling','Administrative support']::text[], 2),
    ('Social Media & Marketing Manager', 'megaphone', 'Amplify Anne''s Haven''s voice and welcome more people into the community through thoughtful, creative marketing.', array['Content creation','Social media strategy','Campaign management']::text[], 3),
    ('Volunteer Coordinator', 'users', 'Recruit, welcome, and support volunteers so everyone has a positive and meaningful experience.', array['Volunteer onboarding','Engagement & retention','Communication']::text[], 4)
)
update volunteer_roles as role
set
  icon = role_data.icon,
  body = role_data.body,
  items = role_data.items,
  sort_order = role_data.sort_order,
  updated_at = now()
from role_data
where role.title = role_data.title;

insert into volunteer_roles (title, icon, body, items, description_url, sort_order)
select role_data.title, role_data.icon, role_data.body, role_data.items, null, role_data.sort_order
from (
  values
    ('Partnerships Lead', 'handshake', 'Build meaningful relationships with community organizations, businesses, and people who share Anne''s Haven''s mission.', array['Partner outreach','Relationship building','Community engagement']::text[], 0),
    ('Grant Research & Writing Assistant', 'book', 'Support fundraising by researching aligned opportunities and helping craft clear, compelling grant proposals.', array['Grant research','Draft writing support','Donor reporting']::text[], 1),
    ('Program & Events Admin', 'calendar', 'Help plan and organize programs and events that empower, connect, and inspire.', array['Event coordination','Logistics & scheduling','Administrative support']::text[], 2),
    ('Social Media & Marketing Manager', 'megaphone', 'Amplify Anne''s Haven''s voice and welcome more people into the community through thoughtful, creative marketing.', array['Content creation','Social media strategy','Campaign management']::text[], 3),
    ('Volunteer Coordinator', 'users', 'Recruit, welcome, and support volunteers so everyone has a positive and meaningful experience.', array['Volunteer onboarding','Engagement & retention','Communication']::text[], 4)
) as role_data(title, icon, body, items, sort_order)
where not exists (
  select 1 from volunteer_roles where volunteer_roles.title = role_data.title
);

-- Funders are linked and logo-backed wherever a public brand asset is available.
update funders
set name = 'Chicago Foundation for Women'
where name = 'The Chicago Foundation for Women';
update funders
set name = 'City of Chicago Chicago Biz Strong Grant'
where name = 'City of Chicago, Chicago Biz Strong Grant';
update funders
set name = 'Woman''s Club of Wilmette'
where name = 'Women''s Club of Wilmette';

with funder_data(name, logo_url, website_url, status, sort_order) as (
  values
    ('Chicago Foundation for Women', '/images/funders/chicago-foundation-for-women.png', 'https://www.cfw.org/', 'current', 0),
    ('City of Chicago Chicago Biz Strong Grant', '/images/funders/city-of-chicago.png', 'https://www.chicago.gov/city/en/depts/mopd/provdrs/advoc/alerts/2021/november/Chi_Biz_Strong-Grant_Program.html', 'previous', 0),
    ('Allies for Community Business', '/images/funders/allies-community-business.png', 'https://a4cb.org/', 'previous', 1),
    ('Union Pacific Foundation', '/images/funders/union-pacific.png', 'https://www.up.com/communities/philanthropic-giving/local-grants', 'previous', 2),
    ('Ross Stores Foundation', '/images/funders/ross-stores.svg', 'https://corp.rossstores.com/responsibility/supporting-our-communities/', 'previous', 3),
    ('Awesome Foundation', '/images/funders/awesome-foundation.png', 'https://www.awesomefoundation.org/en', 'previous', 4),
    ('Woman''s Club of Wilmette', null, 'https://womansclubofwilmette.org/content.aspx?page_id=22&club_id=220133&module_id=399627', 'previous', 5),
    ('Little Caesars Foundation', '/images/funders/little-caesars.png', 'https://littlecaesars.com/en-us/about-us/giving-back/', 'previous', 6)
)
update funders as funder
set
  logo_url = funder_data.logo_url,
  website_url = funder_data.website_url,
  status = funder_data.status,
  sort_order = funder_data.sort_order,
  updated_at = now()
from funder_data
where funder.name = funder_data.name;

insert into funders (name, logo_url, website_url, status, sort_order)
select
  funder_data.name,
  funder_data.logo_url,
  funder_data.website_url,
  funder_data.status,
  funder_data.sort_order
from (
  values
    ('Chicago Foundation for Women', '/images/funders/chicago-foundation-for-women.png', 'https://www.cfw.org/', 'current', 0),
    ('City of Chicago Chicago Biz Strong Grant', '/images/funders/city-of-chicago.png', 'https://www.chicago.gov/city/en/depts/mopd/provdrs/advoc/alerts/2021/november/Chi_Biz_Strong-Grant_Program.html', 'previous', 0),
    ('Allies for Community Business', '/images/funders/allies-community-business.png', 'https://a4cb.org/', 'previous', 1),
    ('Union Pacific Foundation', '/images/funders/union-pacific.png', 'https://www.up.com/communities/philanthropic-giving/local-grants', 'previous', 2),
    ('Ross Stores Foundation', '/images/funders/ross-stores.svg', 'https://corp.rossstores.com/responsibility/supporting-our-communities/', 'previous', 3),
    ('Awesome Foundation', '/images/funders/awesome-foundation.png', 'https://www.awesomefoundation.org/en', 'previous', 4),
    ('Woman''s Club of Wilmette', null, 'https://womansclubofwilmette.org/content.aspx?page_id=22&club_id=220133&module_id=399627', 'previous', 5),
    ('Little Caesars Foundation', '/images/funders/little-caesars.png', 'https://littlecaesars.com/en-us/about-us/giving-back/', 'previous', 6)
) as funder_data(name, logo_url, website_url, status, sort_order)
where not exists (
  select 1 from funders where funders.name = funder_data.name
);
