import { notFound } from "next/navigation";
import { PAGE_CONFIGS, getPage, type PageSlug } from "@/lib/content/pages";
import { PageForm } from "../form";

export default async function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = PAGE_CONFIGS[slug];
  if (!config) notFound();
  const initial = await getPage(slug as PageSlug);
  return <PageForm config={config} initial={initial} />;
}
