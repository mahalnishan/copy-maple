"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { markers as allMarkers } from "@/lib/services/data";
import { Province } from "@/lib/types";

const LeafletMap = dynamic(() => import("@/components/LeafletInner"), { ssr: false, loading: () => <div style={{ height: 400 }} className="animate-pulse bg-gray-200" /> });

export default function Map({ province }: { province?: Province }) {
  const [center, setCenter] = useState<[number, number]>([45.4215, -75.6972]);
  const markers = (province ? allMarkers.filter((m) => m.province === province) : allMarkers).slice(0, 50);
  useEffect(() => {
    if (!province) return;
    const first = markers.find((m) => m.province === province);
    if (first) setCenter([first.lat, first.lng]);
  }, [province, markers]);

  return <LeafletMap center={center} markers={markers} />;
}
