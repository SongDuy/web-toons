import React, { useState } from "react";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const NewTrendingOriginalsPage = () => {
  const comic = useSelector((state) => state.comic.comic);
  const comicid=comic?.comic?.slice(0,1)?.sort((a, b) => b.views - a.views)[0]
  // Khi lia chuột hiên icon khi lia vào truyện hoặc video
  const [hoveredOriginalItem, setHoveredOriginalItem] = useState(null);

  //Lấy ngôn ngữ
  const language = useSelector((state) => state.hidden.language);

  return (
    <div className="w-full h-full pt-[70px]">
      <div className="h-[70px] flex items-center uppercase font-semibold text-xl">
        {!language ? (
          <span> NEW & TRENDING ORIGINALS </span>
        ) : (
          <span> 원본의 새로운 기능 </span>
        )}
      </div>

      <div className="w-full flex gap-[60px]">
        {/* Hien thị top 1 */}
        {comicid?.id&&
        <Link
          to={`/originals/original/series/${comicid?.id}`}
          className="h-[815px] bg-white py-1"
        >
          <div
            className="w-[500px] h-full"
            onMouseEnter={() => setHoveredOriginalItem("choice")}
            onMouseLeave={() => setHoveredOriginalItem(null)}
          >
            <div className="w-full h-full">
              <div className="w-[500px] mr-auto h-[500px] rounded-md flex items-center justify-center relative">
                <div className="w-full h-full">
                  <img
                    src={comicid?.squareThumbnail}
                    alt="img"
                    className="object-fill w-full h-full rounded-md"
                  />

                  {hoveredOriginalItem === "choice" && (
                    <div className="absolute inset-0 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                      <AutoStoriesIcon sx={{ fontSize: 60 }} />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">
                  <div className="w-full h-[120px] mb-auto overflow-hidden">
                    <div className="w-[80px] h-[80px] flex items-center justify-center mx-2">
                      <span className="mx-3 text-[60px] text-white text-shadow-black font-bold">
                        1
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-[150px] mt-3">
                <div className="w-full">
                  <span className="block text-gray-400">{comicid?.genre1},{comicid?.genre2}</span>
                </div>

                <div className="w-full h-[75px] overflow-hidden">
                  <span className="text-[30px] font-semibold leading-[1.2] line-clamp-2">
                  {comicid?.title}
                  </span>
                </div>

                <div>
                  <span className="block"> {comicid?.Author}</span>
                </div>

                <div className=" w-full h-full mt-5 overflow-hidden">
                  <span className="w-full line-clamp-6">
                  {comicid?.summary}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
}
        {/* Hien thị danh sách */}
        <div className="w-full h-[815px] bg-white">
          <div className="w-full h-full">
            <ul className="w-full h-full ">
              {/* khung nội dung */}
              {comic?.comic
                ?.slice()
                ?.sort((a, b) => b.views - a.views)
                ?.slice(1,9)
                .map((item, index) => (
                  <Link
                    to={`/originals/original/series/${item.id}`}
                    key={item.id}
                  >
                    <li className="w-full h-[90px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100">
                      <div className="w-full h-full flex items-center">
                        <div className="w-[80px] h-[80px]">
                          <img
                            src={item.squareThumbnail}
                            alt="img"
                            className="object-fill w-full h-full rounded-md"
                          />
                        </div>
                        <div className="w-[30px] h-[30px] mx-3 flex items-center justify-center">
                          <span className="mx-3 text-xl text-white text-shadow-black font-bold">
                            {index + 2}
                          </span>
                        </div>
                        <div className="w-[420px] mt-auto mb-auto overflow-hidden">
                          <span className="text-gray-400 text-sm">
                          {item.genre1},{item.genre2}
                          </span>
                          <span className="text-md font-semibold line-clamp-1">
                            {item.title}
                          </span>
                          <span className="text-sm line-clamp-1">
                            {item.Author}
                          </span>
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTrendingOriginalsPage;
