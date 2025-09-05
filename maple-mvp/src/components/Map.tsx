"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { markers as allMarkers, ServiceMarker } from "@/lib/services/data";
import { Province } from "@/lib/types";

function LeafletInner({ center, markers }: { center: [number, number]; markers: ServiceMarker[] }) {
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  return (
    <MapContainer center={center} zoom={11} style={{ height: 400, width: "100%" }} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]}>
          <Popup>
            <div className="text-sm">
              <div className="font-semibold">{m.name}</div>
              <a className="underline" href={m.url} target="_blank" rel="noopener noreferrer">Official page</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
LeafletInner.displayName = "LeafletMap";

const LeafletMap = dynamic(async () => LeafletInner, { ssr: false });

export default function Map({ province }: { province?: Province }) {
  const [center, setCenter] = useState<[number, number]>([45.4215, -75.6972]); // Ottawa default
  const markers = (province ? allMarkers.filter((m) => m.province === province) : allMarkers).slice(0, 50);
  useEffect(() => {
    if (!province) return;
    const first = markers.find((m) => m.province === province);
    if (first) setCenter([first.lat, first.lng]);
  }, [province, markers]);

  return <LeafletMap center={center} markers={markers} />;
}
