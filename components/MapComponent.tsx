"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function MapComponent({
  lat,
  lon,
  onClickMap,
}: {
  lat: number;
  lon: number;
  onClickMap: (city: string) => void;
}) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      const L = await import("leaflet");

      // Prevent duplicate map init
      if (mapRef.current) {
        mapRef.current.setView([lat, lon], 10);
        markerRef.current.setLatLng([lat, lon]);
        return;
      }

      const map = L.map("map").setView([lat, lon], 10);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const icon = new L.Icon({
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const marker = L.marker([lat, lon], { icon }).addTo(map);
      markerRef.current = marker;

      map.on("click", async (e: any) => {
        const { lat: newLat, lng: newLon } = e.latlng;
        marker.setLatLng([newLat, newLon]);

        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLon}`;
        const res = await fetch(url);
        const data = await res.json();
        const city =
          data?.address?.city ||
          data?.address?.town ||
          data?.address?.village ||
          data?.address?.state;

        if (city) {
          onClickMap(city);
        }
      });
    };

    init();
  }, [lat, lon]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "300px",
        marginBottom: "20px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    />
  );
}
