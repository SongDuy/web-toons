import React from 'react';

const handleOriginalsClick = () => {
    window.location.href = '/originals';
};

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

const ContentPage = () => {

    return (
        <div className="w-full h-full bg-gray-100">
            <div className="w-full h-[500px] bg-green-200">

            </div>

            <div className="w-full h-[560px]">
                <div className="w-full h-[60px] bg-white shadow flex items-center justify-center">
                    <ul
                        className="flex"
                    >
                        <li
                            className="w-[150px] h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            Mon Day
                        </li>
                        <li
                            className="w-[120px] h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            Tue Day
                        </li>
                        <li
                            className="w-[120px] h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            Wed Day
                        </li>
                        <li
                            className="w-[120px] h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            Thu Day
                        </li>
                        <li
                            className="w-[120px] h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            Fri Day
                        </li>
                        <li
                            className="w-[120px] h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            Sat Day
                        </li>
                        <li
                            className="w-[120px] h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            Sun Day
                        </li>

                        <li
                            className="w-[120px] h-[60px] uppercase font-semibold text-lg text-gray-400 border-l-2 border-gray-200 hover:text-green-500 cursor-pointer flex items-center justify-center"
                            onClick={handleOriginalsClick}
                        >
                            More
                        </li>
                    </ul>
                </div>
                <div className="w-full h-[500px] flex items-center justify-center">
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

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>
                        ))}

                    </div>
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

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>
                        ))}

                    </div>
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

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>
                        ))}

                    </div>
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
                            GENRES
                        </li>

                    </ul>
                </div>
                <div className="w-full h-[500px] flex items-center justify-center">
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

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <div className="w-full h-[560px]">
                <div className="w-full h-[60px] bg-white shadow flex items-center justify-center">
                    <ul
                        className="flex"
                    >
                        <li
                            className="w-[350px] h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            New & Trending
                        </li>

                        <li
                            className="w-[350px] h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            Originals by Genre
                        </li>

                        <li
                            className="w-[350px] h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            Videos by Genre
                        </li>
                    </ul>
                </div>
                <div className="w-full h-[500px] flex items-center justify-center">
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

                                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-3 py-3">
                                    <span className="text-black text-lg font-semibold mb-auto mr-auto">Peace Restaurant</span>
                                    <span className="text-white text-sm font-semibold mt-auto mr-auto">Fantasy</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ContentPage;
