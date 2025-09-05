"use client";

import { Goal } from "@/lib/types";
import { useTranslation } from "react-i18next";

const allGoals: { value: Goal; labelKey: string }[] = [
  { value: "healthcare", labelKey: "goal.healthcare" },
  { value: "ids", labelKey: "goal.ids" },
  { value: "banking", labelKey: "goal.banking" },
  { value: "housing", labelKey: "goal.housing" },
  { value: "driving", labelKey: "goal.driving" },
  { value: "taxes", labelKey: "goal.taxes" },
  { value: "phone", labelKey: "goal.phone" }
];

export default function GoalsSelector({ values, onChange }: { values: Goal[]; onChange: (v: Goal[]) => void }) {
  const { t } = useTranslation();
  const toggle = (g: Goal) => {
    const has = values.includes(g);
    onChange(has ? values.filter((x) => x !== g) : [...values, g]);
  };
  return (
    <fieldset className="max-w-2xl">
      <legend className="block mb-2 font-medium">{t("wizard.goals")}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {allGoals.map((g) => (
          <label key={g.value} className="flex items-center gap-2 border border-gray-400/40 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
            <input
              type="checkbox"
              className="accent-gray-700"
              checked={values.includes(g.value)}
              onChange={() => toggle(g.value)}
            />
            <span>{t(g.labelKey)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
