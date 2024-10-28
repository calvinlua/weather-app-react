import axios, { AxiosInstance } from "axios";

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
    data: any = {},
    customHeaders: any = {}
  ) {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    const config: any = {
      method,
      url,
      headers,
    };
    if (data) {
      config.data;
    }
    return {
      request: await this.instance(config),
    };
  }

  get(url: string, customHeaders: any = {}) {
    return this.request("get", url, null, customHeaders);
  }
}
