import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom';

import HomePage from './components/layout/index';

import OriginalsPage from './components/categories/originals/originals'
import OriginalSeriesPage from './components/categories/originals/originalSeries';
import DisplayOriginalPage from './components/categories/originals/displayOriginal';
import VideosPage from './components/categories/videos/videos'
import VideoSeriesPage from './components/categories/videos/videoSeries';
import DisplayVideoPage from './components/categories/videos/displayVideo';
import GenresPage from './components/categories/genres/genres'
import PopularPage from './components/categories/popular/popular'

import CreateOriginalPage from './components/create/createOriginal';
import CreateVideoPage from './components/create/createVideo';

import NotFoundPage from './components/layout/notFoundPage';

//import './App.css';

function App() {

  useEffect(() => {
    document.title = 'Rison 입니다';
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/originals" element={<OriginalsPage />} />
        <Route path="/original/series" element={<OriginalSeriesPage />} />
        <Route path="/original/series/display" element={<DisplayOriginalPage />} />

        <Route path="/videos" element={<VideosPage />} />
        <Route path="/video/series" element={<VideoSeriesPage/>} />
        <Route path="/video/series/display" element={<DisplayVideoPage />} />

        <Route path="/genres" element={<GenresPage />} />

        <Route path="/popular" element={<PopularPage />} />

        <Route path="/creact/original" element={<CreateOriginalPage />} />
        <Route path="/cearct/video" element={<CreateVideoPage />} />

        {/* Xử lý trang lỗi */}
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
