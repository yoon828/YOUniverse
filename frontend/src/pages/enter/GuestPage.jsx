import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './GuestPage.scss';

import { useDispatch } from 'react-redux';
import { useMainHeader } from 'redux/mainHeader';

const Guest = () => {
  const history = useHistory();
  const guestNameInputRef = useRef();

  const dispatch = useDispatch();

  dispatch(useMainHeader(false));

  useEffect(() => {
    guestNameInputRef.current.focus();
  }, []);

  const submit = () => {
    localStorage.setItem('guestName', guestNameInputRef.current.value);
    history.replace('/');
  };

  return (
    <div className="guest_page">
      <div className="main_logo">
        <Link to="/">
          <img src="asset/img/logo.png" alt="logo" className="logo_img" />
        </Link>
      </div>
      <div className="nickname">
        <img
          src="asset/img/main/astronaut.png"
          alt="우주인"
          className="astronaut"
        />
        <form className="guest_form">
          <h1 className="title">이름을 입력해주세요.</h1>
          <input
            type="text"
            name="guest"
            // placeholder="이름을 입력해주세요."
            ref={guestNameInputRef}
            defaultValue={localStorage.getItem('guestName')}
            className="nickname_input"
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
