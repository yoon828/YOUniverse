import React from 'react';
import { Link } from 'react-router-dom';
import MyPageModule from 'modules/MyPageModule';
import './MainPage.scss';
import { useSelector } from 'react-redux';

const MainPage = () => {
  // 스토어 값 가져오기 - 서희
  const storeSessionId = useSelector((state) => state.user.value.sessionId);
  console.log(storeSessionId);
  return (
    <div className="main_page_box">
      {/* <Link to="/room/:storeSessionId}">room 활성화</Link> */}
      <Link to={`/room/${storeSessionId}`}>room 활성화</Link>
      <Link to="/quest">1:1문의하기</Link>
      <MyPageModule />
    </div>
  );
};

export default MainPage;
