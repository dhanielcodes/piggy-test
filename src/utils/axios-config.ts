import axios from 'axios';
import { API_URL } from '@env';

export const Axios = axios.create({
  baseURL: API_URL,
});

Axios.interceptors.request.use((config) => {
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
