"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import { markers as allMarkers, ServiceMarker } from "@/lib/services/data";
import { Province } from "@/lib/types";
import { ServiceFiltersState } from "@/components/ServiceFilters";

const LeafletMap = dynamic(() => import("@/components/LeafletInner"), { ssr: false, loading: () => <div style={{ height: 400 }} className="animate-pulse bg-gray-200" /> });

export default function Map({ province, filters }: { province?: Province; filters: ServiceFiltersState }) {
  const [center, setCenter] = useState<[number, number]>([45.4215, -75.6972]);
  const markers: ServiceMarker[] = useMemo(() => {
    let arr = (province ? allMarkers.filter((m) => m.province === province) : allMarkers).slice(0, 200);
    if (filters.type !== "all") arr = arr.filter((m) => m.type === filters.type);
    if (filters.q.trim()) {
      const q = filters.q.toLowerCase();
      arr = arr.filter((m) => m.name.toLowerCase().includes(q));
    }
    return arr;
  }, [province, filters]);

  useEffect(() => {
    if (!province) return;
    const first = markers.find((m) => m.province === province);
    if (first) setCenter([first.lat, first.lng]);
  }, [province, markers]);

  return <LeafletMap center={center} markers={markers} />;
}
