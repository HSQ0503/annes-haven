import { HeaderNav } from "@/components/header-nav";
import { getSettings } from "@/lib/content/db";

export async function Header() {
  const s = await getSettings();
  return <HeaderNav donateUrl={s.donate_url} />;
}
