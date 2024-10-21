import React, { useState, useEffect } from "react";
import Nav from "../../components/Account/nav";
import NotfoundAcount from "../../components/Account/NotfoundAcount";
import { useSelector } from "react-redux";
import FollowFireBase from "../../common/services/Follow.services";
import userFireBase from "../../common/services/User.services";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

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
            <div className="w-full h-full xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px] bg-gray-100">
              <div className="w-full py-[10px] flex-row justify-center items-center">
                <div className="m-2 flex justify-between mb-[30px]">
                  <h1 className="flex items-center justify-center font-semibold text-lg text-black">

                    {!language ?
                      "CREATORS"
                      :
                      "창작자"
                    }
                  </h1>

                  {EditFollow ? (
                    <div className="flex">
                      <button
                        className="w-[35px] max-h-[35px] text-black rounded-full bg-[#dfdbdbec]"
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
                  <ul className="w-full h-full grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* khung danh sách */}
                    {Creators?.map((item) => {
                      return (
                        <li
                          key={item.id}
                          onClick={() => getidSubscribed(item.id)}
                          className="w-full h-[120px] flex rounded shadow border hover:shadow-md bg-white"
                        >
                          <div className="min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] rounded-full flex items-center justify-center">
                            <Avatar
                              alt="Remy Sharp"
                              src={item.image}
                              sx={{ width: 100, height: 100 }}
                            />
                          </div>

                          <div className="w-full h-full rounded-xl px-3 py-3">
                            <div className="flex w-full justify-end">
                              <button className="w-[35px] h-[35px] rounded-full bg-[#dfdbdbec]">
                                <CheckIcon
                                  sx={
                                    checkFollow?.includes(item.id)
                                      ? { color: "#31C48D" }
                                      : { color: "white" }
                                  }
                                />
                              </button>
                            </div>

                            <div className="w-full h-full rounded-xl">
                              <div className="w-full flex items-center justify-center overflow-hidden">
                                <span className="w-full text-xl font-semibold line-clamp-1 text-yellow-500 text-shadow-black">
                                  {item.name}
                                </span>
                              </div>

                              <div className="w-full flex justify-end text-right">
                                <span className="text-md font-semibold text-white text-shadow-black">
                                  {!language ? <span> Followers: </span> : <span> 팔로워: </span>}
                                  {' '} {item?.follow}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <ul className="w-full h-full grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Creators.map((item) => {
                      return (
                        <Link
                          key={item.id}
                          to={`/channel/creator/${item.idchannel}`}
                        >
                          <li
                            onClick={() => getidSubscribed(item.id)}
                            className="w-full h-[120px] flex rounded shadow border hover:shadow-md bg-white"
                          >
                            <div className="min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] rounded-full flex items-center justify-center">
                              <Avatar
                                alt="Remy Sharp"
                                src={item.image}
                                sx={{ width: 100, height: 100 }}
                              />
                            </div>

                            <div className="w-full h-full rounded-xl px-3 py-3">
                              <div className="w-full mt-[35px] flex items-center justify-center overflow-hidden">
                                <span className="w-full text-xl font-semibold line-clamp-1 text-yellow-500 text-shadow-black">
                                  {item.name}
                                </span>
                              </div>

                              <div className="w-full flex justify-end text-right">
                                <span className="text-md font-semibold text-white text-shadow-black">
                                  {!language ? <span> Followers: </span> : <span> 팔로워: </span>}
                                  {' '} {item?.follow}
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
