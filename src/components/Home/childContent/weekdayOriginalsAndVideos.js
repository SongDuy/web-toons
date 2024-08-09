import React, { useState, useEffect } from 'react';

import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Link } from 'react-router-dom';

const WeekdayOriginalsAndVideosPage = () => {

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const data = [
        { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Tue', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Wed', genre: "Animals", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Thu', genre: "Comedy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 5, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Fri', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
        { id: 6, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Mon', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", status: "video"},
        { id: 7, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Mon', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", status: "video"},
        { id: 8, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Historical", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
        { id: 9, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sun', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 10, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sun', genre: "School", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 11, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
        { id: 12, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
        { id: 13, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Thu', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
        { id: 14, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 15, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 16, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Thu', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
        { id: 17, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Wed', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 18, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 19, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Tue', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
        { id: 20, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 21, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 22, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
        { id: 23, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
        { id: 24, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    ];

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

    const filteredData = data.filter(data => data.dayOfWeek === currentDay);

    // Điều hướng đến trang truyện và videos
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className="w-full min-h-[560px]">
            {/* Phần hiển thị nội dung theo thứ trong tuần */}
            <div className="w-full xs:min-h-[60px] sm:h-[60px] bg-white shadow flex items-center justify-center">
                <ul
                    className="w-7/12 grid xs:grid-cols-4 sm:grid-cols-7"
                >
                    {days.map(day => (
                        <li
                            key={day}
                            onClick={() => handleSelectDay(day)}
                            className={`max-w-[120px] h-[60px] px-2 uppercase font-semibold text-md cursor-pointer flex items-center justify-center ${currentDay === day ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white' : 'bg-white text-black hover:text-yellow-500 '}`}
                        >
                            {day}
                        </li>
                    ))}

                </ul>
                <div className="w-[115px] h-full h-full flex items-center justify-center">
                    <button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <span className='w-full h-[48px] uppercase font-semibold text-md text-gray-400 hover:text-yellow-500 flex items-center justify-center'>
                            More
                            <NavigateNextIcon />
                        </span>

                    </button>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Link to={`/originals`}>
                            <MenuItem onClick={handleClose}>Originals</MenuItem>
                        </Link>

                        <Link to={`/videos`}>
                            <MenuItem onClick={handleClose}>Videos</MenuItem>
                        </Link>

                    </Menu>
                </div>
            </div>
            <div className="w-full min-h-[500px] py-[30px] flex justify-center">
                <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-4">

                    {/* khung nội dung */}
                    {filteredData.slice(0, 10).map((item) => (
                        <Link to={`/original/series`} className="max-w-[210px] h-[210px]" >
                            <li
                                className="max-w-[210px] 2xl:w-[210px] h-[210px] rounded-xl bg-white relative cursor-pointer transition-shadow duration-300 hover:shadow-xl"
                                key={item.id}
                            >

                                <div className="w-full h-full">
                                    <img
                                        src={item.img}
                                        alt="img"
                                        className="object-fill w-full h-full rounded-md"
                                    />
                                </div>

                                <div className="w-full absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                    <div className="w-full h-[65px] mb-auto overflow-hidden">
                                        <span className="text-black text-lg font-semibold leading-[1.2] line-clamp-2">
                                            {item.name}
                                        </span>
                                        <span className="text-black text-md leading-[1.2] line-clamp-1">
                                            {item.auth}
                                        </span>
                                    </div>

                                    <div className="w-full mb-[25px]">
                                        <span className="text-red-300 text-sm font-semibold flex items-center gap-1">
                                            <FavoriteIcon />
                                            {item.like}
                                        </span>
                                        <span className="w-[35px] h-[35px] mt-2 uppercase bg-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                            Up
                                        </span>
                                    </div>

                                    {/*Trong component React của bạn */}
                                    <div className="w-full h-[30px]">
                                        {item.status === "original" ? (
                                            <div className="w-full h-full shadow bg-white bg-opacity-80 rounded-md">
                                                <span className="w-full px-2 py-1 text-yellow-600 text-sm font-semibold shadow-xl flex items-center justify-center rounded-md">
                                                    {item.genre}
                                                </span>
                                            </div>
                                        ) : item.status === "video" ? (
                                            <div className="w-full h-full shadow bg-gray-300 bg-opacity-80 rounded-md">
                                                <span className="w-full px-2 py-1 text-white text-sm font-semibold shadow-xl flex items-center justify-center rounded-md">
                                                    {item.genre}
                                                </span>
                                            </div>
                                        ) : null}
                                    </div>

                                </div>

                            </li>
                        </Link>
                    ))}

                </ul>
            </div>
        </div>
    );
}

export default WeekdayOriginalsAndVideosPage;
