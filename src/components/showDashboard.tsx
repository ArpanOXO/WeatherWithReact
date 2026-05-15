import { useState, useEffect } from "react";
import { getWeather } from "../api/api";
import type { WeatherData } from "../utils/types";
import { WiHumidity, WiStrongWind, WiThermometer, WiDaySunny, WiNightClear } from "react-icons/wi";

export default function ShowDashboard({ city }: { city: string }) {

    const [weatherData, setWeatherData] = useState<WeatherData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const currentTime = weatherData?.dt ?? 0;

    const sunrise = weatherData?.sys.sunrise ?? 0;

    const sunset = weatherData?.sys.sunset ?? 0;

    const isDay =
        currentTime >= sunrise &&
        currentTime < sunset;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const data = await getWeather(city);

                setWeatherData(data);

                setError("");
            } catch (err) {
                console.error("Error:", err);

                setError("Please enter correct city name, failed to fetch weather!");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [city]);

    const cityTime = weatherData
    ? new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "UTC",
      }).format(new Date(Date.now() + weatherData.timezone * 1000))
    : "";

    return (
        <>
            <section className="max-w-6xl mx-auto py-12 px-6 py-8">

                {/* Loading */}

                {loading && (
                    <div className="py-20 text-center text-black/60 text-lg">
                        Loading...
                    </div>
                )}

                {/* Error */}

                {error && (
                    <div className="py-20 text-center text-red-500 text-lg">
                        {error}
                    </div>
                )}

                {/* Weather Section */}

                {weatherData && !loading && error==="" && (

                    <section className="py-8 border-b border-black/10">

                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">

                            {/* Left Section */}

                            <div>

                                <div className="flex items-center gap-2 text-black/50 mb-4">

                                    <WiThermometer className="text-3xl" />

                                    <p className="text-lg">
                                        Current Weather
                                    </p>

                                </div>

                                <div className="flex items-center gap-5">

                                    <h2 className="text-7xl md:text-8xl font-bold tracking-tight">
                                        {Math.round(weatherData.main.temp)}°
                                    </h2>

                                    {isDay ? (
                                        <WiDaySunny className="text-8xl text-yellow-500" />
                                    ) : (
                                        <WiNightClear className="text-8xl text-black/70" />
                                    )}

                                </div>

                                <p className="text-3xl mt-6 font-medium">
                                    {weatherData.name}
                                </p>

                                <p className="text-black/50 mt-2 text-lg">
                                    Feels like {Math.round(weatherData.main.feels_like)}°
                                </p>

                            </div>

                            {/* Right Section */}

                            <div className="flex flex-col items-start lg:items-end gap-10">

                                {/* Current Time */}

                                <div className="text-left lg:text-right">

                                    <p className="text-black/40 text-sm tracking-wide mb-2">
                                        LOCAL TIME
                                    </p>

                                    <h3 className="text-4xl md:text-5xl font-semibold tracking-tight">
                                        {cityTime}
                                    </h3>

                                </div>

                                {/* Weather Details */}

                                <div className="grid grid-cols-2 gap-10 min-w-[300px]">

                                    {/* Humidity */}

                                    <div className="flex items-start gap-4">

                                        <WiHumidity className="text-5xl text-black/70" />

                                        <div>

                                            <p className="text-black/40 text-sm tracking-wide mb-1">
                                                HUMIDITY
                                            </p>

                                            <h3 className="text-3xl font-semibold">
                                                {weatherData.main.humidity}%
                                            </h3>

                                        </div>

                                    </div>

                                    {/* Wind */}

                                    <div className="flex items-start gap-4">

                                        <WiStrongWind className="text-5xl text-black/70" />

                                        <div>

                                            <p className="text-black/40 text-sm tracking-wide mb-1">
                                                WIND
                                            </p>

                                            <h3 className="text-3xl font-semibold">
                                                {weatherData.wind.speed} m/s
                                            </h3>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>
                )}

            </section>
        </>
    )
}