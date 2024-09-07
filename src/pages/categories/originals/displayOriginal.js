import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../img/logonew.png';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckIcon from '@mui/icons-material/Check';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { AddComment, getidseries } from '../../../common/store/Comment';
import { setIsLoginModal } from '../../../common/store/hidden';
import LoginPage from '../../auth/login';
import { auth } from '../../../common/themes/firebase';
import { getAccount } from '../../../common/store/Account';
const dataPopular = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "1", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "2", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "3", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "4", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "5", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
];

const dataFavorite = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 1" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 2" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 3" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 4" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 5" },
    { id: 6, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 6" },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 7" },
    { id: 8, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 8" },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 9" },
    { id: 10, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 10" },
    { id: 11, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 11" },
    { id: 12, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 12" },
    { id: 13, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 13" },
    { id: 14, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 14" },
    { id: 15, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Episode 15" },
]

const DisplayOriginalPage = () => {
    const id = useParams();
    const [getcomment, setComment] = useState('');
    const gcomment = useSelector(state => state.Comment.comment);
    const isLoginModal = useSelector(state => state.hidden.isLoginModal);

    //Xem các tập tiếp theo trong series
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();

    const itemsPerPage = 9;
    const totalItems = dataFavorite.length;
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    useEffect(() => {
        const getcomments = async () => {
            try {
                const comments = await dispatch(getidseries(id.idseries))
                unwrapResult(comments)
            } catch (error) {

            }
        }
        getcomments()
    }, [dispatch, id]);
    const handleNextPage = () => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage < totalPages ? nextPage : currentPage);
    };

    const handlePreviousPage = () => {
        const previousPage = currentPage - 1;
        setCurrentPage(previousPage >= 0 ? previousPage : 0);
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentItems = dataFavorite.slice(startIndex, endIndex);
    const closeLoginModal = () => {
        dispatch(setIsLoginModal(false));
    };

    //new
    const handleComment = async () => {
        try {
            if (auth?.currentUser) {
                const account = await dispatch(getAccount(auth?.currentUser?.uid));
                const getacc = unwrapResult(account)
                const data = {
                    comment: getcomment,
                    createTime: new Date(Date.now()),
                    like: 0,
                    type: 'comic',
                    dislike: 0,
                    id: id.idseries,
                    uid: auth?.currentUser?.uid,
                    replies: 0,
                    nameUser: getacc?.name

                }
                const comment = await dispatch(AddComment(data))
                unwrapResult(comment)
                setComment('')
            }
            else {
                dispatch(setIsLoginModal(true));
                setComment('')

            }
        } catch (error) {
            console.log(error)
        }
    }
    const handlelike = (id) => {

    }
    const handledislike = (id) => { }
    return (
        <div>
            <div className="w-full h-full bg-white">

                {/* Thanh công cụ */}
                <div className="w-full h-[50px] px-5 bg-black flex items-center">
                    <ul className="w-full h-[30px] flex">

                        <li className="w-[550px] flex gap-2 items-center overflow-hidden">

                            <div>
                                <img src={logo} alt="Logo của website" className="w-[40px] h-auto rounded-md bg-white" />

                            </div>

                            <div className="">
                                <span className="text-white line-clamp-1">
                                    Peace Restaurant
                                    <NavigateNextIcon />
                                    Episode 15
                                </span>
                            </div>
                        </li>

                        <li className="w-[150px] flex items-center justify-center mx-[100px]">
                            <div className="mr-auto cursor-pointer">
                                <span className="text-white bg-gray-800 hover:bg-gray-700 pl-3 py-1 rounded-md flex items-center justify-center">
                                    <ArrowBackIosIcon />
                                </span>
                            </div>
                            <div className="w-full ml-auto mr-auto">
                                <span className="w-full rounded-md py-1 flex items-center justify-center text-white">
                                    #15
                                </span>
                            </div>
                            <div className="ml-auto cursor-pointer">
                                <span className="text-white bg-gray-800 hover:bg-gray-700 w-[35px] py-1 rounded-md flex items-center justify-center">
                                    <ArrowForwardIosIcon />
                                </span>
                            </div>
                        </li>

                        <li className="ml-auto">
                            <div className="w-[30px] h-[30px] rounded-full bg-gray-800 flex items-center justify-center">
                                <span className=" text-white">
                                    <AddIcon />
                                </span>
                            </div>
                        </li>

                    </ul>
                </div>

                {/* Hiển thị nội dung truyện */}
                <div className="w-full h-full bg-white flex items-center justify-center">
                    <div className="w-[1200px] h-full">
                        <img src="https://wallpaperaccess.com/full/8438929.jpg"
                            className="object-contain w-full h-full mb-3"
                            alt="img"
                        />

                        <img src="https://i.pinimg.com/736x/44/9b/93/449b9398ad70f783259f7b7c154e9a49.jpg"
                            className="object-contain w-full h-full mb-3"
                            alt="img"
                        />

                        <img src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs3/195156941/original/a6a2cbfcc654919071c77a20f889b09b7208ad29/create-a-manga-background-from-your-photo.jpg"
                            className="object-contain w-full h-full mb-3"
                            alt="img"
                        />

                    </div>
                </div>

                {/* Hiển thị yêu thích, theo dõi */}
                <div className="w-full h-[200px] bg-white flex items-center justify-center">
                    <div>
                        <div className="flex gap-3 pb-3">
                            <span className="w-[35px] h-[35px] uppercase bg-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                Up
                            </span>
                            <span className="text-xl font-semibold flex items-center">
                                EVERY MONDAY
                            </span>
                        </div>

                        <div className="flex-auto mb-3">
                            <span className="flex items-center justify-center text-yellow-800 font-semibold">
                                Creator
                            </span>
                            <span className="flex items-center justify-center text-yellow-600 text-lg font-semibold">
                                Lee Nakeum , seewater
                            </span>
                        </div>

                        <div className="flex gap-3">
                            <button className="w-[100px] h-[35px] rounded-full bg-gray-100 hover:bg-gray-200 flex gap-1 items-center justify-center px-2 py-2">
                                <FavoriteBorderIcon />
                                9,455
                            </button>
                            <button className="w-[120px] h-[35px] rounded-full bg-gray-100 hover:bg-gray-200 flex gap-1 items-center justify-center px-2 py-2">
                                <AddIcon />
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                {/* Hiển thị các tập trong series */}
                <div className="w-full h-[220px] bg-gray-100 flex items-center justify-center">
                    <div
                        className="w-[35px] h-[100px] cursor-pointer border bg-red-100 hover:shadow-md rounded-md mx-3 flex items-center justify-center"
                        onClick={handlePreviousPage}
                    >
                        <span className="ml-2 hover:text-white">
                            <ArrowBackIosIcon />
                        </span>

                    </div>

                    <ul className="grid grid-cols-9">
                        {currentItems.map(item => (
                            <li
                                className="w-[120px] h-[165px] py-2 cursor-pointer rounded-md hover:bg-gray-200 flex items-center justify-center overflow-hidden"
                                key={item.id}
                            >
                                <div className="w-[100px] h-[100px] mb-auto">
                                    <img
                                        src={item.img}
                                        alt="img"
                                        className="object-fill w-full h-full rounded"
                                    />
                                    <span className="h-[50px] leading-[1.3] line-clamp-2 py-1">
                                        {item.name}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div
                        className="w-[35px] h-[100px] cursor-pointer border bg-red-100 hover:shadow-md rounded-md mx-3 flex items-center justify-center"
                        onClick={handleNextPage}
                    >
                        <span className="hover:text-white">
                            <ArrowForwardIosIcon />
                        </span>
                    </div>
                </div>

                {/* Hiển thị bình luận và danh sách truyện nổi bật */}
                <div className="w-full h-full flex items-center justify-center my-5">
                    <div className="w-[1200px] h-full flex bg-white pt-5 pb-10">

                        {/* Bảng hiện thị bình luận */}
                        <div className="w-8/12 h-full px-2">
                            <div className="w-full px-2 pr-5">

                                <div className="flex items-center pb-2">
                                    <span className="font-semibold text-lg">
                                        Comments
                                    </span>
                                    <span className="px-2 text-gray-400">2,907</span>
                                </div>

                                {/* Ô nhập bình luận */}
                                <div className="w-full h-full my-3">
                                    <textarea
                                        placeholder="Leave a comment"
                                        value={getcomment}
                                        className="w-full h-[160px] rounded-md px-3 py-3 border-2"
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                    <button onClick={handleComment} className="px-3 py-2 ml-auto bg-green-500 hover:shadow-md text-white rounded-xl flex gap-2 items-center justify-center">
                                        <SendRoundedIcon className="transform rotate-200" />
                                        Send
                                    </button>
                                </div>

                                {/* Hiển thị danh sách các bình luận truyện */}
                                <div className="w-full h-full my-5 ">
                                    <div className="px-3">
                                        <ul className="flex gap-2">
                                            <li className="px-5 py-5 cursor-pointer hover:text-green-500 border-b-2">
                                                <span className="font-semibold">
                                                    TOP
                                                </span>
                                            </li>
                                            <li className="px-5 py-5 cursor-pointer hover:text-green-500">
                                                <span className="font-semibold">
                                                    NEWEST
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="w-full py-3">
                                        <ul>
                                            {gcomment?.Comment?.map(item => (
                                                <li
                                                    className="w-full h-[200px] rounded-md px-3 border-b bg-red-50 bg-opacity-50 my-2"
                                                    key={item.idcomment}
                                                >
                                                    <div className="w-full h-full">

                                                        {/* Hiển thị tên user và ngày đăng bình luận */}
                                                        <div className="w-full py-1 flex overflow-hidden">
                                                            <span className="max-w-[500px] font-semibold line-clamp-1">
                                                                {item.nameUser}
                                                            </span>
                                                            <span className="text-gray-400 mx-2 line-clamp-1">
                                                                {monthNames[new Date(item.createTime).getMonth()]} {new Date(item.createTime).getDate()},
                                                                {new Date(item.createTime)?.getFullYear()}
                                                            </span>
                                                        </div>

                                                        {/* Hiển thị nội dung bình luận */}
                                                        <div className="h-[120px] px-2 custom-scrollbar">
                                                            <span className="">
                                                                {item.comment}
                                                            </span>
                                                        </div>

                                                        {/* Nút bình luận, thích, không thích */}
                                                        <div className="w-full flex gap-2 py-1">
                                                            <button className="px-2 py-1 mr-auto border rounded-md hover:bg-gray-100 flex items-center justify-center">
                                                                Replies {item.replies}
                                                            </button>
                                                            <button className="px-2 py-1  ml-auto border rounded-md gap-2 hover:bg-gray-100 flex items-center justify-center" onClick={() => handlelike(item.id)}>
                                                                <ThumbUpIcon className="text-gray-400" />
                                                                {item.like}
                                                            </button>
                                                            <button className="px-2 py-1  border rounded-md gap-2 hover:bg-gray-100 flex items-center justify-center" onClick={() => handledislike(item.id)}>
                                                                <ThumbDownIcon className="text-gray-400" />
                                                                {item.dislike}
                                                            </button>
                                                        </div>

                                                    </div>
                                                </li>
                                            ))}


                                        </ul>

                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* Bảng danh sách đề xuất */}
                        <div className="w-4/12 h-full bg-white px-2">
                            <div className="w-full h-full mb-8">
                                <div className="flex items-center pb-2">
                                    <span className="px-2 font-semibold text-lg hover:text-green-500 cursor-pointer">
                                        New & Trending
                                        <NavigateNextIcon />
                                    </span>
                                </div>

                                <ul className="w-full h-full py-2">
                                    {/* khung nội dung */}
                                    {dataPopular.map(item => (
                                        <Link to={`/originals/original/series`}>
                                            <li
                                                className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                                key={item.id}
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
                                        </Link>
                                    ))}

                                </ul>
                            </div>

                            <div className="w-full h-full mt-8">
                                <div className="flex items-center pb-2">
                                    <span className="px-2 font-semibold text-lg hover:text-green-500 cursor-pointer">
                                        ORIGINALS by Genre
                                        <NavigateNextIcon />
                                    </span>
                                    <span className="ml-auto text-green-500 cursor-pointer mr-2">
                                        ALL
                                    </span>
                                    <span className="text-green-500 cursor-pointer">
                                        <CheckIcon />
                                    </span>
                                </div>

                                <ul className="w-full h-full py-2">
                                    {/* khung nội dung */}
                                    {dataPopular.map(item => (
                                        <Link to={`/originals/original/series`}>
                                            <li
                                                className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                                key={item.id}
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
                                        </Link>
                                    ))}

                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {isLoginModal && <LoginPage closeModal={closeLoginModal} />}

        </div>

    );
}

export default DisplayOriginalPage;
