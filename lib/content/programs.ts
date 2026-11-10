import { getPrograms } from "./db";

export const ENTRE_FALLBACK = [
  "Vendor markets",
  "Women's Networking & Bartering Collective",
  "Business Expos",
  "Women's Business events",
  "Marketing workshops",
  "Financial advisory workshops",
];

export async function getEntreProgramTitles(): Promise<string[]> {
  const all = await getPrograms();
  const entre = all.filter((p) => p.category === "entrepreneurship");
  return entre.length ? entre.map((p) => p.title) : ENTRE_FALLBACK;
}
