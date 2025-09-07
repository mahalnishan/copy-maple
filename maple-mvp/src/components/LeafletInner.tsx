"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ServiceMarker } from "@/lib/services/data";

export default function LeafletInner({ center, markers }: { center: [number, number]; markers: ServiceMarker[] }) {
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
