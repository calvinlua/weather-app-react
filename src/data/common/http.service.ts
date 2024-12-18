import axios, {AxiosInstance} from "axios";

export class HTTPService {
  baseURL: string;
  instance: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.instance = axios.create({ baseURL: this.baseURL });
  }

  get defaultHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }

  async request(
      method: string,
      url: string,
      data?: unknown,
      customHeaders: object = {}
  ):Promise<{ request: unknown }> {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    const config : object = {
      method,
      url,
      headers
    };
    config.data = data || undefined;
    return {
      request: await this.instance(config),
    };
  }

  get(url: string, customHeaders: object = {}):Promise<{ request: unknown }>  {
    return this.request("get", url, null, customHeaders);
  }
}
