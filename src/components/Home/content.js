import React from 'react';

import WeekdayOriginalsAndVideosPage from './childContent/weekdayOriginalsAndVideos';
import NewToOriginalsPage from './childContent/newToOriginals';
import NewToVideosPage from './childContent/newToVideos';
import GenresOriginalsAndVideosPage from './childContent/genresOriginalsAndVideos';
import PopularOriginalsAndVideosPage from './childContent/popularOriginalsAndVideos';

const ContentPage = () => {

    return (
        <div className="w-full h-full bg-gray-100 mb-[50px]">

            {/* Phần hiển thị hình quảng cáo */}
            <div className="w-full h-[500px] bg-green-200">
                <img src="https://image.baophapluat.vn/1200x630/Uploaded/2024/gznrxgmabianhgzmath/2022_05_30/doraemon-9528.jpg"
                    className="object-contain w-full h-full rounded-md" alt="img"
                />
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
