import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../common/style/Reset.scss';

import Main from './Main';
import MyPage from './mypage/MyPage';

const App = () => {
  return (
    <div className="App">
      App
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:userId" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
