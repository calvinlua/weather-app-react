import { HTTPService } from "../common/http.service";

export class WeatherService extends HTTPService {
  constructor(
    baseURL: string = "https://api.openweathermap.org/data/2.5/weather"
  ) {
    super(baseURL);
  }

  appid: string = "d8710f6fd9a57562e5a8cbd75c9f2948";
  unit_standard: string = "metric";

  checkFilter(filter: string) {
    return filter.length != 0;
  }

  async getWeather(city: string) {
    const params = {
      q: city,
      appid: this.appid,
      units: this.unit_standard,
    };
    const queryString: string = new URLSearchParams(params).toString();
    const paramString: string = `?${queryString}`;
    console.log(paramString);

    try {
      let result: any = await this.get(paramString, {});
      return result.request.data;
    } catch (error: any) {
      console.log("e:" + error);
    }
  }
}

export default WeatherService;
