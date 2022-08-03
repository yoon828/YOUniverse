import React from 'react';
import { Link } from 'react-router-dom';
import MyPageModule from 'modules/MyPageModule';
import './MainPage.scss';

const MainPage = () => {
  return (
    <div className="main_page_link">
      메인페이지 화면
      <Link to="/share">room 활성화</Link>
      <Link to="/quest">1:1문의하기</Link>
      <MyPageModule />
    </div>
  );
};

export default MainPage;
