import React from 'react';
import { Link } from 'react-router-dom';
import './GuestPage.scss';

const Guest = () => {
  return (
    <div className="guest_page">
      <div className="main_logo">
        <Link to="/">
          <img
            src="https://blog.kakaocdn.net/dn/be0xab/btrHTW8GtRk/LDOhwqWEBUDFkVh1S5aNv0/img.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="LoginBox">
        <div className="LoginBoxText">이름을 입력해주세요.</div>
        <div className="NameInput">
          <input type="text" />
        </div>
        <div className="KaKaoLogin">확인</div>
      </div>
    </div>
  );
};

export default Guest;
