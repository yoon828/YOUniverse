import axios from 'axios';
import { renewToken } from './auth';
import { getAccessToken, setAccessToken } from 'common/functions/functions';

export const api = axios.create({
  baseURL: 'http://i7c204.p.ssafy.io:8080',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  console.log('SET_API_HEADERS:', config);
  return config;
});

// 응답을 받기 직전에
api.interceptors.response.use(
  // 성공 응답일 때,
  (response) => {
    return response;
  },

  // 실패 응답일 때,
  async (error) => {
    console.log('ERROR형태보기', error);
    // A) 토큰 만료 이슈인 경우
    if (error.response.data?.message.includes('만료')) {
      console.log('accessToken 만료 관련 문제');
      // a) 갱신 요청
      const { data, status } = await renewToken();

      // i) 성공 시,
      if (status === 201) {
        setAccessToken(data.accessToken);

        // 헤더 변경 후 다시 쏘기
        const originalRequest = error.config;
        // axios.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
        originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;

        return await axios(originalRequest);
      } else {
        console.log('여긴가');
        return Promise.reject(error);
      }
    } else if (
      error.response.data?.message === 'refreshToken 을 찾을 수 없습니다.'
    ) {
      console.log('refreshToken 만료 관련 문제');
    }
    // B) 토큰 이슈 아닌 경우
    return Promise.reject(error);
  }
);

// export const setApiHeaders = () => {
//   return config;
// };

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
