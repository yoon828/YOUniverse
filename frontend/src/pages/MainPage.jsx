import React from 'react';
import { Link } from 'react-router-dom';
import MyPageModule from 'modules/MyPageModule';
import './MainPage.scss';
import { useDispatch } from 'react-redux';
import { useMainHeader } from 'redux/mainHeader';

const MainPage = () => {
  const dispatch = useDispatch();

  dispatch(useMainHeader(false));

  return (
    <div className="main">
      <div className="main_logo">
        <Link to="/">
          <img src="asset/img/logo.png" alt="logo" className="logo_img" />
        </Link>
      </div>
      <div className="main_page_box">
        <div className="main_menu">
          <img
            src="asset/img/main/menu_1.png"
            alt="방만들기"
            className="menu_img"
          />
          <div className="menu_box">
            <Link to="/share" className="menu_text">
              room 활성화
            </Link>
          </div>
        </div>
        <div className="main_menu">
          <img
            src="asset/img/main/menu_2.png"
            alt="방만들기"
            className="menu_img"
          />
          <div className="menu_box">
            <Link to="/quest" className="menu_text">
              1:1문의하기
            </Link>
          </div>
        </div>
        <div className="main_menu">
          <img
            src="asset/img/main/menu_3.png"
            alt="방만들기"
            className="menu_img"
          />
          <div className="menu_box">
            <MyPageModule />
          </div>
        </div>
      </div>
      <div className="floor" />
    </div>
  );
};

export default MainPage;
