import React, { useState } from 'react';


import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useSelector } from 'react-redux';
import dataListGenre from "../../../components/layout/layoutUser/dataListGenre";

import { Link } from 'react-router-dom';

const GenresOriginalsAndVideosPage = () => {
    const comic = useSelector(state => state.comic.comic);
    const language = useSelector(state => state.hidden.language);

    //Chọn nội dung truyện theo thể loại
    const [selectedOriginalsByGenre, setSelectedOriginalsByGenre] = useState('Action');
    const filteredOriginalsByGenre = comic.comic?.filter(data => data.genre1.toLowerCase() === selectedOriginalsByGenre.toLowerCase() || data.genre2.toLowerCase() === selectedOriginalsByGenre.toLowerCase());

    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredOriginalItem, setHoveredOriginalItem] = useState(null);

    return (
        <div className="w-full min-h-[680px]">

            {/* Hiển thị tiêu đề */}
            <div className="w-full h-[60px]">
                <ul
                    className="w-full h-full bg-gray-100"
                >
                    <Link to={`/genres`}>
                        <li
                            className="w-full h-[60px] bg-white border-b-2 uppercase font-semibold text-lg hover:text-yellow-500 cursor-pointer flex items-center justify-center"
                        >
                            {!language ?
                                <span> GENRES </span>
                                :
                                <span> 장르 </span>
                            }
                            <NavigateNextIcon />
                        </li>
                    </Link>
                </ul>
            </div>

            {/* Hiển thị nội dung thể loại */}
            <div className="w-full min-h-[620px] py-[30px] xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px]">
                <div className="grid grid-cols-1 gap-y-[30px]">

                    {/* khung nội dung dành cho truyện */}
                    <div className="w-full h-full">

                        <div className="w-full h-[95px] mb-5 flex items-center justify-center">
                            <ul className="grid grid-rows-2 grid-flow-col gap-2 w-max overflow-x-auto scroll-snap-x scroll-snap-mandatory">
                                {dataListGenre?.map((genre, index) => (
                                    <li
                                        key={genre.id}
                                        onClick={() => setSelectedOriginalsByGenre(genre.name)}
                                        className={`min-w-[104px] uppercase font-semibold shadow rounded px-2 py-2 text-[11px] hover:text-black cursor-pointer flex items-center justify-center ${selectedOriginalsByGenre === genre.name
                                            ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white hover:text-white'
                                            : 'bg-white text-black hover:text-yellow-500'
                                            }`}
                                    >
                                        {!language ? genre.name : genre.nameKorean}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="w-full flex items-center justify-center">
                            <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                                {/* khung nội dung */}
                                {filteredOriginalsByGenre?.slice(0, 10)?.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={`/originals/original/series/${item.id}`}
                                        className="max-w-[210px] h-[210px]"
                                    >
                                        <li
                                            onMouseEnter={() => setHoveredOriginalItem(item.id)}
                                            onMouseLeave={() => setHoveredOriginalItem(null)}
                                            className="max-w-[210px] h-[210px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                                        >

                                            <div className="w-full h-full" >
                                                <img
                                                    src={item.squareThumbnail}
                                                    alt="img"
                                                    className="object-cover w-full h-full rounded-md"
                                                />

                                                {hoveredOriginalItem === item.id && (
                                                    <div className="absolute inset-0 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                        <AutoStoriesIcon sx={{ fontSize: 40 }} />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="max-w-[210px] absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                                <div className="w-[210px] h-[65px] mb-auto overflow-hidden">
                                                    <span className="text-black text-lg font-semibold text-shadow-white leading-[1.3] line-clamp-2">
                                                        {item.title}
                                                    </span>
                                                    <span className="h-[20px] text-black text-md text-shadow-white leading-[0.8] line-clamp-1">
                                                        {item.Author}
                                                    </span>
                                                </div>

                                                <div className="w-full mb-[20px]">
                                                    <span className="w-[75px] text-rose-300 rounded-full gap-1 text-sm font-semibold flex items-center">
                                                        <FavoriteIcon />
                                                        {item.like}
                                                    </span>
                                                    <div className="flex mt-2 gap-1">
                                                        <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                            Up
                                                        </span>
                                                        {/* <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-gray-500 via-black to-black text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                        New
                                                    </span> */}
                                                    </div>
                                                </div>

                                                {/*Trong component React của bạn */}
                                                <div className="w-full h-[30px] mt-auto">
                                                    {!language ?
                                                        <span className="w-full px-2 py-1 text-yellow-300 text-shadow-black text-sm font-semibold flex items-center justify-center">
                                                            {selectedOriginalsByGenre}
                                                        </span>
                                                        :
                                                        <span className="w-full px-2 py-1 text-yellow-300 text-shadow-black text-sm font-semibold flex items-center justify-center">
                                                            {dataListGenre.filter(item => item.name === selectedOriginalsByGenre)[0].nameKorean}
                                                        </span>
                                                    }
                                                </div>

                                            </div>

                                        </li>
                                    </Link>
                                ))}

                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default GenresOriginalsAndVideosPage;
