// 날짜 변환
export const transform = (data, type = 'list') => {
  const date = new Date(data);
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  // 로그 페이지에 들어갈 date 형식
  if (type === 'chat') {
    return `${Y}.${M}.${D}.${h}:${m}:${s}`;
  }

  // 그 외 페이지에 들어갈 date 형식
  return `${Y}년 ${M}월 ${D}일`;
};

// accessToken 가져오기
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// refreshToken 가져오기
export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

// accessToken 설정
export const setAccessToken = (accessToken) => {
  return localStorage.setItem('accessToken', accessToken);
};

// refreshToken 설정
export const setRefreshToken = (refreshToken) => {
  return localStorage.setItem('refreshToken', refreshToken);
};

// token 삭제
export const deleteToken = () => {
  localStorage.clear();
};

// refreshToken 만료 확인
export const isTokenExpired = (message) => {
  return message === 'refreshToken 을 찾을 수 없습니다.' ? true : false;
};
