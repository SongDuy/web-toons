import React from 'react';
import { Link } from 'react-router-dom';

const dataPopular = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "2", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "3", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "4", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "5", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "6", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 6, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "7", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "8", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 8, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "9", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", number: "10", genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater" },
];

const dataListGenre = [
    { id: 1, name: "DRAMA" },
    { id: 2, name: "FANTASY" },
    { id: 3, name: "COMEDY" },
    { id: 4, name: "ACTION" },
    { id: 5, name: "SLICE OF LIFE" },
    { id: 6, name: "ROMANCE" },
    { id: 7, name: "SUPERHERO" },
    { id: 8, name: "SCI-FI" },
    { id: 9, name: "THRILLER" },
    { id: 10, name: "SUPERNATURAL" },
    { id: 11, name: "MYSTERY" },
    { id: 12, name: "SPORTS" },
    { id: 13, name: "HISTORICAL" },
    { id: 14, name: "HEARTWARMING" },
    { id: 15, name: "HORROR" },
    { id: 16, name: "INFORMATIVE" },
    { id: 17, name: "SCHOOL" },
    { id: 18, name: "ANIMALS" },
    { id: 19, name: "ZOMBIES" },
    { id: 20, name: "SHORT STORY" },

];
// Sắp xếp mảng theo tên thể loại theo bảng chữ cái
dataListGenre.sort((a, b) => a.name.localeCompare(b.name));

const OriginalsByGenrePage = () => {
    return (
        <div className="w-full h-full pt-[70px]">

            <div className="h-[70px] flex items-center">
                <span className="uppercase font-semibold text-xl">ORIGINALS BY GENRE</span>
            </div>

            <div className="h-[70px] mb-5 bg-white flex items-center justify-center border-t border-b">
                <ul
                    class="grid grid-cols-10 gap-x-4 gap-y-2"
                >
                    {/* khung nội dung */}
                    {dataListGenre.map(item => (
                        <li
                            className="uppercase font-semibold text-sm text-gray-400 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            {item.name}
                        </li>
                    ))}

                </ul>
            </div>

            <div className="w-full flex grid grid-cols-2">

                {/* Hien thị top 1 */}
                <Link
                    to={`/original/series`}
                    className="h-[815px] bg-white py-1"
                    title="Visit"
                >
                    <div
                        className="w-[500px] h-full"
                    >

                        <div className="w-full h-full">
                            <div className="w-[500px] mr-auto h-[500px] rounded-md bg-green-500 flex items-center justify-center relative">
                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />

                                <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                    <div className="w-full h-[120px] mb-auto overflow-hidden">
                                        <div className="w-[80px] h-[80px] bg-yellow-500 rounded-xl flex items-center justify-center mx-2">
                                            <span className="mx-3 text-[60px] text-white font-bold">
                                                1
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[150px] mt-3">
                                <div className="w-full">
                                    <span className="block text-gray-400">
                                        Fantasy
                                    </span>
                                </div>


                                <div className="w-full h-[75px] overflow-hidden">
                                    <span className="text-[30px] font-semibold leading-[1.2] line-clamp-2">
                                        Monster Princess of the Snowy Mountain
                                    </span>
                                </div>

                                <div>
                                    <span className="block">
                                        Lee Nakeum , seewater
                                    </span>
                                </div>

                                <div className=" w-full h-full mt-5 overflow-hidden">
                                    <span className="w-full line-clamp-6">
                                        Valerie Beloff, a princess in exile, decides to take her
                                        own life on her 19th birthday. Abused by her own mother
                                        and exiled for her mother’s crimes, she had to live in
                                        the freezing Makleroad palace by herself, and she somehow
                                        acquired the powers of an ancient monster - the power to
                                        freeze things. Hopeless, she seeks an escape in death… only
                                        to find herself before her cruel mother, yelling at her once
                                        again. Is she dead? Is she reliving a memory? When her mother
                                        strikes her, the throbbing pain lets her know that this is neither
                                        a dream nor a memory! This series contains themes regarding child
                                        abuse that may not be suitable for all readers. Viewer discretion
                                        is advised. If you or someone you know is struggling or in crisis,
                                        please reach out for help at Crisis Text Line
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </Link>

                {/* Hien thị danh sách */}
                <div className="w-full h-[815px] bg-white">
                    <div className="w-full h-full">
                        <ul className="w-full h-full ">

                            {/* khung nội dung */}
                            {dataPopular.map(item => (
                                <Link to={`/original/series`}>
                                    <li
                                        className="w-full h-[90px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                        key={item.id}
                                    >
                                        <div className="w-full h-full flex items-center">
                                            <div className="w-[80px] h-[80px]">
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
                                            <div className="w-[450px] mt-auto mb-auto overflow-hidden">
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
    );
}

export default OriginalsByGenrePage;
