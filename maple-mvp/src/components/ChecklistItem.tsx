"use client";

import { Step } from "@/lib/types";
import { getProgressValue, toggleStep } from "@/lib/storage/local";
import { useEffect, useState } from "react";
import { plausibleTrack } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

export default function ChecklistItem({ step }: { step: Step & { title: string; description?: string } }) {
  const [done, setDone] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setDone(getProgressValue(step.id));
  }, [step.id]);
  const toggle = () => {
    const next = toggleStep(step.id);
    setDone(next);
    if (next) plausibleTrack("step_completed", { id: step.id, goal: step.goal });
  };
  return (
    <li className="p-4 border rounded-md border-gray-400/40 flex items-start gap-3">
      <input
        aria-label={step.title}
        type="checkbox"
        className="mt-1 accent-gray-700"
        checked={done}
        onChange={toggle}
      />
      <div>
        <h3 className="font-semibold">{step.title}</h3>
        {step.description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{step.description}</p>}
        <div className="mt-2 text-sm">
          <a className="underline hover:no-underline" href={step.links.official} target="_blank" rel="noopener noreferrer">
            {t("link.official")}
          </a>
          {step.links.guide && (
            <>
              {" · "}
              <a className="underline hover:no-underline" href={step.links.guide} target="_blank" rel="noopener noreferrer">
                {t("link.guide")}
              </a>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
