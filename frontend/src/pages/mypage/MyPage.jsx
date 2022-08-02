import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from 'api/user';
import { storeHistory } from 'api/history';
import './MyPage.scss';
import { deleteToken } from 'redux/auth';
import { resetUser } from 'redux/user';

const MyPage = () => {
  const { name, email, uuid } = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const onDeleteUser = () => {
    // 탈퇴 의사 재확인
    if (window.confirm('탈퇴하시겠습니까?')) {
      // 서버에 탈퇴 요청
      deleteUser()
        .then(() => {
          alert('탈퇴가 성공적으로 진행되었습니다. 로그인으로 이동합니다.');
          // 로그아웃 처리(토큰 삭제) => 리덕스 유저 정보 삭제
          dispatch(deleteToken());
          dispatch(resetUser());
        })
        .catch((err) => console.log('err', err));
    }
  };

  const addHistory = () => {
    const content = {
      filePath: '로컬어딘가겠지',
      hostName: name,
      participants: '최싸피,박싸피,집싸피',
      roomName: '싸피모임',
      uuid: uuid
    };
    storeHistory(content)
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  };

  return (
    <div className="my_page">
      <div className="box">
        <p>{name}님의 마이페이지</p>
        <p>{email}</p>
        <button onClick={onDeleteUser}>회원탈퇴</button>
      </div>

      <div className="box">
        <div>
          <p>쉐어룸 히스토리</p>
          <button onClick={addHistory}>히스토리 임의 등록</button>
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
