import React from 'react';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
                                <span className="text-white bg-gray-800 pl-3 py-1 rounded-md flex items-center justify-center"><ArrowBackIosIcon /></span>
                            </div>
                            <div className="w-full ml-auto mr-auto">
                                <span className="w-full flex items-center justify-center text-white">#15</span>
                            </div>
                            <div className="ml-auto cursor-pointer">
                                <span className="text-white bg-gray-800 px-2 py-1 rounded-md flex items-center justify-center"><ArrowForwardIosIcon /></span>
                            </div>



                        </li>

                        <li className="ml-auto">
                            <div className="w-[30px] h-[30px] rounded-full bg-gray-900 flex items-center justify-center">
                                <span className=" text-white"><AddIcon /></span>
                            </div>
                        </li>

                    </ul>
                </div>

                {/* Hiển thị nội dung truyện */}
                <div className="w-full h-full bg-white">

                </div>

                {/* Hiển thị yêu thích, theo dõi */}
                <div className="w-full h-[250px] bg-green-200 flex items-center justify-center">
                    <div>
                        <div className="flex gap-3 pt-10 pb-5">
                            <span className="w-[35px] h-[35px] uppercase bg-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                Up
                            </span>
                            <span className="text-xl font-semibold flex items-center">
                                EVERY MONDAY
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-[100px] h-[35px] rounded-full bg-gray-300 flex items-center justify-center px-2 py-2">
                                lll
                            </div>
                            <div className="w-[100px] h-[35px] rounded-full bg-gray-300 flex items-center justify-center px-2 py-2">
                                kkk
                            </div>
                        </div>
                    </div>

                </div>

                {/* Hiển thị bình luận và danh sách truyện nổi bật */}
                <div className="w-full h-full">

                </div>
            </div>

            <FooterPage />
        </div>

    );
}

export default DisplayOriginalPage;
