"use client";

import { useState } from "react";
import ForecastComponent from "@/components/ForecastComponent";
import MapComponent from "@/components/MapComponent";
import styles from "@/app/weather/styles.module.css";

const API_KEY = "C762GHQCU2TWHZFGH5P9ZGA8U";
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export default function WeatherComponent() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any | null>(null);
  const [error, setError] = useState("");

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setWeather(null);

    try {
      const res = await fetch(`${BASE_URL}${city}?key=${API_KEY}&contentType=json`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("City not found. Try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Go!</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {weather && (
        <>
          <h2>Weather in {weather.resolvedAddress}</h2>
          <p>Temperature: {((weather.currentConditions.temp - 32) * 5 / 9).toFixed(1)}°C</p>
          <p>Humidity: {weather.currentConditions.humidity}%</p>
          <ForecastComponent forecast={weather.days} />
          <MapComponent lat={weather.latitude} lon={weather.longitude} />
        </>
      )}
    </div>
  );
}