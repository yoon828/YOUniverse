import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { KAKAO_AUTH_URL } from 'api/oauth';

import { useDispatch } from 'react-redux';
import { useMainHeader } from 'redux/mainHeader';
import './InvitePage.scss';

const Invite = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const url = window.location.search;
  console.log(url);
  const searchParams = new URLSearchParams(url);
  console.log(searchParams);
  const hostName = searchParams.get('name');

  dispatch(useMainHeader(false));
  return (
    <div className="invite_page">
      <div className="main_logo">
        <Link to="/">
          <img
            src="https://blog.kakaocdn.net/dn/be0xab/btrHTW8GtRk/LDOhwqWEBUDFkVh1S5aNv0/img.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="invite_box">
        <div className="invite_box_text">{hostName}님의 Space</div>
        <div className="invite_kakao">
          <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
        </div>
        <div>
          <Link to="/guest">게스트로 참가</Link>
        </div>
      </div>
    </div>
  );
};

export default Invite;
