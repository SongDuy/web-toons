import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CancelIcon from '@mui/icons-material/Cancel';

const dataPost = [
    {
        id: 1,
        images: [
            "https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/hinh-anh-anime-nu-cute-vay-do-1.jpg",
            "https://ddk.1cdn.vn/thumbs/900x600/2023/08/25/image.daidoanket.vn-images-upload-hungnv-08252023-_amini-9.jpg",
            "https://9anime.vn/wp-content/uploads/2024/04/499-Hinh-Anh-Anime-Nu-Dep-Ngau-Cute-Dang-Yeu.jpg",
            "https://tbdn.com.vn/wp-content/uploads/2022/06/anime-cherry-blossom-images_102149394.jpg",
        ],
        auth: "Lee Nakeum , seewater",
        avatar: "https://www.ausp.edu.vn/uploads/blog/2024/05/16/1ecf77502b3bc514b2f535533d7b01f03a772174-1715817458.jpg",
        content: "I got some early Morgana and Oz copies! Can’t wait for the first volume to come out in September. You can pre-order it on Amazon and Barnes&Noble or anywhere else you like to buy books.",
        like: "205",
        comments: "100",
        date: "23/05/2024",
    },
    {
        id: 2,
        images: [
            "https://cdn.vinaenter.edu.vn/wp-content/uploads/2024/06/hinh-anh-nhom-ban-than-4-nguoi-anime.jpg",
            "https://haycafe.vn/wp-content/uploads/2021/11/Hinh-anh-anime-co-trang.jpg",
            "https://top10tphcm.com/wp-content/uploads/2023/06/Hinh-anh-Anime-nu-de-thuong.jpg",
            "https://yamicomputer.com/image/data/anht11/hinh-nen-anime-5.jpg",
        ],
        auth: "Lee Nakeum , seewater",
        avatar: "https://www.ausp.edu.vn/uploads/blog/2024/05/16/1ecf77502b3bc514b2f535533d7b01f03a772174-1715817458.jpg",
        content: "I got some early Morgana and Oz copies! Can’t wait for the first volume to come out in September. You can pre-order it on Amazon and Barnes&Noble or anywhere else you like to buy books.",
        like: "205",
        comments: "100",
        date: "23/05/2024",
    },
    {
        id: 3,
        images: [
            "https://i.pinimg.com/736x/8c/fd/90/8cfd9089b4ae7ecede4605de2f90e62f.jpg",
            "https://i.pinimg.com/originals/76/d9/b8/76d9b859e232e83d98828be99324908f.jpg",
            "https://img7.thuthuatphanmem.vn/uploads/2023/07/12/hinh-anh-anime-chill-dep-nhat_091546723.jpg",
            "https://yamicomputer.com/image/data/anht11/hinh-nen-anime-5.jpg",
        ],
        auth: "Lee Nakeum , seewater",
        avatar: "https://www.ausp.edu.vn/uploads/blog/2024/05/16/1ecf77502b3bc514b2f535533d7b01f03a772174-1715817458.jpg",
        content: "I got some early Morgana and Oz copies! Can’t wait for the first volume to come out in September. You can pre-order it on Amazon and Barnes&Noble or anywhere else you like to buy books.",
        like: "205",
        comments: "100",
        date: "23/05/2024",
    },
    // Các bài viết khác...
];

