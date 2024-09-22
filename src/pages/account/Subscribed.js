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
  const [replay, setreplay] = useState(false);

  const dispatch = useDispatch();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    const get = async () => {
      try {
        setloading(false);

        const subscribe = await SubscribeFireBase.getbyid(Account?.uid);
        const age= Account?.birthday? new Date(Date.now())?.getFullYear()-new Date(Account.birthday)?.getFullYear():15
      
        const lg = await dispatch(getAllComic(age));
        unwrapResult(lg);

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
        console.log(error)
      }
    };
    get();
  }, [dispatch,Account, replay]);
  const HandleDelete = async () => {
    try {
      setloading(false);
      await Promise.all(
        checkSubcribed?.map(async (item) => {
          try {
            const sub = await SubscribeFireBase.getbysub(item);
            if (sub.success) {
              const comicid = item.idcomic
                ? await comicFireBase.getbyid(sub.idcomic)
                : await VideoFireBase.getbyid(sub.idvideo);
              item.idcomic
                ? await comicFireBase.update(
                    { totalSubscribed: comicid.totalSubscribed - 1 },
                    sub.idcomic
                  )
                : await VideoFireBase.update(
                    { totalSubscribed: comicid.totalSubscribed - 1 },
                    sub.idvideo
                  );
              await SubscribeFireBase.Delete(item);
            }
          } catch (error) {}
        })
      );
      setreplay(true);

      setloading(true);
    } catch (error) {}
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
  return (
    <>
      {loading ? (
        <div className="w-full  h-full bg-gray-100">
          <Nav />

          {Subscribed.length === 0 ? (
            <NotfoundAcount
              page="Subscribed"
              titlepage="Start following your favorite creators now."
            />
          ) : (
            <div className="w-full h-full bg-gray-100">
              <div className="py-[10px] flex-row justify-center items-center container mx-auto my-auto">
                <div className="  m-2 flex justify-between ">
                  <span className="font-semibold text-lg text-black">
                    ORIGINALS
                  </span>
                  {EditSubscribed ? (
                    <div className="flex">
                      <button
                        className="font-semibold text-base text-black     ml-3 p-2 rounded-full bg-[#dfdbdbec]"
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
                        className="font-semibold text-base     mr-2 ml-1 p-1 rounded-full text-gray-400"
                        onClick={getALLSubscribed}
                      >
                        Select All
                      </button>

                      <button
                        className="font-semibold text-basg text-black border-gray-400 border py-2 px-7 rounded-full mr-5 ml-3"
                        onClick={() => HandleDelete()}
                      >
                        Delete
                      </button>
                      <button
                        className="font-semibold text-basg text-white bg-gray-400 py-2 px-7 rounded-full"
                        onClick={() => setEditSubscribed(!EditSubscribed)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="font-semibold text-basg text-white bg-gray-400 py-2 px-7 rounded-full"
                      onClick={() => setEditSubscribed(!EditSubscribed)}
                    >
                      Edit
                    </button>
                  )}
                </div>
                {EditSubscribed ? (
                  <div className="  grid grid-cols-5 gap-2  w-full h-full   px-5">
                    {Subscribed?.map((item) => {
                      return (
                        <button
                          className={` w-full h-full border-2 ${
                            checkSubcribed?.includes(item.id)
                              ? "border-emerald-400"
                              : ""
                          }  relative`}
                          key={item?.id}
                          onClick={() => getidSubscribed(item.id)}
                        >
                          <img
                            src={item.squareThumbnail}
                            alt=""
                            className="object-contain "
                          />
                          <p className="absolute top-2 left-2 truncate line-clamp-5  after:content-['...'] text-lg w-2/3 font-bold">
                            {item?.title}
                          </p>
                          <p className="absolute top-7 left-2 truncate line-clamp-5  after:content-['...'] text-lg w-2/3">
                            {item?.Author}
                          </p>
                          <p className="absolute top-[70%] left-2 truncate line-clamp-5  text-base  text-gray-500">
                            Update
                          </p>
                          <p className="absolute top-[80%] left-2  truncate line-clamp-5 text-base  text-gray-500">
                            {monthNames[new Date(item.createTime).getMonth()]}{" "}
                            {new Date(item.createTime).getDate()},
                            {new Date(item.createTime)?.getFullYear()}
                          </p>
                          <p className="absolute top-[75%] left-[80%]  truncate line-clamp-5 text-base font-bold p-2 rounded-full bg-[#dfdbdbec]">
                            <CheckIcon
                              sx={
                                checkSubcribed?.includes(item.id)
                                  ? { color: "#31C48D" }
                                  : { color: "white" }
                              }
                            />
                          </p>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="w-full h-full flex-row grid grid-cols-5 gap-4 px-5">
                    {Subscribed.map((item) => {
                      return (
                        <button
                          className="flex-row w-full h-full   relative"
                          key={item?.id}
                        >
                          <img
                            src={item.squareThumbnail}
                            alt=""
                            className="object-contain "
                          />
                          <p className="absolute top-2 left-2 truncate line-clamp-5  after:content-['...'] text-lg w-2/3 font-bold">
                            {item?.title}
                          </p>
                          <p className="absolute top-7 left-2 truncate line-clamp-5  after:content-['...'] text-lg w-2/3">
                            {item?.Author}
                          </p>
                          <p className="absolute top-[70%] left-2 truncate line-clamp-5  text-base  text-gray-500">
                            Update
                          </p>
                          <p className="absolute top-[80%] left-2  truncate line-clamp-5 text-base  text-gray-500">
                            {monthNames[new Date(item.createTime).getMonth()]}{" "}
                            {new Date(item.createTime).getDate()},
                            {new Date(item.createTime)?.getFullYear()}
                          </p>
                        </button>
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
