import React, { useState, useEffect } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Link } from 'react-router-dom';
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll';
import { useSelector } from 'react-redux';


// Danh sách thể loại
const dataListGenre = [
    { id: 1, name: "Drama" },
    { id: 2, name: "Fantasy" },
    { id: 3, name: "Comedy" },
    { id: 4, name: "Action" },
    { id: 5, name: "Slice Of Life" },
    { id: 6, name: "Romance" },
    { id: 7, name: "Superhero" },
    { id: 8, name: "Sci-Fi" },
    { id: 9, name: "Thriller" },
    { id: 10, name: "Supernatural" },
    { id: 11, name: "Mystery" },
    { id: 12, name: "Sports" },
    { id: 13, name: "Historical" },
    { id: 14, name: "Heartwarming" },
    { id: 15, name: "Horror" },
    { id: 16, name: "Informative" },
    { id: 17, name: "School" },
    { id: 18, name: "Animals" },
    { id: 19, name: "Zombies" },
    { id: 20, name: "Short Story" },

];

// Sắp xếp mảng theo tên thể loại theo bảng chữ cái
dataListGenre.sort((a, b) => a.name.localeCompare(b.name));

const GenresPage = () => {
    const comic = useSelector(state => state.comic.comic);

    //kích hoạt dính vào trên cùng
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const threshold = 100; // Ngưỡng để kích hoạt dính vào trên cùng

        const handleScroll = () => {
            if (window.scrollY > threshold) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    //Chọn nội dung truyện theo thể loại
    const [selectedOriginalsByGenre, setSelectedOriginalsByGenre] = useState('Action');
    const filteredOriginalsByGenre = comic.comic?.filter(data => data.genre1 === selectedOriginalsByGenre || data.genre2 === selectedOriginalsByGenre);

    // Chọn nội dung videos theo thể loại
    const [selectedVideosByGenre, setSelectedVideosByGenre] = useState('Action');
    const filteredVideosByGenre = comic.comic?.filter(data => data.genre1 === selectedVideosByGenre || data.genre2 === selectedVideosByGenre);

    //Chọn nội dung theo tiêu đề
    const [selectedSection, setSelectedSection] = useState("section1");

    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredOriginalItem, setHoveredOriginalItem] = useState(null);
    const [hoveredVideoItem, setHoveredVideoItem] = useState(null);

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    return (
        <div className="w-full h-full pb-10 bg-gray-100">

            <div className={`w-full h-[70px] mb-[-70px] bg-white shadow flex items-center justify-center border-t ${isSticky ? 'sticky top-0 z-20' : ''}`}>
                <ul className="h-full flex gap-10">
                    <ScrollLink to="section1" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedSection("section1")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedSection === "section1" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >

                            {!language ?
                                <span>
                                    ORIGINALS
                                </span>
                                :
                                <span>
                                    원본
                                </span>
                            }
                        </li>
                    </ScrollLink >

                    <ScrollLink to="section2" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedSection("section2")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedSection === "section2" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            {!language ?
                                <span>
                                    VIDEOS
                                </span>
                                :
                                <span>
                                    비디오
                                </span>
                            }
                        </li>
                    </ScrollLink >
                </ul>
            </div>

            <div className="w-full h-full ">
                <div className="max-w-[1200px] h-full ml-auto mr-auto">

                    <ScrollElement name="section1">
                        <div className="max-w-full h-full pt-[70px]">

                            {/* Tiêu đề */}
                            <div className="h-[70px] border-b-2 flex items-center">
                                <span className="font-semibold text-md">
                                    {!language ?
                                        <span>
                                            Originals Series
                                        </span>
                                        :
                                        <span>
                                            오리지널 시리즈
                                        </span>
                                    }

                                </span>
                                <span className="ml-auto text-md flex items-center justify-center gap-1">
                                    All
                                    <CheckIcon />
                                </span>
                            </div>

                            <div className="w-full h-full py-5 flex items-center justify-center">
                                <div>
                                    {/* Danh mục thể loại */}
                                    <div className="h-[70px] mb-5 flex items-center justify-center">
                                        <ul
                                            className="grid grid-cols-10 gap-2"
                                        >
                                            {/* khung nội dung */}
                                            {dataListGenre.map(genre => (
                                                <li
                                                    key={genre.id}
                                                    onClick={() => setSelectedOriginalsByGenre(genre.name)}
                                                    className={`uppercase font-semibold shadow text-xs py-2 px-2 rounded hover:text-black cursor-pointer flex items-center justify-center ${selectedOriginalsByGenre === genre.name ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white hover:text-white' : 'bg-white text-black hover:text-yellow-500'}`}
                                                >
                                                    {genre.name}
                                                </li>
                                            ))}

                                        </ul>
                                    </div>

                                    {/* Danh mục nội dung originals theo thể loại */}
                                    <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-3">

                                        {/* khung nội dung */}
                                        {filteredOriginalsByGenre?.map(item => (
                                            <Link
                                                key={item.id}
                                                to={`/originals/original/series`}
                                            >

                                                <li
                                                    onMouseEnter={() => setHoveredOriginalItem(item.id)}
                                                    onMouseLeave={() => setHoveredOriginalItem(null)}
                                                    className="max-w-[230px] 2xl:w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
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

                                                    <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">

                                                        <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                            <span className="text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                                                {item.title}
                                                            </span>
                                                            <span className="text-md text-shadow-white leading-[1.2] line-clamp-1">
                                                                {item.summary}
                                                            </span>
                                                        </div>

                                                        <div className="w-full mb-[40px] mr-auto">
                                                            <span className="w-[75px] text-rose-300 rounded-full gap-1 text-sm font-semibold flex items-center">
                                                                <FavoriteIcon />
                                                                {item.like}
                                                            </span>
                                                            <div className="flex mt-2 gap-1">
                                                                <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                                    Up
                                                                </span>
                                                                {/* <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-gray-500 via-black to-black  text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                                    New
                                                                </span> */}
                                                            </div>
                                                        </div>

                                                        {/*Trong component React của bạn */}
                                                        <div className="w-full h-[30px] shadow bg-white bg-opacity-80 rounded-md">
                                                            <span className="w-full px-2 py-1 text-black text-sm font-semibold shadow-xl flex items-center justify-center rounded-md">
                                                                {selectedOriginalsByGenre}
                                                            </span>
                                                        </div>

                                                    </div>

                                                </li>
                                            </Link>
                                        ))}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </ScrollElement >

                    <ScrollElement name="section2" >
                        <div className="w-full h-full pt-[70px]">

                            {/* Tiêu đề */}
                            <div className="h-[70px] border-b-2 flex items-center">
                                <span className="font-semibold text-md">
                                    {!language ?
                                        <span>
                                            Videos Series
                                        </span>
                                        :
                                        <span>
                                            비디오 시리즈
                                        </span>
                                    }

                                </span>
                                <span className="ml-auto text-md flex items-center justify-center gap-1">
                                    All
                                    <CheckIcon />
                                </span>
                            </div>

                            <div className="w-full h-full mt-[25px] flex items-center justify-center">
                                <div>

                                    {/* Danh mục thể loại */}
                                    <div className="h-[70px] mb-5 flex items-center justify-center">
                                        <ul
                                            className="grid grid-cols-10 gap-2"
                                        >
                                            {/* khung nội dung */}
                                            {dataListGenre.map(genre => (
                                                <li
                                                    key={genre.id}
                                                    onClick={() => setSelectedVideosByGenre(genre.name)}
                                                    className={`uppercase font-semibold shadow text-xs py-2 px-2 rounded hover:text-black cursor-pointer flex items-center justify-center ${selectedVideosByGenre === genre.name ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white hover:text-white' : 'bg-white text-black hover:text-yellow-500'}`}
                                                >
                                                    {genre.name}
                                                </li>
                                            ))}

                                        </ul>
                                    </div>

                                    {/* Danh mục nội dung videos theo thể loại */}
                                    <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-3">

                                        {/* khung nội dung */}
                                        {filteredVideosByGenre?.map(item => (
                                            <Link
                                                key={item.id}
                                                to={`/videos/video/series`}
                                            >

                                                <li
                                                    onMouseEnter={() => setHoveredVideoItem(item.id)}
                                                    onMouseLeave={() => setHoveredVideoItem(null)}
                                                    className="max-w-[230px] 2xl:w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                                                >

                                                    <div className="w-full h-full" >
                                                        <img
                                                            src={item.squareThumbnail}
                                                            alt="img"
                                                            className="object-fill w-full h-full rounded-md"
                                                        />

                                                        {hoveredVideoItem === item.id && (
                                                            <div className="absolute inset-0 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                                <PlayArrowIcon sx={{ fontSize: 60 }} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">

                                                        <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                            <span className="text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                                                {item.title}
                                                            </span>
                                                            <span className="text-md text-shadow-white leading-[1.2] line-clamp-1">
                                                                {item.summary}
                                                            </span>
                                                        </div>

                                                        <div className="w-full mb-[40px] mr-auto">
                                                            <span className="w-[75px] text-rose-300 rounded-full gap-1 text-sm font-semibold flex items-center">
                                                                <FavoriteIcon />
                                                                {item.like}
                                                            </span>
                                                            <div className="flex mt-2 gap-1">
                                                                <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                                    Up
                                                                </span>
                                                                {/* <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-gray-500 via-black to-black  text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                                    New
                                                                </span> */}
                                                            </div>
                                                        </div>

                                                        {/*Trong component React của bạn */}
                                                        <div className="w-full h-[30px] shadow bg-gray-300 bg-opacity-80 rounded-md">
                                                            <span className="w-full px-2 py-1 text-white text-sm font-semibold shadow-xl flex items-center justify-center rounded-md">
                                                                {selectedVideosByGenre}
                                                            </span>
                                                        </div>

                                                    </div>

                                                </li>
                                            </Link>
                                        ))}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </ScrollElement>

                </div>
            </div>
        </div >
    );
}

export default GenresPage;
