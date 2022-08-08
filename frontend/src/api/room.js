import { logApi } from 'api/api';

export const postHistory = async (content) => {
  return await logApi.post('/logs', content);
};
