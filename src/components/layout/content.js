import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteIcon from '@mui/icons-material/Favorite';

const data = [
    { id: 1, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg" },
    { id: 2, img: "https://img.wattpad.com/721a6e37a916949236171d1d1a35115aeedb42f9/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6a476532674b3766494c764239413d3d2d3639383533393033302e313538366133663636313334373463663335313033383939323936362e6a7067" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 6, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 8, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
    { id: 10, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540" },
];

const dataPopular = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "1", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "2", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "3", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "4", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "5", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
];

const handleOriginalsClick = () => {
    window.location.href = '/originals';
};

const handleOriginalSeriesClick = () => {
    window.location.href = '/original/series';
};

const ContentPage = () => {

    return (
        <div className="w-full h-full bg-gray-100 mb-[50px]">
            <div className="w-full h-[500px] bg-green-200">

            </div>

            <div className="w-full h-[560px]">
                <div className="w-full h-[60px] bg-white shadow flex items-center justify-center">
                    <ul
                        className="flex"
                    >
                        <li
                            className="w-[120px] h-[60px] bg-green-500 text-white uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
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
                            className="w-[150px] h-[60px] uppercase font-semibold text-lg text-gray-400 border-l-2 border-gray-200 hover:text-green-500 cursor-pointer flex items-center justify-center"
                            onClick={handleOriginalsClick}
                        >
                            More
                            <NavigateNextIcon />
                        </li>
                    </ul>
                </div>
                <div className="w-full h-[500px] flex items-center justify-center">
                    <div className="grid grid-cols-5 gap-4">

                        {/* khung nội dung */}
                        {data.map(item => (
                            <div
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

                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <div className="w-full h-[560px]">
                <div className="w-full h-[60px] bg-white shadow flex items-center justify-center">
                    <ul
                        className="flex gap-[150px]"
                    >
                        <li
                            className="w-full h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            GENRES
                            <NavigateNextIcon />
                        </li>
                        <li
                            className="w-full h-[60px] uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                        >
                            ALL
                            <CheckIcon />
                        </li>
                    </ul>
                </div>
                <div className="w-full h-[500px] flex items-center justify-center">
                    <div className="grid grid-cols-5 gap-4">
                        {/* khung nội dung */}
                        {data.map(item => (
                            <div
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

                            </div>
                        ))}

                    </div>
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
                </div>
            </div>
        </div >
    );
}

export default ContentPage;
