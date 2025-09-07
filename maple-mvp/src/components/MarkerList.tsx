"use client";

import { markers as allMarkers } from "@/lib/services/data";
import { Province } from "@/lib/types";
import { ServiceFiltersState } from "@/components/ServiceFilters";

export default function MarkerList({ province, filters }: { province?: Province; filters: ServiceFiltersState }) {
  let markers = (province ? allMarkers.filter((m) => m.province === province) : allMarkers).slice(0, 200);
  if (filters.type !== "all") markers = markers.filter((m) => m.type === filters.type);
  if (filters.q.trim()) {
    const q = filters.q.toLowerCase();
    markers = markers.filter((m) => m.name.toLowerCase().includes(q));
  }
  return (
    <ul className="space-y-2">
      {markers.map((m) => (
        <li key={m.id} className="p-3 border border-gray-400/40 rounded-md">
          <div className="font-medium">{m.name}</div>
          <a className="text-sm underline" href={m.url} target="_blank" rel="noopener noreferrer">
            Official info
          </a>
        </li>
      ))}
      {markers.length === 0 && <li className="text-sm text-gray-600">No results</li>}
    </ul>
  );
}
