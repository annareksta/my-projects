"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function MapComponent({ lat, lon }: { lat: number; lon: number }) {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);

      // ✅ Проверяем, есть ли уже карта в контейнере
      if (document.getElementById("map")?.hasChildNodes()) {
        return; // Если карта уже есть, выходим из функции
      }

      const map = leaflet.map("map").setView([lat, lon], 10);
      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        })
        .addTo(map);

      // ✅ Добавляем маркер
      const icon = new leaflet.Icon({
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      leaflet.marker([lat, lon], { icon }).addTo(map);
    });
  }, [lat, lon]);

  return <div id="map" style={{ width: "100%", height: "300px", marginTop: "20px" }} />;
}