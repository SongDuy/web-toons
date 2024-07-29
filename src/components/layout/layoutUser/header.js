import React from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const HeaderPage = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOriginalsClick = () => {
        window.location.href = '/originals';
    };

    const handleVideosClick = () => {
        window.location.href = '/videos';
    };

    const handleGenresClick = () => {
        window.location.href = '/genres';
    };

    const handlePopularClick = () => {
        window.location.href = '/popular';
    };

    const handleCreateOriginalClick = () => {
        window.location.href = '/create/original';
    };

    const handleCreateVideoClick = () => {
        window.location.href = '/create/video';
    };

    return (
        <div
            className=" w-full h-[100px] bg-white flex px-[30px]"
        >

            {/* logo */}
            <Link
                className="w-[90px] flex items-center justify-center cursor-pointer"
                to={`/`}
            >
                <p>LOGO</p>
            </Link>

            {/* danh mục */}
            <div
                className="w-[400px] flex items-center"
            >
                <ul
                    className="flex gap-5"
                >
                    <li
                        className="uppercase font-semibold text-lg hover:text-green-500 cursor-pointer"
                        onClick={handleOriginalsClick}
                    >
                        Originals
                    </li>

                    <li
                        className="uppercase font-semibold text-lg hover:text-green-500 cursor-pointer"
                        onClick={handleVideosClick}
                    >
                        Videos
                    </li>

                    <li
                        className="uppercase font-semibold text-lg hover:text-green-500 cursor-pointer"
                        onClick={handleGenresClick}
                    >
                        Genres
                    </li>

                    <li
                        className="uppercase font-semibold text-lg hover:text-green-500 cursor-pointer"
                        onClick={handlePopularClick}
                    >
                        Popular
                    </li>
                </ul>
            </div>

            {/* chức năng */}
            <div
                className="flex items-center ml-auto gap-3"
            >

                <button
                    className="w-[130px] rounded-full font-semibold text-lg hover:text-green-500 flex gap-1"
                >
                    <MenuBookOutlinedIcon />
                    Creators 101
                </button>

                <div>
                    <button
                        id="basic-button"
                        className="w-[100px] h-[35px] bg-black rounded-full font-semibold text-white"
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
                        <MenuItem onClick={handleCreateOriginalClick}>
                            <span className="px-2">
                                Original
                            </span>
                        </MenuItem>

                        <MenuItem onClick={handleCreateVideoClick}>
                            <span className="px-2">
                                Video
                            </span>
                        </MenuItem>
                    </Menu>
                </div>

                <button
                    className="w-[100px] h-[35px] bg-gray-50 border border-gray-300 rounded-full font-semibold text-gray-500"
                >
                    Log In
                </button>

                <button
                    className="w-[35px] h-[35px] bg-gray-50 border border-gray-300 rounded-full text-gray-500"
                >
                    <SearchIcon />
                </button>
            </div>

        </div>
    );
}

export default HeaderPage;
