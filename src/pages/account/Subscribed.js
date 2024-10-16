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
import Box from "@mui/material/Box";
import VideoFireBase from "../../common/services/Video.services";

const Subscribed = () => {
  const [EditSubscribed, setEditSubscribed] = useState(false);
  const [Subscribed, setSubscribed] = useState([]);
  const [checkSubcribed, setcheckSubcribed] = useState([]);
  const [ALLSubcribed, setALLSubcribed] = useState(false);
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
              setSubscribed(Subscribed?.filter(item => item?.idcomic ? item.idcomic !== sub.idcomic : item.idvideo !== sub.idvideo))
            }
          } catch (error) {
          }
        })
      );

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
  };
  const getALLSubscribed = () => {
    if (checkSubcribed.length === 0) {
      setcheckSubcribed(Subscribed?.map((item) => item.id));

      setALLSubcribed(!ALLSubcribed);
    } else {
      setcheckSubcribed([]);
      setALLSubcribed(!ALLSubcribed);
    }
  };

  //Lấy ngôn ngữ
  const language = useSelector(state => state.hidden.language);

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
                  <div className="w-full h-full grid grid-cols-5 gap-2 px-5">
                    {Subscribed?.map((item) => {
                      return (
                        <div
                          key={item?.id}
                          className={`w-full h-full ${checkSubcribed?.includes(item.id) ? "border-emerald-400" : ""}  relative`}
                          onClick={() => getidSubscribed(item.id)}
                        >
                          <img
                            src={item.squareThumbnail}
                            alt="img"
                            className="object-cover w-full h-full"
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
                                checkSubcribed?.includes(item.id)
                                  ? { color: "#31C48D" }
                                  : { color: "white" }
                              }
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="w-full h-full grid grid-cols-5 gap-2 px-5">
                    {Subscribed.map((item) => {
                      return (
                        <div
                          key={item?.id}
                          className="flex-row w-full h-full relative overflow-hidden"
                        >
                          <img
                            src={item.squareThumbnail}
                            alt="img"
                            className="object-cover w-full h-full"
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

                        </div>
                      );
                    })}
                  </div>
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

export default Subscribed;
