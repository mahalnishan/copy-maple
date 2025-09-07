"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { initI18n } from "@/i18n/config";

export default function Home() {
  initI18n();
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-900/40" />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
          {t("app.name")} — {t("tagline")}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-3xl">
          A personalized, province-aware checklist to help you complete essential tasks with official links and guidance. No account required.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" href="/wizard">
            {t("cta.start")}
          </Link>
          <Link className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-400/40 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" href="/services">
            {t("cta.services")}
          </Link>
          <Link className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-400/40 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" href="/payments">
            Payments
          </Link>
        </div>
      </div>
    </section>
  );
}
