import { api, logApi } from 'api/api';

// 히스토리 생성
export const storeHistory = async (payload) => {
  return await api.post('/history', payload);
};

// 전체 히스토리 조회
export const getHistoryList = async () => {
  return await api.get('/history/list');
};

// 단일 히스토리 조회
export const getHistory = async (id) => {
  return await api.get(`/history/${id}`);
};

// 단일 로그 조회
export const getLog = async (id) => {
  return await logApi.get(`/logs/${id}`);
};

// export const storeLog = async (payload) => {
//   return await logApi.post('/logs', payload);
// };
