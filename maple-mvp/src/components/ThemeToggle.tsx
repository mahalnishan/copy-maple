"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "maple.theme"; // 'light' | 'dark' | 'system'

function applyTheme(theme: string) {
  const root = document.documentElement;
  if (theme === "dark") root.setAttribute("data-theme", "dark");
  else if (theme === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<"light" | "dark" | "system">("system");
  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as any) || "system";
    setMode(saved);
    if (typeof document !== "undefined") applyTheme(saved);
  }, []);

  const cycle = () => {
    const next = mode === "system" ? "light" : mode === "light" ? "dark" : "system";
    setMode(next);
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  };

  const label = mode === "system" ? "Theme: System" : mode === "light" ? "Theme: Light" : "Theme: Dark";

  return (
    <button
      onClick={cycle}
      aria-label={label}
      title={label}
      className="px-3 py-2 rounded-md border border-gray-400/40 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {mode === "system" ? "System" : mode === "light" ? "Light" : "Dark"}
    </button>
  );
}
