import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const config = {
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create(config);

export default api;
