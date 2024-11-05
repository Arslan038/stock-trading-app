// BaseApi.js
import axios from "axios";
import router from "../router";

class BaseApi {
  constructor() {
    // const baseURL = import.meta.env.VITE_API_PROD_URL
    const baseURL =
      process.env.NODE_ENV === "development"
        ? import.meta.env.VITE_API_DEV_URL
        : import.meta.env.VITE_API_PROD_URL;

    this.axiosInstance = axios.create({
      baseURL,
      timeout: 30000,
    });

    // Request interceptor (optional)
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // You can modify the request config here (e.g., add headers)
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor (optional)
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // You can modify the response here (e.g., handle success responses)
        return response;
      },
      (error) => {
        // You can handle errors here (e.g., show error messages)
        console.log(error);
        const status = error.response.status;

        if (status === 401) {
          localStorage.removeItem(import.meta.env.VITE_APP_USER);
          window.location.href = '/login'
        }

        return Promise.reject(error);
      }
    );
  }

  buildUrl(endpoint) {
    return `${this.axiosInstance.defaults.baseURL}/${endpoint}`;
  }

  async get(endpoint, config = {}) {
    const url = this.buildUrl(endpoint);
    return this.axiosInstance.get(url, config);
  }

  async post(endpoint, data, config = {}) {
    const url = this.buildUrl(endpoint);
    return this.axiosInstance.post(url, data, config);
  }

  async put(endpoint, data, config = {}) {
    const url = this.buildUrl(endpoint);
    return this.axiosInstance.put(url, data, config);
  }

  async delete(endpoint, config = {}) {
    const url = this.buildUrl(endpoint);
    return this.axiosInstance.delete(url, config);
  }
}

export default BaseApi;
