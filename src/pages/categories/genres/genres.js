import React, { useState, useEffect } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dataListGenre from '../../../components/layout/layoutUser/dataListGenre';

// Sắp xếp mảng theo tên thể loại theo bảng chữ cái
dataListGenre.sort((a, b) => a.name.localeCompare(b.name));

const GenresPage = () => {
    const comic = useSelector(state => state.comic.comic);
    const [Comic, setComic] = useState([]);
    //Chọn menu cho thể loại truyện và video
    const [selectedMenuOriginalList, setSelectedMenuOriginalList] = React.useState("by Popularity"); // Originals genre list
    //Chọn nội dung truyện theo thể loại
    const [selectedOriginalsByGenre, setSelectedOriginalsByGenre] = useState('Action');


    useEffect(() => {
        const filteredOriginalsByGenre = comic.comic?.filter(data => data.genre1.toLowerCase() === selectedOriginalsByGenre.toLowerCase() || data.genre2.toLowerCase() === selectedOriginalsByGenre.toLowerCase());
        const filteredOriginalsByLikes = comic.comic?.filter(data => data.genre1.toLowerCase() === selectedOriginalsByGenre.toLowerCase() || data.genre2.toLowerCase() === selectedOriginalsByGenre.toLowerCase()).sort((a, b) => b.views - a.views);
        const filteredOriginalsByDate = comic.comic?.filter(data => data.genre1.toLowerCase() === selectedOriginalsByGenre.toLowerCase() || data.genre2.toLowerCase() === selectedOriginalsByGenre.toLowerCase()).sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
        console.log(selectedMenuOriginalList === "by Popularity" ? filteredOriginalsByGenre : selectedMenuOriginalList === "by Likes" ? filteredOriginalsByLikes : filteredOriginalsByDate)
        setComic(selectedMenuOriginalList === "by Popularity" ? filteredOriginalsByGenre : selectedMenuOriginalList === "by Likes" ? filteredOriginalsByLikes : filteredOriginalsByDate)
    }, [selectedOriginalsByGenre, comic.comic, selectedMenuOriginalList]);
    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredOriginalItem, setHoveredOriginalItem] = useState(null);

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);
    const [hiddenMenuOriginalList, sethiddenMenuOriginalList] = useState(
        !language ? "by Popularity" : "인기순"
    );
    useEffect(() => {
        sethiddenMenuOriginalList(() => (!language ? "by Popularity" : "인기순"));
        setSelectedMenuOriginalList("by Popularity");
    }, [language]);
    // Mở và đóng menu originals

    const [openOriginals, setOpenOriginals] = React.useState(false);
    const anchorRefOriginals = React.useRef(null);

    const handleToggleOriginals = () => {
        setOpenOriginals((prevOpen) => !prevOpen);
    };

    const handleCloseOriginals = (event) => {
        if (anchorRefOriginals.current && anchorRefOriginals.current.contains(event.target)) {
            return;
        }
        setOpenOriginals(false);
    };

    function handleListKeyDownOriginals(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenOriginals(false);
        } else if (event.key === 'Escape') {
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
        <div className="w-full h-full pb-10 bg-gray-100">


            <div className="w-full h-full xs:px-[16px] sm:px-[32px] md:px-[64px] lg:px-[96px] xl:px-[128px] 2xl:px-[160px] 3xl:px-[192px]">
                <div className="w-full h-full ml-auto mr-auto">

                    <div className="max-w-full h-full">

                        {/* Tiêu đề */}
                        <div className="h-[70px] border-b-2 flex items-center">
                            <span className="font-semibold text-md">
                                {!language ? <span> Originals Series </span> : <span> 오리지널 시리즈 </span>}
                            </span>
                            <span className="ml-auto text-md flex items-center justify-center gap-1">
                                <button
                                    ref={anchorRefOriginals}
                                    id="composition-button-originals"
                                    aria-controls={openOriginals ? 'composition-menu-originals' : undefined}
                                    aria-expanded={openOriginals ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggleOriginals}
                                >
                                    {hiddenMenuOriginalList}
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
                                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
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
                                                                className={`w-full h-full ${selectedMenuOriginalList === "by Popularity" ? "text-yellow-500" : ""}`}
                                                            >
                                                                {!language ? <span>by Popularity</span> : <span>인기순 </span>}
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
                                                                className={`w-full h-full ${selectedMenuOriginalList === "by Likes" ? "text-yellow-500" : ""}`}
                                                            >
                                                                {!language ? <span> by Likes </span> : <span> 좋아요순 </span>}
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
                                                                className={`w-full h-full ${selectedMenuOriginalList === "by Date" ? "text-yellow-500" : ""}`}
                                                            >
                                                                {!language ? <span> by Date </span> : <span> 날짜순 </span>}
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

                        <div className="w-full h-full py-5 flex items-center justify-center">
                            <div className="w-full h-full">
                                {/* Danh mục thể loại */}
                                <div className="w-full h-[95px] mb-5 flex items-center justify-center">
                                    <ul className="grid grid-rows-2 grid-flow-col gap-2 w-max overflow-x-auto scroll-snap-x scroll-snap-mandatory">
                                        {dataListGenre.map(genre => (
                                            <li
                                                key={genre.id}
                                                onClick={() => setSelectedOriginalsByGenre(genre.name)}
                                                className={`min-w-[112px] uppercase font-semibold shadow text-xs py-2 px-2 rounded hover:text-black cursor-pointer flex items-center justify-center ${selectedOriginalsByGenre === genre.name ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white hover:text-white' : 'bg-white text-black hover:text-yellow-500'}`}
                                            >
                                                {!language ? <span> {genre.name} </span> : <span> {genre.nameKorean} </span>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Danh mục nội dung originals theo thể loại */}
                                <div className="w-full min-h-[500px]">
                                    <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-6 gap-3">

                                        {/* khung nội dung */}
                                        {Comic?.map(item => (
                                            <Link
                                                key={item.id}
                                                to={`/originals/original/series/${item.id}`}
                                            >

                                                <li
                                                    onMouseEnter={() => setHoveredOriginalItem(item.id)}
                                                    onMouseLeave={() => setHoveredOriginalItem(null)}
                                                    className="max-w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow"
                                                >

                                                    <div className="w-full h-full" >
                                                        <img
                                                            src={item.squareThumbnail}
                                                            alt="img"
                                                            className="object-cover w-full h-full rounded-md"
                                                        />

                                                        {hoveredOriginalItem === item.id && (
                                                            <div className="absolute inset-0 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                                <AutoStoriesIcon sx={{ fontSize: 40 }} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="max-w-[230px] absolute inset-0 flex flex-wrap items-center px-3 py-3">

                                                        <div className="w-[230px] h-[65px] mb-auto overflow-hidden">
                                                            <span className="text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                                                {item.title}
                                                            </span>
                                                            <span className="text-md text-shadow-white leading-[1.2] line-clamp-1">
                                                                {item.Author}
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
                                                            {!language ?
                                                                <span className="w-full px-2 py-1 text-yellow-300 text-shadow-black text-sm font-semibold flex items-center justify-center">
                                                                    {selectedOriginalsByGenre}
                                                                </span>
                                                                :
                                                                <span className="w-full px-2 py-1 text-yellow-300 text-shadow-black text-sm font-semibold flex items-center justify-center">
                                                                    {dataListGenre.filter(item => item.name === selectedOriginalsByGenre)[0].nameKorean}
                                                                </span>
                                                            }
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
            </div>
        </div >
    );
}

export default GenresPage;
