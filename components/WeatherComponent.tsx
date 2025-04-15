"use client";

import { useState, useEffect } from "react";
import ForecastComponent from "@/components/ForecastComponent";
import MapComponent from "@/components/MapComponent";
import styles from "@/app/weather/styles.module.css";

const API_KEY = "C762GHQCU2TWHZFGH5P9ZGA8U";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export default function WeatherComponent() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [lat, setLat] = useState(55.7558);
  const [lon, setLon] = useState(37.6173);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
      });
    }
  }, []);

  const fetchWeatherByCity = async (cityName: string) => {
    setError("");
    try {
      const res = await fetch(`${BASE_URL}${cityName}?key=${API_KEY}&contentType=json`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      setLat(data.latitude);
      setLon(data.longitude);
      setCity(data.resolvedAddress);
    } catch (err) {
      setError("City not found. Try again.");
      setWeather(null);
    }
  };

  const fetchWeather = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeatherByCity(city);
  };

  return (
    <div className={styles.container}>
      <MapComponent lat={lat} lon={lon} onClickMap={fetchWeatherByCity} />

      <form onSubmit={fetchWeather} className={styles.form}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Go!
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {weather && (
        <div className={styles.weatherBlock}>
          <h2>Weather in {weather.resolvedAddress}</h2>
          <p>
            Temperature:{" "}
            {((weather.currentConditions.temp - 32) * 5 / 9).toFixed(1)}°C
          </p>
          <p>Humidity: {weather.currentConditions.humidity}%</p>
          <ForecastComponent forecast={weather.days} />
        </div>
      )}
    </div>
  );
}
