import React from 'react';
import { Link } from 'react-router-dom';
import MyPageModule from 'modules/MyPageModule';
import './MainPage.scss';
import LogoutModule from 'modules/LogoutModule';
import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';

const MainPage = () => {
  const dispatch = useDispatch();

  dispatch(myMainHeader(false));
  return (
    <div className="main_page_box">
      <Link to="/share">room 활성화</Link>
      <Link to="/quest">1:1문의하기</Link>
      <MyPageModule />
      <LogoutModule />
    </div>
  );
};

export default MainPage;
