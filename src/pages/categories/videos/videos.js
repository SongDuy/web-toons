import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll';

const dataOngoing = [
    { id: 1, img: "https://i.pinimg.com/736x/f9/8c/c5/f98cc52a70dea95af4677e97f984add9.jpg", dayOfWeek: 'Mon', genre: "Action", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
];

const dataCompleted = [
    { id: 1, img: "https://i.pinimg.com/736x/f9/8c/c5/f98cc52a70dea95af4677e97f984add9.jpg", dayOfWeek: 'Mon', genre: "Action", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
];

const days = [{ 'day': 'Mon', 'daysInKorean': '월요일' }, { 'day': 'Tue', 'daysInKorean': '화요일' }, { 'day': 'Wed', 'daysInKorean': '수요일' }, { 'day': 'Thu', 'daysInKorean': '목요일' }, { 'day': 'Fri', 'daysInKorean': '금요일' }, { 'day': 'Sat', 'daysInKorean': '토요일' }, { 'day': 'Sun', 'daysInKorean': '일요일' }]

const VideosPage = () => {

    //kích hoạt dính vào trên cùng
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const threshold = 100; // Ngưỡng để kích hoạt dính vào trên cùng

        const handleScroll = () => {
            if (window.scrollY > threshold) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

    const filteredData = dataOngoing.filter(data => data.dayOfWeek === currentDay);

    //Chọn nội dung theo tiêu đề
    const [selectedSection, setSelectedSection] = useState("section1");

    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredOngoingItem, setHoveredOngoingItem] = useState(null);
    const [hoveredCompletedItem, setHoveredCompletedItem] = useState(null);

    // Mở và đóng menu video list
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

    //Chọn menu cho loại
    const [selectedMenuVideoList, setSelectedMenuVideoList] = useState("by Popularity");

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    return (
        <div className="w-full h-full pb-10 bg-gray-100">

            <div className={`w-full h-[70px] mb-[-70px] bg-white shadow flex items-center justify-center border-t ${isSticky ? 'sticky top-0 z-20' : ''}`}>
                <ul className="h-full flex gap-10">
                    <ScrollLink to="section1" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedSection("section1")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedSection === "section1" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            {!language ? <span> ONGOING </span> : <span> 전진 </span>}
                        </li>
                    </ScrollLink >

                    <ScrollLink to="section2" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedSection("section2")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedSection === "section2" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            {!language ? <span> COMPLETED </span> : <span> 완전한 </span>}
                        </li>
                    </ScrollLink >
                </ul>
            </div>

            <div className="w-full h-full ">
                <div className="max-w-[1200px] h-full ml-auto mr-auto">

                    {/* Videos Ongoing Series */}
                    <ScrollElement name="section1" >
                        <div className="w-full h-full pt-[70px]">
                            <div className="h-[70px] border-b-2 flex items-center">
                                <span className="font-semibold text-md">
                                    {!language ? <span> Ongoing Series </span> : <span> 진행중인 시리즈 </span>}
                                </span>
                                <span className="ml-auto text-md flex items-center justify-center gap-1">
                                    <button
                                        ref={anchorRef}
                                        id="composition-button"
                                        aria-controls={open ? 'composition-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggle}
                                    >
                                        {selectedMenuVideoList}
                                    </button>

                                    {/* Chọn menu */}
                                    <Popper
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
                                                            className="bg-white rounded-lg text-black font-semibold "
                                                            autoFocusItem={open}
                                                            id="composition-menu"
                                                            aria-labelledby="composition-button"
                                                            onKeyDown={handleListKeyDown}
                                                        >
                                                            <MenuItem onClick={handleClose}>
                                                                <span
                                                                    onClick={() => setSelectedMenuVideoList("by Popularity")}
                                                                    className={`w-full h-full ${selectedMenuVideoList === "by Popularity" ? "text-yellow-500" : ""}`}
                                                                >
                                                                    by Popularity
                                                                </span>
                                                            </MenuItem>

                                                            <MenuItem onClick={handleClose}>
                                                                <span
                                                                    onClick={() => setSelectedMenuVideoList("by Likes")}
                                                                    className={`w-full h-full ${selectedMenuVideoList === "by Likes" ? "text-yellow-500" : ""}`}
                                                                >
                                                                    by Likes
                                                                </span>
                                                            </MenuItem>

                                                            <MenuItem onClick={handleClose}>
                                                                <span
                                                                    onClick={() => setSelectedMenuVideoList("by Date")}
                                                                    className={`w-full h-full ${selectedMenuVideoList === "by Date" ? "text-yellow-500" : ""}`}
                                                                >
                                                                    by Date
                                                                </span>
                                                            </MenuItem>

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
                            <div className="h-[70px] mt-5 flex items-center justify-center">
                                {!language ?
                                    <ul
                                        className="w-11/12 grid grid-cols-7 gap-2"
                                    >
                                        {days?.map((item, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectDay(item.day)}
                                                className={`max-w-[150px] 3xl:max-w-[220px] h-[60px] uppercase shadow rounded font-semibold text-md cursor-pointer flex items-center justify-center ${currentDay === item.day ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white' : 'bg-white text-black hover:text-yellow-500'}`}
                                            >
                                                {item.day}
                                            </li>
                                        ))}

                                    </ul>
                                    :
                                    <ul
                                        className="w-11/12 grid grid-cols-7 gap-2"
                                    >
                                        {days?.map((item, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectDay(item.day)}
                                                className={`max-w-[150px] 3xl:max-w-[220px] h-[60px] uppercase shadow rounded font-semibold text-md cursor-pointer flex items-center justify-center ${currentDay === item.day ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white' : 'bg-white text-black hover:text-yellow-500'}`}
                                            >
                                                {item.daysInKorean}
                                            </li>
                                        ))}

                                    </ul>
                                }
                            </div>

                            <div className="w-full h-full py-5 flex items-center justify-center">
                                <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-3">

                                    {/* khung nội dung */}
                                    {filteredData.map(item => (
                                        <Link
                                            key={item.id}
                                            to={`/videos/video/series`}
                                        >
                                            <li
                                                onMouseEnter={() => setHoveredOngoingItem(item.id)}
                                                onMouseLeave={() => setHoveredOngoingItem(null)}
                                                className="max-w-[230px] 2xl:w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                                            >

                                                <div className="w-full h-full" >
                                                    <img
                                                        src={item.img}
                                                        alt="img"
                                                        className="object-fill w-full h-full rounded-md"
                                                    />

                                                    {hoveredOngoingItem === item.id && (
                                                        <div className="absolute inset-0 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                            <PlayArrowIcon sx={{ fontSize: 60 }} />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">

                                                    <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                        <span className="text-lg font-semibold text-black text-shadow-white leading-[1.2] line-clamp-2">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-md text-black text-shadow-white leading-[1.2] line-clamp-1">
                                                            {item.auth}
                                                        </span>
                                                    </div>

                                                    <div className="w-full mb-[40px] mr-auto">
                                                        <span className="w-[75px] text-rose-300 rounded-full gap-1 text-sm font-semibold flex items-center">
                                                            <FavoriteIcon />
                                                            {item.like}
                                                        </span>
                                                        <div className="flex mt-2 gap-1">
                                                            <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                                Up
                                                            </span>
                                                            {/* <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-gray-500 via-black to-black  text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                                New
                                                            </span> */}
                                                        </div>
                                                    </div>

                                                    {/*Trong component React của bạn */}
                                                    <div className="w-full h-[30px]">
                                                        <span className="w-full px-2 py-1 text-white text-shadow-black text-sm font-semibold flex items-center justify-center">
                                                            {item.genre}
                                                        </span>
                                                    </div>

                                                </div>

                                            </li>
                                        </Link >
                                    ))}

                                </ul>

                            </div>
                        </div>
                    </ScrollElement >

                    {/* Videos Completed Series */}
                    <ScrollElement name="section2" >
                        <div className="w-full h-full pt-[70px]">
                            <div className="h-[70px] border-b-2 flex items-center font-semibold text-md">
                                {!language ? <span> Completed Series </span> : <span> 완성된 시리즈 </span>}
                            </div>

                            <div className="w-full h-full mt-[25px] flex items-center justify-center">

                                <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-3">

                                    {/* khung nội dung */}
                                    {dataCompleted.map(item => (
                                        <Link
                                            key={item.id}
                                            to={`/videos/video/series`}
                                        >
                                            <li
                                                onMouseEnter={() => setHoveredCompletedItem(item.id)}
                                                onMouseLeave={() => setHoveredCompletedItem(null)}
                                                className="max-w-[230px] 2xl:w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                                            >

                                                <div className="w-full h-full" >
                                                    <img
                                                        src={item.img}
                                                        alt="img"
                                                        className="object-fill w-full h-full rounded-md"
                                                    />

                                                    {hoveredCompletedItem === item.id && (
                                                        <div className="absolute inset-0 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                            <PlayArrowIcon sx={{ fontSize: 60 }} />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">

                                                    <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                        <span className="text-lg font-semibold text-black text-shadow-white leading-[1.2] line-clamp-2">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-md text-black text-shadow-white leading-[1.2] line-clamp-1">
                                                            {item.auth}
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
                                                        <span className="w-full px-2 py-1 text-white text-shadow-black text-sm font-semibold flex items-center justify-center">
                                                            {item.genre}
                                                        </span>
                                                    </div>

                                                </div>

                                            </li>
                                        </Link >
                                    ))}

                                </ul>

                            </div>
                        </div>
                    </ScrollElement>
                </div>
            </div>
        </div>
    );
}

export default VideosPage;
