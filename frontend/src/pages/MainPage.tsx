import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <Link to="/:userId">마이페이지</Link>
    </div>
  );
};

export default MainPage;
