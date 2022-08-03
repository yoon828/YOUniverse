import { api } from 'api/api';

// 로그 생성
export const storeHistory = async (payload) => {
  return await api.post('/history', payload);
};

// 전체 로그 조회
export const getHistoryList = async () => {
  return await api.get('/history/list');
};

// 단일 로그 조회
export const getHistory = async (id) => {
  return await api.get(`/history/${id}`);
};
