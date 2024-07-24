import React from 'react';

import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';

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

const handleVideoSeriesClick = () => {
    window.location.href = '/video/series';
};

const handleDisplayVideoClick = () => {
    window.location.href = '/video/series/display';
};

const VideoSeriesPage  = () => {
    return (
        <div>
        <HeaderPage />

        <div className="w-full h-full bg-gray-100">
            {/* Hiển thị ảnh  */}
            <div className="w-full h-[320px] bg-green-200">

            </div>

            <div className="w-full h-full flex items-center justify-center ">
                <div className="w-[1200px] h-full flex bg-white pt-5 pb-10">

                    <div className="w-8/12 h-full px-3 ">
                        <div className="w-full h-[900px] overflow-y-scroll">
                            {/* danh sach series */}
                            <ul className="w-full h-full ">

                                {/* khung danh sách */}
                                {dataSeries.map(item => (
                                    <li
                                        className="w-full h-[90px] border-b rounded-lg cursor-pointer hover:bg-gray-100 px-2"
                                        key={item.id}
                                        onClick={handleDisplayVideoClick}
                                    >
                                        <div className="w-full h-full flex items-center">
                                            <div className="w-[80px] h-[80px]">
                                                <img
                                                    src={item.img}
                                                    alt="img"

                                                    className="object-fill w-full h-full rounded-md"
                                                />
                                            </div>

                                            <div className="w-[350px] mr-auto ml-3 overflow-hidden">
                                                <span className="text-black text-md leading-[1.2] line-clamp-2">
                                                    {item.name}
                                                </span>
                                            </div>

                                            <div className="ml-auto">
                                                <span className="text-gray-400 text-md">
                                                    {item.date}
                                                </span>
                                            </div>

                                            <div className="ml-auto flex gap-1">
                                                <span className="text-gray-400">
                                                    <FavoriteBorderSharpIcon />
                                                </span>
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

                    </div>

                    <div className="w-4/12 h-full py-5 px-5">

                        <div className="w-full mb-auto">
                            <ul className="flex">
                                <li className="mr-auto mt-auto mb-auto">
                                    <span className="mx-1 text-green-500">
                                        <VisibilityIcon />
                                    </span>
                                    <span className="mx-1">
                                        8.5M
                                    </span>
                                </li>
                                <li className="ml-auto" >
                                    <span className="mx-1 text-green-500">
                                        <GroupAddSharpIcon />
                                    </span>
                                    <span className="mx-1">
                                        450,229
                                    </span>
                                </li>
                                <li className="ml-auto" >
                                    <span className="mx-1 text-green-500">
                                        <StarIcon />
                                    </span>
                                    <span className="mx-1">
                                        9.74
                                    </span>

                                </li>
                                <li className="ml-auto">
                                    <span className="w-full h-[35px] px-2 py-[1px] rounded-full text-white bg-green-500">
                                        RATE
                                    </span>
                                </li>

                            </ul>
                        </div>

                        <div className="w-full h-full">

                            <div className="flex gap-3 pt-10 pb-5">
                                <span className="w-[35px] h-[35px] uppercase bg-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                    Up
                                </span>
                                <span className="text-xl font-semibold flex items-center">
                                    EVERY MONDAY
                                </span>
                            </div>
                            <div className="w-full">
                                <span className="">
                                    The Etruscan Kingdom is stained with blood when the king’s illegitimate
                                    son Cesare conspires with his fiancée Ariadne to usurp the throne from
                                    his half-brother Alfonso. Despite Ariadne’s devotion to the new king,
                                    her faith is shattered when she is betrayed by him and eventually murdered
                                    by her own sister, who wishes to be queen. To her surprise, Ariadne finds
                                    herself sent back in time to her 17-year-old self. As she navigates the
                                    perils and opportunities of palace intrigue, Ariadne must make the most
                                    of her guile and grit to ensure that her tragic future does not repeat itself.
                                    
                                </span>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-full  py-10 flex items-center justify-center">
                <div className="w-[1200px] h-full ">
                    <div className="">
                        <span className="text-xl font-semibold">
                            You may also like
                        </span>
                    </div>
                    <div className="w-full h-[160px] bg-white my-5 px-5 py-5 rounded-md">
                        <ul className="flex items-center justify-center gap-3">
                            <li
                                className="w-1/3 h-[120px] flex bg-red-50 rounded-xl shadow-md cursor-pointer hover:bg-red-100"
                                onClick={handleVideoSeriesClick}
                            >
                                <div className="w-[120px] h-[120px] bg-green-200 rounded-xl">
                                    <img
                                        src="https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540"
                                        alt="img"
                                        className="object-fill w-full h-full rounded-xl"
                                    />
                                </div>
                                <div className="h-full rounded-xl px-3 py-3">
                                    <div className="w-[210px] h-[75px] overflow-hidden">
                                        <span className="w-full text-lg font-semibold leading-[1.2] line-clamp-2">
                                            The Mafia Nanny
                                        </span>
                                        <span className="w-full line-clamp-1">
                                            sh00 , Violet Matter
                                        </span>
                                    </div>

                                    <div className="w-full">
                                        <span className=" flex gap-1 text-green-500">
                                            <VisibilityIcon />
                                            88.8M
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li
                                className="w-1/3 h-[120px] flex bg-red-50 rounded-xl shadow-md cursor-pointer hover:bg-red-100"
                                onClick={handleVideoSeriesClick}
                            >
                                <div className="w-[120px] h-[120px] bg-green-200 rounded-xl">
                                    <img
                                        src="https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540"
                                        alt="img"
                                        className="object-fill w-full h-full rounded-xl"
                                    />
                                </div>
                                <div className="h-full rounded-xl px-3 py-3">
                                    <div className="w-[210px] h-[75px] overflow-hidden">
                                        <span className="w-full text-lg font-semibold leading-[1.2] line-clamp-2">
                                            The Mafia Nanny
                                        </span>
                                        <span className="w-full line-clamp-1">
                                            sh00 , Violet Matter
                                        </span>
                                    </div>

                                    <div className="w-full">
                                        <span className=" flex gap-1 text-green-500">
                                            <VisibilityIcon />
                                            88.8M
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li
                                className="w-1/3 h-[120px] flex bg-red-50 rounded-xl shadow-md cursor-pointer hover:bg-red-100"
                                onClick={handleVideoSeriesClick}
                            >
                                <div className="w-[120px] h-[120px] bg-green-200 rounded-xl">
                                    <img
                                        src="https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540"
                                        alt="img"
                                        className="object-fill w-full h-full rounded-xl"
                                    />
                                </div>

                                <div className="h-full rounded-xl px-3 py-3">
                                    <div className="w-[210px] h-[75px] overflow-hidden">
                                        <span className="w-full text-lg font-semibold leading-[1.2] line-clamp-2">
                                            The Mafia Nanny
                                        </span>
                                        <span className="w-full line-clamp-1">
                                            sh00 , Violet Matter
                                        </span>
                                    </div>

                                    <div className="w-full">
                                        <span className=" flex gap-1 text-green-500">
                                            <VisibilityIcon />
                                            88.8M
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

        <FooterPage />
    </div>

    );
}

export default VideoSeriesPage;
