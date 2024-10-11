import React, { useState, useEffect } from "react";
import dataListGenre from "../../../components/layout/layoutUser/dataListGenre";
import CheckIcon from "@mui/icons-material/Check";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import dataGenreSearch from "../../../common/utils/datagenresearch";

const PopularOriginalsAndVideosPage = () => {
  const comic = useSelector((state) => state.comic.comic);
  //Chọn thể loại originals
  const language = useSelector((state) => state.hidden.language);

  const [selectedOriginalGenre, setSelectedOriginalGenre] = useState("All");
  const [hiddenselected, sethiddenSelected] = useState(
    !language ? "All" : "모두"
  );

  const Video = useSelector((state) => state.Video.video);

  //Chọn thể loại videos
  const filteredcomic = comic.comic?.slice()?.sort((a, b) => b.views - a.views);
  const searchedcomic = comic.comic
    ?.filter((item) =>
      selectedOriginalGenre === "All"
        ? item
        : selectedOriginalGenre === "Others"
          ? !dataGenreSearch.some(
            (i) =>
              i.name.toLowerCase() === item.genre2.toLowerCase() ||
              i.name.toLowerCase() === item.genre1.toLowerCase()
          )
          : item.genre1.toLowerCase() === selectedOriginalGenre.toLowerCase() ||
          item.genre2.toLowerCase() === selectedOriginalGenre.toLowerCase()
    )
    .slice()
    ?.sort((a, b) => b.views - a.views);
  //Lấy ngôn ngữ

  //Mở modal menu original by genre để chọn
  const [openOriginals, setOpenOriginals] = React.useState(false);
  const anchorRefOriginals = React.useRef(null);
  useEffect(() => {
    sethiddenSelected(() => (!language ? "All" : "모두"));
    setSelectedOriginalGenre("All");
  }, [language]);
  const handleToggleOriginals = () => {
    setOpenOriginals((prevOpen) => !prevOpen);
  };

  const handleCloseOriginals = (event) => {
    if (
      anchorRefOriginals.current &&
      anchorRefOriginals.current.contains(event.target)
    ) {
      return;
    }
    setOpenOriginals(false);
  };

  function handleListKeyDownOriginals(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenOriginals(false);
    } else if (event.key === "Escape") {
      setOpenOriginals(false);
    }
  }

  const prevOpenOriginals = React.useRef(openOriginals);
  React.useEffect(() => {
    if (prevOpenOriginals.current === true && openOriginals === false) {
      anchorRefOriginals.current.focus();
    }
    prevOpenOriginals.current = openOriginals;
  }, [openOriginals]);

  return (
    <div className="w-full min-h-[560px] bg-white">
      {/* Phần hiển thị các series truyện và video mới hạn cao */}
      <div className="w-full flex items-center justify-center">
        <div className="max-w-[1120px] 3xl:max-w-[1560px] h-full grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3 gap-x-10 gap-y-5 pb-[70px]">
          {/* Phần hiển thị nội dung new & trending originals */}
          <div className="w-full flex flex-wrap ">
            {/* Phần tiêu đề */}
            <div className="w-full px-2 py-5 flex items-center border-b">
              <div className="mr-auto">
                <span className="font-semibold text-lg hover:text-yellow-500 cursor-pointer">
                  {!language ? (
                    <span> New & Trending Originals </span>
                  ) : (
                    <span> 새로운 및 인기 오리지널 </span>
                  )}
                  <NavigateNextIcon />
                </span>
              </div>
            </div>

            {/* Phần nội dung */}
            <div className="w-full h-full">
              <ul className="w-full h-full ">
                {/* khung nội dung */}
                {filteredcomic?.slice(0, 5)?.map((item, index) => (
                  <Link
                    key={item.id}
                    to={`/originals/original/series/${item.id}`}
                  >
                    <li className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100">
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
                          {item.genre1 === item.genre2 ? (
                            <span className="text-gray-400 text-sm">
                              {!language
                                ? item.genre1
                                : dataListGenre?.filter(
                                  (itm) =>
                                    itm.name.toLowerCase() ===
                                    item.genre1.toLowerCase()
                                )[0]?.nameKorean}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">
                              {!language
                                ? item.genre1
                                : dataListGenre?.filter(
                                  (itm) =>
                                    itm.name.toLowerCase() ===
                                    item.genre1.toLowerCase()
                                )[0]?.nameKorean}
                              {`, `}
                              {!language
                                ? item.genre2
                                : dataListGenre?.filter(
                                  (itm) =>
                                    itm.name.toLowerCase() ===
                                    item.genre2.toLowerCase()
                                )[0]?.nameKorean}
                            </span>
                          )}
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

          {/* Phần hiển thị nội dung new & trending videos */}
          <div className="w-full flex flex-wrap ">
            {/* Phần tiêu đề */}
            <div className="w-full px-2 py-5 flex items-center border-b">
              <div className="mr-auto">
                <span className="font-semibold text-lg hover:text-yellow-500 cursor-pointer">
                  {!language ? (
                    <span> New & Trending Videos </span>
                  ) : (
                    <span> 새로운 및 인기 동영상 </span>
                  )}
                  <NavigateNextIcon />
                </span>
              </div>
            </div>

            {/* Phần nội dung */}
            <div className="w-full h-full">
              <ul className="w-full h-full ">
                {/* khung nội dung */}
                {Video?.Video?.slice()
                  ?.sort((a, b) => b.views - a.views)
                  ?.map((item, index) => (
                    <Link key={item.id} to={`/videos/video/series/${item.id}`}>
                      <li className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100">
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

          {/* Phần hiển thị các series truyện mới hạn cao theo thể loại */}
          <div className="w-full flex flex-wrap ">
            {/* Phần tiêu đề */}
            <div className="w-full px-2 py-5 flex items-center border-b">
              <span className="mr-auto font-semibold text-lg hover:text-yellow-500 cursor-pointer">
                {!language ? (
                  <span> ORIGINALS by Genre </span>
                ) : (
                  <span> 장르별 오리지널 </span>
                )}
                <NavigateNextIcon />
              </span>

              {/* Chọn menu thể loại originals*/}
              <div className="ml-auto flex gap-1 text-yellow-500 cursor-pointer">
                <button
                  ref={anchorRefOriginals}
                  id="originals-button"
                  aria-controls={openOriginals ? "originals-menu" : undefined}
                  aria-expanded={openOriginals ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggleOriginals}
                >
                  <span>
                    {hiddenselected} <CheckIcon />
                  </span>
                </button>
                <Popper
                  open={openOriginals}
                  anchorEl={anchorRefOriginals.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleCloseOriginals}>
                          <MenuList
                            autoFocusItem={openOriginals}
                            id="originals-menu"
                            aria-labelledby="originals-button"
                            onKeyDown={handleListKeyDownOriginals}
                          >
                            {/* Hiển thị danh sách thể loại original xếp hạng */}

                            <MenuItem onClick={handleCloseOriginals}>
                              <span
                                onClick={() => {
                                  setSelectedOriginalGenre("All");
                                  sethiddenSelected(!language ? "All" : "모두");
                                }}
                                className={`w-full h-full ${selectedOriginalGenre === "All"
                                  ? "text-yellow-500"
                                  : ""
                                  }`}
                              >
                                {!language ? (
                                  <span> All </span>
                                ) : (
                                  <span> 모두 </span>
                                )}
                              </span>
                            </MenuItem>

                            <MenuItem onClick={handleCloseOriginals}>
                              <span
                                onClick={() => {
                                  setSelectedOriginalGenre("Action");
                                  sethiddenSelected(
                                    !language ? "Action" : "액션"
                                  );
                                }}
                                className={`w-full h-full ${selectedOriginalGenre === "Action"
                                  ? "text-yellow-500"
                                  : ""
                                  }`}
                              >
                                {!language ? (
                                  <span> Action </span>
                                ) : (
                                  <span> 액션 </span>
                                )}
                              </span>
                            </MenuItem>

                            <MenuItem onClick={handleCloseOriginals}>
                              <span
                                onClick={() => {
                                  setSelectedOriginalGenre("Romance");
                                  sethiddenSelected(
                                    !language ? "Romance" : "로맨스"
                                  );
                                }}
                                className={`w-full h-full ${selectedOriginalGenre === "Romance"
                                  ? "text-yellow-500"
                                  : ""
                                  }`}
                              >
                                {!language ? (
                                  <span> Romance </span>
                                ) : (
                                  <span> 로맨스 </span>
                                )}
                              </span>
                            </MenuItem>

                            <MenuItem onClick={handleCloseOriginals}>
                              <span
                                onClick={() => {
                                  setSelectedOriginalGenre("Fantasy");
                                  sethiddenSelected(
                                    !language ? "Fantasy" : "판타지"
                                  );
                                }}
                                className={`w-full h-full ${selectedOriginalGenre === "Fantasy"
                                  ? "text-yellow-500"
                                  : ""
                                  }`}
                              >
                                {!language ? (
                                  <span> Fantasy </span>
                                ) : (
                                  <span> 판타지 </span>
                                )}
                              </span>
                            </MenuItem>

                            <MenuItem onClick={handleCloseOriginals}>
                              <span
                                onClick={() => {
                                  setSelectedOriginalGenre("Drama");
                                  sethiddenSelected(
                                    !language ? "Drama" : "드라마"
                                  );
                                }}
                                className={`w-full h-full ${selectedOriginalGenre === "Drama"
                                  ? "text-yellow-500"
                                  : ""
                                  }`}
                              >
                                {!language ? (
                                  <span> Drama </span>
                                ) : (
                                  <span> 드라마 </span>
                                )}
                              </span>
                            </MenuItem>

                            <MenuItem onClick={handleCloseOriginals}>
                              <span
                                onClick={() => {
                                  setSelectedOriginalGenre("Comedy");
                                  sethiddenSelected(!language ? "Comedy" : "코미디");
                                }}
                                className={`w-full h-full ${selectedOriginalGenre === "Comedy"
                                  ? "text-yellow-500"
                                  : ""
                                  }`}
                              >
                                {!language ? (
                                  <span> Comedy </span>
                                ) : (
                                  <span> 코미디 </span>
                                )}
                              </span>
                            </MenuItem>

                            <MenuItem onClick={handleCloseOriginals}>
                              <span
                                onClick={() => {
                                  setSelectedOriginalGenre("Thriller");
                                  sethiddenSelected(
                                    !language ? "Thriller" : "스릴러"
                                  );
                                }}
                                className={`w-full h-full ${selectedOriginalGenre === "Thriller"
                                  ? "text-yellow-500"
                                  : ""
                                  }`}
                              >
                                {!language ? (
                                  <span> Thriller </span>
                                ) : (
                                  <span> 스릴러 </span>
                                )}
                              </span>
                            </MenuItem>

                            <MenuItem onClick={handleCloseOriginals}>
                              <span
                                onClick={() => {
                                  setSelectedOriginalGenre("Slice of life");
                                  sethiddenSelected(
                                    !language ? "Slice of life" : "일상"
                                  );
                                }}
                                className={`w-full h-full ${selectedOriginalGenre === "Slice of life"
                                  ? "text-yellow-500"
                                  : ""
                                  }`}
                              >
                                {!language ? (
                                  <span> Slice of life </span>
                                ) : (
                                  <span> 일상 </span>
                                )}
                              </span>
                            </MenuItem>

                            <MenuItem onClick={handleCloseOriginals}>
                              <span
                                onClick={() => {
                                  setSelectedOriginalGenre("Slice of life");
                                  sethiddenSelected(
                                    !language ? "Slice of life" : "초자연적"
                                  );
                                }}
                                className={`w-full h-full ${selectedOriginalGenre === "Supernatural"
                                  ? "text-yellow-500"
                                  : ""
                                  }`}
                              >
                                {!language ? (
                                  <span> Supernatural </span>
                                ) : (
                                  <span> 초자연적 </span>
                                )}
                              </span>
                            </MenuItem>

                            <MenuItem onClick={handleCloseOriginals}>
                              <span
                                onClick={() => {
                                  setSelectedOriginalGenre("Sci-fi");
                                  sethiddenSelected(
                                    !language ? "Sci-fi" : "공상 과학"
                                  );
                                }}
                                className={`w-full h-full ${selectedOriginalGenre === "Sci-fi"
                                  ? "text-yellow-500"
                                  : ""
                                  }`}
                              >
                                {!language ? (
                                  <span> Sci-fi </span>
                                ) : (
                                  <span> 공상 과학 </span>
                                )}
                              </span>
                            </MenuItem>

                            <MenuItem onClick={handleCloseOriginals}>
                              <span
                                onClick={() => {
                                  setSelectedOriginalGenre("Horror");
                                  sethiddenSelected(
                                    !language ? "Horror" : "호러"
                                  );
                                }}
                                className={`w-full h-full ${selectedOriginalGenre === "Horror"
                                  ? "text-yellow-500"
                                  : ""
                                  }`}
                              >
                                {!language ? (
                                  <span> Horror </span>
                                ) : (
                                  <span> 호러 </span>
                                )}
                              </span>
                            </MenuItem>

                            <MenuItem onClick={handleCloseOriginals}>
                              <span
                                onClick={() => {
                                  setSelectedOriginalGenre("Others");
                                  sethiddenSelected(
                                    !language ? "Others" : "기타"
                                  );
                                }}
                                className={`w-full h-full ${selectedOriginalGenre === "Others"
                                  ? "text-yellow-500"
                                  : ""
                                  }`}
                              >
                                {!language ? (
                                  <span> Others </span>
                                ) : (
                                  <span> 기타 </span>
                                )}
                              </span>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>

            {/* Phần nội dung */}
            <div className="w-full h-full">
              <ul className="w-full h-full">
                {/* khung nội dung */}
                {searchedcomic?.slice(0, 5)?.map((item, index) => (
                  <Link
                    key={item.id}
                    to={`/originals/original/series/${item.id}`}
                  >
                    <li className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100">
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
                          {item.genre1 === item.genre2 ? (
                            <span className="text-gray-400 text-sm">
                              {!language
                                ? item.genre1
                                : dataListGenre?.filter(
                                  (itm) =>
                                    itm.name.toLowerCase() ===
                                    item.genre1.toLowerCase()
                                )[0]?.nameKorean}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">
                              {!language
                                ? item.genre1
                                : dataListGenre?.filter(
                                  (itm) =>
                                    itm.name.toLowerCase() ===
                                    item.genre1.toLowerCase()
                                )[0]?.nameKorean}
                              {`, `}
                              {!language
                                ? item.genre2
                                : dataListGenre?.filter(
                                  (itm) =>
                                    itm.name.toLowerCase() ===
                                    item.genre2.toLowerCase()
                                )[0]?.nameKorean}
                            </span>
                          )}

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
    </div>
  );
};

export default PopularOriginalsAndVideosPage;
