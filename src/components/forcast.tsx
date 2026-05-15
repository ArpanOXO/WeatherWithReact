import { useState, useEffect } from "react";
import { getForcast } from "../api/api";
import type { ForecastData } from "../utils/types";
import { WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";


export default function ForcastSection({ city }: { city: string }) {

    const [forecastData, setForecastData] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getForcast(city);
                setForecastData(data);
                setError("");
            } catch (err) {
                console.error("Error:", err);
                setError("Please enter correct city name, failed to fetch forecast");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [city]);

    const dailyForecasts = forecastData?.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
    );

    return (
        <>
            <section className="max-w-6xl mx-auto">

                {loading && (
                    <div className="py-20 text-center text-black/60 text-lg">
                        Loading...
                    </div>
                )}

                {error && (
                    <div className="py-20 text-center text-red-500 text-lg">
                        {error}
                    </div>
                )}

                {dailyForecasts && !loading && error==="" && (
                    <section className="py-8">

                        <p className="text-black/50 text-lg mb-2">5-Day Forecast</p>
                        {/* <h2 className="text-4xl font-bold tracking-tight mb-10">
                            {forecastData?.city.name}
                        </h2> */}

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {dailyForecasts.map((item) => {
                                const date = new Date(item.dt_txt);
                                const day = date.toLocaleDateString("en-US", {
                                    weekday: "short",
                                });
                                const dateStr = date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });

                                return (
                                    <div
                                        key={item.dt}
                                        className="bg-white rounded-3xl p-6 border border-black/5 hover:-translate-y-1 transition-all duration-300"
                                    >

                                        {/* Day */}

                                        <div className="flex items-start justify-between mb-6">

                                            <div>

                                                <p className="text-black/50 text-sm mb-1">
                                                    {day}
                                                </p>

                                                <p className="text-black/30 text-xs">
                                                    {dateStr}
                                                </p>

                                            </div>

                                            <img
                                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                                alt="weather-icon"
                                                className="w-14 h-14 -mt-2"
                                            />

                                        </div>

                                        {/* Temperature */}

                                        <h3 className="text-5xl font-bold tracking-tight mb-2">
                                            {Math.round(item.main.temp)}°
                                        </h3>

                                        <p className="text-black/50 text-sm capitalize mb-6">
                                            {item.weather[0].description}
                                        </p>

                                        {/* Details */}

                                        <div className="border-t border-black/10 pt-5 space-y-4">

                                            {/* Humidity */}

                                            <div className="flex items-center justify-between">

                                                <div className="flex items-center gap-2 text-black/40">

                                                    <WiHumidity className="text-2xl" />

                                                    <span className="text-sm">
                                                        Humidity
                                                    </span>

                                                </div>

                                                <span className="font-medium">
                                                    {item.main.humidity}%
                                                </span>

                                            </div>

                                            {/* Wind */}

                                            <div className="flex items-center justify-between">

                                                <div className="flex items-center gap-2 text-black/40">

                                                    <WiStrongWind className="text-2xl" />

                                                    <span className="text-sm">
                                                        Wind
                                                    </span>

                                                </div>

                                                <span className="font-medium">
                                                    {item.wind.speed} m/s
                                                </span>

                                            </div>

                                            {/* Feels Like */}

                                            <div className="flex items-center justify-between">

                                                <div className="flex items-center gap-2 text-black/40">

                                                    <WiThermometer className="text-2xl" />

                                                    <span className="text-sm">
                                                        Feels
                                                    </span>

                                                </div>

                                                <span className="font-medium">
                                                    {Math.round(item.main.feels_like)}°
                                                </span>

                                            </div>

                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}
            </section>
        </>
    );
}