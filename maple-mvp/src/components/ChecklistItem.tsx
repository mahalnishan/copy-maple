"use client";

import { Step } from "@/lib/types";
import { getProgressValue, toggleStep, getNote, setNote, togglePin, isPinned, getDueDate, setDueDate } from "@/lib/storage/local";
import { useEffect, useState } from "react";
import { plausibleTrack } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

export default function ChecklistItem({ step }: { step: Step & { title: string; description?: string } }) {
  const [done, setDone] = useState(false);
  const [note, setNoteState] = useState("");
  const [pinned, setPinned] = useState(false);
  const [due, setDue] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    setDone(getProgressValue(step.id));
    setNoteState(getNote(step.id));
    setPinned(isPinned(step.id));
    setDue(getDueDate(step.id));
  }, [step.id]);

  const onToggle = () => {
    const next = toggleStep(step.id);
    setDone(next);
    if (next) plausibleTrack("step_completed", { id: step.id, goal: step.goal });
  };

  const onNoteBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setNote(step.id, e.target.value);
  };

  const onPin = () => setPinned(togglePin(step.id));

  const onDue = (value: string) => {
    setDue(value);
    setDueDate(step.id, value);
  };

  return (
    <li className="p-4 border rounded-md border-gray-400/40 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <input aria-label={step.title} type="checkbox" className="mt-1 accent-gray-700" checked={done} onChange={onToggle} />
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
      </div>
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <button onClick={onPin} className={`px-3 py-2 rounded-md border text-sm ${pinned ? "bg-gray-900 text-white" : "border-gray-400/40"}`}>{t("item.pin")}</button>
        <label className="text-sm flex items-center gap-2">
          {t("item.dueDate")} <input type="date" value={due} onChange={(e) => onDue(e.target.value)} className="border border-gray-400/40 rounded px-2 py-1" />
        </label>
      </div>
      <div>
        <label className="block text-sm mb-1">{t("item.addNote")}</label>
        <textarea defaultValue={note} onBlur={onNoteBlur} rows={2} className="w-full border border-gray-400/40 rounded-md px-3 py-2" placeholder="..." />
      </div>
    </li>
  );
}
