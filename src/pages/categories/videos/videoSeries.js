import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/Check';

const dataSeries = [
    { id: 1, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 15", date: "jun 10, 2024", like: "23,789", number: "#15" },
    { id: 2, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 14", date: "jun 10, 2024", like: "23,789", number: "#14" },
    { id: 3, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 13", date: "jun 10, 2024", like: "23,789", number: "#13" },
    { id: 4, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 12", date: "jun 10, 2024", like: "23,789", number: "#12" },
    { id: 5, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 11", date: "jun 10, 2024", like: "23,789", number: "#11" },
    { id: 6, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 10", date: "jun 10, 2024", like: "23,789", number: "#10" },
    { id: 7, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 9", date: "jun 10, 2024", like: "23,789", number: "#9" },
    { id: 8, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 8", date: "jun 10, 2024", like: "23,789", number: "#8" },
    { id: 9, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 7", date: "jun 10, 2024", like: "23,789", number: "#7" },
    { id: 10, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 6", date: "jun 10, 2024", like: "23,789", number: "#6" },
    { id: 11, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 5", date: "jun 10, 2024", like: "23,789", number: "#5" },
    { id: 12, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 4", date: "jun 10, 2024", like: "23,789", number: "#4" },
    { id: 13, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 3", date: "jun 10, 2024", like: "23,789", number: "#3" },
    { id: 14, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 2", date: "jun 10, 2024", like: "23,789", number: "#2" },
    { id: 15, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=1697281891410", name: "Episode 1", date: "jun 10, 2024", like: "23,789", number: "#1" },
];

const dataAlsoLike = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 6, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 8, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
];

const VideoSeriesPage = () => {

    // Nhấn nút đăng ký
    const [isSubscribe, setIsSubscribe] = useState(false);

    return (
        <div>

            <div className="w-full h-full bg-gradient-to-b from-white via-yellow-50 to-gray-100">
                {/* Hiển thị ảnh nền */}

                <div className="w-full flex items-center justify-center">
                    <div className="w-[1200px] h-[320px] relative ">

                        <img src="https://i.redd.it/0hwfsqufm3w41.jpg"
                            className="object-cover w-full h-full rounded-t" alt="img"
                        />

                        {/* Hiện thị tiêu đề và tác giả truyện */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[1200px] overflow-hidden">
                                <span className="font-semibold text-xl text-black text-shadow-white flex items-center justify-center">
                                    Action
                                </span>

                                <span className="max-h-[190px] px-[100px] font-semibold my-5 text-[50px] text-white text-shadow-black leading-[1.2] line-clamp-3 flex justify-center">
                                    The Witcher
                                </span>

                                <Link to="/channel/creator">
                                    <div class="w-full flex items-center justify-center gap-2">
                                        <div className="w-[250px] px-2 rounded-md overflow-hidden flex items-center justify-center gap-2">
                                            <span className="text-lg font-semibold text-yellow-500 hover:text-yellow-600 text-shadow-black line-clamp-1">
                                                Lee Nakeum , seewater
                                            </span>
                                            <button className="w-[20px] h-[20px] bg-white rounded-full text-black flex items-center justify-center">
                                                i
                                            </button>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        </div>

                        {/* Nút đăng ký theo dõi */}
                        <div className="absolute px-10 py-5 bottom-0 right-0 flex gap-2">
                            {!isSubscribe ?
                                <button
                                    onClick={() => setIsSubscribe(true)}
                                    className="text-white hover:text-yellow-500 bg-black bg-opacity-30 py-2 px-2 rounded-full flex gap-1 items-center justify-center"
                                >
                                    <AddCircleOutlineIcon />
                                    Subscribe
                                </button>
                                :
                                <button
                                    onClick={() => setIsSubscribe(false)}
                                    className="text-white hover:text-yellow-500 bg-black bg-opacity-30 py-2 px-2 rounded-full flex gap-1 items-center justify-center"
                                >
                                    <CheckIcon />
                                </button>
                            }
                        </div>

                    </div>
                </div>

                {/* <div className="w-full h-[320px] relative flex items-center justify-center">

                    <img src="https://i.redd.it/0hwfsqufm3w41.jpg"
                        className="object-cover w-[1200px] h-full rounded-t" alt="img"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[1200px] overflow-hidden">
                            <span className="font-semibold text-xl text-black text-shadow-white flex items-center justify-center">
                                Action
                            </span>

                            <span className="font-semibold my-5 text-[50px] text-white text-shadow-black leading-[1.2] line-clamp-3 flex justify-center">
                                The Witcher
                            </span>
                            <Link to="/channel/creator">
                                <div class="w-full flex items-center justify-center gap-2">
                                    <div className="w-[250px] px-2 rounded-md overflow-hidden flex items-center justify-center gap-2">
                                        <span className="text-lg font-semibold text-yellow-500 hover:text-yellow-600 text-shadow-black line-clamp-1">
                                            Lee Nakeum , seewater
                                        </span>
                                        <button className="w-[20px] h-[20px] bg-white rounded-full text-black flex items-center justify-center">
                                            i
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div> */}

                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[1200px] h-full grid grid-cols-3 bg-white pt-6 pb-10 rounded-b">

                        <div className="col-span-2 h-full">
                            <div className="w-full px-5 pb-3">
                                <span className="font-semibold text-md">
                                    Series Video
                                </span>
                            </div>

                            <div className="w-full h-[900px] px-3 custom-scrollbar">
                                {/* danh sach series */}
                                <ul className="w-full h-full ">

                                    {/* khung danh sách */}
                                    {dataSeries.map(item => (
                                        <Link to={`/videos/video/series/display`}>
                                            <li
                                                key={item.id}
                                                className="w-full h-[90px] border-b rounded-lg cursor-pointer hover:bg-gray-100 px-2"
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
                                        </Link>
                                    ))}
                                </ul>
                            </div>

                        </div>

                        <div className="h-full px-5">

                            <div className="w-full mb-auto">
                                <ul className="grid grid-cols-4 gap-5">
                                    <li className="flex items-center justify-center">
                                        <span className="mx-1 text-yellow-500">
                                            <VisibilityIcon />
                                        </span>
                                        <span className="mx-1">
                                            8.5M
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-center" >
                                        <span className="mx-1 text-yellow-500">
                                            <GroupAddSharpIcon />
                                        </span>
                                        <span className="mx-1">
                                            450,229
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-center" >
                                        <span className="mx-1 text-yellow-500">
                                            <StarIcon />
                                        </span>
                                        <span className="mx-1">
                                            9.74
                                        </span>

                                    </li>
                                    <li className="flex items-center justify-center">
                                        <button className="w-[70px] h-[25px] rounded-full text-white bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 flex items-center justify-center">
                                            RATE
                                        </button>
                                    </li>

                                </ul>
                            </div>

                            <div className="w-full h-full">

                                <div className="flex gap-3 pt-5 pb-3">
                                    <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
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
                        <div className="w-full min-h-[160px] bg-white my-5 px-5 py-5 rounded-md">
                            <ul className="w-full h-full grid grid-cols-3 gap-3">

                                {/* khung danh sách */}
                                {dataAlsoLike.map(item => (
                                    <Link to={`/videos/video/series`}>
                                        <li
                                            className="w-[375px] h-[120px] flex bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200"
                                            key={item.id}
                                        >

                                            <div className="w-[120px] h-[120px] rounded flex items-center justify-center">
                                                <img
                                                    src={item.img}
                                                    alt="img"
                                                    className="object-fill w-[100px] h-[100px] rounded"
                                                />
                                            </div>

                                            <div className="h-full rounded-xl px-3 py-3">
                                                <div className="w-[230px] h-[75px] overflow-hidden">
                                                    <span className="w-full text-lg font-semibold leading-[1.2] line-clamp-2">
                                                        {item.name}
                                                    </span>
                                                    <span className="w-full line-clamp-1">
                                                        {item.auth}
                                                    </span>
                                                </div>

                                                <div className="w-full">
                                                    <span className=" flex gap-1 text-yellow-500">
                                                        <VisibilityIcon />
                                                        {item.look}
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

        </div>

    );
}

export default VideoSeriesPage;
