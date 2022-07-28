import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://i7c204.p.ssafy.io:8080/',
  headers: {
    Authorization: `Bearer ${
      sessionStorage.getItem('access-token') ||
      localStorage.getItem('access-token')
    }`
  }
});

export const setApiHeaders = () => {
  api.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${
      sessionStorage.getItem('access-token') ||
      localStorage.getItem('access-token')
    }`;
    return config;
  });
};

export const fileApi = axios.create({
  baseURL: 'http://i7c204.p.ssafy.io:8080/',
  headers: {
    Authorization: `Bearer ${
      sessionStorage.getItem('access-token') ||
      localStorage.getItem('access-token')
    }`
  }
});

export const setFileApiHeaders = () => {
  fileApi.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${
      sessionStorage.getItem('access-token') ||
      localStorage.getItem('access-token')
    }`;
    return config;
  });
};
