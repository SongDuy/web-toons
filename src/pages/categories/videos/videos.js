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
// import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll';



const VideosPage = () => {

    //kích hoạt dính vào trên cùng
    const [isSticky, setIsSticky] = useState(false);
    const Video = useSelector(state => state.Video.video);
    const [Videos, setVideos] = useState([]);
    const days = [{ 'day': 'Mon', 'daysInKorean': '월요일' }, { 'day': 'Tue', 'daysInKorean': '화요일' }, { 'day': 'Wed', 'daysInKorean': '수요일' }, { 'day': 'Thu', 'daysInKorean': '목요일' }, { 'day': 'Fri', 'daysInKorean': '금요일' }, { 'day': 'Sat', 'daysInKorean': '토요일' }, { 'day': 'Sun', 'daysInKorean': '일요일' }]
    
    //Chọn menu cho loại
    const [selectedMenuVideoList, setSelectedMenuVideoList] = useState("by Popularity");

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);
      //Chọn nội dung theo thứ
      const [currentDay, setCurrentDay] = useState('');
    useEffect(() => {
        const filteredVideosByGenre = Video.Video?.filter(data => data.schedule === currentDay);
        const filteredVideolsByLikes = Video.Video?.filter(data => data.schedule === currentDay).sort((a,b)=>b.views-a.views);
        const filteredVideosByDate = Video.Video?.filter(data => data.schedule === currentDay).sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
        setVideos(selectedMenuVideoList==="by Popularity"?filteredVideosByGenre:selectedMenuVideoList==="by Likes"?filteredVideolsByLikes:filteredVideosByDate)
    }, [currentDay, Video.Video,selectedMenuVideoList]);
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

  

    useEffect(() => {
        const today = new Date();
        const dayString = format(today, 'EEEE', { locale: enUS }); // Lấy ngày trong tuần dựa trên locale
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
    const anchorRefVideos = React.useRef(null); // New ref for video genre list
    const [openVideos, setOpenVideos] = React.useState(false); // New state for video genre list

    const handleToggleVideos = () => {
        setOpenVideos((prevOpen) => !prevOpen);
    };

    const handleCloseVideos = (event) => {
        if (anchorRefVideos.current && anchorRefVideos.current.contains(event.target)) {
            return;
        }
        setOpenVideos(false);
    };

    function handleListKeyDownVideos(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenVideos(false);
        } else if (event.key === 'Escape') {
            setOpenVideos(false);
        }
    }
    const prevOpenVideos = React.useRef(openVideos);

    React.useEffect(() => {
        if (prevOpenVideos.current === true && openVideos === false) {
            anchorRefVideos.current.focus();
        }
        prevOpenVideos.current = openVideos;
    }, [openVideos]);

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
                                   {/* Button for Video Genre List */}
                                   <button
                                        ref={anchorRefVideos}
                                        id="composition-button-videos"
                                        aria-controls={openVideos ? 'composition-menu-videos' : undefined}
                                        aria-expanded={openVideos ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggleVideos}
                                    >
                                        {selectedMenuVideoList} {/* You'll need to define `selectedMenuVideoList` state */}
                                    </button>

                                    {/* Videos Menu */}
                                    <Popper
                                        open={openVideos}
                                        anchorEl={anchorRefVideos.current}
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
                                                    <ClickAwayListener onClickAway={handleCloseVideos}>
                                                        <MenuList
                                                            className="bg-white rounded-lg text-black font-semibold"
                                                            autoFocusItem={openVideos}
                                                            id="composition-menu-videos"
                                                            aria-labelledby="composition-button-videos"
                                                            onKeyDown={handleListKeyDownVideos}
                                                        >
                   
                                                            <MenuItem onClick={handleCloseVideos}>
                                                                <span
                                                                    onClick={() => setSelectedMenuVideoList("by Popularity")}
                                                                    className={`w-full h-full ${selectedMenuVideoList === "by Popularity" ? "text-yellow-500" : ""}`}
                                                                >
                                                                    by Popularity
                                                                </span>
                                                            </MenuItem>

                                                            <MenuItem onClick={handleCloseVideos}>
                                                                <span
                                                                    onClick={() => setSelectedMenuVideoList("by Likes")}
                                                                    className={`w-full h-full ${selectedMenuVideoList === "by Likes" ? "text-yellow-500" : ""}`}
                                                                >
                                                                    by Likes
                                                                </span>
                                                            </MenuItem>

                                                            <MenuItem onClick={handleCloseVideos}>
                                                                <span
                                                                    onClick={() => setSelectedMenuVideoList("by Date")}
                                                                    className={`w-full h-full ${selectedMenuVideoList === "by Date" ? "text-yellow-500" : ""}`}
                                                                >
                                                                    by Date
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
                                    {Videos?.map(item => (
                                        <Link
                                            key={item.id}
                                            to={`/videos/video/series/${item.id}`}
                                            >
                                            <li
                                                onMouseEnter={() => setHoveredOngoingItem(item.id)}
                                                onMouseLeave={() => setHoveredOngoingItem(null)}
                                                className="max-w-[230px] 2xl:w-[230px] h-[230px] bg-white rounded-md  cursor-pointer transition-shadow duration-300 hover:shadow"
                                            >

                                                <div className="w-full h-[130px] relative" >
                                                    <img
                                                        src={item.squareThumbnail}
                                                        alt="img"
                                                        className="object-fill w-full h-full rounded-md"
                                                    />

                                                    {hoveredOngoingItem === item.id && (
                                                        <div className="absolute inset-0 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                            <PlayArrowIcon sx={{ fontSize: 60 }} />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className=" flex flex-wrap items-center px-3 py-3">

                                                    <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                        <span className="text-lg font-semibold text-black text-shadow-white leading-[1.2] line-clamp-2">
                                                            {item.title}
                                                        </span>
                                                        <span className="text-md text-black text-shadow-white leading-[1.2] line-clamp-1">
                                                            {item.Author}
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
                                    {Video.Video?.map(item => (
                                        <Link
                                            key={item.id}
                                            to={`/videos/video/series/${item.id}`}
                                            >
                                            <li
                                                onMouseEnter={() => setHoveredCompletedItem(item.id)}
                                                onMouseLeave={() => setHoveredCompletedItem(null)}
                                                className="max-w-[230px] 2xl:w-[230px] h-[230px] bg-white rounded-md cursor-pointer transition-shadow duration-300 hover:shadow"
                                            >

                                                <div className="w-full h-[130px] relative" >
                                                    <img
                                                        src={item.squareThumbnail}
                                                        alt="img"
                                                        className="object-fill w-full h-full rounded-md"
                                                    />

                                                    {hoveredCompletedItem === item.id && (
                                                        <div className="absolute inset-0 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                            <PlayArrowIcon sx={{ fontSize: 60 }} />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap items-center px-3 py-3">

                                                    <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                        <span className="text-lg font-semibold text-black text-shadow-white leading-[1.2] line-clamp-2">
                                                            {item.title}
                                                        </span>
                                                        <span className="text-md text-black text-shadow-white leading-[1.2] line-clamp-1">
                                                            {item.Author}
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
