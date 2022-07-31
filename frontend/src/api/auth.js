import { api } from 'api/api';

export const loginUser = async (user, success, fail) => {
  return await api.post('/api/auth/login', user);
};
