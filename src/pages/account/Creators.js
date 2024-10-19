import React, { useState, useEffect } from "react";
import Nav from "../../components/Account/nav";
import NotfoundAcount from "../../components/Account/NotfoundAcount";
import { useSelector } from "react-redux";
import FollowFireBase from "../../common/services/Follow.services";
import userFireBase from "../../common/services/User.services";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";

const Creators = () => {
  const [Creators, setCreators] = useState([]);
  const Account = useSelector((state) => state.Account?.Account);
  const [loading, setloading] = useState(false);
  const [EditFollow, setEditFollow] = useState(false);
  const [checkFollow, setcheckFollow] = useState([]);
  const [ALLFollow, setALLFollow] = useState(false);
  const [replay, setreplay] = useState(false);
  useEffect(() => {
    const get = async () => {
      try {
        setloading(false);
        if (Account?.uid) {
          const Follow = await FollowFireBase.getbyid(Account?.uid);
          if (Follow.success) {
            const Follows = await Promise.all(
              Follow?.follow?.map(async (item) => {
                const comicid = await userFireBase.getbyid(item?.idchannel);
                console.log(comicid)
                return {
                  ...item,
                  ...comicid,
                  id: item.id,
                };
              })
            );
            setCreators(Follows);
          } else {
            setCreators([]);
          }
        }

        setloading(true);
      } catch (error) {
      }
    };
    get();
  }, [Account, replay]);
  const HandleDelete = async () => {
    try {
      setloading(false);
      await Promise.all(
        checkFollow?.map(async (item) => {
          try {
            const Follow = await FollowFireBase.getbyfollow(item);
            if (Follow.success) {
              const userid = await userFireBase.getbyid(Follow.idchannel);
              await userFireBase.update(
                { follow: userid.follow - 1 },
                Follow.idchannel
              );
              await FollowFireBase.Delete(item);
            }
          } catch (error) {
          }
        })
      );
      setreplay(true);

      setloading(true);
    } catch (error) { }
  };
  const getidSubscribed = (id) => {
    if (!checkFollow.includes(id)) {
      setcheckFollow([...checkFollow, id]);
    } else {
      const updatedCheckSubcribed = checkFollow.filter((item) => item !== id);
      setcheckFollow(updatedCheckSubcribed);
    }
  };
  const getALLSubscribed = () => {
    if (checkFollow.length === 0) {
      setcheckFollow(Creators?.map((item) => item.id));

      setALLFollow(!ALLFollow);
    } else {
      setcheckFollow([]);
      setALLFollow(!ALLFollow);
    }
  };

  //Lấy ngôn ngữ
  const language = useSelector(state => state.hidden.language);
  return (
    <div>
      {loading ? (
        <div className="w-full min-h-[500px] bg-gray-100">
          <Nav />

          {Creators.length === 0 ? (
            <NotfoundAcount
              page={!language ? "No creators." : "팔로우하는 창작자가 없습니다. "}
              titlepage={!language ? "Start following your favorite creators now." : "지금 좋아하는 창작자를 팔로우하세요."}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px]">
              <div className="w-full h-full bg-gray-100">
                <div className="py-[10px] flex-row justify-center items-center container mx-auto my-auto">
                  <div className="  m-2 flex justify-between ">
                    <h1 className="font-semibold text-lg text-black">

                      {!language ?
                        "CREATORS"
                        :
                        "창작자"
                      }
                    </h1>

                    {EditFollow ? (
                      <div className="flex">
                        <button
                          className="w-[35px] max-h-[35px] font-semibold text-base text-black ml-3 px-2 rounded-full bg-[#dfdbdbec]"
                          onClick={getALLSubscribed}
                        >
                          <CheckIcon
                            sx={
                              ALLFollow
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
                          onClick={() => setEditFollow(!EditFollow)}
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
                        onClick={() => setEditFollow(!EditFollow)}
                      >
                        {!language ?
                          "Edit"
                          :
                          "편집"
                        }
                      </button>
                    )}
                  </div>

                  {EditFollow ? (
                    <ul className="  grid grid-cols-5 gap-2  w-full    px-5">
                      {Creators?.map((item) => {
                        return (
                          <li
                            className={` w-full h-full border-2 ${checkFollow?.includes(item.id)
                              ? "border-emerald-400"
                              : ""
                              }  relative`}
                            key={item?.id}
                            onClick={() => getidSubscribed(item.id)}
                          >
                            <img
                              src={item.image
                                ? item?.image
                                : "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"}
                              alt=""
                              className="object-contain "
                            />
                            <p className="absolute top-2 left-2 truncate text-shadow-white line-clamp-5  after:content-['...'] text-lg w-2/3 font-bold">
                              {item?.name}
                            </p>

                            <p className="absolute top-[70%] left-2 truncate line-clamp-5  text-base  text-gray-500">

                              {!language ?
                                "Update"
                                :
                                "업데이트"
                              }
                            </p>

                            <span className="absolute top-[65%] left-[80%]  truncate line-clamp-5 text-base font-bold p-2 rounded-full bg-[#dfdbdbec]">
                              <CheckIcon
                                sx={
                                  checkFollow?.includes(item.id)
                                    ? { color: "#31C48D" }
                                    : { color: "white" }
                                }
                              />
                            </span >
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <ul className="w-full h-full flex-row grid grid-cols-5 gap-4 px-5">
                      {Creators.map((item) => {
                        return (
                          <li
                            className="flex-row w-full h-full   relative"
                            key={item?.id}
                          >
                            <img
                              src={item.image
                                ? item?.image
                                : "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"}
                              alt=""
                              className="object-contain h-[50] "
                            />
                            <p className="absolute top-2 left-2 text-shadow-white truncate line-clamp-5  after:content-['...'] text-lg w-2/3 font-bold">
                              {item?.name}
                            </p>

                            <p className="absolute top-[70%] left-2 truncate line-clamp-5  text-base  text-gray-500">
                              {!language ?
                                "Update"
                                :
                                "업데이트"
                              }
                            </p>

                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-[370px] flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Creators;
