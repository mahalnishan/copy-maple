"use client";

import { Audience } from "@/lib/types";
import { useTranslation } from "react-i18next";

export default function AudienceSelector({ value, onChange }: { value?: Audience; onChange: (v: Audience) => void }) {
  const { t } = useTranslation();
  return (
    <fieldset className="max-w-2xl">
      <legend className="block mb-2 font-medium">{t("wizard.audience")}</legend>
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="flex items-center gap-2 border border-gray-400/40 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
          <input type="radio" name="aud" checked={value === "newcomer"} onChange={() => onChange("newcomer")} />
          <span>{t("audience.newcomer")}</span>
        </label>
        <label className="flex items-center gap-2 border border-gray-400/40 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
          <input type="radio" name="aud" checked={value === "resident"} onChange={() => onChange("resident")} />
          <span>{t("audience.resident")}</span>
        </label>
      </div>
    </fieldset>
  );
}
