import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../common/style/Reset.scss';
import '../../common/style/all.scss';
import '../../common/style/invite.scss';
import { KAKAO_AUTH_URL } from 'api/oauth';

const Invite = () => {
  const { userId } = useParams();
  return (
    <div className="invite_page">
      <div className="MainLogo">
        <Link to="/">
          <img
            src="https://blog.kakaocdn.net/dn/be0xab/btrHTW8GtRk/LDOhwqWEBUDFkVh1S5aNv0/img.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="LoginBox">
        <div className="LoginBoxText">{userId}님의 share room</div>
        <div>
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
