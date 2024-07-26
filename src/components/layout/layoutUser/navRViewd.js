import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const NavRViewd = () => {
  const [RViewd, setRViewd] = useState([]);
  const [OpennavRVivew, setOpennavRVivew] = useState(false);
  const [OpenoAnimation, setnoAnimation] = useState(false);

  useEffect(() => {
    setRViewd([
      {
        id: 1,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        Rate: 1,
        genre: "Comedy",
        Author: "singNsong/UMI",
        Create: "july 22,2024",
      },
      {
        id: 2,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        Rate: 2,
        genre: "Comedy",
        Author: "singNsong/UMI",
        Create: "july 22,2024",
      },
      {
        id: 3,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        Rate: 3,
        genre: "Comedy",

        Author: "singNsong/UMI",
        Create: "july 22,2024",
      },
    ]);
  }, []);
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
              {RViewd?.length === 0 ? (
                <div></div>
              ) : (
                <div className="grid grid-rows-3 gap-2 w-full mx-auto py-auto  ">
                  {RViewd?.map((item) => {
                    return (
                      <div className="grid grid-row-5 gap-1 " key={item.id}>
                        <div className="w-full col-row-4 ">
                          <img
                            src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                            alt=""
                            className="object-contain w-full "
                          />
                        </div>
                        <p className="truncate  transition-all text-sm ">
                          {item.Name}{" "}
                        </p>
                        <p className="text-gray-400 text-sm">#{item.Rate}</p>
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
