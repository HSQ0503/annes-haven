-- Extra columns for programs / funders / partners, then seed remaining content.
-- Safe to run once.

alter table programs add column if not exists category text default 'entrepreneurship';
alter table funders add column if not exists status text default 'current';
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
  ('Grant Research & Writing', 'book', 'Support fundraising by researching grants and helping craft compelling proposals.', array['Grant research','Draft writing support','Donor reporting'], '', 0),
  ('Social Media & Marketing', 'megaphone', 'Amplify our voice and grow our community through creative, strategic marketing.', array['Content creation','Social media strategy','Campaign management'], '', 1),
  ('Outreach & Partnerships', 'handshake', 'Build meaningful partnerships and expand our reach within the community.', array['Partner outreach','Relationship building','Community engagement'], '', 2),
  ('Volunteer Coordinator', 'users', 'Recruit, engage, and support volunteers for a positive, impactful experience.', array['Volunteer onboarding','Engagement & retention','Communication'], '', 3),
  ('Program & Events Admin', 'calendar', 'Help plan and organize programs and events that empower and inspire.', array['Event coordination','Logistics & scheduling','Administrative support'], '', 4)
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

-- Funders (previous supporters as name pills) -----------------------------
insert into funders (name, status, sort_order)
select v.name, v.status, v.sort_order from (values
  ('City of Chicago, Chicago Biz Strong Grant', 'previous', 0),
  ('Allies for Community Business', 'previous', 1),
  ('Union Pacific Foundation', 'previous', 2),
  ('Ross Stores Foundation', 'previous', 3),
  ('Awesome Foundation', 'previous', 4),
  ('Women''s Club of Wilmette', 'previous', 5),
  ('Little Caesars Foundation', 'previous', 6),
  ('The Chicago Foundation for Women', 'previous', 7)
) as v(name, status, sort_order)
where not exists (select 1 from funders);
