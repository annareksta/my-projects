import styles from "@/app/weather/styles.module.css";

type ForecastProps = {
  forecast: any[];
};

export default function ForecastComponent({ forecast }: ForecastProps) {
  return (
    <div className={styles.forecastContainer}>
      <h3>10-Day Forecast</h3>
      <div className={styles.forecast}>
        {forecast.slice(0, 10).map((day, index) => (
          <div key={index} className={styles.forecastCard}>
            <p>{new Date(day.datetime).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}</p>
            <p>{((day.tempmin - 32) * 5 / 9).toFixed(1)}°C / {((day.tempmax - 32) * 5 / 9).toFixed(1)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}