/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.scss';
import { KAKAO_AUTH_URL } from 'api/oauth';
import { useDispatch, useSelector } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(myMainHeader(false));
    if (isLoggedIn) {
      history.push('/');
    }
  }, []);

  localStorage.setItem(
    'accessToken',
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMzcwMzM5Nzk4IiwiaWF0IjoxNjYxMjU2NTg0LCJleHAiOjE2NjEyNTgzODR9.0AMFlqWWKlxGnFF2-eEq69sscIrV-is1OpAcSoVhDongECBe8w_vrnvy3BiHWurDsPneobxXCAHdHUplVUK4Cw'
  );
  localStorage.setItem(
    'refreshToken',
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMzcwMzM5Nzk4IiwiaWF0IjoxNjYxMjU2NTg0LCJleHAiOjE2NjEzNDI5ODR9.Jv6Zs1GhO1wMaoBopUWD2XwpBv1AN46CgoIq0df9733pfz5xDmJ1pqR4UzQjgeruv2czutdfQ2yJfju8LgxeQA'
  );

  localStorage.setItem('hostId', 'no');
  localStorage.setItem('hostName', 'no');
  sessionStorage.setItem('isInvited', 'no');

  return (
    <div className="login_page">
      <div className="main_logo">
        <Link to="/">
          <img
            src="asset/img/logo.png"
            alt="유니버스에 오신 것을 환영합니다. 로그인 후 이용해주세요."
            className="logo_img"
          />
        </Link>
      </div>
      <div className="login_box">
        <div className="login_box_text">
          또 다른 세상, <br /> YOUniverse
        </div>
        <a href={KAKAO_AUTH_URL} className="login_kakao">
          <div className="login_kakao_div">
            <img src="/asset/img/main/kakao_log.png" alt="" />
            카카오로 로그인하기
          </div>
        </a>
        <img src="/asset/img/main/planet.gif" alt="행성" className="saturn" />
      </div>
    </div>
  );
};

export default Login;
