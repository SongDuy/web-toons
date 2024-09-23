import React, { useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

const PopularOriginalsAndVideosPage = () => {
    const comic = useSelector(state => state.comic.comic);
    //Chọn thể loại originals
    const [selectedOriginalGenre, setSelectedOriginalGenre] = useState("All");
    const Video = useSelector(state => state.Video.video);

    //Chọn thể loại videos
    const filteredcomic = comic.comic?.slice()?.sort((a, b) => a.totalSubscribed - b.totalSubscribed);
    const searchedcomic = comic.comic?.filter(item => selectedOriginalGenre === 'All' ? item : item.genre1 === selectedOriginalGenre || item.genre2 === selectedOriginalGenre).slice()?.sort((a, b) => a.totalSubscribed - b.totalSubscribed);
    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    //Mở modal menu original by genre để chọn
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
                                    {!language ? <span> New & Trending Originals </span> : <span> 원본의 새로운 기능 </span>}
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
                                        <li
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
                                    {!language ? <span> New & Trending Videos </span> : <span> 새로운 동영상 </span>}
                                    <NavigateNextIcon />
                                </span>
                            </div>
                        </div>

                        {/* Phần nội dung */}
                        <div className="w-full h-full">
                            <ul className="w-full h-full ">
                                {/* khung nội dung */}
                                {Video?.Video?.slice()?.sort((a, b) => a.totalSubscribed - b.totalSubscribed)?.map((item, index) => (
                                    <Link
                                        key={item.id}
                                        to={`/videos/video/series/${item.id}`}
                                        >
                                        <li
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
                                {!language ? <span> ORIGINALS by Genre </span> : <span> 장르별 오리지널 </span>}
                                <NavigateNextIcon />
                            </span>

                            {/* Chọn menu thể loại originals*/}
                            <div className="ml-auto flex gap-1 text-yellow-500 cursor-pointer">
                                <button
                                    ref={anchorRefOriginals}
                                    id="originals-button"
                                    aria-controls={openOriginals ? 'originals-menu' : undefined}
                                    aria-expanded={openOriginals ? 'true' : undefined}
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
                                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
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
                                                                onClick={() => setSelectedOriginalGenre("All")}
                                                                className={`w-full h-full ${selectedOriginalGenre === "All" ? "text-yellow-500" : ""}`}
                                                            >
                                                                All
                                                            </span>
                                                        </MenuItem>

                                                        <MenuItem onClick={handleCloseOriginals}>
                                                            <span
                                                                onClick={() => setSelectedOriginalGenre("Action")}
                                                                className={`w-full h-full ${selectedOriginalGenre === "Action" ? "text-yellow-500" : ""}`}
                                                            >
                                                                Action
                                                            </span>
                                                        </MenuItem>

                                                        <MenuItem onClick={handleCloseOriginals}>
                                                            <span
                                                                onClick={() => setSelectedOriginalGenre("Romance")}
                                                                className={`w-full h-full ${selectedOriginalGenre === "Romance" ? "text-yellow-500" : ""}`}
                                                            >
                                                                Romance
                                                            </span>
                                                        </MenuItem>

                                                        <MenuItem onClick={handleCloseOriginals}>
                                                            <span
                                                                onClick={() => setSelectedOriginalGenre("Fantasy")}
                                                                className={`w-full h-full ${selectedOriginalGenre === "Fantasy" ? "text-yellow-500" : ""}`}
                                                            >
                                                                Fantasy
                                                            </span>
                                                        </MenuItem>

                                                        <MenuItem onClick={handleCloseOriginals}>
                                                            <span
                                                                onClick={() => setSelectedOriginalGenre("Drama")}
                                                                className={`w-full h-full ${selectedOriginalGenre === "Drama" ? "text-yellow-500" : ""}`}
                                                            >
                                                                Drama
                                                            </span>
                                                        </MenuItem>

                                                        <MenuItem onClick={handleCloseOriginals}>
                                                            <span
                                                                onClick={() => setSelectedOriginalGenre("Comedy")}
                                                                className={`w-full h-full ${selectedOriginalGenre === "Comedy" ? "text-yellow-500" : ""}`}
                                                            >
                                                                Comedy
                                                            </span>
                                                        </MenuItem>

                                                        <MenuItem onClick={handleCloseOriginals}>
                                                            <span
                                                                onClick={() => setSelectedOriginalGenre("Thriller")}
                                                                className={`w-full h-full ${selectedOriginalGenre === "Thriller" ? "text-yellow-500" : ""}`}
                                                            >
                                                                Thriller
                                                            </span>
                                                        </MenuItem>

                                                        <MenuItem onClick={handleCloseOriginals}>
                                                            <span
                                                                onClick={() => setSelectedOriginalGenre("Slice of life")}
                                                                className={`w-full h-full ${selectedOriginalGenre === "Slice of life" ? "text-yellow-500" : ""}`}
                                                            >
                                                                Slice of life
                                                            </span>
                                                        </MenuItem>

                                                        <MenuItem onClick={handleCloseOriginals}>
                                                            <span
                                                                onClick={() => setSelectedOriginalGenre("Supernatural")}
                                                                className={`w-full h-full ${selectedOriginalGenre === "Supernatural" ? "text-yellow-500" : ""}`}
                                                            >
                                                                Supernatural
                                                            </span>
                                                        </MenuItem>

                                                        <MenuItem onClick={handleCloseOriginals}>
                                                            <span
                                                                onClick={() => setSelectedOriginalGenre("Sci-fi")}
                                                                className={`w-full h-full ${selectedOriginalGenre === "Sci-fi" ? "text-yellow-500" : ""}`}
                                                            >
                                                                Sci-fi
                                                            </span>
                                                        </MenuItem>

                                                        <MenuItem onClick={handleCloseOriginals}>
                                                            <span
                                                                onClick={() => setSelectedOriginalGenre("Horror")}
                                                                className={`w-full h-full ${selectedOriginalGenre === "Horror" ? "text-yellow-500" : ""}`}
                                                            >
                                                                Horror
                                                            </span>
                                                        </MenuItem>

                                                        <MenuItem onClick={handleCloseOriginals}>
                                                            <span
                                                                onClick={() => setSelectedOriginalGenre("Others")}
                                                                className={`w-full h-full ${selectedOriginalGenre === "Others" ? "text-yellow-500" : ""}`}
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

                        {/* Phần nội dung */}
                        <div className="w-full h-full">
                            <ul className="w-full h-full">
                                {/* khung nội dung */}
                                {searchedcomic?.slice(0, 5)?.map((item, index) => (
                                    <Link
                                        key={item.id}
                                        to={`/originals/original/series/${item.id}`}
                                    >
                                        <li
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
                                        </li>
                                    </Link>
                                ))}

                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        </div >
    );
}

export default PopularOriginalsAndVideosPage;
