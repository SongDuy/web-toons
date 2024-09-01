import React from 'react';

import Avatar from '@mui/material/Avatar';

const MyChannelPage = () => {
    return (
        <div className="w-full h-full pb-10 border bg-gray-100 flex items-center justify-center">
            <div className="w-[1120px] h-full">
                <div className="w-full h-full bg-white rounded-lg">
                    <div className="w-full h-[400px] bg-green-200 rounded-lg">
                        <img src="https://i.redd.it/b5jec682hfk61.jpg"
                            className="object-cover w-[1200px] h-full rounded-t-lg" alt="img"
                        />
                    </div>

                    <div className="w-full h-[210px] px-[30px] bg-white rounded-b-lg">
                        <div className="w-full mt-[-30px]">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://taoanhdep.com/wp-content/uploads/2023/10/ai-350x265.jpg"
                                sx={{ width: 180, height: 180 }}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full h-full flex gap-3 mt-3">
                    <div className="w-[420px] grid grid-cols-1 gap-3">
                        <div className="w-full h-[340px] bg-white rounded-lg">

                        </div>

                        <div className="w-full h-[460px] bg-white rounded-lg">

                        </div>

                        <div className="w-full h-[460px] bg-white rounded-lg">

                        </div>
                    </div>

                    <div className="w-[700px] bg-red-100 rounded-lg">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyChannelPage;
