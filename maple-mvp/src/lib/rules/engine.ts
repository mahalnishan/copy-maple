import national from "../../../content/ca/national.json" assert { type: "json" };
import on from "../../../content/ca/provinces/on.json" assert { type: "json" };
import bc from "../../../content/ca/provinces/bc.json" assert { type: "json" };
import qc from "../../../content/ca/provinces/qc.json" assert { type: "json" };
import { Goal, Profile, Step } from "@/lib/types";

type Localized = string | { en: string; fr: string };

export function getCatalog(): Step[] {
  return [...(national as Step[]), ...(on as Step[]), ...(bc as Step[]), ...(qc as Step[])];
}

export function localizeText(v: Localized, lang: string) {
  if (typeof v === "string") return v;
  const key = (lang === "fr" ? "fr" : "en") as "en" | "fr";
  return v[key] ?? v.en;
}

export function generateChecklist(profile: Profile, lang: string) {
  const catalog = getCatalog();
  const byId = new Map<string, Step>();
  for (const s of catalog) {
    const key = s.id;
    const existing = byId.get(key);
    if (!existing) {
      byId.set(key, s);
      continue;
    }
    const isExistingProv = !!existing.province?.length;
    const isNewProv = !!s.province?.length;
    if (isNewProv && !isExistingProv) {
      byId.set(key, s);
    }
  }
  const merged = Array.from(byId.values());

  const eligible = merged.filter((s) => {
    if (s.province && !s.province.includes(profile.province)) return false;
    if (s.statuses && !s.statuses.includes(profile.status)) return false;
    if (!profile.goals.includes(s.goal)) return false;
    return true;
  });

  const goalOrder: Goal[] = [...profile.goals];
  const goalIndex = (g: Goal) => goalOrder.indexOf(g);
  eligible.sort((a, b) => goalIndex(a.goal) - goalIndex(b.goal));

  return eligible.map((s) => ({
    ...s,
    title: localizeText(s.title as Localized, lang),
    description: s.description ? localizeText(s.description as Localized, lang) : undefined,
  }));
}
