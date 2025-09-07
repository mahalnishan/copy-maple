import { describe, it, expect, beforeEach } from "vitest";
import { clearAll, getProfile, getProgressMap, getProgressValue, loadState, setProfile, toggleStep } from "@/lib/storage/local";

// jsdom provides localStorage

describe("storage", () => {
  beforeEach(() => {
    clearAll();
  });

  it("loads default state", () => {
    const s = loadState();
    expect(s.version).toBeGreaterThan(0);
    expect(Object.keys(s.progress).length).toBe(0);
  });

  it("persists profile", () => {
    setProfile({ audience: "newcomer", province: "on", status: "pr", goals: ["ids"] });
    const p = getProfile();
    expect(p?.province).toBe("on");
    expect(p?.audience).toBe("newcomer");
  });

  it("toggles step completion", () => {
    const first = toggleStep("sin");
    expect(first).toBe(true);
    expect(getProgressValue("sin")).toBe(true);
    const second = toggleStep("sin");
    expect(second).toBe(false);
  });

  it("returns overall progress map", () => {
    toggleStep("a", true);
    toggleStep("b", true);
    const map = getProgressMap();
    expect(map["a"]).toBe(true);
    expect(map["b"]).toBe(true);
  });

  it("clearAll wipes state", () => {
    toggleStep("x", true);
    clearAll();
    expect(getProgressValue("x")).toBe(false);
  });

  it("idempotent toggles maintain state", () => {
    toggleStep("y", true);
    toggleStep("y", true);
    expect(getProgressValue("y")).toBe(true);
  });
});
