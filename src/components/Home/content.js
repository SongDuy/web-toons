import React, { useState, useEffect } from 'react';

import WeekdayOriginalsAndVideosPage from './childContent/weekdayOriginalsAndVideos';
import NewToOriginalsPage from './childContent/newToOriginals';
import NewToVideosPage from './childContent/newToVideos';
import GenresOriginalsAndVideosPage from './childContent/genresOriginalsAndVideos';
import PopularOriginalsAndVideosPage from './childContent/popularOriginalsAndVideos';

const images = [
    "https://image.baophapluat.vn/1200x630/Uploaded/2024/gznrxgmabianhgzmath/2022_05_30/doraemon-9528.jpg",
    "https://wallpapers.com/images/hd/one-piece-pictures-bjm9tdff9yzguoup.jpg",
    "https://wallpapers.com/images/featured/naruto-r5aa4v805ovp5cv4.jpg",
    "https://mrwallpaper.com/images/hd/hd-manga-fan-art-of-jojo-eyo0mcwfinazilqw.jpg",
    "https://png.pngtree.com/background/20230614/original/pngtree-anime-girl-standing-alone-in-the-street-near-some-city-lights-picture-image_3480135.jpg",
    "https://t3.ftcdn.net/jpg/06/50/89/34/360_F_650893467_s4vMfhFd8LAA2Gh5ZVVF5w1gKP6TZS82.jpg",
    "https://t3.ftcdn.net/jpg/07/48/44/58/360_F_748445857_Zpcw97p95WsnnKEPPRFRebVuGuy6hxk7.jpg",
    "https://t3.ftcdn.net/jpg/07/95/69/54/360_F_795695443_o967EZQCSMwgJ4AiGMpdBH5py4L4rA7m.jpg",
    "https://images2.alphacoders.com/740/740443.png",
    "https://static.miraheze.org/hololivewiki/8/86/Tempus_2nd_Batch_Debut_banner.webp",
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
            <div className="w-full h-[500px] bg-gradient-to-b from-green-200 via-gray-300 to-teal-400 overflow-hidden flex items-center justify-center">
                <div className="w-[1010px] h-[500px] relative">
                    <img src={images[currentImageIndex]} alt="Ad Banner" className="object-fill w-[1200px] max-h-[500px]" />
                    <div className="absolute bottom-3 left-5 right-0">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => handleImageChange(index)}
                                className={`w-[20px] h-[20px] mx-1 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-500'}`}
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
