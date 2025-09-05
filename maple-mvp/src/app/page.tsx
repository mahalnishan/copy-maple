"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { initI18n } from "@/i18n/config";

export default function Home() {
  initI18n();
  const { t } = useTranslation();
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
        {t("app.name")} — {t("tagline")}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">
        A personalized, province-aware checklist to help you complete essential tasks with official links and guidance. No account required.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          href="/wizard"
        >
          {t("cta.start")}
        </Link>
        <Link
          className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-400/40 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          href="/services"
        >
          {t("cta.services")}
        </Link>
      </div>
    </section>
  );
}
