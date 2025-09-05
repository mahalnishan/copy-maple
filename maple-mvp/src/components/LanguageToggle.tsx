"use client";

import { useTranslation } from "react-i18next";
import { setLang, getInitialLang, initI18n } from "@/i18n/config";
import { useEffect, useState } from "react";

export default function LanguageToggle() {
  const [lang, setLangState] = useState<string>("en");
  useEffect(() => {
    initI18n();
    setLangState(getInitialLang());
  }, []);

  const toggle = () => {
    const next = lang === "en" ? "fr" : "en";
    setLang(next);
    setLangState(next);
  };

  const { t } = useTranslation();
  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded-md border border-gray-400/40 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      aria-label={lang === "en" ? t("toggle.lang.fr") : t("toggle.lang.en")}
    >
      {lang === "en" ? t("toggle.lang.fr") : t("toggle.lang.en")}
    </button>
  );
}
