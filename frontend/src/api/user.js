import { api } from 'api/api';

// 유저 정보 조회
export const getUser = async () => {
  return await api.get('/user');
};

// 유저 탈퇴
export const deleteUser = async () => {
  return await api.delete('/user');
};
