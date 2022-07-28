import { api, fileApi } from 'api/api';
import axios from 'axios';

export const loginUser = async (user, success, fail) => {
  return await api.post('/api/auth/login', user);
};
