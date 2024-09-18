import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch,useSelector } from 'react-redux';
import { getrandomComic } from "../../../common/store/comic";

const NavRViewd = () => {
  const [OpennavRVivew, setOpennavRVivew] = useState(false);
  const [OpenoAnimation, setnoAnimation] = useState(false);
  const   dispatch = useDispatch();
  const comic = useSelector(state => state.comic.random);
  useEffect(() => {
    const getRandom = async ()=>{
      if (!comic.comic) {
       try {
      
        const random= await  dispatch(getrandomComic(5));
        
       unwrapResult(random)
         
       } catch (error) {
        console.log(error)

       }
      }
    };
    getRandom()
  }, [dispatch,comic]);
 
  const OpenRView = () => {
    setOpennavRVivew(true)
    setnoAnimation(true)
  }
  return (
    <div>
      <button
        className="fixed top-[50%] right-[-4%] transform rotate-90  bg-white   p-3 rounded-br-lg rounded-bl-lg flex"
        onClick={() => OpenRView()}
      >
        Recently viewed
        <div className="transform rotate-90 ml-3">
          {" "}
          <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
        </div>
      </button>
      {OpenoAnimation &&
        <div>
          <button
            className={`fixed top-[50%] right-[3%]     ${!OpennavRVivew ? " animate-slideLeft " : "animate-slideRight "
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
                <p className="text-center">Recently</p>
                <p className="text-center">viewed</p>
              </div>
            </div>
            <div className="w-full h-full  mt-5 ">
              {comic.comic?.length === 0 ? (
                <div></div>
              ) : (
                <div className="grid grid-rows-3 gap-2 w-full mx-auto py-auto  ">
                  {comic.comic?.map((item) => {
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
                        <p className="text-gray-400 text-sm">#{item.rate}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default NavRViewd;
