import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';

import HeaderPage from '../../layout/header';
import FooterPage from '../../layout/footer';



const data = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 6, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 8, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 10, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
];

const PopularPage = () => {
    return (
        <div>
            <HeaderPage />

            <div className="w-full h-full bg-gray-100">
                <div className="w-full h-[70px] bg-white shadow flex items-center justify-center border-t">
                    <ul
                        className="flex gap-[70px]"
                    >
                        <li
                            className="h-[60px] uppercase font-semibold text-md text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            ONGOING
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-md text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            COMPLETED
                        </li>

                    </ul>
                </div>

                <div className="w-full h-full">
                    <div className="h-[70px] mx-[160px] border-b-2 flex items-center">
                        <span className="font-semibold text-md">Ongoing Series</span>
                        <span className="ml-auto text-md flex items-center justify-center gap-2"> by Popularity <CheckIcon /> </span>
                    </div>

                    <div className="w-full h-full py-5 flex items-center justify-center">

                        <div>

                        </div>

                        <div className="grid grid-cols-5 gap-[8px]">

                            {/* khung nội dung */}
                            {data.map(item => (
                                <div
                                    className="w-[235px] h-[210px] bg-white relative"
                                    key={item.id}
                                >

                                    <img
                                        src={item.img}
                                        alt="img"
                                        className="object-fill w-full h-full"
                                    />

                                    <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                        <div className="w-full py-1">
                                            <span className="bg-gray-300 bg-opacity-50 rounded-full px-2 py-1 text-yellow-600 text-xs font-semibold shadow-xl">
                                                Fantasy
                                            </span>
                                        </div>

                                        <div className="w-full mb-auto overflow-hidden">
                                            <span className="text-lg font-semibold line-clamp-1">
                                                Peace Restaurant
                                            </span>
                                            <span className="text-md leading-[1.2] line-clamp-1">
                                                Lee Nakeum , seewater
                                            </span>
                                        </div>

                                        <div className="w-full mb-[40px]">
                                            <span className="w-[35px] h-[35px] mt-2 uppercase bg-green-500 text-white text-xs font-semibold rounded-full shadow-xl flex items-center justify-center">
                                                Up
                                            </span>
                                        </div>

                                        <div className="w-[70px]">
                                            <span className="rounded-full gap-1 px-2 py-1 text-red-300 text-sm font-semibold shadow-xl flex items-center justify-center">
                                                <FavoriteIcon />
                                                200k
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </div>

            <FooterPage />
        </div>
    );
}

export default PopularPage;
