import { Stack, Typography } from "@mui/material";
import classes from "./App.module.css";
import {FormEvent, ReactElement, useEffect, useState} from "react";
import WeatherDataService from "./data/weather/weather.service";
import { getCurrentTimeWithDate } from "./data/common/time.utility.service";
import { Weather } from "./model/weather/weather";
import { WeatherHistory } from "./model/weather/weather.history";
import Cloudy from "./assets/cloud.png";
import Sunny from "./assets/sun.png";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import weatherMapperService from "./data/weather/weather.mapper.service";
import SearchBar from "./components/common/atom/SearchBar/SearchBar";
import HistoryList from "./components/common/atom/HistoryList/HistoryList";

const App = () : ReactElement => {
  const [id, setId] = useState(0);
  const [country, setSelectedCountry] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [weather, setWeather] = useState<Weather>();
  const [searchHistory, setSearchHistory] = useState<WeatherHistory[]>([]);

  const weatherDataService = new WeatherDataService();
  const getWeatherData  = async (city: string) : Promise<any> => {
    try {
      const response: any = await weatherDataService.getWeather(city);
      let weatherData: any = weatherMapperService.toWeather(response);
      setWeather(weatherData);
      enqueueSnackbar("Found Weather for Selected Country", {
        variant: "success",
      });
      return weatherData;
    } catch (e: any) {
      enqueueSnackbar("Cannot Find the Selected Country", { variant: "error" });
      handleDelete(id);
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSelectedCountry(searchCountry);
    getWeatherData(searchCountry).then(():void => {
      setId((prevId: number): number => prevId + 1);

      const searchInfo: WeatherHistory = {
        id: id,
        country_name: weather?.country_name,
        date_history: getCurrentTimeWithDate(),
        temp_main: weather?.temp_main,
        temp_max: weather?.temp_max,
        temp_min: weather?.temp_min,
        humidity: weather?.humidity,
        weather_main_desc: weather?.weather_main_desc,
      };
      setSearchHistory((): WeatherHistory[] => [searchInfo, ...searchHistory]);
    } )

  };

  const handleRestore = (history_id: number) => {
    const restoreWeatherHistoryResult: any = searchHistory.filter(
      (prevHistory) => prevHistory.id == history_id
    );
    console.log(restoreWeatherHistoryResult[0]);

    const restoreWeatherData: Weather =
      weatherMapperService.fromWeatherHistorytoWeather(
        restoreWeatherHistoryResult[0]
      );

    console.log(restoreWeatherData);
    setWeather(restoreWeatherData); // Display the weather data for the restored item
  };

  const handleDelete = (id: number) : void => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((item) => item.id !== id)
    );
  };

  useEffect(() => {
    console.log("HELLO" + import.meta.env.VITE_HELLO);
    console.log(searchCountry);
  }, [searchCountry]);

  return (
    <>
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <div className={classes["container"]}>
        <div className={classes["bg"]}>
          <div className={classes["content"]}>
            <div className={classes["searchbar"]}>
              <SearchBar
                setSearchCountry={setSearchCountry}
                handleSearch={handleSearch}
              />
            </div>
            <div className={classes["main-content-box"]}>
              <div>
                <div>
                  {weather != null ? (
                    <div>
                      <div className={classes["today-weather"]}>
                        <Stack direction={"row"}>
                          <Typography variant="subtitle1">
                            Today's Weather
                          </Typography>
                          <div className={classes["weather-logo"]}>
                            {weather &&
                            weather.weather_main_desc == "Clouds" ? (
                              <img
                                src={Cloudy}
                                className={classes["weather-logo"]}
                              />
                            ) : (
                              <img
                                src={Sunny}
                                className={classes["weather-logo"]}
                              />
                            )}
                          </div>
                        </Stack>
                      </div>
                      <Typography
                        variant="h1"
                        className={classes["display-temperature"]}
                      >
                        <b>{weather?.temp_main}&deg;</b>
                      </Typography>
                      <Typography variant="subtitle1">
                        H:{weather?.temp_max}&deg;&nbsp;L:{weather?.temp_min}
                        &deg;
                      </Typography>
                      <div className={classes["weather-sub-info"]}>
                        <Typography
                          variant="subtitle1"
                          className={classes["display-weather-subtitle"]}
                        >
                          <b>{weather?.country_name}</b>
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          className={classes["display-weather-subtitle"]}
                        >
                          {weather?.date_now}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          className={classes["display-weather-subtitle"]}
                        >
                          Humidity:&nbsp;{weather?.humidity}%
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          className={classes["display-weather-subtitle"]}
                        >
                          {weather?.weather_main_desc}
                        </Typography>
                      </div>
                    </div>
                  ) : null}
                </div>
                <HistoryList
                  HistoryList={searchHistory}
                  handleRestore={handleRestore}
                  handleDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
