import React from 'react';

import HeaderPage from '../../layout/header';
import FooterPage from '../../layout/footer';

const dataSeries = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 15", date: "jun 10, 2024", like: "23,789", number: "#15" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 14", date: "jun 10, 2024", like: "23,789", number: "#14" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 13", date: "jun 10, 2024", like: "23,789", number: "#13" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 12", date: "jun 10, 2024", like: "23,789", number: "#12" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 11", date: "jun 10, 2024", like: "23,789", number: "#11" },
    { id: 6, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 10", date: "jun 10, 2024", like: "23,789", number: "#10" },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 9", date: "jun 10, 2024", like: "23,789", number: "#9" },
    { id: 8, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 8", date: "jun 10, 2024", like: "23,789", number: "#8" },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 7", date: "jun 10, 2024", like: "23,789", number: "#7" },
    { id: 10, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 6", date: "jun 10, 2024", like: "23,789", number: "#6" },
    { id: 11, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 5", date: "jun 10, 2024", like: "23,789", number: "#5" },
    { id: 12, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 4", date: "jun 10, 2024", like: "23,789", number: "#4" },
    { id: 13, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 3", date: "jun 10, 2024", like: "23,789", number: "#3" },
    { id: 14, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 2", date: "jun 10, 2024", like: "23,789", number: "#2" },
    { id: 15, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", name: "Episode 1", date: "jun 10, 2024", like: "23,789", number: "#1" },
];

const OriginalSeriesPage = () => {
    return (
        <div>
            <HeaderPage />

            <div className="w-full h-full bg-gray-100">
                <div className="w-full h-[320px] bg-green-200">

                </div>

                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[1200px] h-full flex bg-white">
                        <div className="w-8/12 h-full border-r-2 px-5 pt-5 pb-10">
                            {/* danh sach series */}
                            <ul className="w-full h-full ">
                                {/* khung danh sách */}
                                {dataSeries.map(item => (
                                    <li className="w-full h-[90px] border-b ">
                                        <div className="w-full h-full flex items-center">
                                            <div className="w-[80px] h-[80px]">
                                                <img
                                                    src={item.img}
                                                    alt="img"
                                                    key={item.id}
                                                    className="object-fill w-full h-full rounded-md"
                                                />
                                            </div>

                                            <div className="mr-auto ml-3">
                                                <span className="text-black text-md">
                                                    {item.name}
                                                </span>
                                            </div>

                                            <div className="ml-auto">
                                                <span className="text-gray-400 text-md">
                                                    {item.date}
                                                </span>
                                            </div>

                                            <div className="ml-auto">
                                                <span className="text-gray-400 text-md line-clamp-1">
                                                    {item.like}
                                                </span>
                                            </div>

                                            <div className="ml-auto">
                                                <span className="text-gray-400 text-md line-clamp-1">
                                                    {item.number}
                                                </span>
                                            </div>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-4/12 h-full">

                        </div>
                    </div>
                </div>
            </div>

            <FooterPage />
        </div>

    );
}

export default OriginalSeriesPage;
