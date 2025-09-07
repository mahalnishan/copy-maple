"use client";

import { plausibleTrack } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

export default function PrintButton() {
  const { t } = useTranslation();
  const onClick = () => {
    plausibleTrack("checklist_printed");
    if (typeof window !== "undefined") window.print();
  };
  return (
    <button onClick={onClick} className="px-4 py-2 rounded-md border border-gray-400/40 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
      {t("checklist.print")}
    </button>
  );
}
