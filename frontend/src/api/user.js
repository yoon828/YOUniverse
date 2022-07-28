import axios from 'axios';

// History test용
export const jsonPlaceholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
});
export const dumpHistory = async () => {
  return await jsonPlaceholder.get('comments/');
};
