"use client";

import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-gray-400/30 mt-12">
      <div className="max-w-6xl mx-auto p-4 text-sm text-gray-700 dark:text-gray-300">
        {t("disclaimer")}
      </div>
    </footer>
  );
}
