import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const dataPost = [
    { id: 1, img: "https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/hinh-anh-anime-nu-cute-vay-do-1.jpg", img2: "https://ddk.1cdn.vn/thumbs/900x600/2023/08/25/image.daidoanket.vn-images-upload-hungnv-08252023-_amini-9.jpg", auth: "Lee Nakeum , seewater", content: "I got some early Morgana and Oz copies! Can’t wait for the first volume to come out in September. You can pre-order it on Amazon and Barnes&Noble or anywhere else you like to buy books.", like: "205", comment: "100", date: "23/05/2024", },
    { id: 2, img: "https://cdn.vinaenter.edu.vn/wp-content/uploads/2024/06/hinh-anh-nhom-ban-than-4-nguoi-anime.jpg", img2: "https://haycafe.vn/wp-content/uploads/2021/11/Hinh-anh-anime-co-trang.jpg", auth: "Lee Nakeum , seewater", content: "I got some early Morgana and Oz copies! Can’t wait for the first volume to come out in September. You can pre-order it on Amazon and Barnes&Noble or anywhere else you like to buy books.", like: "205", comment: "100", date: "23/05/2024", },
    { id: 3, img: "https://i.pinimg.com/736x/8c/fd/90/8cfd9089b4ae7ecede4605de2f90e62f.jpg", img2: "https://i.pinimg.com/originals/76/d9/b8/76d9b859e232e83d98828be99324908f.jpg", auth: "Lee Nakeum , seewater", content: "I got some early Morgana and Oz copies! Can’t wait for the first volume to come out in September. You can pre-order it on Amazon and Barnes&Noble or anywhere else you like to buy books.", like: "205", comment: "100", date: "23/05/2024", },
    { id: 4, img: "https://tbdn.com.vn/wp-content/uploads/2022/06/anime-cherry-blossom-images_102149394.jpg", img2: "https://img7.thuthuatphanmem.vn/uploads/2023/07/12/hinh-anh-anime-chill-dep-nhat_091546723.jpg", auth: "Lee Nakeum , seewater", content: "I got some early Morgana and Oz copies! Can’t wait for the first volume to come out in September. You can pre-order it on Amazon and Barnes&Noble or anywhere else you like to buy books.", like: "205", comment: "100", date: "23/05/2024", },
];

