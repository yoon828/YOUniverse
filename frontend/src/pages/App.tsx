import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../common/style/App.scss';
import MainPage from './MainPage';
import MyPage from './MyPage';
import QnA from './QnA';
import ActivateRoom from './ActivateRoom';
import HistoryList from './HistoryList';
import HistoryDetail from './HistoryDetail';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/question" element={<QnA />} />
          <Route path="/:userId" element={<MyPage />} />
          <Route path="/activateroom" element={<ActivateRoom />} />
          <Route path="/history" element={<HistoryList />} />
          <Route path="/history/:historyId" element={<HistoryDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
