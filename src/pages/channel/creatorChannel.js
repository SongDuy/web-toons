import React from 'react';

import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const dataPost = [
    { id: 1, img: "https://yamicomputer.com/image/data/anht11/hinh-nen-anime-5.jpg", img2: "https://top10tphcm.com/wp-content/uploads/2023/06/Hinh-anh-Anime-nu-de-thuong.jpg", auth: "Lee Nakeum , seewater", content: "I got some early Morgana and Oz copies! Can’t wait for the first volume to come out in September. You can pre-order it on Amazon and Barnes&Noble or anywhere else you like to buy books.", like: "205", comment: "100", date: "23/05/2024", },
    { id: 2, img: "https://9anime.vn/wp-content/uploads/2024/04/499-Hinh-Anh-Anime-Nu-Dep-Ngau-Cute-Dang-Yeu.jpg", img2: "https://cdn.aicschool.edu.vn/wp-content/uploads/2024/06/anh-avatar-anime-1.jpg", auth: "Lee Nakeum , seewater", content: "I got some early Morgana and Oz copies! Can’t wait for the first volume to come out in September. You can pre-order it on Amazon and Barnes&Noble or anywhere else you like to buy books.", like: "205", comment: "100", date: "23/05/2024", },
    { id: 3, img: "https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/anh-dai-dien-anime-nu-xinh-9.png", img2: "https://mega.com.vn/media/news/2306_hinh-nen-anime-nu-cho-dien-thoai1.jpg", auth: "Lee Nakeum , seewater", content: "I got some early Morgana and Oz copies! Can’t wait for the first volume to come out in September. You can pre-order it on Amazon and Barnes&Noble or anywhere else you like to buy books.", like: "205", comment: "100", date: "23/05/2024", },
    { id: 4, img: "https://cohousing.vn/wp-content/uploads/2023/08/nhung-hinh-anh-dep-cua-anime-co-the-dung-lam-hinh-nen.jpg", img2: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_12_11_638378641466845781_avatar-anime.jpg", auth: "Lee Nakeum , seewater", content: "I got some early Morgana and Oz copies! Can’t wait for the first volume to come out in September. You can pre-order it on Amazon and Barnes&Noble or anywhere else you like to buy books.", like: "205", comment: "100", date: "23/05/2024", },
];

const CreatorChannelPage = () => {
    return (
        <div className="w-full h-full pb-10 border bg-gray-100 flex items-center justify-center">
            <div className="w-[1120px] h-full">
                <div className="w-full h-full bg-white rounded-lg">
                    {/* Hiển thị ảnh nền */}
                    <div className="w-full h-[400px] bg-green-200 rounded-lg">
                        <img src="https://i.redd.it/b5jec682hfk61.jpg"
                            className="object-cover w-[1200px] h-full rounded-t-lg" alt="img"
                        />
                    </div>

                    {/* Hiển thị thông tin tác giả */}
                    <div className="w-full h-[180px] px-[30px] bg-white rounded-b-lg flex">
                        <div className="w-[185px] h-[185px] rounded-full border-4 mt-[-30px] flex items-center justify-center">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://taoanhdep.com/wp-content/uploads/2023/10/ai-350x265.jpg"
                                sx={{ width: 180, height: 180 }}
                            />
                        </div>

                        <div className="py-4 px-3">
                            <div className="">
                                <span className="text-[35px] font-semibold text-yellow-500 text-shadow-black">
                                    Lee Nakeum , seewater
                                </span>
                            </div>
                            <div className="px-1">
                                <span className="text-[18px] text-yellow-400 text-shadow-black">
                                    Commic, game
                                </span>
                            </div>
                            <div className="px-1 py-4 flex">
                                <span className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                                    Series Original : 2
                                </span>
                                <span className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                                    Series Video : 2
                                </span>
                                <span className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                                    Followers : 80,135
                                </span>
                            </div>
                        </div>

                        <div className="ml-auto flex items-center justify-center">
                            <button className="w-[120px] h-[50px] font-semibold text-white bg-green-400 hover:bg-green-500 rounded-xl">
                                Follow
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full flex gap-3 mt-3">

                    <div className="w-[420px] h-[1290px] grid grid-cols-1 gap-3">

                        {/* Khung hiển thị các liên kết của tác giả */}
                        <div className="w-full h-[340px] px-5 py-3 bg-white rounded-lg">
                            <span className="font-semibold text-[20px] text-black">
                                Link
                            </span>

                            <div className="py-5">
                                <ul className="">

                                </ul>
                            </div>
                        </div>

                        {/* Khung hiển thị các Series truyện của tác giả */}
                        <div className="w-full h-[460px] px-5 py-3 bg-white rounded-lg">
                            <span className="font-semibold text-[20px] text-black">
                                Series Original
                            </span>

                            <div className="py-5">
                                <ul className="">

                                </ul>
                            </div>
                        </div>

                        {/* Khung hiển thị các Series Video của tác giả */}
                        <div className="w-full h-[460px] px-5 py-3 bg-white rounded-lg">
                            <span className="font-semibold text-[20px] text-black">
                                Series Video
                            </span>

                            <div className="py-5">
                                <ul className="">

                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Hiển thị các bài viết của tác giả */}
                    <div className="w-[700px] px-5 pt-3 pb-10 bg-white rounded-lg">
                        <div className="w-full h-[40px] border-b-2 border-bg-black">
                            <span className="font-semibold text-[20px] text-black">
                                Feed
                            </span>
                        </div>

                        {/* Khung nội dung chính bài Post */}
                        {dataPost.map(item => (
                            <div
                                className="w-full min-h-[300px] py-5 border-b-2"
                                key={item.id}
                            >
                                {/* Hiển Avatar creator */}
                                <div className="w-full">
                                    <div className="flex items-center justify-center">
                                        <div className="">
                                            <Avatar
                                                alt="Remy Sharp"
                                                src="https://taoanhdep.com/wp-content/uploads/2023/10/ai-350x265.jpg"
                                                sx={{ width: 50, height: 50 }}
                                            />
                                        </div>
                                        <div className="px-2">
                                            <div className="">
                                                <span className="font-semibold">
                                                    {item.auth}
                                                </span>
                                                <span className="px-2 font-semibold text-yellow-500">
                                                    . Creator
                                                </span>
                                            </div>

                                            <div className="">
                                                <span className="text-gray-400">
                                                    {item.date}
                                                </span>
                                            </div>
                                        </div>

                                        <button className="w-[35px] h-[35px] bg-gray-100 hover:bg-gray-200 rounded-full ml-auto">
                                            <MoreVertIcon />
                                        </button>
                                    </div>
                                </div>

                                {/* Hiển nội dung bài viết */}
                                <div className="py-3">
                                    <p className="">
                                        {item.content}
                                    </p>
                                </div>

                                {/* Hiện hình ảnh bài viết */}
                                <div className="w-full flex gap-3">
                                    <img
                                        src={item.img}
                                        alt="img"
                                        className="object-cover w-[300px] h-[300px]"
                                    />
                                    <img
                                        src={item.img2}
                                        alt="img"
                                        className="object-cover w-[300px] h-[300px]"
                                    />
                                </div>

                                {/* Hiện yêu thích bình luận */}
                                <div className="w-full pt-5 ">
                                    <div className="mr-auto flex gap-2">
                                        <button className="px-2 py-1 px-1 border rounded-md gap-2 bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                            <FavoriteIcon className="text-red-500" />
                                            {item.like}
                                        </button>
                                        <button className="px-2 py-1 px-1 border rounded-md gap-2 bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                            <CommentIcon className="text-black" />
                                            {item.comment}
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatorChannelPage;
