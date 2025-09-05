"use client";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export function plausibleTrack(event: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  if (typeof window.plausible === "function") {
    window.plausible(event, { props });
  }
}
