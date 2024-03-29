/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './GuestPage.scss';

import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';

const Guest = () => {
  const history = useHistory();
  const guestNameInputRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myMainHeader(false));
    guestNameInputRef.current.focus();
  }, []);

  const submit = () => {
    localStorage.setItem('guestName', guestNameInputRef.current.value);
    history.replace(
      `/room?id=${localStorage.getItem('hostId')}&name=${localStorage.getItem(
        'hostName'
      )}`
    );
  };

  return (
    <div className="guest_page">
      <div className="main_logo">
        <Link to="/">
          <img
            src="asset/img/logo.png"
            alt="유니버스 메인 페이지로 이동합니다. 스페이스 입장을 원하시면 tab을 눌러 이름을 입력해주세요."
            className="logo_img"
          />
        </Link>
      </div>
      <div className="nickname">
        <img
          src="asset/img/main/astronaut.png"
          alt="우주인"
          className="astronaut_big_img"
        />
        <form className="guest_form">
          <h1 className="title">Space 입장을 환영합니다</h1>
          <input
            type="text"
            name="guest"
            ref={guestNameInputRef}
            defaultValue={localStorage.getItem('guestName')}
            className="nickname_input"
            placeholder="이름을 입력해주세요"
          />
          <button type="submit" onClick={submit} className="confirm">
            확인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Guest;
