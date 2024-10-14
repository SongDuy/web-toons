import React, { useState, useEffect } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import dataGenreSearch from "../../../common/utils/datagenresearch";
const Suggestsubscribed = () => {
  const language = useSelector((state) => state.hidden.language);

  const [selectedOriginalGenre, setSelectedOriginalGenre] = useState(
    !language ? "All" : "모두"
  );
  const comic = useSelector((state) => state.comic.comic);

  //Mở modal menu original by genre để chọn
  const [openOriginals, setOpenOriginals] = useState(false);
  const anchorRefOriginals = React.useRef(null);
  const prevOpenOriginals = React.useRef(openOriginals);
  const [hiddenselected, sethiddenSelected] = useState(
    !language ? "All" : "모두"
  );

  const filteredcomic = comic.comic
    ?.slice(0, 3)
    ?.sort((a, b) => b.views - a.views);
  const searchedcomic = comic.comic
    ?.filter((item) =>
      selectedOriginalGenre === "All" || selectedOriginalGenre === "모두"
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
    .slice(0, 3)
    ?.sort((a, b) => b.views - a.views);
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

  React.useEffect(() => {
    if (prevOpenOriginals.current === true && openOriginals === false) {
      anchorRefOriginals.current.focus();
    }
    prevOpenOriginals.current = openOriginals;
  }, [openOriginals]);
  function handleListKeyDownOriginals(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenOriginals(false);
    } else if (event.key === "Escape") {
      setOpenOriginals(false);
    }
  }
  return (
    <div className="grid xs:grid-cols-1 lg:grid-cols-2 container xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px]">
      <div className=" flex-row  justify-center items-center container">
        <div className="min-w-max m-2 ">
          <span className="font-semibold text-lg text-black">
            {!language ? "New & Trending" : "새로운 및 인기 오리지널"}{" "}
            <NavigateNextIcon />
          </span>
        </div>

        <div className=" flex p-5">
          <div className="w-full h-full     ">
            {filteredcomic?.length === 0 ? (
              <div></div>
            ) : (
              <div className="grid grid-rows-3 gap-2 w-full">
                {filteredcomic?.map((item, index) => {
                  return (
                    <Link
                      key={item.id}
                      to={`/originals/original/series/${item.id}`}
                    >
                      <div className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100">
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

                          <div className="w-auto mt-auto mb-auto overflow-hidden">
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

      <div className="w-full flex-row justify-center items-center container mx-auto my-auto">
        <div className="min-w-max m-2 flex justify-between ">
          <span className="w-[200px] font-semibold text-lg text-black">
            {!language ? "ORIGINALS by Genre" : "장르별 오리지널"}{" "}
            <NavigateNextIcon />
          </span>
          {/* Chọn menu thể loại originals*/}
          <div className="ml-auto flex gap-1 text-green-500 cursor-pointer">
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
                      placement === "bottom-start" ? "left top" : "left bottom",
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
                            className={`w-full h-full ${
                              selectedOriginalGenre === "All"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {!language ? <span>All</span> : <span> 모두 </span>}
                          </span>
                        </MenuItem>

                        <MenuItem onClick={handleCloseOriginals}>
                          <span
                            onClick={() => {
                              setSelectedOriginalGenre("Action");
                              sethiddenSelected(!language ? "Action" : "액션");
                            }}
                            className={`w-full h-full ${
                              selectedOriginalGenre === "Action"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {!language ? (
                              <span>Action</span>
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
                            className={`w-full h-full ${
                              selectedOriginalGenre === "Romance"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {!language ? (
                              <span>Romance</span>
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
                            className={`w-full h-full ${
                              selectedOriginalGenre === "Fantasy"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {!language ? (
                              <span>Fantasy</span>
                            ) : (
                              <span> 판타지 </span>
                            )}
                          </span>
                        </MenuItem>

                        <MenuItem onClick={handleCloseOriginals}>
                          <span
                            onClick={() => {
                              setSelectedOriginalGenre("Drama");
                              sethiddenSelected(!language ? "Drama" : "드라마");
                            }}
                            className={`w-full h-full ${
                              selectedOriginalGenre === "Drama"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {!language ? (
                              <span>Drama</span>
                            ) : (
                              <span> 드라마 </span>
                            )}
                          </span>
                        </MenuItem>

                        <MenuItem onClick={handleCloseOriginals}>
                          <span
                            onClick={() => {
                              setSelectedOriginalGenre("Comedy");
                              sethiddenSelected(
                                !language ? "Comedy" : "코미디"
                              );
                            }}
                            className={`w-full h-full ${
                              selectedOriginalGenre === "Comedy"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {!language ? (
                              <span>Comedy</span>
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
                            className={`w-full h-full ${
                              selectedOriginalGenre === "Thriller"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {!language ? (
                              <span>Thriller</span>
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
                            className={`w-full h-full ${
                              selectedOriginalGenre === "Slice of life"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {!language ? (
                              <span>Slice of life</span>
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
                            className={`w-full h-full ${
                              selectedOriginalGenre === "Supernatural"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {!language ? (
                              <span>Supernatural</span>
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
                            className={`w-full h-full ${
                              selectedOriginalGenre === "Sci-fi"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {!language ? (
                              <span>Sci-fi</span>
                            ) : (
                              <span> 공상 과학 </span>
                            )}
                          </span>
                        </MenuItem>

                        <MenuItem onClick={handleCloseOriginals}>
                          <span
                            onClick={() => {
                              setSelectedOriginalGenre("Horror");
                              sethiddenSelected(!language ? "Horror" : "호러");
                            }}
                            className={`w-full h-full ${
                              selectedOriginalGenre === "Horror"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {!language ? (
                              <span>Horror</span>
                            ) : (
                              <span> 호러 </span>
                            )}
                          </span>
                        </MenuItem>

                        <MenuItem onClick={handleCloseOriginals}>
                          <span
                            onClick={() => {
                              setSelectedOriginalGenre("Others");
                              sethiddenSelected(!language ? "Others" : "기타");
                            }}
                            className={`w-full h-full ${
                              selectedOriginalGenre === "Others"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {!language ? (
                              <span>Others</span>
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

        <div className=" flex p-5">
          <div className="w-full h-full     ">
            {searchedcomic?.length === 0 ? (
              <div></div>
            ) : (
              <div className="grid grid-rows-3 gap-2 w-full">
                {searchedcomic?.map((item, index) => {
                  return (
                    <Link
                      key={item.id}
                      to={`/originals/original/series/${item.id}`}
                    >
                      <div className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100">
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

                          <div className="w-auto mt-auto mb-auto overflow-hidden">
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
