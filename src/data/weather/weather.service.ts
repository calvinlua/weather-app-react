import { HTTPService } from "../common/http.service";

export class WeatherService extends HTTPService {
  constructor(
    baseURL: string = "https://api.openweathermap.org/data/2.5/weather"
  ) {
    super(baseURL);
  }

  appid: string = import.meta.env.VITE_APP_KEY;
  unit_standard: string = "metric";

  checkFilter(filter: string) {
    return filter.length != 0;
  }

  async getWeather(city: string) {
    console.log(this.appid);
    const params = {
      q: city,
      appid: this.appid,
      units: this.unit_standard,
    };
    const queryString: string = new URLSearchParams(params).toString();
    const paramString: string = `?${queryString}`;

    try {
      let result: any = await this.get(paramString, {});
      return result.request.data;
    } catch (error: any) {
      throw new Error("e:" + error);
    }
  }
}

export default WeatherService;
