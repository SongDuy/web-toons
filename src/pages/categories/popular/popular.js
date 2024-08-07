import React from 'react';


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

const handleOriginalSeriesClick = () => {
    window.location.href = '/original/series';
};

const PopularPage = () => {
    return (
        <div>

            <div className="w-full h-full bg-white">
                <div className="w-full h-[70px] bg-white shadow flex items-center justify-center border-t">
                    <ul
                        className="flex gap-[70px]"
                    >
                        <li
                            className="h-[60px] uppercase font-semibold text-md text-black hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            NEW & TRENDING
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-md text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            ORIGINALS BY GENRE
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-md text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            VIDEOS BY GENRE
                        </li>

                    </ul>
                </div>
                <div className="mt-5">
                    <div className="w-full h-full mb-[100px]">
                        <div className="h-[70px] mx-[200px] flex items-center">
                            <span className="uppercase font-semibold text-xl">NEW & TRENDING</span>
                        </div>

                        <div className="h-full mx-[160px] gap-5 flex items-center justify-center">

                            <div className="w-1/2 h-[815px] bg-white py-1">
                                <div className="w-full h-full flex justify-center">
                                    <div className="px-[45px]">
                                        <div className="w-[500px] h-[450px] rounded-xl bg-green-500 flex items-center justify-center relative">
                                            <img
                                                src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                                alt="img"
                                                className="object-fill w-full h-full rounded-xl"
                                            />

                                            <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                                <div className="w-full h-[120px] mb-auto overflow-hidden">
                                                    <div className="w-[80px] h-[80px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2">
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
                                                <span className="w-full h-full line-clamp-6">
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
                            </div>

                            <div className="w-1/2 h-[815px] bg-white">
                                <div className="w-full h-full">
                                    <ul className="w-full h-full ">

                                        {/* khung nội dung */}
                                        {dataPopular.map(item => (
                                            <li className="w-full h-[90px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                                key={item.id}
                                                onClick={handleOriginalSeriesClick}
                                            >
                                                <div className="w-full h-full flex items-center">
                                                    <div className="w-[80px] h-[80px]">
                                                        <img
                                                            src={item.img}
                                                            alt="img"
                                                            className="object-fill w-full h-full rounded-md"
                                                        />
                                                    </div>
                                                    <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2 shadow-xl">
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
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full mb-[100px]">
                        <div className="h-[70px] mx-[200px] flex items-center">
                            <span className="uppercase font-semibold text-xl">ORIGINALS BY GENRE</span>
                        </div>

                        <div className="h-[50px] ml-[200px] mr-[150px] mb-5 bg-white flex items-center justify-center border-t border-b">
                            <ul
                                className="flex gap-10"
                            >
                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    DRAMA
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-black hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    FANTASY
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    COMEDY
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    ACTION
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    SLICE OF LIFE
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    ROMANCE
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    SUPERHERO
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >

                                    SCI-FI
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >

                                    THRILLER
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >

                                    SUPERNATURAL
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >

                                    OTHERS v
                                </li>

                            </ul>
                        </div>
                        <div className="h-full mx-[160px] gap-5 flex items-center justify-center">

                            <div className="w-1/2 h-[815px] bg-white py-1">
                                <div className="w-full h-full flex justify-center">
                                    <div className="px-[45px]">
                                        <div className="w-[500px] h-[450px] rounded-xl bg-green-500 flex items-center justify-center relative">
                                            <img
                                                src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                                alt="img"
                                                className="object-fill w-full h-full rounded-xl"
                                            />

                                            <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                                <div className="w-full h-[120px] mb-auto overflow-hidden">
                                                    <div className="w-[80px] h-[80px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2">
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
                                                <span className="w-full h-full line-clamp-6">
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
                            </div>

                            <div className="w-1/2 h-[815px] bg-white">
                                <div className="w-full h-full">
                                    <ul className="w-full h-full ">

                                        {/* khung nội dung */}
                                        {dataPopular.map(item => (
                                            <li
                                                className="w-full h-[90px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                                key={item.id}
                                                onClick={handleOriginalSeriesClick}
                                            >
                                                <div className="w-full h-full flex items-center">
                                                    <div className="w-[80px] h-[80px]">
                                                        <img
                                                            src={item.img}
                                                            alt="img"
                                                            className="object-fill w-full h-full rounded-md"
                                                        />
                                                    </div>
                                                    <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2 shadow-xl">
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
                                        ))}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full mb-[100px]">
                        <div className="h-[70px] mx-[200px] flex items-center">
                            <span className="uppercase font-semibold text-xl">VIDEOS BY GENRE</span>
                        </div>

                        <div className="h-[50px] ml-[200px] mr-[150px] mb-5 bg-white flex items-center justify-center border-t border-b">
                            <ul
                                className="flex gap-10"
                            >
                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    DRAMA
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-black hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    FANTASY
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    COMEDY
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    ACTION
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    SLICE OF LIFE
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    ROMANCE
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >
                                    SUPERHERO
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >

                                    SCI-FI
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >

                                    THRILLER
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >

                                    SUPERNATURAL
                                </li>

                                <li
                                    className="h-[60px] uppercase font-semibold text-sm text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                                >

                                    OTHERS v
                                </li>

                            </ul>
                        </div>

                        <div className="h-full mx-[160px] gap-5 flex items-center justify-center">

                            <div className="w-1/2 h-[815px] bg-white py-1">
                                <div className="w-full h-full flex justify-center">
                                    <div className="px-[45px]">
                                        <div className="w-[500px] h-[450px] rounded-xl bg-green-500 flex items-center justify-center relative">
                                            <img
                                                src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
                                                alt="img"
                                                className="object-fill w-full h-full rounded-xl"
                                            />

                                            <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                                <div className="w-full h-[120px] mb-auto overflow-hidden">
                                                    <div className="w-[80px] h-[80px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2">
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
                                                <span className="w-full h-full line-clamp-6">
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
                            </div>

                            <div className="w-1/2 h-[815px] bg-white">
                                <div className="w-full h-full">
                                    <ul className="w-full h-full ">

                                        {/* khung nội dung */}
                                        {dataPopular.map(item => (
                                            <li
                                                className="w-full h-[90px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                                key={item.id}
                                                onClick={handleOriginalSeriesClick}
                                            >
                                                <div className="w-full h-full flex items-center">
                                                    <div className="w-[80px] h-[80px]">
                                                        <img
                                                            src={item.img}
                                                            alt="img"
                                                            className="object-fill w-full h-full rounded-md"
                                                        />
                                                    </div>
                                                    <div className="w-[30px] h-[30px] bg-yellow-500 rounded-full border flex items-center justify-center mx-2 shadow-xl">
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
                                        ))}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default PopularPage;
