import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useParams } from 'react-router-dom';
import postFireBase from '../../common/services/post.services';
import { auth } from '../../common/themes/firebase';
import { getAccount } from '../../common/store/Account';
import { onAuthStateChanged } from 'firebase/auth';
import VideoFireBase from '../../common/services/Video.services';
import comicFireBase from '../../common/services/Comic.services';
import { Link } from "react-router-dom";
import userFireBase from '../../common/services/User.services';
import FollowFireBase from '../../common/services/Follow.services';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import dataListGenre from '../../components/layout/layoutUser/dataListGenre';
const CreatorChannelPage = () => {

    // Nhấn nút đăng ký
    const [isFollow, setIsFollow] = useState(false);

    const id = useParams();
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);
    const [posts, setposts] = useState([]);
    // Nhấn nút thả tim
    const [Video, setVideo] = useState([]);
    const [comic, setcomic] = useState([]);
    const [iLike, setILike] = useState([]);
    const [create, setcreate] = useState([]);

    // State để lưu chỉ số hiện tại cho mỗi bài viết
    const [currentIndices, setCurrentIndices] = useState({});
    const [Follow, setFollow] = useState([[]]);

    useEffect(() => {
        const get = async () => {
            try {
                setloading(false)
                if (id.id) {
                    const post = await postFireBase.getAllid(id.id);
                    const videos = await VideoFireBase.getbyuser(id.id);
                    const comics = await comicFireBase.getbyuser(id.id);

                    setVideo(videos.success ? videos?.Video : []);
                    setcomic(comics.success ? comics?.comic : []);
                    const User = await userFireBase.getbyid(id.id)
                    setcreate(User.success ? User : [])
                    setposts(post.success ? post?.post : []);
                    if (auth.currentUser) {
                        const Follows = await FollowFireBase.getbychannel(auth.currentUser.uid, id.id)
                        Follows.success ? setIsFollow(true) : setIsFollow(false)
                        Follows.success ? setFollow(Follows.follow) : setFollow([])
                    }
                }

                setloading(true)

            } catch (error) {
            }
        }

        get()
    }, [dispatch, id]);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    const pot = await postFireBase.getlike(user.uid);
                    const like = pot.post?.filter(item => item.success).map(item => { return { [item?.id]: item?.id } })
                    setILike(like);
                } else {
                    setILike([])
                }
            } catch (error) {

            }
        });
        return () => unsubscribe()
    }, []);
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
    const handlelike = async (idpost, togglelike) => {
        try {
            if (auth?.currentUser) {
                await postFireBase.Addlike({
                    idpost,
                    uid: auth?.currentUser?.uid,
                    like: true,
                    togglelike,
                });
                const pot = await postFireBase.getlike(auth?.currentUser?.uid);
                const like = pot.post?.filter(item => item.success).map(item => { return { [item?.id]: item?.id } })
                setILike(like);
                const posts = await postFireBase.getAllid(id.id);
                setposts(posts.success ? posts?.post : []);

            }

        } catch (error) {
            console.log(error);
        }
    };
    const handleFollow = async () => {
        try {

            if (auth.currentUser) {
                await FollowFireBase.Add({ uid: auth.currentUser.uid, idchannel: id.id, createTime: new Date(Date.now()), type: 'channel' })
                await userFireBase.update({ follow: create.follow + 1 }, id.id)
                await dispatch(getAccount(id.id));

                const Follows = await FollowFireBase.getbychannel(auth.currentUser.uid, id.id)

                Follows.success ? setIsFollow(true) : setIsFollow(false)
                Follows.success ? setFollow(Follows.follow) : setFollow([])
            }
        } catch (error) {
        }
    }
    const handleDeleteFollow = async () => {
        try {
            if (auth.currentUser) {
                await FollowFireBase.Delete(Follow[0]?.id)
                await userFireBase.update({ follow: create.follow - 1 }, id.id)
                await dispatch(getAccount(id.id));
                const Follows = await FollowFireBase.getbychannel(auth.currentUser.uid, id.id)

                Follows.success ? setIsFollow(true) : setIsFollow(false)
                Follows.success ? setFollow(Follow.follow) : setFollow([])
            }
        } catch (error) {

        }
    }

    console.log(create)

    return (
        <>
            {loading ?
                <div className="w-full h-full pb-10 border bg-gray-100 flex items-center justify-center">
                    <div className="w-[1120px] h-full">
                        <div className="w-full h-full bg-white rounded-lg">
                            {/* Hiển thị ảnh nền */}
                            <div className="w-full max-h-[400px] bg-green-200 rounded-lg">
                                <img
                                    src={
                                        create?.horizontalThumbnail
                                            ? create?.horizontalThumbnail
                                            : "https://wallpapers.com/images/hd/chill-anime-girl-during-winter-n65e3iefecsy01if.jpg"
                                    }
                                    className="object-cover w-full max-h-[400px] rounded-t-lg"
                                    alt="img"
                                />
                            </div>

                            {/* Hiển thị thông tin tác giả */}
                            <div className="w-full sm:h-[180px] xs:px-[10px] sm:px-[30px] bg-white rounded-b-lg sm:flex">
                                <div className="flex">
                                    <div className="hidden sm:block">
                                        <div className="w-[185px] h-[185px] rounded-full border-4 mt-[-30px] flex items-center justify-center">
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={create?.image}
                                                sx={{ width: 180, height: 180 }}
                                            />
                                        </div>
                                    </div>
                                    <div className="block sm:hidden">
                                        <div className="w-[105px] h-[105px] rounded-full border-4 mt-[-30px] flex items-center justify-center">
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={create?.image}
                                                sx={{ width: 100, height: 100 }}
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:py-4 px-3">
                                        <div className="">
                                            <span className="text-[35px] font-semibold text-yellow-500 text-shadow-black">
                                                {create?.name}
                                            </span>
                                        </div>
                                        {/* <div className="px-1">
                                        <span className="text-[18px] text-yellow-400 text-shadow-black">
                                            {!language ? (<span> Commic, video </span>) : (<span> 만화, 동영상 </span>)}
                                        </span>
                                    </div> */}

                                        <div className="w-full px-1 sm:pt-8 pb-4 flex">
                                            <div className="mr-5 xs:text-[15px] sm:text-[18px] font-semibold text-white text-shadow-black">
                                                {!language ? <span> Originals: </span> : <span> 오리지널: </span>}
                                                {' '} {comic?.length}
                                            </div>
                                            <div className="mr-5 xs:text-[15px] sm:text-[18px] font-semibold text-white text-shadow-black">
                                                {!language ? <span> Videos: </span> : <span> 비디오: </span>}
                                                {' '} {Video?.length}
                                            </div>
                                            <div className="mr-5 xs:text-[15px] sm:text-[18px] font-semibold text-white text-shadow-black">
                                                {!language ? <span> Followers: </span> : <span> 팔로워: </span>}
                                                {' '} {create?.follow}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-auto flex items-center pb-4 justify-center">
                                    {!isFollow ?
                                        <button
                                            onClick={handleFollow}
                                            className="xs:w-full sm:w-[150px] h-[50px] font-semibold text-white bg-green-500 hover:bg-green-600 shadow  rounded-full"
                                        >
                                            {!language ? <span> Follow </span> : <span> 팔로우 </span>}
                                        </button>
                                        :
                                        <button
                                            onClick={handleDeleteFollow}
                                            className="w-[150px] h-[50px] font-semibold text-black bg-gray-50 hover:bg-gray-100 shadow border rounded-full"
                                        >
                                            {!language ? <span> Following </span> : <span> 팔로잉 </span>}
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-full grid xs:grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
                            <div className="col-span-1 h-full">
                                <div className="w-full max-h-[1100px] grid grid-cols-1 gap-3">

                                    {/* Khung hiển thị các liên kết của tác giả */}
                                    {/* <div className="w-full h-[340px] px-5 py-3 bg-white rounded-lg">
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
                                </div> */}

                                    {/* Khung hiển thị các Series truyện của tác giả */}
                                    <div className="w-full max-h-[550px] px-5 py-3 bg-white rounded-lg">
                                        <div className="font-semibold text-[20px] text-black">
                                            {!language ? <span> Original Series </span> : <span> 오리지널 시리즈 </span>}
                                        </div>

                                        <div className="mt-5 max-h-[450px] custom-scrollbar">
                                            <ul className="w-full h-full">
                                                {comic?.slice(0, 5)?.map(item => (
                                                    <Link
                                                        className="w-full h-[90px] hover:bg-gray-100 flex items-center border-t border-b cursor-pointer"
                                                        key={item.id}
                                                        to={`/originals/original/series/${item.id}`}

                                                    >

                                                        <div className="w-[80px] h-[80px] rounded">
                                                            <img
                                                                src={item.squareThumbnail}
                                                                alt="img"
                                                                className="object-cover min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] rounded"
                                                            />
                                                        </div>

                                                        <div className="h-full rounded-xl px-3 py-3 flex items-center">
                                                            <div className="max-w-[250px] overflow-hidden ">
                                                                <span className="w-full text-lg font-semibold line-clamp-1">
                                                                    {item.title}
                                                                </span>
                                                                {(item.genre1 === item.genre2) ?
                                                                    <span className="w-full text-[15px] line-clamp-1">
                                                                        {!language ? item.genre1 : dataListGenre?.filter(itm => itm.name.toLowerCase() === item.genre1.toLowerCase())[0]?.nameKorean}
                                                                    </span>
                                                                    :
                                                                    <span className="w-full text-[15px] line-clamp-1">
                                                                        {!language ? item.genre1 : dataListGenre?.filter(itm => itm.name.toLowerCase() === item.genre1.toLowerCase())[0]?.nameKorean}
                                                                        {`, `}
                                                                        {!language ? item.genre2 : dataListGenre?.filter(itm => itm.name.toLowerCase() === item.genre2.toLowerCase())[0]?.nameKorean}
                                                                    </span>
                                                                }
                                                                {/* <span className="w-full text-[15px] line-clamp-1">
                                                                {item.genre1}
                                                            </span> */}
                                                            </div>

                                                        </div>
                                                    </Link>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Khung hiển thị các Series Video của tác giả */}
                                    <div className="w-full max-h-[550px] px-5 py-3 bg-white rounded-lg">
                                        <div className="font-semibold text-[20px] text-black">
                                            {!language ? <span> Video Series </span> : <span> 비디오 시리즈 </span>}
                                        </div>

                                        <div className="mt-5 max-h-[450px] custom-scrollbar">
                                            <ul className="w-full">
                                                {Video?.slice(0, 5)?.map(item => (
                                                    <Link
                                                        className="w-full h-[90px] hover:bg-gray-100 flex items-center border-t border-b cursor-pointer"
                                                        key={item.id}
                                                        to={`/videos/video/series/${item.id}`}

                                                    >

                                                        <div className="w-[80px] h-[80px] rounded">
                                                            <img
                                                                src={item.squareThumbnail}
                                                                alt="img"
                                                                className="object-cover min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] rounded"
                                                            />
                                                        </div>

                                                        <div className="h-full rounded-xl px-3 py-3 flex items-center">
                                                            <div className="max-w-[250px] overflow-hidden ">
                                                                <span className="w-full text-lg font-semibold line-clamp-1">
                                                                    {item.title}
                                                                </span>

                                                            </div>

                                                        </div>
                                                    </Link>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Hiển thị các bài viết của tác giả */}
                            <div className="xs:col-span-1 lg:col-span-2  h-full">
                                <div className="w-full h-full px-5 pt-3 pb-10 bg-white rounded-lg">
                                    {/* Tiêu đề */}
                                    <div className="w-full h-[40px] border-b-2 border-bg-black">
                                        <div className="font-semibold text-[20px] text-black">
                                            {!language ? <span> Feed </span> : <span> 피드 </span>}
                                        </div>
                                    </div>

                                    {/* Danh sách bài post */}
                                    <ul className="w-full h-full">

                                        {/* Khung nội dung chính bài Post */}
                                        {posts?.map(item => (
                                            <li key={item.idpost} className="w-full min-h-[300px] py-5 border-b-2 flex flex-col">
                                                {/* Hiển Avatar creator */}
                                                <div className="w-full">
                                                    <div className="flex items-center justify-center">
                                                        <div className="">
                                                            <Avatar
                                                                alt="Creator Avatar"
                                                                src={
                                                                    create?.image
                                                                        ? create?.image
                                                                        : "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                                                                }
                                                                sx={{ width: 50, height: 50 }}
                                                            />
                                                        </div>
                                                        <div className="px-2">
                                                            <div className="flex">
                                                                <span className="font-semibold">{create?.name}</span>
                                                            </div>
                                                            <div className="">
                                                                <span className="text-gray-400">
                                                                    {new Date(item.createTime).getDate()}/{new Date(item.createTime).getMonth() + 1}/
                                                                    {new Date(item.createTime)?.getFullYear()}</span>
                                                            </div>
                                                        </div>
                                                        <button className="w-[35px] h-[35px] bg-gray-100 hover:bg-gray-200 rounded-full ml-auto">
                                                            <MoreVertIcon />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Hiển nội dung bài viết */}
                                                <div className="py-3 px-3">
                                                    <p>{item.post}</p>
                                                </div>

                                                {/* Hiện hình ảnh bài viết */}
                                                <div className="relative w-full flex items-center justify-center p-4">
                                                    {item.image?.length > 0 ? (
                                                        <>
                                                            {/* Nút Prev */}
                                                            <button
                                                                onClick={() => handlePrev(item.idpost)}
                                                                disabled={(currentIndices[item.idpost] || 0) === 0}
                                                                className="absolute left-0 bg-gray-500 text-white p-2 rounded-full disabled:opacity-50"
                                                            >
                                                                <NavigateBeforeIcon />
                                                            </button>

                                                            {/* Hiển thị hình ảnh */}
                                                            <div className="w-full grid xs:grid-cols-1 sm:grid-cols-2 gap-5 overflow-hidden">
                                                                {item.image?.slice(currentIndices[item.idpost] || 0, (currentIndices[item.idpost] || 0) + 2)?.map((img, index) => (
                                                                    <img
                                                                        key={index}
                                                                        src={img}
                                                                        alt={`Slide ${index}`}
                                                                        className="object-cover w-full h-[300px] transition-transform duration-300 ease-in-out"
                                                                    />
                                                                ))}
                                                            </div>

                                                            {/* Nút Next */}
                                                            <button
                                                                onClick={() => handleNext(item.idpost, item.image?.length)}
                                                                disabled={(currentIndices[item.idpost] || 0) >= item.image?.length - 2}
                                                                className="absolute right-0 bg-gray-500 text-white p-2 rounded-full disabled:opacity-50"
                                                            >
                                                                <NavigateNextIcon />
                                                            </button>
                                                        </>
                                                    ) : null
                                                    }
                                                </div>

                                                {/* Hiện yêu thích bình luận */}
                                                <div className="w-full pt-5 mt-auto">
                                                    <div className="mr-auto flex gap-2">
                                                        {/* Nhấn nút thả tim */}
                                                        {!iLike?.filter(like => like[item.idpost])?.length > 0 ?
                                                            <button
                                                                onClick={() => handlelike(item.idpost, item.like)}
                                                                className="px-2 py-1 border rounded-md gap-2 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                                                            >
                                                                <FavoriteBorderIcon />
                                                                {item.like}
                                                            </button>
                                                            :
                                                            <button
                                                                onClick={() => handlelike(item.idpost, item.like)}
                                                                className="px-2 py-1 border rounded-md gap-2 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                                                            >
                                                                <FavoriteIcon className="text-red-500" />
                                                                {item.like}
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 5,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
        </>
    );
}

export default CreatorChannelPage;
