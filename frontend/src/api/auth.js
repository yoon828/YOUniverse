import { api, baseURL } from 'api/api';

export const logoutUser = async () => {
  return await api.get(baseURL + '/logout');
};
