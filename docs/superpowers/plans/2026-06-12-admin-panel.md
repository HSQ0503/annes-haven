# Anne's Haven Admin Panel — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Janet (non-technical founder) a self-service `/admin` panel to edit all site content — page copy, team/board, programs, testimonials, videos, photos, links, and settings — with changes appearing on the live site instantly, no redeploy.

**Architecture:** Content moves out of hardcoded `.tsx` into a Supabase Postgres database. Public pages become server components that read content through a small cached data-access layer. A protected `/admin` route group (Supabase Auth, cookie sessions) renders forms whose sections mirror the public pages Janet already knows. Saves go through React 19 server actions → validate with Zod → write to Supabase → `revalidateTag` so the public site updates immediately. Photos upload to Supabase Storage; `next/image` serves them.

**Tech Stack:** Next.js 16 (App Router) · React 19 server actions · Supabase (Postgres + Auth + Storage) · `@supabase/ssr` · Zod · Vitest (logic-layer tests only) · TypeScript · existing CSS design system.

---

## Testing Strategy (read first)

This repo has no test framework today and the owner prefers minimal deps. So:

- **TDD with Vitest** for the *logic layer only*: Zod content schemas, the content-access/fetch helpers, the auth guard, and the tag/path revalidation map. These are pure, high-value, and cheap to test.
- **Verification (not unit tests)** for UI/forms/pages: each such task ends with `npm run lint`, `npm run build` (typecheck), and a scripted **manual smoke test** with explicit expected results.
- Every task still ends in a **commit**.

Never claim a task is done without running its stated verification command and seeing the expected output.

---

## Content Model (the target data)

**Singletons** (exactly one row; edited as a single form):
- `site_settings` — phone, cell, email, peace_email, address_street, address_city, donate_url, instagram_url, facebook_url, youtube_url, linkedin_url, footer_year, footer_tagline.
- Page singletons (one row each in a `page_content` table, keyed by slug, `data` JSONB validated per-slug): `home`, `about`, `peace-education`, `use-the-space`, `get-involved`, `support`, `contact`.

**Collections** (repeatable, ordered rows):
- `team_members` — name, role, category (`founder|staff|board|committee`), photo_url, bio, quote, sort_order.
- `programs` — title, blurb, image_url, status (`current|past`), event_date (nullable), sort_order.
- `testimonials` — quote, author, sort_order.
- `videos` — youtube_id (nullable = "coming soon"), title, blurb, featured (bool), sort_order.
- `volunteer_roles` — title, icon, body, items (text[]), description_url (nullable), sort_order.
- `partners` — name, logo_url, blurb, links (jsonb), sort_order.
- `funders` — name, logo_url (nullable), sort_order.

**Storage:** one public bucket `media` for all uploaded photos.

---

## File Structure

```
lib/supabase/
  client.ts          # browser client (anon)
  server.ts          # server client w/ cookie session (@supabase/ssr)
  admin.ts           # service-role client (server-only, writes/storage)
lib/content/
  schemas.ts         # Zod schemas for every singleton + collection row
  settings.ts        # getSiteSettings() cached fetcher
  pages.ts           # getPage(slug) cached fetcher
  collections.ts     # getCollection(name) cached fetchers (team, programs, ...)
  revalidate.ts      # CONTENT_TAGS map + revalidateContent(key)
lib/auth/
  guard.ts           # requireAdmin() — pure-ish guard used by admin pages/actions
supabase/
  migrations/0001_init.sql
  seed/seed.ts       # one-time migration of current hardcoded content into DB
app/admin/
  layout.tsx         # admin shell (sidebar nav mirroring the site), auth-gated
  login/page.tsx     # magic-link login
  page.tsx           # dashboard
  settings/page.tsx + actions.ts
  team/page.tsx + [id]/page.tsx + actions.ts
  ...one folder per content type
components/admin/
  field.tsx, submit-button.tsx, image-upload.tsx, sortable-list.tsx, form-status.tsx
middleware.ts        # refresh session + protect /admin
```

Public page components are modified to read fetchers instead of hardcoded consts; `lib/site.ts` becomes a thin fallback/types module.

---

## PHASE 0 — Foundations

### Task 0.1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime + dev deps**

Run:
```bash
npm install @supabase/supabase-js @supabase/ssr zod
npm install -D vitest @vitejs/plugin-react vite-tsconfig-paths
```
Expected: installs succeed, `package.json` lists all five.

- [ ] **Step 2: Add test script**

In `package.json` `scripts`, add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create Vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: { environment: "node", include: ["**/*.test.ts"] },
});
```

- [ ] **Step 4: Verify Vitest runs (no tests yet)**

Run: `npm test`
Expected: "No test files found" (exit 0) — config loads cleanly.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add supabase, zod, and vitest tooling"
```

### Task 0.2: Supabase project + environment

**Files:**
- Create: `.env.local`, `.env.example`
- Modify: `.gitignore` (confirm `.env*.local` ignored — Next default already does)

- [ ] **Step 1 (manual, owner/dev): Create the Supabase project**

In the Supabase dashboard: create project "annes-haven". Copy Project URL, `anon` key, and `service_role` key.

- [ ] **Step 2: Write `.env.local`** (never committed)

```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
ADMIN_EMAILS=hsq0503@gmail.com,anneshaefene@gmail.com,santucee.bell@gmail.com
```

