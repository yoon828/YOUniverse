import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyPageModule from 'modules/MyPageModule';
import './MainPage.scss';
import LogoutModule from 'modules/LogoutModule';
import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myMainHeader(false));
  }, [dispatch]);

  return (
    <div className="main">
      <div className="main_logo">
        <Link to="/">
          <img src="asset/img/logo.png" alt="logo" className="logo_img" />
        </Link>
      </div>
      <div className="main_page_box">
        <div className="main_menu">
          <img src="asset/img/main/menu_1.png" alt="" className="menu_img" />
          <div className="menu_box">
            <Link to="/share" className="menu_text">
              SPACE생성{' '}
            </Link>
          </div>
        </div>
        <div className="main_menu">
          <img src="asset/img/main/menu_2.png" alt="" className="menu_img" />
          <div className="menu_box">
            <Link to="/quest" className="menu_text">
              1대1 문의
            </Link>
          </div>
        </div>
        <div className="main_menu">
          <img src="asset/img/main/menu_3.png" alt="" className="menu_img" />
          <div className="menu_box">
            <MyPageModule />
          </div>
        </div>
      </div>
      <div className="floor">
        <LogoutModule />
      </div>
    </div>
  );
};

export default MainPage;
