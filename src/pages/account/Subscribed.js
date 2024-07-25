import React, { useState, useEffect } from "react";
import Nav from "../../components/Account/nav";
import NotfoundAcount from "../../components/Account/NotfoundAcount";
import CheckIcon from "@mui/icons-material/Check";
import Recentlyviewed from "../../components/Account/subscribed/Recentlyviewed";
import Alsolike from "../../components/Account/subscribed/Alsolike";
import Suggestsubscribed from "../../components/Account/subscribed/Suggestsubscribed";
const Subscribed = () => {
  const [EditSubscribed, setEditSubscribed] = useState(false);
  const [Subscribed, setSubscribed] = useState([]);
  const [IdSubcribed, setIdSubcribed] = useState(0);
  const [ALLSubcribed, setALLSubcribed] = useState(false);

  useEffect(() => {
    setSubscribed([
      {
        id: 1,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        Author: "singNsong/UMI",
        Create: "july 22,2024",
      },
      {
        id: 2,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        Author: "singNsong/UMI",
        Create: "july 22,2024",
      },
      {
        id: 3,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        Author: "singNsong/UMI",
        Create: "july 22,2024",
      },
    ]);
   
  }, []);
  
  const getidSubscribed = (id) => {
    setIdSubcribed(id);
  };
  return (
    <>
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
                      onClick={() => setALLSubcribed(!ALLSubcribed)}
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
                      onClick={() => setALLSubcribed(!ALLSubcribed)}
                    >
                      Select All
                    </button>

                    <button
                      className="font-semibold text-basg text-black border-gray-400 border py-2 px-7 rounded-full mr-5 ml-3"
                      onClick={() => setEditSubscribed(!EditSubscribed)}
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
                ALLSubcribed ? (
                  <div className="  grid grid-cols-5 gap-2  w-full h-full   px-5">
                    {Subscribed.map((item) => {
                      return (
                        <button
                          className=" w-full h-full border-2 border-emerald-400 relative"
                          key={item?.id}
                          onClick={() => getidSubscribed(item.id)}
                        >
                          <img
                            src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                            alt=""
                            className="object-contain "
                          />
                          <p className="absolute top-2 left-2 truncate line-clamp-5  after:content-['...'] text-lg w-2/3 font-bold">
                            {item?.Name}
                          </p>
                          <p className="absolute top-7 left-2 truncate line-clamp-5  after:content-['...'] text-lg w-2/3">
                            {item?.Author}
                          </p>
                          <p className="absolute top-[70%] left-2 truncate line-clamp-5  text-base  text-gray-500">
                            Update
                          </p>
                          <p className="absolute top-[80%] left-2  truncate line-clamp-5 text-base  text-gray-500">
                            {item?.Create}
                          </p>
                          <p className="absolute top-[75%] left-[80%]  truncate line-clamp-5 text-base font-bold p-2 rounded-full bg-[#dfdbdbec]">
                            <CheckIcon sx={{ color: "#31C48D" }} />
                          </p>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="  grid grid-cols-5 gap-2  w-full h-full   px-5">
                    {Subscribed.map((item) => {
                      return (
                        <button
                          className={` w-full h-full border-2 ${
                            IdSubcribed === item.id && ALLSubcribed
                              ? "border-emerald-400"
                              : ""
                          }  relative`}
                          key={item?.id}
                          onClick={() => getidSubscribed(item.id)}
                        >
                          <img
                            src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                            alt=""
                            className="object-contain "
                          />
                          <p className="absolute top-2 left-2 truncate line-clamp-5  after:content-['...'] text-lg w-2/3 font-bold">
                            {item?.Name}
                          </p>
                          <p className="absolute top-7 left-2 truncate line-clamp-5  after:content-['...'] text-lg w-2/3">
                            {item?.Author}
                          </p>
                          <p className="absolute top-[70%] left-2 truncate line-clamp-5  text-base  text-gray-500">
                            Update
                          </p>
                          <p className="absolute top-[80%] left-2  truncate line-clamp-5 text-base  text-gray-500">
                            {item?.Create}
                          </p>
                          <p className="absolute top-[75%] left-[80%]  truncate line-clamp-5 text-base font-bold p-2 rounded-full bg-[#dfdbdbec]">
                            <CheckIcon
                              sx={
                                IdSubcribed === item.id && ALLSubcribed
                                  ? { color: "#31C48D" }
                                  : { color: "white" }
                              }
                            />
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )
              ) : (
                <div className="w-full h-full flex-row grid grid-cols-5 gap-4 px-5">
                  {Subscribed.map((item) => {
                    return (
                      <button
                        className="flex-row w-full h-full   relative"
                        key={item?.id}
                      >
                        <img
                          src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                          alt=""
                          className="object-contain "
                        />
                        <p className="absolute top-2 left-2 truncate line-clamp-5  after:content-['...'] text-lg w-2/3 font-bold">
                          {item?.Name}
                        </p>
                        <p className="absolute top-7 left-2 truncate line-clamp-5  after:content-['...'] text-lg w-2/3">
                          {item?.Author}
                        </p>
                        <p className="absolute top-[70%] left-2 truncate line-clamp-5  text-base  text-gray-500">
                          Update
                        </p>
                        <p className="absolute top-[80%] left-2  truncate line-clamp-5 text-base  text-gray-500">
                          {item?.Create}
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
          <Recentlyviewed />
          <Alsolike />
          <Suggestsubscribed />
        </div>
      </div>
    </>
  );
};

export default Subscribed;
