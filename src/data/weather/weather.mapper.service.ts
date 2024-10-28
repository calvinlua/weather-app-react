import { Weather } from "../../model/weather/weather";
import { WeatherHistory } from "../../model/weather/weather.history";
import { getCurrentTimeWithDate } from "../common/time.utility.service";

const toWeather = (input: any): Weather => {
  return {
    country_name: input["name"],
    temp_main: input["main"].temp,
    temp_max: input["main"].temp_max,
    temp_min: input["main"].temp_min,
    date_now: String(getCurrentTimeWithDate()),
    humidity: input["main"].humidity,
    weather_main_desc: input["weather"][0].main,
  };
};

const toWeatheristory = (input: any): WeatherHistory => {
  return {
    country_name: input["name"],
    date_history: input["date_history"],
  };
};

export default {
  toWeather,
  toWeatheristory,
};
