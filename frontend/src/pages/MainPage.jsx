import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from '../redux/user';
import './MainPage.scss';

const MainPage = () => {
  //redux에 있는 값 불러올 때
  const user = useSelector((state) => state.user.value);
  //redux에서 선언한 reducers 사용할 때
  const dispatch = useDispatch();

  let sessionId = 'sessionA';
  //예시
  const getUser = () => {
    console.log(user);
  };
  const insertUser = () => {
    dispatch(login({ name: '김윤민', age: 24, email: 'k915k@naver.com' }));
  };
  const deleteUser = () => {
    dispatch(logout());
  };

  return (
    <div className="main_page_link">
      메인페이지 화면
      <button onClick={getUser}>리덕스 테스트</button>
      <button onClick={insertUser}>사용자 값 넣기</button>
      <button onClick={deleteUser}>사용자 제거</button>
      <Link to={`/room/${sessionId}`}>room 활성화</Link>
      <Link to="/question">1:1문의하기</Link>
      <Link to="/:userId">마이페이지</Link>
    </div>
  );
};

export default MainPage;
