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

//로그 전용 api
export const logApi = axios.create({
  baseURL: 'http://cjswltjr.shop:8000/',
  headers: {
    // eslint-disable-next-line prettier/prettier
    Authorization: `Bearer ${sessionStorage.getItem('access-token') ||
      localStorage.getItem('access-token')
      }`
  }
});

// 코드 참고용
export const renewToken = async (sucess, fail) => {
  return await api
    .get(`/token/reissuance/${getRefreshToken()}`)
    .then(sucess)
    .catch(fail);
};

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
