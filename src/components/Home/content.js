import React, { useState, useEffect } from 'react';

import WeekdayOriginalsAndVideosPage from './childContent/weekdayOriginalsAndVideos';
import NewToOriginalsPage from './childContent/newToOriginals';
import NewToVideosPage from './childContent/newToVideos';
import GenresOriginalsAndVideosPage from './childContent/genresOriginalsAndVideos';
import PopularOriginalsAndVideosPage from './childContent/popularOriginalsAndVideos';
import bannerFireBase from '../../common/services/Banner.services';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
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
      {!loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
          }}
        >
          <div className="h-[580px] flex items-center justify-center">
            <CircularProgress />
          </div>
        </Box>
      ) :
        <div className="w-full h-full bg-gray-100 pb-10">

          {/* Phần hiển thị hình quảng cáo */}
          <div className="w-full h-auto bg-gradient-to-b from-white via-yellow-100 to-green-200 overflow-hidden flex items-center justify-center">
            <div className="max-w-[1120px] max-h-[500px] relative cursor-pointer">
              <img
                src={banner[currentImageIndex]?.image}
                alt="Ad Banner"
                className="object-cover w-[1120px] max-h-[500px]"
              />

              <div className="absolute bottom-3 left-5 right-0 flex items-center">
                {banner?.map((image, index) => (
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
      }
    </>
  );
}

export default ContentPage;
