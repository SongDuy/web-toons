import React, { useState, useEffect } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { Link } from 'react-router-dom';
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll';
import { useSelector } from 'react-redux';


// Danh sách thể loại
const dataListGenre = [
    { id: 1, name: "Drama", nameKorean: "드라마" },
    { id: 2, name: "Fantasy", nameKorean: "판타지" },
    { id: 3, name: "Comedy", nameKorean: "코미디" },
    { id: 4, name: "Action", nameKorean: "액션" },
    { id: 5, name: "Slice Of Life", nameKorean: "일상" },
    { id: 6, name: "Romance", nameKorean: "로맨스" },
    { id: 7, name: "Superhero", nameKorean: "슈퍼히어로" },
    { id: 8, name: "Sci-Fi", nameKorean: "SF" },
    { id: 9, name: "Thriller", nameKorean: "스릴러" },
    { id: 10, name: "Supernatural", nameKorean: "초자연" },
    { id: 11, name: "Mystery", nameKorean: "미스터리" },
    { id: 12, name: "Sports", nameKorean: "스포츠" },
    { id: 13, name: "Historical", nameKorean: "역사" },
    { id: 14, name: "Heartwarming", nameKorean: "훈훈한" },
    { id: 15, name: "Horror", nameKorean: "호러" },
    { id: 16, name: "Informative", nameKorean: "정보" },
    { id: 17, name: "School", nameKorean: "학교" },
    { id: 18, name: "Animals", nameKorean: "동물" },
    { id: 19, name: "Zombies", nameKorean: "좀비" },
    { id: 20, name: "Short Story", nameKorean: "단편" },

];

// Sắp xếp mảng theo tên thể loại theo bảng chữ cái
dataListGenre.sort((a, b) => a.name.localeCompare(b.name));

