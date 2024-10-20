import React, { useState, useEffect, useCallback } from "react";
import { animateScroll as scroll } from 'react-scroll';
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import logo from "../../../img/logonew.png";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckIcon from "@mui/icons-material/Check";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { AddComment, getidseriesVideo } from "../../../common/store/Comment";
import { setIsLoginModal, setlanguage } from "../../../common/store/hidden";
import LoginPage from "../../auth/login";
import { auth } from "../../../common/themes/firebase";
import { getAccount } from "../../../common/store/Account";
import CommentFireBase from "../../../common/services/Comment.services";
import SubscribeFireBase from "../../../common/services/Subscribe.services";
import comicFireBase from "../../../common/services/Comic.services";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useTimeout from "../../../Hooks/useTimeout";
import {
  getAllVideo,
  getchaptersVideo,
  getidVideo,
} from "../../../common/store/Video";
import VideoFireBase from "../../../common/services/Video.services";
import PaymentFireBase from "../../../common/services/Payment.services";
import { useNavigate } from "react-router-dom";
import FooterPage from "../../../components/layout/layoutUser/footer";

const DisplayVideoPage = () => {
  //Xem các tập tiếp theo trong series
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const id = useParams();
  const [getcomment, setComment] = useState("");
  const [getrep, setrep] = useState("");
  const [reps, setreps] = useState("");
  const [Subscribe, setSubscribe] = useState([[]]);
  const [chapid, setchapid] = useState([]);
  const [loading, setloading] = useState(false);
  const [countlike, setcountlike] = useState(0);
  const gcomment = useSelector((state) => state.Comment.comment);
  const isLoginModal = useSelector((state) => state.hidden.isLoginModal);
  const Videoid = useSelector((state) => state.Video.videoid);
  const chapters = useSelector((state) => state.Video.Chapters);
  const Video = useSelector((state) => state.Video.video);
  const Account = useSelector((state) => state.Account.Account);
  const check19Modal = useSelector(state => state.hidden.check19Modal);

  const navigate = useNavigate();

  const days = [{ 'day': 'Mon', 'daysInKorean': '월요일' }, { 'day': 'Tue', 'daysInKorean': '화요일' }, { 'day': 'Wed', 'daysInKorean': '수요일' }, { 'day': 'Thu', 'daysInKorean': '목요일' }, { 'day': 'Fri', 'daysInKorean': '금요일' }, { 'day': 'Sat', 'daysInKorean': '토요일' }, { 'day': 'Sun', 'daysInKorean': '일요일' }]
  const koreanDay = days.find(d => d.day === Videoid.schedule)?.daysInKorean || '';

  const monthNames = [
    { en: "January", kr: "1월" },
    { en: "February", kr: "2월" },
    { en: "March", kr: "3월" },
    { en: "April", kr: "4월" },
    { en: "May", kr: "5월" },
    { en: "June", kr: "6월" },
    { en: "July", kr: "7월" },
    { en: "August", kr: "8월" },
    { en: "September", kr: "9월" },
    { en: "October", kr: "10월" },
    { en: "November", kr: "11월" },
    { en: "December", kr: "12월" }
  ];
  // Hiện thị phản hồi của bình luận
  const [replyCommentId, setReplyCommentId] = useState(null);
  // Nhấn nút đăng ký
  const [isSubscribe, setIsSubscribe] = useState(false);

  // Nhấn nút thả tim
  const [isLike, setIsLike] = useState(false);

  //Lấy ngôn ngữ
  const language = useSelector((state) => state.hidden.language);

  // hiện số lượng nội dung theo git
  // State lưu số lượng items per page

  useEffect(() => {
    const xsQuery = window.matchMedia("(max-width: 640px)"); // Tailwind xs is 0px - 640px
    const smQuery = window.matchMedia("(min-width: 640px) and (max-width: 768px)"); // Tailwind sm is 640px - 768px
    const lgQuery = window.matchMedia("(min-width: 1024px) and (max-width: 1280px)"); // Tailwind lg is 1024px - 1280px
    const xlQuery = window.matchMedia("(min-width: 1280px)"); // Tailwind xl starts from 1280px

    // Hàm kiểm tra kích thước hiện tại và cập nhật itemsPerPage
    const updateItemsPerPage = () => {
      if (xsQuery.matches) {
        setItemsPerPage(2); // xs:grid-cols-2
      } else if (smQuery.matches) {
        setItemsPerPage(4); // sm:grid-cols-4
      } else if (lgQuery.matches) {
        setItemsPerPage(6); // lg:grid-cols-6
      } else if (xlQuery.matches) {
        setItemsPerPage(9); // xl:grid-cols-9
      } else {
        setItemsPerPage(9); // Mặc định là xl nếu không có điều kiện nào khớp
      }
    };

    // Lắng nghe sự thay đổi của từng media query
    xsQuery.addEventListener("change", updateItemsPerPage);
    smQuery.addEventListener("change", updateItemsPerPage);
    lgQuery.addEventListener("change", updateItemsPerPage);
    xlQuery.addEventListener("change", updateItemsPerPage);

    // Chạy hàm updateItemsPerPage ban đầu để cập nhật đúng ngay từ đầu
    updateItemsPerPage();

    // Cleanup event listener khi component unmount
    return () => {
      xsQuery.removeEventListener("change", updateItemsPerPage);
      smQuery.removeEventListener("change", updateItemsPerPage);
      lgQuery.removeEventListener("change", updateItemsPerPage);
      xlQuery.removeEventListener("change", updateItemsPerPage);
    };
  }, []);

  //
  const dispatch = useDispatch();
  useTimeout(async () => {
    try {
      await VideoFireBase.updateep(
        { views: chapid?.views + 1 },
        id.id,
        id.idseries
      );
    } catch (error) { }
  }, 10000);
  useEffect(() => {
    const getcomments = async () => {
      try {
        setloading(false);
        localStorage.getItem("language") === "en" ? dispatch(setlanguage(false)) : dispatch(setlanguage(true))
        if (auth.currentUser) {
          const comments = await dispatch(getidseriesVideo(id.idseries));
          const VideoID = await dispatch(getidVideo(id.id));
          const chap = await dispatch(getchaptersVideo(id.id));
          const videoid = unwrapResult(VideoID);
          const chapid = unwrapResult(chap);
          setchapid(
            chapid.success
              ? chapid?.chaps.filter((item) => item.id === id.idseries)[0]
              : []
          );
          setcountlike(
            chapid.success
              ? chapid?.chaps.filter((item) => item.id === id.idseries)[0].likes
              : 0
          );

          unwrapResult(comments);
          const account = await dispatch(getAccount(auth?.currentUser?.uid));
          const user = unwrapResult(account);
          if (user?.checkage) {
            const age = account?.payload?.birthday
              ? new Date(Date.now())?.getFullYear() -
              new Date(user.birthday)?.getFullYear()
              : 15;
            const lg = await dispatch(getAllVideo(age));
            unwrapResult(lg);
          } else {
            const lg = await dispatch(getAllVideo());
            unwrapResult(lg);
          }
          const subscribe = await SubscribeFireBase.getbyvideo(
            auth.currentUser.uid,
            id.id
          );
          const like = await comicFireBase.getidlikechap(
            id.id,
            id.idseries,
            auth.currentUser.uid
          );
          const payment = await PaymentFireBase.getbyuser(
            auth.currentUser.uid,
            id.id
          );
          if (videoid?.payment) {
            if (payment.success) {
              payment.payment[0]?.status !== "success" &&
                navigate(`/videos/video/series/${id.id}`);
            } else {


              navigate(`/videos/video/series/${id.id}`);
            }
          }
          setIsLike(like.success);
          subscribe.success ? setIsSubscribe(true) : setIsSubscribe(false);
          subscribe.success
            ? setSubscribe(subscribe.subscribe)
            : setSubscribe([]);
        } else {
          const comments = await dispatch(getidseriesVideo(id.idseries));
          const VideoID = await dispatch(getidVideo(id.id));
          const chap = await dispatch(getchaptersVideo(id.id));

          const videoid = unwrapResult(VideoID);
          if (videoid?.payment && !auth.currentUser) {
            navigate(`/videos/video/series/${id.id}`);
          }
          const chapid = unwrapResult(chap);
          setchapid(
            chapid.success
              ? chapid?.chaps.filter((item) => item.id === id.idseries)[0]
              : []
          );
          setcountlike(
            chapid.success
              ? chapid?.chaps.filter((item) => item.id === id.idseries)[0].likes
              : 0
          );

          unwrapResult(comments);
          const lg = await dispatch(getAllVideo());
          unwrapResult(lg);
        }
        setloading(true);
      } catch (error) { }
    };
    getcomments();
  }, [dispatch, navigate, id, check19Modal]);

  const closeLoginModal = () => {
    dispatch(setIsLoginModal(false));
  };
  const handleNextPage = () => {
    const totalPages = Math.ceil(chapters?.chaps?.filter(item => item.check === true)?.length / itemsPerPage);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage < totalPages ? nextPage : currentPage);
  };

  const handlePreviousPage = () => {
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage >= 0 ? previousPage : 0);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, chapters?.chaps?.filter(item => item.check === true)?.length);

  const currentItems = chapters?.chaps?.filter(item => item.check === true)?.slice(startIndex, endIndex);

  const handleToggleReply = async (commentId) => {
    try {
      const rep = await CommentFireBase.getidrep(commentId);
      setreps(rep.success ? rep?.rep : []);
      setReplyCommentId(commentId === replyCommentId ? null : commentId);
    } catch (error) { }
  };
  const handlesubscribe = async () => {
    try {
      if (auth.currentUser) {
        await SubscribeFireBase.Add({
          uid: auth.currentUser.uid,
          idvideo: id.id,
          createTime: new Date(Date.now()),
          type: "video",
        });
        await VideoFireBase.update(
          { totalSubscribed: Videoid.totalSubscribed + 1 },
          id.id
        );
        await dispatch(getidVideo(id.id));

        const subscribe = await SubscribeFireBase.getbyvideo(
          auth.currentUser.uid,
          id.id
        );

        subscribe.success ? setIsSubscribe(true) : setIsSubscribe(false);
        subscribe.success
          ? setSubscribe(subscribe.subscribe)
          : setSubscribe([]);
      }
    } catch (error) { }
  };
  const handleDeleteSub = async () => {
    try {
      if (auth.currentUser) {
        await SubscribeFireBase.Delete(Subscribe[0]?.id);
        await VideoFireBase.update(
          { totalSubscribed: Videoid.totalSubscribed - 1 },
          id.id
        );
        await dispatch(getidVideo(id.id));
        const subscribe = await SubscribeFireBase.getbyvideo(
          auth.currentUser.uid,
          id.id
        );
        subscribe.success ? setIsSubscribe(true) : setIsSubscribe(false);
        subscribe.success
          ? setSubscribe(subscribe.subscribe)
          : setSubscribe([]);
      }
    } catch (error) { }
  };
  const handlelikechap = async () => {
    try {
      if (auth?.currentUser) {
        await VideoFireBase.Addlikechap({
          id: id.id,
          idseries: id.idseries,
          uid: auth?.currentUser?.uid,
          like: true,
          togglelike: chapid?.likes,
        });

        const like = await VideoFireBase.getidlikechap(
          id.id,
          id.idseries,
          auth.currentUser.uid
        );
        setIsLike(like.success);
        const chap = await dispatch(getchaptersVideo(id.id));
        const getchapid = unwrapResult(chap);
        setcountlike(
          getchapid.success
            ? getchapid?.chaps.filter((item) => item.id === id.idseries)[0]
              .likes
            : 0
        );
        // const pot = await postFireBase.getlike(Account.uid);
        // const like= pot.post?.filter(item=>item.success).map(item=>{   return{[item?.id]: item?.id}})
        // setILike(like);
        // const posts = await postFireBase.getAllid(Account.uid);
        //     setposts(posts.success ? posts?.post : []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleComment = async () => {
    try {
      if (auth?.currentUser) {
        const account = await dispatch(getAccount(auth?.currentUser?.uid));
        const getacc = unwrapResult(account);
        const data = {
          comment: getcomment,
          createTime: new Date(Date.now()),
          like: 0,
          type: "Video",
          dislike: 0,
          id: id.idseries,
          uid: auth?.currentUser?.uid,
          idVideo: id.id,
          replies: 0,
          nameUser: getacc?.name,
        };
        const comment = await dispatch(AddComment(data));
        unwrapResult(comment);
        setComment("");
      } else {
        dispatch(setIsLoginModal(true));
        setComment("");
      }
    } catch (error) { }
  };
  const handlelike = async (idcomment, togglelike) => {
    try {
      if (auth?.currentUser) {
        await CommentFireBase.Addlike({
          idcomment,
          uid: auth?.currentUser?.uid,
          like: true,
          togglelike,
        });
        const comments = await dispatch(getidseriesVideo(id.idseries));
        unwrapResult(comments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handledislike = async (idcomment, toggledislike) => {
    try {
      if (auth?.currentUser) {
        await CommentFireBase.Adddislike({
          idcomment,
          uid: auth?.currentUser?.uid,
          dislike: true,
          toggledislike,
        });
        const comments = await dispatch(getidseriesVideo(id.idseries));
        unwrapResult(comments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlerep = async (idcomment) => {
    try {
      if (auth?.currentUser) {
        const data = {
          rep: getrep,
          idcomment,
          createTime: new Date(Date.now()),
          like: 0,
          dislike: 0,
          idseries: id.idseries,
          uid: auth?.currentUser?.uid,
          idVideo: id.id,
          nameUser: Account?.name,
        };
        await CommentFireBase.AddRep(data);
        const rep = await CommentFireBase.getidrep(idcomment);
        await CommentFireBase.update(
          { replies: rep.success ? rep?.rep.length : 0 },
          idcomment
        );
        setreps(rep.success ? rep?.rep : []);
        setrep("");
      } else {
        dispatch(setIsLoginModal(true));
        setrep("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const repdislike = async (idcomment, idrep, toggledislike) => {
    try {
      if (auth?.currentUser) {
        await CommentFireBase.Addrepdislike({
          idcomment,
          uid: auth?.currentUser?.uid,
          idrep,
          dislike: true,
          toggledislike,
        });
        const rep = await CommentFireBase.getidrep(idcomment);
        setreps(rep.success ? rep?.rep : []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const replike = async (idcomment, idrep, togglelike) => {
    try {
      if (auth?.currentUser) {
        await CommentFireBase.Addreplike({
          idcomment,
          uid: auth?.currentUser?.uid,
          idrep,
          like: true,
          togglelike,
        });
        const rep = await CommentFireBase.getidrep(idcomment);
        setreps(rep.success ? rep?.rep : []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const goToPreviousChapter = () => {
    const Previous = chapters?.chaps?.filter(item => chapid.num - 1 === item.num && item.check === true)
    Previous.length !== 0 && navigate(`/videos/video/series/display/${id.id}/${Previous[0]?.id}`);
  };

  const goToNextChapter = () => {
    const Next = chapters?.chaps?.filter(item => chapid.num + 1 === item.num && item.check === true)
    Next.length !== 0 && navigate(`/videos/video/series/display/${id.id}/${Next[0]?.id}`);
  };

  // lướt xuống mất thanh công cụ lướt lên thì hiện
  const [showToolbar, setShowToolbar] = useState(true); // Trạng thái hiển thị thanh công cụ
  const [lastScrollY, setLastScrollY] = useState(0);    // Lưu trữ vị trí cuộn cuối cùng

  const controlNavbar = useCallback(() => {
    const scrollY = window.scrollY; // Lấy vị trí cuộn hiện tại

    // Nếu cuộn xuống hơn 10px và hiện tại đang hiển thị thanh công cụ
    if (scrollY > lastScrollY + 10 && showToolbar) {
      setShowToolbar(false); // Ẩn thanh công cụ
    }
    // Nếu cuộn lên hơn 10px và hiện tại không hiển thị thanh công cụ
    else if (scrollY < lastScrollY - 10 && !showToolbar) {
      setShowToolbar(true); // Hiển thị thanh công cụ
    }

    // Cập nhật vị trí cuộn mới
    setLastScrollY(scrollY);
  }, [lastScrollY, showToolbar]); // Thêm showToolbar vào dependency

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    // Cleanup sự kiện khi component bị unmount
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [controlNavbar]); // Thêm controlNavbar vào dependency

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500, // Thời gian cuộn (ms)
      smooth: true,  // Cuộn mượt
    });
  };

  return (
    <div>
      {!loading ? (
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
      ) : (
        <>
          <div className="w-full h-full bg-white">
            {/* Thanh công cụ */}
            <div className={`fixed w-full h-[50px] bg-black flex items-center px-5 z-50 transition-transform duration-300 ${showToolbar ? 'translate-y-0' : '-translate-y-full'}`}>
              <ul className="w-full h-full grid xs:grid-cols-3">

                {/* logo và tên series */}
                <li className="h-full flex items-center gap-2 overflow-hidden">
                  <div className="w-[50px] h-auto flex items-center">
                    <Link to={`/`}>
                      <img
                        src={logo}
                        alt="Logo"
                        className="min-w-[50px] max-w-[50px] h-auto rounded-md bg-black"
                      />
                    </Link>
                  </div>

                  <div className="w-auto h-auto text-white flex items-center overflow-hidden">
                    <Link
                      to={`/videos/video/series/${id.id}`}
                      className="text-white hover:text-yellow-500 line-clamp-1"
                    >
                      {Videoid.title}
                    </Link>

                    <NavigateNextIcon />

                    <span className="text-white line-clamp-1">
                      {chapid?.chapterTitle}
                    </span>
                  </div>
                </li>

                {/* Chuyển tập */}
                <li className="w-full flex items-center justify-center">
                  <div className="min-w-[150px] max-w-[150px] flex ">
                    <button className="mr-auto cursor-pointer">
                      <span onClick={goToPreviousChapter} className="text-white bg-gray-800 hover:bg-gray-700 pl-3 py-1 rounded-md flex items-center justify-center">
                        <ArrowBackIosIcon />
                      </span>
                    </button>
                    <div className="w-full ml-auto mr-auto">
                      <span className="w-full rounded-md py-1 flex items-center justify-center text-white">
                        #{chapid?.num}
                      </span>
                    </div>
                    <button className="ml-auto cursor-pointer">
                      <span onClick={goToNextChapter} className="text-white bg-gray-800 hover:bg-gray-700 w-[35px] py-1 rounded-md flex items-center justify-center">
                        <ArrowForwardIosIcon />
                      </span>
                    </button>
                  </div>
                </li>

                {/* nút thêm */}
                <li className="flex items-center pl-7">
                  <button
                    onClick={scrollToTop}
                    className="w-[40px] h-[35px] mr-auto bg-gray-800 hover:bg-gray-700 shadow  rounded-md text-white flex items-center justify-center"
                  >
                    <ArrowUpwardIcon />
                  </button>

                  <button className="w-[35px] h-[35px] ml-auto text-white rounded-full bg-gray-800 flex items-center justify-center">
                    <AddIcon />
                  </button>
                </li>
              </ul>
            </div>

            {/* Hiển thị nội dung truyện */}
            <div className="w-full h-auto pt-[50px] bg-black flex items-center justify-center">
              <ReactPlayer
                url={
                  chapid?.fileURL
                    ? chapid?.fileURL
                    : "https://www.youtube.com/watch?v=CnDNIEe7G0I"
                }
                controls={true}
                width="80%"
                height="100%"
              />
            </div>

            {/* Hiển thị chọn yêu thích, theo dõi */}
            <div className="w-full h-[200px] bg-white flex items-center justify-center">
              <div className="w-full">

                <div className="flex items-center justify-center">
                  <div className="w-auto flex gap-3 pb-3">
                    <span className="w-[35px] h-[35px] uppercase bg-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                      Up
                    </span>
                    <span className="text-xl uppercase font-semibold flex items-center">
                      {!language ? (
                        <span> EVERY {Videoid.schedule}DAY </span>
                      ) : (
                        <span> 매주 {koreanDay} </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex-auto mb-3">
                  <span className="flex items-center justify-center text-yellow-800 font-semibold">
                    {!language ? <span> Creator </span> : <span> 창조자 </span>}
                  </span>
                  <span className="flex items-center justify-center text-yellow-600 text-lg font-semibold">
                    {Videoid?.Author}
                  </span>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex gap-3">
                    {/* Nhấn nút thả tim */}
                    {!isLike ? (
                      <button
                        onClick={handlelikechap}
                        className="w-[100px] h-[35px] rounded-full bg-gray-100 hover:bg-gray-200 flex gap-1 items-center justify-center px-2 py-2"
                      >
                        <FavoriteBorderIcon />
                        {countlike}
                      </button>
                    ) : (
                      <button
                        onClick={handlelikechap}
                        className="w-[100px] h-[35px] rounded-full bg-gray-100 hover:bg-gray-200 flex gap-1 items-center justify-center px-2 py-2"
                      >
                        <FavoriteIcon className="text-red-500" />
                        {countlike}
                      </button>
                    )}
                    {/* Nhấn nút đăng ký */}
                    {!isSubscribe ? (
                      <button
                        onClick={handlesubscribe}
                        className="w-[120px] h-[35px] rounded-full bg-gray-100 hover:bg-gray-200 flex gap-1 items-center justify-center px-2 py-2"
                      >
                        <AddIcon />
                        {!language ? (
                          <span> Subscribe </span>
                        ) : (
                          <span> 구독하기 </span>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={handleDeleteSub}
                        className="w-[35px] h-[35px] text-black hover:text-yellow-500 bg-gray-100 hover:bg-gray-200 py-2 px-2 rounded-full flex gap-1 items-center justify-center"
                      >
                        <CheckIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Hiển thị các tập trong series */}
            <div className="w-full h-[220px] bg-gray-100 flex items-center justify-center">
              <div
                className="min-w-[35px] max-w-[35px] h-[100px] cursor-pointer border bg-red-100 hover:shadow-md rounded-md mx-3 flex items-center justify-center"
                onClick={handlePreviousPage}
              >
                <span className="ml-2 hover:text-white">
                  <ArrowBackIosIcon />
                </span>
              </div>

              <ul className="grid xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9">
                {currentItems?.map((item) => (
                  <Link
                    to={`/videos/video/series/display/${id.id}/${item.id}`}
                    key={item.id}
                    className={`w-[120px] h-[165px] py-2 cursor-pointer rounded-md hover:bg-gray-200 flex items-center justify-center overflow-hidden
                      ${id.idseries === item.id ? "bg-gray-200" : " "}`}
                  >
                    <div className="w-[100px] h-[100px] mb-auto">
                      <img
                        src={item.horizontalThumbnail}
                        alt="img"
                        className="object-cover w-full h-full rounded"
                      />
                      <span className="h-[50px] leading-[1.3] line-clamp-2 py-1">
                        {item.chapterTitle}
                      </span>
                    </div>
                  </Link>
                ))}
              </ul>

              <div
                className="min-w-[35px] max-w-[35px] h-[100px] cursor-pointer border bg-red-100 hover:shadow-md rounded-md mx-3 flex items-center justify-center"
                onClick={handleNextPage}
              >
                <span className="hover:text-white">
                  <ArrowForwardIosIcon />
                </span>
              </div>
            </div>

            {/* Hiển thị bình luận và danh sách truyện nổi bật */}
            <div className="w-full h-full flex items-center justify-center my-5">
              <div className="w-[1200px] h-full grid xs:grid-cols-1 lg:grid-cols-3 bg-white pt-5 pb-10">
                {/* Bảng hiện thị bình luận */}
                <div className="xs:col-span-1 lg:col-span-2 h-full px-2">
                  {chapid?.checkcomment === "Enable" ? (
                    <div className="w-full h-full px-2">
                      <div className="w-full px-2 pr-5">
                        <div className="flex items-center pb-2">
                          <span className="font-semibold text-lg">
                            {!language ? (
                              <span> Comments </span>
                            ) : (
                              <span> 댓글 </span>
                            )}
                          </span>
                          <span className="px-2 text-gray-400">
                            {" "}
                            {gcomment?.Comment ? gcomment?.Comment?.length : 0}
                          </span>
                        </div>

                        {/* Ô nhập bình luận */}
                        <div className="w-full h-full my-3">
                          <textarea
                            placeholder={!language ? "Leave a comment" : "댓글 달기."}
                            className="w-full h-[160px] rounded-md px-3 py-3 border-2"
                            value={getcomment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <button
                            onClick={handleComment}
                            className="px-3 py-2 ml-auto bg-green-500 hover:shadow-md text-white rounded-xl flex gap-2 items-center justify-center"
                          >
                            <SendRoundedIcon className="transform rotate-200" />
                            {!language ? (
                              <span> Send </span>
                            ) : (
                              <span> 보내기 </span>
                            )}
                          </button>
                        </div>

                        {/* Hiển thị danh sách các bình luận truyện */}
                        <div className="w-full h-full my-5 ">
                          <div className="px-3">
                            <ul className="flex gap-2">
                              <li className="px-5 py-5 cursor-pointer hover:text-green-500 font-semibold border-b-2">
                                {!language ? (
                                  <span> TOP </span>
                                ) : (
                                  <span> 최고 </span>
                                )}
                              </li>
                              <li className="px-5 py-5 cursor-pointer hover:text-green-500 font-semibold">
                                {!language ? (
                                  <span> NEWEST </span>
                                ) : (
                                  <span> 최신 </span>
                                )}
                              </li>
                            </ul>
                          </div>
                          <div className="w-full py-3">
                            <ul>
                              {gcomment?.Comment?.map((item) => (
                                <li key={item.idcomment}>
                                  {/* Hiện thị bình luận */}
                                  <div className="w-full h-[200px] rounded-md px-3 border-b bg-red-50 bg-opacity-50 my-2">
                                    <div className="w-full h-full">
                                      {/* Hiển thị tên user và ngày đăng bình luận */}
                                      <div className="w-full py-1 flex overflow-hidden">
                                        <span className="max-w-[500px] font-semibold line-clamp-1">
                                          {item.nameUser}
                                        </span>
                                        {!language ?
                                          <span className="text-gray-400 mx-2 line-clamp-1">
                                            {
                                              monthNames[
                                                new Date(item.createTime).getMonth()
                                              ].en
                                            }{" "}
                                            {new Date(item.createTime).getDate()},
                                            {new Date(
                                              item.createTime
                                            )?.getFullYear()}

                                          </span>
                                          : <span className="text-gray-400 mx-2 line-clamp-1">
                                            {
                                              monthNames[
                                                new Date(item.createTime).getMonth()
                                              ].kr
                                            }{" "}
                                            {new Date(item.createTime).getDate()}일,
                                            {new Date(
                                              item.createTime
                                            )?.getFullYear()}년

                                          </span>}
                                      </div>

                                      {/* Hiển thị nội dung bình luận */}
                                      <div className="h-[120px] px-2 custom-scrollbar">
                                        <span className="w-full">
                                          {item.comment}
                                        </span>
                                      </div>

                                      {/* Nút bình luận, thích, không thích */}
                                      <div className="w-full flex gap-2 py-1">
                                        <button
                                          onClick={() =>
                                            handleToggleReply(item.idcomment)
                                          }
                                          className="px-2 py-1 mr-auto border rounded-md hover:bg-gray-200 flex gap-2 items-center justify-center"
                                        >
                                          {!language ? (
                                            <span> Replies </span>
                                          ) : (
                                            <span> 답글하다 </span>
                                          )}

                                          {item.replies}
                                        </button>

                                        <button
                                          onClick={() =>
                                            handlelike(item.idcomment, item.like)
                                          }
                                          className="px-2 py-1 ml-auto border rounded-md gap-2 hover:bg-gray-200 flex items-center justify-center"
                                        >
                                          <ThumbUpIcon className="text-gray-400" />
                                          {item.like}
                                        </button>
                                        <button
                                          onClick={() =>
                                            handledislike(
                                              item.idcomment,
                                              item.dislike
                                            )
                                          }
                                          className="px-2 py-1 border rounded-md gap-2 hover:bg-gray-200 flex items-center justify-center"
                                        >
                                          <ThumbDownIcon className="text-gray-400" />
                                          {item.dislike}
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Phản hồi bình luận */}
                                  {replyCommentId === item.idcomment && (
                                    <div className="w-full pl-5 ">
                                      {/* Nhập bình luận phản hồi */}
                                      <div className="w-full h-full">
                                        {/* Ô nhập bình luận */}
                                        <div className="w-full h-full my-3">
                                          <textarea
                                            placeholder={!language ? "Leave a reply" : "답장 남기기"}
                                            value={getrep}
                                            className="w-full h-[160px] rounded-md px-3 py-3 border-2"
                                            onChange={(e) =>
                                              setrep(e.target.value)
                                            }
                                          />
                                          <button
                                            onClick={() =>
                                              handlerep(item.idcomment)
                                            }
                                            className="px-3 py-2 ml-auto bg-black hover:shadow-md text-white rounded-xl flex gap-2 items-center justify-center"
                                          >
                                            <SendRoundedIcon className="transform rotate-200" />
                                            {!language ? (
                                              <span> Reply </span>
                                            ) : (
                                              <span> 답장하다 </span>
                                            )}
                                          </button>
                                        </div>
                                      </div>

                                      {/* Hiển thị các phản hồi bình luận có sẳn */}
                                      {item.replies >= 0 && (
                                        <div className="w-full h-full">
                                          {/* Danh sách phản hồi */}
                                          <ul className="w-full h-full">
                                            {reps?.map((item) => (
                                              <li key={item.id}>
                                                <div className="w-full h-[200px] rounded-md px-3 border-b bg-gray-100 my-2">
                                                  {/* Hiển thị tên user và ngày đăng bình luận */}
                                                  <div className="w-full py-1 flex overflow-hidden">
                                                    <span className="max-w-[500px] font-semibold line-clamp-1">
                                                      {item.nameUser}
                                                    </span>
                                                    {!language ?
                                                      <span className="text-gray-400 mx-2 line-clamp-1">
                                                        {
                                                          monthNames[
                                                            new Date(item.createTime).getMonth()
                                                          ].en
                                                        }{" "}
                                                        {new Date(item.createTime).getDate()},
                                                        {new Date(
                                                          item.createTime
                                                        )?.getFullYear()}

                                                      </span>
                                                      : <span className="text-gray-400 mx-2 line-clamp-1">
                                                        {
                                                          monthNames[
                                                            new Date(item.createTime).getMonth()
                                                          ].kr
                                                        }{" "}
                                                        {new Date(item.createTime).getDate()}일,
                                                        {new Date(
                                                          item.createTime
                                                        )?.getFullYear()}년

                                                      </span>}
                                                  </div>

                                                  {/* Hiển thị nội dung bình luận */}
                                                  <div className="h-[120px] px-2 custom-scrollbar">
                                                    <span className="">
                                                      {item.rep}
                                                    </span>
                                                  </div>

                                                  {/* Nút bình luận, thích, không thích */}
                                                  <div className="w-full flex gap-2 py-1">
                                                    <button
                                                      onClick={() =>
                                                        replike(
                                                          item.idcomment,
                                                          item.id,
                                                          item.like
                                                        )
                                                      }
                                                      className="px-2 py-1  ml-auto border rounded-md gap-2 hover:bg-gray-200 flex items-center justify-center"
                                                    >
                                                      <ThumbUpIcon className="text-gray-400" />
                                                      {item.like}
                                                    </button>

                                                    <button
                                                      onClick={() =>
                                                        repdislike(
                                                          item.idcomment,
                                                          item.id,
                                                          item.dislike
                                                        )
                                                      }
                                                      className="px-2 py-1  border rounded-md gap-2 hover:bg-gray-200 flex items-center justify-center"
                                                    >
                                                      <ThumbDownIcon className="text-gray-400" />
                                                      {item.dislike}
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
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full px-2"></div>
                  )}
                </div>

                {/* Bảng danh sách đề xuất */}
                <div className="col-span-1 h-full bg-white px-2">
                  <div className="w-full mb-8">
                    <div className="flex items-center pb-2">
                      <span className="px-2 font-semibold text-lg hover:text-green-500 cursor-pointer">
                        {!language ? (
                          <span>New & Trending Videos</span>
                        ) : (
                          <span>새로운 및 인기 동영상</span>
                        )}
                        <NavigateNextIcon />
                      </span>
                    </div>

                    <ul className="w-full h-full py-2">
                      {/* khung nội dung */}
                      {Video?.Video?.slice()
                        ?.sort((a, b) => b.views - a.views)
                        .map((item, index) => (
                          <Link
                            key={item.id}
                            to={`/videos/video/series/${item.id}`}
                          >
                            <li className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100">
                              <div className="w-full h-full flex items-center">
                                <div className="w-[80px] h-[80px] flex">
                                  <img
                                    src={item.squareThumbnail}
                                    alt="img"
                                    className="object-cover w-full h-full rounded-md"
                                  />
                                </div>

                                <div className="w-[30px] h-[30px] flex items-center justify-center mx-2">
                                  <span className="mx-3 text-xl text-white text-shadow-black font-bold">
                                    {index + 1}
                                  </span>
                                </div>

                                <div className="w-[230px] mt-auto mb-auto overflow-hidden">
                                  <span className="text-md font-semibold line-clamp-1">
                                    {item.title}
                                  </span>
                                  <span className="text-sm line-clamp-1">
                                    {item.Author}
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
            {isLoginModal && <LoginPage closeModal={closeLoginModal} />}
            <FooterPage />
          </div>
        </>
      )
      }
    </div >
  );
};

export default DisplayVideoPage;
