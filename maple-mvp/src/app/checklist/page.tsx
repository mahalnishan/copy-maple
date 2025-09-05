"use client";

import { initI18n } from "@/i18n/config";
import { useTranslation } from "react-i18next";
import { getProfile, getProgressMap } from "@/lib/storage/local";
import { generateChecklist } from "@/lib/rules/engine";
import ChecklistItem from "@/components/ChecklistItem";
import ProgressBar from "@/components/ProgressBar";
import PrintButton from "@/components/PrintButton";
import { useEffect, useMemo, useState } from "react";
import { Goal, Step } from "@/lib/types";

type ChecklistViewStep = Step & { title: string; description?: string };

export default function ChecklistPage() {
  initI18n();
  const { t, i18n } = useTranslation();
  const profile = getProfile();
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");
  const [goalFilter, setGoalFilter] = useState<Goal | "all">("all");

  const steps: ChecklistViewStep[] = useMemo(() => {
    if (!profile) return [];
    return generateChecklist(profile, i18n.language) as unknown as ChecklistViewStep[];
  }, [i18n.language, profile]);

  const progress = getProgressMap();
  const total = steps.length;
  const doneCount = steps.filter((s) => progress[s.id]).length;

  const visible = steps.filter((s) => {
    const isDone = !!progress[s.id];
    if (filter === "pending" && isDone) return false;
    if (filter === "done" && !isDone) return false;
    if (goalFilter !== "all" && s.goal !== goalFilter) return false;
    return true;
  });

  const groups = (profile?.goals || [])
    .filter((g) => visible.some((s) => s.goal === g))
    .map((g) => ({ goal: g, steps: visible.filter((s) => s.goal === g) }));

  useEffect(() => {
    if (!profile) {
      if (typeof window !== "undefined") window.location.href = "/wizard" + window.location.search;
    }
  }, [profile]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">{t("checklist.title")}</h1>
        <PrintButton />
      </div>

      <ProgressBar done={doneCount} total={total} />

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <select
          aria-label="Status filter"
          className="border border-gray-400/40 rounded-md px-3 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "pending" | "done")}
        >
          <option value="all">{t("checklist.filter.all")}</option>
          <option value="pending">{t("checklist.filter.pending")}</option>
          <option value="done">{t("checklist.filter.done")}</option>
        </select>
        <select
          aria-label="Goal filter"
          className="border border-gray-400/40 rounded-md px-3 py-2"
          value={goalFilter}
          onChange={(e) => setGoalFilter((e.target.value as Goal | "all"))}
        >
          <option value="all">{t("checklist.filter.all")}</option>
          {profile?.goals.map((g) => (
            <option key={g} value={g}>
              {t(`goal.${g}`)}
            </option>
          ))}
        </select>
      </div>

      {groups.map((g) => (
        <section key={g.goal} className="space-y-3">
          <h2 className="text-2xl font-semibold">{t(`goal.${g.goal}`)}</h2>
          <ul className="space-y-3">
            {g.steps.map((s) => (
              <ChecklistItem key={s.id} step={s} />
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
