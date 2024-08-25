import React, { useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import { Link } from 'react-router-dom';

const NewToOriginalsPage = () => {

    const dataOriginals = [
        { id: 1, img: "https://i.pinimg.com/736x/44/d5/c7/44d5c7ec2369524788d06b01027b9b7e.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 2, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 3, img: "https://i.pinimg.com/originals/1d/de/ab/1ddeabd0300a42b1c873a2e5fba59209.jpg", dayOfWeek: 'Mon', genre: "Animals", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 4, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Mon', genre: "Comedy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 5, img: "https://i.pinimg.com/originals/79/f5/f5/79f5f56085a73b1db28b8eb9751796fd.jpg", dayOfWeek: 'Mon', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 6, img: "https://i.pinimg.com/736x/ff/85/15/ff851573b6e77758a1a0441ed5009103.jpg", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 7, img: "https://wallpapercave.com/wp/wp5102463.jpg", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 8, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 9, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 10, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Tue', genre: "School", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
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
                        New to Originals
                    </li>

                </ul>
            </div>
            <div className="w-full min-h-[500px] py-[30px] flex justify-center">
                <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-4">
                    {/* khung nội dung */}
                    {dataOriginals.slice(0, 10).map((item) => (
                        <Link to={`/originals/original/series`} className="max-w-[210px] h-[210px]" >
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
                                        //     <AutoStoriesIcon sx={{ fontSize: 40 }} />
                                        // </div>

                                        <div class="absolute inset-0  flex items-center justify-center text-yellow-500 z-10">
                                            <img
                                                src={item.img}
                                                alt="img"
                                                class="object-fill w-full h-full rounded-md"
                                            />
                                            <div className="absolute w-full h-full flex items-center justify-center border-4 border-yellow-500 rounded-md">
                                                <AutoStoriesIcon sx={{ fontSize: 40 }} />
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
                                        <span className="w-[75px] text-rose-300 rounded-full text-sm font-semibold flex items-center gap-1">
                                            <FavoriteIcon />
                                            {item.like}
                                        </span>
                                        <span className="w-[35px] h-[35px] mt-2 uppercase bg-gradient-to-t from-gray-500 via-black to-black text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                            New
                                        </span>
                                    </div>

                                    <div className="w-full h-[30px] shadow-xl bg-white bg-opacity-80 rounded-md">
                                        <span className="w-full px-2 py-1 text-black text-sm font-semibold shadow-xl flex items-center justify-center rounded-md">
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

export default NewToOriginalsPage;
