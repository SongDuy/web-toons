import React, { useState, useEffect } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckIcon from "@mui/icons-material/Check";
const Suggestsubscribed = () => {
  const [Trending, setTrending] = useState([]);
  const [Originals, setOriginals] = useState([]);
  useEffect(() => {
    setTrending([
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
    setOriginals([
      {
        id: 1,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        Rate: 1,
        Author: "singNsong/UMI",
        genre: "Comedy",

        Create: "july 22,2024",
      },
      {
        id: 2,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        Rate: 2,
        Author: "singNsong/UMI",
        genre: "Comedy",

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

  return (
      <div className="grid grid-cols-2     container  mx-auto">
      <div className=" flex-row  justify-center items-center container">
        <div className="  m-2 ">
          <span className="font-semibold text-lg text-black">
            New & Trending <NavigateNextIcon />
          </span>
        </div>

        <div className=" flex    p-5">
          <div className="w-full h-full     ">
            {Trending.length === 0 ? (
              <div></div>
            ) : (
              <div className="grid grid-rows-3 gap-2 w-full">
                {Trending.map((item) => {
                  return (
                    <div className="grid grid-cols-8 gap-2 " key={item.id}>
                      <div className="col-span-2">
                        <img
                          src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                          alt=""
                          className="object-contain"
                        />
                      </div>

                      <div className="col-span-6 flex m-auto py-auto">
                        <div className="mx-3  m-auto ">
                          <p className="font-semibold text-lg">{item.Rate}</p>
                        </div>
                        <div className="w-1/2">
                          <p className=" text-[12px]">{item.genre}</p>
                          <p className="truncate line-clamp-5 transition-all after:content-['...']">
                            {item.Name}
                          </p>
                          <p className=" text-[12px]">{item.Author}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-row justify-center items-center container mx-auto my-auto">
        <div className="  m-2 flex justify-between ">
          <span className="font-semibold text-lg text-black">
            ORIGINALS by Genre <NavigateNextIcon />
          </span>
          <button className="font-semibold text-basg text-gray-400">
            FANTASY <CheckIcon />
          </button>
        </div>

        <div className=" flex    p-5">
          <div className="w-full h-full     ">
            {Originals.length === 0 ? (
              <div></div>
            ) : (
              <div className="grid grid-rows-3 gap-2 w-full">
                {Originals.map((item) => {
                  return (
                    <div className="grid grid-cols-8 gap-2 " key={item.id}>
                      <div className="col-span-2">
                        <img
                          src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                          alt=""
                          className="object-contain"
                        />
                      </div>

                      <div className="col-span-6 flex m-auto py-auto">
                        <div className="mx-3  m-auto ">
                          <p className="font-semibold text-lg">{item.Rate}</p>
                        </div>
                        <div className="w-1/2">
                          <p className=" text-[12px]">{item.genre}</p>
                          <p className="truncate line-clamp-5 transition-all after:content-['...']">
                            {item.Name}
                          </p>
                          <p className=" text-[12px]">{item.Author}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Suggestsubscribed;
