"use client";

import Link from "next/link";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";

export default function Nav() {
  const { t } = useTranslation();
  return (
    <nav className="flex items-center gap-4">
      <Link className="hover:underline" href="/wizard">{t("nav.wizard")}</Link>
      <Link className="hover:underline" href="/checklist">{t("nav.checklist")}</Link>
      <Link className="hover:underline" href="/services">{t("nav.services")}</Link>
      <Link className="hover:underline" href="/payments">{t("nav.payments")}</Link>
      <LanguageToggle />
    </nav>
  );
}
