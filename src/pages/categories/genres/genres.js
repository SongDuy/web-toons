import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';

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

// Danh sách thể loại
const genres = ['Drama', 'Fantasy', 'Comedy', 'Action', 'Slice Of Life', 'Romance', 'Superhero', 'Sci-Fi', 'Thriller', 'Supernatural', 'Mystery', 'Sports', 'Historical', 'Heartwarming', 'Horror', 'Informative', 'School', 'Animals', 'Zombies', 'Short Story',];
genres.sort((a, b) => a.localeCompare(b));

const GenresPage = () => {

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

    //Chọn nội dung theo thể loại
    const [selectedGenre, setSelectedGenre] = useState('Action');
    const filteredGenreData = data.filter(data => data.genre === selectedGenre);

    return (
        <div className="w-full h-full pb-10 bg-gray-100">

            <div className={`w-full min-h-[70px] border bg-white shadow flex items-center justify-center border-t ${isSticky ? 'sticky top-0 z-50' : ''}`}>
                <ul class="grid xs:grid-cols-5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-10 2xl:grid-cols-10 3xl:grid-cols-10 gap-x-4 gap-y-2">

                    {/* khung nội dung */}
                    {genres.map(genre => (
                        <li
                            key={genre}
                            onClick={() => setSelectedGenre(genre)}
                            className={`uppercase font-semibold xs:text-[7px] sm:text-[10px] md:text-[10px] lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-gray-400 hover:text-black cursor-pointer flex items-center justify-center ${selectedGenre === genre ? 'text-gray-900' : ''}`}
                        >
                            {genre}
                        </li>
                    ))}

                </ul>
            </div>

            <div className="h-full xs:px-[10px] sm:px-[20px] md:px-[30px] lg:px-[10px] xl:px-[160px] 2xl:px-[160px] 3xl:px-[160px]">
                <div className="h-[70px] border-b-2 flex items-center">
                    <span className="font-semibold text-md">
                        {selectedGenre}
                    </span>
                    <span className="ml-auto text-md flex items-center justify-center gap-1">
                        All
                        <CheckIcon />
                    </span>
                </div>

                <div className="w-full h-full py-5 flex items-center justify-center">

                    <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-5 gap-2">

                        {/* khung nội dung */}
                        {filteredGenreData.map(item => (
                            <Link to={`/video/series`}>

                                <li
                                    className="max-w-[230px] h-[230px] bg-white rounded-md relative cursor-pointer transition-shadow duration-300 hover:shadow-xl"
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

                                        <div className="w-full mb-[40px] mr-auto">
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
        </div>
    );
}

export default GenresPage;
