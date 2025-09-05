"use client";

import { markers as allMarkers } from "@/lib/services/data";
import { Province } from "@/lib/types";

export default function MarkerList({ province }: { province?: Province }) {
  const markers = (province ? allMarkers.filter((m) => m.province === province) : allMarkers).slice(0, 50);
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
    </ul>
  );
}
