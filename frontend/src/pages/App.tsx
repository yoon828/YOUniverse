import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../common/style/App.scss';
import MainPage from './MainPage';
import MyPage from './MyPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:userId" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