const GenresPage = () => {
    const comic = useSelector(state => state.comic.comic);

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

    //Chọn nội dung truyện theo thể loại
    const [selectedOriginalsByGenre, setSelectedOriginalsByGenre] = useState('Action');
    const filteredOriginalsByGenre = comic.comic?.filter(data => data.genre1 === selectedOriginalsByGenre || data.genre2 === selectedOriginalsByGenre);

    // Chọn nội dung videos theo thể loại
    const [selectedVideosByGenre, setSelectedVideosByGenre] = useState('Action');
    const filteredVideosByGenre = comic.comic?.filter(data => data.genre1 === selectedVideosByGenre || data.genre2 === selectedVideosByGenre);

    //Chọn nội dung theo tiêu đề
    const [selectedSection, setSelectedSection] = useState("section1");

    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredOriginalItem, setHoveredOriginalItem] = useState(null);
    const [hoveredVideoItem, setHoveredVideoItem] = useState(null);

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    // Mở và đóng modal originals genre list
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

    //Chọn menu cho thể loại
    const [selectedMenuGenreList, setSelectedMenuGenreList] = useState("by Popularity");

    return (
        <div className="w-full h-full pb-10 bg-gray-100">

            <div className={`w-full h-[70px] mb-[-70px] bg-white shadow flex items-center justify-center border-t ${isSticky ? 'sticky top-0 z-20' : ''}`}>
                <ul className="h-full flex gap-10">
                    <ScrollLink to="section1" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedSection("section1")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedSection === "section1" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            {!language ? <span> ORIGINALS </span> : <span> 원본 </span>}
                        </li>
                    </ScrollLink >

                    <ScrollLink to="section2" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedSection("section2")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedSection === "section2" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            {!language ? <span> VIDEOS </span> : <span> 비디오 </span>}
                        </li>
                    </ScrollLink >
                </ul>
            </div>

            <div className="w-full h-full ">
                <div className="max-w-[1200px] h-full ml-auto mr-auto">

                    <ScrollElement name="section1">
                        <div className="max-w-full h-full pt-[70px]">

                            {/* Tiêu đề */}
                            <div className="h-[70px] border-b-2 flex items-center">
                                <span className="font-semibold text-md">
                                    {!language ?
                                        <span>
                                            Originals Series
                                        </span>
                                        :
                                        <span>
                                            오리지널 시리즈
                                        </span>
                                    }

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
                                        {selectedMenuGenreList}
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
                                                                    onClick={() => setSelectedMenuGenreList("by Popularity")}
                                                                    className={`w-full h-full ${selectedMenuGenreList === "by Popularity" ? "text-yellow-500" : ""}`}
                                                                >
                                                                    by Popularity
                                                                </span>
                                                            </MenuItem>

                                                            <MenuItem onClick={handleClose}>
                                                                <span
                                                                    onClick={() => setSelectedMenuGenreList("by Likes")}
                                                                    className={`w-full h-full ${selectedMenuGenreList === "by Likes" ? "text-yellow-500" : ""}`}
                                                                >
                                                                    by Likes
                                                                </span>
                                                            </MenuItem>

                                                            <MenuItem onClick={handleClose}>
                                                                <span
                                                                    onClick={() => setSelectedMenuGenreList("by Date")}
                                                                    className={`w-full h-full ${selectedMenuGenreList === "by Date" ? "text-yellow-500" : ""}`}
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

                            <div className="w-full h-full py-5 flex items-center justify-center">
                                <div>
                                    {/* Danh mục thể loại */}
                                    <div className="h-[70px] mb-5 flex items-center justify-center">
                                        <ul
                                            className="grid grid-cols-10 gap-2"
                                        >
                                            {/* khung nội dung */}
                                            {dataListGenre.map(genre => (
                                                <li
                                                    key={genre.id}
                                                    onClick={() => setSelectedOriginalsByGenre(genre.name)}
                                                    className={`w-[115px] uppercase font-semibold shadow text-xs py-2 px-2 rounded hover:text-black cursor-pointer flex items-center justify-center ${selectedOriginalsByGenre === genre.name ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white hover:text-white' : 'bg-white text-black hover:text-yellow-500'}`}
                                                >
                                                    {!language ? <span> {genre.name} </span> : <span> {genre.nameKorean} </span>}
                                                </li>
                                            ))}

                                        </ul>
                                    </div>

                                    {/* Danh mục nội dung originals theo thể loại */}
                                    <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-3">

                                        {/* khung nội dung */}
                                        {filteredOriginalsByGenre?.map(item => (
                                            <Link
                                                key={item.id}
                                                to={`/originals/original/series`}
                                            >

                                                <li
                                                    onMouseEnter={() => setHoveredOriginalItem(item.id)}
                                                    onMouseLeave={() => setHoveredOriginalItem(null)}
                                                    className="max-w-[230px] 2xl:w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                                                >

                                                    <div className="w-full h-full" >
                                                        <img
                                                            src={item.squareThumbnail}
                                                            alt="img"
                                                            className="object-fill w-full h-full rounded-md"
                                                        />

                                                        {hoveredOriginalItem === item.id && (
                                                            <div className="absolute inset-0 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                                <AutoStoriesIcon sx={{ fontSize: 40 }} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">

                                                        <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                            <span className="text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                                                {item.title}
                                                            </span>
                                                            <span className="text-md text-shadow-white leading-[1.2] line-clamp-1">
                                                                {item.summary}
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
                                                            <span className="w-full px-2 py-1 text-yellow-300 text-shadow-black text-sm font-semibold flex items-center justify-center">
                                                                {selectedOriginalsByGenre}
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
                    </ScrollElement >

                    <ScrollElement name="section2" >
                        <div className="w-full h-full pt-[70px]">

                            {/* Tiêu đề */}
                            <div className="h-[70px] border-b-2 flex items-center">
                                <span className="font-semibold text-md">
                                    {!language ?
                                        <span>
                                            Videos Series
                                        </span>
                                        :
                                        <span>
                                            비디오 시리즈
                                        </span>
                                    }

                                </span>
                                <span className="ml-auto text-md flex items-center justify-center gap-1">
                                    All
                                    <CheckIcon />
                                </span>
                            </div>

                            <div className="w-full h-full mt-[25px] flex items-center justify-center">
                                <div>

                                    {/* Danh mục thể loại */}
                                    <div className="h-[70px] mb-5 flex items-center justify-center">
                                        <ul
                                            className="grid grid-cols-10 gap-2"
                                        >
                                            {/* khung nội dung */}
                                            {dataListGenre.map(genre => (
                                                <li
                                                    key={genre.id}
                                                    onClick={() => setSelectedVideosByGenre(genre.name)}
                                                    className={`w-[115px] uppercase font-semibold shadow text-xs py-2 px-2 rounded hover:text-black cursor-pointer flex items-center justify-center ${selectedVideosByGenre === genre.name ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white hover:text-white' : 'bg-white text-black hover:text-yellow-500'}`}
                                                >
                                                    {!language ? <span> {genre.name} </span> : <span> {genre.nameKorean} </span>}
                                                </li>
                                            ))}

                                        </ul>
                                    </div>

                                    {/* Danh mục nội dung videos theo thể loại */}
                                    <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-3">

                                        {/* khung nội dung */}
                                        {filteredVideosByGenre?.map(item => (
                                            <Link
                                                key={item.id}
                                                to={`/videos/video/series`}
                                            >

                                                <li
                                                    onMouseEnter={() => setHoveredVideoItem(item.id)}
                                                    onMouseLeave={() => setHoveredVideoItem(null)}
                                                    className="max-w-[230px] 2xl:w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                                                >

                                                    <div className="w-full h-full" >
                                                        <img
                                                            src={item.squareThumbnail}
                                                            alt="img"
                                                            className="object-fill w-full h-full rounded-md"
                                                        />

                                                        {hoveredVideoItem === item.id && (
                                                            <div className="absolute inset-0 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                                <PlayArrowIcon sx={{ fontSize: 60 }} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">

                                                        <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                            <span className="text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                                                {item.title}
                                                            </span>
                                                            <span className="text-md text-shadow-white leading-[1.2] line-clamp-1">
                                                                {item.summary}
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
                                                                {selectedVideosByGenre}
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
                    </ScrollElement>

                </div>
            </div>
        </div >
    );
}

export default GenresPage;
