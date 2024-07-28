import React from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CreateOriginalPage = () => {
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

                <div className="w-full h-full px-[200px]">
                    <div className="w-full h-full py-5 flex">
                        <div className="w-3/12 h-full">

                            <div className="w-[220px] h-full">
                                <div className="w-full py-3">
                                    <span className="w-full font-semibold text-xl">
                                        Square Thumbnail
                                    </span>
                                </div>

                                <div className="w-full h-[220px] shadow-md bg-red-100 rounded border hover:border-green-500 hover:text-gray-500 flex items-center justify-center">
                                    kkk
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

                            <div className="w-[220px] h-full">
                                <div className="w-full py-3">
                                    <span className="w-full font-semibold text-xl">
                                        Vertical Thumbnail
                                    </span>
                                </div>

                                <div className="w-full h-[220px] shadow-md bg-red-100 rounded border hover:border-green-500 hover:text-gray-500 flex items-center justify-center">
                                    kkk
                                </div>

                                <div className="w-[230px] py-3">
                                    <span className="block w-full font-semibold text-sm text-gray-500">Image size must be 1080x1920.</span>
                                    <span className="block w-full font-semibold text-sm text-gray-500">Image must be less than 700KB.</span>
                                    <span className="block w-full font-semibold text-sm text-gray-500">Only JPG, JPEG, and PNG formats are allowed.</span>
                                </div>


                            </div>
                        </div>

                        <div className="w-9/12 h-full bg-blue-200 px-5">

                            <div className="w-full py-3 flex ">
                                <span className="w-full font-semibold text-xl">
                                    Genre
                                </span>

                                <span className="w-full font-semibold text-xl">
                                    Age
                                </span>
                            </div>


                            <div className="">

                            </div>

                            <div className="">

                            </div>

                            <div className="">

                            </div>

                            <div className="">

                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div >

    );
}

export default CreateOriginalPage;