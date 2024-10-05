import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";

import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import postFireBase from "../../common/services/post.services";
import { auth } from "../../common/themes/firebase";
import VideoFireBase from "../../common/services/Video.services";
import comicFireBase from "../../common/services/Comic.services";
import { Link } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import userFireBase from "../../common/services/User.services";
import { getAccount } from "../../common/store/Account";
import { unwrapResult } from "@reduxjs/toolkit";

//https://www.ausp.edu.vn/uploads/blog/2024/05/16/1ecf77502b3bc514b2f535533d7b01f03a772174-1715817458.jpg
const MyChannelPage = () => {
  const [photos, setPhotos] = useState([]); // Lưu các ảnh đã chọn 0
  const [getphotos, setgetPhotos] = useState([null]);
  // Hiện thị phản hồi của bình luận
  const [post, setpost] = useState("");
  const [posts, setposts] = useState([]);

  const [iLike, setILike] = useState([]);
  const [Video, setVideo] = useState([]);
  const [comic, setcomic] = useState([]);
  const [loading, setloading] = useState();
  const dispatch = useDispatch();

  const Account = useSelector((state) => state.Account.Account);

  //Lấy ngôn ngữ
  const language = useSelector((state) => state.hidden.language);

  // State để lưu chỉ số hiện tại cho mỗi bài viết
  const [currentIndices, setCurrentIndices] = useState({});
  useEffect(() => {
    const getpost = async () => {
      try {
        if (Account) {
          setloading(false);
          const post = await postFireBase.getAllid(Account.uid);
          const pot = await postFireBase.getlike(Account.uid);
          const videos = await VideoFireBase.getbyuser(Account.uid);
          const comics = await comicFireBase.getbyuser(Account.uid);
         
          setVideo(videos.success ? videos?.Video : []);
          setcomic(comics.success ? comics?.comic : []);
          const like = pot.post
            ?.filter((item) => item.success)
            .map((item) => {
              return { [item?.id]: item?.id };
            });
          setILike(like);
          setposts(post.success ? post?.post : []);
          const account=  await  dispatch(getAccount(Account.uid));
          unwrapResult(account)
          setloading(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getpost();
  }, [Account,dispatch]);
  const handleimageChange = async (e) => {
   try {
    const file = e.target.files[0];
    if (file) {
        
        await userFireBase.uploadToFirebase(file,file.name,Account.uid,"image")
        const account=  await  dispatch(getAccount(Account.uid));
        unwrapResult(account)
    }
   } catch (error) {
       
   }
  };
  const handlehorizontalThumbnailChange = async (e) => {
    try {
     const file = e.target.files[0];
     if (file) {
         
         await userFireBase.uploadToFirebase(file,file.name,Account.uid,"horizontalThumbnail")
         const account=  await  dispatch(getAccount(Account.uid));
         unwrapResult(account)
     }
    } catch (error) {
        
    }
   };
  // Hàm xử lý việc điều chỉnh chỉ số hiện tại cho một bài viết cụ thể để xem ảnh cuộn bài post
  const handlePrev = (postId) => {
    setCurrentIndices((prevIndices) => ({
      ...prevIndices,
      [postId]: Math.max((prevIndices[postId] || 0) - 1, 0),
    }));
  };

  const handleNext = (postId, imagesLength) => {
    console.log(iLike);
    setCurrentIndices((prevIndices) => ({
      ...prevIndices,
      [postId]: Math.min((prevIndices[postId] || 0) + 1, imagesLength - 2),
    }));
  };

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
      const newPhoto = [...getphotos];
      newPhoto[index] = file;
      newPhotos[index] = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
      setPhotos(newPhotos);
      setgetPhotos(newPhoto);
    }
  };
  const handlepost = async () => {
    try {
      if (auth.currentUser.uid) {
        console.log(getphotos);
        const res = await postFireBase.Add({
          uid: auth.currentUser.uid,
          createTime: new Date(Date.now()),
          post,
          image: [],
          like: 0,
        });
        if (getphotos.length !== 0) {
          for (const photo of getphotos) {
            try {
              await postFireBase.uploadToFirebase(
                photo,
                photo.name,
                auth?.currentUser?.uid,
                res
              );
              console.log(`Ảnh ${photo.name} đã được upload thành công!`);
            } catch (error) {
              console.error(`Lỗi upload ảnh ${photo.name}:`, error);
              // Xử lý lỗi cho từng ảnh (nếu cần)
            }
          }
        }
        const posts = await postFireBase.getAllid(Account.uid);
        setposts(posts.success ? posts?.post : []);
        setpost("");
        setPhotos([]);
        setgetPhotos([]);
      }
    } catch (error) {
      console.log(error);
    }
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
        const pot = await postFireBase.getlike(Account.uid);
        const like = pot.post
          ?.filter((item) => item.success)
          .map((item) => {
            return { [item?.id]: item?.id };
          });
        setILike(like);
        const posts = await postFireBase.getAllid(Account.uid);
        setposts(posts.success ? posts?.post : []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-full pb-10 border bg-gray-100 flex items-center justify-center">
          <div className="w-[1120px] h-full">
            <div className="w-full h-full bg-white rounded-lg">
              {/* Hiển thị ảnh nền */}
              <div className="w-full h-[400px] bg-green-200 rounded-lg relative">
                <img
                  src={
                    Account?.horizontalThumbnail
                      ? Account?.horizontalThumbnail
                      : "https://wallpapers.com/images/hd/chill-anime-girl-during-winter-n65e3iefecsy01if.jpg"
                  }
                  className="object-cover w-[1200px] h-full rounded-t-lg"
                  alt="img"
                />
                {/* Nút thay ảnh bìa */}
                <div className="absolute  px-5 py-5 bottom-0 right-0">
                  <button className="w-[170px] relative py-2 px-2 bg-white hover:bg-gray-100 rounded shadow font-semibold flex gap-2 items-center justify-center">
                    <PhotoCameraIcon />
                    {!language ? (
                      <span> Edit cover photo </span>
                    ) : (
                      <span> 커버 사진 편집 </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlehorizontalThumbnailChange(e)}
                      className="absolute inset-0 opacity-0 cursor-pointer "
                    />
                  </button>
                </div>
              </div>

              {/* Hiển thị thông tin tác giả */}
              <div className="w-full h-[180px] px-[30px] bg-white rounded-b-lg flex">
                <div className="w-[185px] h-[185px] rounded-full border-4 mt-[-30px] flex items-center justify-center relative">
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      Account?.image
                        ? Account?.image
                        : "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                    }
                    sx={{ width: 180, height: 180 }}
                  />

                  {/* Nút thay ảnh Avatar */}
                  <div className="absolute bottom-0 right-0 ">
                    <button className="w-[40px] h-[40px] relative    border-2 rounded-full shadow bg-white hover:bg-gray-100 flex items-center justify-center">
                      <PhotoCameraIcon />
                      <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleimageChange(e)}
                      className="absolute inset-0 opacity-0  cursor-pointer "
                    />
                    </button>
                  </div>
                </div>

                <div className="py-4 px-3">
                  <div className="">
                    <span className="text-[35px] font-semibold text-yellow-500 text-shadow-black">
                      {Account?.name}
                    </span>
                  </div>
                  <div className="px-1">
                    <span className="text-[18px] text-yellow-400 text-shadow-black">
                      Commic, video
                    </span>
                  </div>
                  <div className="px-1 py-4 flex">
                    <div className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                      {!language ? (
                        <span> Original Series: </span>
                      ) : (
                        <span> 오리지널 시리즈: </span>
                      )}{" "}
                      {comic?.length}
                    </div>
                    <div className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                      {!language ? (
                        <span> Video Series: </span>
                      ) : (
                        <span> 비디오 시리즈: </span>
                      )}{" "}
                      {Video?.length}
                    </div>
                    <div className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                      {!language ? (
                        <span> Followers: </span>
                      ) : (
                        <span> 팔로워: </span>
                      )}{" "}
                      {Account?.follow}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full flex gap-3 mt-3">
              <div className="w-[420px] h-full grid grid-cols-1 gap-3">
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
                <div className="w-full h-[550px] px-5 py-3 bg-white rounded-lg">
                  <div className="font-semibold text-[20px] text-black">
                    {!language ? (
                      <span>Original Series </span>
                    ) : (
                      <span> 오리지널 시리즈 </span>
                    )}
                  </div>

                  <div className="mt-5 h-[450px] custom-scrollbar">
                    <ul className="w-full">
                      {comic?.slice(0, 5)?.map((item) => (
                        <Link
                          className="w-full h-[90px] hover:bg-gray-100 flex items-center border-t border-b cursor-pointer"
                          key={item.id}
                          to={`/originals/original/series/${item.id}`}
                        >
                          <div className="w-[80px] h-[80px] rounded">
                            <img
                              src={item.squareThumbnail}
                              alt="img"
                              className="object-fill w-full h-full rounded"
                            />
                          </div>

                          <div className="h-full rounded-xl px-3 py-3 flex items-center">
                            <div className="w-[200px] overflow-hidden ">
                              <span className="w-full text-lg font-semibold line-clamp-1">
                                {item.title}
                              </span>
                              <span className="w-full text-[15px] line-clamp-1">
                                {item.genre1}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Khung hiển thị các Series Video của tác giả */}
                <div className="w-full h-[550px] px-5 py-3 bg-white rounded-lg">
                  <div className="font-semibold text-[20px] text-black">
                    {!language ? (
                      <span>Video Series </span>
                    ) : (
                      <span> 비디오 시리즈 </span>
                    )}
                  </div>

                  <div className="mt-5 h-[450px] custom-scrollbar">
                    <ul className="w-full">
                      {Video?.slice(0, 5)?.map((item) => (
                        <Link
                          className="w-full h-[90px] hover:bg-gray-100 flex items-center border-t border-b cursor-pointer"
                          key={item.id}
                          to={`/videos/video/series/${item.id}`}
                        >
                          <div className="w-[80px] h-[80px] rounded">
                            <img
                              src={item.squareThumbnail}
                              alt="img"
                              className="object-fill w-full h-full rounded"
                            />
                          </div>

                          <div className="h-full rounded-xl px-3 py-3 flex items-center">
                            <div className="w-[200px] overflow-hidden ">
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

              {/* Tạo bài viết và Hiển thị các bài viết của tôi */}
              <div className="w-[700px] h-full grid grid-cols-1 gap-3">
                {/* Tạo bài viết */}
                <div className="w-full h-full px-5 pt-3 pb-10 bg-white rounded-lg">
                  {/* Tiêu đề */}
                  <div className="w-full h-[40px] border-b-2 border-bg-black">
                    <div className="font-semibold text-[20px] text-black">
                      {!language ? (
                        <span> Create Articles </span>
                      ) : (
                        <span> 글 작성하기 </span>
                      )}
                    </div>
                  </div>

                  {/* Nhập bài viết và ảnh */}
                  <div className="w-full">
                    {/* Hiển thị avatar */}
                    <div className="w-full mt-5 flex items-center justify-center">
                      <div className="">
                        <Avatar
                          alt="Creator Avatar"
                          src={
                            Account?.image
                              ? Account?.image
                              : "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                          }
                          sx={{ width: 50, height: 50 }}
                        />
                      </div>
                      <div className="px-2 mr-auto">
                        <div className="w-full">
                          <span className="font-semibold">{Account?.name}</span>
                        </div>
                        <div className="w-full">
                          <span className="text-gray-400">
                            {new Date(Date.now()).getDate()}/
                            {new Date(Date.now()).getMonth() + 1}/
                            {new Date(Date.now())?.getFullYear()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Ô nhập nội dung bài viết */}
                    <div className="w-full mt-5 px-3">
                      <textarea
                        placeholder="What are you thinking?"
                        className="w-full h-[160px] rounded-md px-3 py-3 border-2"
                        value={post}
                        onChange={(e) => setpost(e.target.value)}
                      />
                    </div>

                    {/* Phần thêm ảnh vào bài viết */}
                    <div className="w-full mt-5 px-3">
                      <div className="flex flex-wrap gap-5 mb-5">
                        {photos.map((photo, index) => (
                          <div
                            key={index}
                            className="relative w-[300px] h-[300px] text-black border bg-gray-50 hover:bg-gray-100 rounded flex justify-center items-center"
                          >
                            {photo ? (
                              <img
                                src={photo}
                                alt="Selected"
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
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
                          className="w-[120px] px-2 py-2 border font-semibold rounded-full bg-gray-50 hover:bg-gray-100 shadow"
                        >
                          {!language ? (
                            <span> Add Image</span>
                          ) : (
                            <span> 이미지 추가</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Đăng bài viết */}
                  <div className="flex items-center justify-center mt-5">
                    <button
                      className="w-1/2 bg-gray-50 hover:bg-gray-100 border font-semibold shadow text-black py-2 mt-5 rounded"
                      onClick={handlepost}
                    >
                      {!language ? (
                        <span> Post Article </span>
                      ) : (
                        <span> 글 작성 </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Hiển thị các bài viết của tác giả */}
                <div className="w-full h-full px-5 pt-3 pb-10 bg-white rounded-lg">
                  {/* Tiêu đề */}
                  <div className="w-full h-[40px] border-b-2 border-bg-black">
                    <div className="font-semibold text-[20px] text-black">
                      {!language ? (
                        <span> Feed </span>
                      ) : (
                        <span> 피드 </span>
                      )}
                    </div>
                  </div>

                  {/* Danh sách bài post */}
                  <ul className="w-full h-full">
                    {/* Khung nội dung chính bài Post */}
                    {posts?.map((item) => (
                      <li
                        key={item.idpost}
                        className="w-full min-h-[300px] py-5 border-b-2"
                      >
                        {/* Hiển Avatar creator */}
                        <div className="w-full">
                          <div className="flex items-center justify-center">
                            <div className="">
                              <Avatar
                                alt="Creator Avatar"
                                src={
                                  Account?.image
                                    ? Account?.image
                                    : "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                                }
                                sx={{ width: 50, height: 50 }}
                              />
                            </div>
                            <div className="px-2">
                              <div className="flex">
                                <span className="font-semibold">
                                  {Account?.name}
                                </span>
                              </div>
                              <div className="">
                                <span className="text-gray-400">
                                  {new Date(item.createTime).getDate()}/
                                  {new Date(item.createTime).getMonth() + 1}/
                                  {new Date(item.createTime)?.getFullYear()}
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
                          <p>{item.post}</p>
                        </div>

                        {/* Hiện hình ảnh bài viết */}
                        <div className="relative w-full flex items-center justify-center p-4">
                          <button
                            onClick={() => handlePrev(item.idpost)}
                            disabled={(currentIndices[item.idpost] || 0) === 0}
                            className="absolute left-0 bg-gray-500 text-white p-2 rounded-full disabled:opacity-50"
                          >
                            <NavigateBeforeIcon />
                          </button>
                          <div className="flex gap-3 overflow-hidden w-full">
                            {item.image
                              ?.slice(
                                currentIndices[item.idpost] || 0,
                                (currentIndices[item.idpost] || 0) + 2
                              )
                              ?.map((img, index) => (
                                <img
                                  key={index}
                                  src={img}
                                  alt={`Slide ${index}`}
                                  className="object-cover w-[300px] h-[300px] transition-transform duration-300 ease-in-out"
                                />
                              ))}
                          </div>
                          <button
                            onClick={() =>
                              handleNext(item.idpost, item.image?.length)
                            }
                            disabled={
                              (currentIndices[item.idpost] || 0) >=
                              item.image?.length - 2
                            }
                            className="absolute right-0 bg-gray-500 text-white p-2 rounded-full disabled:opacity-50"
                          >
                            <NavigateNextIcon />
                          </button>
                        </div>

                        {/* Hiện yêu thích bình luận */}
                        <div className="w-full pt-5">
                          <div className="mr-auto flex gap-2">
                            {/* Nhấn nút thả tim */}
                            {!iLike?.filter((like) => like[item.idpost])
                              ?.length > 0 ? (
                              <button
                                onClick={() =>
                                  handlelike(item.idpost, item.like)
                                }
                                className="px-2 py-1 border rounded-md gap-2 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                              >
                                <FavoriteBorderIcon />
                                {item.like}
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handlelike(item.idpost, item.like)
                                }
                                className="px-2 py-1 border rounded-md gap-2 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                              >
                                <FavoriteIcon className="text-red-500" />
                                {item.like}
                              </button>
                            )}
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
      ) : (
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
};

export default MyChannelPage;
