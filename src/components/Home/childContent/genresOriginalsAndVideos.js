import React, { useState } from 'react';


import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const GenresOriginalsAndVideosPage = () => {
    const comic = useSelector(state => state.comic.comic);
    const language = useSelector(state => state.hidden.language);

    // Danh sách thể loại
    const dataListGenre = [
        { id: 1, name: "Drama", nameKorean: "드라마" },
        { id: 2, name: "Fantasy", nameKorean: "판타지" },
        { id: 3, name: "Comedy", nameKorean: "코미디" },
        { id: 4, name: "Action", nameKorean: "액션" },
        { id: 5, name: "Slice Of Life", nameKorean: "일상" },
        { id: 6, name: "Romance", nameKorean: "로맨스" },
        { id: 7, name: "Superhero", nameKorean: "슈퍼히어로" },
        { id: 8, name: "Sci-Fi", nameKorean: "SF" },
        { id: 9, name: "Thriller", nameKorean: "스릴러" },
        { id: 10, name: "Supernatural", nameKorean: "초자연" },
        { id: 11, name: "Mystery", nameKorean: "미스터리" },
        { id: 12, name: "Sports", nameKorean: "스포츠" },
        { id: 13, name: "Historical", nameKorean: "역사" },
        { id: 14, name: "Heartwarming", nameKorean: "훈훈한" },
        { id: 15, name: "Horror", nameKorean: "호러" },
        { id: 16, name: "Informative", nameKorean: "정보" },
        { id: 17, name: "School", nameKorean: "학교" },
        { id: 18, name: "Animals", nameKorean: "동물" },
        { id: 19, name: "Zombies", nameKorean: "좀비" },
        { id: 20, name: "Short Story", nameKorean: "단편" },

    ];

    // Sắp xếp mảng theo tên thể loại theo bảng chữ cái
    dataListGenre.sort((a, b) => a.name.localeCompare(b.name));

    //Chọn nội dung truyện theo thể loại
    const [selectedOriginalsByGenre, setSelectedOriginalsByGenre] = useState('Action');
    const filteredOriginalsByGenre = comic.comic?.filter(data => data.genre1 === selectedOriginalsByGenre || data.genre2 === selectedOriginalsByGenre);

    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredOriginalItem, setHoveredOriginalItem] = useState(null);

    return (
        <div className="w-full min-h-[560px]">

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
                                <span>
                                    GENRES
                                </span>
                                :
                                <span>
                                    장르
                                </span>
                            }
                            <NavigateNextIcon />
                        </li>
                    </Link>
                </ul>
            </div>

            {/* Hiển thị nội dung thể loại */}
            <div className="w-full min-h-[500px] py-[30px] flex justify-center">
                <div className="grid grid-cols-1 gap-y-[30px]">

                    {/* khung nội dung dành cho truyện */}
                    <div className="w-full h-full">

                        <div className="w-full h-[75px] mb-[30px]">
                            <ul className="grid grid-cols-10 gap-2">
                                {dataListGenre?.map(genre => (
                                    <li
                                        key={genre.id}
                                        onClick={() => setSelectedOriginalsByGenre(genre.name)}
                                        className={`w-[104px] uppercase font-semibold shadow rounded px-2 py-2 text-[11px] hover:text-black cursor-pointer flex items-center justify-center ${selectedOriginalsByGenre === genre.name ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white hover:text-white' : 'bg-white text-black hover:text-yellow-500'}`}
                                    >
                                        {!language ? genre.name : genre.nameKorean}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <ul className="min-h-[210px] grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-4">
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
                                        className="max-w-[210px] 2xl:w-[210px] h-[210px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                                    >

                                        <div className="w-full h-full" >
                                            <img
                                                src={item.squareThumbnail}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />

                                            {hoveredOriginalItem === item.id && (
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
                                                    </span>}
                                            </div>

                                        </div>

                                    </li>
                                </Link>
                            ))}

                        </ul>
                    </div>

<<<<<<< HEAD
                    {/* khung nội dung dành cho videos */}
                    <div className="w-full h-full">
                        <div className="w-full h-[75px] mb-[30px]">
                            <ul className="grid grid-cols-10 gap-2">
                                {dataListGenre.map(genre => (
                                    <li
                                        key={genre.id}
                                        onClick={() => setSelectedVideosByGenre(genre.name)}
                                        className={`w-[104px] uppercase font-semibold shadow rounded px-2 py-2 text-[11px] hover:text-black cursor-pointer flex items-center justify-center ${selectedVideosByGenre === genre.name ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white hover:text-white' : 'bg-white text-black hover:text-yellow-500'}`}
                                    >
                                        {!language ? genre.name : genre.nameKorean}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <ul className="min-h-[210px] grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-4">
                            {/* khung nội dung */}
                            {filteredVideosByGenre?.slice(0, 10)?.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/originals/original/series/${item.id}`}
                                    className="max-w-[210px] h-[210px]"
                                >
                                    <li
                                        onMouseEnter={() => setHoveredVideoItem(item.id)}
                                        onMouseLeave={() => setHoveredVideoItem(null)}
                                        className="max-w-[210px] 2xl:w-[210px] h-[210px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                                    >

                                        <div className="w-full h-full" >
                                            <img
                                                src={item.img}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />

                                            {hoveredVideoItem === item.id && (
                                                <div className="absolute inset-0 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                    <PlayArrowIcon sx={{ fontSize: 60 }} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                            <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                <span className="text-black text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                                    {item.name}
                                                </span>
                                                <span className="text-black text-md text-shadow-white leading-[1.2] line-clamp-1">
                                                    {item.auth}
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
                                                    <span className="w-full px-2 py-1 text-white text-shadow-black text-sm font-semibold flex items-center justify-center">
                                                        {selectedVideosByGenre}
                                                    </span>
                                                    : <span className="w-full px-2 py-1 text-white text-shadow-black text-sm font-semibold flex items-center justify-center">
                                                        {dataListGenre.filter(item => item.name === selectedVideosByGenre)[0].nameKorean}
                                                    </span>}
                                            </div>

                                        </div>

                                    </li>
                                </Link>
                            ))}

                        </ul>
                    </div>

=======
>>>>>>> 288f77aeb2441f16f84d76fabfba1ca0826ee0c6
                </div>
            </div>
        </div>
    );
}

export default GenresOriginalsAndVideosPage;
