import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom';

import HomePage from './pages/Home/index';

import OriginalsPage from './pages/categories/originals/originals'
import VideosPage from './pages/categories/videos/videos'
import GenresPage from './pages/categories/genres/genres'
import PopularPage from './pages/categories/popular/popular'

import NotFoundPage from './pages/notFoundPage';

import './App.css';
import Layout from './components/layout/layoutUser';
import Account from './pages/account/Account';
import Comment from './pages/account/Comment';
import Subscribed from './pages/account/Subscribed';
import Creators from './pages/account/Creators';
import TermsOfUse from './pages/Policys/TermsOfUse';
import PrivacyPolicy from './pages/Policys/PrivacyPolicy';
import CommunityPolicy from './pages/Policys/CommunityPolicy';
import CanvasTermsOfUse from './pages/Policys/CanvasTermsOfUse';
import AdRevenueSharingTerms from './pages/Policys/AdRevenueSharingTerms';
import SuperLikeTerms from './pages/Policys/SuperLikeTerms';
import OriginalSeriesPage from './pages/categories/originals/originalSeries';
import DisplayOriginalPage from './pages/categories/originals/displayOriginal';
import VideoSeriesPage from './pages/categories/videos/videoSeries';
import DisplayVideoPage from './pages/categories/videos/displayVideo';
import CreateVideoPage from './pages/create/createVideo';
import CreateOriginalPage from './pages/create/createOriginal';
function App() {

  useEffect(() => {
    document.title = 'Rison 입니다';
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage />} />

        
        <Route path="/originals" element={<OriginalsPage />} />
        <Route path="/original/series" element={<OriginalSeriesPage/>} />
        <Route path="/video/series/display" element={<DisplayVideoPage/>} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/video/series" element={<VideoSeriesPage/>} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/creact/original" element={<CreateOriginalPage/>} />
        <Route path="/cearct/video" element={<CreateVideoPage/>} />
        <Route path="/account" element={<Account/>}/>
        <Route path="/comment" element={<Comment/>}/>
        <Route path="/Subscribed" element={<Subscribed/>}/>
        <Route path="/Creators" element={<Creators/>}/>
        <Route path="/terms" element={<TermsOfUse/>}/>
        <Route path="/terms/privacyPolicy" element={<PrivacyPolicy/>}/>
        <Route path="/terms/canvasPolicy" element={<CommunityPolicy/>}/>
        <Route path="/terms/canvasTermsOfUsePolicy" element={<CanvasTermsOfUse/>}/>
        <Route path="/terms/adRevenueSharingPolicy" element={<AdRevenueSharingTerms/>}/>
        <Route path="/terms/superLikePolicy" element={<SuperLikeTerms/>}/>

        </Route>
        <Route path="/original/series/display" element={<DisplayOriginalPage/>} />

        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
