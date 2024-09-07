import React, { useEffect, useState } from 'react';

import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/Check';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { useParams } from 'react-router-dom';
import { getchaptersComic, getidComic } from '../../../common/store/comic';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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


const OriginalSeriesPage = () => {
    const id = useParams();
    const comicid = useSelector(state => state.comic.comicid);
    const chapters = useSelector(state => state.comic.Chapters);
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    useEffect(() => {
        const get = async () => {
            try {
                setloading(false)
                const comicID = await dispatch(getidComic(id.id))
                const chap = await dispatch(getchaptersComic(id.id))
                unwrapResult(comicID)
                unwrapResult(chap)
                setloading(true)
            } catch (error) {

            }
        }
        get()
    }, [dispatch, id]);

    // Nhấn nút đăng ký
    const [isSubscribe, setIsSubscribe] = useState(false);

    return (
        <div>
            {loading ?
                <div className="w-full h-full bg-gradient-to-b from-white via-yellow-50 to-gray-100">
                    {/* Hiển thị ảnh nền */}
                    <div className="w-full flex items-center justify-center">
                        <div className="w-[1200px] h-[320px] relative ">

                            <img src={comicid.horizontalThumbnail}
                                className="object-cover w-full h-full rounded-t" alt="img"
                            />

                            {/* Hiện thị tiêu đề và tác giả truyện */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[1200px] overflow-hidden">
                                    <span className="font-semibold text-xl text-black text-shadow-white flex items-center justify-center">
                                        {comicid.genre1}
                                    </span>

                                    <span className="max-h-[190px] px-[100px] font-semibold my-5 text-[50px] text-white text-shadow-black leading-[1.2] line-clamp-3 flex justify-center">
                                        {comicid.title}
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

                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-[1200px] h-full grid grid-cols-3 bg-white pt-6 pb-10 rounded-b">

                            <div className="col-span-2 h-full">

                                <div className="w-full px-5 pb-3">
                                    <span className="font-semibold text-md">
                                        Series Original
                                    </span>
                                </div>

                                <div className="w-full h-[900px] px-3 custom-scrollbar">

                                    {/* danh sach series */}
                                    <ul className="w-full h-full ">

                                        {/* khung danh sách */}
                                        {chapters.chaps.map(item => (
                                            <Link to={`/originals/original/series/display/${id.id}/${item.id}`} key={item.id}>
                                                <li
                                                    className="w-full h-[90px] border-b rounded-lg cursor-pointer hover:bg-gray-100 px-2"
                                                >
                                                    <div className="w-full h-full flex items-center">
                                                        <div className="w-[80px] h-[80px]">
                                                            <img
                                                                src={item.horizontalThumbnail}
                                                                alt="img"

                                                                className="object-fill w-full h-full rounded-md"
                                                            />
                                                        </div>

                                                        <div className="w-[350px] mr-auto ml-3 overflow-hidden">
                                                            <span className="text-black text-md leading-[1.2] line-clamp-2">
                                                                {item.chapterTitle}
                                                            </span>
                                                        </div>

                                                        <div className="ml-auto">
                                                            <span className="text-gray-400 text-md">
                                                                {monthNames[new Date(item.createTime).getMonth()]} {new Date(item.createTime).getDate()},
                                                                {new Date(item.createTime)?.getFullYear()}

                                                            </span>
                                                        </div>

                                                        <div className="ml-auto flex gap-1">
                                                            <span className="text-gray-400">
                                                                <FavoriteBorderSharpIcon />
                                                            </span>
                                                            <span className="text-gray-400 text-md line-clamp-1">
                                                                {item.likes}
                                                            </span>
                                                        </div>

                                                        <div className="ml-auto">
                                                            <span className="text-gray-400 text-md line-clamp-1">
                                                                {item.num}#
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
                                            <button className="w-[70px] h-[25px] rounded-full text-white bg-yellow-500 flex items-center justify-center">
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

                    {/* Phần hiển thị nội dung có thể bạn sẽ thích */}
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
                                        <Link to={`/originals/original/series`} key={item.id}>
                                            <li
                                                className="w-[375px] h-[120px] flex bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200"
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
                : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                    <CircularProgress />
                </Box>}
        </div>

    );
}

export default OriginalSeriesPage;
