import { api } from 'api/api';
import { getRefreshToken } from 'common/functions/functions';

export const loginUser = async (user, success, fail) => {
  return await api.post('/api/auth/login', user);
};

export const renewToken = async () => {
  return await api.get(`/token/reissuance/${getRefreshToken()}`);
};

export const logoutUser = async () => {
  return await api.get('/logout');
};
