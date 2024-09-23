import React, { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Suggestsubscribed = () => {

  const [selectedOriginalGenre, setSelectedOriginalGenre] = useState("All");
  const comic = useSelector((state) => state.comic.comic);

  const filteredcomic = comic.comic
    ?.slice(0,3)
    ?.sort((a, b) => b.views - a.views);
  const searchedcomic = comic.comic
    ?.filter((item) =>
      selectedOriginalGenre === "All"
        ? item
        : item.genre1 === selectedOriginalGenre ||
          item.genre2 === selectedOriginalGenre
    )
    .slice(0,3)
  ;
 
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
            {filteredcomic?.length === 0 ? (
              <div></div>
            ) : (
              <div className="grid grid-rows-3 gap-2 w-full">
                {filteredcomic?.map((item,index) => {
                  return (
                    <Link
                    key={item.id}
                    to={`/originals/original/series/${item.id}`}
                >
                    <div
                        className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                    >
                        <div className="w-full h-full flex items-center">
                            <div className="w-[80px] h-[80px] flex">
                                <img
                                    src={item.squareThumbnail}
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />
                            </div>

                            <div className="w-[30px] h-[30px] flex items-center justify-center mx-2">
                                <span className="mx-3 text-xl text-white text-shadow-black font-bold">
                                    {index + 1}
                                </span>
                            </div>

                            <div className="w-[230px] mt-auto mb-auto overflow-hidden">
                                <span className="text-gray-400 text-sm">
                                    {item.genre1}
                                </span>
                                <span className="text-md font-semibold line-clamp-1">
                                    {item.title}

                                </span>
                                <span className="text-sm line-clamp-1">
                                    {item.Author}
                                </span>
                            </div>

                        </div>
                    </div>
                </Link>
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
            {searchedcomic?.length === 0 ? (
              <div></div>
            ) : (
              <div className="grid grid-rows-3 gap-2 w-full">
                {searchedcomic?.map((item,index) => {
                  return (
                    <Link
                    key={item.id}
                    to={`/originals/original/series/${item.id}`}
                >
                    <div
                        className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                    >
                        <div className="w-full h-full flex items-center">
                            <div className="w-[80px] h-[80px] flex">
                                <img
                                    src={item.squareThumbnail}
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />
                            </div>

                            <div className="w-[30px] h-[30px] flex items-center justify-center mx-2">
                                <span className="mx-3 text-xl text-white text-shadow-black font-bold">
                                    {index + 1}
                                </span>
                            </div>

                            <div className="w-[230px] mt-auto mb-auto overflow-hidden">
                                <span className="text-gray-400 text-sm">
                                    {item.genre1}
                                </span>
                                <span className="text-md font-semibold line-clamp-1">
                                    {item.title}

                                </span>
                                <span className="text-sm line-clamp-1">
                                    {item.Author}
                                </span>
                            </div>

                        </div>
                    </div>
                </Link>
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
