import { api } from 'api/api';

//회원 관리
export const getUserList = async () => {
  return await api.get('/admin/user');
};

export const deleteUser = async (uuid) => {
  return await api.delete(`/admin/user/${uuid}`);
};
export const postAdmin = async (uuid) => {
  return await api.post(`/admin/${uuid}`);
};
//관리자인지 확인
export const getAdmin = async (uuid) => {
  console.log(uuid);
  return await api.get(`/admin/${uuid}`);
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
