import React from 'react';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import FooterPage from '../../layout/footer';

const DisplayOriginalPage = () => {
    return (
        <div>
            <div className="w-full h-full bg-white">
                {/* Thanh công cụ */}
                <div className="w-full h-[50px] px-5 bg-black flex items-center">
                    <ul className="w-full h-[30px] flex">

                        <li className="w-[550px] flex gap-2 items-center overflow-hidden">
                            <div className="">
                                <span className="text-white">Logo</span>


                            </div>

                            <div className="">
                                <span className="text-white line-clamp-1">
                                    Peace Restaurant
                                    <NavigateNextIcon />
                                    Episode 15
                                </span>
                            </div>
                        </li>

                        <li className="w-[150px] flex items-center justify-center mx-[125px]">
                            <div className="mr-auto cursor-pointer">
                                <span className="text-white bg-gray-800 hover:bg-gray-700 pl-3 py-1 rounded-md flex items-center justify-center">
                                    <ArrowBackIosIcon />
                                </span>
                            </div>
                            <div className="w-full ml-auto mr-auto">
                                <span className="w-full rounded-md py-1 flex items-center justify-center text-white">
                                    #15
                                </span>
                            </div>
                            <div className="ml-auto cursor-pointer">
                                <span className="text-white bg-gray-800 hover:bg-gray-700 w-[35px] py-1 rounded-md flex items-center justify-center">
                                    <ArrowForwardIosIcon />
                                </span>
                            </div>



                        </li>

                        <li className="ml-auto">
                            <div className="w-[30px] h-[30px] rounded-full bg-gray-800 flex items-center justify-center">
                                <span className=" text-white">
                                    <AddIcon />
                                </span>
                            </div>
                        </li>

                    </ul>
                </div>

                {/* Hiển thị nội dung truyện */}
                <div className="w-full h-full bg-white">

                </div>

                {/* Hiển thị yêu thích, theo dõi */}
                <div className="w-full h-[200px] bg-white flex items-center justify-center">
                    <div>
                        <div className="flex gap-3 pb-3">
                            <span className="w-[35px] h-[35px] uppercase bg-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                Up
                            </span>
                            <span className="text-xl font-semibold flex items-center">
                                EVERY MONDAY
                            </span>
                        </div>

                        <div className="flex-auto mb-3">
                            <span className="flex items-center justify-center text-yellow-800 font-semibold">
                                Creator
                            </span>
                            <span className="flex items-center justify-center text-yellow-600 text-lg font-semibold">
                                Lee Nakeum , seewater
                            </span>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-[100px] h-[35px] cursor-pointer rounded-full bg-gray-100 hover:bg-yellow-50 flex gap-1 items-center justify-center px-2 py-2">
                                <FavoriteBorderIcon />
                                9,455
                            </div>
                            <div className="w-[120px] h-[35px] cursor-pointer rounded-full bg-gray-100 hover:bg-yellow-50 flex gap-1 items-center justify-center px-2 py-2">
                                <AddIcon />
                                Subscribe
                            </div>
                        </div>
                    </div>

                </div>

                <div className="w-full h-[200px] bg-red-50 flex items-center justify-center">
                    <div className="w-[35px] h-[100px] cursor-pointer border bg-red-100 hover:shadow-md rounded-md mx-3 flex items-center justify-center">
                        <span className="ml-2 hover:text-white">
                            <ArrowBackIosIcon />
                        </span>

                    </div>

                    <ul className="flex">
                        <li className="w-[120px] h-[155px] py-2 cursor-pointer rounded-md hover:bg-gray-200 flex items-center justify-center overflow-hidden">
                            <div className="w-[100px] h-[100px] mb-auto">
                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540"
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />
                                <span className="leading-[1.2] line-clamp-2 py-1">Episode 7</span>
                            </div>
                        </li>

                        <li className="w-[120px] h-[155px] py-2 cursor-pointer rounded-md hover:bg-gray-200 flex items-center justify-center overflow-hidden">
                            <div className="w-[100px] h-[100px] mb-auto">
                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540"
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />
                                <span className="leading-[1.2] line-clamp-2 py-1">Episode 8</span>
                            </div>
                        </li>

                        <li className="w-[120px] h-[155px] py-2 cursor-pointer rounded-md hover:bg-gray-200 flex items-center justify-center overflow-hidden">
                            <div className="w-[100px] h-[100px] mb-auto">
                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540"
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />
                                <span className="leading-[1.2] line-clamp-2 py-1">Episode 9</span>
                            </div>
                        </li>

                        <li className="w-[120px] h-[155px] py-2 cursor-pointer rounded-md hover:bg-gray-200 flex items-center justify-center overflow-hidden">
                            <div className="w-[100px] h-[100px] mb-auto">
                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540"
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />
                                <span className="leading-[1.2] line-clamp-2 py-1">Episode 10</span>
                            </div>
                        </li>

                        <li className="w-[120px] h-[155px] py-2 cursor-pointer rounded-md hover:bg-gray-200 flex items-center justify-center overflow-hidden">
                            <div className="w-[100px] h-[100px] mb-auto">
                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540"
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />
                                <span className="leading-[1.2] line-clamp-2 py-1">Episode 11</span>
                            </div>
                        </li>

                        <li className="w-[120px] h-[155px] py-2 cursor-pointer rounded-md hover:bg-gray-200 flex items-center justify-center overflow-hidden">
                            <div className="w-[100px] h-[100px] mb-auto">
                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540"
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />
                                <span className="leading-[1.2] line-clamp-2 py-1">Episode 12</span>
                            </div>
                        </li>

                        <li className="w-[120px] h-[155px] py-2 cursor-pointer rounded-md hover:bg-gray-200 flex items-center justify-center overflow-hidden">
                            <div className="w-[100px] h-[100px] mb-auto">
                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540"
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />
                                <span className="leading-[1.2] line-clamp-2 py-1">Episode 13</span>
                            </div>
                        </li>

                        <li className="w-[120px] h-[155px] py-2 cursor-pointer rounded-md hover:bg-gray-200 flex items-center justify-center overflow-hidden">
                            <div className="w-[100px] h-[100px] mb-auto">
                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540"
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />
                                <span className="leading-[1.2] line-clamp-2 py-1">Episode 14</span>
                            </div>
                        </li>

                        <li className="w-[120px] h-[155px] py-2 cursor-pointer rounded-md hover:bg-gray-200 flex items-center justify-center overflow-hidden">
                            <div className="w-[100px] h-[100px] mb-auto">
                                <img
                                    src="https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540"
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />
                                <span className="leading-[1.2] line-clamp-2 py-1">Episode 15</span>
                            </div>
                        </li>
                    </ul>

                    <div className="w-[35px] h-[100px] cursor-pointer border bg-red-100 hover:shadow-md rounded-md mx-3 flex items-center justify-center">
                        <span className="hover:text-white">
                            <ArrowForwardIosIcon />
                        </span>
                    </div>
                </div>

                {/* Hiển thị bình luận và danh sách truyện nổi bật */}
                <div className="w-full h-full flex items-center justify-center ">
                    <div className="w-[1200px] h-full flex bg-white pt-5 pb-10">

                        <div className="w-8/12 h-full bg-green-300 px-2">
kkk
                        </div>

                        <div className="w-4/12 h-full bg-green-200 px-2">
kkk
                        </div>
                    </div>

                </div>
            </div>

            <FooterPage />
        </div>

    );
}

export default DisplayOriginalPage;
