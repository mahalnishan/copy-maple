"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../public/locales/en/common.json" assert { type: "json" };
import fr from "../../public/locales/fr/common.json" assert { type: "json" };

const RESOURCES = {
  en: { common: en },
  fr: { common: fr },
} as const;

let initialized = false;

export function initI18n(lang?: string) {
  if (initialized) {
    if (lang) void i18n.changeLanguage(lang);
    return i18n;
  }
  i18n
    .use(initReactI18next)
    .init({
      resources: RESOURCES,
      lng: lang || getInitialLang(),
      fallbackLng: "en",
      defaultNS: "common",
      interpolation: { escapeValue: false },
      detection: undefined,
    });
  initialized = true;
  return i18n;
}

const LANG_KEY = "maple.lang";

export function getInitialLang() {
  if (typeof window === "undefined") return "en";
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  const saved = window.localStorage.getItem(LANG_KEY);
  return fromUrl || saved || "en";
}

export function setLang(lang: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANG_KEY, lang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
  }
  void i18n.changeLanguage(lang);
}
