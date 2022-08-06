import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../../common/style/Reset.scss';
import '../../common/style/all.scss';
import '../../common/style/guest.scss';

const Guest = () => {
  const history = useHistory();
  const guestNameInputRef = useRef();

  const submit = () => {
    localStorage.setItem('guestName', guestNameInputRef.current.value);
    history.replace('/');
  };

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
      <form>
        <div>이름을 입력해주세요.</div>
        <input
          type="text"
          name="guest"
          // placeholder="이름을 입력해주세요."
          ref={guestNameInputRef}
          defaultValue={localStorage.getItem('guestName')}
        ></input>
        <button type="submit" onClick={submit}>
          확인
        </button>
      </form>
    </div>
  );
};

export default Guest;
