import WeatherComponent from "@/components/WeatherComponent";

export default function WeatherPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center" >Weather Forecast</h1>
      <WeatherComponent />
    </div>
  );
}