import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { Link } from 'react-router-dom';


const PopularPage = () => {

    const dataPopular = [
        { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "1", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
        { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "2", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
        { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "3", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
        { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "4", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
        { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "5", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    ];

    return (
        <div className="w-full h-[560px]">

            {/* Phần hiển thị các tiêu đề series truyện và video phổ biến*/}
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

            {/* Phần hiển thị nội dung */}
            <div className="w-full h-[500px] bg-white flex items-center justify-center px-[160px]">

                {/* Phần hiển thị các series truyện và video mới hạn cao */}
                <div className="flex-auto w-1/3 mx-3">
                    <ul className="w-full h-full ">
                        {/* khung nội dung */}
                        {dataPopular.map(item => (
                            <Link to={`/original/series`}>
                                <li
                                    className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                    key={item.key}
                                >
                                    <div className="w-full h-full flex items-center">
                                        <div className="w-[80px] h-[80px] flex">
                                            <img
                                                src={item.img}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />
                                        </div>

                                        <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2">
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
                            </Link>
                        ))}
                    </ul>
                </div>

                {/* Phần hiển thị các series truyện mới hạn cao theo thể loại */}
                <div className="flex-auto w-1/3 mx-3">
                    <ul className="w-full h-full">
                        {/* khung nội dung */}
                        {dataPopular.map(item => (
                            <Link to={`/original/series`}>
                                <li
                                    className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                    key={item.key}
                                >
                                    <div className="w-full h-full flex items-center">
                                        <div className="w-[80px] h-[80px] flex">
                                            <img
                                                src={item.img}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />
                                        </div>

                                        <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2">
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
                            </Link>
                        ))}

                    </ul>
                </div>

                {/* Phần hiển thị các series truyện mới hạn cao theo thể loại */}
                <div className="flex-auto w-1/3 mx-3">
                    <ul className="w-full h-full">
                        {/* khung nội dung */}
                        {dataPopular.map(item => (
                            <Link to={`/video/series`}>
                                <li
                                    className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                    key={item.key}
                                >
                                    <div className="w-full h-full flex items-center">
                                        <div className="w-[80px] h-[80px] flex">
                                            <img
                                                src={item.img}
                                                alt="img"

                                                className="object-fill w-full h-full rounded-md"
                                            />
                                        </div>

                                        <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2">
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
                            </Link>
                        ))}

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PopularPage;
