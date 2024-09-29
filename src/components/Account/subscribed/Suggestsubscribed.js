import React, { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
const Suggestsubscribed = () => {

  const [selectedOriginalGenre, setSelectedOriginalGenre] = useState("All");
  const comic = useSelector((state) => state.comic.comic);
//Mở modal menu original by genre để chọn
const [openOriginals, setOpenOriginals] = useState(false);
const anchorRefOriginals = React.useRef(null);
const prevOpenOriginals = React.useRef(openOriginals);
  const filteredcomic = comic.comic
    ?.slice(0,3)
    ?.sort((a, b) => b.views - a.views);
  const searchedcomic = comic.comic
    ?.filter((item) =>
      selectedOriginalGenre === "All"
        ? item
        : item.genre1.toLowerCase() === selectedOriginalGenre.toLowerCase() ||
          item.genre2.toLowerCase() === selectedOriginalGenre.toLowerCase()
    )
    .slice(0,3)?.sort((a, b) => b.views - a.views);
  ;
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
          {/* Chọn menu thể loại originals*/}
          <div className="ml-auto flex gap-1 text-green-500 cursor-pointer">
                        <button
                          ref={anchorRefOriginals}
                          id="originals-button"
                          aria-controls={
                            openOriginals ? "originals-menu" : undefined
                          }
                          aria-expanded={openOriginals ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleToggleOriginals}
                        >
                          <span>
                            {selectedOriginalGenre} <CheckIcon />
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
                                <ClickAwayListener
                                  onClickAway={handleCloseOriginals}
                                >
                                  <MenuList
                                    autoFocusItem={openOriginals}
                                    id="originals-menu"
                                    aria-labelledby="originals-button"
                                    onKeyDown={handleListKeyDownOriginals}
                                  >
                                    {/* Hiển thị danh sách thể loại original xếp hạng */}

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() =>
                                          setSelectedOriginalGenre("All")
                                        }
                                        className={`w-full h-full ${
                                          selectedOriginalGenre === "All"
                                            ? "text-green-500"
                                            : ""
                                        }`}
                                      >
                                        All
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() =>
                                          setSelectedOriginalGenre("Action")
                                        }
                                        className={`w-full h-full ${
                                          selectedOriginalGenre === "Action"
                                            ? "text-green-500"
                                            : ""
                                        }`}
                                      >
                                        Action
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() =>
                                          setSelectedOriginalGenre("Romance")
                                        }
                                        className={`w-full h-full ${
                                          selectedOriginalGenre === "Romance"
                                            ? "text-green-500"
                                            : ""
                                        }`}
                                      >
                                        Romance
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() =>
                                          setSelectedOriginalGenre("Fantasy")
                                        }
                                        className={`w-full h-full ${
                                          selectedOriginalGenre === "Fantasy"
                                            ? "text-green-500"
                                            : ""
                                        }`}
                                      >
                                        Fantasy
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() =>
                                          setSelectedOriginalGenre("Drama")
                                        }
                                        className={`w-full h-full ${
                                          selectedOriginalGenre === "Drama"
                                            ? "text-green-500"
                                            : ""
                                        }`}
                                      >
                                        Drama
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() =>
                                          setSelectedOriginalGenre("Comedy")
                                        }
                                        className={`w-full h-full ${
                                          selectedOriginalGenre === "Comedy"
                                            ? "text-green-500"
                                            : ""
                                        }`}
                                      >
                                        Comedy
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() =>
                                          setSelectedOriginalGenre("Thriller")
                                        }
                                        className={`w-full h-full ${
                                          selectedOriginalGenre === "Thriller"
                                            ? "text-green-500"
                                            : ""
                                        }`}
                                      >
                                        Thriller
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() =>
                                          setSelectedOriginalGenre(
                                            "Slice of life"
                                          )
                                        }
                                        className={`w-full h-full ${
                                          selectedOriginalGenre ===
                                          "Slice of life"
                                            ? "text-green-500"
                                            : ""
                                        }`}
                                      >
                                        Slice of life
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() =>
                                          setSelectedOriginalGenre(
                                            "Supernatural"
                                          )
                                        }
                                        className={`w-full h-full ${
                                          selectedOriginalGenre ===
                                          "Supernatural"
                                            ? "text-green-500"
                                            : ""
                                        }`}
                                      >
                                        Supernatural
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() =>
                                          setSelectedOriginalGenre("Sci-fi")
                                        }
                                        className={`w-full h-full ${
                                          selectedOriginalGenre === "Sci-fi"
                                            ? "text-green-500"
                                            : ""
                                        }`}
                                      >
                                        Sci-fi
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() =>
                                          setSelectedOriginalGenre("Horror")
                                        }
                                        className={`w-full h-full ${
                                          selectedOriginalGenre === "Horror"
                                            ? "text-green-500"
                                            : ""
                                        }`}
                                      >
                                        Horror
                                      </span>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseOriginals}>
                                      <span
                                        onClick={() =>
                                          setSelectedOriginalGenre("Others")
                                        }
                                        className={`w-full h-full ${
                                          selectedOriginalGenre === "Others"
                                            ? "text-green-500"
                                            : ""
                                        }`}
                                      >
                                        Others
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
