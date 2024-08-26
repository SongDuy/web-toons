import React from 'react';

import PieChartIcon from '@mui/icons-material/PieChart';
import PersonIcon from '@mui/icons-material/Person';
import CollectionsIcon from '@mui/icons-material/Collections';
import CategoryIcon from '@mui/icons-material/Category';

const AdminPage = () => {
    return (
        <div className="w-full h-full border">
            <div className="flex h-screen">

                <div className="w-[350px] h-full bg-gray-50 px-5 py-5">
                    <div className="w-full h-[50px] flex items-center border-b-2">
                        <span className="font-semibold">
                            ADMIN
                        </span>
                    </div>

                    <ul className="mt-10 grid grid-cols-1 gap-4">
                        <li className="w-full h-[50px] cursor-pointer px-5 py-2 bg-white hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <PieChartIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Dashboard
                            </span>
                        </li>

                        <li className="w-full h-[50px] cursor-pointer px-5 py-2 bg-white hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <PersonIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Users
                            </span>
                        </li>

                        <li className="w-full h-[50px] cursor-pointer px-5 py-2 bg-white hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <CollectionsIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Banner
                            </span>
                        </li>

                        <li className="w-full h-[50px] cursor-pointer px-5 py-2 bg-white hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <CategoryIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Categories
                            </span>
                        </li>

                        <li className="w-full h-[50px] cursor-pointer px-5 py-2 bg-white hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <CollectionsIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Banner
                            </span>
                        </li>

                        <li className="w-full h-[50px] cursor-pointer px-5 py-2 bg-white hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <CollectionsIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Banner
                            </span>
                        </li>

                        <li className="w-full h-[50px] cursor-pointer px-5 py-2 bg-white hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <CollectionsIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Banner
                            </span>
                        </li>

                        <li className="w-full h-[50px] cursor-pointer px-5 py-2 bg-white hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <CollectionsIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Banner
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="w-full h-full px-5 py-5 bg-white">
                    <div className="w-full h-[50px] flex items-center border-b-2">
                        <span className="font-semibold">
                            Dashboard
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
