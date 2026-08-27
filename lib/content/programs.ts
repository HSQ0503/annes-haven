import { getPrograms } from "./db";

export const ENTRE_FALLBACK = [
  "Vendor markets",
  "Women's Networking & Bartering Collective",
  "Business Expos",
  "Women's Business events",
  "Marketing workshops",
  "Financial advisory workshops",
];

export const PEACE_FALLBACK = [
  "Conflict Resolution Forums",
  "Immigrant Appreciation Days",
  "Support groups",
  "Yoga, mindfulness, meditation & mind mapping",
  "Community Service 2.0",
  "MeToo support circles",
];

export async function getPeaceProgramTitles(): Promise<string[]> {
  const all = await getPrograms();
  const peace = all.filter((p) => p.category === "peace");
  return peace.length ? peace.map((p) => p.title) : PEACE_FALLBACK;
}

export async function getEntreProgramTitles(): Promise<string[]> {
  const all = await getPrograms();
  const entre = all.filter((p) => p.category === "entrepreneurship");
  return entre.length ? entre.map((p) => p.title) : ENTRE_FALLBACK;
}
