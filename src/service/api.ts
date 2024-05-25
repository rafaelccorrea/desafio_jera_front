import axios from "axios";
import { getItem } from "../utils/local-storage";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const config = {
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create(config);

api.interceptors.request.use(
  (config) => {
    const accessToken = getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
