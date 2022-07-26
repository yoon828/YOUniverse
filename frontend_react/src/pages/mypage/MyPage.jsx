import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './MyPage.scss';

const MyPage = () => {
  const { userId } = useParams();
  return (
    <div className="my_page">
      <div className="box">
        <p>{userId}님의 마이페이지</p>
        <p>eunyoung950210@gmail.com</p>
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
