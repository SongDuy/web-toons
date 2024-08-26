import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import PieChartIcon from '@mui/icons-material/PieChart';
import PeopleIcon from '@mui/icons-material/People';
import CollectionsIcon from '@mui/icons-material/Collections';
import CategoryIcon from '@mui/icons-material/Category';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FlagIcon from '@mui/icons-material/Flag';

import AdminDashboardPage from './childAdmin/adminDashboard';
import AdminBannerPage from './childAdmin/adminBanner';
import AdminUsersPage from './childAdmin/adminUsers';
import AdminCategoriesPage from './childAdmin/adminCategories';
import AdminOriginalsPage from './childAdmin/adminOriginals';
import AdminVideosPage from './childAdmin/adminVideos';
import AdminReportPage from './childAdmin/adminReport';

const AdminPage = () => {
    const [isTitle, setIsTitle] = useState('Dashboard');
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle navigation and title update
    const handleNavigation = (title, path) => {
        setIsTitle(title);  // Update state to change content
        navigate(path);     // Update URL without reloading the page
    };

    // Define content for each section
    const renderContent = () => {
        switch (isTitle) {
            case 'Dashboard':
                return <AdminDashboardPage />;
            case 'Banner':
                return <AdminBannerPage />;
            case 'Users':
                return <AdminUsersPage />;
            case 'Categories':
                return <AdminCategoriesPage />;
            case 'Originals':
                return <AdminOriginalsPage />;
            case 'Videos':
                return <AdminVideosPage />;
            case 'Report':
                return <AdminReportPage />;
            default:
                return <div>Select a category</div>;
        }
    };

    return (
        <div className="w-full h-full border">
            <div className="flex h-screen">
                <div className="w-[350px] h-full bg-gray-100 px-5 py-5">
                    <div className="w-full h-[50px] flex items-center border-b-2">
                        <span className="font-semibold">
                            ADMIN
                        </span>
                    </div>

                    <ul className="mt-10 grid grid-cols-1 gap-4">
                        {/* Menu Items */}
                        <li
                            onClick={() => handleNavigation('Dashboard', '/admin/dashboard')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "Dashboard" ? 'text-yellow-500 bg-red-50' : 'hover:text-yellow-500 bg-white'}`}
                        >
                            <span className="mr-auto">
                                <PieChartIcon />
                            </span>
                            <span className="mr-auto font-semibold">
                                Dashboard
                            </span>
                        </li>

                        <li
                            onClick={() => handleNavigation('Banner', '/admin/banner')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "Banner" ? 'text-yellow-500 bg-red-50' : 'hover:text-yellow-500 bg-white'}`}
                        >
                            <span className="mr-auto">
                                <CollectionsIcon />
                            </span>
                            <span className="mr-auto font-semibold">
                                Banner
                            </span>
                        </li>

                        <li
                            onClick={() => handleNavigation('Users', '/admin/users')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "Users" ? 'text-yellow-500 bg-red-50' : 'hover:text-yellow-500 bg-white'}`}
                        >
                            <span className="mr-auto">
                                <PeopleIcon />
                            </span>
                            <span className="mr-auto font-semibold">
                                Users
                            </span>
                        </li>

                        <li
                            onClick={() => handleNavigation('Categories', '/admin/categories')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "Categories" ? 'text-yellow-500 bg-red-50' : 'hover:text-yellow-500 bg-white'}`}
                        >
                            <span className="mr-auto">
                                <CategoryIcon />
                            </span>
                            <span className="mr-auto font-semibold">
                                Categories
                            </span>
                        </li>

                        <li
                            onClick={() => handleNavigation('Originals', '/admin/originals')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "Originals" ? 'text-yellow-500 bg-red-50' : 'hover:text-yellow-500 bg-white'}`}
                        >
                            <span className="mr-auto">
                                <AutoStoriesIcon />
                            </span>
                            <span className="mr-auto font-semibold">
                                Originals
                            </span>
                        </li>

                        <li
                            onClick={() => handleNavigation('Videos', '/admin/videos')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "Videos" ? 'text-yellow-500 bg-red-50' : 'hover:text-yellow-500 bg-white'}`}
                        >
                            <span className="mr-auto">
                                <VideoLibraryIcon />
                            </span>
                            <span className="mr-auto font-semibold">
                                Videos
                            </span>
                        </li>

                        <li
                            onClick={() => handleNavigation('Report', '/admin/report')}
                            className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "Report" ? 'text-yellow-500 bg-red-50' : 'hover:text-yellow-500 bg-white'}`}
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

                {/* Main Content */}
                <div className="w-full h-full px-5 py-5 bg-white">
                    <div className="w-full h-[50px] flex gap items-center border-b-2">
                        <span className="font-semibold">Admin</span>
                        <NavigateNextIcon />
                        <span className="font-semibold text-yellow-500">
                            {isTitle}
                        </span>
                    </div>

                    {/* Render the content based on the selected title */}
                    <div className="mt-5">
                        {renderContent()}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminPage;

