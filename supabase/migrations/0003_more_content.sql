-- Extra columns for programs / funders / partners, then seed remaining content.
-- Safe to run once.

alter table programs add column if not exists category text default 'entrepreneurship';
alter table funders add column if not exists status text default 'current';
alter table funders add column if not exists website_url text;
alter table partners add column if not exists website_url text;
alter table partners add column if not exists newsletter_url text;
alter table partners add column if not exists instagram_url text;
alter table partners add column if not exists facebook_url text;

-- Programs (the two checklists on /programs) ------------------------------
insert into programs (title, category, sort_order)
select v.title, v.category, v.sort_order from (values
  ('Vendor markets', 'entrepreneurship', 0),
  ('Women''s Networking & Bartering Collective', 'entrepreneurship', 1),
  ('Business Expos', 'entrepreneurship', 2),
  ('Women''s Business events', 'entrepreneurship', 3),
  ('Marketing workshops', 'entrepreneurship', 4),
  ('Financial advisory workshops', 'entrepreneurship', 5),
  ('Conflict Resolution Forums', 'peace', 6),
  ('Immigrant Appreciation Days', 'peace', 7),
  ('Support groups', 'peace', 8),
  ('Yoga, mindfulness, meditation & mind mapping', 'peace', 9),
  ('Community Service 2.0', 'peace', 10),
  ('MeToo support circles', 'peace', 11)
) as v(title, category, sort_order)
where not exists (select 1 from programs);

-- Volunteer roles --------------------------------------------------------
insert into volunteer_roles (title, icon, body, items, description_url, sort_order)
select v.title, v.icon, v.body, v.items, v.description_url, v.sort_order from (values
  ('Partnerships Lead', 'handshake', 'Build meaningful relationships with community organizations, businesses, and people who share Anne''s Haven''s mission.', array['Partner outreach','Relationship building','Community engagement'], '', 0),
  ('Grant Research & Writing Assistant', 'book', 'Support fundraising by researching aligned opportunities and helping craft clear, compelling grant proposals.', array['Grant research','Draft writing support','Donor reporting'], '', 1),
  ('Program & Events Admin', 'calendar', 'Help plan and organize programs and events that empower, connect, and inspire.', array['Event coordination','Logistics & scheduling','Administrative support'], '', 2),
  ('Social Media & Marketing Manager', 'megaphone', 'Amplify Anne''s Haven''s voice and welcome more people into the community through thoughtful, creative marketing.', array['Content creation','Social media strategy','Campaign management'], '', 3),
  ('Volunteer Coordinator', 'users', 'Recruit, welcome, and support volunteers so everyone has a positive and meaningful experience.', array['Volunteer onboarding','Engagement & retention','Communication'], '', 4)
) as v(title, icon, body, items, description_url, sort_order)
where not exists (select 1 from volunteer_roles);

-- Partners ---------------------------------------------------------------
insert into partners (name, logo_url, blurb, website_url, newsletter_url, instagram_url, facebook_url, sort_order)
select v.name, v.logo_url, v.blurb, v.website_url, v.newsletter_url, v.instagram_url, v.facebook_url, v.sort_order
from (values
  ('&Rise', '/images/partners/rise.webp',
   'The vision of &Rise is to put millions of single mothers through college, as well as putting millions of trauma survivors through therapy, so they can heal and become the ultimate version of themselves.' || chr(10) || chr(10) || '&Rise supports Anne''s Haven''s mission of creating community and a safe space for women.',
   '', '', '', '', 0)
) as v(name, logo_url, blurb, website_url, newsletter_url, instagram_url, facebook_url, sort_order)
where not exists (select 1 from partners);

-- Funders -----------------------------------------------------------------
insert into funders (name, logo_url, website_url, status, sort_order)
select v.name, v.logo_url, v.website_url, v.status, v.sort_order from (values
  ('Chicago Foundation for Women', '/images/funders/chicago-foundation-for-women.png', 'https://www.cfw.org/', 'current', 0),
  ('City of Chicago Chicago Biz Strong Grant', '/images/funders/city-of-chicago.png', 'https://www.chicago.gov/city/en/depts/mopd/provdrs/advoc/alerts/2021/november/Chi_Biz_Strong-Grant_Program.html', 'previous', 0),
  ('Allies for Community Business', '/images/funders/allies-community-business.png', 'https://a4cb.org/', 'previous', 1),
  ('Union Pacific Foundation', '/images/funders/union-pacific.png', 'https://www.up.com/communities/philanthropic-giving/local-grants', 'previous', 2),
  ('Ross Stores Foundation', '/images/funders/ross-stores.svg', 'https://corp.rossstores.com/responsibility/supporting-our-communities/', 'previous', 3),
  ('Awesome Foundation', '/images/funders/awesome-foundation.png', 'https://www.awesomefoundation.org/en', 'previous', 4),
  ('Woman''s Club of Wilmette', null, 'https://womansclubofwilmette.org/content.aspx?page_id=22&club_id=220133&module_id=399627', 'previous', 5),
  ('Little Caesars Foundation', '/images/funders/little-caesars.png', 'https://littlecaesars.com/en-us/about-us/giving-back/', 'previous', 6)
) as v(name, logo_url, website_url, status, sort_order)
where not exists (select 1 from funders);
