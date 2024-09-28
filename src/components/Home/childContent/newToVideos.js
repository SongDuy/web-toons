import React, { useState } from 'react';

//import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const NewToVideosPage = () => {
    const Video = useSelector(state => state.Video.video);

    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredVideoItem, setHoveredVideoItem] = useState(null);

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
                                New to Videos
                            </span>
                            :
                            <span>
                                동영상의 새로운 기능
                            </span>
                        }

                    </li>

                </ul>
            </div>
            <div className="w-full min-h-[500px] py-[30px] flex justify-center">
                <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-4">
                    {/* khung nội dung */}
                    {Video?.Video?.slice()?.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))?.slice(0, 10)?.map((item) => (
                        <Link
                            key={item.id}
                            to={`/videos/video/series/${item.id}`}
                            className="max-w-[210px] h-[210px]"
                        >
                             <li
                                        onMouseEnter={() => setHoveredVideoItem(item.id)}
                                        onMouseLeave={() => setHoveredVideoItem(null)}
                                        className="max-w-[210px] 2xl:w-[210px] h-[210px] rounded-md bg-white  cursor-pointer transition-shadow duration-300 hover:shadow"
                                    >

                                        <div className="w-full h-[120px] relative" >
                                            <img
                                                src={item.squareThumbnail}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />

                                            {hoveredVideoItem === item.id && (
                                                <div className="absolute inset-0 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                    <PlayArrowIcon sx={{ fontSize: 60 }} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-wrap items-center px-3 py-3">
                                            <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                <span className="text-black text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                                    {item.title}
                                                </span>
                                                <span className="text-black text-md text-shadow-white leading-[1.2] line-clamp-1">
                                                    {item.Author}
                                                </span>
                                            </div>

                                            {/* <div className="w-full mb-[20px]">
                                                <span className="w-[75px] text-rose-300 rounded-full px-1 text-sm font-semibold flex items-center gap-1">
                                                    <FavoriteIcon />
                                                    {item.like}
                                                </span>
                                                <span className="w-[35px] h-[35px] mt-2 uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                    Up
                                                </span>
                                            </div> */}

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
