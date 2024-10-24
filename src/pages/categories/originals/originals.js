import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import CircularProgress from "@mui/material/CircularProgress";

import CheckIcon from "@mui/icons-material/Check";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import { Link } from "react-router-dom";
import { Link as ScrollLink, Element as ScrollElement } from "react-scroll";
import { useSelector } from "react-redux";
import dataListGenre from "../../../components/layout/layoutUser/dataListGenre";

const days = [
  { day: "Mon", daysInKorean: "월요일" },
  { day: "Tue", daysInKorean: "화요일" },
  { day: "Wed", daysInKorean: "수요일" },
  { day: "Thu", daysInKorean: "목요일" },
  { day: "Fri", daysInKorean: "금요일" },
  { day: "Sat", daysInKorean: "토요일" },
  { day: "Sun", daysInKorean: "일요일" },
];

const OriginalsPage = () => {
  //kích hoạt dính vào trên cùng
  const [isSticky, setIsSticky] = useState(false);
  const comic = useSelector((state) => state.comic.comic);
  const [Comics, setComics] = useState([]);
  const [loading, setloading] = useState(false);
  const language = useSelector((state) => state.hidden.language);

  //Chọn menu cho thể loại
  const [selectedMenuOriginalList, setSelectedMenuOriginalList] =
    useState("by Popularity");
  const [hiddenMenuOriginalList, sethiddenMenuOriginalList] = useState(
    !language ? "by Popularity" : "인기순"
  );

  //Lấy ngôn ngữ
  const [currentDay, setCurrentDay] = useState("");
  useEffect(() => {
    sethiddenMenuOriginalList(() => (!language ? "by Popularity" : "인기순"));
    setSelectedMenuOriginalList("by Popularity");
  }, [language]);

  useEffect(() => {

    const filteredOriginalsByGenre = comic.comic?.filter((data) => data.schedule === currentDay);
    const filteredOriginalsByLikes = comic.comic?.filter((data) => data.schedule === currentDay).sort((a, b) => b.views - a.views);
    const filteredOriginalsByDate = comic.comic?.filter((data) => data.schedule === currentDay).sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
    setComics(setSelectedMenuOriginalList === "by Popularity" ? filteredOriginalsByGenre : setSelectedMenuOriginalList === "by Likes" ? filteredOriginalsByLikes : filteredOriginalsByDate);

  }, [currentDay, comic.comic, setSelectedMenuOriginalList]);

  useEffect(() => {
    // Bắt đầu quá trình tải lại dữ liệu
    setloading(false);

    const threshold = 100; // Ngưỡng để kích hoạt dính vào trên cùng

    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Tắt loading sau một khoảng thời gian nhất định
    const loadingTimeout = setTimeout(() => {
      setloading(true); // Tắt loading sau khoảng thời gian 1000ms (1 giây)
    }, 1000); // Thay đổi thời gian tại đây nếu cần

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up sự kiện cuộn
      clearTimeout(loadingTimeout); // Clean up timeout
    };

  }, []);

  useEffect(() => {
    const today = new Date();
    const dayString = format(today, "EEEE", { locale: enUS }); // Lấy ngày trong tuần dựa trên locale
    const spacedDay = dayString.slice(0, 3); // Thêm khoảng trắng sau 3 ký tự đầu tiên
    setCurrentDay(spacedDay);
  }, []);

  const handleSelectDay = (day) => {
    setCurrentDay(day);
  };

  //Chọn nội dung theo tiêu đề
  const [selectedSection, setSelectedSection] = useState("section1");

  // Khi lia chuột hiên icon khi lia vào truyện hoặc video
  const [hoveredOngoingItem, setHoveredOngoingItem] = useState(null);
  const [hoveredCompletedItem, setHoveredCompletedItem] = useState(null);

  // Mở và đóng menu video list
  // Mở và đóng menu originals

  const [openOriginals, setOpenOriginals] = React.useState(false);
  const anchorRefOriginals = React.useRef(null);

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
    <>
      {loading ? (
        <div className="w-full h-full pb-10 bg-gray-100">
          <div
            className={`w-full h-[70px] mb-[-70px] bg-white shadow flex items-center justify-center border-t ${isSticky ? "sticky top-0 z-20" : ""}`}
          >
            <ul className="h-full flex gap-10">
              <ScrollLink to="section1" smooth={true} duration={500}>
                <li
                  onClick={() => setSelectedSection("section1")}
                  className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedSection === "section1"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-400"
                    }`}
                >
                  {!language ?
                    <span> ONGOING </span>
                    :
                    <span> 진행 중 </span>
                  }
                </li>
              </ScrollLink>

              <ScrollLink to="section2" smooth={true} duration={500}>
                <li
                  onClick={() => setSelectedSection("section2")}
                  className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedSection === "section2"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-400"
                    }`}
                >
                  {!language ?
                    <span> COMPLETED </span>
                    :
                    <span> 완성된 </span>
                  }
                </li>
              </ScrollLink>
            </ul>
          </div>

          <div className="w-full h-full xs:px-[16px] sm:px-[32px] md:px-[64px] lg:px-[96px] xl:px-[128px] 2xl:px-[160px] 3xl:px-[192px]">
            <div className="w-full h-full ml-auto mr-auto">
              {/* Truyện Ongoing Series */}
              <ScrollElement name="section1">
                <div className="max-w-full h-full pt-[70px]">
                  <div className="h-[70px] border-b-2 flex items-center">
                    <span className="font-semibold text-md">
                      {!language ? (
                        <span> Ongoing Series </span>
                      ) : (
                        <span> 진행 중인 시리즈 </span>
                      )}
                    </span>
                    <span className="ml-auto text-md flex items-center justify-center gap-1">
                      <button
                        ref={anchorRefOriginals}
                        id="composition-button-originals"
                        aria-controls={
                          openOriginals ? "composition-menu-originals" : undefined
                        }
                        aria-expanded={openOriginals ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggleOriginals}
                      >
                        <span>{hiddenMenuOriginalList}</span>
                      </button>

                      {/* Originals Menu */}
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
                                  className="bg-white rounded-lg text-black font-semibold"
                                  autoFocusItem={openOriginals}
                                  id="composition-menu-originals"
                                  aria-labelledby="composition-button-originals"
                                  onKeyDown={handleListKeyDownOriginals}
                                >
                                  <MenuItem onClick={handleCloseOriginals}>
                                    <span
                                      onClick={() => {
                                        setSelectedMenuOriginalList(
                                          "by Popularity"
                                        );
                                        sethiddenMenuOriginalList(
                                          !language ? "by Popularity" : "인기순"
                                        );
                                      }}
                                      className={`w-full h-full ${selectedMenuOriginalList === "by Popularity"
                                        ? "text-yellow-500"
                                        : ""
                                        }`}
                                    >
                                      {!language ? (
                                        "by Popularity"
                                      ) : (
                                        "인기순"
                                      )}
                                    </span>
                                  </MenuItem>

                                  <MenuItem onClick={handleCloseOriginals}>
                                    <span
                                      onClick={() => {
                                        setSelectedMenuOriginalList("by Likes");
                                        sethiddenMenuOriginalList(
                                          !language ? "by Likes" : "좋아요순"
                                        );
                                      }}
                                      className={`w-full h-full ${selectedMenuOriginalList === "by Likes"
                                        ? "text-yellow-500"
                                        : ""
                                        }`}
                                    >
                                      {!language ? (
                                        "by Likes"
                                      ) : (
                                        "좋아요순"
                                      )}
                                    </span>
                                  </MenuItem>

                                  <MenuItem onClick={handleCloseOriginals}>
                                    <span
                                      onClick={() => {
                                        setSelectedMenuOriginalList("by Date");
                                        sethiddenMenuOriginalList(
                                          !language ? "by Date" : "날짜순"
                                        );
                                      }}
                                      className={`w-full h-full ${selectedMenuOriginalList === "by Date"
                                        ? "text-yellow-500"
                                        : ""
                                        }`}
                                    >
                                      {!language ? (
                                        "by Date"
                                      ) : (
                                        "날짜순"
                                      )}
                                    </span>
                                  </MenuItem>
                                  {/* Add more menu items here */}
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>

                      <CheckIcon />
                    </span>
                  </div>

                  {/* Danh mục thứ trong tuần */}
                  <div className="h-[75px] mt-5 flex items-center justify-center">

                    <ul className="grid grid-rows-1 grid-flow-col gap-2 w-max overflow-x-auto scroll-snap-x scroll-snap-mandatory">
                      {days?.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectDay(item.day)}
                          className={`min-w-[150px] 3xl:max-w-[220px] h-[60px] uppercase shadow rounded font-semibold text-md cursor-pointer flex items-center justify-center ${currentDay === item.day
                            ? "bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white"
                            : "bg-white text-black hover:text-yellow-500"
                            }`}
                        >
                          {item && (!language ? item.day : item.daysInKorean)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full min-h-[500px] py-5 flex justify-center">
                    <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-3">
                      {/* khung nội dung */}
                      {Comics?.map((item) => (
                        <Link
                          key={item.id}
                          to={`/originals/original/series/${item.id}`}
                        >
                          <li
                            onMouseEnter={() => setHoveredOngoingItem(item.id)}
                            onMouseLeave={() => setHoveredOngoingItem(null)}
                            className="max-w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                          >
                            <div className="w-full h-full">
                              <img
                                src={item.squareThumbnail}
                                alt="img"
                                className="object-cover w-full h-full rounded-md"
                              />

                              {hoveredOngoingItem === item.id && (
                                <div className="absolute inset-0 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                  <AutoStoriesIcon sx={{ fontSize: 40 }} />
                                </div>
                              )}
                            </div>

                            <div className="max-w-[230px] absolute inset-0 flex flex-wrap items-center px-3 py-3">
                              <div className="w-[230px] h-[65px] mb-auto overflow-hidden">
                                <span className="text-black text-lg font-semibold text-shadow-white leading-[1.3] line-clamp-2">
                                  {item.title}
                                </span>
                                <span className="h-[20px] text-black text-md text-shadow-white leading-[0.8] line-clamp-1">
                                  {item.Author}
                                </span>
                              </div>

                              <div className="w-full mb-[40px]">
                                <span className="w-[75px] text-rose-300 rounded-full gap-1 text-sm font-semibold flex items-center">
                                  <FavoriteIcon />
                                  {item.like}
                                </span>
                                <div className="flex mt-2 gap-1">
                                  <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                    Up
                                  </span>

                                </div>
                              </div>

                              {/*Trong component React của bạn */}
                              <div className="w-full h-[30px]">
                                <span className="w-full px-2 py-1 text-yellow-300 text-shadow-black text-sm font-semibold flex items-center justify-center">
                                  {!language
                                    ? item.genre1
                                    : dataListGenre?.filter(
                                      (itm) =>
                                        itm.name.toLowerCase() ===
                                        item.genre1.toLowerCase()
                                    )[0]?.nameKorean}
                                </span>
                              </div>
                            </div>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollElement>

              {/* Truyện Completed Series */}
              <ScrollElement name="section2">
                <div className="w-full h-full pt-[70px]">
                  <div className="h-[70px] border-b-2 flex items-center font-semibold text-md">
                    {!language ? (
                      "Completed Series"
                    ) : (
                      "완료된 시리즈"
                    )}
                  </div>

                  <div className="w-full min-h-[500px] mt-[25px] flex justify-center">
                    <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-7 gap-3">
                      {/* khung nội dung */}
                      {comic.comic
                        ?.filter((item) => item?.Completed === true)
                        ?.map((item) => (
                          <Link
                            key={item.id}
                            to={`/originals/original/series/${item.id}`}
                          >
                            <li
                              onMouseEnter={() => setHoveredCompletedItem(item.id)}
                              onMouseLeave={() => setHoveredCompletedItem(null)}
                              className="max-w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                            >
                              <div className="w-full h-full">
                                <img
                                  src={item.squareThumbnail}
                                  alt="img"
                                  className="object-cover w-full h-full rounded-md"
                                />

                                {hoveredCompletedItem === item.id && (
                                  <div className="absolute inset-0 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                    <AutoStoriesIcon sx={{ fontSize: 40 }} />
                                  </div>
                                )}
                              </div>

                              <div className="max-w-[230px] absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                <div className="w-[230px] h-[65px] mb-auto overflow-hidden">
                                  <span className="text-black text-lg font-semibold text-shadow-white leading-[1.3] line-clamp-2">
                                    {item.title}
                                  </span>
                                  <span className="h-[20px] text-black text-md text-shadow-white leading-[0.8] line-clamp-1">
                                    {item.Author}
                                  </span>
                                </div>

                                <div className="w-full mb-[40px] mr-auto">
                                  <span className="w-[75px] text-rose-300 rounded-full gap-1 text-sm font-semibold flex items-center">
                                    <FavoriteIcon />
                                    {item.like}
                                  </span>
                                  <div className="flex mt-2 gap-1">
                                    <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-gray-300 via-white to-white text-green-500 text-xs font-semibold rounded-full flex items-center justify-center">
                                      End
                                    </span>
                                  </div>
                                </div>

                                {/*Trong component React của bạn */}
                                <div className="w-full h-[30px]">
                                  <span className="w-full px-2 py-1 text-yellow-300 text-shadow-black text-sm font-semibold flex items-center justify-center">
                                    {!language
                                      ? item.genre1
                                      : dataListGenre?.filter(
                                        (itm) =>
                                          itm.name.toLowerCase() ===
                                          item.genre1.toLowerCase()
                                      )[0]?.nameKorean}
                                  </span>
                                </div>
                              </div>
                            </li>
                          </Link>
                        ))}
                    </ul>
                  </div>
                </div>
              </ScrollElement>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[48vh] flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default OriginalsPage;
