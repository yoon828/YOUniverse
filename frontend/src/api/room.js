import { logApi, api } from 'api/api';

export const postLogs = async (content) => {
  return await logApi.post('/logs', content);
};

export const postHistory = async (content) => {
  return await api.post('/history', content);
};
