import React, { useState, useEffect, memo } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getrandomComic } from "../../../common/store/comic";
import { getAccount } from "../../../common/store/Account";
import { auth } from "../../../common/themes/firebase";

const NavRViewd = () => {
  const [OpennavRVivew, setOpennavRVivew] = useState(false);
  const [OpenoAnimation, setnoAnimation] = useState(false);
  const dispatch = useDispatch();
  const comic = useSelector((state) => state.comic.random);
  const User = useSelector((state) => state.AuthJs.User);
  const language = useSelector(state => state.hidden.language);
  const check19Modal = useSelector(state => state.hidden.check19Modal);

  useEffect(() => {
    const getRandom = async () => {
        try {
          if (User) {
            const account = await dispatch(getAccount(auth?.currentUser?.uid));
            const user = unwrapResult(account);
            if (user?.checkage) {
              const age = account?.payload?.birthday
                ? new Date(Date.now())?.getFullYear() -
                new Date(user.birthday)?.getFullYear()
                : 15;
              const random = await dispatch(getrandomComic({ limit: 5, age }));

              unwrapResult(random);
            } else {
              const random = await dispatch(getrandomComic(5));

              unwrapResult(random);
            }
          } else {
            const random = await dispatch(getrandomComic(5));

            unwrapResult(random);
          }
        } catch (error) {
          // console.log(error)
        }
     
    };
    getRandom();
  }, [dispatch, User,check19Modal]);

  const OpenRView = () => {
    setOpennavRVivew(true);
    setnoAnimation(true);
  };
  return (
    <div>
      <div className="hidden 3xl:block">
        <button
          className="fixed top-[50%] right-[-4%] transform rotate-90 bg-white p-5 rounded-br-lg rounded-bl-lg flex"
          onClick={() => OpenRView()}
        >
          {!language ? "Recently viewed" : "최근 본 항목"}
          <div className="transform rotate-90 ml-3">
            {" "}
            <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
          </div>
        </button>
        {OpenoAnimation && (
          <div>
            <button
              className={`fixed top-[50%] right-[3%]  ${!OpennavRVivew ? " animate-slideLeft " : "animate-slideRight "
                } `}
              onClick={() => setOpennavRVivew(false)}
            >
              <div className="transform rotate-90 bg-white   p-3 rounded-br-lg rounded-bl-lg flex text-white">
                Recently
                <div className="  rotate-90 mx-auto py-auto">
                  {" "}
                  <ArrowBackIosNewIcon sx={{ fontSize: 23, color: "black" }} />
                </div>{" "}
                viewed
              </div>
            </button>

            <div
              className={`fixed top-0 h-screen right-[-2%]  w-[9%] bg-white p-8 ${!OpennavRVivew ? " animate-slideLeft " : "animate-slideRight "
                }`}
            >
              <div className="flex justify-center items-center ">
                <div>
                  <p className="text-center">{!language?"Recently": "최근"} </p>
                  <p className="text-center"> {!language?"viewed":"본 것"}</p>
                </div>
              </div>
              <div className="w-full h-full  mt-5 ">
                {comic.comic?.length === 0 ? (
                  <div></div>
                ) : (
                  <div className="grid grid-rows-3 gap-2 w-full mx-auto py-auto  ">
                    {comic.comic?.slice()?.sort((a, b) => b.views - a.views)?.map((item,index) => {
                      return (
                        <div className="grid grid-row-5 gap-1 " key={item.id}>
                          <div className="w-full col-row-4 ">
                            <img
                              src={item.squareThumbnail}
                              alt=""
                              className="object-contain w-full "
                            />
                          </div>
                          <p className="truncate  transition-all text-sm ">
                            {item.title}{" "}
                          </p>
                          <p className="text-gray-400 text-sm">#{index+1}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="block 3xl:hidden">
       
      </div>

    </div>
  );
};

export default memo(NavRViewd);
