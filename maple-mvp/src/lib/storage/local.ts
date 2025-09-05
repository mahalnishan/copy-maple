"use client";

import { AppState, Profile } from "@/lib/types";

const STORAGE_KEY = "maple.state";
const VERSION = 1;

type Migration = (s: AppState) => AppState;

const migrations: Record<number, Migration> = {
  // future versions
};

function applyMigrations(state: AppState): AppState {
  let s = { ...state };
  if (!s.version) s.version = 1;
  for (let v = s.version + 1; v <= VERSION; v++) {
    const m = migrations[v];
    if (m) s = m(s);
    s.version = v;
  }
  return s;
}

export function loadState(): AppState {
  if (typeof window === "undefined") return { version: VERSION, progress: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: VERSION, progress: {} };
    const parsed = JSON.parse(raw) as AppState;
    const migrated = applyMigrations(parsed);
    if (migrated.version !== VERSION) saveState(migrated);
    return migrated;
  } catch {
    return { version: VERSION, progress: {} };
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  try {
    const payload: AppState = { ...state, version: VERSION };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {}
}

export function setProfile(profile: Profile) {
  const s = loadState();
  s.profile = profile;
  saveState(s);
}

export function getProfile(): Profile | undefined {
  return loadState().profile;
}

export function toggleStep(stepId: string, value?: boolean) {
  const s = loadState();
  const current = !!s.progress[stepId];
  const next = value ?? !current;
  s.progress[stepId] = next;
  saveState(s);
  return next;
}

export function getProgressValue(stepId: string) {
  return !!loadState().progress[stepId];
}

export function getProgressMap() {
  return loadState().progress;
}

export function clearAll() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
