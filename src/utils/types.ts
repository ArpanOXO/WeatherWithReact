//Weather
interface MainWeather {
    temp: number;
    feels_like: number;
    humidity: number;
}

interface Wind {
    speed: number;
}

interface Sys {
    sunrise: number;
    sunset: number;
}

export interface WeatherData {
    name: string;
    timezone: number;
    weather:{
        icon:string;
    }[];
    main: MainWeather;
    wind: Wind;
    dt: number;
    sys: Sys;
}

//Forcast
export interface ForecastItem {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    weather: {
        main: string;
        description: string;
    }[];
    dt_txt: string;
}

export interface ForecastData {
    list: ForecastItem[];
    city: {
        name: string;
    };
}