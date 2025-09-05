"use client";

import { Status } from "@/lib/types";
import { useTranslation } from "react-i18next";

const statuses: { value: Status; labelKey: string }[] = [
  { value: "pr", labelKey: "status.pr" },
  { value: "work", labelKey: "status.work" },
  { value: "study", labelKey: "status.study" },
  { value: "refugee", labelKey: "status.refugee" },
  { value: "other", labelKey: "status.other" }
];

export default function StatusSelector({ value, onChange }: { value?: Status; onChange: (v: Status) => void }) {
  const { t } = useTranslation();
  return (
    <label className="block">
      <span className="block mb-1 font-medium">{t("wizard.status")}</span>
      <select
        className="w-full max-w-lg border border-gray-400/40 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        value={value || ""}
        onChange={(e) => onChange(e.target.value as Status)}
      >
        <option value="" disabled>
          —
        </option>
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {t(s.labelKey)}
          </option>
        ))}
      </select>
    </label>
  );
}
