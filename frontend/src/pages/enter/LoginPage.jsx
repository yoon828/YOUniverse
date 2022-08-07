import React from 'react';
import { Link } from 'react-router-dom';
import '../../common/style/Reset.scss';
import '../../common/style/all.scss';
import '../../common/style/login.scss';
import { KAKAO_AUTH_URL } from 'api/oauth';

const Login = () => {
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
        <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
      </div>
    </div>
  );
};

export default Login;