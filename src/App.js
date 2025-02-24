import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './pages/Home/index';

import OriginalsPage from './pages/categories/originals/originals';
import VideosPage from './pages/categories/videos/videos';
import GenresPage from './pages/categories/genres/genres';
import PopularPage from './pages/categories/popular/popular';
import VideoSeriesPage from './pages/categories/videos/videoSeries';
import DisplayVideoPage from './pages/categories/videos/displayVideo';
import PublishVideoPage from './pages/publish/video/publishVideo';
import OriginalSeriesPage from './pages/categories/originals/originalSeries';
import DisplayOriginalPage from './pages/categories/originals/displayOriginal';
import PublishOriginalPage from './pages/publish/original/publishOriginal';
import NotFoundPage from './pages/notFoundPage';

import MyChannelPage from './pages/channel/myChannel';
import CreatorChannelPage from './pages/channel/creatorChannel'

import RegisterPage from './pages/auth/register';
import ForgotPasswordPage from './pages/auth/forgotPassword';

import AdminLoginPage from './pages/admin/login';
import AdminPage from './pages/admin/admin';
import AdminDashboardPage from './pages/admin/childAdmin/adminDashboard';
import AdminBannerPage from './pages/admin/childAdmin/adminBanner';
import AdminUsersPage from './pages/admin/childAdmin/adminUsers';
import AdminOriginalsPage from './pages/admin/childAdmin/adminOriginals';
import AdminVideosPage from './pages/admin/childAdmin/adminVideos';
import AdminPaymentsPage from './pages/admin/childAdmin/Payments';
import AdminBankPage from './pages/admin/childAdmin/adminBank';

import './App.css';
import Layout from './components/layout/layoutUser';
import Account from './pages/account/Account';
import Comment from './pages/account/Comment';
import Subscribed from './pages/account/Subscribed';
import Dashboard from './pages/account/Dashboard';
import EpisodeOriginal from './pages/account/Episode/episodeOriginal';
import EpisodeVideo from './pages/account/Episode/episodeVideo';
import Creators from './pages/account/Creators';
import DeletePage from './pages/account/Delete';
import TermsOfUse from './pages/Policys/TermsOfUse';
import PrivacyPolicy from './pages/Policys/PrivacyPolicy';
import CommunityPolicy from './pages/Policys/CommunityPolicy';
import Contact from './pages/Policys/Contact';
import About from './pages/Policys/About';
import { AuthProvider } from './Hooks/useAuth';
import Loading from './components/layout/layoutUser/loading';
import { AuthadProvider } from './Hooks/useAuthad';
import AdminOriginalsidPage from './pages/admin/childAdmin/adminOriginalsid';
import AdminOriginalsidchap from './pages/admin/childAdmin/adminOriginalsidchap';
import AdminVideosPageid from './pages/admin/childAdmin/adminVideosid';
import AdminVideosPageidchap from './pages/admin/childAdmin/adminVideosidchap';
import AdminPaymentsPageid from './pages/admin/childAdmin/Paymentsid';
import AdminAbout from './pages/admin/childAdmin/adminAbout';
import AdminTerms from './pages/admin/childAdmin/adminTerms';
import AdminPrivacy from './pages/admin/childAdmin/adminPrivacy';
import AdminAdvertise from './pages/admin/childAdmin/adminAdvertise';
import AdminContact from './pages/admin/childAdmin/adminContact';

function App() {

  useEffect(() => {
    document.title = 'Rison 입니다';
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Loading>  <HomePage /></Loading>} />

          <Route path="/originals" element={<Loading> <OriginalsPage /></Loading>} />
          <Route path="/originals/original/series/:id" element={<OriginalSeriesPage />} />

          <Route path="/videos" element={<Loading><VideosPage /></Loading>} />
          <Route path="/videos/video/series/:id" element={<VideoSeriesPage />} />

          <Route path="/genres" element={<Loading><GenresPage /></Loading>} />
          <Route path="/popular" element={<Loading><PopularPage /></Loading>} />

          <Route path="/channel/creator/:id" element={<CreatorChannelPage />} />

          {/* Trang đăng ký */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Trang quên mật khẩu */}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/Privacy" element={<PrivacyPolicy />} />
          <Route path="/Advertise" element={<CommunityPolicy />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />

        </Route>
        {/* Trang chỉ đăng nhập mới sử dụng được của user*/}
        <Route element={<AuthProvider><Layout /></AuthProvider>}>
          <Route path="/account" element={<AuthProvider><Account /> </AuthProvider>} />
          {/* Xóa tài khoản */}
          <Route path="/account/delete" element={<DeletePage />} />
          <Route path="/mycomment" element={<Comment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/original/episode" element={<EpisodeOriginal />} />
          <Route path="/dashboard/original/episode/:id" element={<EpisodeOriginal />} />
          <Route path="/dashboard/video/episode/:id" element={<EpisodeVideo />} />
          <Route path="/subscribed" element={<Subscribed />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/channel/my" element={<MyChannelPage />} />
          <Route path="/publish/original" element={<PublishOriginalPage />} />
          <Route path="/publish/original/:id" element={<PublishOriginalPage />} />
          <Route path="/publish/original/:id/:idchap" element={<PublishOriginalPage />} />

          <Route path="/publish/video" element={<PublishVideoPage />} />
          <Route path="/publish/video/:id" element={<PublishVideoPage />} />
          <Route path="/publish/video/:id/:idchap" element={<PublishVideoPage />} />

        </Route>
        {/* Trang hiển thị truyện và video */}
        <Route path="/originals/original/series/display/:id/:idseries" element={<DisplayOriginalPage />} />
        <Route path="/videos/video/series/display/:id/:idseries" element={<DisplayVideoPage />} />

        {/* Đăng nhập Admin */}
        <Route path="/admin/login"  element={<AdminLoginPage />} />

        {/* Trang hiển thị Admin */}
        <Route path="/admin" element={<AuthadProvider><AdminPage /></AuthadProvider>}>
          {/* Định tuyến mặc định cho /admin */}

          <Route index  element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="banners" element={<AdminBannerPage />} />
          <Route path="About" element={<AdminAbout />} />
          <Route path="Terms" element={<AdminTerms />} />
          <Route path="Privacy" element={<AdminPrivacy/>} />
          <Route path="Advertise" element={<AdminAdvertise/>} />
          <Route path="Contact" element={<AdminContact/>} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="originals" element={<AdminOriginalsPage />} />
          <Route path="originals/:id" element={<AdminOriginalsidPage />} />
          <Route path="originals/:id/:idchap" element={<AdminOriginalsidchap />} />

          <Route path="videos" element={<AdminVideosPage />} />
          <Route path="videos/:id" element={<AdminVideosPageid />} />
          <Route path="videos/:id/:idchap" element={<AdminVideosPageidchap />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="payments/:id" element={<AdminPaymentsPageid />} />
          <Route path="bank" element={<AdminBankPage />} />
        </Route>

        {/* Xử lý trang lỗi */}
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
