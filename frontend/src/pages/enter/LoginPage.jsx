import React from 'react';
import { Link } from 'react-router-dom';
import '../../common/style/Reset.scss';
import '../../common/style/all.scss';
import '../../common/style/login.scss';

const Login = () => {
  return (
    <div className="login_page">
      <div className="MainLogo">
        <Link to="/">
          <img
            src="https://blog.kakaocdn.net/dn/be0xab/btrHTW8GtRk/LDOhwqWEBUDFkVh1S5aNv0/img.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="LoginBox">
        <div className="LoginBoxText">지금 너, 나, 우리</div>
        <div className="KaKaoLogin">카카오 로그인</div>
      </div>
    </div>
  );
};

export default Login;
