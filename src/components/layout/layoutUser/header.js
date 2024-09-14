import React, { useState, useEffect } from "react";

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PieChartIcon from '@mui/icons-material/PieChart';
import CommentIcon from '@mui/icons-material/Comment';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import SearchPage from "./search";
import LoginPage from "../../../../src/pages/auth/login";
import logo from "../../../img/logonew.png";
import { Link, useLocation} from "react-router-dom";
import { auth } from "../../../common/themes/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { getlanguage, setIsLoginModal } from "../../../common/store/hidden";
import { logout, setuser } from "../../../common/store/Auth.js";
import { onAuthStateChanged } from 'firebase/auth';

const HeaderPage = () => {

  const dispatch = useDispatch();
  const isLoginModal = useSelector(state => state.hidden.isLoginModal);
  const User = useSelector(state => state.AuthJs.User);
  const language = useSelector(state => state.hidden.language);

  const location = useLocation();

  // Mở và đóng modal public 
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);// return focus to the button when we transitioned from !open -> open
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // Mở và đóng modal Account 
  const [openAccount, setOpenAccount] = React.useState(false);
  const anchorAccountRef = React.useRef(null);

  const handleToggleAccount = () => {
    setOpenAccount((prevAccountOpen) => !prevAccountOpen);
  };

  const handleCloseAccount = (event) => {
    if (anchorAccountRef.current && anchorAccountRef.current.contains(event.target)) {
      return;
    }

    setOpenAccount(false);
  };

  function handleListAccountKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenAccount(false);
    } else if (event.key === 'Escape') {
      setOpenAccount(false);
    }
  }

  const prevOpenAccount = React.useRef(openAccount);// return focus to the button when we transitioned from !open -> open
  React.useEffect(() => {
    if (prevOpenAccount.current === true && openAccount === false && anchorAccountRef.current) {
      anchorAccountRef.current.focus();
    }

    prevOpenAccount.current = openAccount;
  }, [openAccount, prevOpenAccount]);

  // Mở đóng modal tìm kiếm
  const [isSearchModal, setIsSearchModal] = useState(false);

  const openSearchModal = () => {
    setIsSearchModal(true);
  };

  const closeSearchModal = () => {
    setIsSearchModal(false);
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

  // Nhấn nút Chuyển ngôn ngữ

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
      <div className="max-w-[400px] flex items-center ml-5">
        <ul className="flex xs:gap-1 sm:gap-5">
          <Link to={`/originals`}>
            <li
              className={`uppercase font-semibold xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer ${location.pathname.includes("/originals")
                ? "text-yellow-500"
                : "hover:text-yellow-500"
                }`}
            >
              {!language ? <span> Originals </span> : <span> 원본 </span>}
            </li>
          </Link>
          <Link to={`/videos`}>
            <li
              className={`uppercase font-semibold xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer ${location.pathname.includes("/videos")
                ? "text-yellow-500"
                : "hover:text-yellow-500"
                }`}
            >
              {!language ? <span> Videos </span> : <span> 비디오 </span>}
            </li>
          </Link>
          <Link to={`/genres`}>
            <li
              className={`uppercase font-semibold xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer ${location.pathname.includes("/genres")
                ? "text-yellow-500"
                : "hover:text-yellow-500"
                }`}
            >
              {!language ? <span> Genres </span> : <span> 장르 </span>}
            </li>
          </Link>
          <Link to={`/popular`}>
            <li
              className={`uppercase font-semibold xs:text-[8px] sm:text-[10px] md:text-lg cursor-pointer ${location.pathname.includes("/popular")
                ? "text-yellow-500"
                : "hover:text-yellow-500"
                }`}
            >
              {!language ? <span> Popular </span> : <span> 인기 있는 </span>}
            </li>
          </Link>
        </ul>
      </div>

      {/* Chức năng  */}
      <div className="flex items-center justify-center ml-auto xs:gap-1 sm:gap-3">

        {/* chức năng nút Publish và Login*/}
        {!User ?

          // Chưa đăng nhập tài khoản
          <div className="flex gap-3">

            {/* Chức năng Publish */}
            < div className="z-10">
              <button
                className="xs:w-[50px] sm:w-[100px] xs:h-[20px] sm:h-[35px] bg-black rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-white flex items-center justify-center"
                onClick={() => { openLoginModal(); handleCloseAccount(); }}
              >
                {!language ? <span> Publish </span> : <span> 게시 </span>}
              </button>

              {isLoginModal && <LoginPage closeModal={closeLoginModal} />}
            </div>

            {/* Đăng nhập */}
            <div className="flex items-center justify-center">

              <button
                className="xs:w-[50px] sm:w-[100px] xs:h-[20px] sm:h-[35px] bg-gray-50 hover:bg-gray-100 border rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-gray-500"
                onClick={() => { openLoginModal(); handleCloseAccount(); }}
              >
                {!language ? <span> Log In </span> : <span> 로그인 </span>}

              </button>

              {isLoginModal && <LoginPage closeModal={closeLoginModal} />}
            </div>
          </div>
          :
          // Đã đăng nhập tài khoản
          <div className="flex gap-3">

            {/* Menu Publish */}
            < div className="z-10">
              <button
                className="xs:w-[50px] sm:w-[100px] xs:h-[20px] sm:h-[35px] bg-black rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-white flex items-center justify-center"
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                {/* Publish {process.env.REACT_APP_HOME} */}
                {!language ? <span> Publish </span> : <span> 게시 </span>}
              </button>

              {/* Chọn menu */}
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          className="bg-gray-100 rounded-lg text-black font-semibold "
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <Link to={`/publish/original`}>
                            <MenuItem onClick={handleClose} className="flex gap-x-1">
                              <PictureAsPdfOutlinedIcon />

                              {!language ? <span> Original </span> : <span> 원래의 </span>}

                            </MenuItem>
                          </Link>

                          <Link to={`/publish/video`}>
                            <MenuItem onClick={handleClose} className="flex gap-x-1">
                              <VideoCallOutlinedIcon />

                              {!language ? <span> Video </span> : <span> 동영상 </span>}

                            </MenuItem>
                          </Link>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>

            {/* Menu Account */}
            <div className="flex items-center justify-center z-10">

              <button
                className="xs:min-w-[50px] sm:min-w-[100px] xs:h-[20px] sm:h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-gray-500"
                ref={anchorAccountRef}
                id="composition-button"
                aria-controls={openAccount ? 'composition-menu' : undefined}
                aria-expanded={openAccount ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggleAccount}
              >
                {auth?.currentUser.displayName}
              </button>

              {/* Chọn menu Account*/}
              <Popper
                className="w-[180px] rounded-lg flex items-center justify-center"
                open={openAccount}
                anchorEl={anchorAccountRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseAccount}>
                        <MenuList className="bg-gray-100 rounded-lg text-black font-semibold "
                          autoFocusItem={openAccount}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListAccountKeyDown}
                        >
                          <Link to={``}>
                            <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                              <GroupAddIcon />
                              {!language ? <span> Subscribed </span> : <span> 구독함 </span>}
                            </MenuItem>
                          </Link>

                          <Link to={`/dashboard`}>
                            <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                              <PieChartIcon />
                              {!language ? <span> Dashboard </span> : <span> 계기반 </span>}
                            </MenuItem>
                          </Link>

                          <Link to={`/comments`}>
                            <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                              <CommentIcon />
                              {!language ? <span> Comments </span> : <span> 댓글 </span>}
                            </MenuItem>
                          </Link>

                          <Link to={``}>
                            <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                              <EditNoteIcon />
                              {!language ? <span> Creators </span> : <span> 크리에이터 </span>}
                            </MenuItem>
                          </Link>

                          <Link to={`/channel/my`}>
                            <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                              <AssignmentIndIcon />
                              {!language ? <span> My Channel Page</span> : <span> 내 채널 페이지 </span>}
                            </MenuItem>
                          </Link>

                          <Link to={`/account`}>
                            <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                              <AccountCircleIcon />
                              {!language ? <span> Account </span> : <span> 계정 </span>}
                            </MenuItem>
                          </Link>

                          <MenuItem onClick={() =>{ dispatch(logout());window.location.reload()}} className="flex gap-x-3">
                            <LogoutIcon />
                            {!language ? <span> Log out </span> : <span> 로그아웃 </span>}
                          </MenuItem>
                        </MenuList>
                        
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>
        }

        {/* Chức năng tìm kiếm và chuyển ngữ */}
        <div className="flex gap-3">

          {/* Chức năng tìm kiếm */}
          <div className="w-full h-full">
            <button
              className="xs:w-[20px] sm:w-[35px] xs:h-[20px] sm:h-[35px] bg-gray-50 hover:bg-gray-100 border rounded-full text-gray-500 flex items-center justify-center"
              onClick={openSearchModal}
            >
              <SearchIcon sx={{ fontSize: 18 }} />
            </button>
            {isSearchModal && <SearchPage closeModal={closeSearchModal} />}
          </div>

          {/* Nút chuyển ngữ */}
          <div className="w-full h-full">
            {!language ?
              <button className="w-[80px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border text-black font-semibold rounded-full" onClick={() => dispatch(getlanguage())}>
                English
              </button>
              :
              <button className="w-[80px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border text-black font-semibold rounded-full" onClick={() => dispatch(getlanguage())}>
                Korean
              </button>
            }
          </div>
        </div>

      </div >
    </div >
  );
};

export default HeaderPage;
