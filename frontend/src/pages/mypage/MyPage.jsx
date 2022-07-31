import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MyPage.scss';

const MyPage = () => {
  const { name, email } = useSelector((state) => state.user.value);
  return (
    <div className="my_page">
      <div className="box">
        <p>{name}님의 마이페이지</p>
        <p>{email}</p>
        <button type="button">회원탈퇴</button>
      </div>

      <div className="box">
        <div>
          <p>쉐어룸 히스토리</p>
          <Link to="/history">더보기</Link>
        </div>
        <div>
          <p>1:1 문의내역</p>
          <Link to="/questionlist">더보기</Link>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
