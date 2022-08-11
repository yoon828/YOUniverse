import React, { useEffect } from 'react';

import { Route, Link, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { insertUser } from 'redux/user';
import { logout } from 'redux/auth';

import MainPage from './MainPage';
import Login from './enter/LoginPage';
import LogoutModule from '../modules/LogoutModule';
import MyPageModule from 'modules/MyPageModule';
import Guest from './enter/GuestPage';
import Invite from './enter/InvitePage';
import CallBack from './enter/CallBackPage';
import MyPage from './mypage/MyPage';
import HistoryList from './mypage/HistoryList';
import HistoryDetail from './mypage/HistoryDetail';
import Share from './enter/SharePage';
import Room from './room/RoomPage';
import QnA from './mypage/QnAPage';
import QnAList from './mypage/QnAList';
import QnADetail from './mypage/QnADetail';
import { getUser } from 'api/user';
import PrivateRoute from 'routes/PrivateRoute';
import { isTokenExpired } from 'common/functions/functions';

import '../common/style/app.scss';

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const uuid = useSelector((state) => state.user.value.uuid);
  const dispatch = useDispatch();

  const checkMainHeaderValue = useSelector(
    (state) => state.mainHeader.mainHeader
  );

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
      {checkMainHeaderValue && (
        <header className="main_header">
          <div className="main_header_logo">
            <Link to="/">
              <img src="asset/img/logo_header.png" alt="logo" />
            </Link>
          </div>
          <div className="main_header_menu">
            <div>
              <Link to="/room">SPACE</Link>
            </div>
            <div>
              <Link to="/quest">1:1문의</Link>
            </div>
            <div>
              <MyPageModule />
            </div>
            {localStorage.getItem('accessToken') && (
              <div>
                <LogoutModule />
              </div>
            )}
            {!localStorage.getItem('accessToken') && (
              <div>
                <Link to="/login">로그인</Link>
              </div>
            )}
          </div>
        </header>
      )}
      <Switch>
        <PrivateRoute exact path="/" component={MainPage} />
        <Route path="/login" component={Login} />
        <Route path="/oauth/callback" component={CallBack} />
        <Route path="/invite" component={Invite} />
        <Route path="/guest" component={Guest} />
        <Route path="/room/:sessionId" component={Room} />
        <PrivateRoute path="/share" component={Share} />
        <PrivateRoute path="/history/:historyId" component={HistoryDetail} />
        <PrivateRoute path="/history" component={HistoryList} />
        <PrivateRoute path="/question/:questionId" component={QnADetail} />
        <PrivateRoute path="/question" component={QnAList} />
        <PrivateRoute path="/quest" component={QnA} />
        <PrivateRoute path="/:uuid" component={MyPage} />
      </Switch>
    </div>
  );
};

export default App;
