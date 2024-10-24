import React, { useState, useEffect } from 'react';

import WeekdayOriginalsAndVideosPage from './childContent/weekdayOriginalsAndVideos';
import NewToOriginalsPage from './childContent/newToOriginals';
import NewToVideosPage from './childContent/newToVideos';
import GenresOriginalsAndVideosPage from './childContent/genresOriginalsAndVideos';
import PopularOriginalsAndVideosPage from './childContent/popularOriginalsAndVideos';
import bannerFireBase from '../../common/services/Banner.services';
import CircularProgress from "@mui/material/CircularProgress";

const ContentPage = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(1); // Ảnh nền ban đầu
  const [resetTimer, setResetTimer] = useState(false);

  let timeInterval = resetTimer ? 10000 : 5000; // 10 giây nếu chọn ảnh, 5 giây cho chuyển ảnh tự động
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState([]);

  // Lấy dữ liệu banner từ Firebase
  useEffect(() => {
    const get = async () => {
      try {
        setLoading(false);
        const banners = await bannerFireBase.getAll();
        setBanner(banners.success ? banners.banner : []);
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    };
    get();
  }, []);

  // Tự động chuyển ảnh chính mỗi 5 hoặc 10 giây
  useEffect(() => {
    const interval = setInterval(() => {
      if (!resetTimer) {
        setCurrentImageIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % banner?.length;

          // Khi quay lại ảnh đầu tiên, cập nhật ảnh nền
          if (newIndex === 0) {
            setBackgroundImageIndex((prevBackgroundIndex) => (prevBackgroundIndex + 1) % banner.length);
          }

          return newIndex;
        });
      }
    }, timeInterval);

    return () => clearInterval(interval);
  }, [timeInterval, resetTimer, banner]);

  // Chọn ảnh và thiết lập lại thời gian chờ
  const handleImageChange = (index) => {
    setResetTimer(true);
    setCurrentImageIndex(index);

    // Đặt lại resetTimer sau 10 giây
    setTimeout(() => {
      setResetTimer(false);
    }, 10000);
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-full bg-gray-100 pb-10">

          {/* Phần hiển thị hình quảng cáo */}
          <div className="w-full h-auto overflow-hidden flex items-center justify-center">
            {/* Ảnh nền là ảnh tiếp theo */}
            {banner.length > 0 && (
              <img
                src={banner[backgroundImageIndex]?.image} // Ảnh nền chỉ thay đổi sau khi toàn bộ ảnh chính được hiển thị
                alt="Ad Banner0"
                className="w-full max-h-[500px] absolute object-cover opacity-50"
              />
            )}

            <div className="relative max-w-[1120px] max-h-[500px]">
              {/* Ảnh chính */}
              {banner.length > 0 && (
                <img
                  src={banner[currentImageIndex]?.image}
                  alt="Ad Banner1"
                  className="w-[1120px] max-h-[500px] object-cover"
                />
              )}

              {/* Nút chuyển ảnh */}
              <div className="absolute bottom-3 left-5 right-0 flex items-center">
                {banner.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`w-[15px] h-[15px] mx-1 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-500'}`}
                  />
                ))}
              </div>
            </div>
          </div>


          {/* Phần hiển thị nội dung theo thứ trong tuần */}
          <WeekdayOriginalsAndVideosPage />

          {/* Phần hiển thị các series truyện mới */}
          <NewToOriginalsPage />

          {/* Phần hiển thị các series video mới */}
          <NewToVideosPage />

          {/* Phần hiển thị các series truyện và video theo thể loại mới */}
          <GenresOriginalsAndVideosPage />

          {/* Phần hiển thị các series truyện và video phổ biến*/}
          <PopularOriginalsAndVideosPage />

        </div >
      ) : (
        <div className="w-full h-[48vh] flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default ContentPage;
