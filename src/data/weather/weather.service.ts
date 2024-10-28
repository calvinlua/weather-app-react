import { HTTPService } from "../common/http.service";

export class CarService extends HTTPService {
  constructor(
    baseURL: string = "https://api.openweathermap.org/data/2.5/weather"
  ) {
    super(baseURL);
  }

  appid: string = "";
  unit_standard: string = "metric";

  scheckFilter(filter: string) {
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
      console.log(result.request.data);
      return result.request.data;
    } catch (error: any) {
      console.log("e:" + error);
    }
  }
}

export default CarService;
