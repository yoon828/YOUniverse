import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './common/style/App.scss';
import MainPage from './MainPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
