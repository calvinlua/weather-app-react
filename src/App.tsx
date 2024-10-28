import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import classes from "./App.module.css";
import { SearchRounded } from "@mui/icons-material";
import { FormEvent, useEffect, useState } from "react";
import WeatherDataService from "./data/weather/weather.service";
import {
  getCurrentTime,
  getCurrentTimeWithDate,
} from "./data/common/time.utility.service";
import weatherMapperService from "./data/weather/weather.mapper.service";
import { Weather } from "./model/weather/weather";
import { WeatherHistory } from "./model/weather/weather.history";
import Cloudy from "./assets/cloud.png";
import Sunny from "./assets/sun.png";
import { countries } from "./constants/countries";

const App = () => {
  const [country, setSelectedCountry] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [weather, setWeather] = useState<Weather>();
  const [searchHistory, setSearchHistory] = useState<WeatherHistory[]>([]);

  const weatherDataService = new WeatherDataService();

  const getWeatherData = async (city: string) => {
    const rawWeatherData: Object = await weatherDataService.getWeather(city);
    let weatherData: any = weatherMapperService.toWeather(rawWeatherData);
    setWeather(weatherData);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSelectedCountry(searchCountry);
    if (searchCountry) {
      const searchInfo: WeatherHistory = {
        country_name: searchCountry,
        date_history: getCurrentTimeWithDate(),
      };
      console.log(searchInfo);
      setSearchHistory(() => [searchInfo, ...searchHistory]);
    }
  };

  useEffect(() => {
    getWeatherData(country);
    getCurrentTime();
    getCurrentTimeWithDate();
    console.log(searchHistory);
  }, [country]);

  return (
    <>
      <div className={classes["container"]}>
        <div className={classes["bg"]}>
          <div className={classes["content"]}>
            <Stack direction={"column"} gap={3}>
              <Stack direction={"row"}>
                <form onSubmit={handleSearch}>
                  <Autocomplete
                    className={classes["input-box"]}
                    freeSolo
                    options={countries}
                    getOptionLabel={(option) => option}
                    onChange={(event: any, value: any) => {
                      event.preventDefault();
                      setSearchCountry(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="filled-basic"
                        label="Country"
                        variant="filled"
                      />
                    )}
                  />

                  <Button
                    className={classes["search-button"]}
                    sx={{ color: "primary.main" }}
                    type="submit"
                  >
                    <SearchRounded sx={{ color: "white" }} />
                  </Button>
                </form>
              </Stack>

              <Box className={classes["main-content-box"]}>
                <Stack>
                  <Stack direction={"column"}>
                    <div className={classes["today-weather"]}>
                      <Typography variant="subtitle1">
                        Today's Weather
                      </Typography>
                      <div className={classes["weather-logo"]}>
                        {weather && weather.weather_main_desc == "Clouds" ? (
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
                    </div>
                    <Typography
                      variant="h1"
                      sx={{
                        color: "primary.main",
                        borderWidth: "10px",
                        borderColor: "white",
                        borderRadius: "20px",
                      }}
                    >
                      <b>{weather?.temp_main}&deg;</b>
                    </Typography>
                    <Typography variant="subtitle1">
                      H:{weather?.temp_max}&deg;&nbsp;L:{weather?.temp_min}&deg;
                    </Typography>
                  </Stack>

                  <Stack direction={"row"} gap={6}>
                    <Typography variant="subtitle1">
                      <b>{weather?.country_name}</b>
                    </Typography>
                    <Typography variant="subtitle1">
                      {weather?.date_now}
                    </Typography>
                    <Typography variant="subtitle1">
                      Humidity:&nbsp;{weather?.humidity}%
                    </Typography>
                    <Typography>{weather?.weather_main_desc}</Typography>
                  </Stack>

                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      width: "620px",
                      height: "548px",
                    }}
                  >
                    <Typography variant="subtitle1">Search History</Typography>
                    {searchHistory.map((history: any) => {
                      return (
                        <Box>
                          {history.country_name} {history.date_history}
                          <Button>Search</Button> <Button>Remove</Button>
                        </Box>
                      );
                    })}
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
