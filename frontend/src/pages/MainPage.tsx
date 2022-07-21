import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      메인페이지 화면
      <Link to="/question">1:1문의하기</Link>
      <Link to="/:userId">마이페이지</Link>
    </div>
  );
};

export default MainPage;
