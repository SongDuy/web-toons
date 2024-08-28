import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';  // Import Outlet để render các route con

import PieChartIcon from '@mui/icons-material/PieChart';
import PeopleIcon from '@mui/icons-material/People';
import CollectionsIcon from '@mui/icons-material/Collections';
import CategoryIcon from '@mui/icons-material/Category';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FlagIcon from '@mui/icons-material/Flag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';

const AdminPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Hàm chuyển đổi chữ cái đầu thành chữ hoa
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    // Lấy đường dẫn hiện tại từ URL
    const currentPath = location.pathname.split('/').pop() || 'dashboard';
    const [isTitle, setIsTitle] = useState(currentPath.toLowerCase());

    useEffect(() => {
        // Cập nhật isTitle bất cứ khi nào URL thay đổi
        const path = location.pathname.split('/').pop().toLowerCase();
        setIsTitle(path || 'dashboard');
    }, [location]);

    // Hàm xử lý điều hướng và cập nhật tiêu đề
    const handleNavigation = (title, path) => {
        setIsTitle(title.toLowerCase());
        navigate(path);
    };

    return (
        <div className="w-full h-screen border">
            <div className="flex h-full">

                <div className="w-[300px] h-full py-5 bg-gray-100 border">
                    <div className="w-full px-5">
                        <div className="w-full h-[50px] flex items-center border-b-2">
                            <span className="font-semibold">ADMIN</span>
                        </div>
                    </div>

                    <div className="w-full px-2">
                        <div className="w-full h-[580px] px-3 my-10 custom-scrollbar">
                            <ul className="grid grid-cols-1 gap-2 pb-2">
                                <li
                                    onClick={() => handleNavigation('dashboard', '/admin/dashboard')}
                                    className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "dashboard" ? 'text-yellow-500 bg-red-50 border-t' : 'hover:text-yellow-500 bg-white'}`}
                                >
                                    <span className="mr-auto"><PieChartIcon /></span>
                                    <span className="mr-auto font-semibold">Dashboard</span>
                                </li>

                                <li
                                    onClick={() => handleNavigation('banners', '/admin/banners')}
                                    className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "banners" ? 'text-yellow-500 bg-red-50 border-t' : 'hover:text-yellow-500 bg-white'}`}
                                >
                                    <span className="mr-auto"><CollectionsIcon /></span>
                                    <span className="mr-auto font-semibold">Banners</span>
                                </li>

                                <li
                                    onClick={() => handleNavigation('users', '/admin/users')}
                                    className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "users" ? 'text-yellow-500 bg-red-50 border-t' : 'hover:text-yellow-500 bg-white'}`}
                                >
                                    <span className="mr-auto"><PeopleIcon /></span>
                                    <span className="mr-auto font-semibold">Users</span>
                                </li>

                                <li
                                    onClick={() => handleNavigation('categories', '/admin/categories')}
                                    className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "categories" ? 'text-yellow-500 bg-red-50 border-t' : 'hover:text-yellow-500 bg-white'}`}
                                >
                                    <span className="mr-auto"><CategoryIcon /></span>
                                    <span className="mr-auto font-semibold">Categories</span>
                                </li>

                                <li
                                    onClick={() => handleNavigation('originals', '/admin/originals')}
                                    className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "originals" ? 'text-yellow-500 bg-red-50 border-t' : 'hover:text-yellow-500 bg-white'}`}
                                >
                                    <span className="mr-auto"><AutoStoriesIcon /></span>
                                    <span className="mr-auto font-semibold">Originals</span>
                                </li>

                                <li
                                    onClick={() => handleNavigation('videos', '/admin/videos')}
                                    className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "videos" ? 'text-yellow-500 bg-red-50 border-t' : 'hover:text-yellow-500 bg-white'}`}
                                >
                                    <span className="mr-auto"><VideoLibraryIcon /></span>
                                    <span className="mr-auto font-semibold">Videos</span>
                                </li>

                                <li
                                    onClick={() => handleNavigation('censors', '/admin/censors')}
                                    className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "censors" ? 'text-yellow-500 bg-red-50 border-t' : 'hover:text-yellow-500 bg-white'}`}
                                >
                                    <span className="mr-auto"><SafetyCheckIcon /></span>
                                    <span className="mr-auto font-semibold">Censors</span>
                                </li>

                                <li
                                    onClick={() => handleNavigation('payments', '/admin/payments')}
                                    className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "payments" ? 'text-yellow-500 bg-red-50 border-t' : 'hover:text-yellow-500 bg-white'}`}
                                >
                                    <span className="mr-auto"><AttachMoneyIcon /></span>
                                    <span className="mr-auto font-semibold">Payments</span>
                                </li>

                                <li
                                    onClick={() => handleNavigation('notifications', '/admin/notifications')}
                                    className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "notifications" ? 'text-yellow-500 bg-red-50 border-t' : 'hover:text-yellow-500 bg-white'}`}
                                >
                                    <span className="mr-auto"><NotificationsIcon /></span>
                                    <span className="mr-auto font-semibold">Notifications</span>
                                </li>

                                <li
                                    onClick={() => handleNavigation('reports', '/admin/reports')}
                                    className={`w-full h-[50px] cursor-pointer px-5 py-2 shadow flex items-center justify-center rounded ${isTitle === "reports" ? 'text-yellow-500 bg-red-50 border-t' : 'hover:text-yellow-500 bg-white'}`}
                                >
                                    <span className="mr-auto"><FlagIcon /></span>
                                    <span className="mr-auto font-semibold">Reports</span>
                                </li>

                            </ul>
                        </div>
                    </div>

                </div>

                {/* Main Content */}
                <div className="w-[1250px] h-full px-5 py-5 bg-white">

                    <div className="w-full h-[50px] flex gap items-center border-b-2">
                        <div className="">
                            <span className="font-semibold">
                                Admin
                            </span>
                            <NavigateNextIcon />
                            <span className="font-semibold text-yellow-500">
                                {capitalizeFirstLetter(isTitle)}
                            </span>
                        </div>

                        <div className="ml-auto">
                            ADMIN Name
                        </div>
                    </div>

                    {/* Render the content based on the selected title */}
                    <div className="mt-5">
                        <Outlet /> {/* Đây là nơi sẽ render các route con */}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminPage;
