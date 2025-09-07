"use client";

import { AppState, Profile } from "@/lib/types";

const STORAGE_KEY = "maple.state";
const VERSION = 2;

type Migration = (s: AppState) => AppState;

const migrations: Record<number, Migration> = {
  2: (s) => {
    // add audience default and new maps
    const profile = s.profile as any;
    if (profile && !profile.audience) profile.audience = "newcomer";
    return { version: 2, profile, progress: s.progress || {}, notes: s.notes || {}, pinned: s.pinned || {}, due: s.due || {} } as AppState;
  },
};

function applyMigrations(state: AppState): AppState {
  let s = { ...state } as AppState;
  if (!s.version) s.version = 1;
  for (let v = s.version + 1; v <= VERSION; v++) {
    const m = migrations[v];
    if (m) s = m(s);
    s.version = v;
  }
  return s;
}

export function loadState(): AppState {
  if (typeof window === "undefined") return { version: VERSION, progress: {}, notes: {}, pinned: {}, due: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: VERSION, progress: {}, notes: {}, pinned: {}, due: {} };
    const parsed = JSON.parse(raw) as AppState;
    const migrated = applyMigrations(parsed);
    if (migrated.version !== VERSION) saveState(migrated);
    return migrated;
  } catch {
    return { version: VERSION, progress: {}, notes: {}, pinned: {}, due: {} };
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

export function setNote(stepId: string, note: string) {
  const s = loadState();
  s.notes = s.notes || {};
  s.notes[stepId] = note;
  saveState(s);
}

export function getNote(stepId: string) {
  return loadState().notes?.[stepId] || "";
}

export function togglePin(stepId: string) {
  const s = loadState();
  s.pinned = s.pinned || {};
  const next = !(s.pinned[stepId] || false);
  s.pinned[stepId] = next;
  saveState(s);
  return next;
}

export function isPinned(stepId: string) {
  return !!loadState().pinned?.[stepId];
}

export function setDueDate(stepId: string, iso: string | "") {
  const s = loadState();
  s.due = s.due || {};
  if (iso) s.due[stepId] = iso; else delete s.due[stepId];
  saveState(s);
}

export function getDueDate(stepId: string) {
  return loadState().due?.[stepId] || "";
}

export function clearAll() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
