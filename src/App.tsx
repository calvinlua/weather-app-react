import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import classes from "./App.module.css";
import { Delete, SearchRounded } from "@mui/icons-material";
import { FormEvent, useEffect, useState } from "react";
import WeatherDataService from "./data/weather/weather.service";
import { getCurrentTimeWithDate } from "./data/common/time.utility.service";
import { Weather } from "./model/weather/weather";
import { WeatherHistory } from "./model/weather/weather.history";
import Cloudy from "./assets/cloud.png";
import Sunny from "./assets/sun.png";
import { countries } from "./constants/countries";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import weatherMapperService from "./data/weather/weather.mapper.service";

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
    const restoreSearch: any = searchHistory.filter(
      (prevHistory) => prevHistory.id == history_id
    );
    const { id, date_history, ...others } = restoreSearch[0];
    setWeather(others); // Display the weather data for the restored item
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

              <Box
                className={classes["main-content-box"]}
                sx={{
                  opacity: 1,
                  background: "white",
                }}
              >
                <Stack>
                  <Stack>
                    {weather != null ? (
                      <Stack direction={"column"}>
                        <div className={classes["today-weather"]}>
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
                          H:{weather?.temp_max}&deg;&nbsp;L:{weather?.temp_min}
                          &deg;
                        </Typography>

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
                      </Stack>
                    ) : null}
                  </Stack>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      opacity: 1,
                      borderRadius: "20px",
                      width: "620px",
                      height: "548px",
                    }}
                  >
                    <Stack sx={{ opacity: 1 }}>
                      <Typography variant="subtitle1">
                        Search History
                      </Typography>
                      <List>
                        {searchHistory.map((history: any) => {
                          return (
                            <ListItem
                              key={history.id}
                              secondaryAction={
                                <>
                                  <IconButton
                                    edge="end"
                                    aria-label="restore"
                                    onClick={() => handleRestore(history.id)}
                                  >
                                    <SearchRounded />
                                  </IconButton>
                                  <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDelete(history.id)}
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
