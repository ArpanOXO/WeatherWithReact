import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const api = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5",
})

export async function getWeather(city: string) {
    try {
        const response = await api.get(
            `/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching weather:", error);

        throw error;
    }
}

export async function getForcast(city: string) {
    try {
        const response = await api.get(
            `/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching weather:", error);

        throw error;
    }
}