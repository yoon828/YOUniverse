import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { KAKAO_AUTH_URL } from 'api/oauth';
import { useDispatch } from 'react-redux';
import { useMainHeader } from 'redux/mainHeader';
import './InvitePage.scss';

const Invite = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const url = new URLSearchParams(search);
  const hostId = url.get('id');
  const hostName = url.get('name');

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
          <Link to={`/guest?id=${hostId}&name=${hostName}`}>게스트로 참가</Link>
        </div>
      </div>
    </div>
  );
};

export default Invite;
