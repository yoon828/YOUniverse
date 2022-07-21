import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Invite = () => {
  const { userId } = useParams();
  return (
    <>
      <div className="MainLogo">
        <a href="/">
          <img
            src="https://blog.kakaocdn.net/dn/be0xab/btrHTW8GtRk/LDOhwqWEBUDFkVh1S5aNv0/img.png"
            alt="logo"
          />
        </a>
      </div>
      <div className="LoginBox">
        <div className="LoginBoxText">{userId}님의 share room</div>
        <div className="KaKaoLogin">카카오 로그인</div>
        <div>
          <Link to="/guest">게스트로 참가</Link>
        </div>
      </div>
    </>
  );
};

export default Invite;
