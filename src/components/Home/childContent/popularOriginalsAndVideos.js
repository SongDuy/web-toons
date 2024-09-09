import React from 'react';

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
    const filteredcomic = comic.comic?.sort((a, b) => a.totalSubscribed - b.totalSubscribed);
    const searchedcomic = comic.comic?.sort((a, b) => a.totalSubscribed - b.totalSubscribed);

    const dataPopular = [
        { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "1", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
        { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "2", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
        { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "3", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
        { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "4", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
        { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "5", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    ];

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

    //Mở modal menu video by genre để chọn
    const [openVideos, setOpenVideos] = React.useState(false);
    const anchorRefVideos = React.useRef(null);

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
                                    {!language ?
                                        <span>
                                            New & Trending Originals
                                        </span>
                                        :
                                        <span>
                                            원본의 새로운 기능
                                        </span>
                                    }

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
                                        to={`/originals/original/series`}
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

                                                <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2">
                                                    <span className="mx-3 text-xl text-white font-bold">
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
                                                        {item.summary}
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
                                    {!language ?
                                        <span>
                                            New & Trending Videos
                                        </span>
                                        :
                                        <span>
                                            새로운 동영상
                                        </span>
                                    }

                                    <NavigateNextIcon />
                                </span>
                            </div>
                        </div>

                        {/* Phần nội dung */}
                        <div className="w-full h-full">
                            <ul className="w-full h-full ">
                                {/* khung nội dung */}
                                {dataPopular.map(item => (
                                    <Link
                                        key={item.id}
                                        to={`/videos/video/series`}
                                    >
                                        <li
                                            className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                        >
                                            <div className="w-full h-full flex items-center">
                                                <div className="w-[80px] h-[80px] flex">
                                                    <img
                                                        src={item.img}
                                                        alt="img"
                                                        className="object-fill w-full h-full rounded-md"
                                                    />
                                                </div>

                                                <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2">
                                                    <span className="mx-3 text-xl text-white font-bold">
                                                        {item.number}
                                                    </span>
                                                </div>

                                                <div className="w-[230px] mt-auto mb-auto overflow-hidden">
                                                    <span className="text-gray-400 text-sm">
                                                        {item.genre}
                                                    </span>
                                                    <span className="text-md font-semibold line-clamp-1">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-sm line-clamp-1">
                                                        {item.auth}
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
                                {!language ?
                                    <span>
                                        ORIGINALS by Genre
                                    </span>
                                    :
                                    <span>
                                        장르별 오리지널
                                    </span>
                                }

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
                                    {!language ?
                                        <span>
                                            ALL <CheckIcon />
                                        </span>
                                        :
                                        <span>
                                            모두 <CheckIcon />
                                        </span>
                                    }
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
                                                        style={{ maxHeight: 300, overflowY: 'auto' }}
                                                    >
                                                        {/* Hiển thị danh sách thể loại original */}
                                                        {dataListGenre?.map(genre => (
                                                            <MenuItem onClick={handleCloseOriginals}>{genre.name}</MenuItem>
                                                        ))}
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
                                        to={`/original/series`}
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

                                                <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2">
                                                    <span className="mx-3 text-xl text-white font-bold">
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
                                                        {item.summary}
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
                                {!language ?
                                    <span>
                                        VIDEOS by Genre
                                    </span>
                                    :
                                    <span>
                                        장르별 동영상
                                    </span>
                                }

                                <NavigateNextIcon />
                            </span>

                            {/* Chọn menu thể loại */}
                            <div className="ml-auto flex gap-1 text-yellow-500 cursor-pointer">
                                <button
                                    ref={anchorRefVideos}
                                    id="videos-button"
                                    aria-controls={openVideos ? 'videos-menu' : undefined}
                                    aria-expanded={openVideos ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggleVideos}
                                >
                                    {!language ?
                                        <span>
                                            Videos <CheckIcon />
                                        </span>
                                        :
                                        <span>
                                            비디오 <CheckIcon />
                                        </span>
                                    }
                                </button>
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
                                                        autoFocusItem={openVideos}
                                                        id="videos-menu"
                                                        aria-labelledby="videos-button"
                                                        onKeyDown={handleListKeyDownVideos}
                                                        style={{ maxHeight: 300, overflowY: 'auto' }}
                                                    >
                                                        {/* Hiển thị danh sách thể loại video */}
                                                        {dataListGenre?.map(genre => (
                                                            <MenuItem onClick={handleCloseVideos}>{genre.name}</MenuItem>
                                                        ))}
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
                                {dataPopular.map(item => (
                                    <Link
                                        key={item.id}
                                        to={`/videos/video/series`}
                                    >
                                        <li
                                            className="w-full h-[95px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                        >
                                            <div className="w-full h-full flex items-center">
                                                <div className="w-[80px] h-[80px] flex">
                                                    <img
                                                        src={item.img}
                                                        alt="img"

                                                        className="object-fill w-full h-full rounded-md"
                                                    />
                                                </div>

                                                <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2">
                                                    <span className="mx-3 text-xl text-white font-bold">
                                                        {item.number}
                                                    </span>
                                                </div>

                                                <div className="w-[230px] mt-auto mb-auto overflow-hidden">
                                                    <span className="text-gray-400 text-sm">
                                                        {item.genre}
                                                    </span>
                                                    <span className="text-md font-semibold line-clamp-1">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-sm line-clamp-1">
                                                        {item.auth}
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
