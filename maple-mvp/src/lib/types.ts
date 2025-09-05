export type Province =
  | "ab"
  | "bc"
  | "mb"
  | "nb"
  | "nl"
  | "ns"
  | "nt"
  | "nu"
  | "on"
  | "pe"
  | "qc"
  | "sk"
  | "yt";

export type Status = "pr" | "work" | "study" | "refugee" | "other";

export type Goal =
  | "healthcare"
  | "ids"
  | "banking"
  | "housing"
  | "driving"
  | "taxes"
  | "phone";

export type Link = {
  official: string;
  guide?: string;
};

export type Step = {
  id: string;
  goal: Goal;
  title: string | { en: string; fr: string };
  description?: string | { en: string; fr: string };
  province?: Province[]; // empty/undefined means national
  statuses?: Status[]; // eligible statuses; undefined => all
  links: Link;
  dependencies?: string[];
  estTime?: string;
  docsNeeded?: string[];
  required?: boolean;
  optional?: boolean; // shorthand inverse of required
  override?: boolean; // province overrides a national step of same id
};

export type Profile = {
  province: Province;
  status: Status;
  goals: Goal[];
};

export type AppState = {
  version: number;
  profile?: Profile;
  progress: Record<string, boolean>; // stepId -> done
};
