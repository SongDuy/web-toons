import React, { useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteIcon from '@mui/icons-material/Favorite';

const days = ['Mon day', 'Tue day', 'Wed day', 'Thu day', 'Fri day', 'Sat day', 'Sun day'];
const genres = ['DRAMA', 'FANTASY', 'COMEDY', 'ACTION', 'SLICE OF LIFE', 'ROMANCE', 'SUPERHERO', 'SCI-FI', 'THRILLER', 'SUPERNATURAL', 'MYSTERY', 'SPORTS', 'HISTORICAL', 'HEARTWARMING', 'HORROR', 'INFORMATIVE', 'SCHOOL', 'ANIMALS', 'ZOMBIES', 'SHORT STORY',];
genres.sort((a, b) => a.localeCompare(b));

const data = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Mon day' },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Tue day' },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Wed day' },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Thu day' },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Fri day' },
    { id: 6, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sat day' },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sun day' },
    { id: 8, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sun day' },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sun day' },
    { id: 10, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sun day' },
    { id: 11, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day' },
    { id: 12, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day' },
    { id: 13, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day' },
    { id: 14, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day' },
    { id: 15, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day' },
];

const dataPopular = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "1", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "2", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "3", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "4", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "5", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
];

const ContentPage = () => {

    const handleOriginalsClick = () => {
        window.location.href = '/originals';
    };

    const handleOriginalSeriesClick = () => {
        window.location.href = '/original/series';
    };

    const handleVideoSeriesClick = () => {
        window.location.href = '/video/series';
    };

    //Chọn nội dung theo thứ
    const [selectedDay, setSelectedDay] = useState('Mon day');
    const filteredData = data.filter(data => data.dayOfWeek === selectedDay);

    //Chọn nội dung theo thể loại

    return (
        <div className="w-full h-full bg-gray-100 mb-[50px]">
            <div className="w-full h-[500px] bg-green-200">

            </div>

            <div className="w-full h-[560px]">
                <div className="w-full h-[60px] bg-white shadow flex items-center justify-center">
                    <ul
                        className="flex"
                    >
                        {days.map(day => (
                            <li
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`w-[120px] h-[60px] bg-white text-black uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center ${selectedDay === day ? 'bg-green-600 text-white hover:text-white' : ''}`}
                            >
                                {day}
                            </li>
                        ))}

                    </ul>
                    <div
                        className="w-[150px] h-[60px] px-5 uppercase font-semibold text-lg text-gray-400 border-l-2 border-gray-200 hover:text-green-500 cursor-pointer flex items-center justify-center"
                        onClick={handleOriginalsClick}
                    >
                        More
                        <NavigateNextIcon />
                    </div>
                </div>
                <div className="w-full h-[500px] py-[30px] flex justify-center">
                    <ul className="grid grid-cols-5 gap-4">

                        {/* khung nội dung */}
                        {filteredData.slice(0, 10).map((item) => (
                            <li
                                className="w-[210px] h-[210px] rounded-xl bg-white relative cursor-pointer"
                                key={item.id}
                                onClick={handleOriginalSeriesClick}
                            >

                                <img
                                    src={item.img}
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />

                                <div className="w-full absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                    <div className="w-full h-[60px] mb-auto overflow-hidden">
                                        <span className="text-lg font-semibold leading-[1.2] line-clamp-2">
                                            Peace Restaurant
                                        </span>
                                        <span className="text-md leading-[1.2] line-clamp-1">
                                            Lee Nakeum , seewater
                                        </span>
                                    </div>

                                    <div className="w-full mt-2 mb-[25px]">
                                        <span className="text-red-300 text-sm font-semibold flex items-center gap-1">
                                            <FavoriteIcon />
                                            200k
                                        </span>
                                        <span className="w-[35px] h-[35px] mt-2 uppercase bg-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                            Up
                                        </span>
                                    </div>

                                    <div className="w-full h-[30px] bg-gray-300 bg-opacity-80 rounded-md">
                                        <span className="w-full px-2 py-1 text-yellow-600 text-sm font-semibold shadow-xl flex items-center justify-center">
                                            Fantasy
                                        </span>
                                    </div>
                                </div>

                            </li>
                        ))}

                    </ul>
                </div>
            </div>

            <div className="w-full h-[560px]">
                <div className="w-full h-[60px] bg-white shadow flex items-center justify-center">
                    <ul
                        className="flex"
                    >
                        <li
                            className="w-full h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            New to Originals
                        </li>

                    </ul>
                </div>
                <div className="w-full h-[500px] flex items-center justify-center">
                    <ul className="grid grid-cols-5 gap-4">
                        {/* khung nội dung */}
                        {data.slice(0, 10).map((item) => (
                            <li
                                className="w-[210px] h-[210px] bg-white rounded-md relative cursor-pointer"
                                key={item.id}
                                onClick={handleOriginalSeriesClick}
                            >

                                <img
                                    src={item.img}
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                    <div className="w-full h-[60px] mb-auto overflow-hidden">
                                        <span className="text-lg font-semibold leading-[1.2] line-clamp-2">
                                            Peace Restaurant
                                        </span>
                                        <span className="text-md leading-[1.2] line-clamp-1">
                                            Lee Nakeum , seewater
                                        </span>
                                    </div>

                                    <div className="w-full mt-2 mb-[25px]">
                                        <span className="text-red-300 text-sm font-semibold flex items-center gap-1">
                                            <FavoriteIcon />
                                            200k
                                        </span>
                                        <span className="w-[35px] h-[35px] mt-2 uppercase bg-black text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                            New
                                        </span>
                                    </div>

                                    <div className="w-full h-[30px] bg-gray-300 bg-opacity-80 rounded-md">
                                        <span className="w-full px-2 py-1 text-yellow-600 text-sm font-semibold shadow-xl flex items-center justify-center">
                                            Fantasy
                                        </span>
                                    </div>
                                </div>

                            </li>
                        ))}

                    </ul>
                </div>
            </div>

            <div className="w-full h-[560px]">
                <div className="w-full h-[60px] bg-white shadow flex items-center justify-center">
                    <ul
                        className="flex"
                    >
                        <li
                            className="w-full h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            New to Videos
                        </li>

                    </ul>
                </div>
                <div className="w-full h-[500px] flex items-center justify-center">
                    <ul className="grid grid-cols-5 gap-4">
                        {/* khung nội dung */}
                        {data.slice(0, 10).map((item) => (
                            <li
                                className="w-[210px] h-[210px] bg-white rounded-md relative cursor-pointer"
                                key={item.id}
                                onClick={handleVideoSeriesClick}
                            >

                                <img
                                    src={item.img}
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                    <div className="w-full h-[60px] mb-auto overflow-hidden">
                                        <span className="text-lg font-semibold leading-[1.2] line-clamp-2">
                                            Peace Restaurant
                                        </span>
                                        <span className="text-md leading-[1.2] line-clamp-1">
                                            Lee Nakeum , seewater
                                        </span>
                                    </div>

                                    <div className="w-full mt-2 mb-[25px]">
                                        <span className="text-red-300 text-sm font-semibold flex items-center gap-1">
                                            <FavoriteIcon />
                                            200k
                                        </span>
                                        <span className="w-[35px] h-[35px] mt-2 uppercase bg-black text-white font-semibold text-xs rounded-full flex items-center justify-center">
                                            New
                                        </span>
                                    </div>

                                    <div className="w-full h-[30px] bg-gray-300 bg-opacity-80 rounded-md">
                                        <span className="w-full px-2 py-1 text-yellow-600 text-sm font-semibold shadow-xl flex items-center justify-center">
                                            Fantasy
                                        </span>
                                    </div>
                                </div>

                            </li>
                        ))}

                    </ul>
                </div>
            </div>

            <div className="w-full h-[630px]">
                <div className="w-full h-[130px] bg-gray-100 flex items-center justify-center">
                    <ul
                        className="w-full gap-[120px] bg-gray-100"
                    >
                        <li
                            className="w-full h-[60px] bg-white border-b-2 uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            GENRES
                            <NavigateNextIcon />
                        </li>
                        <li
                            className="w-full h-[70px] bg-gray-100 uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <ul
                                    class="grid grid-cols-10 gap-x-2 gap-y-2 pt-8"
                                >
                                    {/* khung nội dung */}
                                    {genres.map(genre => (
                                        <li
                                            key={genre}
                                            className="uppercase font-semibold shadow rounded px-2 py-2 text-xs text-gray-400 hover:text-black cursor-pointer flex items-center justify-center"
                                        >
                                            {genre}
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="w-full h-[500px] flex items-center justify-center">
                    <ul className="grid grid-cols-5 gap-4">
                        {/* khung nội dung */}
                        {data.slice(0, 10).map((item) => (
                            <li
                                className="w-[210px] h-[210px] bg-white rounded-md relative cursor-pointer"
                                key={item.id}
                                onClick={handleOriginalSeriesClick}
                            >

                                <img
                                    src={item.img}
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                    <div className="w-full h-[60px] mb-auto overflow-hidden">
                                        <span className="text-lg font-semibold leading-[1.2] line-clamp-2">
                                            Peace Restaurant
                                        </span>
                                        <span className="text-md leading-[1.2] line-clamp-1">
                                            Lee Nakeum , seewater
                                        </span>
                                    </div>

                                    <div className="w-full mb-[20px] mr-auto">
                                        <span className="rounded-full gap-1 text-red-300 text-sm font-semibold flex items-center">
                                            <FavoriteIcon />
                                            200k
                                        </span>
                                        <div className="flex mt-2 gap-1">
                                            <span className="w-[35px] h-[35px] uppercase bg-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                Up
                                            </span>
                                            <span className="w-[35px] h-[35px] uppercase bg-black  text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                New
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-full h-[30px] bg-gray-300 bg-opacity-80 rounded-md">
                                        <span className="w-full px-2 py-1 text-yellow-600 text-sm font-semibold shadow-xl flex items-center justify-center">
                                            Fantasy
                                        </span>
                                    </div>

                                </div>

                            </li>
                        ))}

                    </ul>
                </div>
            </div>

            <div className="w-full h-[560px]">
                <div className="w-full h-[60px] bg-white shadow px-[160px] ">
                    <ul className="w-full h-full flex">
                        <li className="flex-auto w-1/3 h-[60px] flex items-center border-b mx-3">
                            <span className="font-semibold text-lg hover:text-green-500 cursor-pointer">
                                New & Trending
                                <NavigateNextIcon />
                            </span>
                        </li>
                        <li className="w-1/3 h-[60px] flex items-center border-b mx-3">
                            <span className="mr-auto font-semibold text-lg hover:text-green-500 cursor-pointer">
                                ORIGINALS by Genre
                                <NavigateNextIcon />
                            </span>
                            <span className="ml-auto text-green-500 cursor-pointer mr-2">ALL </span>
                            <span className="text-green-500 cursor-pointer">
                                <CheckIcon />
                            </span>
                        </li>
                        <li className="w-1/3 h-[60px] flex items-center border-b mx-3">
                            <span className="mr-auto font-semibold text-lg hover:text-green-500 cursor-pointer">
                                VIDEOS by Genre
                                <NavigateNextIcon />
                            </span>
                            <span className="ml-auto text-green-500 cursor-pointer mr-2">
                                ALL
                            </span>
                            <span className="text-green-500 cursor-pointer">
                                <CheckIcon />
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="w-full h-[500px] bg-white flex items-center justify-center px-[160px]">

                    <div className="flex-auto w-1/3 mx-3">
                        <ul className="w-full h-full ">
                            {/* khung nội dung */}
                            {dataPopular.map(item => (
                                <li
                                    className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                    key={item.key}
                                    onClick={handleOriginalSeriesClick}
                                >
                                    <div className="w-full h-full flex items-center">
                                        <div className="w-[80px] h-[80px] flex">
                                            <img
                                                src={item.img}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />
                                        </div>

                                        <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2 shadow-xl">
                                            <span className="mx-3 text-xl text-white font-bold">
                                                {item.number}
                                            </span>
                                        </div>

                                        <div className="w-[230px] mt-auto mb-auto overflow-hidden">
                                            <span className="text-gray-400 text-sm">
                                                {item.genre}
                                            </span>
                                            <span className="text-md font-semibold line-clamp-1">
                                                {item.name}
                                            </span>
                                            <span className="text-sm line-clamp-1">
                                                {item.auth}
                                            </span>
                                        </div>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-auto w-1/3 mx-3">
                        <ul className="w-full h-full">
                            {/* khung nội dung */}
                            {dataPopular.map(item => (
                                <li
                                    className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                    key={item.key}
                                    onClick={handleOriginalSeriesClick}
                                >
                                    <div className="w-full h-full flex items-center">
                                        <div className="w-[80px] h-[80px] flex">
                                            <img
                                                src={item.img}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />
                                        </div>

                                        <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2 shadow-xl">
                                            <span className="mx-3 text-xl text-white font-bold">
                                                {item.number}
                                            </span>
                                        </div>

                                        <div className="w-[230px] mt-auto mb-auto overflow-hidden">
                                            <span className="text-gray-400 text-sm">
                                                {item.genre}
                                            </span>
                                            <span className="text-md font-semibold line-clamp-1">
                                                {item.name}
                                            </span>
                                            <span className="text-sm line-clamp-1">
                                                {item.auth}
                                            </span>
                                        </div>

                                    </div>
                                </li>
                            ))}

                        </ul>
                    </div>

                    <div className="flex-auto w-1/3 mx-3">
                        <ul className="w-full h-full">
                            {/* khung nội dung */}
                            {dataPopular.map(item => (
                                <li
                                    className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                    key={item.key}
                                    onClick={handleVideoSeriesClick}
                                >
                                    <div className="w-full h-full flex items-center">
                                        <div className="w-[80px] h-[80px] flex">
                                            <img
                                                src={item.img}
                                                alt="img"

                                                className="object-fill w-full h-full rounded-md"
                                            />
                                        </div>

                                        <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2 shadow-xl">
                                            <span className="mx-3 text-xl text-white font-bold">
                                                {item.number}
                                            </span>
                                        </div>

                                        <div className="w-[230px] mt-auto mb-auto overflow-hidden">
                                            <span className="text-gray-400 text-sm">
                                                {item.genre}
                                            </span>
                                            <span className="text-md font-semibold line-clamp-1">
                                                {item.name}
                                            </span>
                                            <span className="text-sm line-clamp-1">
                                                {item.auth}
                                            </span>
                                        </div>

                                    </div>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ContentPage;
