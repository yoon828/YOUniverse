import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../common/style/App.scss';

import MainPage from './MainPage';
import MyPage from './MyPage';
import QnA from './QnA';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:userId" element={<MyPage />} />
          <Route path="/question" element={<QnA />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
