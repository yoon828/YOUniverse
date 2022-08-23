import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { KAKAO_AUTH_URL } from 'api/oauth';
import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';
import './InvitePage.scss';

const Invite = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const url = new URLSearchParams(search);
  const hostId = url.get('id');
  const hostName = url.get('name');
  localStorage.setItem('hostId', hostId);
  localStorage.setItem('hostName', hostName);
  sessionStorage.setItem('isInvited', 'yes');

  useEffect(() => {
    dispatch(myMainHeader(false));
  }, [dispatch]);

  return (
    <div className="invite_page">
      <div className="main_logo">
        <Link to="/">
          <img
            src="asset/img/logo.png"
            alt="초대 페이지입니다. tab키를 눌러 스페이스에 입장해주세요."
            className="logo_img"
          />
        </Link>
      </div>
      <div className="invite_box">
        <div className="invite_box_text">{hostName}님의 Space</div>
        <div className="invite_box_item">
          <button className="login_kakao">
            <a href={KAKAO_AUTH_URL}>
              <div className="login_kakao_div item_box">
                <img src="/asset/img/main/kakao_log.png" alt="" />
                카카오로 로그인하기
              </div>
            </a>
          </button>
          <Link to={`/guest?id=${hostId}&name=${hostName}`}>
            <div className="item_box guest_enter">게스트로 참가</div>
          </Link>
        </div>
        <img src="asset/img/main/meteor.png" alt="로켓" className="meteor" />
      </div>
    </div>
  );
};

export default Invite;
