"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "@/app/weather/styles.module.css";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

type ForecastProps = {
  forecast: any[];
};

export default function ForecastComponent({ forecast }: ForecastProps) {
  const [selectedDay, setSelectedDay] = useState<any | null>(null);

  const handleDayClick = (day: any) => {
    setSelectedDay(day);
  };

  return (
    <div className={styles.forecastContainer}>
      <h3>10-Day Forecast</h3>

      <div className={styles.forecast}>
        {forecast.slice(0, 10).map((day, index) => (
          <div
            key={index}
            className={`${styles.forecastCard} ${
              selectedDay?.datetime === day.datetime ? styles.selected : ""
            }`}
            onClick={() => handleDayClick(day)}
          >
            <p>
              {new Date(day.datetime).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </p>
            <img
              src={`/icons/${day.icon}.png`}
              alt={day.icon}
              style={{ width: 40, height: 40 }}
            />
            <p>
              {((day.tempmin - 32) * 5 / 9).toFixed(1)}°C /{" "}
              {((day.tempmax - 32) * 5 / 9).toFixed(1)}°C
            </p>
          </div>
        ))}
      </div>

      {selectedDay && (
        <div className={styles.hourly}>
          <h4>
            Hourly Forecast for{" "}
            {new Date(selectedDay.datetime).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h4>

          <Line
            data={{
              labels: selectedDay.hours.map((hour: any) =>
                new Date(hour.datetimeEpoch * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              ),
              datasets: [
                {
                  label: "Temperature (°C)",
                  data: selectedDay.hours.map(
                    (hour: any) => ((hour.temp - 32) * 5) / 9
                  ),
                  borderColor: "red",
                  backgroundColor: "rgba(255,0,0,0.1)",
                  pointBackgroundColor: "red",
                  tension: 0.3,
                  fill: false,
                },
              ],
            }}
            options={{
              responsive: true,
              interaction: {
                mode: "index",
                intersect: false,
              },
              plugins: {
                tooltip: {
                  mode: "index",
                  intersect: false,
                  callbacks: {
                    label: (context) =>
                      `${context.parsed.y.toFixed(1)}°C`,
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    maxTicksLimit: 10,
                  },
                  grid: { display: false },
                },
                y: {
                  beginAtZero: false,
                  title: {
                    display: true,
                    text: "°C",
                  },
                  grid: { color: "#eee" },
                },
              },
              elements: {
                point: {
                  radius: 3,
                  hoverRadius: 6,
                },
              },
            }}
            height={80} // 1/4 от стандартной
            plugins={[
              {
                id: "horizontalBackground",
                beforeDraw: (chart) => {
                  const ctx = chart.canvas.getContext("2d");
                  const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);

                  gradient.addColorStop(0, "#0c2233");        // ночь
                  gradient.addColorStop(0.25, "#aee2f9");     // утро
                  gradient.addColorStop(0.5, "#c6eaff");      // день
                  gradient.addColorStop(0.75, "#aee2f9");     // вечер
                  gradient.addColorStop(1, "#0c2233");        // ночь

                  ctx.save();
                  ctx.fillStyle = gradient;
                  ctx.fillRect(0, 0, chart.width, chart.height);
                  ctx.restore();
                },
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
