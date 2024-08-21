import React, { useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';

import SearchPage from './search';
import LoginPage from '../../../../src/pages/auth/login';
import logo from '../../../img/logonew.png';
import { Link } from 'react-router-dom';

const HeaderPage = () => {

    // mo va dong modal public
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Mở đóng modal tìm kiếm
    const [isSearchModal, setIsSearchModal] = useState(false);

    const openSearchModal = () => {
        setIsSearchModal(true);
    };

    const closeSearchModal = () => {
        setIsSearchModal(false);
    };

    // Mở đóng modal login
    const [isLoginModal, setIsLoginModal] = useState(false);

    const openLoginModal = () => {
        setIsLoginModal(true);
    };

    const closeLoginModal = () => {
        setIsLoginModal(false);
    };

    //new

    return (
        <div
            className=" w-full xs:h-[50px] sm:h-[100px] bg-white flex xs:px-[5px] sm:px-[30px]"
        >

            {/* logo */}
            <Link
                to={`/`}
                className="xs:w-[90px] sm:w-[90px] pr-1 flex items-center justify-center xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer"
            >
                <img src={logo} alt="Logo của website" className="w-24 h-auto shadow rounded-xl hover:bg-green-50" />
            </Link>

            {/* danh mục */}
            <div className="max-w-[400px] flex items-center ml-2">
                <ul className="flex xs:gap-1 sm:gap-5">
                    <Link to={`/originals`}>
                        <li
                            className={`uppercase font-semibold xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer ${window.location.pathname.includes("/original") ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                        >
                            <span>
                                Originals
                            </span>

                        </li>
                    </Link>
                    <Link to={`/videos`}>
                        <li
                            className={`uppercase font-semibold xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer ${window.location.pathname.includes("/video") ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                        >
                            Videos
                        </li>
                    </Link>
                    <Link to={`/genres`}>
                        <li
                            className={`uppercase font-semibold xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer ${window.location.pathname.includes("/genres") ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                        >
                            Genres
                        </li>
                    </Link>
                    <Link to={`/popular`}>
                        <li
                            className={`uppercase font-semibold xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer ${window.location.pathname.includes("/popular") ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                        >
                            Popular
                        </li>
                    </Link>
                </ul>
            </div>

            {/* chức năng */}
            <div
                className="flex items-center justify-center ml-auto xs:gap-1 sm:gap-3"
            >

                <button
                    className="max-w-[130px] rounded-full pl-[5px] font-semibold xs:text-[10px] sm:text-[10px] md:text-lg hover:text-green-500 flex items-center justify-center gap-1"
                >
                    <MenuBookOutlinedIcon sx={{ fontSize: 18 }} />
                    Creators 101
                </button>

                <div>
                    <button
                        id="basic-button"
                        className="xs:w-[50px] sm:w-[100px] xs:h-[20px] sm:h-[35px] bg-black rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-white flex items-center justify-center"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Publish
                    </button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Link to={`/create/original`}>
                            <MenuItem
                                onClick={handleClose}
                                className="flex gap-x-1"
                            >
                                <PictureAsPdfOutlinedIcon />
                                Original
                            </MenuItem>
                        </Link>

                        <Link to={`/create/video`}>
                            <MenuItem
                                onClick={handleClose}
                                className="flex gap-x-1"
                            >
                                <VideoCallOutlinedIcon />
                                Video
                            </MenuItem>
                        </Link>

                    </Menu>
                </div>

                <div>
                    <button
                        className="xs:w-[50px] sm:w-[100px] xs:h-[20px] sm:h-[35px] bg-gray-50 border border-gray-300 rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-gray-500"
                        onClick={openLoginModal}
                    >
                        Log In
                    </button>
                    {isLoginModal && <LoginPage closeModal={closeLoginModal} />}
                </div>


                <div>
                    <button
                        className="xs:w-[20px] sm:w-[35px] xs:h-[20px] sm:h-[35px] bg-gray-50 border border-gray-300 rounded-full text-gray-500 flex items-center justify-center"
                        onClick={openSearchModal}
                    >
                        <SearchIcon sx={{ fontSize: 18 }} />

                    </button>
                    {isSearchModal && <SearchPage closeModal={closeSearchModal} />}
                </div>

            </div>

        </div>
    );
}

export default HeaderPage;
