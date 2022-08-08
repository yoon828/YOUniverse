import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken
} from 'common/functions/functions';

const baseURL = 'http://i7c204.p.ssafy.io:8080';

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`
  }
});

export const logApi = axios.create({
  baseURL: 'http://cjswltjr.shop:8000',
  headers: {
    Authorization: `Bearer ${getAccessToken()}`
  }
});

// api 인스턴스 요청 인터셉터 설정
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  console.log('SET_API_HEADERS:', config);
  return config;
});

// api 인스턴스 응답 인터셉터 설정
// 1. 버전
// let isTokenRefreshing = false;
// let refreshSubscribers = [];

// const onTokenRefreshed = (accessToken) => {
//   refreshSubscribers.map((callback) => callback(accessToken));
// };

// const addRefreshSubsciber = (callback) => {
//   refreshSubscribers.push(callback);
// };

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     console.log('무시', error);
//     const { config, response } = error;
//     const originalRequest = config;
//     if (response.data?.message.includes('만료')) {
//       if (!isTokenRefreshing) {
//         isTokenRefreshing = true;
//         console.log(error.config, '내가 먼저 헀다.');
//         const { data, status } = await axios.get(
//           baseURL + `/token/reissuance/${getRefreshToken()}`,
//           {
//             headers: {
//               Authorization: `Bearer ${getAccessToken()}`
//             }
//           }
//         );

//         if (status === 200 || status === 201) {
//           console.log('accessToken 교체완료');
//           setAccessToken(data.accessToken);
//           isTokenRefreshing = false;
//           axios.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
//           onTokenRefreshed(getAccessToken());
//         } else {
//           console.log('큰일이다 리프레쉬 만료다');
//         }
//       }
//       const retryOriginalRequest = new Promise((resolve) => {
//         console.log('추가되는 중..?');
//         addRefreshSubsciber(() => {
//           originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
//           resolve(axios(originalRequest));
//         });
//       });
//       return retryOriginalRequest;
//     }
//     return Promise.reject(error);
//   }
// );

// 2. 버전
api.interceptors.response.use(
  // 성공 응답일 때,
  (response) => {
    console.log(response);
    return response;
  },

  // 실패 응답일 때,
  async (error) => {
    console.log('ERROR형태보기', error);

    // A) 토큰 만료 이슈인 경우
    if (error.response.data?.message.includes('만료')) {
      console.log('accessToken 만료 관련 문제');

      // a) 갱신 요청
      const { data, status } = await axios.get(
        baseURL + `/token/reissuance/${getRefreshToken()}`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        }
      );

      if (status === 201) {
        setAccessToken(data.accessToken);
        console.log('리프레쉬 갱신완료');

        // 헤더 변경 후 다시 쏘기
        const originalRequest = error.config;
        axios.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
        originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;

        return await axios(originalRequest);
      }
    }
    // B) 토큰 이슈 아닌 경우 및 refreshToken 만료 이슈
    return Promise.reject(error);
  }
);

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
