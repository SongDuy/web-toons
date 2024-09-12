import React, { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NorthIcon from '@mui/icons-material/North';

const dataListGenre = [
    { id: 1, name: "DRAMA", translatedName: "(드라마)" },
    { id: 2, name: "FANTASY", translatedName: "(판타지)" },
    { id: 3, name: "COMEDY", translatedName: "(코미디)" },
    { id: 4, name: "ACTION", translatedName: "(액션)" },
    { id: 5, name: "SLICE OF LIFE", translatedName: "(일상)" },
    { id: 6, name: "ROMANCE", translatedName: "(로맨스)" },
    { id: 7, name: "SUPERHERO", translatedName: "(슈퍼히어로)" },
    { id: 8, name: "SCI-FI", translatedName: "(과학)" },
    { id: 9, name: "THRILLER", translatedName: "(스릴러)" },
    { id: 10, name: "SUPERNATURAL", translatedName: "(초자연적)" },
    { id: 11, name: "MYSTERY", translatedName: "(미스터리)" },
    { id: 12, name: "SPORTS", translatedName: "(스포츠)" },
    { id: 13, name: "HISTORICAL", translatedName: "(역사)" },
    { id: 14, name: "HEARTWARMING", translatedName: "(따뜻한)" },
    { id: 15, name: "HORROR", translatedName: "(공포)" },
    { id: 16, name: "INFORMATIVE", translatedName: "(정보)" },
    { id: 17, name: "SCHOOL", translatedName: "(학교)" },
    { id: 18, name: "ANIMALS", translatedName: "(동물)" },
    { id: 19, name: "ZOMBIES", translatedName: "(좀비)" },
    { id: 20, name: "SHORT STORY", translatedName: "(단편)" }
];

// Sắp xếp mảng theo tên thể loại theo bảng chữ cái
dataListGenre.sort((a, b) => a.name.localeCompare(b.name));

const SeriesPage = ({ goToEposodes }) => {

    // thể loại 1
    const [genre1, setGenre1] = React.useState('');
    const handleChangeGenre1 = (event) => {
        setGenre1(event.target.value);
    };

    // thể loại 2
    const [genre2, setGenre2] = React.useState('');
    const handleChangeGenre2 = (event) => {
        setGenre2(event.target.value);
    };

    // Tiêu đề
    const [valueTitle, setValueTile] = useState('');
    const handleTitle = (event) => {
        const inputValueTitle = event.target.value;
        if (inputValueTitle.length <= 50) { // Giới hạn số ký tự nhập vào là 50
            setValueTile(inputValueTitle);
        }
    };

    // Mô tả
    const [valueSummary, setValueSummary] = useState('');
    const handleSummary = (event) => {
        const inputValueSummary = event.target.value;
        if (inputValueSummary.length <= 500) { // Giới hạn số ký tự nhập vào là 500
            setValueSummary(inputValueSummary);
        }
    };

    return (
        <div>

            <div className="w-full h-full bg-gray-100">

                <div className="w-full h-[70px] bg-white shadow flex items-center justify-center border-t">
                    <ul className="flex gap-10">
                        <li className="uppercase font-semibold cursor-pointer text-md flex items-center justify-center">
                            <div className="w-[40px] h-[40px] bg-green-500 rounded-full border flex items-center justify-center mx-2">
                                <span className="mx-3 text-2xl text-white font-bold">
                                    1
                                </span>
                            </div>
                            <span className="text-black">
                                SERIES
                            </span>
                        </li>
                        <li className="uppercase font-semibold text-md flex items-center justify-center">
                            <span className="text-gray-400">
                                <ArrowForwardIosIcon />
                            </span>
                        </li>
                        <li className="uppercase font-semibold cursor-pointer text-md flex items-center justify-center">
                            <div className="w-[40px] h-[40px] bg-gray-500 rounded-full border flex items-center justify-center mx-2">
                                <span className="mx-3 text-2xl text-white font-bold">
                                    2
                                </span>
                            </div>
                            <span className="text-gray-400">
                                EPISODES
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="w-full h-full px-[160px]">
                    <div className="w-full h-full py-5 flex">
                        <div className="w-[380px] h-full">

                            <div className="w-full h-full">
                                <div className="w-full py-3">
                                    <span className="w-full font-semibold text-xl">
                                        Square Thumbnail
                                    </span>
                                </div>

                                <div className="w-[350px] flex items-center justify-center">
                                    {/* Nút tải ảnh đại diện cho series truyện */}
                                    <button className="w-[200px] h-[200px] shadow border-2 bg-red-100 rounded hover:border-green-500 hover:text-gray-500 flex items-center justify-center group">
                                        <div>
                                            <span className="w-[50px] h-[50px] ml-auto mr-auto text-white bg-gray-400 rounded-full mb-3 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all">
                                                <NorthIcon />
                                            </span>
                                            <span className="block w-full font-semibold text-sm hover:text-gray-500">
                                                Select an image to upload.
                                            </span>
                                            <span className="block w-full font-semibold text-sm hover:text-gray-500">
                                                Or drag the image file here.
                                            </span>
                                        </div>
                                    </button>
                                </div>

                                <div className="w-full py-3">
                                    <span className="block w-full font-semibold text-sm text-gray-500">
                                        Image size must be 1080x1080.
                                    </span>
                                    <span className="block w-full font-semibold text-sm text-gray-500">
                                        Image must be less than 500KB.
                                    </span>

                                    <span className="block w-full font-semibold text-sm text-gray-500">
                                        Only JPG, JPEG, and PNG formats are allowed.
                                    </span>


                                </div>
                            </div>

                            <div className="w-full h-full ">
                                <div className="w-full py-3">
                                    <span className="w-full font-semibold text-xl">
                                        Horizontal Thumbnail
                                    </span>
                                </div>

                                <div className="w-[350px] shadow flex items-center justify-center">
                                    {/* Nút tải ảnh nền */}
                                    <button className="w-[350px] h-[200px] shadow-md bg-red-100 rounded border hover:border-green-500 hover:text-gray-500 flex items-center justify-center group cursor-pointer">
                                        <div>
                                            <span className="w-[50px] h-[50px] ml-auto mr-auto text-white bg-gray-400 rounded-full mb-3 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all">
                                                <NorthIcon />
                                            </span>
                                            <span className="block w-full font-semibold text-sm hover:text-gray-500">
                                                Select an image to upload.
                                            </span>
                                            <span className="block w-full font-semibold text-sm hover:text-gray-500">
                                                Or drag the image file here.
                                            </span>
                                        </div>
                                    </button>
                                </div>

                                <div className="w-full py-3">
                                    <span className="block w-full font-semibold text-sm text-gray-500">Image size must be 1920x1080.</span>
                                    <span className="block w-full font-semibold text-sm text-gray-500">Image must be less than 700KB.</span>
                                    <span className="block w-full font-semibold text-sm text-gray-500">Only JPG, JPEG, and PNG formats are allowed.</span>
                                </div>


                            </div>
                        </div>

                        <div className="w-[820px] h-full grid grid-cols-1">

                            <div className="w-full py-3 pl-5 flex">
                                <div className="w-full">
                                    <h1 className="w-full font-semibold text-xl">
                                        Genre 1
                                    </h1>

                                    <FormControl className="w-full">
                                        <Select
                                            value={genre1}
                                            onChange={handleChangeGenre1}
                                            displayEmpty
                                            className="w-full h-[40px] bg-white mt-3 rounded-md"
                                        >
                                            <MenuItem value="">
                                                Select
                                            </MenuItem>
                                            {/* khung nội dung */}
                                            {dataListGenre.map(item => (

                                                <MenuItem
                                                    key={item.id}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </div>

                                <div className="w-full ml-5">
                                    <h1 className="w-full font-semibold text-xl">
                                        Genre 2
                                    </h1>

                                    <FormControl className="w-full">
                                        <Select
                                            value={genre2}
                                            onChange={handleChangeGenre2}
                                            displayEmpty
                                            className="w-full h-[40px] bg-white mt-3 rounded-md"
                                        >
                                            <MenuItem value="">
                                                Select
                                            </MenuItem>
                                            {dataListGenre.map(item => (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>

                            </div>

                            <div className="w-full py-3 pl-5">
                                <h1 className="w-full font-semibold text-xl">
                                    Series title
                                </h1>

                                <input
                                    className="w-full h-[40px] mt-3 bg-white px-3"
                                    placeholder="Less than 50 characters"
                                    value={valueTitle}
                                    onChange={handleTitle}
                                />
                            </div>

                            <div className="w-full py-3 pl-5">
                                <h1 className="w-full font-semibold text-xl">
                                    Summary
                                </h1>

                                <textarea
                                    className="w-full h-[300px] mt-3 bg-white px-3 py-2"
                                    placeholder="Less than 500 characters"
                                    value={valueSummary}
                                    onChange={handleSummary}
                                />

                            </div>

                            <div className="w-full py-3 pl-5">
                                <h1 className="w-full font-semibold text-xl">
                                    CONTENT RATING SELF ASSESSMENT
                                </h1>

                                <div className="w-full mt-2 flex flex-wrap">
                                    <span className="w-full">
                                        All series on WEBTOON must now display a Content Rating.
                                        With visible Content Ratings, we can help users discover
                                        content that should be appropriate for their age group and
                                        align with their content preferences.
                                    </span>
                                    <span className="w-full">
                                        To ensure the appropriate Content Rating is assigned to your series,
                                        please respond to the following questionnaire regarding the content
                                        of your series. Please note that ratings are subject to change at
                                        WEBTOON's sole discretion and without prior notice.
                                        The WEBTOON Community Policy and Uploading Guidelines will remain the same. Content Rating Guide.
                                    </span>
                                </div>
                            </div>

                            <div className="w-full py-3 pl-5">
                                <ul className="">
                                    <li className="">

                                    </li>

                                    <li className="">

                                    </li>

                                    <li className="">

                                    </li>

                                    <li className="">

                                    </li>

                                    <li className="">

                                    </li>

                                    <li className="">

                                    </li>
                                </ul>
                            </div>

                            <div className="w-full py-3 pl-5">
                                <button
                                    onClick={goToEposodes}
                                    className="w-[200px] h-[50px] flex items-center justify-center pl-3 gap-5 bg-green-500 text-white text-[18px] font-semibold rounded-full"
                                >
                                    Create Series
                                    <NavigateNextIcon />
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div >

    );
}

export default SeriesPage;