import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import classes from "./App.module.css";
import { Delete, SearchRounded } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import WeatherDataService from "./data/weather/weather.service";
import { getCurrentTimeWithDate } from "./data/common/time.utility.service";
import { Weather } from "./model/weather/weather";
import { WeatherHistory } from "./model/weather/weather.history";
import Cloudy from "./assets/cloud.png";
import Sunny from "./assets/sun.png";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import weatherMapperService from "./data/weather/weather.mapper.service";
import SearchBar from "./components/common/atom/SearchBar.tsx/SearchBar";

const App = () => {
  const [id, setId] = useState(0);
  const [country, setSelectedCountry] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [weather, setWeather] = useState<Weather>();
  const [searchHistory, setSearchHistory] = useState<WeatherHistory[]>([]);

  const weatherDataService = new WeatherDataService();

  const getWeatherData = async (city: string) => {
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
    getWeatherData(searchCountry);
    if (country) {
      setId((prevId) => prevId + 1);

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
      setSearchHistory(() => [searchInfo, ...searchHistory]);
    }
  };

  const handleRestore = (history_id: any) => {
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

  const handleDelete = (id: any) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((item) => item.id !== id)
    );
  };

  return (
    <>
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <div className={classes["container"]}>
        <div className={classes["bg"]}>
          <div className={classes["content"]}>
            <Stack direction={"column"} gap={3}>
              <SearchBar
                setSearchCountry={setSearchCountry}
                handleSearch={handleSearch}
              />
              <Box className={classes["main-content-box"]}>
                <Stack>
                  <Stack>
                    {weather != null ? (
                      <Stack direction={"column"}>
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
                          sx={{
                            color: "#6C40B5",
                            borderWidth: "10px",
                            borderColor: "white",
                            borderRadius: "20px",
                          }}
                        >
                          <b>{weather?.temp_main}&deg;</b>
                        </Typography>
                        <Typography variant="subtitle1">
                          H:{weather?.temp_max}&deg;&nbsp;L:{weather?.temp_min}
                          &deg;
                        </Typography>

                        <Stack
                          direction={"row"}
                          gap={8}
                          sx={{ color: "rgba(102, 102, 102, 1)" }}
                        >
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
                      </Stack>
                    ) : null}
                  </Stack>
                  <Box className={classes["sub-content-box"]}>
                    <Stack>
                      <Typography variant="subtitle1">
                        Search History
                      </Typography>
                      <List className="list">
                        {searchHistory.map((history: any) => {
                          return (
                            <ListItem
                              className={classes["list-item-box"]}
                              key={history.id}
                              secondaryAction={
                                <>
                                  <IconButton
                                    edge="end"
                                    aria-label="restore"
                                    onClick={() => handleRestore(history.id)}
                                    sx={{
                                      backgroundColor: "white",
                                      opacity: 1,
                                    }}
                                  >
                                    <SearchRounded />
                                  </IconButton>
                                  <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDelete(history.id)}
                                    sx={{
                                      backgroundColor: "white",
                                      opacity: 1,
                                    }}
                                  >
                                    <Delete />
                                  </IconButton>
                                </>
                              }
                            >
                              <ListItemText primary={history.country_name} />
                              <ListItemText
                                primary={history.date_history}
                                sx={{ alignSelf: "flex-end" }}
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Stack>
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
