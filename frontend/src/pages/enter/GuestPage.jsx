import React from 'react';

const Guest = () => {
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
        <div className="LoginBoxText">이름을 입력해주세요.</div>
        <div className="NameInput">
          <input type="text" />
        </div>
        <div className="KaKaoLogin">확인</div>
      </div>
    </>
  );
};

export default Guest;
