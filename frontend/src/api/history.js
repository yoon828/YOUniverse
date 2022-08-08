import { api } from 'api/api';

export const storeHistory = async (content) => {
  return await api.post('/history', content);
};
export const getHistoryList = async () => {
  return await api.get('/history/list');
};
