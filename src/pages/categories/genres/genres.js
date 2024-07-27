import React, { useState, useEffect } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';

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
    { id: 11, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 12, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 13, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 14, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 15, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 16, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 17, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 18, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 19, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 20, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 21, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 22, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 23, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
];

const dataListGenre = [
    { id: 1, name: "DRAMA" },
    { id: 2, name: "FANTASY" },
    { id: 3, name: "COMEDY" },
    { id: 4, name: "ACTION" },
    { id: 5, name: "SLICE OF LIFE" },
    { id: 6, name: "ROMANCE" },
    { id: 7, name: "SUPERHERO" },
    { id: 8, name: "SCI-FI" },
    { id: 9, name: "THRILLER" },
    { id: 10, name: "SUPERNATURAL" },
    { id: 11, name: "MYSTERY" },
    { id: 12, name: "SPORTS" },
    { id: 13, name: "HISTORICAL" },
    { id: 14, name: "HEARTWARMING" },
    { id: 15, name: "HORROR" },
    { id: 16, name: "INFORMATIVE" },
];

const GenresPage = () => {

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

    const handleOriginalSeriesClick = () => {
        window.location.href = '/original/series';
    };

    return (
        <div>
            <div className="w-full h-full pb-[60px] bg-gray-100">

                <div className={`w-full h-[70px] bg-white shadow flex items-center justify-center border-t ${isSticky ? 'fixed top-0 z-50' : ''}`}>
                    <ul
                        class="grid grid-cols-10 gap-x-4 gap-y-2"
                    >
                        {/* khung nội dung */}
                        {dataListGenre.map(item => (
                            <li
                                className="uppercase font-semibold text-sm text-gray-400 hover:text-black cursor-pointer flex items-center justify-center"
                            >
                                {item.name}
                            </li>
                        ))}

                    </ul>
                </div>

                <div className="w-full h-full">
                    <div className="h-[70px] mx-[160px] border-b-2 flex items-center">
                        <span className="font-semibold text-md">Drama</span>
                    </div>

                    <div className="w-full h-full py-5 flex items-center justify-center">

                        <div className="grid grid-cols-5 gap-[8px]">

                            {/* khung nội dung */}
                            {data.map(item => (
                                <div
                                    className="w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer"
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

                                        <div className="w-full mb-[50px] mr-auto">
                                            <span className="w-[70px] rounded-full gap-1 text-red-300 text-sm font-semibold shadow-xl flex items-center">
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

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default GenresPage;
