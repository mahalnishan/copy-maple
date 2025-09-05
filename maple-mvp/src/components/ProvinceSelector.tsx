"use client";

import { Province } from "@/lib/types";
import { useTranslation } from "react-i18next";

const provinces: { value: Province; labelKey: string }[] = [
  { value: "on", labelKey: "province.on" },
  { value: "bc", labelKey: "province.bc" },
  { value: "qc", labelKey: "province.qc" },
  { value: "ab", labelKey: "province.ab" },
  { value: "mb", labelKey: "province.mb" },
  { value: "nb", labelKey: "province.nb" },
  { value: "nl", labelKey: "province.nl" },
  { value: "ns", labelKey: "province.ns" },
  { value: "nt", labelKey: "province.nt" },
  { value: "nu", labelKey: "province.nu" },
  { value: "pe", labelKey: "province.pe" },
  { value: "sk", labelKey: "province.sk" },
  { value: "yt", labelKey: "province.yt" }
];

export default function ProvinceSelector({ value, onChange }: { value?: Province; onChange: (v: Province) => void }) {
  const { t } = useTranslation();
  return (
    <label className="block">
      <span className="block mb-1 font-medium">{t("wizard.province")}</span>
      <select
        className="w-full max-w-lg border border-gray-400/40 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        value={value || ""}
        onChange={(e) => onChange(e.target.value as Province)}
      >
        <option value="" disabled>
          —
        </option>
        {provinces.map((p) => (
          <option key={p.value} value={p.value}>
            {t(p.labelKey)}
          </option>
        ))}
      </select>
    </label>
  );
}
