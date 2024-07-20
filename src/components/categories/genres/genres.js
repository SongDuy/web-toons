import React from 'react';

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

const GenresPage = () => {
    return (
        <div>
            <HeaderPage />

            <div className="w-full h-full bg-gray-100">
                <div className="w-full h-[70px] bg-white shadow flex items-center justify-center border-t">
                    <ul
                        className="flex gap-10"
                    >
                        <li
                            className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            DRAMA
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            FANTASY
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            COMEDY
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            ACTION
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            SLICE OF LIFE
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            ROMANCE
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            SUPERHERO
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >

                            SCI-FI
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >

                            THRILLER
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >

                            SUPERNATURAL
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >

                            OTHERS v
                        </li>

                    </ul>
                </div>

                <div className="py-[30px]">
                    <div className="mr-auto ml-[170px] mb-5 flex items-center">
                        <span className="font-semibold text-sm text-gray-400">Drama</span>

                    </div>

                    <div className="w-full h-full flex items-center justify-center">
                        <div className="grid grid-cols-5 gap-4">

                            {/* khung nội dung */}
                            {data.map(item => (
                                <div
                                    className="w-[210px] h-[210px] bg-white relative"
                                    key={item.id}
                                >

                                    <img
                                        src={item.img}
                                        alt="img"
                                        className="object-fill w-full h-full"
                                    />

                                    <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                        <div className="w-full h-[40px] mb-auto overflow-hidden">
                                            <span className="text-lg font-semibold leading-[1.2] line-clamp-2">
                                                Peace Restaurant
                                            </span>
                                        </div>

                                        <div className="w-full mt-2 mb-[50px]">
                                            <span className="text-red-800 text-sm font-semibold flex items-center gap-1">
                                                <FavoriteIcon />
                                                200k
                                            </span>
                                            <span className="w-[35px] h-[35px] mt-2 uppercase bg-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                Up
                                            </span>
                                        </div>

                                        <div className="w-full h-full">
                                            <span className="bg-gray-800 rounded-full px-2 py-1 text-yellow-600 text-sm font-semibold shadow-xl">Fantasy</span>
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

export default GenresPage;
