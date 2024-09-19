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
import AdminCategoriesPage from './pages/admin/childAdmin/adminCategories';
import AdminOriginalsPage from './pages/admin/childAdmin/adminOriginals';
import AdminVideosPage from './pages/admin/childAdmin/adminVideos';
import AdminReportsPage from './pages/admin/childAdmin/adminReports';
import AdminPaymentsPage from './pages/admin/childAdmin/Payments';
import AdminNotificationsPage from './pages/admin/childAdmin/adminNotifications';
import AdminCensorsPage from './pages/admin/childAdmin/adminCensors';

import './App.css';
import Layout from './components/layout/layoutUser';
import Account from './pages/account/Account';
import Comment from './pages/account/Comment';
import Subscribed from './pages/account/Subscribed';
import Creators from './pages/account/Creators';
import DeletePage from './pages/account/Delete';
import PaymentPage from './pages/payment/index';
import PaymentInformationPage from './pages/payment/paymentInformation';
import TermsOfUse from './pages/Policys/TermsOfUse';
import PrivacyPolicy from './pages/Policys/PrivacyPolicy';
import CommunityPolicy from './pages/Policys/CommunityPolicy';
import CanvasTermsOfUse from './pages/Policys/CanvasTermsOfUse';
import AdRevenueSharingTerms from './pages/Policys/AdRevenueSharingTerms';
import SuperLikeTerms from './pages/Policys/SuperLikeTerms';
import { AuthProvider } from './Hooks/useAuth';
import Loading from './components/layout/layoutUser/loading';
import { AuthadProvider } from './Hooks/useAuthad';

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
          <Route path="/popular" element={<PopularPage />} />

      

          <Route path="/channel/creator/:id" element={<CreatorChannelPage />} />

          {/* Trang thanh toán */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/information" element={<PaymentInformationPage />} />

          {/* Trang đăng ký */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Trang quên mật khẩu */}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/terms/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/terms/canvasPolicy" element={<CommunityPolicy />} />
          <Route path="/terms/canvasTermsOfUsePolicy" element={<CanvasTermsOfUse />} />
          <Route path="/terms/adRevenueSharingPolicy" element={<AdRevenueSharingTerms />} />
          <Route path="/terms/superLikePolicy" element={<SuperLikeTerms />} />

        </Route>
        {/* Trang chỉ đăng nhập mới sử dụng được của user*/}
        <Route element={<AuthProvider><Layout /></AuthProvider>}>
          <Route path="/account" element={<AuthProvider><Account /> </AuthProvider>} />
          {/* Xóa tài khoản */}
          <Route path="/account/delete" element={<DeletePage />} />
          <Route path="/mycomment" element={<Comment />} />
          <Route path="/subscribed" element={<Subscribed />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/channel/my" element={<MyChannelPage />} />
          <Route path="/publish/original" element={<PublishOriginalPage />} />
          <Route path="/publish/original/:id" element={<PublishOriginalPage />} />
          <Route path="/publish/video" element={<PublishVideoPage />} />
          <Route path="/publish/video/:id" element={<PublishVideoPage />} />

        </Route>
        {/* Trang hiển thị truyện và video */}
        <Route path="/originals/original/series/display/:id/:idseries" element={<DisplayOriginalPage />} />
        <Route path="/videos/video/series/display" element={<DisplayVideoPage />} />

        {/* Đăng nhập Admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Trang hiển thị Admin */}
        <Route path="/admin" element={<AuthadProvider><AdminPage /></AuthadProvider>}>
          {/* Định tuyến mặc định cho /admin */}
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="banners" element={<AdminBannerPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="originals" element={<AdminOriginalsPage />} />
          <Route path="videos" element={<AdminVideosPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
          <Route path="censors" element={<AdminCensorsPage />} />
        </Route>

        {/* Xử lý trang lỗi */}
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
