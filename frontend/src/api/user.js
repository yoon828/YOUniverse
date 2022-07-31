import axios from 'axios';
import { api } from 'api/api';

// History test용
export const jsonPlaceholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
});
export const dumpHistory = async () => {
  return await jsonPlaceholder.get('comments/');
};

export const getUser = async () => {
  return await api.get('/user');
};
