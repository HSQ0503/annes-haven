@AGENTS.md

# Anne's Haven — Project Specification

A redesign of the website for **Anne's Haven**, a woman-founded 501(c)(3) peace center
in Portage Park, Chicago (founded 2016). Built by Shouqi Han via **Brightlaunch** (free
websites for community orgs). This doc is the source of truth for client requirements and
remaining work; it's derived from the client email thread (May 28 – Jun 4, 2026).

## Stakeholders
- **Janet Giangrasse** — Founder & Director, primary client. `anneshaefene@gmail.com` /
  773-512-8115. Comfortable editing existing pages but adding pages/interactive elements
  is "a mystery" to her — she must be able to make content changes herself without code.
- **Santucee "Tucee" Bell** — liaison who gathered requirements and the design handoff.
- **Shouqi Han** — developer (you/the user).

## Client intent (the "why")
- Current site feels **old-fashioned**; needs a modern refresh.
- Must stay **low-key, human-focused** — about connection, sharing knowledge, diversity.
  NOT high-tech or over-polished. "Let the essence of Anne's come through."
- The org's #1 ask: Janet must be able to **update content constantly, herself, on the fly.**

## Tech stack
- Next.js 16.2.7 (App Router) · React 19 · TypeScript 5 · Tailwind v4 (`@theme` in
  `app/globals.css`, no JS config) · deploys to Vercel.
- Design system: green primary / gold accent / steel-blue secondary, scrapbook warmth
  (taped photos, handwritten Caveat notes, dotted dividers). Lives in `app/globals.css`.
- Site config (nav, contact, socials, footer links) centralized in `lib/site.ts`.

---

## ✅ Done (redesign / design handoff)
- Full modern rebuild: all 13 pages, responsive, design system, hero carousel, dropdown nav.
- Color palette implemented per `annes_haven_color_palette.png`.
- Correct logo (`public/brand/AH-logo.png`), footer email `anneshaefene@gmail.com`.
- Footer "quick links" — no "resources" link; Explore/Connect groups wired to pages.
- Socials wired: Instagram, Facebook, YouTube. Footer year reads 2026.
- Testimonials section exists (homepage, 3 quotes).

---

## 🚧 Outstanding work

### 1. Admin panel / CMS — THE major feature (not started)
Everything is currently hardcoded in `.tsx` files and `lib/site.ts`. Janet needs a
self-service admin UI to edit content live, without touching code. Required editable areas
(from the client list):
- Programs pages & content (updated regularly)
- Board member info & senior staff info (the `/team` page)
- Homepage / main page content
- Basic information pages & general copy/messaging site-wide
- Photos across the entire site
- Ability to align content with the org's expanding vision over time

Implies: a data store (DB/CMS) + auth-gated admin UI + migrating hardcoded content into
editable records + image upload. Decide architecture (e.g. headless CMS vs. Supabase/Prisma
+ custom admin) — keep it simple enough that Janet can use it confidently.

### 2. Mockup edits still needing wiring
- **Editable year**: footer "© 2026" must become an editable field (ties into admin panel).
- **Volunteer hero CTA** (`/get-involved`): the "apply now" button must hold an
  **embeddable external link** to the application (admin-editable). Currently → `/contact`.
- **Volunteer roles**: each role needs an **embeddable link to its full role description**
  (admin-editable). Currently every role's "Apply" → `/contact`.
- **"Be part of something bigger" CTA**: "Apply Now" must be an embeddable link;
  "Contact Us" should route to contact. Currently both → `/contact`.
- **LinkedIn social link**: still `href="#"` in `lib/site.ts` — needs the real URL.

### 3. Videos page (`/videos`) — make video count dynamic
- Keep the original Anne's Haven video; add a new one titled **"A Decade In."**
- Leave space for **4+ additional videos** (partners: Chimbuani, Jacopo, possibly more).
- Page must be **responsive to however many videos** are added (data-driven list, not the
  current fixed 3 placeholder cards). Embeds are placeholders until real links arrive.

### 4. Content updates
- **Testimonials**: update and expand beyond the current 3.
- **Peace Education page** (`/peace-education`): improve it.
- **"Use the Space" page** (`/use-the-space`): fix the photo.

### 5. Functional forms (currently UI-only)
- `components/contact-form.tsx` and `components/newsletter-form.tsx` only toggle a "thank
  you" state — no submission. Wire to a real handler (e.g. route handler + Resend) so
  messages/signups actually reach Anne's Haven.

---

## Notes
- Original content & images are preserved from the old site unless a change was requested.
- Client is open to creative direction.