const dataOriginals = [
    { id: 1, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 2, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 3, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Mon', genre: "Animals", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
]

const dataVideos = [
    { id: 1, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 2, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
    { id: 3, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Animals", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
];

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

const dataReplies = [
    { id: 1, replyUser: "Duy_085", replyComment: "like", replyData: "20/05/2024", replyLike: "205", replyDislike: "205" },
    { id: 2, replyUser: "Duy_085", replyComment: "like", replyData: "20/05/2024", replyLike: "205", replyDislike: "205" },
    { id: 3, replyUser: "Duy_085", replyComment: "like", replyData: "20/05/2024", replyLike: "205", replyDislike: "205" },
    { id: 4, replyUser: "Duy_085", replyComment: "like", replyData: "20/05/2024", replyLike: "205", replyDislike: "205" },
    { id: 5, replyUser: "Duy_085", replyComment: "like", replyData: "20/05/2024", replyLike: "205", replyDislike: "205" },
]

//https://www.ausp.edu.vn/uploads/blog/2024/05/16/1ecf77502b3bc514b2f535533d7b01f03a772174-1715817458.jpg
const MyChannelPage = () => {

    // Hiện thị  bình luận
    const [commentPostId, setCommentPostId] = useState(null);

    const handleToggleComment = (postId) => {
        setCommentPostId(postId === commentPostId ? null : postId);
    };

    // Hiện thị phản hồi của bình luận
    const [replyCommentId, setReplyCommentId] = useState(null);

    const handleToggleReply = (commentId) => {
        setReplyCommentId(commentId === replyCommentId ? null : commentId);
    };

    // Nhấn nút thả tim
    const [isLike, setIsLike] = useState(false);

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    // State để lưu chỉ số hiện tại cho mỗi bài viết
    const [currentIndices, setCurrentIndices] = useState({});

    // Hàm xử lý việc điều chỉnh chỉ số hiện tại cho một bài viết cụ thể để xem ảnh cuộn bài post
    const handlePrev = (postId) => {
        setCurrentIndices(prevIndices => ({
            ...prevIndices,
            [postId]: Math.max((prevIndices[postId] || 0) - 1, 0),
        }));
    };

    const handleNext = (postId, imagesLength) => {
        setCurrentIndices(prevIndices => ({
            ...prevIndices,
            [postId]: Math.min((prevIndices[postId] || 0) + 1, imagesLength - 2),
        }));
    };

    const [photos, setPhotos] = useState([null]); // Lưu các ảnh đã chọn

    // Thêm ô ảnh mới
    const handleAddPhoto = () => {
        setPhotos([...photos, null]);
    };

    // Xóa ô ảnh
    const handleRemovePhoto = (indexToRemove) => {
        setPhotos(photos.filter((_, index) => index !== indexToRemove));
    };

    // Xử lý chọn ảnh từ input
    const handlePhotoChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newPhotos = [...photos];
            newPhotos[index] = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
            setPhotos(newPhotos);
        }
    };

    return (
        <div className="w-full h-full pb-10 border bg-gray-100 flex items-center justify-center">
            <div className="w-[1120px] h-full">
                <div className="w-full h-full bg-white rounded-lg">
                    {/* Hiển thị ảnh nền */}
                    <div className="w-full h-[400px] bg-green-200 rounded-lg relative">
                        <img src="https://wallpapers.com/images/hd/chill-anime-girl-during-winter-n65e3iefecsy01if.jpg"
                            className="object-cover w-[1200px] h-full rounded-t-lg" alt="img"
                        />
                        {/* Nút thay ảnh bìa */}
                        <div className="absolute px-5 py-5 bottom-0 right-0">
                            <button className="w-[170px] py-2 px-2 bg-white hover:bg-gray-100 rounded shadow font-semibold flex gap-2 items-center justify-center">
                                <PhotoCameraIcon />
                                {!language ? <span> Edit cover photo </span> : <span> 표지 사진 편집 </span>}
                            </button>
                        </div>
                    </div>

                    {/* Hiển thị thông tin tác giả */}
                    <div className="w-full h-[180px] px-[30px] bg-white rounded-b-lg flex">
                        <div className="w-[185px] h-[185px] rounded-full border-4 mt-[-30px] flex items-center justify-center relative">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://www.ausp.edu.vn/uploads/blog/2024/05/16/1ecf77502b3bc514b2f535533d7b01f03a772174-1715817458.jpg"
                                sx={{ width: 180, height: 180 }}
                            />

                            {/* Nút thay ảnh Avatar */}
                            <div className="absolute bottom-0 right-0">
                                <button className="w-[40px] h-[40px] border-2 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center">
                                    <PhotoCameraIcon />
                                </button>
                            </div>
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
                                <div className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                                    {!language ? <span> Series Original: </span> : <span> 시리즈 오리지널: </span>
                                    }
                                    {' '} 15
                                </div>
                                <div className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                                    {!language ? <span> Series Video: </span> : <span> 시리즈 비디오: </span>}
                                    {' '} 15
                                </div>
                                <div className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                                    {!language ? <span> Followers: </span> : <span> 추종자: </span>}
                                    {' '} 80,135
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full flex gap-3 mt-3">

                    <div className="w-[420px] h-[1480px] grid grid-cols-1 gap-3">

                        {/* Khung hiển thị các liên kết của tác giả */}
                        <div className="w-full h-[340px] px-5 py-3 bg-white rounded-lg">
                            <div className="font-semibold text-[20px] text-black">
                                {!language ? <span> Link </span> : <span> 링크 </span>}
                            </div>

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
                            <div className="font-semibold text-[20px] text-black">
                                {!language ? <span> Series Original </span> : <span> 시리즈 오리지널 </span>}
                            </div>

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
                            <div className="font-semibold text-[20px] text-black">
                                {!language ? <span> Series Video </span> : <span> 시리즈 비디오 </span>}
                            </div>

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

                    {/* Tạo bài viết và Hiển thị các bài viết của tôi */}
                    <div className="w-[700px] h-full grid grid-cols-1 gap-3">

                        {/* Tạo bài viết */}
                        <div className="w-full h-full px-5 pt-3 pb-10 bg-white rounded-lg">
                            {/* Tiêu đề */}
                            <div className="w-full h-[40px] border-b-2 border-bg-black">
                                <div className="font-semibold text-[20px] text-black">
                                    {!language ? <span> Create Articles </span> : <span> 기사 작성 </span>}
                                </div>
                            </div>

                            {/* Nhập bài viết và ảnh */}
                            <div className="w-full">

                                {/* Hiển thị avatar */}
                                <div className="w-full mt-5 flex items-center justify-center">
                                    <div className="">
                                        <Avatar
                                            alt="Creator Avatar"
                                            src="https://www.ausp.edu.vn/uploads/blog/2024/05/16/1ecf77502b3bc514b2f535533d7b01f03a772174-1715817458.jpg"
                                            sx={{ width: 50, height: 50 }}
                                        />
                                    </div>
                                    <div className="px-2 mr-auto">
                                        <div className="w-full">
                                            <span className="font-semibold">Lee Nakeum , seewater</span>
                                        </div>
                                        <div className="w-full">
                                            <span className="text-gray-400">12/8/2024</span>
                                        </div>
                                    </div>

                                </div>

                                {/* Ô nhập nội dung bài viết */}
                                <div className="w-full mt-5">
                                    <textarea
                                        placeholder="What are you thinking?"
                                        className="w-full h-[160px] rounded-md px-3 py-3 border-2"
                                    />

                                </div>

                                {/* Phần thêm ảnh vào bài viết */}
                                <div className="w-full mt-5">
                                    <div className="flex flex-wrap gap-5 mb-5">
                                        {photos.map((photo, index) => (
                                            <div
                                                key={index}
                                                className="relative w-[300px] h-[300px] text-black border bg-red-50 hover:bg-red-100 rounded flex justify-center items-center"
                                            >
                                                {photo ?
                                                    (
                                                        <img
                                                            src={photo}
                                                            alt="Selected"
                                                            className="w-full h-full object-cover rounded"
                                                        />
                                                    )
                                                    :
                                                    (
                                                        <>
                                                            <AddPhotoAlternateIcon sx={{ fontSize: 40 }} />
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handlePhotoChange(e, index)}
                                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                            />
                                                        </>
                                                    )}

                                                {/* Nút xóa */}
                                                <button
                                                    onClick={() => handleRemovePhoto(index)}
                                                    className="absolute top-2 right-2 bg-gray-100 text-black rounded-full p-1"
                                                >
                                                    <CancelIcon />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-end px-2">
                                        <button
                                            onClick={handleAddPhoto}
                                            className="w-[120px] px-2 py-2 border font-semibold rounded bg-red-50 hover:bg-red-100 shadow"
                                        >
                                            {!language ? <span>Add Image</span> : <span>이미지 추가</span>}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Đăng bài viết */}
                            <div className="flex items-center justify-center">
                                <button
                                    className="w-1/2 bg-gray-50 hover:bg-gray-100 border font-semibold shadow text-black py-2 mt-5 rounded"
                                >
                                    {!language ? <span>  Post Article </span> : <span> 기사 게시 </span>}
                                </button>
                            </div>

                        </div>

                        {/* Hiển thị các bài viết của tác giả */}
                        <div className="w-full h-full px-5 pt-3 pb-10 bg-white rounded-lg">
                            {/* Tiêu đề */}
                            <div className="w-full h-[40px] border-b-2 border-bg-black">
                                <div className="font-semibold text-[20px] text-black">
                                    {!language ? <span> Feed </span> : <span> 밥을 먹이다 </span>}
                                </div>
                            </div>

                            {/* Danh sách bài post */}
                            <ul className="w-full h-full">

                                {/* Khung nội dung chính bài Post */}
                                {dataPost.map(item => (
                                    <li key={item.id} className="w-full min-h-[300px] py-5 border-b-2">
                                        {/* Hiển Avatar creator */}
                                        <div className="w-full">
                                            <div className="flex items-center justify-center">
                                                <div className="">
                                                    <Avatar
                                                        alt="Creator Avatar"
                                                        src={item.avatar}
                                                        sx={{ width: 50, height: 50 }}
                                                    />
                                                </div>
                                                <div className="px-2">
                                                    <div className="flex">
                                                        <span className="font-semibold">{item.auth}</span>
                                                    </div>
                                                    <div className="">
                                                        <span className="text-gray-400">{item.date}</span>
                                                    </div>
                                                </div>
                                                <button className="w-[35px] h-[35px] bg-gray-100 hover:bg-gray-200 rounded-full ml-auto">
                                                    <MoreVertIcon />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Hiển nội dung bài viết */}
                                        <div className="py-3">
                                            <p>{item.content}</p>
                                        </div>

                                        {/* Hiện hình ảnh bài viết */}
                                        <div className="relative w-full flex items-center justify-center p-4">
                                            <button
                                                onClick={() => handlePrev(item.id)}
                                                disabled={(currentIndices[item.id] || 0) === 0}
                                                className="absolute left-0 bg-gray-500 text-white p-2 rounded-full disabled:opacity-50"
                                            >
                                                <NavigateBeforeIcon />
                                            </button>
                                            <div className="flex gap-3 overflow-hidden w-full">
                                                {item.images.slice(currentIndices[item.id] || 0, (currentIndices[item.id] || 0) + 2).map((img, index) => (
                                                    <img
                                                        key={index}
                                                        src={img}
                                                        alt={`Slide ${index}`}
                                                        className="object-cover w-[300px] h-[300px] transition-transform duration-300 ease-in-out"
                                                    />
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => handleNext(item.id, item.images.length)}
                                                disabled={(currentIndices[item.id] || 0) >= item.images.length - 2}
                                                className="absolute right-0 bg-gray-500 text-white p-2 rounded-full disabled:opacity-50"
                                            >
                                                <NavigateNextIcon />
                                            </button>
                                        </div>

                                        {/* Hiện yêu thích bình luận */}
                                        <div className="w-full pt-5 ">
                                            <div className="mr-auto flex gap-2">
                                                {/* Nhấn nút thả tim */}
                                                {!isLike ?
                                                    <button
                                                        onClick={() => setIsLike(true)}
                                                        className="px-2 py-1 border rounded-md gap-2 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                                                    >
                                                        <FavoriteBorderIcon />
                                                        {item.like}
                                                    </button>
                                                    :
                                                    <button
                                                        onClick={() => setIsLike(false)}
                                                        className="px-2 py-1 border rounded-md gap-2 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                                                    >
                                                        <FavoriteIcon className="text-red-500" />
                                                        {item.like}
                                                    </button>
                                                }

                                                {/* Nhấn nút xem bình luận */}
                                                <button
                                                    onClick={() => handleToggleComment(item.id)}
                                                    className="px-2 py-1 border rounded-md gap-2 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                                                >
                                                    <CommentIcon className="text-black" />
                                                    {item.comments}
                                                </button>
                                            </div>

                                        </div>

                                        {/* Phản hồi bình luận */}
                                        {commentPostId === item.id && (
                                            <div className="w-full px-5 pt-5">

                                                {/* Nhập bình luận phản hồi */}
                                                <div className="w-full h-full">
                                                    <div className="w-full h-full my-3">
                                                        <textarea
                                                            placeholder="Leave a comment"
                                                            className="w-full h-[160px] rounded-md px-3 py-3 border-2"
                                                        />
                                                        <button className="px-3 py-2 ml-auto bg-green-500 hover:shadow-md text-white rounded-xl flex gap-2 items-center justify-center">
                                                            <SendRoundedIcon className="transform rotate-200" />
                                                            {!language ? <span> Send </span> : <span> 보내다 </span>}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Hiển thị các phản hồi bình luận có sẳn */}
                                                {item.comments > 0 && (
                                                    <div className="w-full h-full">
                                                        {/* Display existing replies here */}
                                                        <ul>
                                                            {dataComment.map(item => (
                                                                <li key={item.id}>
                                                                    {/* Hiện thị bình luận */}
                                                                    <div
                                                                        className="w-full h-[200px] rounded-md px-3 border-b bg-red-50 bg-opacity-50 my-2"
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
                                                                                <button
                                                                                    onClick={() => handleToggleReply(item.id)}
                                                                                    className="px-2 py-1 mr-auto border rounded-md hover:bg-gray-200 flex gap-2 items-center justify-center"
                                                                                >
                                                                                    {!language ? <span> Replies </span> : <span> 답글 </span>}
                                                                                    {item.replies}
                                                                                </button>

                                                                                <button className="px-2 py-1 ml-auto border rounded-md gap-2 hover:bg-gray-200 flex items-center justify-center">
                                                                                    <ThumbUpIcon className="text-gray-400" />
                                                                                    226
                                                                                </button>
                                                                                <button className="px-2 py-1 border rounded-md gap-2 hover:bg-gray-200 flex items-center justify-center">
                                                                                    <ThumbDownIcon className="text-gray-400" />
                                                                                    0
                                                                                </button>
                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                    {/* Phản hồi bình luận */}
                                                                    {replyCommentId === item.id && (
                                                                        <div className="w-full px-5 ">

                                                                            {/* Nhập bình luận phản hồi */}
                                                                            <div className="w-full h-full">

                                                                                {/* Ô nhập bình luận */}
                                                                                <div className="w-full h-full my-3">
                                                                                    <textarea
                                                                                        placeholder="Leave a reply"
                                                                                        value=""
                                                                                        className="w-full h-[160px] rounded-md px-3 py-3 border-2"
                                                                                        onChange=""
                                                                                    />
                                                                                    <button className="px-3 py-2 ml-auto bg-black hover:shadow-md text-white rounded-xl flex gap-2 items-center justify-center">
                                                                                        <SendRoundedIcon className="transform rotate-200" />
                                                                                        {!language ? <span> Reply </span> : <span> 회신하다 </span>}
                                                                                    </button>
                                                                                </div>
                                                                            </div>

                                                                            {/* Hiển thị các phản hồi bình luận có sẳn */}
                                                                            {item.replies > 0 && (
                                                                                <div className="w-full h-full">
                                                                                    {/* Danh sách phản hồi */}
                                                                                    <ul className="w-full h-full">
                                                                                        {dataReplies.map(item => (
                                                                                            <li key={item.id}>
                                                                                                <div className="w-full h-[200px] rounded-md px-3 border-b bg-gray-100 my-2">
                                                                                                    {/* Hiển thị tên user và ngày đăng bình luận */}
                                                                                                    <div className="w-full py-1 flex overflow-hidden">
                                                                                                        <span className="max-w-[500px] font-semibold line-clamp-1">
                                                                                                            {item.replyUser}
                                                                                                        </span>
                                                                                                        <span className="text-gray-400 mx-2 line-clamp-1">
                                                                                                            {item.replyData}
                                                                                                        </span>
                                                                                                    </div>

                                                                                                    {/* Hiển thị nội dung bình luận */}
                                                                                                    <div className="h-[120px] px-2 custom-scrollbar">
                                                                                                        <span className="">
                                                                                                            {item.replyComment}
                                                                                                        </span>
                                                                                                    </div>

                                                                                                    {/* Nút bình luận, thích, không thích */}
                                                                                                    <div className="w-full flex gap-2 py-1">
                                                                                                        <button className="px-2 py-1  ml-auto border rounded-md gap-2 hover:bg-gray-200 flex items-center justify-center">
                                                                                                            <ThumbUpIcon className="text-gray-400" />
                                                                                                            {item.replyLike}
                                                                                                        </button>

                                                                                                        <button className="px-2 py-1  border rounded-md gap-2 hover:bg-gray-200 flex items-center justify-center">
                                                                                                            <ThumbDownIcon className="text-gray-400" />
                                                                                                            {item.replyDislike}
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </li>
                                                            ))}
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
        </div>
    );
}

export default MyChannelPage;
