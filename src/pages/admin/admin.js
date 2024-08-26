import React, { useState } from 'react';

import PieChartIcon from '@mui/icons-material/PieChart';
import PeopleIcon from '@mui/icons-material/People';
import CollectionsIcon from '@mui/icons-material/Collections';
import CategoryIcon from '@mui/icons-material/Category';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FlagIcon from '@mui/icons-material/Flag';

const AdminPage = () => {

    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [isTitle, setIsTitle] = useState('Dashboard');

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
                        <li
                            onClick={() => setIsTitle('Dashboard')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 bg-white shadow flex items-center justify-center rounded ${ isTitle === "Dashboard" ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                        >
                            <span className="mr-auto">
                                <PieChartIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Dashboard
                            </span>
                        </li>

                        <li
                            onClick={() => setIsTitle('Banner')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 bg-white shadow flex items-center justify-center rounded ${ isTitle === "Banner" ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                        >
                            <span className="mr-auto">
                                <CollectionsIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Banner
                            </span>
                        </li>

                        <li
                            onClick={() => setIsTitle('Users')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 bg-white shadow flex items-center justify-center rounded ${ isTitle === "Users" ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                        >
                            <span className="mr-auto">
                                <PeopleIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Users
                            </span>
                        </li>

                        <li
                            onClick={() => setIsTitle('Categories')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 bg-white shadow flex items-center justify-center rounded ${ isTitle === "Categories" ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                        >
                            <span className="mr-auto">
                                <CategoryIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Categories
                            </span>
                        </li>

                        <li
                            onClick={() => setIsTitle('Originals')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 bg-white shadow flex items-center justify-center rounded ${ isTitle === "Originals" ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                        >
                            <span className="mr-auto">
                                <AutoStoriesIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Originals
                            </span>
                        </li>

                        <li
                            onClick={() => setIsTitle('Videos')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 bg-white shadow flex items-center justify-center rounded ${ isTitle === "Videos" ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                        >
                            <span className="mr-auto">
                                <VideoLibraryIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Videos
                            </span>
                        </li>

                        <li
                            onClick={() => setIsTitle('Report')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 bg-white shadow flex items-center justify-center rounded ${ isTitle === "Report" ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                        >
                            <span className="mr-auto">
                                <FlagIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Report
                            </span>
                        </li>

                    </ul>
                </div>

                <div className="w-full h-full px-5 py-5 bg-white">
                    <div className="w-full h-[50px] flex gap items-center border-b-2">
                        <span className="font-semibold">
                            Admin
                        </span>
                        <NavigateNextIcon />
                        <span className="font-semibold text-yellow-500">
                            {isTitle}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
