import React, { useState, useEffect } from 'react';

import WeekdayOriginalsAndVideosPage from './childContent/weekdayOriginalsAndVideos';
import NewToOriginalsPage from './childContent/newToOriginals';
import NewToVideosPage from './childContent/newToVideos';
import GenresOriginalsAndVideosPage from './childContent/genresOriginalsAndVideos';
import PopularOriginalsAndVideosPage from './childContent/popularOriginalsAndVideos';

const images = [
    "https://image.baophapluat.vn/1200x630/Uploaded/2024/gznrxgmabianhgzmath/2022_05_30/doraemon-9528.jpg",
    "https://wallpapers.com/images/hd/one-piece-pictures-bjm9tdff9yzguoup.jpg",
    "https://i.redd.it/5mqp7trvxov51.jpg",
    "https://images.alphacoders.com/135/1353040.jpeg",
    "https://wallpapergod.com/images/hd/anime-4k-5760X3240-wallpaper-par00nk6228xf5xm.jpeg",
    "https://wallpapers.com/images/featured/anime-aesthetic-pictures-lqtumoq8zq18qvfs.jpg",
    "https://images.hdqwalls.com/download/after-sunset-minimal-4k-zm-1920x1080.jpg",
    "https://i.redd.it/b5jec682hfk61.jpg",
    "https://images.hdqwalls.com/download/alone-standing-at-roof-ff-1920x1080.jpg",
    "https://static.miraheze.org/hololivewiki/8/86/Tempus_2nd_Batch_Debut_banner.webp",
    "https://w.wallha.com/ws/13/ypDeq3JB.jpg",
    "https://4kwallpapers.com/images/wallpapers/anime-girl-surreal-1920x1080-10028.jpg",
];

const ContentPage = () => {

    // Đổi hình quảng cáo sau 5 giây khi chọn ảnh thì 10 giây chuyển tiếp
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [resetTimer, setResetTimer] = useState(false);
    var timeInterval = 5000; // 5 giây

    useEffect(() => {
        const interval = setInterval(() => {
            if (!resetTimer) {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            }
        }, timeInterval);

        return () => clearInterval(interval);
    }, [timeInterval, resetTimer]);

    const handleImageChange = (index) => {
        // Reset the timer
        setResetTimer(true);
        setCurrentImageIndex(index);

        // Start the interval again after 5 seconds
        setTimeout(() => {
            setResetTimer(false);
        }, timeInterval);
    };

    //new

    return (
        <div className="w-full h-full bg-gray-100 pb-10">

            {/* Phần hiển thị hình quảng cáo */}
            <div className="w-full h-[500px] bg-gradient-to-b from-white via-white to-green-100 overflow-hidden flex items-center justify-center">
                <div className="w-[1000px] h-[500px] relative">
                    <img src={images[currentImageIndex]} alt="Ad Banner" className="object-fill w-[1200px] max-h-[500px]" />
                    <div className="absolute bottom-3 left-5 right-0 flex items-center">
                        {images.map((image, index) => (
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
    );
}

export default ContentPage;
