import { createClient } from "@supabase/supabase-js";

/**
 * Session-less client for reading public content in server components.
 * Safe with the publishable key — RLS allows public SELECT, writes are blocked.
 */
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  { auth: { persistSession: false } },
);