- [ ] **Step 3: Write `.env.example`** (committed, no secrets)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=
```

- [ ] **Step 4: Commit**

```bash
git add .env.example
git commit -m "chore: document required supabase env vars"
```

### Task 0.3: Database schema migration

**Files:**
- Create: `supabase/migrations/0001_init.sql`

- [ ] **Step 1: Write the schema + RLS**

Create `supabase/migrations/0001_init.sql`:
```sql
-- Singletons --------------------------------------------------------------
create table site_settings (
  id int primary key default 1,
  phone text, cell text, email text, peace_email text,
  address_street text, address_city text, donate_url text,
  instagram_url text, facebook_url text, youtube_url text, linkedin_url text,
  footer_year text, footer_tagline text,
  updated_at timestamptz default now(),
  constraint singleton check (id = 1)
);

create table page_content (
  slug text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- Collections -------------------------------------------------------------
create table team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null, role text, category text not null default 'staff',
  photo_url text, bio text, quote text, sort_order int not null default 0,
  updated_at timestamptz default now()
);
create table programs (
  id uuid primary key default gen_random_uuid(),
  title text not null, blurb text, image_url text,
  status text not null default 'current', event_date date,
  sort_order int not null default 0, updated_at timestamptz default now()
);
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null, author text, sort_order int not null default 0,
  updated_at timestamptz default now()
);
create table videos (
  id uuid primary key default gen_random_uuid(),
  youtube_id text, title text not null, blurb text,
  featured boolean not null default false,
  sort_order int not null default 0, updated_at timestamptz default now()
);
create table volunteer_roles (
  id uuid primary key default gen_random_uuid(),
  title text not null, icon text, body text, items text[] default '{}',
  description_url text, sort_order int not null default 0,
  updated_at timestamptz default now()
);
create table partners (
  id uuid primary key default gen_random_uuid(),
  name text not null, logo_url text, blurb text, links jsonb default '[]'::jsonb,
  sort_order int not null default 0, updated_at timestamptz default now()
);
create table funders (
  id uuid primary key default gen_random_uuid(),
  name text not null, logo_url text, sort_order int not null default 0,
  updated_at timestamptz default now()
);

-- Row Level Security: public can READ, only authenticated can WRITE --------
do $$
declare t text;
begin
  foreach t in array array['site_settings','page_content','team_members',
    'programs','testimonials','videos','volunteer_roles','partners','funders']
  loop
    execute format('alter table %I enable row level security;', t);
    execute format('create policy "public read" on %I for select using (true);', t);
    execute format('create policy "auth write" on %I for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- Storage bucket for media ------------------------------------------------
insert into storage.buckets (id, name, public) values ('media','media', true)
  on conflict (id) do nothing;
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');
create policy "auth write media" on storage.objects
  for all to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');

insert into site_settings (id) values (1) on conflict do nothing;
```

- [ ] **Step 2: Apply the migration**

Run it in the Supabase SQL editor (paste file contents) **or** via CLI:
```bash
npx supabase db push   # if Supabase CLI is linked
```
Expected: all tables + policies created; `site_settings` has one row (id=1).

- [ ] **Step 3: Verify in dashboard**

In Table editor, confirm 9 tables exist and `storage.buckets` has a public `media` bucket.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/0001_init.sql
git commit -m "feat(db): initial content schema with public-read RLS"
```

### Task 0.4: Supabase clients

**Files:**
- Create: `lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/admin.ts`

- [ ] **Step 1: Browser client**

`lib/supabase/client.ts`:
```ts
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
```

- [ ] **Step 2: Server client (cookie session)**

`lib/supabase/server.ts`:
```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          try {
            toSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // called from a Server Component — middleware refreshes instead
          }
        },
      },
    },
  );
}
```

- [ ] **Step 3: Service-role client (server-only writes/storage)**

`lib/supabase/admin.ts`:
```ts
import "server-only";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);
```

- [ ] **Step 4: Verify typecheck**

Run: `npm run build` (or `npx tsc --noEmit` if faster)
Expected: compiles without type errors.

- [ ] **Step 5: Commit**

```bash
git add lib/supabase
git commit -m "feat: add supabase browser, server, and admin clients"
```

### Task 0.5: Allow Supabase Storage images in next/image

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add remotePatterns**

`next.config.ts`:
```ts
import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host
  : "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: compiles; no image-config errors.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat: allow supabase storage images in next/image"
```

---

## PHASE 1 — Content schemas + access layer (TDD)

### Task 1.1: Zod schemas for all content

**Files:**
- Create: `lib/content/schemas.ts`
- Test: `lib/content/schemas.test.ts`

- [ ] **Step 1: Write failing tests**

`lib/content/schemas.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { siteSettingsSchema, teamMemberSchema, videoSchema, homeSchema } from "./schemas";

describe("content schemas", () => {
  it("accepts valid site settings and defaults missing optionals to empty", () => {
    const r = siteSettingsSchema.parse({ email: "a@b.com" });
    expect(r.email).toBe("a@b.com");
    expect(r.linkedin_url).toBe("");
  });
  it("rejects a team member with no name", () => {
    expect(() => teamMemberSchema.parse({ category: "staff" })).toThrow();
  });
  it("allows a video with a null youtube_id (coming soon)", () => {
    const r = videoSchema.parse({ title: "A Decade In", youtube_id: null });
    expect(r.youtube_id).toBeNull();
  });
  it("home schema requires a hero heading", () => {
    expect(() => homeSchema.parse({})).toThrow();
  });
});
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `npm test -- schemas`
Expected: FAIL — "Cannot find module './schemas'".

- [ ] **Step 3: Implement schemas**

`lib/content/schemas.ts`:
```ts
import { z } from "zod";

const opt = z.string().trim().default("");

export const siteSettingsSchema = z.object({
  phone: opt, cell: opt, email: opt, peace_email: opt,
  address_street: opt, address_city: opt, donate_url: opt,
  instagram_url: opt, facebook_url: opt, youtube_url: opt, linkedin_url: opt,
  footer_year: opt, footer_tagline: opt,
});
export type SiteSettings = z.infer<typeof siteSettingsSchema>;

export const teamMemberSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, "Name is required"),
  role: opt,
  category: z.enum(["founder", "staff", "board", "committee"]).default("staff"),
  photo_url: opt,
  bio: opt,
  quote: opt,
  sort_order: z.number().int().default(0),
});
export type TeamMember = z.infer<typeof teamMemberSchema>;

