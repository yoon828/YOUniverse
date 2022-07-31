import { api } from 'api/api';

export const getUser = async () => {
  return await api.get('/user');
};
