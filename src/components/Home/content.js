import React, { useState, useEffect } from 'react';

import WeekdayOriginalsAndVideosPage from './childContent/weekdayOriginalsAndVideos';
import NewToOriginalsPage from './childContent/newToOriginals';
import NewToVideosPage from './childContent/newToVideos';
import GenresOriginalsAndVideosPage from './childContent/genresOriginalsAndVideos';
import PopularOriginalsAndVideosPage from './childContent/popularOriginalsAndVideos';
import bannerFireBase from '../../common/services/Banner.services';
import CircularProgress from "@mui/material/CircularProgress";

const ContentPage = () => {

  // Đổi hình quảng cáo sau 5 giây khi chọn ảnh thì 10 giây chuyển tiếp
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);

  var timeInterval = 5000; // 5 giây
  const [loading, setloading] = useState(true);
  const [banner, setbanner] = useState([]);
  useEffect(() => {
    const get = async () => {
      try {
        setloading(false);
        const banners = await bannerFireBase.getAll();
        setbanner(banners.success ? banners.banner : []);
        setloading(true);
      } catch (error) { }
    };
    get();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!resetTimer) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % banner?.length);
      }
    }, timeInterval);

    return () => clearInterval(interval);
  }, [timeInterval, resetTimer, banner]);

  const handleImageChange = (index) => {
    // Reset the timer
    setResetTimer(true);
    setCurrentImageIndex(index);

    // Start the interval again after 5 seconds
    setTimeout(() => {
      setResetTimer(false);
    }, timeInterval);
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
                src={banner[(currentImageIndex + 1) % banner.length]?.image} // Lấy ảnh tiếp theo
                alt="Ad Banner0"
                className="w-full max-h-[500px] absolute object-cover opacity-50 z-0" // Đảm bảo ảnh nền có độ mờ
              />
            )}

            <div className="relative max-w-[1120px] max-h-[500px] cursor-pointer z-10">
              {/* Ảnh chính */}
              {banner.length > 0 && (
                <img
                  src={banner[currentImageIndex]?.image}
                  alt="Ad Banner1"
                  className="w-[1120px] max-h-[500px] object-cover "
                />
              )}

              {/* Nút chuyển ảnh */}
              <div className="absolute bottom-3 left-5 right-0 flex items-center z-20">
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
        <div className="w-full h-[370px] flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default ContentPage;