export const videoSchema = z.object({
  id: z.string().uuid().optional(),
  youtube_id: z.string().trim().min(1).nullable().default(null),
  title: z.string().trim().min(1, "Title is required"),
  blurb: opt,
  featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});
export type Video = z.infer<typeof videoSchema>;

// Page singletons: shape the `data` JSONB. Start with home; extend per page.
export const homeSchema = z.object({
  hero_kicker: opt,
  hero_heading: z.string().trim().min(1, "Hero heading is required"),
  hero_lead: opt,
  mission_heading: opt,
  mission_body: opt,
  cta_title: opt,
  cta_text: opt,
});
export type HomeContent = z.infer<typeof homeSchema>;

// Registry so the admin + fetchers can look a page schema up by slug.
export const pageSchemas = { home: homeSchema } as const;
export type PageSlug = keyof typeof pageSchemas;
```

- [ ] **Step 4: Run tests, verify they pass**

Run: `npm test -- schemas`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/content/schemas.ts lib/content/schemas.test.ts
git commit -m "feat(content): zod schemas for settings, team, videos, home"
```

> Note for later phases: add `programsSchema`, `testimonialSchema`, `volunteerRoleSchema`, `partnerSchema`, `funderSchema`, and the remaining page schemas (`about`, `peace-education`, `use-the-space`, `get-involved`, `support`, `contact`) to this file + this test, following the exact patterns above, when you build each content type's phase.

### Task 1.2: Revalidation map (TDD)

**Files:**
- Create: `lib/content/revalidate.ts`
- Test: `lib/content/revalidate.test.ts`

- [ ] **Step 1: Write failing test**

`lib/content/revalidate.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { CONTENT_TAGS } from "./revalidate";

describe("content tags", () => {
  it("maps each content key to a stable cache tag", () => {
    expect(CONTENT_TAGS.site_settings).toBe("content:site_settings");
    expect(CONTENT_TAGS.team_members).toBe("content:team_members");
    expect(CONTENT_TAGS.page_home).toBe("content:page_home");
  });
});
```

- [ ] **Step 2: Run, verify fail**

Run: `npm test -- revalidate`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`lib/content/revalidate.ts`:
```ts
import { revalidateTag } from "next/cache";

export const CONTENT_TAGS = {
  site_settings: "content:site_settings",
  team_members: "content:team_members",
  programs: "content:programs",
  testimonials: "content:testimonials",
  videos: "content:videos",
  volunteer_roles: "content:volunteer_roles",
  partners: "content:partners",
  funders: "content:funders",
  page_home: "content:page_home",
  page_about: "content:page_about",
  page_contact: "content:page_contact",
} as const;

export type ContentTag = keyof typeof CONTENT_TAGS;

export function revalidateContent(key: ContentTag) {
  revalidateTag(CONTENT_TAGS[key]);
}
```

- [ ] **Step 4: Run, verify pass**

Run: `npm test -- revalidate`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/content/revalidate.ts lib/content/revalidate.test.ts
git commit -m "feat(content): cache tag map + revalidateContent helper"
```

### Task 1.3: Cached fetchers (settings + page + collections)

**Files:**
- Create: `lib/content/settings.ts`, `lib/content/pages.ts`, `lib/content/collections.ts`

- [ ] **Step 1: Settings fetcher**

`lib/content/settings.ts`:
```ts
import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { siteSettingsSchema, type SiteSettings } from "./schemas";
import { CONTENT_TAGS } from "./revalidate";

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
    return siteSettingsSchema.parse(data ?? {});
  },
  ["site_settings"],
  { tags: [CONTENT_TAGS.site_settings] },
);
```

- [ ] **Step 2: Page fetcher**

`lib/content/pages.ts`:
```ts
import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { pageSchemas, type PageSlug } from "./schemas";
import { CONTENT_TAGS } from "./revalidate";

