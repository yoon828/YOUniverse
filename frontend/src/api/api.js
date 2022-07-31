import axios from 'axios';

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const api = axios.create({
  baseURL: 'http://i7c204.p.ssafy.io:8080',
  headers: {
    Authorization: `Bearer ${getAccessToken()}`
  }
});

export const setApiHeaders = () => {
  api.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  });
};

/*
1. 코드 참고용
export const fileApi = axios.create({
  baseURL: 'http://i7c204.p.ssafy.io:8080/',
  headers: {
    Authorization: `Bearer ${
      sessionStorage.getItem('access-token') ||
      localStorage.getItem('access-token')
    }`
  }
});

2. 코드 참고용
export const setFileApiHeaders = () => {
  fileApi.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${
      sessionStorage.getItem('access-token') ||
      localStorage.getItem('access-token')
    }`;
    return config;
  });
};
*/
