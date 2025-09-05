import { describe, it, expect } from "vitest";
import { generateChecklist } from "@/lib/rules/engine";
import { Profile } from "@/lib/types";

const base: Profile = { province: "on", status: "pr", goals: ["healthcare", "ids"] };

describe("rules engine", () => {
  it("includes national and province-specific steps", () => {
    const steps = generateChecklist(base, "en");
    const ids = steps.map((s) => s.id);
    expect(ids).toContain("sin");
    expect(ids).toContain("ohip");
  });

  it("localizes titles to French", () => {
    const steps = generateChecklist(base, "fr");
    const sin = steps.find((s) => s.id === "sin");
    expect(sin?.title).toMatch(/numéro d’assurance sociale|NAS/i);
  });

  it("sorts by goal order", () => {
    const p: Profile = { province: "on", status: "pr", goals: ["healthcare", "ids"] };
    const steps = generateChecklist(p, "en");
    expect(steps[0].goal).toBe("healthcare");
  });

  it("filters by selected goals", () => {
    const p: Profile = { province: "on", status: "pr", goals: ["ids"] };
    const steps = generateChecklist(p, "en");
    expect(steps.every((s) => s.goal === "ids")).toBe(true);
  });

  it("filters by province", () => {
    const p: Profile = { province: "bc", status: "pr", goals: ["healthcare", "ids"] };
    const steps = generateChecklist(p, "en");
    expect(steps.map((s) => s.id)).toContain("msp");
    expect(steps.map((s) => s.id)).not.toContain("ohip");
  });

  it("includes Quebec steps for qc", () => {
    const p: Profile = { province: "qc", status: "pr", goals: ["healthcare", "ids"] };
    const steps = generateChecklist(p, "en");
    expect(steps.map((s) => s.id)).toContain("ramq");
  });
});
