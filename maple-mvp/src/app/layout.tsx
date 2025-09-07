import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import PlausibleScript from "@/components/PlausibleScript";
import I18nProvider from "@/i18n/Provider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <PlausibleScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider>
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
        </I18nProvider>
      </body>
    </html>
  );
}