const dataOriginals = [
    { id: 1, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 2, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 3, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Mon', genre: "Animals", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 4, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Mon', genre: "Comedy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 5, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Mon', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 6, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 8, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 10, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Tue', genre: "School", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 11, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 12, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Wed', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 13, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 14, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 15, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
]

const dataVideos = [
    { id: 1, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 2, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 3, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Animals", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 4, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Comedy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 5, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Mon', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 6, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Tue', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 7, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Tue', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 8, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 9, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 10, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "School", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 11, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 12, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Wed', genre: "Historical", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 13, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 14, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 15, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
];

const MyChannelPage = () => {

    // Hiện thị phản hồi của bình luận
    const [replyCommentId, setReplyCommentId] = useState(null);

    const handleToggleReply = (commentId) => {
        setReplyCommentId(commentId === replyCommentId ? null : commentId);
    };

    return (
        <div className="w-full h-full pb-10 border bg-gray-100 flex items-center justify-center">
            <div className="w-[1120px] h-full">
                <div className="w-full h-full bg-white rounded-lg">
                    {/* Hiển thị ảnh nền */}
                    <div className="w-full h-[400px] bg-green-200 rounded-lg">
                        <img src="https://haycafe.vn/wp-content/uploads/2021/12/Anh-anime-cong-chua-toc-vang-de-thuong.jpg"
                            className="object-cover w-[1200px] h-full rounded-t-lg" alt="img"
                        />
                    </div>

                    {/* Hiển thị thông tin tác giả */}
                    <div className="w-full h-[180px] px-[30px] bg-white rounded-b-lg flex">
                        <div className="w-[185px] h-[185px] rounded-full border-4 mt-[-30px] flex items-center justify-center">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://www.ausp.edu.vn/uploads/blog/2024/05/16/1ecf77502b3bc514b2f535533d7b01f03a772174-1715817458.jpg"
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
                                    Series Original : 15
                                </span>
                                <span className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                                    Series Video : 15
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

                    <div className="w-[420px] h-[1480px] grid grid-cols-1 gap-3">

                        {/* Khung hiển thị các liên kết của tác giả */}
                        <div className="w-full h-[340px] px-5 py-3 bg-white rounded-lg">
                            <span className="font-semibold text-[20px] text-black">
                                Link
                            </span>

                            <div className="py-5">
                                <ul className="w-full">
                                    <li className="">
                                        https://www.youtube.com/channel/UCu-TDicEnPqp2-45hBTcImA
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Khung hiển thị các Series truyện của tác giả */}
                        <div className="w-full h-[550px] px-5 py-3 bg-white rounded-lg">
                            <span className="font-semibold text-[20px] text-black">
                                Series Original
                            </span>

                            <div className="mt-5 h-[450px] custom-scrollbar">
                                <ul className="w-full">
                                    {dataOriginals.map(item => (
                                        <li
                                            className="w-full h-[90px] hover:bg-gray-100 flex items-center border-t border-b cursor-pointer"
                                            key={item.id}
                                        >

                                            <div className="w-[80px] h-[80px] rounded">
                                                <img
                                                    src={item.img}
                                                    alt="img"
                                                    className="object-fill w-full h-full rounded"
                                                />
                                            </div>

                                            <div className="h-full rounded-xl px-3 py-3 flex items-center">
                                                <div className="w-[200px] overflow-hidden ">
                                                    <span className="w-full text-lg font-semibold line-clamp-1">
                                                        {item.name}
                                                    </span>
                                                    <span className="w-full text-[15px] line-clamp-1">
                                                        {item.genre}
                                                    </span>
                                                </div>

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Khung hiển thị các Series Video của tác giả */}
                        <div className="w-full h-[550px] px-5 py-3 bg-white rounded-lg">
                            <span className="font-semibold text-[20px] text-black">
                                Series Video
                            </span>

                            <div className="mt-5 h-[450px] custom-scrollbar">
                                <ul className="w-full">
                                    {dataVideos.map(item => (
                                        <li
                                            className="w-full h-[90px] hover:bg-gray-100 flex items-center border-t border-b cursor-pointer"
                                            key={item.id}
                                        >

                                            <div className="w-[80px] h-[80px] rounded">
                                                <img
                                                    src={item.img}
                                                    alt="img"
                                                    className="object-fill w-full h-full rounded"
                                                />
                                            </div>

                                            <div className="h-full rounded-xl px-3 py-3 flex items-center">
                                                <div className="w-[200px] overflow-hidden ">
                                                    <span className="w-full text-lg font-semibold line-clamp-1">
                                                        {item.name}
                                                    </span>
                                                    <span className="w-full text-[15px] line-clamp-1">
                                                        {item.genre}
                                                    </span>
                                                </div>

                                            </div>
                                        </li>
                                    ))}
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

                        {/* Danh sách bài post */}
                        <ul>
                            {/* Khung nội dung chính bài Post */}
                            {dataPost.map(item => (
                                <li
                                    key={item.id}
                                    className="w-full min-h-[300px] py-5 border-b-2"
                                >
                                    {/* Hiển Avatar creator */}
                                    <div className="w-full">
                                        <div className="flex items-center justify-center">
                                            <div className="">
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="https://www.ausp.edu.vn/uploads/blog/2024/05/16/1ecf77502b3bc514b2f535533d7b01f03a772174-1715817458.jpg"
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
                                            <button className="px-2 py-1 border rounded-md gap-2 bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                                <FavoriteIcon className="text-red-500" />
                                                {item.like}
                                            </button>
                                            <button
                                                onClick={() => handleToggleReply(item.idcomment)}
                                                className="px-2 py-1 border rounded-md gap-2 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                                            >
                                                <CommentIcon className="text-black" />
                                                {item.comment}
                                            </button>
                                        </div>

                                    </div>

                                    {/* Phản hồi bình luận */}
                                    {replyCommentId === item.idcomment && (
                                        <div className="w-full px-5 pt-5">

                                            {/* Nhập bình luận phản hồi */}
                                            <div className="w-full h-full">

                                                {/* Reply input field */}
                                                kkk kk kk k k k k k k  kk k k k k k k   kk  k kk k k k k  k k k k k k k k k k k k k k k k kkkkkk k k  k k k k k k k k k k k k k k k k
                                            </div>

                                            {/* Hiển thị các phản hồi bình luận có sẳn */}
                                            {item.replies > 0 && (
                                                <div className="w-full h-full">
                                                    {/* Display existing replies here */}
                                                    <ul>
                                                        <li>
                                                            kkk
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyChannelPage;
