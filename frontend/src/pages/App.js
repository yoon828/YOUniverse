/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

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
import AdminPage from './admin/AdminPage';
import AdminUserPage from './admin/AdminUserPage';
import AdminQaPage from './admin/AdminQaPage';
import AdminQaDetailPage from './admin/AdminQaDetailPage';
import NotFound from './NotFoundPage';

import { getUser } from 'api/user';
import PrivateRoute from 'routes/PrivateRoute';
import { isTokenExpired } from 'common/functions/functions';

import { getAdmin } from 'api/admin';

import '../common/style/app.scss';

const App = () => {
  const [isAdmin, setisAdmin] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const uuid = useSelector((state) => state.user.value.uuid);
  const dispatch = useDispatch();

  const checkMainHeaderValue = useSelector(
    (state) => state.mainHeader.mainHeader
  );

  useEffect(() => {
    if (isLoggedIn && !uuid) {
      getUser()
        .then(({ data }) => {
          dispatch(insertUser(data.data));
        })
        .catch(({ response }) => {
          if (isTokenExpired(response.data.message)) {
            window.alert('인증 시간이 만료되어 로그아웃됩니다.');
            dispatch(logout());
          } else {
            alert('에러가 발생하였습니다..ㅜㅜ');
          }
        });
    }
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    if (uuid) {
      await getAdmin(uuid)
        .then(({ data }) => {
          setisAdmin(data.data);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="App">
      {checkMainHeaderValue && (
        <header className="main_header">
          <div className="main_header_logo">
            <Link to="/">
              <img src="/asset/img/logo_header.png" alt="logo" />
            </Link>
          </div>
          <div className="main_header_menu">
            <div>
              <Link to="/share">SPACE 생성</Link>
            </div>
            <div>
              <Link to="/quest">1대1 문의</Link>
            </div>
            <div>
              <MyPageModule />
            </div>
            {isAdmin ? (
              <div>
                <Link to="/admin">관리자페이지</Link>
              </div>
            ) : null}
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
        <PrivateRoute exact path="/" component={MainPage} restricted={false} />
        <Route exact path="/login" component={Login} restricted={true} />
        <Route
          exact
          path="/oauth/callback"
          component={CallBack}
          restricted={false}
        />
        <Route exact path="/invite" component={Invite} restricted={false} />
        <Route exact path="/guest" component={Guest} restricted={false} />
        <Route exact path="/room" component={Room} restricted={false} />
        <PrivateRoute
          exact
          path="/admin"
          component={AdminPage}
          restricted={false}
        />
        <PrivateRoute
          exact
          path="/admin/users"
          component={AdminUserPage}
          restricted={false}
        />
        <PrivateRoute
          exact
          path="/admin/qa/:questionId"
          component={AdminQaDetailPage}
          restricted={false}
        />
        <PrivateRoute
          exact
          path="/admin/qa"
          component={AdminQaPage}
          restricted={false}
        />
        <PrivateRoute
          exact
          path="/share"
          component={Share}
          restricted={false}
        />
        <PrivateRoute
          exact
          path="/history/:historyId"
          component={HistoryDetail}
          restricted={false}
        />
        <PrivateRoute
          exact
          path="/history"
          component={HistoryList}
          restricted={false}
        />
        <PrivateRoute
          exact
          path="/question/:questionId"
          component={QnADetail}
          restricted={false}
        />
        <PrivateRoute
          exact
          path="/question"
          component={QnAList}
          restricted={false}
        />
        <PrivateRoute exact path="/quest" component={QnA} restricted={false} />
        <PrivateRoute
          exact
          path="/:uuid"
          component={MyPage}
          restricted={false}
        />
        <Route path="/*" component={NotFound} restricted={false} />
      </Switch>
    </div>
  );
};

export default App;
