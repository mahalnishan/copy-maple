"use client";

import { useState } from "react";
import { Province } from "@/lib/types";

export type ServiceFiltersState = {
  q: string;
  type: "all" | "service-canada" | "provincial";
};

export default function ServiceFilters({ value, onChange }: { value: ServiceFiltersState; onChange: (v: ServiceFiltersState) => void }) {
  const set = (patch: Partial<ServiceFiltersState>) => onChange({ ...value, ...patch });
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
      <input
        className="w-full sm:w-64 border border-gray-400/40 rounded-md px-3 py-2"
        placeholder="Search by name or city"
        value={value.q}
        onChange={(e) => set({ q: e.target.value })}
      />
      <div className="inline-flex rounded-md border border-gray-400/40 overflow-hidden">
        {(["all", "service-canada", "provincial"] as const).map((t) => (
          <button
            key={t}
            className={`px-3 py-2 text-sm ${value.type === t ? "bg-gray-900 text-white" : "bg-transparent"}`}
            onClick={() => set({ type: t })}
          >
            {t.replace("-", " ")}
          </button>
        ))}
      </div>
    </div>
  );
}
