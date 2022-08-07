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

//로그 전용 api
export const logApi = axios.create({
  baseURL: 'http://cjswltjr.shop:8000/',
  headers: {
    Authorization: `Bearer ${
      sessionStorage.getItem('access-token') ||
      localStorage.getItem('access-token')
    }`
  }
});

// 코드 참고용
export const setApiHeaders = () => {
  api.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${
      sessionStorage.getItem('access-token') ||
      localStorage.getItem('access-token')
    }`;
    return config;
  });
};
// 코드 참고용
export const fileApi = axios.create({
  baseURL: 'http://i7c204.p.ssafy.io:8080/',
  headers: {
    Authorization: `Bearer ${
      sessionStorage.getItem('access-token') ||
      localStorage.getItem('access-token')
    }`
  }
});

// 코드 참고용
export const setFileApiHeaders = () => {
  fileApi.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${
      sessionStorage.getItem('access-token') ||
      localStorage.getItem('access-token')
    }`;
    return config;
  });
};
