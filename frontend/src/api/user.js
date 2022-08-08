import axios from 'axios';
import { api } from 'api/api';

// 유저 정보 조회
export const getUser = async () => {
  return await api.get('/user');
};

// 유저 탈퇴
export const deleteUser = async () => {
  return await api.delete('/user');
};

// History test용
export const jsonPlaceholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
});
export const dumpHistory = async () => {
  return await jsonPlaceholder.get('comments/');
};
