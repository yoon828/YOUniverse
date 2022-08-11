import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { KAKAO_AUTH_URL } from 'api/oauth';

import { useDispatch } from 'react-redux';
import { useMainHeader } from 'redux/mainHeader';
import './InvitePage.scss';

const Invite = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  dispatch(useMainHeader(false));

  return (
    <div className="invite_page">
      <div className="main_logo">
        <Link to="/">
          <img src="asset/img/logo.png" alt="logo" className="logo_img" />
        </Link>
      </div>
      <div className="invite_box">
        <div className="invite_box_text">{userId}님의 SPACE</div>
        <a href={KAKAO_AUTH_URL} className="login_kakao">
          <div className="login_kakao_div">
            <img src="/asset/img/main/kakao_log.png" alt="카카오로그인" />
            카카오로 로그인하기
          </div>
        </a>
        <div>
          <Link to="/guest">게스트로 참가</Link>
        </div>
        <img src="asset/img/main/meteor.png" alt="로켓" className="meteor" />
      </div>
    </div>
  );
};

export default Invite;
