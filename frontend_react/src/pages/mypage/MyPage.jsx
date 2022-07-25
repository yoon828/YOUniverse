import React from 'react';
import { useParams } from 'react-router-dom';

const MyPage = () => {
  const { userId } = useParams();
  return <div>여긴 {userId} 마이페이지</div>;
};

export default MyPage;
