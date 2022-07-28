import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import '../common/style/Reset.scss';
import '../common/style/all.scss';
import '../common/style/app.scss';
import MainPage from './MainPage';
import Login from './enter/LoginPage';
import Guest from './enter/GuestPage';
import Invite from './enter/InvitePage';
import CallBack from './enter/CallBackPage';
import MyPage from './mypage/MyPage';
import HistoryList from './mypage/HistoryList';
import HistoryDetail from './mypage/HistoryDetail';
import QnA from './mypage/QnAPage';
import QnAList from './mypage/QnAList';
import Share from './room/SharePage';

const App = () => {
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
            <Link to="/login">로그아웃은 아직</Link>
          </div>
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={Login} />
        <Route path="/invite" component={Invite} />
        <Route path="/guest" component={Guest} />
        <Route path="/history/:historyId" component={HistoryDetail} />
        <Route path="/history" component={HistoryList} />
        <Route path="/questionlist" component={QnAList} />
        <Route path="/question" component={QnA} />
        <Route path="/share" component={Share} />
        <Route path="/oauth/callback" component={CallBack} />
        <Route path="/:userId" component={MyPage} />
      </Switch>
    </div>
  );
};

export default App;
