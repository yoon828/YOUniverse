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
import Room from './room/RoomPage';
import Share from './room/ShareModal';
import MyPageModule from 'modules/MyPageModule';

import { useSelector, useDispatch } from 'react-redux';
import { insertUser } from 'redux/user';
import _ from 'lodash';
import PrivateRoute from 'routes/PrivateRoute';
import { getUser } from 'api/user';
import { setApiHeaders, renewToken } from 'api/api';
import { deleteToken, renewToken as renewAccessToken } from 'redux/auth';

import { useHistory } from 'react-router-dom';
import { useMainHeader } from 'redux/mainHeader';

const App = () => {
  const expiredMsg = '만료된 JWT 토큰입니다.';
  const isLoggedIn = useSelector(
    (state) => !_.isEmpty(state.auth.value.refreshToken)
  );
  const dispatch = useDispatch();
  const isTokenExpired = (message) => {
    if (message === expiredMsg) {
      return true;
    }
    return false;
  };

  // 여기가 메인헤더
  // const useMainHeader = useMainHeader();

  const checkMainHeaderValue = useSelector(
    (state) => state.mainHeader.mainHeader
  );
  console.log(checkMainHeaderValue);
  // const checkMainHeaderValue= () => {
  //   if mainHeader
  // }

  /* 
  유저 정보 받아오는 useEffect
  콜백 지옥 그 자체.... 후에 리팩토링 하겠습니다.
  */
  useEffect(() => {
    if (isLoggedIn) {
      setApiHeaders();
      getUser()
        .then(({ data }) => {
          dispatch(insertUser(data.data));
        })
        .catch(({ response }) => {
          if (isTokenExpired(response.data.message)) {
            console.log('다시 쏘러감');
            renewToken()
              .then(({ data }) => {
                console.log(data, '드디어 갱신 성공');
                dispatch(renewAccessToken(data));
                getUser().then(({ data }) => {
                  dispatch(insertUser(data.data));
                  console.log(data);
                });
              })
              .catch(({ response }) => {
                console.log(response);
                if (response.data.msg === expiredMsg) {
                  dispatch(deleteToken());
                }
              });
          }
          console.log('에러발생: ', response);
        });
      console.log('로그인상태입니다.');
    } else {
      console.log('로그아웃상태입니다.');
    }
  }, [isLoggedIn, dispatch]);

  return (
    <div className="App">
      {checkMainHeaderValue && (
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
        <PrivateRoute path="/history/:historyId" component={HistoryDetail} />
        <PrivateRoute path="/history" component={HistoryList} />
        <PrivateRoute path="/questionlist" component={QnAList} />
        <PrivateRoute path="/question" component={QnA} />
        <PrivateRoute path="/share" component={Share} />
        <PrivateRoute path="/:uuid" component={MyPage} />
      </Switch>
    </div>
  );
};

export default App;
