import { api } from 'api/api';

// 문의 등록
export const registerQnA = async (payload) => {
  return await api.post('/qna', payload);
};

// 전체 문의 조회
export const getQnAList = async () => {
  return await api.get('/qna/list');
};

// 단일 조회
export const getQnA = async (id) => {
  return await api.get(`/qna/${id}`);
};

// 문의 삭제
export const deleteQnA = async (id) => {
  return await api.delete(`/qna/${id}`);
};
