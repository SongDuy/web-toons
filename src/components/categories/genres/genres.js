import React from 'react';

import HeaderPage from '../../layout/header';
import FooterPage from '../../layout/footer';

const GenresPage = () => {
    return (
        <div>
            <HeaderPage />

            <div className="w-full h-full bg-gray-100">
                <div className="w-full h-[60px] bg-white shadow flex items-center justify-center border-t">
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
                            <div className="w-[210px] h-[210px] bg-white relative">

                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="Description of the image"
                                    className="object-fill w-full h-full"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>

                            {/* khung nội dung */}
                            <div className="w-[210px] h-[210px] bg-white relative">

                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="Description of the image"
                                    className="object-fill w-full h-full"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>

                            {/* khung nội dung */}
                            <div className="w-[210px] h-[210px] bg-white relative">

                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="Description of the image"
                                    className="object-fill w-full h-full"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>

                            {/* khung nội dung */}
                            <div className="w-[210px] h-[210px] bg-white relative">

                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="Description of the image"
                                    className="object-fill w-full h-full"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>

                            {/* khung nội dung */}
                            <div className="w-[210px] h-[210px] bg-white relative">

                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="Description of the image"
                                    className="object-fill w-full h-full"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>

                            {/* khung nội dung */}
                            <div className="w-[210px] h-[210px] bg-white relative">

                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="Description of the image"
                                    className="object-fill w-full h-full"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>

                            {/* khung nội dung */}
                            <div className="w-[210px] h-[210px] bg-white relative">

                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="Description of the image"
                                    className="object-fill w-full h-full"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>

                            {/* khung nội dung */}
                            <div className="w-[210px] h-[210px] bg-white relative">

                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="Description of the image"
                                    className="object-fill w-full h-full"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>

                            {/* khung nội dung */}
                            <div className="w-[210px] h-[210px] bg-white relative">

                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="Description of the image"
                                    className="object-fill w-full h-full"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>

                            {/* khung nội dung */}
                            <div className="w-[210px] h-[210px] bg-white relative">

                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="Description of the image"
                                    className="object-fill w-full h-full"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>

                            {/* khung nội dung */}
                            <div className="w-[210px] h-[210px] bg-white relative">

                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="Description of the image"
                                    className="object-fill w-full h-full"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>
                            {/* khung nội dung */}
                            <div className="w-[210px] h-[210px] bg-white relative">

                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="Description of the image"
                                    className="object-fill w-full h-full"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterPage />
        </div>
    );
}

export default GenresPage;
