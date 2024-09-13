import React from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NorthIcon from '@mui/icons-material/North';

const EpisodesPage = ({ goToPreviousStep }) => {

    return (
        <div>

            <div className="w-full h-full bg-gray-100">

                <div className="w-full h-[70px] bg-white shadow flex items-center justify-center border-t">
                    <ul className="flex gap-10">
                        <li onClick={goToPreviousStep} className="uppercase font-semibold cursor-pointer text-md flex items-center justify-center">
                            <div className="w-[40px] h-[40px] bg-gray-500 rounded-full border flex items-center justify-center mx-2">
                                <span className="mx-3 text-2xl text-white font-bold">
                                    1
                                </span>
                            </div>
                            <span className="text-gray-400">
                                SERIES
                            </span>
                        </li>
                        <li className="uppercase font-semibold text-md flex items-center justify-center">
                            <span className="text-gray-400">
                                <ArrowForwardIosIcon />
                            </span>
                        </li>
                        <li className="uppercase font-semibold cursor-pointer text-md flex items-center justify-center">
                            <div className="w-[40px] h-[40px] bg-green-500 rounded-full border flex items-center justify-center mx-2">
                                <span className="mx-3 text-2xl text-white font-bold">
                                    2
                                </span>
                            </div>
                            <span className="text-black">
                                EPISODES
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="w-full h-full px-[200px]">
                    <div className="w-full h-full py-5 flex">
                        <div className="w-3/12 h-full">

                            <div className="w-[220px] h-full">
                                <div className="w-full py-3">
                                    <span className="w-full font-semibold text-xl">
                                        Thumbnail
                                    </span>
                                </div>

                                <button className="w-full h-[220px] shadow bg-red-50 rounded hover:border-green-500 hover:text-gray-500 flex items-center justify-center group">
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

                                <div className="w-full py-3">
                                    <span className="block w-full font-semibold text-sm text-gray-500">
                                        Recommended size is 160x151.
                                    </span>
                                    <span className="block w-full font-semibold text-sm text-gray-500">
                                        Image must be less than 500kb.
                                    </span>

                                    <span className="block w-full font-semibold text-sm text-gray-500">
                                        Only JPG, JPEG, and PNG
                                        formats are allowed. File name
                                        can only be in English letters
                                        and numbers.
                                    </span>


                                </div>
                            </div>
                        </div>

                        <div className="w-9/12 h-full ">

                            <div className="w-full py-3 pl-5 grid grid-cols-1 gap-5">
                                <div className="w-full flex items-center gap-2">
                                    <h1 className="font-semibold text-xl flex items-center">
                                        Series title :
                                    </h1>

                                    <span className="font-semibold text-xl flex items-center">
                                        kkkk
                                    </span>
                                </div>

                                <div className="w-full">
                                    <span className="w-full font-semibold text-xl">
                                        Episode title
                                    </span>
                                    <div className="flex mt-3">
                                        <button className="w-[90px] h-[40px] border-2 bg-white flex items-center justify-center">
                                            1
                                        </button>
                                        <input
                                            className="w-full h-[40px] px-2 border-r-2 border-t-2 border-b-2 outline-none bg-white"
                                        />

                                    </div>
                                </div>

                                <div className="w-full">

                                </div>

                                <div className="w-full">

                                </div>

                                <div className="w-full">

                                </div>
                            </div>

                            <div className="w-[300px] py-3 pl-5">
                                <button className="w-[200px] h-[50px] bg-black text-white rounded-full shadow font-semibold py-2 px-4">
                                    Publish episode
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div >

    );
}

export default EpisodesPage;