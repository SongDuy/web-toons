import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './components/layout/index';

//import './App.css';

function App() {

  useEffect(() => {
    document.title = 'WEBTOON';
  }, []);

  return (
    <BrowserRouter>
      <Routes>

      <Route path="/" element={<HomePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
