// 날짜 변환
export const transform = (timestamp) => {
  const date = new Date(timestamp);
  const Y = date.getFullYear();
  const M = date.getMonth();
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
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

export const deleteToken = () => {
  localStorage.clear();
};
