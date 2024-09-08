import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

const PopularOriginalsAndVideosPage = () => {
    const comic = useSelector(state => state.comic.comic);
    const filteredcomic = comic.comic?.sort((a, b) => a.totalSubscribed - b.totalSubscribed);
    const searchedcomic = comic.comic?.sort((a, b) => a.totalSubscribed - b.totalSubscribed);

    const dataPopular = [
        { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "1", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
        { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "2", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
        { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "3", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
        { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "4", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
        { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "5", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    ];

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    return (
        <div className="w-full min-h-[560px] bg-white">
            {/* Phần hiển thị các series truyện và video mới hạn cao */}
            <div className="w-full flex items-center justify-center">
                <div className="max-w-[1120px] 3xl:max-w-[1560px] h-full grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3 gap-x-10 gap-y-5 pb-[70px]">

                    {/* Phần hiển thị nội dung new & trending originals */}
                    <div className="w-full flex flex-wrap ">
                        {/* Phần tiêu đề */}
                        <div className="w-full px-2 py-5 flex items-center border-b">
                            <div className="mr-auto">
                                <span className="font-semibold text-lg hover:text-yellow-500 cursor-pointer">
                                    {!language ?
                                        <span>
                                            New & Trending Originals
                                        </span>
                                        :
                                        <span>
                                            원본의 새로운 기능
                                        </span>
                                    }

                                    <NavigateNextIcon />
                                </span>
                            </div>
                        </div>

                        {/* Phần nội dung */}
                        <div className="w-full h-full">
                            <ul className="w-full h-full ">
                                {/* khung nội dung */}
                                {filteredcomic?.slice(0, 5)?.map((item, index) => (
                                    <Link
                                        key={item.id}
                                        to={`/originals/original/series`}
                                    >
                                        <li
                                            className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                        >
                                            <div className="w-full h-full flex items-center">
                                                <div className="w-[80px] h-[80px] flex">
                                                    <img
                                                        src={item.squareThumbnail}
                                                        alt="img"
                                                        className="object-fill w-full h-full rounded-md"
                                                    />
                                                </div>

                                                <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2">
                                                    <span className="mx-3 text-xl text-white font-bold">
                                                        {index + 1}
                                                    </span>
                                                </div>

                                                <div className="w-[230px] mt-auto mb-auto overflow-hidden">
                                                    <span className="text-gray-400 text-sm">
                                                        {item.genre1}
                                                    </span>
                                                    <span className="text-md font-semibold line-clamp-1">
                                                        {item.title}

                                                    </span>
                                                    <span className="text-sm line-clamp-1">
                                                        {item.summary}
                                                    </span>
                                                </div>

                                            </div>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Phần hiển thị nội dung new & trending videos */}
                    <div className="w-full flex flex-wrap ">

                        {/* Phần tiêu đề */}
                        <div className="w-full px-2 py-5 flex items-center border-b">
                            <div className="mr-auto">
                                <span className="font-semibold text-lg hover:text-yellow-500 cursor-pointer">
                                    {!language ?
                                        <span>
                                            New & Trending Videos
                                        </span>
                                        :
                                        <span>
                                            새로운 동영상
                                        </span>
                                    }

                                    <NavigateNextIcon />
                                </span>
                            </div>
                        </div>

                        {/* Phần nội dung */}
                        <div className="w-full h-full">
                            <ul className="w-full h-full ">
                                {/* khung nội dung */}
                                {dataPopular.map(item => (
                                    <Link
                                        key={item.id}
                                        to={`/videos/video/series`}
                                    >
                                        <li
                                            className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
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

                    {/* Phần hiển thị các series truyện mới hạn cao theo thể loại */}
                    <div className="w-full flex flex-wrap ">
                        {/* Phần tiêu đề */}
                        <div className="w-full px-2 py-5 flex items-center border-b">
                            <span className="mr-auto font-semibold text-lg hover:text-yellow-500 cursor-pointer">
                                {!language ?
                                    <span>
                                        ORIGINALS by Genre
                                    </span>
                                    :
                                    <span>
                                        장르별 오리지널
                                    </span>
                                }

                                <NavigateNextIcon />
                            </span>
                            <span className="ml-auto flex gap-1 text-yellow-500 cursor-pointer">
                                ALL
                                <CheckIcon />
                            </span>
                        </div>

                        {/* Phần nội dung */}
                        <div className="w-full h-full">
                            <ul className="w-full h-full">
                                {/* khung nội dung */}
                                {searchedcomic?.slice(0, 5)?.map((item, index) => (
                                    <Link
                                        key={item.id}
                                        to={`/original/series`}
                                    >
                                        <li
                                            className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                        >
                                            <div className="w-full h-full flex items-center">
                                                <div className="w-[80px] h-[80px] flex">
                                                    <img
                                                        src={item.squareThumbnail}
                                                        alt="img"
                                                        className="object-fill w-full h-full rounded-md"
                                                    />
                                                </div>

                                                <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2">
                                                    <span className="mx-3 text-xl text-white font-bold">
                                                        {index + 1}
                                                    </span>
                                                </div>

                                                <div className="w-[230px] mt-auto mb-auto overflow-hidden">
                                                    <span className="text-gray-400 text-sm">
                                                        {item.genre1}
                                                    </span>
                                                    <span className="text-md font-semibold line-clamp-1">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-sm line-clamp-1">
                                                        {item.summary}
                                                    </span>
                                                </div>

                                            </div>
                                        </li>
                                    </Link>
                                ))}

                            </ul>
                        </div>
                    </div>

                    {/* Phần hiển thị các series truyện mới hạn cao theo thể loại */}
                    <div className="w-full flex flex-wrap ">

                        {/* Phần tiêu đề */}
                        <div className="w-full px-2 py-5 flex items-center border-b">
                            <span className="mr-auto font-semibold text-lg hover:text-yellow-500 cursor-pointer">
                                {!language ?
                                    <span>
                                        VIDEOS by Genre
                                    </span>
                                    :
                                    <span>
                                        장르별 동영상
                                    </span>
                                }

                                <NavigateNextIcon />
                            </span>
                            <span className="ml-auto flex gap-1 text-yellow-500 cursor-pointer">
                                ALL
                                <CheckIcon />
                            </span>
                        </div>

                        {/* Phần nội dung */}
                        <div className="w-full h-full">
                            <ul className="w-full h-full">
                                {/* khung nội dung */}
                                {dataPopular.map(item => (
                                    <Link
                                        key={item.id}
                                        to={`/videos/video/series`}
                                    >
                                        <li
                                            className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
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
            </div>

        </div >
    );
}

export default PopularOriginalsAndVideosPage;
