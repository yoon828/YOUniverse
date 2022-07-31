import React, { useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import '../common/style/Reset.scss';
import '../common/style/all.scss';
import '../common/style/app.scss';
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
import Share from './room/SharePage';

import { useSelector, useDispatch } from 'react-redux';
import { insertUser } from 'redux/user';
import _ from 'lodash';
import PrivateRoute from 'routes/PrivateRoute';
import { getUser } from 'api/user';
import { getAccessToken, setApiHeaders } from 'api/api';

const App = () => {
  const isLoggedIn = useSelector(
    (state) => !_.isEmpty(state.auth.value.refreshToken)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      setApiHeaders();
      getUser()
        .then(({ data }) => {
          dispatch(insertUser(data.data));
        })
        .catch((err) => {
          console.log('에러발생: ', err);
        });
      console.log('로그인상태입니다.');
    } else {
      console.log('로그아웃상태입니다.');
    }
  });
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
            <Link to="/question">1:1문의하기</Link>
          </div>
          <div>
            <Link to="/:userId">마이페이지</Link>
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
        <PrivateRoute path="/questionlist" component={QnAList} />
        <PrivateRoute path="/question" component={QnA} />
        <PrivateRoute path="/share" component={Share} />
        <PrivateRoute path="/:userId" component={MyPage} />
      </Switch>
    </div>
  );
};

export default App;
