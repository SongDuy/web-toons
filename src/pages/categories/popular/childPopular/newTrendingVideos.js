import React, { useState } from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const dataPopular = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "2", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "3", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "4", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "5", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "6", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 6, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "7", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "8", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 8, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "9", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "10", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
];

const NewTrendingVideosPage = () => {

    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredVideoItem, setHoveredVideoItem] = useState(null);

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    return (
        <div className="w-full h-full pt-[70px]">

            <div className="h-[70px] flex items-center uppercase font-semibold text-xl">
                {!language ? <span> NEW & TRENDING VIDEOS </span> : <span> 새로운 동영상 </span>}
            </div>

            <div className="w-full flex gap-[60px]">

                {/* Hien thị top 1 */}
                <Link
                    to={`/videos/video/series`}
                    className="h-[815px] bg-white py-1"
                >
                    <div
                        className="w-[500px] h-full"
                        onMouseEnter={() => setHoveredVideoItem("choice")}
                        onMouseLeave={() => setHoveredVideoItem(null)}
                    >

                        <div className="w-full h-full">
                            <div className="w-[500px] mr-auto h-[500px] rounded-md bg-green-500 flex items-center justify-center relative">
                                <div>
                                    <img
                                        src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                        alt="img"
                                        className="object-fill w-full h-full rounded-md"
                                    />

                                    {hoveredVideoItem === "choice" && (
                                        <div className="absolute inset-0 bg-black bg-opacity-30 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                            <PlayArrowIcon sx={{ fontSize: 100 }} />
                                        </div>
                                    )}
                                </div>

                                <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                    <div className="w-full h-[120px] mb-auto overflow-hidden">
                                        <div className="w-[80px] h-[80px] flex items-center justify-center mx-2">
                                            <span className="mx-3 text-[60px] text-white text-shadow-black font-bold">
                                                1
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[150px] mt-3">
                                <div className="w-full">
                                    <span className="block text-gray-400">
                                        Fantasy
                                    </span>
                                </div>


                                <div className="w-full h-[75px] overflow-hidden">
                                    <span className="text-[30px] font-semibold leading-[1.2] line-clamp-2">
                                        Monster Princess of the Snowy Mountain
                                    </span>
                                </div>

                                <div>
                                    <span className="block">
                                        Lee Nakeum , seewater
                                    </span>
                                </div>

                                <div className=" w-full h-full mt-5 overflow-hidden">
                                    <span className="w-full line-clamp-6">
                                        Valerie Beloff, a princess in exile, decides to take her
                                        own life on her 19th birthday. Abused by her own mother
                                        and exiled for her mother’s crimes, she had to live in
                                        the freezing Makleroad palace by herself, and she somehow
                                        acquired the powers of an ancient monster - the power to
                                        freeze things. Hopeless, she seeks an escape in death… only
                                        to find herself before her cruel mother, yelling at her once
                                        again. Is she dead? Is she reliving a memory? When her mother
                                        strikes her, the throbbing pain lets her know that this is neither
                                        a dream nor a memory! This series contains themes regarding child
                                        abuse that may not be suitable for all readers. Viewer discretion
                                        is advised. If you or someone you know is struggling or in crisis,
                                        please reach out for help at Crisis Text Line
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </Link>

                {/* Hien thị danh sách */}
                <div className="w-full h-[815px] bg-white">
                    <div className="w-full h-full">
                        <ul className="w-full h-full ">

                            {/* khung nội dung */}
                            {dataPopular?.map((item, index) => (
                                <Link
                                    to={`/videos/video/series`}
                                    key={item.id}
                                >
                                    <li
                                        className="w-full h-[90px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="w-full h-full flex items-center">
                                            <div className="w-[80px] h-[80px]">
                                                <img
                                                    src={item.img}
                                                    alt="img"
                                                    className="object-fill w-full h-full rounded-md"
                                                />
                                            </div>
                                            <div className="w-[30px] h-[30px] mx-3 flex items-center justify-center">
                                                <span className="mx-3 text-xl text-white text-shadow-black font-bold">
                                                    {index + 2}
                                                </span>
                                            </div>
                                            <div className="w-[420px] mt-auto mb-auto overflow-hidden">
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
        </div>
    );
}

export default NewTrendingVideosPage;
