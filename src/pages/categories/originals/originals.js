import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll';

const data = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Mon day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Tue day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Wed day', genre: "Animals", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Thu day', genre: "Comedy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Fri day', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 6, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sat day', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sun day', genre: "Heartwarming", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 8, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sun day', genre: "Heartwarming", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sun day', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 10, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Sun day', genre: "School", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 11, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 12, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 13, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Thu day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 14, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 15, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 16, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 17, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 18, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 19, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 20, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 21, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 22, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "video" },
    { id: 23, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
    { id: 24, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Mon day', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", status: "original" },
];

const days = ['Mon day', 'Tue day', 'Wed day', 'Thu day', 'Fri day', 'Sat day', 'Sun day'];

const OriginalsPage = () => {

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
        const spacedDay = dayString.slice(0, 3) + ' ' + dayString.slice(-3); // Thêm khoảng trắng sau 3 ký tự đầu tiên
        setCurrentDay(spacedDay);
    }, []);

    const handleSelectDay = (day) => {
        setCurrentDay(day);
    };

    const filteredData = data.filter(data => data.dayOfWeek === currentDay);

    //Chọn nội dung theo tiêu đề
    const [selectedTitle, setSelectedTitle] = useState("ongoing");

    return (
        <div className="w-full h-full pb-10 bg-gray-100 ">

            <div className={`w-full h-[70px] mb-[-70px] bg-white shadow flex items-center justify-center border-t ${isSticky ? 'sticky top-0 z-50' : ''}`}>
                <ul className="h-full flex gap-10">
                    <ScrollLink to="section1" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedTitle("ongoing")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedTitle === "ongoing" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            ONGOING
                        </li>
                    </ScrollLink >

                    <ScrollLink to="section2" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedTitle("completed")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedTitle === "completed" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            COMPLETED
                        </li>
                    </ScrollLink >
                </ul>
            </div>

            <div className="w-full h-full">
                <ScrollElement name="section1">
                    <div className="w-full h-full pt-[70px]">
                        <div className="h-[70px] mx-[160px] border-b-2 flex items-center">
                            <span className="font-semibold text-md">
                                Ongoing Series
                            </span>
                            <span className="ml-auto text-md flex items-center justify-center gap-1">
                                by Popularity
                                <CheckIcon />
                            </span>
                        </div>

                        <div className="h-[70px] mx-[160px] my-3 flex items-center justify-center">
                            <ul
                                className="flex gap-2"
                            >
                                {days.map(day => (
                                    <li
                                        key={day}
                                        onClick={() => handleSelectDay(day)}
                                        className={`w-[150px] h-[60px] uppercase shadow rounded-xl font-semibold text-md cursor-pointer flex items-center justify-center ${currentDay === day ? 'bg-green-500 text-white hover:text-white' : 'bg-white text-black hover:text-green-500'}`}
                                    >
                                        {day}
                                    </li>
                                ))}

                            </ul>
                        </div>

                        <div className="w-full h-full py-3 flex items-center justify-center">
                            <ul className="grid grid-cols-5 gap-2">

                                {/* khung nội dung */}
                                {filteredData.map(item => (
                                    <RouterLink to={`/original/series`}>
                                        <li
                                            className="w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow-xl"
                                            key={item.id}
                                        >

                                            <img
                                                src={item.img}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />

                                            <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">

                                                <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                    <span className="text-lg font-semibold leading-[1.2] line-clamp-2">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-md leading-[1.2] line-clamp-1">
                                                        {item.auth}
                                                    </span>
                                                </div>

                                                <div className="w-full mb-[45px] mr-auto">
                                                    <span className="rounded-full gap-1 text-red-300 text-sm font-semibold flex items-center">
                                                        <FavoriteIcon />
                                                        {item.like}
                                                    </span>
                                                    <div className="flex mt-2 gap-1">
                                                        <span className="w-[35px] h-[35px] uppercase bg-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                            Up
                                                        </span>
                                                        <span className="w-[35px] h-[35px] uppercase bg-black  text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                            New
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="w-full h-[30px] bg-white bg-opacity-80 rounded-md">
                                                    <span className="w-full px-2 py-1 text-yellow-600 text-sm font-semibold shadow-xl flex items-center justify-center">
                                                        {item.genre}
                                                    </span>
                                                </div>

                                            </div>

                                        </li>
                                    </RouterLink >
                                ))}

                            </ul>

                        </div>
                    </div>
                </ScrollElement >

                <ScrollElement name="section2" >
                    <div className="w-full h-full pt-[70px]">
                        <div className="h-[70px] mx-[160px] border-b-2 flex items-center">
                            <span className="font-semibold text-md">Completed Series</span>
                        </div>

                        <div className="w-full h-full py-5 flex items-center justify-center">

                            <ul className="grid grid-cols-5 gap-2">

                                {/* khung nội dung */}
                                {data.map(item => (
                                    <RouterLink to={`/original/series`}>
                                        <li
                                            className="w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow-xl"
                                            key={item.id}
                                        >

                                            <img
                                                src={item.img}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />

                                            <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">

                                                <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                    <span className="text-lg font-semibold leading-[1.2] line-clamp-2">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-md leading-[1.2] line-clamp-1">
                                                        {item.auth}
                                                    </span>
                                                </div>

                                                <div className="w-full mb-[45px] mr-auto">
                                                    <span className="rounded-full gap-1 text-red-300 text-sm font-semibold flex items-center">
                                                        <FavoriteIcon />
                                                        {item.like}
                                                    </span>
                                                    <div className="flex mt-2 gap-1">
                                                        <span className="w-[35px] h-[35px] uppercase bg-white text-green-500 text-xs font-semibold rounded-full flex items-center justify-center">
                                                            End
                                                        </span>

                                                    </div>
                                                </div>

                                                <div className="w-full h-[30px] bg-white bg-opacity-80 rounded-md">
                                                    <span className="w-full px-2 py-1 text-yellow-600 text-sm font-semibold shadow-xl flex items-center justify-center">
                                                        {item.genre}
                                                    </span>
                                                </div>

                                            </div>

                                        </li>
                                    </RouterLink >
                                ))}

                            </ul>

                        </div>
                    </div>
                </ScrollElement>
            </div>

        </div>
    );
}

export default OriginalsPage;
