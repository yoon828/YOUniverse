const CLIENT_ID = '9a207ca169983309ce2fe15d2c1831da';
const REDIRECT_URI = 'http://i7c204.p.ssafy.io:8080/login/oauth2/code/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
