import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../common/style/App.scss';
import MainPage from './MainPage';
import MyPage from './MyPage';
import QnA from './QnA';
import ActivateRoom from './ActivateRoom';
import HistoryList from './HistoryList';
import HistoryDetail from './HistoryDetail';
import Login from './Login';
import Guest from './Guest';
import Invite from './Invite';

const App = () => {
  return (
    <div className="App">
      <header className="MainHeader">
        <div className="MainLogo">
          <a href="/">
            <img
              src="https://blog.kakaocdn.net/dn/be0xab/btrHTW8GtRk/LDOhwqWEBUDFkVh1S5aNv0/img.png"
              alt="logo"
            />
          </a>
        </div>
        <div className="MainMenu">
          <div>
            <a href="/activateroom">쉐어룸</a>
          </div>
          <div>
            <a href="/question">1:1문의없어지나요</a>
          </div>
          <div>
            <a href="/:userId">마이페이지</a>
          </div>
          <div>
            <a href="/login">로그아웃은 아직</a>
          </div>
        </div>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/question" element={<QnA />} />
          <Route path="/:userId" element={<MyPage />} />
          <Route path="/activateroom" element={<ActivateRoom />} />
          <Route path="/history" element={<HistoryList />} />
          <Route path="/history/:historyId" element={<HistoryDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/guest" element={<Guest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
