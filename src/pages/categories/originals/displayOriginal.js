import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { Link } from "react-router-dom";
import logo from "../../../img/logonew1.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MusicOffIcon from "@mui/icons-material/MusicOff";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckIcon from "@mui/icons-material/Check";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { AddComment, getidseries } from "../../../common/store/Comment";
import { setIsLoginModal, setlanguage } from "../../../common/store/hidden";
import LoginPage from "../../auth/login";
import { auth } from "../../../common/themes/firebase";
import { getAccount } from "../../../common/store/Account";
import CommentFireBase from "../../../common/services/Comment.services";
import SubscribeFireBase from "../../../common/services/Subscribe.services";
import comicFireBase from "../../../common/services/Comic.services";
import {
  getAllComic,
  getchaptersComic,
  getidComic,
} from "../../../common/store/comic";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css"; // Import the text layer CSS
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useTimeout from "../../../Hooks/useTimeout";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import dataListGenre from "../../../components/layout/layoutUser/dataListGenre";
import ReactPlayer from "react-player";
import dataGenreSearch from "../../../common/utils/datagenresearch";
import { useNavigate } from 'react-router-dom';
import FooterPage from "../../../components/layout/layoutUser/footer";

const DisplayOriginalPage = () => {
  const id = useParams();
  const [getcomment, setComment] = useState("");
  const [getrep, setrep] = useState("");
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [reps, setreps] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [Subscribe, setSubscribe] = useState([[]]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState();
  const [chapid, setchapid] = useState([]);
  const [loading, setloading] = useState(false);
  const [countlike, setcountlike] = useState(0);
  const gcomment = useSelector((state) => state.Comment.comment);
  const isLoginModal = useSelector((state) => state.hidden.isLoginModal);
  const comicid = useSelector((state) => state.comic.comicid);
  const language = useSelector((state) => state.hidden.language);
  const chapters = useSelector((state) => state.comic.Chapters);
  const comic = useSelector((state) => state.comic.comic);
  const check19Modal = useSelector(state => state.hidden.check19Modal);

  const [selectedOriginalGenre, setSelectedOriginalGenre] = useState("All");
  const Account = useSelector((state) => state.Account.Account);
  //Mở modal menu original by genre để chọn
  const [openOriginals, setOpenOriginals] = useState(false);
  const anchorRefOriginals = React.useRef(null);
  const prevOpenOriginals = React.useRef(openOriginals);
  const navigate = useNavigate();

  const filteredcomic = comic?.comic
    ?.slice()
    ?.sort((a, b) => b.views - a.views);
  const searchedcomic = comic?.comic
    ?.filter((item) =>
      selectedOriginalGenre === "All"
        ? item
        : selectedOriginalGenre === "Others"
          ? !dataGenreSearch.some(
            (i) =>
              i.name.toLowerCase() === item.genre2.toLowerCase() ||
              i.name.toLowerCase() === item.genre1.toLowerCase()
          )
          : item.genre1.toLowerCase() === selectedOriginalGenre.toLowerCase() ||
          item.genre2.toLowerCase() === selectedOriginalGenre.toLowerCase()
    )
    .slice()
    ?.sort((a, b) => b.views - a.views);
  //Xem các tập tiếp theo trong series
  const dispatch = useDispatch();
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  const [hiddenselected, sethiddenSelected] = useState(
    !language ? "All" : "모두"
  );

  const [itemsPerPage, setItemsPerPage] = useState(9);
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

  const days = [
    { 'day': 'Mon', 'daysInKorean': '월요일', 'daysInEnglish': 'Monday' },
    { 'day': 'Tue', 'daysInKorean': '화요일', 'daysInEnglish': 'Tuesday' },
    { 'day': 'Wed', 'daysInKorean': '수요일', 'daysInEnglish': 'Wednesday' },
    { 'day': 'Thu', 'daysInKorean': '목요일', 'daysInEnglish': 'Thursday' },
    { 'day': 'Fri', 'daysInKorean': '금요일', 'daysInEnglish': 'Friday' },
    { 'day': 'Sat', 'daysInKorean': '토요일', 'daysInEnglish': 'Saturday' },
    { 'day': 'Sun', 'daysInKorean': '일요일', 'daysInEnglish': 'Sunday' }
  ]

  const koreanDay = days.find(d => d.day === comicid.schedule)?.daysInKorean || '';
  const englishDay = days.find(d => d.day === comicid.schedule)?.daysInEnglish || '';

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
  useTimeout(async () => {
    try {
      await comicFireBase.updateep(
        { views: chapid?.views + 1 },
        id.id,
        id.idseries
      );
    } catch (error) { }
  }, 10000);

  useEffect(() => {
    sethiddenSelected(() => (!language ? "All" : "모두"));
    setSelectedOriginalGenre("All");
  }, [language]);
  const handleToggleOriginals = () => {
    setOpenOriginals((prevOpen) => !prevOpen);
  };

  const handleCloseOriginals = (event) => {
    if (
      anchorRefOriginals.current &&
      anchorRefOriginals.current.contains(event.target)
    ) {
      return;
    }
    setOpenOriginals(false);
  };

  React.useEffect(() => {
    if (prevOpenOriginals.current === true && openOriginals === false) {
      anchorRefOriginals.current.focus();
    }
    prevOpenOriginals.current = openOriginals;
  }, [openOriginals]);

  useEffect(() => {
    const getcomments = async () => {
      try {
        setloading(false);
        const comments = await dispatch(getidseries(id.idseries));
        const comicID = await dispatch(getidComic(id.id));
        const chap = await dispatch(getchaptersComic(id.id));
        localStorage.getItem("language") === "en" ? dispatch(setlanguage(false)) : dispatch(setlanguage(true))
        unwrapResult(comicID);
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
        if (auth.currentUser) {
          const account = await dispatch(getAccount(auth?.currentUser?.uid));
          const user = unwrapResult(account);
          if (user?.checkage) {
            const age = account?.payload?.birthday
              ? new Date(Date.now())?.getFullYear() -
              new Date(user.birthday)?.getFullYear()
              : 15;
            const lg = await dispatch(getAllComic(age));
            unwrapResult(lg);
          } else {
            const lg = await dispatch(getAllComic());
            unwrapResult(lg);
          }

          const subscribe = await SubscribeFireBase.getbycomic(
            auth.currentUser.uid,
            id.id
          );
          const like = await comicFireBase.getidlikechap(
            id.id,
            id.idseries,
            auth.currentUser.uid
          );
          setIsLike(like.success);
          subscribe.success ? setIsSubscribe(true) : setIsSubscribe(false);
          subscribe.success
            ? setSubscribe(subscribe.subscribe)
            : setSubscribe([]);
        } else {
          const lg = await dispatch(getAllComic());
          unwrapResult(lg);
        }
        setloading(true);
      } catch (error) { }
    };
    getcomments();
  }, [dispatch, id, check19Modal]);

  const options = useMemo(
    () => ({
      cMapUrl: "cmaps/",
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,

      // Add any other options you might have here
    }),
    []
  ); // Empty dependency array, as options are likely static

  const file = useMemo(
    () => ({
      url: chapid?.fileURL
        ? chapid?.fileURL
        : "https://firebasestorage.googleapis.com/v0/b/webtoons-2ae20.appspot.com/o/cms_uploads%2Fcomic%2Fepisodes%2FIAsCigDN5La3LV2GtFOl0YnL9kG3%2Fp21CPp0sVnIMjq2zgX0o%2Fchap%2F9fNgdUbNDG7mV5bi7dkf%2Fnhasachmienphi-truyen-tranh-doremon.pdf?alt=media&token=7543361b-cddf-4e4f-9aaa-9bfe8a91ce14",
    }),
    [chapid]
  );
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
  const closeLoginModal = () => {
    dispatch(setIsLoginModal(false));
  };

  // Hiện thị phản hồi của bình luận
  const [replyCommentId, setReplyCommentId] = useState(null);

  const handleToggleReply = async (commentId) => {
    try {
      const rep = await CommentFireBase.getidrep(commentId);
      setreps(rep.success ? rep?.rep : []);
      setReplyCommentId(commentId === replyCommentId ? null : commentId);
    } catch (error) { }
  };

  //new
  const handleComment = async () => {
    try {
      if (auth?.currentUser) {
        const account = await dispatch(getAccount(auth?.currentUser?.uid));
        const getacc = unwrapResult(account);
        const data = {
          comment: getcomment,
          createTime: new Date(Date.now()),
          like: 0,
          type: "comic",
          dislike: 0,
          id: id.idseries,
          uid: auth?.currentUser?.uid,
          idcomic: id.id,
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

  const handlesubscribe = async () => {
    try {
      if (auth.currentUser) {
        await SubscribeFireBase.Add({
          uid: auth.currentUser.uid,
          idcomic: id.id,
          createTime: new Date(Date.now()),
        });
        await comicFireBase.update(
          { totalSubscribed: comicid.totalSubscribed + 1 },
          id.id
        );
        await dispatch(getidComic(id.id));

        const subscribe = await SubscribeFireBase.getbycomic(
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
        await SubscribeFireBase.Delete(Subscribe[0].id);
        await comicFireBase.update(
          { totalSubscribed: comicid.totalSubscribed - 1 },
          id.id
        );
        await dispatch(getidComic(id.id));
        const subscribe = await SubscribeFireBase.getbycomic(
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
  const handlelike = async (idcomment, togglelike) => {
    try {
      if (auth?.currentUser) {
        await CommentFireBase.Addlike({
          idcomment,
          uid: auth?.currentUser?.uid,
          like: true,
          togglelike,
        });
        const comments = await dispatch(getidseries(id.idseries));
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
        const comments = await dispatch(getidseries(id.idseries));
        unwrapResult(comments);
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
          idcomic: id.id,
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

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handlelikechap = async () => {
    try {
      if (auth?.currentUser) {
        await comicFireBase.Addlikechap({
          id: id.id,
          idseries: id.idseries,
          uid: auth?.currentUser?.uid,
          like: true,
          togglelike: chapid?.likes,
        });

        const like = await comicFireBase.getidlikechap(
          id.id,
          id.idseries,
          auth.currentUser.uid
        );
        setIsLike(like.success);
        const chap = await dispatch(getchaptersComic(id.id));
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

  function handleListKeyDownOriginals(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenOriginals(false);
    } else if (event.key === "Escape") {
      setOpenOriginals(false);
    }
  }
  const goToPreviousChapter = () => {
    const Previous = chapters?.chaps?.filter(item => chapid.num - 1 === item.num && item.check === true)
    Previous.length !== 0 && navigate(`/originals/original/series/display/${id.id}/${Previous[0]?.id}`);
  };

  const goToNextChapter = () => {
    const Next = chapters?.chaps?.filter(item => chapid.num + 1 === item.num && item.check === true)
    Next.length !== 0 && navigate(`/originals/original/series/display/${id.id}/${Next[0]?.id}`);
  };

  // Nhấn nút đăng ký
  const [isMusic, setIsMusic] = useState(false);

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

  // chỉnh kích thước file pdf với màn hình
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateWidth = () => {
    const baseWidth = windowSize.width; // Chiều rộng của màn hình
    if (windowSize.width < 640) {
      return baseWidth * 0.95; // Đối với màn hình nhỏ (xs), chiếm 95% chiều rộng
    } else if (windowSize.width < 768) {
      return baseWidth * 0.90; // Đối với màn hình vừa (sm), chiếm 90% chiều rộng
    } else if (windowSize.width < 1024) {
      return baseWidth * 0.85; // Đối với màn hình lớn (md), chiếm 85% chiều rộng
    } else if (windowSize.width < 1280) {
      return baseWidth * 0.80; // Đối với màn hình rất lớn (lg), chiếm 80% chiều rộng
    } else if (windowSize.width < 1536) {
      return baseWidth * 0.75; // Đối với màn hình cực lớn (xl), chiếm 75% chiều rộng
    } else if (windowSize.width < 1920) {
      return baseWidth * 0.70; // Đối với màn hình siêu lớn (2xl), chiếm 70% chiều rộng
    } else {
      return baseWidth * 0.65; // Đối với màn hình cực kỳ lớn (3xl), chiếm 65% chiều rộng
    }
  };

  return (
    <>
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
        <div>
          <div className="w-full h-full bg-white">
            {/* Thanh công cụ */}
            <div className={`fixed w-full h-[50px] bg-black flex items-center px-5 z-50 transition-transform duration-300 ${showToolbar ? 'translate-y-0' : '-translate-y-full'}`}>
              <ul className="w-full h-full grid grid-cols-3">

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
                      to={`/originals/original/series/${id.id}`}
                      className="text-white hover:text-yellow-500 line-clamp-1"
                    >
                      {comicid?.title}
                    </Link>

                    <NavigateNextIcon />

                    <span className="text-white line-clamp-1">
                      {chapid?.chapterTitle}
                    </span>
                  </div>
                </li>

                {/* Chuyển tập */}
                <li className="w-full flex items-center justify-center">
                  <div className="min-w-[150px] max-w-[150px] flex">
                    <button className="h-[35px] mr-auto">
                      <span onClick={goToPreviousChapter} className="text-white bg-gray-800 hover:bg-gray-700 pl-3 py-1 rounded-md flex items-center justify-center">
                        <ArrowBackIosIcon />
                      </span>
                    </button>
                    <div className="w-full ml-auto mr-auto">
                      <span className="w-full rounded-md py-1 flex items-center justify-center text-white">
                        #{chapid?.num}
                      </span>
                    </div>
                    <button className="h-[35px] ml-auto">
                      <span onClick={goToNextChapter} className="text-white bg-gray-800 hover:bg-gray-700 w-[35px] py-1 rounded-md flex items-center justify-center">
                        <ArrowForwardIosIcon />
                      </span>
                    </button>
                  </div>

                </li>

                {/* Bật tắt âm thanh */}
                {chapid?.audioUrl && (
                  <li className="flex items-center pl-7">
                    <button
                      onClick={scrollToTop}
                      className="w-[40px] h-[35px] bg-gray-800 hover:bg-gray-700 shadow mr-auto rounded-md text-white flex items-center justify-center"
                    >
                      <ArrowUpwardIcon />
                    </button>
                    <button className="ml-auto text-white">
                      {!isMusic ? (
                        <button
                          className="w-[35px] h-[35px] rounded-full bg-gray-800 flex items-center justify-center"
                          onClick={() => setIsMusic(true)}
                        >
                          <MusicNoteIcon />
                        </button>
                      ) : (
                        <button
                          className="w-[35px] h-[35px] rounded-full bg-gray-800 flex items-center justify-center"
                          onClick={() => setIsMusic(false)}
                        >
                          <MusicOffIcon />
                        </button>
                      )}
                      <ReactPlayer
                        url={chapid?.audioUrl}
                        controls={true}
                        width="0%"
                        height="0%"
                        playing={!isMusic}
                        loop={true}
                      />
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Hiển thị nội dung truyện */}
            <div className="w-full h-full pt-[50px] flex items-center justify-center">
              <div className="w-full h-full overflow-hidden flex justify-center items-center">
                {file && (
                  <Document
                    options={options}
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<CircularProgress />}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={calculateWidth()} // Tính toán chiều rộng dựa trên kích thước màn hình
                      />
                    ))}
                  </Document>
                )}
              </div>
            </div>

            {/* Hiển thị yêu thích, theo dõi */}
            <div className="w-full h-[200px] bg-white flex items-center justify-center">
              <div className="w-full">
                <div className="flex items-center justify-center">
                  <div className="w-auto flex gap-3 pb-3">
                    <span className="w-[35px] h-[35px] uppercase bg-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                      Up
                    </span>
                    <span className="text-xl uppercase font-semibold flex items-center">
                      {!language ? (
                        <span> EVERY {englishDay} </span>
                      ) : (
                        <span> 매주 {koreanDay} </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex-auto mb-3">
                  <div className="flex items-center justify-center text-yellow-800 font-semibold">
                    {!language ? <span>Creator</span> : <span>창조자</span>}
                  </div>
                  <span className="flex items-center justify-center text-yellow-600 text-lg font-semibold">
                    {comicid?.Author}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex gap-3">
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
                    {!isSubscribe ? (
                      <button
                        onClick={handlesubscribe}
                        className="w-[120px] h-[35px] rounded-full bg-gray-100 hover:bg-gray-200 flex gap-1 items-center justify-center px-2 py-2"
                      >
                        <AddIcon />
                        {!language ? (
                          <span>Subscribe</span>
                        ) : (
                          <span>구독하기</span>
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
                    to={`/originals/original/series/display/${id.id}/${item.id}`}
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
                    <div className="full h-full px-2">
                      <div className="w-full px-2 pr-5">
                        <div className="flex items-center pb-2 font-semibold text-lg">
                          {!language ? <span>Comments</span> : <span>댓글</span>}
                          <span className="px-2 text-gray-400">
                            {gcomment?.Comment ? gcomment?.Comment?.length : 0}
                          </span>
                        </div>

                        {/* Ô nhập bình luận */}
                        <div className="w-full h-full my-3">
                          <textarea
                            placeholder={!language ? "Leave a comment" : "댓글 달기."}
                            value={getcomment}
                            className="w-full h-[160px] rounded-md px-3 py-3 border-2"
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <button
                            onClick={handleComment}
                            className="px-3 py-2 ml-auto bg-green-500 hover:shadow-md text-white rounded-xl flex gap-2 items-center justify-center"
                          >
                            <SendRoundedIcon className="transform rotate-200" />
                            {!language ? <span>Send</span> : <span>보내기</span>}
                          </button>
                        </div>

                        {/* Hiển thị danh sách các bình luận truyện */}
                        <div className="w-full h-full my-5 ">
                          <div className="px-3">
                            <ul className="flex gap-2">
                              <li className="px-5 py-5 cursor-pointer hover:text-green-500 font-semibold border-b-2">
                                {!language ? <span>TOP</span> : <span>최고</span>}
                              </li>
                              <li className="px-5 py-5 cursor-pointer hover:text-green-500 font-semibold">
                                {!language ? (
                                  <span>NEWEST</span>
                                ) : (
                                  <span>최신</span>
                                )}
                              </li>
                            </ul>
                          </div>
                          <div className="w-full py-3">
                            <ul>
                              {gcomment?.Comment?.map((item) => (
                                <li key={item.idcomment}>
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
                                        <span className="">{item.comment}</span>
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
                                            <span>Replies</span>
                                          ) : (
                                            <span>답글하다</span>
                                          )}
                                          {item.replies}
                                        </button>

                                        <button
                                          className="px-2 py-1  ml-auto border rounded-md gap-2 hover:bg-gray-200 flex items-center justify-center"
                                          onClick={() =>
                                            handlelike(item.idcomment, item.like)
                                          }
                                        >
                                          <ThumbUpIcon className="text-gray-400" />
                                          {item.like}
                                        </button>

                                        <button
                                          className="px-2 py-1  border rounded-md gap-2 hover:bg-gray-200 flex items-center justify-center"
                                          onClick={() =>
                                            handledislike(
                                              item.idcomment,
                                              item.dislike
                                            )
                                          }
                                        >
                                          <ThumbDownIcon className="text-gray-400" />
                                          {item.dislike}
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Phản hồi bình luận */}
                                  {replyCommentId === item.idcomment && (
                                    <div className="w-full px-5">
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
                                              <span>Reply</span>
                                            ) : (
                                              <span>답장하다</span>
                                            )}
                                          </button>
                                        </div>
                                      </div>

                                      {/* Hiển thị các phản hồi bình luận có sẳn */}

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
                          <span> New & Trending Originals </span>
                        ) : (
                          <span> 새로운 및 인기 오리지널 </span>
                        )}
                        <NavigateNextIcon />
                      </span>
                    </div>

                    <ul className="w-full h-full py-2">
                      {/* khung nội dung */}
                      {filteredcomic?.map((item, index) => (
                        <Link
                          key={item.id}
                          to={`/originals/original/series/${item.id}`}
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

                              <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2 shadow-xl">
                                <span className="mx-3 text-xl text-white font-bold">
                                  {index + 1}
                                </span>
                              </div>

                              <div className="w-[230px] mt-auto mb-auto overflow-hidden">
                                <span className="text-gray-400 text-sm">
                                  {!language
                                    ? item.genre1
                                    : dataListGenre?.filter(
                                      (itm) =>
                                        itm.name.toLowerCase() ===
                                        item.genre1.toLowerCase()
                                    )[0]?.nameKorean}
                                </span>
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

                  {/* Hiển thị nội dung truyện theo thể loại*/}
                  <div className="w-full mt-8">
                    <div className="flex items-center pb-2">
                      <span className="px-2 font-semibold text-lg hover:text-green-500 cursor-pointer">
                        {!language ? (
                          <span>Originals by Genre</span>
                        ) : (
                          <span>장르별 오리지널</span>
                        )}

                        <NavigateNextIcon />
                      </span>

                      {/* Chọn menu thể loại originals*/}
                      <div className="ml-auto flex gap-1 text-green-500 cursor-pointer">
                        <button
                          ref={anchorRefOriginals}
                          id="originals-button"
                          aria-controls={
                            openOriginals ? "originals-menu" : undefined
                          }
                          aria-expanded={openOriginals ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleToggleOriginals}
                        >
                          <span>
                            {hiddenselected} <CheckIcon />
                          </span>
                        </button>
                        <Popper
                          open={openOriginals}
                          anchorEl={anchorRefOriginals.current}
                          role={undefined}
                          placement="bottom-start"
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === "bottom-start"
                                    ? "left top"
                                    : "left bottom",
                              }}
                            >
                              <Paper>
                                <ClickAwayListener
                                  onClickAway={handleCloseOriginals}
                                >
                                  <MenuList
                                    autoFocusItem={openOriginals}
                                    id="originals-menu"
                                    aria-labelledby="originals-button"
                                    onKeyDown={handleListKeyDownOriginals}
                                  >
                                    {/* Hiển thị danh sách thể loại original xếp hạng */}

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() => {
                                          setSelectedOriginalGenre("All");
                                          sethiddenSelected(
                                            !language ? "All" : "모두"
                                          );
                                        }}
                                        className={`w-full h-full ${selectedOriginalGenre === "All"
                                          ? "text-green-500"
                                          : ""
                                          }`}
                                      >
                                        {!language ? (
                                          <span>All</span>
                                        ) : (
                                          <span> 모두 </span>
                                        )}
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() => {
                                          setSelectedOriginalGenre("Action");
                                          sethiddenSelected(
                                            !language ? "Action" : "액션"
                                          );
                                        }}
                                        className={`w-full h-full ${selectedOriginalGenre === "Action"
                                          ? "text-green-500"
                                          : ""
                                          }`}
                                      >
                                        {!language ? (
                                          <span>Action</span>
                                        ) : (
                                          <span> 액션 </span>
                                        )}
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() => {
                                          setSelectedOriginalGenre("Romance");
                                          sethiddenSelected(
                                            !language ? "Romance" : "로맨스"
                                          );
                                        }}
                                        className={`w-full h-full ${selectedOriginalGenre === "Romance"
                                          ? "text-green-500"
                                          : ""
                                          }`}
                                      >
                                        {!language ? (
                                          <span>Romance</span>
                                        ) : (
                                          <span> 로맨스 </span>
                                        )}
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() => {
                                          setSelectedOriginalGenre("Fantasy");
                                          sethiddenSelected(
                                            !language ? "Fantasy" : "판타지"
                                          );
                                        }}
                                        className={`w-full h-full ${selectedOriginalGenre === "Fantasy"
                                          ? "text-green-500"
                                          : ""
                                          }`}
                                      >
                                        {!language ? (
                                          <span>Fantasy</span>
                                        ) : (
                                          <span> 판타지 </span>
                                        )}
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() => {
                                          setSelectedOriginalGenre("Drama");
                                          sethiddenSelected(
                                            !language ? "Drama" : "드라마"
                                          );
                                        }}
                                        className={`w-full h-full ${selectedOriginalGenre === "Drama"
                                          ? "text-green-500"
                                          : ""
                                          }`}
                                      >
                                        {!language ? (
                                          <span>Drama</span>
                                        ) : (
                                          <span> 드라마 </span>
                                        )}
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() => {
                                          setSelectedOriginalGenre("Comedy");
                                          sethiddenSelected(
                                            !language ? "Comedy" : "코미디"
                                          );
                                        }}
                                        className={`w-full h-full ${selectedOriginalGenre === "Comedy"
                                          ? "text-green-500"
                                          : ""
                                          }`}
                                      >
                                        {!language ? (
                                          <span>Comedy</span>
                                        ) : (
                                          <span> 코미디 </span>
                                        )}
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() => {
                                          setSelectedOriginalGenre("Thriller");
                                          sethiddenSelected(
                                            !language ? "Thriller" : "스릴러"
                                          );
                                        }}
                                        className={`w-full h-full ${selectedOriginalGenre === "Thriller"
                                          ? "text-green-500"
                                          : ""
                                          }`}
                                      >
                                        {!language ? (
                                          <span>Thriller</span>
                                        ) : (
                                          <span> 스릴러 </span>
                                        )}
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() => {
                                          setSelectedOriginalGenre(
                                            "Slice of life"
                                          );
                                          sethiddenSelected(
                                            !language ? "Slice of life" : "일상"
                                          );
                                        }}
                                        className={`w-full h-full ${selectedOriginalGenre ===
                                          "Slice of life"
                                          ? "text-green-500"
                                          : ""
                                          }`}
                                      >
                                        {!language ? (
                                          <span>Slice of life</span>
                                        ) : (
                                          <span> 일상 </span>
                                        )}
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() => {
                                          setSelectedOriginalGenre(
                                            "Slice of life"
                                          );
                                          sethiddenSelected(
                                            !language
                                              ? "Slice of life"
                                              : "초자연적"
                                          );
                                        }}
                                        className={`w-full h-full ${selectedOriginalGenre ===
                                          "Supernatural"
                                          ? "text-green-500"
                                          : ""
                                          }`}
                                      >
                                        {!language ? (
                                          <span>Supernatural</span>
                                        ) : (
                                          <span> 초자연적 </span>
                                        )}
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() => {
                                          setSelectedOriginalGenre("Sci-fi");
                                          sethiddenSelected(
                                            !language ? "Sci-fi" : "공상 과학"
                                          );
                                        }}
                                        className={`w-full h-full ${selectedOriginalGenre === "Sci-fi"
                                          ? "text-green-500"
                                          : ""
                                          }`}
                                      >
                                        {!language ? (
                                          <span>Sci-fi</span>
                                        ) : (
                                          <span> 공상 과학 </span>
                                        )}
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() => {
                                          setSelectedOriginalGenre("Horror");
                                          sethiddenSelected(
                                            !language ? "Horror" : "호러"
                                          );
                                        }}
                                        className={`w-full h-full ${selectedOriginalGenre === "Horror"
                                          ? "text-green-500"
                                          : ""
                                          }`}
                                      >
                                        {!language ? (
                                          <span>Horror</span>
                                        ) : (
                                          <span> 호러 </span>
                                        )}
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() => {
                                          setSelectedOriginalGenre("Others");
                                          sethiddenSelected(
                                            !language ? "Others" : "기타"
                                          );
                                        }}
                                        className={`w-full h-full ${selectedOriginalGenre === "Others"
                                          ? "text-green-500"
                                          : ""
                                          }`}
                                      >
                                        {!language ? (
                                          <span>Others</span>
                                        ) : (
                                          <span> 기타 </span>
                                        )}
                                      </span>
                                    </MenuItem>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </div>
                    </div>

                    <ul className="w-full h-full py-2">
                      {/* khung nội dung */}
                      {searchedcomic?.map((item, index) => (
                        <Link
                          key={item.id}
                          to={`/originals/original/series/${item.id}`}
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

                              <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2 shadow-xl">
                                <span className="mx-3 text-xl text-white font-bold">
                                  {index + 1}
                                </span>
                              </div>

                              <div className="w-[230px] mt-auto mb-auto overflow-hidden">
                                <span className="text-gray-400 text-sm">
                                  {!language
                                    ? item.genre1
                                    : dataListGenre?.filter(
                                      (itm) =>
                                        itm.name.toLowerCase() ===
                                        item.genre1.toLowerCase()
                                    )[0]?.nameKorean}
                                </span>
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
          </div>
          {isLoginModal && <LoginPage closeModal={closeLoginModal} />}
          <FooterPage />
        </div>
      )}
    </>
  );
};

export default memo(DisplayOriginalPage);
