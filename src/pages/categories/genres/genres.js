import React, { useState, useEffect } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Link } from 'react-router-dom';
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll';

const data = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Tue', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Wed', genre: "Animals", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Thu', genre: "Comedy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 5, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Fri', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 6, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Mon', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 7, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Mon', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 8, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Historical", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sun', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 10, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sun', genre: "School", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 11, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 12, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 13, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Thu', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 14, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 15, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 16, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Thu', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 17, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Wed', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 18, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 19, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Tue', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 20, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 21, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 22, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 23, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 24, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 24, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 25, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 26, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Thu day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 27, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 28, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 29, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
];

// Danh sách thể loại
const genres = ['Drama', 'Fantasy', 'Comedy', 'Action', 'Slice Of Life', 'Romance', 'Superhero', 'Sci-Fi', 'Thriller', 'Supernatural', 'Mystery', 'Sports', 'Historical', 'Heartwarming', 'Horror', 'Informative', 'School', 'Animals', 'Zombies', 'Short Story',];
genres.sort((a, b) => a.localeCompare(b));

const GenresPage = () => {

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

    //Chọn nội dung theo thể loại
    const [selectedOriginalsByGenre, setSelectedOriginalsByGenre] = useState('Action');
    const filteredOriginalsByGenre = data.filter(data => data.genre === selectedOriginalsByGenre);

    const [selectedVideosByGenre, setSelectedVideosByGenre] = useState('Action');
    const filteredVideosByGenre = data.filter(data => data.genre === selectedVideosByGenre);

    //Chọn nội dung theo tiêu đề
    const [selectedTitle, setSelectedTitle] = useState("originals");

    return (
        <div className="w-full h-full pb-10 bg-gray-100">

            <div className={`w-full h-[70px] mb-[-70px] bg-white shadow flex items-center justify-center border-t ${isSticky ? 'sticky top-0 z-10' : ''}`}>
                <ul className="h-full flex gap-10">
                    <ScrollLink to="section1" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedTitle("originals")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedTitle === "originals" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            ORIGINALS
                        </li>
                    </ScrollLink >

                    <ScrollLink to="section2" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedTitle("videos")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedTitle === "videos" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            VIDEOS
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
                                    Originals Series
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
                                            class="grid grid-cols-10 gap-2"
                                        >
                                            {/* khung nội dung */}
                                            {genres.map(genre => (
                                                <li
                                                    key={genre}
                                                    onClick={() => setSelectedOriginalsByGenre(genre)}
                                                    className={`uppercase font-semibold shadow text-xs py-2 px-2 rounded hover:text-black cursor-pointer flex items-center justify-center ${selectedOriginalsByGenre === genre ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white hover:text-white' : 'bg-white text-black hover:text-yellow-500'}`}
                                                >
                                                    {genre}
                                                </li>
                                            ))}

                                        </ul>
                                    </div>

                                    {/* Danh mục nội dung originals theo thể loại */}
                                    <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-3">

                                        {/* khung nội dung */}
                                        {filteredOriginalsByGenre.map(item => (
                                            <Link to={`/original/series`}>

                                                <li
                                                    className="max-w-[230px] 2xl:w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow-xl"
                                                    key={item.id}
                                                >

                                                    <img
                                                        src={item.img}
                                                        alt="img"
                                                        className="object-fill w-full h-full rounded-md"
                                                    />

                                                    <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">

                                                        <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                            <span className="text-lg font-semibold leading-[1.2] line-clamp-2">
                                                                {item.name}
                                                            </span>
                                                            <span className="text-md leading-[1.2] line-clamp-1">
                                                                {item.auth}
                                                            </span>
                                                        </div>

                                                        <div className="w-full mb-[40px] mr-auto">
                                                            <span className="w-[75px] text-rose-300 rounded-full px-1 gap-1 text-sm font-semibold flex items-center">
                                                                <FavoriteIcon />
                                                                {item.like}
                                                            </span>
                                                            <div className="flex mt-2 gap-1">
                                                                <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                                    Up
                                                                </span>
                                                                <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-gray-500 via-black to-black  text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                                    New
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/*Trong component React của bạn */}
                                                        <div className="w-full h-[30px] shadow bg-white bg-opacity-80 rounded-md">
                                                            <span className="w-full px-2 py-1 text-yellow-600 text-sm font-semibold shadow-xl flex items-center justify-center rounded-md">
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
                        </div>
                    </ScrollElement >

                    <ScrollElement name="section2" >
                        <div className="w-full h-full pt-[70px]">

                            {/* Tiêu đề */}
                            <div className="h-[70px] border-b-2 flex items-center">
                                <span className="font-semibold text-md">
                                    Videos Series
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
                                            class="grid grid-cols-10 gap-2"
                                        >
                                            {/* khung nội dung */}
                                            {genres.map(genre => (
                                                <li
                                                    key={genre}
                                                    onClick={() => setSelectedVideosByGenre(genre)}
                                                    className={`uppercase font-semibold shadow text-xs py-2 px-2 rounded hover:text-black cursor-pointer flex items-center justify-center ${selectedVideosByGenre === genre ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white hover:text-white' : 'bg-white text-black hover:text-yellow-500'}`}
                                                >
                                                    {genre}
                                                </li>
                                            ))}

                                        </ul>
                                    </div>

                                    {/* Danh mục nội dung videos theo thể loại */}
                                    <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-3">

                                        {/* khung nội dung */}
                                        {filteredVideosByGenre.map(item => (
                                            <Link to={`/video/series`}>

                                                <li
                                                    className="max-w-[230px] 2xl:w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow-xl"
                                                    key={item.id}
                                                >

                                                    <img
                                                        src={item.img}
                                                        alt="img"
                                                        className="object-fill w-full h-full rounded-md"
                                                    />

                                                    <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">

                                                        <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                            <span className="text-lg font-semibold leading-[1.2] line-clamp-2">
                                                                {item.name}
                                                            </span>
                                                            <span className="text-md leading-[1.2] line-clamp-1">
                                                                {item.auth}
                                                            </span>
                                                        </div>

                                                        <div className="w-full mb-[40px] mr-auto">
                                                            <span className="w-[75px] text-rose-300 rounded-full px-1 gap-1 text-sm font-semibold flex items-center">
                                                                <FavoriteIcon />
                                                                {item.like}
                                                            </span>
                                                            <div className="flex mt-2 gap-1">
                                                                <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                                    Up
                                                                </span>
                                                                <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-gray-500 via-black to-black  text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                                    New
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/*Trong component React của bạn */}
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
                        </div>
                    </ScrollElement>

                </div>
            </div>
        </div >
    );
}

export default GenresPage;
