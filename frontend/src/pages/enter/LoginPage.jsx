import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.scss';
import { KAKAO_AUTH_URL } from 'api/oauth';

import { useDispatch } from 'react-redux';
import { useMainHeader } from 'redux/mainHeader';

const Login = () => {
  const dispatch = useDispatch();

  dispatch(useMainHeader(false));

  return (
    <div className="login_page">
      <div className="main_logo">
        <Link to="/">
          <img src="asset/img/logo.png" alt="logo" className="logo_img" />
        </Link>
      </div>
      <div className="login_box">
        <div className="login_box_text">
          또 다른 세상, <br /> YOUniverse
        </div>
        <a href={KAKAO_AUTH_URL} className="login_kakao">
          <div className="login_kakao_div">
            <img src="/asset/img/main/kakao_login.png" alt="카카오로그인" />
          </div>
        </a>
        <img src="/asset/img/main/saturn.png" alt="행성" className="saturn" />
      </div>
    </div>
  );
};

export default Login;
