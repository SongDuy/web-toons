import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dataListGenre from "../../../components/layout/layoutUser/dataListGenre";

import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';

import '../../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getAllComic } from '../../../common/store/comic';
import { getAllVideo } from '../../../common/store/Video';
import { getAccount } from '../../../common/store/Account';
import { auth } from '../../../common/themes/firebase';


const SearchPage = ({ closeModal }) => {

    // Mở và đóng modal tìm kiếm
    const [isSearch, setIsSearch] = useState(false);
    const comic = useSelector(state => state.comic.comic);
    const Video = useSelector(state => state.Video.video);
    const User = useSelector((state) => state.AuthJs.User);
    const check19Modal = useSelector(state => state.hidden.check19Modal);

    const dispatch = useDispatch();

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {

            setIsSearch(true);

            setTimeout(() => {
                closeModal(); // Gọi hàm closeModal khi nhấp vào nền
                setIsSearch(false);
            }, 800);
        }
    };
    useEffect(() => {
        const getComicsAndVideos = async () => {
            try {
                if (User) {
                    const account = await dispatch(getAccount(auth?.currentUser?.uid));

                    const user = unwrapResult(account);
                    if (user?.checkage) {
                        const age = account?.payload?.birthday
                            ? new Date(Date.now())?.getFullYear() -
                            new Date(user.birthday)?.getFullYear()
                            : 15;
                        const comic = await dispatch(getAllComic(age));
                        const video = await dispatch(getAllVideo(age));

                        unwrapResult(comic);
                        unwrapResult(video);
                    } else {
                        const comic = await dispatch(getAllComic());
                        const video = await dispatch(getAllVideo());
                        unwrapResult(comic);
                        unwrapResult(video);
                    }
                } else {
                    const comic = await dispatch(getAllComic());
                    const video = await dispatch(getAllVideo());
                    unwrapResult(comic);
                    unwrapResult(video);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getComicsAndVideos();
    }, [dispatch, User,check19Modal]);


    // Hiển thị nội dung giống nội dung cần tìm
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const listComics = comic.comic?.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
        //|| item.auth.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const showNoResultsComicMessage = (searchTerm.trim() !== '' && listComics?.length === 0) || searchTerm.trim() === '';

    const listVideos = Video.Video?.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
        //|| item.auth.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const showNoResultsVideoMessage = (searchTerm.trim() !== '' && listVideos?.length === 0) || searchTerm.trim() === '';

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    // chọn loại tìm kiếm truyện hoặc video
    const [activeButton, setActiveButton] = useState('originals');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div className="w-screen h-screen bg-black bg-opacity-50 flex fixed inset-0 z-50 " onClick={handleBackdropClick}>

            <div
                className={`w-[450px] h-screen pl-3 pr-8 py-3 ml-auto bg-gray-50 relative  ${!isSearch ? "slide-in" : "slide-out"} `}
            >
                {/* nút tắt tìm kiếm */}
                <button
                    className="w-[35px] h-[35px] z-50 bg-red-200 flex ml-auto hover:text-white rounded-md"
                    onClick={handleBackdropClick}
                >
                    <span
                        className="w-full h-full z-10 flex items-center justify-center"
                        onClick={handleBackdropClick}
                    >
                        <CloseIcon onClick={handleBackdropClick} sx={{ fontSize: 25 }} />
                    </span>

                </button>

                {/* Ô tìm kiếm */}
                <div className="w-full mt-5 mb-3">
                    <input
                        className="w-full h-[35px] px-2 border-2 rounded-md"
                        onChange={handleSearch}
                        placeholder={!language ? "Search..." : "검색..."}
                    />

                    {/* Chọn loại truyện hoặc video */}
                    <div className="w-full mt-5 flex items-center justify-center gap-4">
                        <button
                            className={`w-1/2 h-[35px] font-semibold rounded ${activeButton === 'originals' ? 'bg-black text-white' : 'bg-gray-200'}`}
                            onClick={() => handleButtonClick('originals')}
                        >
                            {!language ?
                                "Originals"
                                :
                                "오리지널"
                            }
                        </button>
                        <button
                            className={`w-1/2 h-[35px] font-semibold rounded ${activeButton === 'videos' ? 'bg-black text-white' : 'bg-gray-200'}`}
                            onClick={() => handleButtonClick('videos')}
                        >
                            {!language ?
                                "Videos"
                                :
                                "비디오"
                            }

                        </button>
                    </div>
                </div>

                {/* Danh sách nội dung phù hợp cần tìm */}
                {activeButton === "originals" ? (
                    <div className="w-full h-[630px] custom-scrollbar">
                        <ul className="grid grid-cols-1">
                            {showNoResultsComicMessage ? (
                                <div className="w-full h-full mt-10 flex items-center justify-center ">
                                    <span className="text-gray-500">
                                        {!language ?
                                            "No related comic results found."
                                            :
                                            "관련된 만화 결과를 찾을 수 없습니다."
                                        }
                                    </span>
                                </div>
                            ) : (
                                listComics?.map(item => (
                                    <Link to={`/originals/original/series/${item.id}`} key={item.id} onClick={handleBackdropClick}>
                                        <li className="w-full h-[90px] hover:bg-gray-100 flex items-center border-t border-b cursor-pointer">

                                            <div className="w-[80px] h-[80px] rounded">
                                                <img
                                                    src={item.squareThumbnail}
                                                    alt="img"
                                                    className="object-fill min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] rounded"
                                                />
                                            </div>

                                            <div className="h-full rounded-xl px-3 py-3 flex items-center">
                                                <div className="w-auto overflow-hidden ">
                                                    <span className="w-full text-[15px] font-semibold line-clamp-1">
                                                        {item.title}
                                                    </span>
                                                    <div className="w-full">
                                                        {item.genre1 === item.genre2 ?
                                                            <div className="flex">
                                                                <span className="w-auto pr-2 border-r-2 line-clamp-1">
                                                                    {item.Author}
                                                                </span>
                                                                <span className="max-w-full px-2 border-l line-clamp-1">
                                                                    {!language ? item.genre1 : dataListGenre?.filter(itm => itm.name.toLowerCase() === item.genre1.toLowerCase())[0]?.nameKorean}
                                                                </span>
                                                            </div>
                                                            :
                                                            <div className="flex">
                                                                <span className="w-auto pr-2 border-r-2 line-clamp-1">
                                                                    {item.Author}
                                                                </span>
                                                                <span className="max-w-full px-2 border-l line-clamp-1">
                                                                    {!language ? item.genre1 : dataListGenre?.filter(itm => itm.name.toLowerCase() === item.genre1.toLowerCase())[0]?.nameKorean}
                                                                    {`, `}
                                                                    {!language ? item.genre2 : dataListGenre?.filter(itm => itm.name.toLowerCase() === item.genre2.toLowerCase())[0]?.nameKorean}
                                                                </span>
                                                            </div>
                                                        }
                                                    </div>
                                                    <span className="w-full text-[15px] text-yellow-500 flex items-center gap-1 font-semibold line-clamp-1">
                                                        <StarIcon />
                                                        {item.totalSubscribed}
                                                    </span>
                                                </div>

                                            </div>
                                        </li>
                                    </Link>
                                ))
                            )}
                        </ul>
                    </div>
                ) : activeButton === "videos" ? (
                    // hiện thị danh sách videos
                    <div className="w-full h-[630px] custom-scrollbar">
                        <ul className="grid grid-cols-1">
                            {showNoResultsVideoMessage ? (
                                <div className="w-full h-full mt-10 flex items-center justify-center ">
                                    <span className="text-gray-500">
                                        {!language ?
                                            "No related video results found."
                                            :
                                            "관련된 비디오 결과를 찾을 수 없습니다."
                                        }
                                    </span>
                                </div>
                            ) : (
                                listVideos?.map(item => (
                                    <Link to={`/videos/video/series/${item.id}`} key={item.id} onClick={handleBackdropClick}>
                                        <li className="w-full h-[90px] hover:bg-gray-100 flex items-center border-t border-b cursor-pointer">

                                            <div className="w-[80px] h-[80px] rounded">
                                                <img
                                                    src={item.squareThumbnail}
                                                    alt="img"
                                                    className="object-fill min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px]  rounded"
                                                />
                                            </div>

                                            <div className="h-full rounded-xl px-3 py-3 flex items-center">
                                                <div className="w-auto overflow-hidden ">
                                                    <span className="w-full text-[15px] font-semibold line-clamp-1">
                                                        {item.title}
                                                    </span>
                                                    <div className="flex">
                                                        <span className="max-w-[150px] pr-2 border-r-2 line-clamp-1">
                                                            {item.Author}
                                                        </span>
                                                        {/* <span className="max-w-[110px] px-2 border-l line-clamp-1">
                                                            {item.genre1}
                                                        </span> */}
                                                    </div>
                                                    <span className="w-full text-[15px] text-yellow-500 flex items-center gap-1 font-semibold line-clamp-1">
                                                        <StarIcon />
                                                        {item.totalSubscribed}
                                                    </span>
                                                </div>

                                            </div>
                                        </li>
                                    </Link>
                                ))
                            )}
                        </ul>
                    </div>
                ) : null};

            </div>

        </div>
    );
}

export default SearchPage;
