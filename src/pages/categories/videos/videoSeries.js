import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GroupAddSharpIcon from "@mui/icons-material/GroupAddSharp";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Rating from "@mui/material/Rating";
import {
  getchaptersVideo,
  getidVideo,
  getrandomVideo,
} from "../../../common/store/Video";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import PaymentPage from "../../payment/index";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { auth } from "../../../common/themes/firebase";
import RateFireBase from "../../../common/services/Rate.services";
import VideoFireBase from "../../../common/services/Video.services";
import SubscribeFireBase from "../../../common/services/Subscribe.services";
import { getAccount } from "../../../common/store/Account";
import PaymentFireBase from "../../../common/services/Payment.services";
import { setIsLoginModal } from "../../../common/store/hidden";
import { useNavigate } from "react-router-dom";

const VideoSeriesPage = () => {
  //Mở modal menu để chọn
  const id = useParams();
  const Videoid = useSelector((state) => state.Video.videoid);
  const chapters = useSelector((state) => state.Video.Chapters);
  const random = useSelector((state) => state.Video.random);
  const [open, setOpen] = React.useState(false);
  const [Rate, setRate] = useState(0);
  const [payment, setpayment] = useState([]);
  const User = useSelector((state) => state.AuthJs.User);
  const check19Modal = useSelector(state => state.hidden.check19Modal);

  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  // Nhấn nút đăng ký
  const [isSubscribe, setIsSubscribe] = useState(false);
  const navigate = useNavigate();

  //Lấy ngôn ngữ
  const language = useSelector((state) => state.hidden.language);
  const anchorRef = React.useRef(null);
  const [Subscribe, setSubscribe] = useState([[]]);

  const days = [
    { 'day': 'Mon', 'daysInKorean': '월요일', 'daysInEnglish': 'Monday' },
    { 'day': 'Tue', 'daysInKorean': '화요일', 'daysInEnglish': 'Tuesday' },
    { 'day': 'Wed', 'daysInKorean': '수요일', 'daysInEnglish': 'Wednesday' },
    { 'day': 'Thu', 'daysInKorean': '목요일', 'daysInEnglish': 'Thursday' },
    { 'day': 'Fri', 'daysInKorean': '금요일', 'daysInEnglish': 'Friday' },
    { 'day': 'Sat', 'daysInKorean': '토요일', 'daysInEnglish': 'Saturday' },
    { 'day': 'Sun', 'daysInKorean': '일요일', 'daysInEnglish': 'Sunday' }
  ]

  const koreanDay = days.find(d => d.day === Videoid.schedule)?.daysInKorean || '';
  const englishDay = days.find(d => d.day === Videoid.schedule)?.daysInEnglish || '';

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
  useEffect(() => {
    const get = async () => {
      try {
        setloading(false);

        if (auth.currentUser) {
          const Videoid = await dispatch(getidVideo(id.id));
          const chap = await dispatch(getchaptersVideo(id.id));

          const videoid = unwrapResult(Videoid);
          const chaps = unwrapResult(chap);
          await VideoFireBase.update(
            {
              views: chaps.success
                ? chaps?.chaps?.reduce((a, b) => a + b.views, 0)
                : 0,
            },
            id.id
          );
          const subscribe = await SubscribeFireBase.getbyvideo(
            auth.currentUser.uid,
            id.id
          );
          const rateuser = await RateFireBase.getbyid(
            auth.currentUser.uid,
            id.id
          );
          const account = await dispatch(getAccount(auth?.currentUser?.uid));
          const user = unwrapResult(account);
          const age = account?.payload?.birthday
            ? new Date(Date.now())?.getFullYear() -
            new Date(user.birthday)?.getFullYear()
            : 15;
          videoid.success && videoid.Age > age && navigate(`/`);

          const random = await dispatch(getrandomVideo({ limit: 9, age }));
          const payment = await PaymentFireBase.getbyuser(
            auth.currentUser.uid,
            id.id
          );
          setpayment(payment.success ? payment.payment : []);
          unwrapResult(random);
          setRate(rateuser.success ? rateuser.rate[0].rate : 0);
          subscribe.success ? setIsSubscribe(true) : setIsSubscribe(false);
          subscribe.success
            ? setSubscribe(subscribe.subscribe)
            : setSubscribe([]);
        } else {
          const Videoid = await dispatch(getidVideo(id.id));
          const chap = await dispatch(getchaptersVideo(id.id));

          const videoid = unwrapResult(Videoid);
          videoid.success && videoid.Age > 15 && navigate(`/`);
          const chaps = unwrapResult(chap);
          await VideoFireBase.update(
            {
              views: chaps.success
                ? chaps?.chaps?.reduce((a, b) => a + b.views, 0)
                : 0,
            },
            id.id
          );
          const random = await dispatch(getrandomVideo(9));
          setpayment([]);
          unwrapResult(random);
        }
        setloading(true);
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, [dispatch, User, navigate, id, check19Modal]);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open); // return focus to the button when we transitioned from !open -> open
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
  const handleRate = async (event, newValue) => {
    if (auth.currentUser) {
      setRate(newValue);
      try {
        const rateuser = await RateFireBase.getbyidvideo(
          auth.currentUser.uid,
          id.id
        );

        if (!rateuser.success) {
          await RateFireBase.Add({
            createTime: new Date(Date.now()),
            idvideo: id.id,
            uid: auth.currentUser.uid,
            rate: parseFloat(newValue),
            type: "video",
          });
          const videorate = await RateFireBase.getbyvideo(id.id);
          const averageRating = videorate.success
            ? (videorate.rate.reduce(
              (accumulator, currentValue) => accumulator + currentValue.rate,
              0
            ) /
              videorate.rate.length) *
            2
            : 0;
          await VideoFireBase.update(
            { rate: parseFloat(averageRating.toFixed(2)) },
            id.id
          );
          const idvideo = await dispatch(getidVideo(id.id));
          unwrapResult(idvideo);
        } else {
          await RateFireBase.update(
            { rate: parseFloat(newValue), createTime: new Date(Date.now()) },
            rateuser.rate[0].id
          );
          const videorate = await RateFireBase.getbyvideo(id.id);
          const averageRating = videorate.success
            ? (videorate.rate.reduce(
              (accumulator, currentValue) => accumulator + currentValue.rate,
              0
            ) /
              videorate.rate.length) *
            2
            : 0;
          await VideoFireBase.update(
            { rate: parseFloat(averageRating.toFixed(2)) },
            id.id
          );
          const idvideo = await dispatch(getidVideo(id.id));
          unwrapResult(idvideo);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Mở đóng modal payment
  const [isPaymentModal, setIsPaymentModal] = useState(false);

  const openPaymentModal = () => {
    if (auth?.currentUser) {
      setIsPaymentModal(true);
    } else {
      dispatch(setIsLoginModal(true));
    }
  };

  const closePaymentModal = () => {
    setIsPaymentModal(false);
  };
  function formatNumberWithM(number) {
    if (number >= 1000000) {
      const millions = number / 1000000;
      return millions + "M";
    }
    return number;
  }
  const onpayment = (idchap) => {
    payment.length !== 0
      ? payment[0].status === "success"
        ? navigate(`/videos/video/series/display/${id.id}/${idchap}`)
        : openPaymentModal()
      : openPaymentModal();
  };
  return (
    <div>
      {loading ? (
        <div className="w-full h-full bg-gradient-to-b from-white via-yellow-50 to-gray-100">
          {/* Hiển thị ảnh nền */}

          <div className="w-full flex items-center justify-center">
            <div className="w-[1200px] max-h-[320px] relative ">
              <img
                src={Videoid?.horizontalThumbnail}
                className="object-cover w-full max-h-[320px] rounded-t"
                alt="img"
              />

              {/* Hiện thị tiêu đề và tác giả truyện */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[1200px] overflow-hidden">
                  <span className="w-full max-h-[150px] px-[25px] font-semibold my-5 text-[50px] text-white text-shadow-black leading-[1.4] line-clamp-3 flex justify-center">
                    {Videoid.title}
                  </span>

                  <Link to={`/channel/creator/${Videoid.uid}`}>
                    <div className="w-full flex items-center justify-center gap-2">
                      <div className="w-[250px] px-2 rounded-md overflow-hidden flex items-center justify-center gap-2">
                        <span className="text-lg font-semibold text-yellow-500 hover:text-yellow-600 text-shadow-black line-clamp-1">
                          {Videoid.Author}
                        </span>
                        <button className="w-[20px] h-[20px] bg-white rounded-full text-black flex items-center justify-center">
                          i
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Nút đăng ký theo dõi */}
              <div className="absolute px-10 py-5 bottom-0 right-0 flex gap-2">
                {!isSubscribe ? (
                  <button
                    onClick={handlesubscribe}
                    className="text-white hover:text-yellow-500 bg-black bg-opacity-30 py-2 px-2 rounded-full flex gap-1 items-center justify-center"
                  >
                    <AddCircleOutlineIcon />
                    {!language ? (
                      <span> Subscribe </span>
                    ) : (
                      <span> 구독하기 </span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleDeleteSub}
                    className="text-white hover:text-yellow-500 bg-black bg-opacity-30 py-2 px-2 rounded-full flex gap-1 items-center justify-center"
                  >
                    <CheckIcon />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[1200px] h-full grid xs:grid-cols-1 lg:grid-cols-3 gap-y-5 bg-white pt-6 pb-10 rounded-b">
              <div className="xs:col-span-1 lg:col-span-2 h-full">
                <div className="w-full px-5 font-semibold text-md flex pb-2">
                  {!language ? (
                    <span> Episodes </span>
                  ) : (
                    <span> 에피소드 </span>
                  )}
                  {Videoid?.payment && (
                    <button
                      className="w-[80px] h-[35px] bg-red-500 ml-auto rounded-full shadow text-white flex items-center justify-center"
                      onClick={openPaymentModal}
                    >
                      {!language ? <span> Buy </span> : <span> 구입하다 </span>}
                    </button>
                  )}
                  {isPaymentModal && (
                    <PaymentPage
                      closeModal={closePaymentModal}
                      price={Videoid?.price}
                    />
                  )}
                </div>

                <div className="w-full max-h-[900px] px-3 custom-scrollbar">
                  {/* danh sach series */}
                  <ul className="w-full h-full ">
                    {/* khung danh sách */}
                    {chapters?.chaps?.filter(item => item.check === true)?.sort((a, b) => b.num - a.num)?.map((item) =>
                      Videoid?.payment ? (
                        <span key={item.id} onClick={() => onpayment(item.id)}>
                          <li className="w-full h-[90px] border-b rounded-lg cursor-pointer hover:bg-gray-100 px-2">
                            <div className="w-full h-full flex items-center">
                              <div className="w-[80px] h-[80px]">
                                <img
                                  src={item.horizontalThumbnail}
                                  alt="img"
                                  className="object-fill min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] rounded-md"
                                />
                              </div>

                              <div className="max-w-[400px] lg:min-w-[400px] mr-auto ml-3 overflow-hidden">
                                <span className="text-black text-md leading-[1.2] line-clamp-2">
                                  {item.chapterTitle}
                                </span>
                              </div>

                              <div className="ml-auto">
                                {!language ? <span className="text-gray-400 text-md">
                                  {
                                    monthNames[
                                      new Date(item.createTime).getMonth()
                                    ].en
                                  }{" "}
                                  {new Date(item.createTime).getDate()},
                                  {new Date(item.createTime)?.getFullYear()}
                                </span> : <span className="text-gray-400 text-md">
                                  {
                                    monthNames[
                                      new Date(item.createTime).getMonth()
                                    ].kr
                                  }{" "}
                                  {new Date(item.createTime).getDate()}일,
                                  {new Date(item.createTime)?.getFullYear()}년
                                </span>}
                              </div>

                              <div className="w-auto ml-auto flex gap-1">
                                <span className="text-gray-400">
                                  <FavoriteBorderSharpIcon />
                                </span>
                                <span className="text-gray-400 text-md line-clamp-1">
                                  {item.likes}
                                </span>
                              </div>

                              <div className="ml-auto">
                                <span className="text-gray-400 text-md line-clamp-1">
                                  {item.num}#
                                </span>
                              </div>
                              {payment.length !== 0 ? (
                                payment[0].status === "success" ? (
                                  <div className="ml-auto flex gap-1">
                                    <span className="text-gray-400">
                                      <LockOpenIcon />
                                    </span>
                                  </div>
                                ) : (
                                  <div className="ml-auto flex gap-1">
                                    <span className="text-gray-400">
                                      <LockIcon />
                                    </span>
                                  </div>
                                )
                              ) : (
                                <div className="ml-auto flex gap-1">
                                  <span className="text-gray-400">
                                    <LockIcon />
                                  </span>
                                </div>
                              )}
                            </div>
                          </li>
                        </span>
                      ) : (
                        <Link
                          key={item.id}
                          to={`/videos/video/series/display/${id.id}/${item.id}`}
                        >
                          <li className="w-full h-[90px] border-b rounded-lg cursor-pointer hover:bg-gray-100 px-2">
                            <div className="w-full h-full flex items-center">
                              <div className="w-[80px] h-[80px]">
                                <img
                                  src={item.horizontalThumbnail}
                                  alt="img"
                                  className="object-cover w-full h-full rounded-md"
                                />
                              </div>

                              <div className="max-w-[400px] lg:min-w-[400px] mr-auto ml-3 overflow-hidden">
                                <span className="text-black text-md leading-[1.2] line-clamp-2">
                                  {item.chapterTitle}
                                </span>
                              </div>

                              <div className="ml-auto">
                                {!language ? <span className="text-gray-400 text-md">
                                  {
                                    monthNames[
                                      new Date(item.createTime).getMonth()
                                    ].en
                                  }{" "}
                                  {new Date(item.createTime).getDate()},
                                  {new Date(item.createTime)?.getFullYear()}
                                </span> : <span className="text-gray-400 text-md">
                                  {
                                    monthNames[
                                      new Date(item.createTime).getMonth()
                                    ].kr
                                  }{" "}
                                  {new Date(item.createTime).getDate()}일,
                                  {new Date(item.createTime)?.getFullYear()}년
                                </span>}
                              </div>

                              <div className="w-auto ml-auto flex gap-1">
                                <span className="text-gray-400">
                                  <FavoriteBorderSharpIcon />
                                </span>
                                <span className="text-gray-400 text-md line-clamp-1">
                                  {item.likes}
                                </span>
                              </div>

                              <div className="ml-auto">
                                <span className="text-gray-400 text-md line-clamp-1">
                                  {item.num}#
                                </span>
                              </div>
                            </div>
                          </li>
                        </Link>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="h-full px-5">
                <div className="w-full mb-auto">
                  <ul className="grid grid-cols-4 gap-5">
                    <li className="flex items-center justify-center">
                      <span className="mx-1 text-yellow-500">
                        <VisibilityIcon />
                      </span>
                      <span className="mx-1">
                        {formatNumberWithM(Videoid.views)}
                      </span>
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="mx-1 text-yellow-500">
                        <GroupAddSharpIcon />
                      </span>
                      <span className="mx-1">{Videoid.totalSubscribed}</span>
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="mx-1 text-yellow-500">
                        <StarIcon />
                      </span>
                      <span className="mx-1">{Videoid.rate}</span>
                    </li>

                    {/* Nút đánh giá xếp hạng Truyện */}
                    <li className="flex items-center justify-center">
                      <button
                        className="w-[70px] h-[25px] rounded-full text-white bg-yellow-500 flex items-center justify-center"
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? "composition-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                      >
                        {!language ? (
                          <span> RATE </span>
                        ) : (
                          <span> 평가하기 </span>
                        )}
                      </button>
                      <Popper
                        open={open}
                        anchorEl={anchorRef.current}
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
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                  autoFocusItem={open}
                                  id="composition-menu"
                                  aria-labelledby="composition-button"
                                  onKeyDown={handleListKeyDown}
                                >
                                  <MenuItem onClick={handleClose}>
                                    <ClickAwayListener
                                      onClickAway={handleClose}
                                    >
                                      <Rating
                                        name="half-rating-read"
                                        defaultValue={parseInt(Rate)}
                                        precision={0.5}
                                        onChange={handleRate}
                                      />
                                    </ClickAwayListener>
                                  </MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </li>
                  </ul>
                </div>

                <div className="w-full h-full">
                  <div className="flex gap-3 pt-5 pb-3">
                    <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
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
                  <div className="w-full">
                    <span className="">{Videoid.summary}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-full  py-10 flex items-center justify-center">
            <div className="w-[1200px] h-full ">
              <div className="xs:ml-[15px] sm:ml-0 text-xl font-semibold">
                {!language ? (
                  <span> You may also like </span>
                ) : (
                  <span> 이것도 좋아할 수 있습니다 </span>
                )}
              </div>
              <div className="w-full min-h-[160px] bg-white my-5 px-5 py-5 rounded-md">
                <ul className="w-full h-full grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* khung danh sách */}
                  {random?.Video?.map((item) => (
                    <Link key={item.id} to={`/videos/video/series/${item.id}`}>
                      <li className="w-full h-[120px] flex bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200">
                        <div className="min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] rounded flex items-center justify-center">
                          <img
                            src={item.squareThumbnail}
                            alt="img"
                            className="object-cover w-[100px] h-[100px] rounded"
                          />
                        </div>

                        <div className="h-full rounded-xl px-3 py-3">
                          <div className="w-full h-[75px] overflow-hidden">
                            <span className="w-full text-lg font-semibold leading-[1.2] line-clamp-2">
                              {item.title}
                            </span>
                            <span className="w-full line-clamp-1">
                              {item.Author}
                            </span>
                          </div>

                          <div className="w-full">
                            <span className=" flex gap-1 text-yellow-500">
                              <VisibilityIcon />
                              {item.views}
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
      ) : (
        <div className="w-full h-[48vh] flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default VideoSeriesPage;