export async function getPage<S extends PageSlug>(slug: S) {
  const fetcher = unstable_cache(
    async () => {
      const supabase = await createClient();
      const { data } = await supabase.from("page_content").select("data").eq("slug", slug).single();
      return pageSchemas[slug].parse(data?.data ?? {});
    },
    ["page", slug],
    { tags: [CONTENT_TAGS[`page_${slug}` as keyof typeof CONTENT_TAGS]] },
  );
  return fetcher();
}
```

- [ ] **Step 3: Collection fetchers**

`lib/content/collections.ts`:
```ts
import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_TAGS } from "./revalidate";

function collectionFetcher<T>(table: keyof typeof CONTENT_TAGS) {
  return unstable_cache(
    async (): Promise<T[]> => {
      const supabase = await createClient();
      const { data } = await supabase.from(table).select("*").order("sort_order", { ascending: true });
      return (data ?? []) as T[];
    },
    [table],
    { tags: [CONTENT_TAGS[table]] },
  );
}

import type { TeamMember, Video } from "./schemas";
export const getTeam = collectionFetcher<TeamMember>("team_members");
export const getVideos = collectionFetcher<Video>("videos");
// add getPrograms, getTestimonials, getVolunteerRoles, getPartners, getFunders in their phases
```

- [ ] **Step 4: Verify typecheck**

Run: `npm run build`
Expected: compiles.

- [ ] **Step 5: Commit**

```bash
git add lib/content/settings.ts lib/content/pages.ts lib/content/collections.ts
git commit -m "feat(content): cached fetchers for settings, pages, collections"
```

---

## PHASE 2 — Auth + admin shell

### Task 2.1: Middleware session refresh + /admin protection

**Files:**
- Create: `middleware.ts`
- Create: `lib/auth/guard.ts`
- Test: `lib/auth/guard.test.ts`

- [ ] **Step 1: Write failing test for the email allowlist guard**

`lib/auth/guard.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { isAdminEmail } from "./guard";

describe("isAdminEmail", () => {
  const allow = "hsq0503@gmail.com, anneshaefene@gmail.com";
  it("accepts a listed email case-insensitively", () => {
    expect(isAdminEmail("ANNESHAEFENE@gmail.com", allow)).toBe(true);
  });
  it("rejects an unlisted email", () => {
    expect(isAdminEmail("stranger@gmail.com", allow)).toBe(false);
  });
  it("rejects empty/undefined", () => {
    expect(isAdminEmail(undefined, allow)).toBe(false);
  });
});
```

- [ ] **Step 2: Run, verify fail**

Run: `npm test -- guard`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement guard helper**

`lib/auth/guard.ts`:
```ts
import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export function isAdminEmail(email: string | undefined | null, allowlist: string): boolean {
  if (!email) return false;
  const set = new Set(allowlist.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean));
  return set.has(email.toLowerCase());
}

