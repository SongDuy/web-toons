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
    "https://i.pinimg.com/originals/52/83/59/5283594dd6b1d0dd4b8a59c723a35024.gif",
    "https://i.pinimg.com/originals/ef/7f/b1/ef7fb1b37078b6a2aef8e40710446bfa.jpg",
    "https://i.redd.it/b5jec682hfk61.jpg",
    "https://images.hdqwalls.com/download/alone-standing-at-roof-ff-1920x1080.jpg",
    "https://i.pinimg.com/originals/d2/ab/0f/d2ab0fe55a5ada215f7ef187c7a8677f.gif",
    "https://i.pinimg.com/originals/82/bb/bf/82bbbffb0ee24320a2d8c4e7a35e9ea3.jpg",
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
   
    return (
        <div className="w-full h-full bg-gray-100 pb-10">
   
            {/* Phần hiển thị hình quảng cáo */}
            <div className="w-full h-[500px] bg-gradient-to-b from-white via-yellow-100 to-green-100 overflow-hidden flex items-center justify-center">
                <div className="max-w-[1120px] max-h-[500px] relative cursor-pointer">
                    <img
                        src={images[currentImageIndex]}
                        alt="Ad Banner"
                        className="object-cover w-[1120px] max-h-[500px]"
                    />

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
            {/* <PopularOriginalsAndVideosPage /> */}

        </div >
    );
}

export default ContentPage;
