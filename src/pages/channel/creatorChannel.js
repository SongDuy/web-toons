import React from 'react';

import Avatar from '@mui/material/Avatar';

const CreatorChannelPage = () => {
    return (
        <div className="w-full h-full pb-10 border bg-gray-100 flex items-center justify-center">
            <div className="w-[1120px] h-full">
                <div className="w-full h-full bg-white rounded-lg">
                    <div className="w-full h-[400px] bg-green-200 rounded-lg">
                        <img src="https://i.redd.it/b5jec682hfk61.jpg"
                            className="object-cover w-[1200px] h-full rounded-t-lg" alt="img"
                        />
                    </div>

                    <div className="w-full h-[180px] px-[30px] bg-white rounded-b-lg flex">
                        <div className="w-[185px] h-[185px] rounded-full border-4 mt-[-30px] flex items-center justify-center">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://taoanhdep.com/wp-content/uploads/2023/10/ai-350x265.jpg"
                                sx={{ width: 180, height: 180 }}
                            />
                        </div>

                        <div className="py-4 px-3">
                            <div className="">
                                <span className="text-[35px] font-semibold text-yellow-500 text-shadow-black">
                                    Lee Nakeum , seewater
                                </span>
                            </div>
                            <div className="px-1">
                                <span className="text-[18px] text-yellow-400 text-shadow-black">
                                    Commic, game
                                </span>
                            </div>
                            <div className="px-1 py-4 flex">
                                <span className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                                    Series Original : 2
                                </span>
                                <span className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                                    Series Video : 2
                                </span>
                                <span className="mr-5 text-[18px] font-semibold text-white text-shadow-black">
                                    Followers : 80,135
                                </span>
                            </div>
                        </div>

                        <div className="ml-auto flex items-center justify-center">
                            <button className="w-[120px] h-[50px] font-semibold text-white bg-green-400 hover:bg-green-500 rounded-xl">
                                Follow
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full flex gap-3 mt-3">
                    <div className="w-[420px] grid grid-cols-1 gap-3">
                        <div className="w-full h-[340px] px-3 py-3 bg-white rounded-lg">
                            <span className="font-semibold text-[20px] text-black">
                                Link
                            </span>
                        </div>

                        <div className="w-full h-[460px] px-3 py-3 bg-white rounded-lg">
                            <span className="font-semibold text-[20px] text-black">
                                Series Original
                            </span>
                        </div>

                        <div className="w-full h-[460px] px-3 py-3 bg-white rounded-lg">
                            <span className="font-semibold text-[20px] text-black">
                                Series Video
                            </span>
                        </div>
                    </div>

                    <div className="w-[700px] px-3 py-3 bg-white rounded-lg">
                        <div className="w-full h-[40px] border-b-2 border-bg-black">
                            <span className="font-semibold text-[20px] text-black">
                                Feed
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatorChannelPage;
