import React, { useState, useEffect } from "react";
import Nav from "../../components/Account/nav";
import NotfoundAcount from "../../components/Account/NotfoundAcount";
import CheckIcon from "@mui/icons-material/Check";
import Alsolike from "../../components/Account/subscribed/Alsolike";
import Suggestsubscribed from "../../components/Account/subscribed/Suggestsubscribed";
import { useSelector, useDispatch } from "react-redux";
import SubscribeFireBase from "../../common/services/Subscribe.services";
import comicFireBase from "../../common/services/Comic.services";
import { unwrapResult } from "@reduxjs/toolkit";
import { getAllComic } from "../../common/store/comic";
import CircularProgress from "@mui/material/CircularProgress";
import VideoFireBase from "../../common/services/Video.services";
import { Link } from "react-router-dom";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Subscribed = () => {
  const [EditSubscribed, setEditSubscribed] = useState(false);
  const [Subscribed, setSubscribed] = useState([]);
  const [checkSubcribed, setcheckSubcribed] = useState([]);
  const [ALLSubcribed, setALLSubcribed] = useState(false);
  const [EditSubscribedVideo, setEditSubscribedVideo] = useState(false);
  const [checkSubcribedVideo, setcheckSubcribedVideo] = useState([]);
  const [ALLSubcribedVideo, setALLSubcribedVideo] = useState(false);
  const [loading, setloading] = useState(false);
  const Account = useSelector((state) => state.Account.Account);
  const check19Modal = useSelector(state => state.hidden.check19Modal);

  const dispatch = useDispatch();
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
    { en: "December", kr: "12월" },
  ];
  useEffect(() => {
    const get = async () => {
      try {
        setloading(false);

        const subscribe = await SubscribeFireBase.getbyid(Account?.uid);
        if (Account?.checkage) {

          const age = Account?.birthday
            ? new Date(Date.now())?.getFullYear() -
            new Date(Account.birthday)?.getFullYear()
            : 15;

          const lg = await dispatch(getAllComic(age));
          unwrapResult(lg);
        } else {
          const lg = await dispatch(getAllComic());
          unwrapResult(lg);
        }

        if (subscribe.success) {
          const sub = await Promise.all(
            subscribe.subscribe?.map(async (item) => {
              const comicid = item.idcomic
                ? await comicFireBase.getbyid(item.idcomic)
                : await VideoFireBase.getbyid(item.idvideo);
              return {
                ...item,
                ...comicid,
                id: item.id,
                createTime: new Date(comicid?.createTime).toISOString(),
              };
            })
          );
          setSubscribed(sub);
        } else {
          setSubscribed([]);
        }
        setloading(true);
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, [dispatch, Account, check19Modal]);
  const get = async () => {
    try {

      const subscribe = await SubscribeFireBase.getbyid(Account?.uid);
      if (Account?.checkage) {

        const age = Account?.birthday
          ? new Date(Date.now())?.getFullYear() -
          new Date(Account.birthday)?.getFullYear()
          : 15;

        const lg = await dispatch(getAllComic(age));
        unwrapResult(lg);
      } else {
        const lg = await dispatch(getAllComic());
        unwrapResult(lg);
      }

      if (subscribe.success) {
        const sub = await Promise.all(
          subscribe.subscribe?.map(async (item) => {
            const comicid = item.idcomic
              ? await comicFireBase.getbyid(item.idcomic)
              : await VideoFireBase.getbyid(item.idvideo);
            return {
              ...item,
              ...comicid,
              id: item.id,
              createTime: new Date(comicid?.createTime).toISOString(),
            };
          })
        );
        setSubscribed(sub);
      } else {
        setSubscribed([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const HandleDelete = async () => {
    try {
      setloading(false);
      await Promise.all(
        checkSubcribed?.map(async (item) => {
          try {
            const sub = await SubscribeFireBase.getbysub(item);
            if (sub.success) {
              const comicid = sub?.idcomic
                ? await comicFireBase.getbyid(sub.idcomic)
                : await VideoFireBase.getbyid(sub.idvideo);

              sub?.idcomic
                ? await comicFireBase.update(
                  { totalSubscribed: comicid.totalSubscribed - 1 },
                  sub.idcomic
                )
                : await VideoFireBase.update(
                  { totalSubscribed: comicid.totalSubscribed - 1 },
                  sub.idvideo
                );
              await SubscribeFireBase.Delete(item);
              // setSubscribed(Subscribed?.filter(item => item?.idcomic ? item.idcomic !== sub.idcomic : item.idvideo !== sub.idvideo))

            }
          } catch (error) {
          }
        })

      );
      await get()
      setALLSubcribed(false);

      setloading(true);
    } catch (error) { }
  };
  const HandleDeleteVideo = async () => {
    try {
      setloading(false);
      await Promise.all(
        checkSubcribedVideo?.map(async (item) => {
          try {
            const sub = await SubscribeFireBase.getbysub(item);
            if (sub.success) {
              const comicid = sub?.idcomic
                ? await comicFireBase.getbyid(sub.idcomic)
                : await VideoFireBase.getbyid(sub.idvideo);

              sub?.idcomic
                ? await comicFireBase.update(
                  { totalSubscribed: comicid.totalSubscribed - 1 },
                  sub.idcomic
                )
                : await VideoFireBase.update(
                  { totalSubscribed: comicid.totalSubscribed - 1 },
                  sub.idvideo
                );
              await SubscribeFireBase.Delete(item);
              // setSubscribed(Subscribed?.filter(item => item?.idcomic ? item.idcomic !== sub.idcomic : item.idvideo !== sub.idvideo))
            }
          } catch (error) {
          }
        })
      );
      await get()

      setALLSubcribedVideo(false);

      setloading(true);
    } catch (error) { }
  };
  const getidSubscribed = (id) => {
    if (!checkSubcribed.includes(id)) {
      setcheckSubcribed([...checkSubcribed, id]);
    } else {
      const updatedCheckSubcribed = checkSubcribed.filter(
        (item) => item !== id
      );
      setcheckSubcribed(updatedCheckSubcribed);
    }
    const totalSubscribedVideos = Subscribed?.filter(item => item.idcomic)?.length;
    const updatedCount = checkSubcribed.length + (checkSubcribed.includes(id) ? 0 : 1);

    if (updatedCount === totalSubscribedVideos) {
      setALLSubcribed(true);
    } else {
      setALLSubcribed(false);
    }
  };
  const getALLSubscribed = () => {
    if (checkSubcribed.length === 0 || checkSubcribed.length <= Subscribed?.filter(item => item.idcomic)?.length - 1) {
      setcheckSubcribed(Subscribed?.filter(item => item.idcomic)?.map((item) => item.id));

      setALLSubcribed(true);
    } else {
      setcheckSubcribed([]);
      setALLSubcribed(false);
    }
  };
  const getALLSubscribedVideo = () => {
    if (checkSubcribedVideo.length === 0 || checkSubcribedVideo.length <= Subscribed?.filter(item => item.idvideo)?.length - 1) {
      setcheckSubcribedVideo(Subscribed?.filter(item => item.idvideo)?.map((item) => item.id));

      setALLSubcribedVideo(true);
    } else {
      setcheckSubcribedVideo([]);
      setALLSubcribedVideo(false);
    }
  };
  const getidSubscribedVideo = (id) => {

    if (!checkSubcribedVideo.includes(id)) {
      setcheckSubcribedVideo([...checkSubcribedVideo, id]);
    } else {
      const updatedCheckSubcribed = checkSubcribedVideo.filter(
        (item) => item !== id
      );
      setcheckSubcribedVideo(updatedCheckSubcribed);
    }
    const totalSubscribedVideos = Subscribed?.filter(item => item.idvideo)?.length;
    const updatedCount = checkSubcribedVideo.length + (checkSubcribedVideo.includes(id) ? 0 : 1);

    if (updatedCount === totalSubscribedVideos) {
      setALLSubcribedVideo(true);
    } else {
      setALLSubcribedVideo(false);
    }
  };
  //Lấy ngôn ngữ
  const language = useSelector(state => state.hidden.language);

  // Khi lia chuột hiên icon khi lia vào truyện hoặc video
  const [hoveredOriginalItem, setHoveredOriginalItem] = useState(null);
  const [hoveredVideoItem, setHoveredVideoItem] = useState(null);

  return (
    <>
      {loading ? (
        <div className="w-full  h-full bg-gray-100">
          <Nav />

          {Subscribed.length === 0 ? (
            <NotfoundAcount
              page={!language ? "No subscriptions." : "구독한 콘텐츠가 없습니다."}
              titlepage={!language ? "You haven’t subscribed to any series." : "구독한 콘텐츠가 없습니다."}
            />
          ) : (
            <div className="w-full h-full xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px] bg-gray-100">

              {/* phần truyện series theo dõi */}
              <div className="py-[10px] flex-row justify-center items-center container mx-auto my-auto">

                <div className="m-2 flex justify-between mb-[30px]">
                  <h1 className="flex items-center justify-center font-semibold text-lg text-black">
                    {!language ?
                      "ORIGINALS"
                      :
                      "오리지널"
                    }
                  </h1>

                  {EditSubscribed ? (
                    <div className="flex">
                      <button
                        className="w-[35px] max-h-[35px] font-semibold text-base text-black ml-3 px-2 rounded-full bg-[#dfdbdbec]"
                        onClick={getALLSubscribed}
                      >
                        <CheckIcon
                          sx={
                            ALLSubcribed
                              ? { color: "#31C48D" }
                              : { color: "white" }
                          }
                        />
                      </button>

                      <button
                        className="max-h-[35px] font-semibold text-base mr-2 ml-1 p-1 rounded-full text-gray-400"
                        onClick={getALLSubscribed}
                      >
                        {!language ?
                          "Select All"
                          :
                          "모두 선택"
                        }
                      </button>

                      <button
                        className="h-[35px] flex items-center justify-center font-semibold text-basg text-black border-gray-400 border py-2 px-7 rounded-full mr-5 ml-3"
                        onClick={() => HandleDelete()}
                      >
                        {!language ?
                          "Delete"
                          :
                          "삭제"
                        }
                      </button>
                      <button
                        className="h-[35px] flex items-center justify-center font-semibold text-basg text-white bg-gray-400 py-2 px-7 rounded-full"
                        onClick={() => setEditSubscribed(!EditSubscribed)}
                      >
                        {!language ?
                          "Cancel"
                          :
                          "취소"
                        }
                      </button>
                    </div>
                  ) : (
                    <button
                      className="h-[35px] flex items-center justify-center font-semibold text-basg text-white bg-gray-400 py-2 px-7 rounded-full"
                      onClick={() => setEditSubscribed(!EditSubscribed)}
                    >
                      {!language ?
                        "Edit"
                        :
                        "편집"
                      }
                    </button>
                  )}
                </div>

                {EditSubscribed ? (
                  <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                    {Subscribed?.filter(item => item.idcomic)?.map((item) => {
                      return (
                        <li
                          key={item.id}
                          onClick={() => getidSubscribed(item.id)}
                          className="max-w-[210px] h-[210px] rounded-md bg-white relative cursor-pointer transition-shadow duration-300 hover:shadow"
                        >
                          <div className="w-full h-full" >
                            <img
                              src={item.squareThumbnail}
                              alt="img"
                              className="object-cover w-full h-full rounded-md"
                            />
                          </div>

                          <div className="max-w-[210px] absolute inset-0 flex flex-wrap items-center px-3 py-3">
                            <div className="w-[210px] h-[65px] mb-auto overflow-hidden">
                              <span className="text-black text-lg font-semibold text-shadow-white leading-[1.3] line-clamp-2">
                                {item.title}
                              </span>
                              <span className="h-[20px] text-black text-md text-shadow-white leading-[0.8] line-clamp-1">
                                {item.Author}
                              </span>
                            </div>

                            {/*Trong component React của bạn */}
                            <div className="w-full h-[50px] mt-auto">
                              <span className="w-full text-shadow-white line-clamp-1 text-base text-gray-500">
                                {!language ?
                                  "Update"
                                  :
                                  "업데이트"
                                }
                              </span>


                              <span className="text-shadow-white line-clamp-1 text-base text-gray-500">
                                {!language ? (
                                  <span>
                                    {monthNames[new Date(item.createTime).getMonth()].en}{" "}
                                    {new Date(item.createTime).getDate()},
                                    {new Date(item.createTime)?.getFullYear()}
                                  </span>
                                ) : (
                                  <span>
                                    {monthNames[new Date(item.createTime).getMonth()].kr}{" "}
                                    {new Date(item.createTime).getDate()}일,
                                    {new Date(item.createTime)?.getFullYear()}년
                                  </span>
                                )}
                              </span>

                              <button className="absolute top-[75%] left-[75%] truncate line-clamp-5 text-base font-bold p-2 rounded-full bg-[#dfdbdbec]">
                                <CheckIcon
                                  sx={
                                    checkSubcribed?.includes(item.id)
                                      ? { color: "#31C48D" }
                                      : { color: "white" }
                                  }
                                />
                              </button>
                            </div>

                          </div>

                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                    {Subscribed?.filter(item => item.idcomic)?.map((item) => {
                      return (
                        <Link
                          key={item.id}
                          to={`/originals/original/series/${item.idcomic}`}
                        >
                          <li
                            onMouseEnter={() => setHoveredOriginalItem(item.id)}
                            onMouseLeave={() => setHoveredOriginalItem(null)}
                            className="max-w-[210px] h-[210px] rounded-md bg-white relative cursor-pointer transition-shadow duration-300 hover:shadow"
                          >
                            <div className="w-full h-full" >
                              <img
                                src={item.squareThumbnail}
                                alt="img"
                                className="object-cover w-full h-full rounded-md"
                              />

                              {hoveredOriginalItem === item.id && (
                                <div className="absolute inset-0 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                  <AutoStoriesIcon sx={{ fontSize: 40 }} />
                                </div>
                              )}
                            </div>

                            <div className="max-w-[210px] absolute inset-0 flex flex-wrap items-center px-3 py-3">
                              <div className="w-[210px] h-[65px] mb-auto overflow-hidden">
                                <span className="text-black text-lg font-semibold text-shadow-white leading-[1.3] line-clamp-2">
                                  {item.title}
                                </span>
                                <span className="h-[20px] text-black text-md text-shadow-white leading-[0.8] line-clamp-1">
                                  {item.Author}
                                </span>
                              </div>

                              {/*Trong component React của bạn */}
                              <div className="w-full h-[50px] mt-auto">
                                <span className="w-full text-shadow-white line-clamp-1 text-base text-gray-500">
                                  {!language ?
                                    "Update"
                                    :
                                    "업데이트"
                                  }
                                </span>

                                <span className="text-shadow-white line-clamp-1 text-base text-gray-500">
                                  {!language ? (
                                    <span>
                                      {monthNames[new Date(item.createTime).getMonth()].en}{" "}
                                      {new Date(item.createTime).getDate()},
                                      {new Date(item.createTime)?.getFullYear()}
                                    </span>
                                  ) : (
                                    <span>
                                      {monthNames[new Date(item.createTime).getMonth()].kr}{" "}
                                      {new Date(item.createTime).getDate()}일,
                                      {new Date(item.createTime)?.getFullYear()}년
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}

              </div>

              {/* phần video series theo dõi */}
              <div className="py-[10px] flex-row justify-center items-center container mx-auto my-auto">

                <div className="m-2 flex justify-between mb-[30px]">
                  <h1 className="flex items-center justify-center font-semibold text-lg text-black">
                    {!language ?
                      "VIDEOS"
                      :
                      "비디오"
                    }
                  </h1>

                  {EditSubscribedVideo ? (
                    <div className="flex">
                      <button
                        className="w-[35px] max-h-[35px] font-semibold text-base text-black ml-3 px-2 rounded-full bg-[#dfdbdbec]"
                        onClick={getALLSubscribedVideo}
                      >
                        <CheckIcon
                          sx={
                            ALLSubcribedVideo
                              ? { color: "#31C48D" }
                              : { color: "white" }
                          }
                        />
                      </button>

                      <button
                        className="max-h-[35px] font-semibold text-base mr-2 ml-1 p-1 rounded-full text-gray-400"
                        onClick={getALLSubscribedVideo}
                      >
                        {!language ?
                          "Select All"
                          :
                          "모두 선택"
                        }
                      </button>

                      <button
                        className="h-[35px] flex items-center justify-center font-semibold text-basg text-black border-gray-400 border py-2 px-7 rounded-full mr-5 ml-3"
                        onClick={() => HandleDeleteVideo()}
                      >
                        {!language ?
                          "Delete"
                          :
                          "삭제"
                        }
                      </button>
                      <button
                        className="h-[35px] flex items-center justify-center font-semibold text-basg text-white bg-gray-400 py-2 px-7 rounded-full"
                        onClick={() => setEditSubscribedVideo(!EditSubscribedVideo)}
                      >
                        {!language ?
                          "Cancel"
                          :
                          "취소"
                        }
                      </button>
                    </div>
                  ) : (
                    <button
                      className="h-[35px] flex items-center justify-center font-semibold text-basg text-white bg-gray-400 py-2 px-7 rounded-full"
                      onClick={() => setEditSubscribedVideo(!EditSubscribedVideo)}
                    >
                      {!language ?
                        "Edit"
                        :
                        "편집"
                      }
                    </button>
                  )}
                </div>

                {/* {EditSubscribedVideo ? (
                  <ul className="w-full h-full grid grid-cols-5 gap-3 px-5">
                    {Subscribed?.filter(item => item.idvideo)?.map((item) => {
                      return (
                        <li
                          key={item?.id}
                          className={`w-full h-full rounded-md ${checkSubcribedVideo?.includes(item.id) ? "border-emerald-400" : ""}  relative`}
                          onClick={() => getidSubscribedVideo(item.id)}
                        >
                          <img
                            src={item.squareThumbnail}
                            alt="img"
                            className="object-cover w-full h-full rounded-md"
                          />
                          <div className="absolute top-2 px-3">
                            <span className=" text-shadow-white line-clamp-2 text-lg w-full font-bold">
                              {item?.title}
                            </span>
                            <span className="w-full text-shadow-white line-clamp-1 text-md">
                              {item?.Author}
                            </span>
                          </div>

                          <div className="absolute top-[70%] px-3">
                            <span className="w-full text-shadow-white line-clamp-1 text-base text-gray-500">
                              {!language ?
                                "Update"
                                :
                                "업데이트"
                              }
                            </span>
                            {!language ?
                              <span className="text-shadow-white line-clamp-1 text-base text-gray-500">
                                {monthNames[new Date(item.createTime).getMonth()].en}{" "}
                                {new Date(item.createTime).getDate()},
                                {new Date(item.createTime)?.getFullYear()}
                              </span>
                              :
                              <span className="text-shadow-white line-clamp-1 text-base text-gray-500">
                                {monthNames[new Date(item.createTime).getMonth()].kr}{" "}
                                {new Date(item.createTime).getDate()}일,
                                {new Date(item.createTime)?.getFullYear()}년
                              </span>
                            }
                          </div>

                          <button className="absolute top-[75%] left-[75%] truncate line-clamp-5 text-base font-bold p-2 rounded-full bg-[#dfdbdbec]">
                            <CheckIcon
                              sx={
                                checkSubcribedVideo?.includes(item.id)
                                  ? { color: "#31C48D" }
                                  : { color: "white" }
                              }
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <ul className="w-full h-full grid grid-cols-5 gap-3 px-5">
                    {Subscribed?.filter(item => item.idvideo)?.map((item) => {
                      return (
                        <li
                          key={item?.id}
                          className="flex-row w-full h-full rounded-md relative overflow-hidden"
                        >
                          <img
                            src={item.squareThumbnail}
                            alt="img"
                            className="object-cover w-full h-full rounded-md"
                          />
                          <div className="absolute top-2 px-3">
                            <span className="w-full text-shadow-white line-clamp-2 text-lg font-bold">
                              {item?.title}
                            </span>
                            <span className="w-full text-shadow-white line-clamp-1 text-md">
                              {item?.Author}
                            </span>
                          </div>

                          <div className="absolute top-[70%] px-3">
                            <span className="w-full text-shadow-white line-clamp-1 text-base text-gray-500">
                              {!language ?
                                "Update"
                                :
                                "업데이트"
                              }
                            </span>

                            {!language ?
                              <span className="text-shadow-white line-clamp-1 text-base text-gray-500">
                                {monthNames[new Date(item.createTime).getMonth()].en}{" "}
                                {new Date(item.createTime).getDate()},
                                {new Date(item.createTime)?.getFullYear()}
                              </span>
                              :
                              <span className="text-shadow-white line-clamp-1 text-base text-gray-500">
                                {monthNames[new Date(item.createTime).getMonth()].kr}{" "}
                                {new Date(item.createTime).getDate()}일,
                                {new Date(item.createTime)?.getFullYear()}년
                              </span>}
                          </div>

                        </li>
                      );
                    })}
                  </ul>
                )} */}

                {EditSubscribedVideo ? (
                  <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                    {Subscribed?.filter(item => item.idvideo)?.map((item) => {
                      return (
                        <li
                          key={item.id}
                          className="max-w-[210px] h-[210px] rounded-md bg-white cursor-pointer transition-shadow duration-300 hover:shadow"
                          onClick={() => getidSubscribedVideo(item.id)}
                        >
                          <div className="w-full h-[120px] relative" >
                            <img
                              src={item.squareThumbnail}
                              alt="img"
                              className="object-cover w-full h-full rounded-md"
                            />

                            <button className="absolute top-[55%] left-[75%] truncate line-clamp-5 text-base font-bold p-2 rounded-full bg-[#dfdbdbec]">
                              <CheckIcon
                                sx={
                                  checkSubcribedVideo?.includes(item.id)
                                    ? { color: "#31C48D" }
                                    : { color: "white" }
                                }
                              />
                            </button>
                          </div>

                          <div className="max-w-[210px] flex flex-wrap items-center px-3 py-3">
                            <div className="w-[210px] h-[65px] mb-auto overflow-hidden">
                              <span className="text-black text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                {item.title}
                              </span>
                              <span className="text-black text-md text-shadow-white leading-[1.2] line-clamp-1">
                                {item.Author}
                              </span>
                            </div>

                            {/* <div className="w-full mb-[20px]">
                                            <span className="w-[75px] text-rose-300 rounded-full px-1 text-sm font-semibold flex items-center gap-1">
                                                <FavoriteIcon />
                                                {item.like}
                                            </span>
                                            <span className="w-[35px] h-[35px] mt-2 uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                Up
                                            </span>
                                        </div> */}

                          </div>

                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                    {Subscribed?.filter(item => item.idvideo)?.map((item) => {
                      return (
                        <Link
                          key={item.id}
                          to={`/videos/video/series/${item.idvideo}`}
                          className="max-w-[210px] h-[210px]"
                        >
                          <li
                            onMouseEnter={() => setHoveredVideoItem(item.id)}
                            onMouseLeave={() => setHoveredVideoItem(null)}
                            className="max-w-[210px] h-[210px] rounded-md bg-white cursor-pointer transition-shadow duration-300 hover:shadow"
                          >

                            <div className="w-full h-[120px] relative" >
                              <img
                                src={item.squareThumbnail}
                                alt="img"
                                className="object-cover w-full h-full rounded-md"
                              />

                              {hoveredVideoItem === item.id && (
                                <div className="absolute inset-0 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                  <PlayArrowIcon sx={{ fontSize: 60 }} />
                                </div>
                              )}
                            </div>

                            <div className="max-w-[210px] flex flex-wrap items-center px-3 py-3">
                              <div className="w-[210px] h-[65px] mb-auto overflow-hidden">
                                <span className="text-black text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                  {item.title}
                                </span>
                                <span className="text-black text-md text-shadow-white leading-[1.2] line-clamp-1">
                                  {item.Author}
                                </span>
                              </div>

                              {/* <div className="w-full mb-[20px]">
                                                <span className="w-[75px] text-rose-300 rounded-full px-1 text-sm font-semibold flex items-center gap-1">
                                                    <FavoriteIcon />
                                                    {item.like}
                                                </span>
                                                <span className="w-[35px] h-[35px] mt-2 uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                    Up
                                                </span>
                                            </div> */}

                            </div>

                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          )}
          <div>
            <Alsolike />
            <Suggestsubscribed />
          </div>
        </div>
      ) : (
        <div className="w-full h-[370px] flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Subscribed;
