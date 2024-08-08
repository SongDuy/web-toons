import React, { useState, useEffect } from 'react';

import WeekdayOriginalsAndVideosPage from './childContent/weekdayOriginalsAndVideos';
import NewToOriginalsPage from './childContent/newToOriginals';
import NewToVideosPage from './childContent/newToVideos';
import GenresOriginalsAndVideosPage from './childContent/genresOriginalsAndVideos';
import PopularOriginalsAndVideosPage from './childContent/popularOriginalsAndVideos';

const images = [
    "https://image.baophapluat.vn/1200x630/Uploaded/2024/gznrxgmabianhgzmath/2022_05_30/doraemon-9528.jpg",
    "https://wallpapers.com/images/hd/one-piece-pictures-bjm9tdff9yzguoup.jpg",
    "https://wallpapers.com/images/featured/naruto-r5aa4v805ovp5cv4.jpg"
];

const ContentPage = () => {

    // đổi hình quảng cáo sau 5 giây
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleImageChange = (index) => {
        setCurrentImageIndex(index);
    };

    //new

    return (
        <div className="w-full h-full bg-gray-100 pb-10">

            {/* Phần hiển thị hình quảng cáo */}
            <div className="w-full max-h-[500px] bg-green-200 overflow-hidden rounded-md relative">
                <img src={images[currentImageIndex]} alt="Ad Banner" className="object-contain w-full max-h-[500px] rounded-md" />
                <div className="absolute bottom-4 left-0 right-0">
                    {images.map((image, index) => (
                        <button key={index} onClick={() => handleImageChange(index)} className={`px-4 py-2 bg-blue-500 text-white rounded-md ${index === currentImageIndex ? 'font-bold' : ''}`}>{`Image ${index + 1}`}</button>
                    ))}
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
