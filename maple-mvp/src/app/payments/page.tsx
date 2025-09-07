"use client";

import { useTranslation } from "react-i18next";
import { initI18n } from "@/i18n/config";
import LinkList from "@/components/LinkList";

export default function PaymentsPage() {
  initI18n();
  const { t } = useTranslation();

  const sendMoney = [
    { label: "Interac e-Transfer (official)", href: "https://www.interac.ca/en/consumers/products/interac-e-transfer/" },
  ];

  const taxes = [
    { label: "CRA My Payment", href: "https://www.canada.ca/en/revenue-agency/services/e-services/e-services-individuals/my-payment.html" },
    { label: "Pay by online banking (CRA)", href: "https://www.canada.ca/en/revenue-agency/services/make-a-payment-canada-revenue-agency.html" },
  ];

  const bills = [
    { label: t("goal.phone") + " — CRTC consumer info", href: "https://crtc.gc.ca/eng/phone/mobile.htm" },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">{t("payments.title")}</h1>
      <p className="text-gray-700 dark:text-gray-300">{t("payments.desc")}</p>
      <div className="space-y-6">
        <LinkList title={t("payments.sections.send") as string} items={sendMoney} />
        <LinkList title={t("payments.sections.taxes") as string} items={taxes} />
        <LinkList title={t("payments.sections.bills") as string} items={bills} />
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {t("payments.disclaimer")}
      </div>
    </section>
  );
}
