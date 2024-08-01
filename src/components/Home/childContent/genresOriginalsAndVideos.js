import React, { useState } from 'react';


import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Link } from 'react-router-dom';

const GenresOriginalsAndVideosPage = () => {

    const genres = ['Drama', 'Fantasy', 'Comedy', 'Action', 'Slice Of Life', 'Romance', 'Superhero', 'Sci-Fi', 'Thriller', 'Supernatural', 'Mystery', 'Sports', 'Historical', 'Heartwarming', 'Horror', 'Informative', 'School', 'Animals', 'Zombies', 'Short Story',];
    genres.sort((a, b) => a.localeCompare(b));

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

    //Chọn nội dung theo thể loại
    const [selectedGenre, setSelectedGenre] = useState('Action');
    const filteredGenreData = data.filter(data => data.genre === selectedGenre);

    return (
        <div className="w-full h-[630px]">

            <div className="w-full h-[130px] bg-gray-100 flex flex-wrap items-center justify-center">
                {/* Hiển thị tiêu đề */}
                <div className="w-full h-[60px]">
                    <ul
                        className="w-full h-full bg-gray-100"
                    >
                        <Link to={`/genres`}>
                            <li
                                className="w-full h-[60px] bg-white border-b-2 uppercase font-semibold text-lg hover:text-green-500 cursor-pointer flex items-center justify-center"
                            >
                                GENRES
                                <NavigateNextIcon />
                            </li>
                        </Link>
                    </ul>
                </div>

                {/* Hiển thị thể loại */}
                <div className="w-full h-[70px] bg-gray-100 flex items-center justify-center">
                    <ul
                        class="grid grid-cols-10 gap-x-2 gap-y-2 pt-8"
                    >
                        {/* khung nội dung */}
                        {genres.map(genre => (
                            <li
                                key={genre}
                                onClick={() => setSelectedGenre(genre)}
                                className={`uppercase font-semibold shadow rounded px-2 py-2 text-[11px] text-gray-400 hover:text-black cursor-pointer flex items-center justify-center ${selectedGenre === genre ? 'text-gray-900' : ''}`}
                            >
                                {genre}
                            </li>
                        ))}

                    </ul>
                </div>
            </div>

            {/* Hiển thị nội dung thể loại */}
            <div className="w-full h-[500px] py-[30px] flex justify-center">
                <ul className="grid grid-cols-5 gap-4">
                    {/* khung nội dung */}
                    {filteredGenreData.slice(0, 10).map((item) => (
                        <Link to={`/original/series`}>
                            <li
                                className="w-[210px] h-[210px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow-xl"
                                key={item.id}
                            >

                                <img
                                    src={item.img}
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />

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

                                    {/*Trong component React của bạn */}
                                    <div className="w-full h-[30px]">
                                        {item.status === "original" ? (
                                            <div className="w-full h-full bg-white bg-opacity-80 rounded-md">
                                                <span className="w-full px-2 py-1 text-yellow-600 text-sm font-semibold shadow-xl flex items-center justify-center">
                                                    {item.genre}
                                                </span>
                                            </div>
                                        ) : item.status === "video" ? (
                                            <div className="w-full h-full bg-gray-300 bg-opacity-80 rounded-md">
                                                <span className="w-full px-2 py-1 text-white text-sm font-semibold shadow-xl flex items-center justify-center">
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

export default GenresOriginalsAndVideosPage;