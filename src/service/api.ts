import axios from "axios";

const createClient = () => {
  const baseURL = process.env.URL_API_BASE;
  const config = {
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.create(config);
};

export const api = createClient();
