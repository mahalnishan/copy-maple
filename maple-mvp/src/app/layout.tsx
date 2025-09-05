import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LanguageToggle from "@/components/LanguageToggle";
import { initI18n } from "@/i18n/config";
import Link from "next/link";
import PlausibleScript from "@/components/PlausibleScript";
import { useTranslation } from "react-i18next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maple — Newcomer onboarding hub",
  description: "Personalized newcomer checklist for Canada (EN/FR).",
};

function Nav() {
  const { t } = useTranslation();
  return (
    <nav className="flex items-center gap-4">
      <Link className="hover:underline" href="/wizard">{t("nav.wizard")}</Link>
      <Link className="hover:underline" href="/checklist">{t("nav.checklist")}</Link>
      <Link className="hover:underline" href="/services">{t("nav.services")}</Link>
      <LanguageToggle />
    </nav>
  );
}

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-gray-400/30 mt-12">
      <div className="max-w-6xl mx-auto p-4 text-sm text-gray-700 dark:text-gray-300">
        {t("disclaimer")}
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  initI18n();
  return (
    <html lang="en">
      <head>
        <PlausibleScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded">
          Skip to content
        </a>
        <header className="border-b border-gray-400/30">
          <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
            <Link href="/" className="text-xl font-semibold">Maple</Link>
            <Nav />
          </div>
        </header>
        <main id="main" className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
