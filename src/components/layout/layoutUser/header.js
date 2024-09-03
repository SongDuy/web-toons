import React, { useState, useEffect } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import MenuIcon from '@mui/icons-material/Menu';

import SearchPage from "./search";
import MenuPage from "./search";
import LoginPage from "../../../../src/pages/auth/login";
import logo from "../../../img/logonew.png";
import { Link } from "react-router-dom";
import { auth } from "../../../common/themes/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoginModal } from "../../../common/store/hidden";
import { logout, setuser } from "../../../common/store/Auth.js";
import { onAuthStateChanged } from 'firebase/auth';

const HeaderPage = () => {
  // mo va dong modal public
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const isLoginModal = useSelector(state => state.hidden.isLoginModal);
  const User = useSelector(state => state.AuthJs.User);

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

  // Mở đóng modal menu
  const [isMenuModal, setIsMenuModal] = useState(false);

  const openMenuModal = () => {
    setIsMenuModal(true);
  };

  const closeMenuModal = () => {
    setIsMenuModal(false);
  };

  // Mở đóng modal login

  const openLoginModal = () => {
    dispatch(setIsLoginModal(true));
  };

  const closeLoginModal = () => {
    dispatch(setIsLoginModal(false));
  };

  //new
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setuser(true));
      } else {
        // Optionally, dispatch an action to indicate the user is logged out
        // dispatch(setuser(false));
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className=" w-full xs:h-[50px] sm:h-[100px] bg-white flex xs:px-[5px] sm:px-[30px]">

      {/* logo */}
      <Link
        to={`/`}
        className="xs:w-[90px] sm:w-[90px] pr-1 flex items-center justify-center xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer"
      >
        <img
          src={logo}
          alt="Logo của website"
          className="w-24 h-auto"
        />
      </Link>

      {/* Đăng nhập */}
      {!User ?
        <div className="flex items-center justify-center">

          {
            /* <button
              className="xs:w-[50px] sm:w-[100px] xs:h-[20px] sm:h-[35px] bg-gray-50 border border-gray-300 rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-gray-500"
              onClick={openLoginModal}
            >
              Log In
            </button> 
          */}

          <button
            className="w-[25px] h-[25px] rounded-full border-2 text-[12px] font-semibold hover:shadow-md flex items-center justify-center"
            onClick={openLoginModal}
          >
            19
          </button>
          <button
            className="border h-[5px] bg-gray-500 w-[20px] rounded-r-full"
            onClick={openLoginModal}
          />

          {isLoginModal && <LoginPage closeModal={closeLoginModal} />}
        </div>
        :
        <div className="flex items-center justify-center">

          {/* 
            <button
              className="xs:min-w-[50px] sm:min-w-[100px] xs:h-[20px] sm:h-[35px] px-2 bg-gray-50 border border-gray-300 rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-gray-500"
              onClick={() => dispatch(logout())}
            >
              {auth?.currentUser.displayName}
            </button> 
          */}

          <button
            className="border h-[5px] bg-gray-500 w-[20px] rounded-l-full"
            onClick={() => dispatch(logout())}
          />
          <button
            className="w-[25px] h-[25px] rounded-full border-2 text-[12px] font-semibold hover:shadow-md flex items-center justify-center"
            onClick={() => dispatch(logout())}
          >
            19
          </button>

        </div>
      }

      {/* danh mục */}
      <div className="max-w-[400px] flex items-center ml-3">
        <ul className="flex xs:gap-1 sm:gap-5">
          <Link to={`/originals`}>
            <li
              className={`uppercase font-semibold xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer ${window.location.pathname.includes("/originals")
                ? "text-yellow-500"
                : "hover:text-yellow-500"
                }`}
            >
              <span>Originals</span>
            </li>
          </Link>
          <Link to={`/videos`}>
            <li
              className={`uppercase font-semibold xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer ${window.location.pathname.includes("/videos")
                ? "text-yellow-500"
                : "hover:text-yellow-500"
                }`}
            >
              Videos
            </li>
          </Link>
          <Link to={`/genres`}>
            <li
              className={`uppercase font-semibold xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer ${window.location.pathname.includes("/genres")
                ? "text-yellow-500"
                : "hover:text-yellow-500"
                }`}
            >
              Genres
            </li>
          </Link>
          <Link to={`/popular`}>
            <li
              className={`uppercase font-semibold xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer ${window.location.pathname.includes("/popular")
                ? "text-yellow-500"
                : "hover:text-yellow-500"
                }`}
            >
              Popular
            </li>
          </Link>
        </ul>
      </div>

      {/* chức năng */}
      <div className="flex items-center justify-center ml-auto xs:gap-1 sm:gap-3">

        <div>
          <button
            id="basic-button"
            className="xs:w-[50px] sm:w-[100px] xs:h-[20px] sm:h-[35px] bg-black rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-white flex items-center justify-center"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
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
              "aria-labelledby": "basic-button",
            }}
          >
            <Link to={`/create/original`}>
              <MenuItem onClick={handleClose} className="flex gap-x-1">
                <PictureAsPdfOutlinedIcon />
                Original
              </MenuItem>
            </Link>

            <Link to={`/create/video`}>
              <MenuItem onClick={handleClose} className="flex gap-x-1">
                <VideoCallOutlinedIcon />
                Video
              </MenuItem>
            </Link>
          </Menu>
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

        <div>
          <button
            className="xs:w-[20px] sm:w-[35px] xs:h-[20px] sm:h-[35px] bg-gray-50 border border-gray-300 rounded-full text-gray-500 flex items-center justify-center"
            onClick={openMenuModal}
          >
            <MenuIcon sx={{ fontSize: 18 }} />
          </button>
          {isMenuModal && <MenuPage closeModal={closeMenuModal} />}
        </div> 
        
      </div>
    </div>
  );
};

export default HeaderPage;
