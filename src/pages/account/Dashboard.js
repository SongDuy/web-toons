import React from 'react';
import Nav from "../../components/Account/nav";

const Dashboard = () => {
    return (
        <div>
            <Nav />
            <div className="w-full h-full border bg-gray-100 flex items-center justify-center">
                <div className="w-[1130px] ">
                    <div className="w-full h-full mt-4">
                        <div className="w-full h-full flex">
                            <h1 className="font-semibold">
                                Select the original series
                            </h1>

                            <button className="w-[150px] h-[35px] text-white font-semibold bg-black ml-auto rounded-full">
                                Create Series
                            </button>
                        </div>

                        <div className="w-full h-full">
                            <ul className="">
                                <li>

                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full h-full mt-4">
                        <div className="w-full h-full flex">
                            <h1 className="font-semibold">
                                Select the video series
                            </h1>

                            <button className="w-[150px] h-[35px] text-white font-semibold bg-black ml-auto rounded-full">
                                Create Series
                            </button>
                        </div>

                        <div className="w-full h-full">
                            <ul className="">
                                <li>

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
