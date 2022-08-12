import { api } from 'api/api';

//회원 관리
export const getUserList = async () => {
  return await api.get('/admin/user');
};

export const deleteUser = async () => {
  return await api.get('/admin/user');
};

//QA 관리
export const getQAList = async () => {
  return await api.get('/admin/qna');
};

export const postQaAnswer = async (data) => {
  return await api.post('/admin/answer', data);
};

export const putQaAnswer = async (data) => {
  return await api.put('/admin/answer', data);
};
export const deleteQaAnswer = async (data) => {
  return await api.delete('/admin/answer', data);
};
