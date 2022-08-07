import { logApi } from 'api/api';

export const postLogs = async (content) => {
  return await logApi.post('/logs', content);
};
