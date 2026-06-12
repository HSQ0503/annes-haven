-- Seed current site content. Safe to run once (collection inserts skip if
-- the table already has rows, so existing edits won't be duplicated).

-- Site settings -----------------------------------------------------------
update site_settings set
  phone = '(773) 340-1678',
  cell = '773-512-8115',
  email = 'anneshaefene@gmail.com',
  peace_email = 'annespeacecenter@gmail.com',
  address_street = '5629 W. Irving Park Road',
  address_city = 'Chicago, IL 60634',
  donate_url = 'https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-9976',
  instagram_url = 'https://www.instagram.com/annes_haven/',
  facebook_url = 'https://www.facebook.com/anneshaefen/',
  youtube_url = 'https://www.youtube.com/channel/UCjtbZydkIzWmLytsFxnfSGw',
  linkedin_url = '',
  footer_year = '2026',
  footer_tagline = 'Safe spaces · Women without barriers · Communities without borders'
where id = 1;

-- Testimonials ------------------------------------------------------------
insert into testimonials (quote, author, sort_order)
select v.quote, v.author, v.sort_order from (values
  ('Beautiful, welcoming place. We hosted a community meeting there, but it''s a space for all sorts of events. Portage Park''s hidden gem.', '— Terrie', 0),
  ('Such a peaceful, welcoming space — you feel like you''re at home. Great for being with friends and family, and it''s affordable too.', '— Delilah', 1),
  ('The potential for peace is always there in our communities. We just have to learn to recognize it — and make a little room for it.', '— Anne''s Haven', 2)
) as v(quote, author, sort_order)
where not exists (select 1 from testimonials);

-- Videos ------------------------------------------------------------------
insert into videos (youtube_id, title, blurb, featured, sort_order)
select v.youtube_id, v.title, v.blurb, v.featured, v.sort_order from (values
  ('M7MxP_GfHm4'::text, 'The Anne''s Haven Video', 'Want to know more about Anne''s Haven? Hear from several women about how the center has helped them in their lives. Founder Janet also speaks about the mission of Anne''s and what''s happening right now.', true, 0),
  ('4c0DIDXnnZs', 'Meet Jacopo DeMarinis', 'Director of our Community Service 2.0 Program.', false, 1),
  ('h2Uwge4x2sQ', 'Elena Pozo Perez on Your Health', 'Our guest speaker from Spain visits Anne''s.', false, 2),
  ('z7XvZS49QWA', 'Sketch, Sip & Self-Care', 'An event in support of our Gathering of Moms.', false, 3),
  ('a3pB3ttnb3k', 'Mary Joyce — a Woman of Anne''s', 'One of the women at the heart of Anne''s Haven.', false, 4),
  ('H3IICjkNBio', 'Aga, Artist & Leader at Anne''s', 'Creativity and leadership in our community.', false, 5),
  ('2V5FEAsflBs', 'Memoir for Me at Anne''s Haven', 'Telling our stories, one page at a time.', false, 6),
  ('KziRuAsDgzo', 'Living a Blissful Life', 'A session on finding peace in everyday life.', false, 7),
  (null, 'A Decade In', 'Our newest film, celebrating ten years of Anne''s. Coming soon.', false, 8),
  (null, 'A Film by Chimbuani', 'A video from our partner Chimbuani. Coming soon.', false, 9)
) as v(youtube_id, title, blurb, featured, sort_order)
where not exists (select 1 from videos);

-- Team members ------------------------------------------------------------
insert into team_members (name, role, category, photo_url, bio, quote, sort_order)
select v.name, v.role, v.category, v.photo_url, v.bio, v.quote, v.sort_order from (values
  ('Janet Giangrasse', 'Founder & Director', 'founder', '/images/team/janet.jpeg',
   'Founder of Anne''s Haven and daughter of Anne McNicholas-Giangrasse, in whose memory Anne''s Haven was built. Janet grew up in Villa Park, Illinois, studied theatre in London, worked in New York City, moved to Italy, and then returned to Chicago. There she had her son, spent time with family, found financial stability with bookkeeping, and lifted her spirit with Anne''s Haven.' || chr(10) || chr(10) || 'The expanded mission to bring Peace Education to Chicago has long been in my heart. Promoting women without barriers, and communities without borders, springs from my very soul.',
   'Anne''s Haven is a tribute to my very dear mother and all women. We do so much for those around us, often having nothing left to give to ourselves. Anne''s is for us, a safe place to create opportunities, grow friendships, learn skills… sit with our thoughts. Anne''s is there for whatever we need it for.', 0),
  ('Carmen Torres', 'Executive Director', 'director', '/images/team/carmen.jpeg',
   'Carmen is an Inspirational Life Coach and a Certified Law of Attraction Coach from Quantum Success Coaching Academy, as well as a Meditation Guide and Natural Healer.',
   'I am a Wife, Mother, Grandmother, Employee, and twice Cancer SURVIVOR. My mission is to inspire, encourage, motivate, and promote self-awareness that leads to transformation in one''s life.', 1),
  ('Jacopo DeMarinis', 'Director of Peace Education Programs', 'director', '/images/team/jacopo.jpeg',
   'Jacopo joined the board of Anne''s Haven in 2021 and transitioned to his current position in 2025. He recently received his Master''s in Peace and Conflict Studies from Ulster University in Northern Ireland, where his research was featured on BBC Northern Ireland.' || chr(10) || chr(10) || 'He is passionate about introducing communities, especially young people, to peacebuilding, building skills like nonviolent communication and mediation, and encouraging creative thinking about peace.',
   '', 2),
  ('Tram Le', 'Working Board Member', 'board', '/images/team/tram.jpeg',
   'A tax CPA and small business advisor based in Chicago. Born and raised in Vietnam, Tram earned her degree in accounting and finance and her Master of Taxation. She''s passionate about making financial literacy accessible, especially for women and underserved communities.', '', 3),
  ('Linda Bonesteel', 'Board Member', 'board', '/images/team/linda.png',
   'A graduate of DePaul University with a degree in American Studies concentrating in Media & Pop-Culture, and a minor in LGBTQ+ Studies. Linda is passionate about empowering women and building community through shared learning, drawn to Anne''s commitment to inclusivity and equity.', '', 4),
  ('Lili Sukenic', 'Marketing Intern', 'board', '/images/team/lili.jpeg',
   'A senior at Lake Forest College majoring in Communication and Theater. With a background in media analysis and community organizing, Lili creates strategic content to amplify Anne''s Haven''s mission and support outreach to women and local vendors.', '', 5),
  ('Maria', 'Working Board Member', 'board', '/images/team/maria.jpeg',
   'A free spirit, proud parent, and grandmother with a deep care for everyone she meets and an ever-ready listening ear. Maria brings experience across sales, customer service, management, and visual and showroom merchandising, along with a lifelong drive to get involved and give back.', '', 6),
  ('Chloe Bentley', '', 'advisor', '/images/team/chloe.jpeg',
   'Former CPS teacher and mother of two. She ran the Moms Meetup at Anne''s Haven and hosted our podcast, "Live from Anne''s!" A strong supporter and friend since the beginning.', '', 7),
  ('George Borovik', '', 'advisor', '/images/team/george.jpeg',
   'Executive Director of the Portage Park Chamber of Commerce since 2002. A longtime friend of Anne''s Haven and one of the Chamber''s biggest supporters of Janet''s work.', '', 8),
  ('Fredelyn Calla', '(she/her)', 'advisor', '/images/team/fredelyn.png',
   'An art therapist with Head/Heart Therapy focusing on BIPOC mental health and social-justice advocacy. She also works with Gilda''s Club Chicago and lectures at SAIC.', '', 9),
  ('Leslie Jaeger', '(he/him)', 'advisor', '/images/team/leslie.jpeg',
   'Served as Interim Pastor of Big Shoulders Church, a partner of Anne''s Haven, in 2022–2023. Believes every situation can become a learning opportunity.', '', 10)
) as v(name, role, category, photo_url, bio, quote, sort_order)
where not exists (select 1 from team_members);
