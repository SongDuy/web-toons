import React, { useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Link } from 'react-router-dom';

const NewToVideosPage = () => {

    const dataVideos = [
        { id: 1, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 2, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 3, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Animals", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 4, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Comedy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 5, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Mon', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 6, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Tue', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 7, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Tue', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 8, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 9, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 10, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "School", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 11, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 12, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Wed', genre: "Historical", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 13, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 14, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 15, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 16, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Thu', genre: "Action", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 17, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 18, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 19, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 20, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 21, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 22, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Fri', genre: "Fantasy", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 23, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 24, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 25, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Fri', genre: "Fantasy", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 26, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 27, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 28, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Sat', genre: "Fantasy", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 29, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 30, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 31, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Sun', genre: "Fantasy", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 32, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 33, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 34, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Sun', genre: "Fantasy", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 35, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    ];

    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <div className="w-full min-h-[560px]">
            <div className="w-full h-[60px] bg-white shadow flex items-center justify-center">
                <ul
                    className="flex"
                >
                    <li
                        className="w-full h-[60px] uppercase font-semibold text-lg hover:text-yellow-500 cursor-pointer flex items-center justify-center"
                    >
                        New to Videos
                    </li>

                </ul>
            </div>
            <div className="w-full min-h-[500px] py-[30px] flex justify-center">
                <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-4">
                    {/* khung nội dung */}
                    {dataVideos.slice(0, 10).map((item) => (
                        <Link to={`/videos/video/series`} className="max-w-[210px] h-[210px]" >
                            <li
                                key={item.id}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className="max-w-[210px] 2xl:w-[210px] h-[210px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                            >

                                <div className="w-full h-full" >
                                    <img
                                        src={item.img}
                                        alt="img"
                                        className="object-fill w-full h-full rounded-md"
                                    />

                                    {hoveredItem === item.id && (
                                        // <div className="absolute inset-0 bg-black bg-opacity-30 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                        //     <PlayArrowIcon sx={{ fontSize: 60 }} />
                                        // </div>

                                        <div class="absolute inset-0  flex items-center justify-center text-yellow-500 z-10">
                                            <img
                                                src={item.img}
                                                alt="img"
                                                class="object-fill w-full h-full rounded-md"
                                            />
                                            <div className="absolute w-full h-full flex items-center justify-center border-4 border-yellow-500 rounded-md">
                                                <PlayArrowIcon sx={{ fontSize: 60 }} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="w-full absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                    <div className="w-full h-[65px] mb-auto overflow-hidden">
                                        <span className="text-black text-lg font-semibold leading-[1.2] line-clamp-2">
                                            {item.name}
                                        </span>
                                        <span className="text-black text-md leading-[1.2] line-clamp-1">
                                            {item.auth}
                                        </span>
                                    </div>

                                    <div className="w-full mb-[25px]">
                                        <span className="w-[75px] text-rose-300 rounded-full px-1 text-sm font-semibold flex items-center gap-1">
                                            <FavoriteIcon />
                                            {item.like}
                                        </span>
                                        <span className="w-[35px] h-[35px] mt-2 uppercase bg-gradient-to-t from-gray-500 via-black to-black text-white font-semibold text-xs rounded-full flex items-center justify-center">
                                            New
                                        </span>
                                    </div>

                                    <div className="w-full h-[30px] shadow bg-gray-300 bg-opacity-80 rounded-md">
                                        <span className="w-full px-2 py-1 text-white text-sm font-semibold shadow-xl flex items-center justify-center rounded-md">
                                            {item.genre}
                                        </span>
                                    </div>
                                </div>

                            </li>
                        </Link>
                    ))}

                </ul>
            </div>
        </div>
    );
}

export default NewToVideosPage;
