"use client";

import ProvinceSelector from "@/components/ProvinceSelector";
import StatusSelector from "@/components/StatusSelector";
import GoalsSelector from "@/components/GoalsSelector";
import { useState } from "react";
import { Goal, Profile, Province, Status } from "@/lib/types";
import { setProfile } from "@/lib/storage/local";
import { useRouter, useSearchParams } from "next/navigation";
import { initI18n } from "@/i18n/config";
import { useTranslation } from "react-i18next";
import { plausibleTrack } from "@/lib/analytics";

export default function WizardPage() {
  initI18n();
  const { t } = useTranslation();
  const [province, setProvince] = useState<Province | undefined>();
  const [status, setStatus] = useState<Status | undefined>();
  const [goals, setGoals] = useState<Goal[]>(["healthcare", "ids", "banking"]);
  const router = useRouter();
  const search = useSearchParams();

  const canContinue = !!province && !!status && goals.length > 0;

  const onFinish = () => {
    if (!canContinue) return;
    const profile: Profile = { province: province!, status: status!, goals };
    setProfile(profile);
    plausibleTrack("wizard_completed", { province: profile.province, status: profile.status });
    const qp = search.toString();
    router.push(`/checklist${qp ? `?${qp}` : ""}`);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-4">{t("wizard.title")}</h1>
      <div className="space-y-6">
        <ProvinceSelector value={province} onChange={setProvince} />
        <StatusSelector value={status} onChange={setStatus} />
        <GoalsSelector values={goals} onChange={setGoals} />
      </div>
      <div className="pt-4">
        <button
          disabled={!canContinue}
          onClick={onFinish}
          className="px-6 py-3 rounded-md bg-gray-900 text-white disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {t("wizard.finish")}
        </button>
      </div>
    </section>
  );
}
