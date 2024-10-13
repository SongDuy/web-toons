import React, { useState, useEffect } from 'react';

import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dataListGenre from "../../../components/layout/layoutUser/dataListGenre";

const WeekdayOriginalsAndVideosPage = () => {

    const days = [{ 'day': 'Mon', 'daysInKorean': '월요일' }, { 'day': 'Tue', 'daysInKorean': '화요일' }, { 'day': 'Wed', 'daysInKorean': '수요일' }, { 'day': 'Thu', 'daysInKorean': '목요일' }, { 'day': 'Fri', 'daysInKorean': '금요일' }, { 'day': 'Sat', 'daysInKorean': '토요일' }, { 'day': 'Sun', 'daysInKorean': '일요일' }]
    const comic = useSelector(state => state.comic.comic);
    const Video = useSelector(state => state.Video.video);

    //Chọn nội dung theo thứ
    const [currentDay, setCurrentDay] = useState('');
    useEffect(() => {
        const today = new Date();
        const dayString = format(today, 'EEEE', { locale: enUS }); // Lấy ngày trong tuần dựa trên locale
        const spacedDay = dayString.slice(0, 3); // Thêm khoảng trắng sau 3 ký tự đầu tiên
        setCurrentDay(spacedDay);
    }, []);

    const handleSelectDay = (day) => {
        setCurrentDay(day);
    };
    //chọn nội dung truyện theo thứ hiện tại
    const filteredOriginals = comic.comic?.filter(data => data.schedule === currentDay);
    //chọn nội dung videos theo thứ hiện tại
    const filteredVideos = Video.Video?.filter(data => data.schedule === currentDay);

    // Mở modal menu để chọn Điều hướng đến trang truyện và videos
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }
    const prevOpen = React.useRef(open);// return focus to the button when we transitioned from !open -> open
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredOriginalItem, setHoveredOriginalItem] = useState(null);
    const [hoveredVideoItem, setHoveredVideoItem] = useState(null);

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    return (
        <div className="w-full min-h-[560px]">
            {/* Phần hiển thị nội dung theo thứ trong tuần */}
            <div className="w-full h-[60px] bg-white shadow flex items-center justify-center ">

                <ul
                    className="flex overflow-x-auto"
                >
                    {days?.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelectDay(item.day)}
                            className={`min-w-[120px] h-[60px] uppercase font-semibold text-md cursor-pointer flex items-center justify-center ${currentDay === item.day ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white' : 'bg-white text-black hover:text-yellow-500 '}`}
                        >
                            {item && (!language ? item.day : item.daysInKorean)}
                        </li>
                    ))}
                </ul>

                <div className="w-[150px] h-full flex items-center justify-center">

                    <button
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <span className='w-[120px] h-full border-l-2 pl-10 uppercase font-semibold text-md text-gray-400 hover:text-yellow-500 flex items-center justify-center'>
                            {!language ?
                                <span> More </span>
                                :
                                <span> 더보기 </span>
                            }

                            <NavigateNextIcon />
                        </span>
                    </button>

                    {/* Chọn menu */}
                    <Popper
                        className="w-[150px] rounded-lg flex items-center justify-center"
                        open={open}
                        anchorEl={anchorRef.current}
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
                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <Link to={`/originals`}>
                                                <MenuItem onClick={handleClose}>

                                                    {!language ?
                                                        <span> Originals </span>
                                                        :
                                                        <span> 오리지널 </span>
                                                    }
                                                </MenuItem>
                                            </Link>

                                            <Link to={`/videos`}>
                                                <MenuItem onClick={handleClose}>

                                                    {!language ?
                                                        <span> Videos </span>
                                                        :
                                                        <span> 비디오 </span>
                                                    }
                                                </MenuItem>
                                            </Link>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>

                </div>
            </div>
            <div className="w-full min-h-[500px] py-[30px] xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px]">
                <div className="grid grid-cols-1 gap-y-4 ">

                    {/* khung nội dung dành cho truyện */}
                    <div className="w-full h-full flex items-center justify-center">
                        <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 gap-4">
                            {/* khung nội dung */}
                            {filteredOriginals?.slice(0, 5)?.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/originals/original/series/${item.id}`}
                                    className="max-w-[210px] h-[210px]"
                                >
                                    <li
                                        onMouseEnter={() => setHoveredOriginalItem(item.id)}
                                        onMouseLeave={() => setHoveredOriginalItem(null)}
                                        className="max-w-[210px] 2xl:w-[210px] h-[210px] rounded-md bg-white relative cursor-pointer transition-shadow duration-300 hover:shadow"
                                    >

                                        <div className="w-full h-full" >
                                            <img
                                                src={item.squareThumbnail}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />

                                            {hoveredOriginalItem === item.id && (
                                                <div className="absolute inset-0 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                    <AutoStoriesIcon sx={{ fontSize: 40 }} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                            <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                <span className="text-black text-lg font-semibold text-shadow-white leading-[1.3] line-clamp-2">
                                                    {item.title}
                                                </span>
                                                <span className="h-[20px] text-black text-md text-shadow-white leading-[0.8] line-clamp-1">
                                                    {item.Author}
                                                </span>
                                            </div>

                                            <div className="w-full mb-[20px]">
                                                <span className="w-[75px] text-rose-300 rounded-full text-sm font-semibold flex items-center gap-1">
                                                    <FavoriteIcon />
                                                    {item.like}
                                                </span>
                                                <span className="w-[35px] h-[35px] mt-2 uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                    Up
                                                </span>
                                            </div>

                                            {/*Trong component React của bạn */}
                                            <div className="w-full h-[30px] mt-auto">
                                                <span className="w-full px-2 py-1 text-yellow-300 text-shadow-black text-sm font-semibold flex items-center justify-center">
                                                    {!language ? item.genre1 : dataListGenre?.filter(itm => itm.name.toLowerCase() === item.genre1.toLowerCase())[0]?.nameKorean}
                                                </span>
                                            </div>

                                        </div>

                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>

                    {/* khung nội dung dành cho videos */}
                    <div className="w-full h-full flex justify-center">
                        <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 gap-4">
                            {/* khung nội dung */}
                            {filteredVideos?.slice(0, 5)?.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/videos/video/series/${item.id}`}
                                    className="max-w-[210px] h-[210px]"
                                >
                                    <li
                                        onMouseEnter={() => setHoveredVideoItem(item.id)}
                                        onMouseLeave={() => setHoveredVideoItem(null)}
                                        className="max-w-[210px] 2xl:w-[210px] h-[210px] rounded-md bg-white cursor-pointer transition-shadow duration-300 hover:shadow"
                                    >

                                        <div className="w-full h-[120px] relative" >
                                            <img
                                                src={item.squareThumbnail}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />

                                            {hoveredVideoItem === item.id && (
                                                <div className="absolute inset-0 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                    <PlayArrowIcon sx={{ fontSize: 60 }} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-wrap items-center px-3 py-3">
                                            <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                <span className="text-black text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                                    {item.title}
                                                </span>
                                                <span className="text-black text-md text-shadow-white leading-[1.2] line-clamp-1">
                                                    {item.Author}
                                                </span>
                                            </div>

                                            {/* <div className="w-full mb-[20px]">
                                                <span className="w-[75px] text-rose-300 rounded-full px-1 text-sm font-semibold flex items-center gap-1">
                                                    <FavoriteIcon />
                                                    {item.like}
                                                </span>
                                                <span className="w-[35px] h-[35px] mt-2 uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                    Up
                                                </span>
                                            </div> */}

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
}

export default WeekdayOriginalsAndVideosPage;
