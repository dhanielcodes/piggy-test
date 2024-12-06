import axios from 'axios';
import { API_HOST, API_KEY, API_URL } from '@env';

export const Axios = axios.create({
  baseURL: API_URL,
});

Axios.interceptors.request.use((config) => {
  config.headers['x-rapidapi-key'] = API_KEY;
  config.headers['x-rapidapi-host'] = API_HOST;
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return config;
});

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.message === 'Request failed with status code 500' ||
      error?.response?.status >= 500
    ) {
      return Promise.reject({
        ...error,
        message: "It's not you, it's us. Try again later.",
      });
    } else {
      return Promise.reject(error);
    }
  }
);
