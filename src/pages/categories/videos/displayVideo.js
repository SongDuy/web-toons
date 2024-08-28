import React, { useState } from 'react';
import ReactPlayer from 'react-player';
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

const dataPopular = [
    { id: 1, img: "https://sudospaces.com/babycuatoi/2022/10/zk1029-xe-choi-chan-con-sau-tinh-nghich-larva-2.jpg", number: "1", genre: "Fantasy", name: "Larva", auth: "Lee Nakeum , seewater" },
    { id: 2, img: "https://sudospaces.com/babycuatoi/2022/10/zk1029-xe-choi-chan-con-sau-tinh-nghich-larva-2.jpg", number: "2", genre: "Fantasy", name: "Larva", auth: "Lee Nakeum , seewater" },
    { id: 3, img: "https://sudospaces.com/babycuatoi/2022/10/zk1029-xe-choi-chan-con-sau-tinh-nghich-larva-2.jpg", number: "3", genre: "Fantasy", name: "Larva", auth: "Lee Nakeum , seewater" },
    { id: 4, img: "https://sudospaces.com/babycuatoi/2022/10/zk1029-xe-choi-chan-con-sau-tinh-nghich-larva-2.jpg", number: "4", genre: "Fantasy", name: "Larva", auth: "Lee Nakeum , seewater" },
    { id: 5, img: "https://sudospaces.com/babycuatoi/2022/10/zk1029-xe-choi-chan-con-sau-tinh-nghich-larva-2.jpg", number: "5", genre: "Fantasy", name: "Larva", auth: "Lee Nakeum , seewater" },
];

const dataFavorite = [
    { id: 1, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 1" },
    { id: 2, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 2" },
    { id: 3, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 3" },
    { id: 4, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 4" },
    { id: 5, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 5" },
    { id: 6, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 6" },
    { id: 7, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 7" },
    { id: 8, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 8" },
    { id: 9, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 9" },
    { id: 10, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 10" },
    { id: 11, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 11" },
    { id: 12, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 12" },
    { id: 13, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 13" },
    { id: 14, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 14" },
    { id: 15, img: "https://bizweb.dktcdn.net/100/488/040/products/the-witcher-3-wild-hunt-complete-edition-ps5.jpg?v=16972818914100", name: "Episode 15" },
]

const dataComment = [
    { id: 1, nameUser: "MustangQueen16", date: "Apr 09, 2024", content: "Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute Davina and Mikey’s dynamic is so cute ", replies: "10", like: "61665", dislike: "56" },
    { id: 2, nameUser: "MustangQueen16", date: "Apr 09, 2024", content: "Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Da Davina and Mikey’s dynamic is so cute", replies: "10", like: "61665", dislike: "56" },
    { id: 3, nameUser: "MustangQueen16", date: "Apr 09, 2024", content: "k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k vk k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k k vDavina and Mikey’s dynamic is so cute", replies: "10", like: "61665", dislike: "56" },
    { id: 4, nameUser: "MustangQueen16", date: "Apr 09, 2024", content: "Davina and Mikey’s dynamic is so cute", replies: "10", like: "61665", dislike: "56" },
    { id: 5, nameUser: "MustangQueen16", date: "Apr 09, 2024", content: "Davina and Mikey’s dynamic is so cute", replies: "10", like: "61665", dislike: "56" },
    { id: 6, nameUser: "MustangQueen16", date: "Apr 09, 2024", content: "Davina and Mikey’s dynamic is so cute", replies: "10", like: "61665", dislike: "56" },
    { id: 7, nameUser: "MustangQueen16", date: "Apr 09, 2024", content: "Davina and Mikey’s dynamic is so cute", replies: "10", like: "61665", dislike: "56" },
    { id: 8, nameUser: "MustangQueen16", date: "Apr 09, 2024", content: "Davina and Mikey’s dynamic is so cute", replies: "10", like: "61665", dislike: "56" },
    { id: 9, nameUser: "MustangQueen16", date: "Apr 09, 2024", content: "Davina and Mikey’s dynamic is so cute", replies: "10", like: "61665", dislike: "56" },
]

const DisplayVideoPage = () => {

    //Xem các tập tiếp theo trong series
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;
    const totalItems = dataFavorite.length;

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
                                    The Witcher
                                    <NavigateNextIcon />
                                    Episode 15
                                </span>
                            </div>
                        </li>

                        <li className="w-[150px] flex items-center justify-center mx-[100px]">
                            <div className="mr-auto cursor-pointer">
                                <span className="text-white bg-gray-900 hover:bg-gray-700 pl-3 py-1 rounded-md flex items-center justify-center">
                                    <ArrowBackIosIcon />
                                </span>
                            </div>
                            <div className="w-full ml-auto mr-auto">
                                <span className="w-full rounded-md py-1 flex items-center justify-center text-white">
                                    #15
                                </span>
                            </div>
                            <div className="ml-auto cursor-pointer">
                                <span className="text-white bg-gray-900 hover:bg-gray-700 w-[35px] py-1 rounded-md flex items-center justify-center">
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
                <div className="w-full h-[705px] bg-black flex items-center justify-center">
                    <ReactPlayer
                        url="https://youtu.be/-uF9NA5vhko?si=QrgoU83XhkLJsWej"
                        controls={true}
                        width="80%"
                        height="100%"
                    />
                </div>

                {/* Hiển thị chọn yêu thích, theo dõi */}
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
                                        className="w-full h-[160px] rounded-md px-3 py-3 border-2"
                                    />
                                    <button className="px-3 py-2 ml-auto bg-green-500 hover:shadow-md text-white rounded-xl flex gap-2 items-center justify-center">
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
                                            {dataComment.map(item => (
                                                <li
                                                    className="w-full h-[200px] rounded-md px-3 border-b bg-red-50 bg-opacity-50 my-2"
                                                    key={item.id}
                                                >
                                                    <div className="w-full h-full">

                                                        {/* Hiển thị tên user và ngày đăng bình luận */}
                                                        <div className="w-full py-1 flex overflow-hidden">
                                                            <span className="max-w-[500px] font-semibold line-clamp-1">
                                                                {item.nameUser}
                                                            </span>
                                                            <span className="text-gray-400 mx-2 line-clamp-1">
                                                                {item.date}
                                                            </span>
                                                        </div>

                                                        {/* Hiển thị nội dung bình luận */}
                                                        <div className="h-[120px] px-2 custom-scrollbar">
                                                            <span className="w-full">
                                                                {item.content}
                                                            </span>
                                                        </div>

                                                        {/* Nút bình luận, thích, không thích */}
                                                        <div className="w-full flex gap-2 py-1">
                                                            <button className="px-2 py-1 mr-auto border rounded-md hover:bg-gray-100 flex items-center justify-center">
                                                                Replies {item.replies}
                                                            </button>
                                                            <button className="px-2 py-1 px-1 ml-auto border rounded-md gap-2 hover:bg-gray-100 flex items-center justify-center">
                                                                <ThumbUpIcon className="text-gray-400" />
                                                                226
                                                            </button>
                                                            <button className="px-2 py-1 px-1 border rounded-md gap-2 hover:bg-gray-100 flex items-center justify-center">
                                                                <ThumbDownIcon className="text-gray-400" />
                                                                0
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
                                        <Link to={`/videos/video/series`}>
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
                                        Videos by Genre
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
                                        <Link to={`/videos/video/series`}>
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
        </div>

    );
}

export default DisplayVideoPage;
