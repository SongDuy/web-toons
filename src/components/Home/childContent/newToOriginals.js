import React, { useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const NewToOriginalsPage = () => {
    const comic = useSelector(state => state.comic.comic);
    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredItem, setHoveredItem] = useState(null);

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);
    
    return (
        <div className="w-full min-h-[560px]">
            <div className="w-full h-[60px] bg-white shadow flex items-center justify-center">
                <ul
                    className="flex"
                >
                    <li
                        className="w-full h-[60px] uppercase font-semibold text-lg hover:text-yellow-500 cursor-pointer flex items-center justify-center"
                    >
                        {!language ?
                            <span>
                                New to Originals
                            </span>
                            :
                            <span>

                                오리지널의 새로운 기능
                            </span>
                        }

                    </li>

                </ul>
            </div>
            <div className="w-full min-h-[500px] py-[30px] flex justify-center">
                <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-4">
                    {/* khung nội dung */}
                    {comic.comic?.slice(0, 10)?.map((item) => (
                        <Link
                            key={item.id}
                            to={`/originals/original/series/${item.id}`}
                            className="max-w-[210px] h-[210px]"
                        >
                            <li
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className="max-w-[210px] 2xl:w-[210px] h-[210px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                            >

                                <div className="w-full h-full" >
                                    <img
                                        src={item.squareThumbnail}
                                        alt="img"
                                        className="object-fill w-full h-full rounded-md"
                                    />

                                    {hoveredItem === item.id && (
                                        <div className="absolute inset-0 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                            <AutoStoriesIcon sx={{ fontSize: 40 }} />
                                        </div>
                                    )}
                                </div>

                                <div className="w-full absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                    <div className="w-full h-[65px] mb-auto overflow-hidden">
                                        <span className="text-black text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                            {item.title}
                                        </span>
                                        <span className="text-black text-md text-shadow-white leading-[1.2] line-clamp-1">
                                            {item.summary}
                                        </span>
                                    </div>

                                    <div className="w-full mb-[20px]">
                                        <span className="w-[75px] text-rose-300 rounded-full text-sm font-semibold flex items-center gap-1">
                                            <FavoriteIcon />
                                            {item.like}
                                        </span>
                                        <span className="w-[35px] h-[35px] mt-2 uppercase bg-gradient-to-t from-gray-500 via-black to-black text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                            New
                                        </span>
                                    </div>

                                    <div className="w-full h-[30px] mt-auto shadow-xl bg-white bg-opacity-80 rounded-md">
                                        <span className="w-full px-2 py-1 text-black text-sm font-semibold shadow-xl flex items-center justify-center rounded-md">
                                            {item.genre1}
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
