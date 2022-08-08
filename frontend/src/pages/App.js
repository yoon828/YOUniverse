import React, { useEffect } from 'react';

import { Route, Link, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { insertUser } from 'redux/user';
import { logout } from 'redux/auth';

import MainPage from './MainPage';
import Login from './enter/LoginPage';
import LogoutModule from '../modules/LogoutModule';
import Guest from './enter/GuestPage';
import Invite from './enter/InvitePage';
import CallBack from './enter/CallBackPage';
import MyPage from './mypage/MyPage';
import HistoryList from './mypage/HistoryList';
import HistoryDetail from './mypage/HistoryDetail';
import QnA from './mypage/QnAPage';
import QnAList from './mypage/QnAList';
import QnADetail from './mypage/QnADetail';
import Share from './room/SharePage';

import { getUser } from 'api/user';
import PrivateRoute from 'routes/PrivateRoute';
import MyPageModule from 'modules/MyPageModule';
import { isTokenExpired } from 'common/functions/functions';

import '../common/style/app.scss';

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const uuid = useSelector((state) => state.user.value.uuid);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && !uuid) {
      console.log('정보받으러 가기');
      getUser()
        .then(({ data }) => {
          console.log(data.data);
          dispatch(insertUser(data.data));
        })
        .catch(({ response }) => {
          console.log(response.data.message);
          if (isTokenExpired(response.data.message)) {
            dispatch(logout());
          } else {
            alert('에러가 발생하였습니다..ㅜㅜ');
          }
        });
    }
  }, [isLoggedIn, dispatch, uuid]);

  return (
    <div className="App">
      <header className="main_header">
        <div className="main_header_logo">
          <Link to="/">
            <img
              src="https://blog.kakaocdn.net/dn/be0xab/btrHTW8GtRk/LDOhwqWEBUDFkVh1S5aNv0/img.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="main_header_menu">
          <div>
            <Link to="/share">쉐어룸</Link>
          </div>
          <div>
            <Link to="/quest">1:1문의하기</Link>
          </div>
          <div>
            <MyPageModule />
          </div>
          <div>
            <Link to="/login">로그인</Link>
          </div>
          <div>
            <LogoutModule />
          </div>
        </div>
      </header>
      <Switch>
        <PrivateRoute exact path="/" component={MainPage} />
        <Route path="/login" component={Login} />
        <Route path="/oauth/callback" component={CallBack} />
        <PrivateRoute path="/invite" component={Invite} />
        <PrivateRoute path="/guest" component={Guest} />
        <PrivateRoute path="/history/:historyId" component={HistoryDetail} />
        <PrivateRoute path="/history" component={HistoryList} />
        <PrivateRoute path="/question/:questionId" component={QnADetail} />
        <PrivateRoute path="/question" component={QnAList} />
        <PrivateRoute path="/quest" component={QnA} />
        <PrivateRoute path="/share" component={Share} />
        <PrivateRoute path="/:uuid" component={MyPage} />
      </Switch>
    </div>
  );
};

export default App;
