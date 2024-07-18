import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom';

import HomePage from './components/layout/index';

import OriginalsPage from './components/categories/originals/originals'
import VideosPage from './components/categories/videos/videos'
import GenresPage from './components/categories/genres/genres'
import PopularPage from './components/categories/popular/popular'

import NotFoundPage from './components/layout/notFoundPage';

import './App.css';

function App() {

  useEffect(() => {
    document.title = 'Rison 입니다';
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/originals" element={<OriginalsPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/popular" element={<PopularPage />} />

        {/* Xử lý trang lỗi */}
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
