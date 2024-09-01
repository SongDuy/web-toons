import React from 'react';

const CreatorChannelPage = () => {
    return (
        <div className="w-full h-full border bg-gray-100 flex items-center justify-center">
            <div className="w-[1120px] h-full">
                <div className="w-full h-full bg-white">
                    <div className="w-full h-[400px] bg-green-200">
                        <img src="https://i.redd.it/b5jec682hfk61.jpg"
                            className="object-cover w-[1200px] h-full rounded-t" alt="img"
                        />
                    </div>

                    <div className="w-full h-[180px] bg-green-300">

                    </div>
                </div>

                <div className="w-full h-[500px] flex gap-3 mt-3">
                    <div className="w-[400px] bg-green-200">

                    </div>

                    <div className="w-[720px] bg-red-100">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatorChannelPage;
