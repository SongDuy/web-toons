import React from 'react';
import Nav from "../../components/Account/nav";

const Dashboard = () => {
    return (
        <div>
            <Nav />
            <div className="w-full h-full border bg-gray-100 flex items-center justify-center pb-10">
                <div className="w-[1130px] ">
                    <div className="w-full h-full mt-4">
                        <div className="w-full h-full flex items-center">
                            <h1 className="font-semibold">
                                Select the original series
                            </h1>

                            <button className="w-[150px] h-[35px] text-white font-semibold bg-black ml-auto rounded-full">
                                Create Series
                            </button>
                        </div>

                        <div className="w-full h-full mt-4">
                            <ul className="grid grid-cols-2 gap-y-4">
                                <li className="w-[550px] h-[210px] bg-green-200 rounded flex">
                                    <div className="w-[210px] h-[210px] bg-red-200 rounded">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIwJC19pR5MRoGAUw2-MW4DGgiUAuNZUd1dQ&s"
                                            alt="img"
                                            className="w-full h-full object-fill rounded"
                                        />
                                    </div>

                                    <div className="h-full px-3 py-3">
                                        <div className="w-[310px] h-full">
                                            <div className="flex items-center">
                                                <span className="text-gray-500 text-xs">
                                                    Fantasy
                                                </span>

                                                <div className="flex border ml-auto gap-2">
                                                    <button className="flex items-center">
                                                        kk
                                                    </button>

                                                    <button className="flex items-center">
                                                        ll
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="w-full h-full">
                                                <h1 className="font-semibold">
                                                    kkkkk
                                                </h1>
                                            </div>
                                        </div>

                                        <div className="w-full h-full">

                                        </div>

                                        <div className="">

                                        </div>
                                    </div>
                                </li>

                                <li className="w-[550px] h-[210px] bg-green-200 rounded-xl">

                                </li>

                                <li className="w-[550px] h-[210px] bg-green-200 rounded-xl">

                                </li>

                                <li className="w-[550px] h-[210px] bg-green-200 rounded-xl">

                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full h-full mt-4">
                        <div className="w-full h-full flex items-center">
                            <h1 className="font-semibold">
                                Select the video series
                            </h1>

                            <button className="w-[150px] h-[35px] text-white font-semibold bg-black ml-auto rounded-full">
                                Create Series
                            </button>
                        </div>

                        <div className="w-full h-full mt-4">
                            <ul className="grid grid-cols-2 gap-y-4">
                                <li className="w-[550px] h-[210px] bg-green-200 rounded-xl">
                                    <div className="w-[210px] h-[210px] bg-slate-200 rounded-l-xl">

                                    </div>

                                    <div className="">

                                    </div>
                                </li>

                                <li className="w-[550px] h-[210px] bg-green-200 rounded-xl">

                                </li>

                                <li className="w-[550px] h-[210px] bg-green-200 rounded-xl">

                                </li>

                                <li className="w-[550px] h-[210px] bg-green-200 rounded-xl">

                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;