/** Use at the top of every admin page/server action. Redirects if not an admin. */
export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email, process.env.ADMIN_EMAILS ?? "")) redirect("/admin/login");
  return user!;
}
```

- [ ] **Step 4: Run, verify pass**

Run: `npm test -- guard`
Expected: PASS (3 tests).

- [ ] **Step 5: Implement middleware**

`middleware.ts`:
```ts
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );
  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;
  if (path.startsWith("/admin") && !path.startsWith("/admin/login") && !user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: compiles.

- [ ] **Step 7: Commit**

```bash
git add middleware.ts lib/auth/guard.ts lib/auth/guard.test.ts
git commit -m "feat(auth): admin email allowlist guard + protected /admin middleware"
```

### Task 2.2: Magic-link login + sign-out

**Files:**
- Create: `app/admin/login/page.tsx`, `app/admin/login/actions.ts`
- Create: `app/auth/confirm/route.ts` (OTP verification callback)
- Create: `app/admin/actions.ts` (signOut)

- [ ] **Step 1: Login page (client form posting a server action)**

`app/admin/login/page.tsx`:
```tsx
"use client";
import { useActionState } from "react";
import { sendMagicLink } from "./actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(sendMagicLink, null);
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 440 }}>
        <h1 style={{ fontSize: "2rem" }}>Anne&apos;s Haven Admin</h1>
        <p className="lead">Enter your email and we&apos;ll send you a sign-in link.</p>
        <form action={action}>
          <div className="field">
            <label>Email</label>
            <input type="email" name="email" required placeholder="you@example.com" />
          </div>
          <button className="btn btn-lg" disabled={pending} style={{ width: "100%", justifyContent: "center" }}>
            {pending ? "Sending…" : "Email me a link"}
          </button>
        </form>
        {state?.message && <p className="tag gold" style={{ marginTop: 16 }}>{state.message}</p>}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Login + signout actions**

`app/admin/login/actions.ts`:
```ts
"use server";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth/guard";

export async function sendMagicLink(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  if (!isAdminEmail(email, process.env.ADMIN_EMAILS ?? "")) {
    return { message: "That email isn't authorized for admin access." };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/confirm` },
  });
  return { message: error ? error.message : "Check your inbox for the sign-in link." };
}
```

`app/admin/actions.ts`:
```ts
"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
```

- [ ] **Step 3: OTP confirm route**

`app/auth/confirm/route.ts`:
```ts
import { type NextRequest, NextResponse } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
```

- [ ] **Step 4: Add `NEXT_PUBLIC_SITE_URL`**

Add to `.env.local` and `.env.example`: `NEXT_PUBLIC_SITE_URL=http://localhost:3000` (use the production URL on Vercel). In Supabase dashboard → Authentication → URL Configuration, add `http://localhost:3000/**` and the production URL to redirect allowlist.

- [ ] **Step 5: Manual smoke test**

Run: `npm run dev`, visit `/admin` → expect redirect to `/admin/login`. Enter an allowlisted email → expect "Check your inbox". Click the emailed link → expect to land on `/admin`. Enter a non-allowlisted email → expect the "isn't authorized" message.

- [ ] **Step 6: Commit**

```bash
git add app/admin/login app/admin/actions.ts app/auth/confirm .env.example
git commit -m "feat(auth): magic-link login, OTP confirm, and sign-out"
```

### Task 2.3: Admin shell layout + dashboard

**Files:**
- Create: `app/admin/layout.tsx`, `app/admin/page.tsx`
- Create: `components/admin/nav.tsx`
- Modify: `app/globals.css` (append an `.admin-*` block)

- [ ] **Step 1: Admin layout (auth-gated, sidebar mirrors the site)**

`app/admin/layout.tsx`:
```tsx
import Link from "next/link";
import { headers } from "next/headers";
import { requireAdmin } from "@/lib/auth/guard";
import { signOut } from "./actions";

const SECTIONS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/home", label: "Homepage" },
  { href: "/admin/team", label: "Team & Board" },
  { href: "/admin/programs", label: "Programs & Events" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/videos", label: "Videos" },
  { href: "/admin/volunteer-roles", label: "Volunteer Roles" },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/funders", label: "Funders" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = (await headers()).get("x-pathname") ?? "";
  if (!path.startsWith("/admin/login")) await requireAdmin();
  return (
    <div className="admin-wrap">
      <aside className="admin-side">
        <strong>Anne&apos;s Haven</strong>
        <nav>{SECTIONS.map((s) => <Link key={s.href} href={s.href}>{s.label}</Link>)}</nav>
        <form action={signOut}><button className="textlink">Sign out</button></form>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
```
> The login route lives under `/admin/login` but must NOT require auth. Place `login/` so it renders its own minimal page; guard skips it via the path check above. (Alternatively move login to a route group outside this layout — acceptable.)

- [ ] **Step 2: Dashboard**

`app/admin/page.tsx`:
```tsx
export default function AdminDashboard() {
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Welcome back</h1>
      <p className="lead">Pick a section on the left to edit your website. Changes go live right away.</p>
    </>
  );
}
```

- [ ] **Step 3: Admin styles**

Append to `app/globals.css`:
```css
/* ---- Admin panel ---- */
.admin-wrap { display: grid; grid-template-columns: 248px 1fr; min-height: 100vh; }
.admin-side { background: var(--color-green-900); color: #cdddd3; padding: 24px 16px; display: flex; flex-direction: column; gap: 6px; }
.admin-side strong { color: #fff; font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 14px; }
.admin-side nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.admin-side nav a { color: #cdddd3; padding: 9px 12px; border-radius: 9px; font-weight: 600; font-size: .95rem; }
.admin-side nav a:hover { background: rgba(255,255,255,.08); color: #fff; }
.admin-main { padding: clamp(24px, 4vw, 48px); max-width: 880px; }
.admin-bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 24px; }
@media (max-width: 760px) { .admin-wrap { grid-template-columns: 1fr; } .admin-side { flex-direction: row; flex-wrap: wrap; } .admin-side nav { flex-direction: row; flex-wrap: wrap; } }
```

- [ ] **Step 4: Provide `x-pathname` header via middleware**

In `middleware.ts`, before returning `response`, add: `response.headers.set("x-pathname", request.nextUrl.pathname);` (so the layout can detect the login route).

- [ ] **Step 5: Manual smoke test**

Run: `npm run dev`, sign in, visit `/admin` → expect the sidebar shell + dashboard. Click "Sign out" → expect redirect to login.

- [ ] **Step 6: Commit**

```bash
git add app/admin/layout.tsx app/admin/page.tsx app/globals.css middleware.ts
git commit -m "feat(admin): authenticated admin shell + dashboard"
```

---

## PHASE 3 — Reference vertical slice: Site Settings (singleton, no images)

This is the **template for every singleton**. It also fixes the email's footer/social/contact wiring items.

### Task 3.1: Settings editor + save action

**Files:**
- Create: `app/admin/settings/page.tsx`, `app/admin/settings/actions.ts`
- Create: `components/admin/field.tsx`, `components/admin/form-status.tsx`, `components/admin/submit-button.tsx`

- [ ] **Step 1: Shared form primitives**

`components/admin/field.tsx`:
```tsx
export function Field({ label, name, defaultValue = "", type = "text", textarea = false }:
  { label: string; name: string; defaultValue?: string; type?: string; textarea?: boolean }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {textarea
        ? <textarea id={name} name={name} defaultValue={defaultValue} />
        : <input id={name} name={name} type={type} defaultValue={defaultValue} />}
    </div>
  );
}
```

`components/admin/submit-button.tsx`:
```tsx
"use client";
import { useFormStatus } from "react-dom";
export function SubmitButton({ label = "Save changes" }: { label?: string }) {
  const { pending } = useFormStatus();
  return <button className="btn" disabled={pending}>{pending ? "Saving…" : label}</button>;
}
```

`components/admin/form-status.tsx`:
```tsx
export function FormStatus({ state }: { state: { ok?: boolean; message?: string } | null }) {
  if (!state?.message) return null;
  return <p className={`tag ${state.ok ? "gold" : ""}`} style={{ marginTop: 14 }}>{state.message}</p>;
}
```

- [ ] **Step 2: Save action**

`app/admin/settings/actions.ts`:
```ts
"use server";
import { requireAdmin } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { siteSettingsSchema } from "@/lib/content/schemas";
import { revalidateContent } from "@/lib/content/revalidate";

export async function saveSettings(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const parsed = siteSettingsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };
  const { error } = await supabaseAdmin
    .from("site_settings")
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) return { ok: false, message: error.message };
  revalidateContent("site_settings");
  return { ok: true, message: "Saved! Your changes are live." };
}
```

- [ ] **Step 3: Settings page**

`app/admin/settings/page.tsx`:
```tsx
"use client";
import { useActionState } from "react";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormStatus } from "@/components/admin/form-status";
import { saveSettings } from "./actions";
import type { SiteSettings } from "@/lib/content/schemas";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [state, action] = useActionState(saveSettings, null);
  return (
    <form action={action}>
      <h1 style={{ fontSize: "2rem" }}>Site Settings</h1>
      <Field label="Phone" name="phone" defaultValue={initial.phone} />
      <Field label="Cell" name="cell" defaultValue={initial.cell} />
      <Field label="Email" name="email" defaultValue={initial.email} type="email" />
      <Field label="Donate URL" name="donate_url" defaultValue={initial.donate_url} />
      <Field label="Instagram URL" name="instagram_url" defaultValue={initial.instagram_url} />
      <Field label="Facebook URL" name="facebook_url" defaultValue={initial.facebook_url} />
      <Field label="YouTube URL" name="youtube_url" defaultValue={initial.youtube_url} />
      <Field label="LinkedIn URL" name="linkedin_url" defaultValue={initial.linkedin_url} />
      <Field label="Footer year" name="footer_year" defaultValue={initial.footer_year} />
      <Field label="Footer tagline" name="footer_tagline" defaultValue={initial.footer_tagline} />
      <SubmitButton />
      <FormStatus state={state} />
    </form>
  );
}
```
> Because the page needs server data + a client form, split: make `page.tsx` a server component that fetches and renders `<SettingsForm initial={...} />`. Put `SettingsForm` in `app/admin/settings/form.tsx` and keep `page.tsx`:
```tsx
import { getSiteSettings } from "@/lib/content/settings";
import { SettingsForm } from "./form";
export default async function Page() {
  return <SettingsForm initial={await getSiteSettings()} />;
}
```

- [ ] **Step 4: Manual smoke test**

Run: `npm run dev`, go to `/admin/settings`, change the phone + add the LinkedIn URL, Save → expect "Saved! Your changes are live."; reload → values persist.

- [ ] **Step 5: Commit**

```bash
git add app/admin/settings components/admin
git commit -m "feat(admin): site settings editor (singleton reference slice)"
```

### Task 3.2: Rewire footer, header, contact to read settings

**Files:**
- Modify: `components/footer.tsx`, `components/header.tsx`, `app/contact/page.tsx`, `lib/site.ts`

- [ ] **Step 1: Make `lib/site.ts` types-only fallback**

Keep `nav`, `socials` *labels/icons*, and `footerLinks` (these are structure, not content Janet edits day-to-day). Remove the hardcoded contact values that now come from the DB, or keep them as a fallback used only if a field is blank.

- [ ] **Step 2: Footer reads settings**

In `components/footer.tsx`, make it `async`, call `const s = await getSiteSettings();` and replace `site.phone/email/address/...` and each social `href` with the DB values (e.g. socials map pulls `s.instagram_url`, `s.facebook_url`, `s.youtube_url`, `s.linkedin_url`). Use the footer year from `s.footer_year`.

- [ ] **Step 3: Header donate button**

`components/header.tsx` is a client component. Pass `donateUrl` down: fetch in a server parent or read via a small server wrapper. Simplest: make a server `HeaderData` that fetches settings and renders the existing client `<HeaderNav donateUrl={...} />`. Move the donate `href` to the prop.

- [ ] **Step 4: Contact page reads settings**

`app/contact/page.tsx` — replace hardcoded phone/email/address info-rows with `getSiteSettings()` values.

- [ ] **Step 5: Verify build + smoke test**

Run: `npm run build`. Then `npm run dev`: change footer tagline + LinkedIn in admin, Save, open the public site → expect the footer to show the new tagline and a working LinkedIn icon **without** a redeploy.

- [ ] **Step 6: Commit**

```bash
git add components/footer.tsx components/header.tsx app/contact/page.tsx lib/site.ts
git commit -m "feat: footer/header/contact read live site settings from DB"
```

---

## PHASE 4 — Image uploads (Supabase Storage)

### Task 4.1: Upload action + reusable image field

**Files:**
- Create: `app/admin/upload/actions.ts`, `components/admin/image-upload.tsx`

- [ ] **Step 1: Upload server action**

`app/admin/upload/actions.ts`:
```ts
"use server";
import { requireAdmin } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdmin();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "No file selected." };
  if (file.size > 8_000_000) return { error: "Image must be under 8MB." };
  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const path = `${formData.get("folder") ?? "misc"}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabaseAdmin.storage.from("media").upload(path, file, {
    contentType: file.type, upsert: false,
  });
  if (error) return { error: error.message };
  const { data } = supabaseAdmin.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl };
}
```

- [ ] **Step 2: Image upload field (client)**

`components/admin/image-upload.tsx`:
```tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/app/admin/upload/actions";

export function ImageUpload({ name, folder, defaultUrl = "" }:
  { name: string; folder: string; defaultUrl?: string }) {
  const [url, setUrl] = useState(defaultUrl);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setErr("");
    const fd = new FormData(); fd.set("file", file); fd.set("folder", folder);
    const res = await uploadImage(fd);
    setBusy(false);
    if (res.error) setErr(res.error); else setUrl(res.url!);
  }
  return (
    <div className="field">
      <input type="hidden" name={name} value={url} />
      {url && <Image src={url} alt="" width={160} height={120} style={{ objectFit: "cover", borderRadius: 10, marginBottom: 8 }} />}
      <input type="file" accept="image/*" onChange={onChange} disabled={busy} />
      {busy && <small>Uploading…</small>}
      {err && <small style={{ color: "#b00" }}>{err}</small>}
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: compiles (Supabase host already allowed in `next.config.ts`).

- [ ] **Step 4: Commit**

```bash
git add app/admin/upload components/admin/image-upload.tsx
git commit -m "feat(admin): image upload action + reusable image field"
```

---

## PHASE 5 — Reference vertical slice: Team & Board (collection w/ images + ordering)

This is the **template for every collection**.

### Task 5.1: Team list + create/edit/delete + reorder

**Files:**
- Create: `app/admin/team/page.tsx`, `app/admin/team/actions.ts`, `app/admin/team/form.tsx`
- Modify: `lib/content/schemas.ts` (already has `teamMemberSchema`), `lib/content/collections.ts` (already has `getTeam`)

- [ ] **Step 1: Actions (create/update/delete/reorder)**

`app/admin/team/actions.ts`:
```ts
"use server";
import { requireAdmin } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { teamMemberSchema } from "@/lib/content/schemas";
import { revalidateContent } from "@/lib/content/revalidate";

export async function saveMember(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const raw = {
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    role: formData.get("role"),
    category: formData.get("category"),
    photo_url: formData.get("photo_url"),
    bio: formData.get("bio"),
    quote: formData.get("quote"),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  const parsed = teamMemberSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };
  const { id, ...row } = parsed.data;
  const q = id
    ? supabaseAdmin.from("team_members").update(row).eq("id", id)
    : supabaseAdmin.from("team_members").insert(row);
  const { error } = await q;
  if (error) return { ok: false, message: error.message };
  revalidateContent("team_members");
  return { ok: true, message: "Saved!" };
}

export async function deleteMember(id: string) {
  await requireAdmin();
  await supabaseAdmin.from("team_members").delete().eq("id", id);
  revalidateContent("team_members");
}
```

- [ ] **Step 2: List + inline editor**

`app/admin/team/page.tsx` (server): fetch `getTeam()`, render a list grouped by `category`, each row linking to its editor and a delete button (calls `deleteMember` via a form action), plus an "Add member" button. `app/admin/team/form.tsx` (client): the member form using `Field` components + `<ImageUpload name="photo_url" folder="team" defaultUrl={member.photo_url} />` + a `category` `<select>` + `useActionState(saveMember)`.

- [ ] **Step 3: Manual smoke test**

Run: `npm run dev`, `/admin/team` → add a member with a photo, Save; edit their bio; reorder via `sort_order`; delete a test member. Expect each change to persist on reload.

- [ ] **Step 4: Commit**

```bash
git add app/admin/team
git commit -m "feat(admin): team & board editor (collection reference slice)"
```

### Task 5.2: Rewire /team page to read DB

**Files:**
- Modify: `app/team/page.tsx`

- [ ] **Step 1: Read getTeam()**

Make `app/team/page.tsx` async; replace hardcoded member arrays with `await getTeam()`, filtering by `category` for the founder / staff / board / committee sections. Map each to the existing `.person` / `.founder` markup, using `member.photo_url` via the `Photo` component.

- [ ] **Step 2: Verify build + smoke test**

Run: `npm run build`. Then change a team member's bio in admin → confirm the public `/team` page reflects it without redeploy.

- [ ] **Step 3: Commit**

```bash
git add app/team/page.tsx
git commit -m "feat: /team renders live team members from DB"
```

---

## PHASE 6 — Remaining content types

Each of these follows an already-established template:
- **Collections** (programs, testimonials, videos, volunteer-roles, partners, funders) → copy the **Team pattern** (Phase 5): add the Zod schema (Task 1.1 note), add the `getX` fetcher (Task 1.3), add `app/admin/<x>/` (page + form + actions), add the tag to `CONTENT_TAGS`, then rewire the public page.
- **Page singletons** (home, about, peace-education, use-the-space, get-involved, support, contact) → copy the **Settings pattern** (Phase 3): add the page Zod schema to `pageSchemas`, write `app/admin/<slug>/` editing the `page_content` row, then rewire the public page to `getPage("<slug>")`.

Do each as its own task block with these steps: **(1)** add schema + test, **(2)** add fetcher, **(3)** add admin page/form/actions, **(4)** rewire public page, **(5)** `npm run build` + smoke test, **(6)** commit. Specific per-type notes:

### Task 6.1: Videos collection
- Fields per Task 1.1 `videoSchema`. Admin lets Janet paste a **YouTube ID or full URL** (parse the ID from a URL in the action), toggle `featured`, set `youtube_id` null for "coming soon". Rewire `app/videos/page.tsx` to `getVideos()` — featured = the `featured` row (or first), rest in the grid. This directly delivers the email's "A Decade In" + partner-video asks as editable rows.

### Task 6.2: Testimonials collection
- `testimonialSchema` = `{ quote (min1), author, sort_order }`. Rewire the homepage testimonials section (and anywhere else) to `getTestimonials()`. Delivers "testimonials updated and expanded."

### Task 6.3: Programs & Events collection
- `programsSchema` per content model. Admin supports image upload (`folder: "programs"`) + `status` select + optional `event_date`. Rewire `app/programs/page.tsx` to split current/past by `status`.

### Task 6.4: Volunteer Roles collection
- `volunteerRoleSchema` = `{ title, icon, body, items: string[], description_url, sort_order }`. `items` edited as one-per-line textarea (split on newlines in the action). Rewire `app/get-involved/page.tsx` roles grid; wire each role's "Apply"/description link to `description_url` (the email's per-role link requirement).

### Task 6.5: Partners + Funders collections
- `partnerSchema` / `funderSchema` per model, with logo upload. Rewire `app/partners/page.tsx` and `app/funders/page.tsx`.

### Task 6.6: Homepage singleton
- `homeSchema` (Task 1.1). Edit hero kicker/heading/lead, mission text, CTA. Rewire `app/page.tsx` hero + mission + CTA to `getPage("home")`. (Feature cards/explore cards can stay structural or become editable later.)

### Task 6.7: About / Peace Education / Use the Space / Get Involved / Support / Contact singletons
- Add a page schema for each (headings, leads, body paragraphs, and the **embeddable apply-now URL** for Get Involved + Support). Rewire each public page to `getPage("<slug>")`. Delivers the email's "apply now embeddable" + "Peace Education improvements" editability + "basic info pages" + "copy throughout."

---

## PHASE 7 — Data migration (seed) + cutover

### Task 7.1: Seed current content into the DB

**Files:**
- Create: `supabase/seed/seed.ts`

- [ ] **Step 1: Write a one-shot seed script**

Read the current hardcoded values from the existing page files (team members, testimonials, programs, videos already known, volunteer roles, site settings from `lib/site.ts`) and `insert` them via `supabaseAdmin`. Include the known video IDs already in `app/videos/page.tsx` and the settings already in `lib/site.ts` (set `linkedin_url` to the real URL once known).

- [ ] **Step 2: Run it once**

Run: `npx tsx supabase/seed/seed.ts` (add `tsx` as a dev dep if needed)
Expected: tables populated; admin shows existing content; public pages look identical to pre-migration.

- [ ] **Step 3: Commit**

```bash
git add supabase/seed/seed.ts package.json package-lock.json
git commit -m "chore(db): seed current site content into supabase"
```

### Task 7.2: Production config + handoff

- [ ] **Step 1:** Add all env vars (incl. `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS`, `NEXT_PUBLIC_SITE_URL`=production URL) to Vercel project settings.
- [ ] **Step 2:** Add the production URL to Supabase Auth redirect allowlist.
- [ ] **Step 3:** Deploy; sign in at `/admin` with Janet's email; verify an edit goes live.
- [ ] **Step 4:** Write a one-page "How to edit your website" guide for Janet (screenshots of the admin sections).
- [ ] **Step 5: Commit** any final config docs.

---

## Security Notes (apply throughout)

- Every server action that writes **must** call `await requireAdmin()` as its first line. RLS is the second line of defense (writes require an authenticated session), but never rely on the client.
- The `service_role` key is used **only** in `lib/supabase/admin.ts` (`server-only`) and never imported into a client component.
- Validate **all** input with Zod before writing.
- `ADMIN_EMAILS` is the gate for who can even request a magic link; keep it tight.

---

## Self-Review (done while writing this plan)

- **Spec coverage:** Programs ✓(6.3) · Board/staff ✓(5) · Homepage ✓(6.6) · Basic info pages/copy ✓(6.7) · Photos everywhere ✓(4 + every collection) · Footer year ✓(3) · Apply-now embeds ✓(6.7) · Per-role links ✓(6.4) · Videos incl. "A Decade In"/partners ✓(6.1) · Testimonials ✓(6.2) · LinkedIn/socials ✓(3) · Instant updates ✓(revalidateTag) · Non-technical UX ✓(page-shaped sidebar).
- **Type consistency:** `siteSettingsSchema`/`SiteSettings`, `teamMemberSchema`/`TeamMember`, `videoSchema`/`Video`, `CONTENT_TAGS`, `requireAdmin`, `getSiteSettings`/`getPage`/`getTeam` used consistently across tasks.
- **Placeholders:** Phase 6/7 intentionally reference the two fully-specified reference templates (Phases 3 & 5) rather than re-printing identical CRUD — the patterns are concrete and named, not "TBD".
```
