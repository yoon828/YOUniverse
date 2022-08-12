import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.scss';
import { KAKAO_AUTH_URL } from 'api/oauth';

import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';

const Login = () => {
  const dispatch = useDispatch();

  dispatch(myMainHeader(false));

  localStorage.setItem('hostId', 'no');
  localStorage.setItem('hostName', 'no');
  sessionStorage.setItem('isInvited', 'no');

  return (
    <div className="login_page">
      <div className="main_logo">
        <Link to="/">
          <img
            src="https://blog.kakaocdn.net/dn/be0xab/btrHTW8GtRk/LDOhwqWEBUDFkVh1S5aNv0/img.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="login_box">
        <div className="login_box_text">지금 너, 나, 우리</div>
        <div className="login_kakao">
          <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
