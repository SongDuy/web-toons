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
import BackupIcon from '@mui/icons-material/Backup';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

import SearchPage from "./search";
import Login19AgePage from "./19Age.js";
import LoginPage from "../../../../src/pages/auth/login";
import logo from "../../../img/logonew.png";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../../common/themes/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { getlanguage, setIsLoginModal, setIsLogin19Modal, setcurrentStepOriginal, setcurrentStepVideo, setlanguage, setcheck19Modal } from "../../../common/store/hidden";
import { logout, setuser } from "../../../common/store/Auth.js";
import { onAuthStateChanged } from 'firebase/auth';
import userFireBase from "../../../common/services/User.services";

const HeaderPage = () => {

  const dispatch = useDispatch();
  const isLoginModal = useSelector(state => state.hidden.isLoginModal);
  const isLogin19Modal = useSelector(state => state.hidden.isLogin19Modal);
  const check19Modal = useSelector(state => state.hidden.check19Modal);

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

  // Mở đóng modal login 19
  const [is19AgeModal, setIs19AgeModal] = useState(false);

  const open19AgeModal = () => {
    setIs19AgeModal(true);
  };

  const close19AgeModal = () => {
    setIs19AgeModal(false);
  };

  // Mở đóng modal login

  const openLoginModal = () => {
    dispatch(setIsLoginModal(true));
  };

  const closeLoginModal = () => {
    dispatch(setIsLoginModal(false));
  };
  const openLogin19Modal = () => {
    dispatch(setIsLoginModal(true));
    dispatch(setIsLogin19Modal(true));

  };

  const closeLogin19Modal = () => {
    dispatch(setIsLoginModal(false));
    dispatch(setIsLogin19Modal(false));

  };
  const logouts = async () => {
    try {
      if (auth?.currentUser) {
        auth?.currentUser?.uid && await userFireBase.update({ checkage: false }, auth?.currentUser?.uid)
        await dispatch(logout())
        dispatch(setIsLogin19Modal(false));
        dispatch(setcheck19Modal(false))

      }

    } catch (error) {

    }
  }

  //new
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setuser(true));
        localStorage.getItem("language") === "en" ? dispatch(setlanguage(false)) : dispatch(setlanguage(true))
      } else {
        localStorage.getItem("language") === "en" ? dispatch(setlanguage(false)) : dispatch(setlanguage(true))
        // Optionally, dispatch an action to indicate the user is logged out
        // dispatch(setuser(false));
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [dispatch]);

  // Nhấn nút Chuyển ngôn ngữ

  return (
    <>
      {/* Giao diện Header trên điện thoại */}
      <div className="hidden sm:block">
        <div className=" w-full h-[100px] bg-white flex xs:px-[5px] sm:px-[30px]">
          {/* logo */}
          <div className="xs:w-[50px] sm:w-[100px] flex items-center justify-center cursor-pointer">
            <div className="hidden sm:block">
              <Link
                to={`/`}
                className="w-[100px] flex items-center justify-center cursor-pointer"
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-auto"
                />
              </Link>
            </div>
            <div className="block sm:hidden">
              <Link
                to={`/`}
                className="w-[65px] flex items-center justify-center cursor-pointer"
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-auto"
                />
              </Link>
            </div>
          </div>

          {/* Đăng nhập 19 tuổi*/}
          {!User ? (
            <div className="w-auto h-full flex justify-center">
              <button
                onClick={openLogin19Modal}
                className="flex items-center justify-center"
              >
                <div className="w-[20px] h-[20px] rounded-full border-2 text-[12px] font-semibold hover:shadow-md flex items-center justify-center">
                  19
                </div>
                <div className="border h-[5px] bg-gray-500 w-[15px] rounded-r-full" />
              </button>
              {isLogin19Modal && <LoginPage closeModal={closeLogin19Modal} />}
            </div>
          ) : !check19Modal ? (
            <div className="w-auto h-full flex justify-center">
              <button
                className="flex items-center justify-center"
                onClick={() => { open19AgeModal(); }}
              >
                <div className="w-[20px] h-[20px] rounded-full border-2 text-[12px] font-semibold hover:shadow-md flex items-center justify-center">
                  19
                </div>
                <div className="border h-[5px] bg-gray-500 w-[15px] rounded-r-full" />
              </button>
              {is19AgeModal && <Login19AgePage closeModal={close19AgeModal} check={true} />}
            </div>
          ) : (
            <div className="w-auto h-full flex justify-center">
              <button
                className="flex items-center justify-center"
                onClick={() => { open19AgeModal(); }}
              >
                <div className="border h-[5px] bg-gray-500 w-[15px] rounded-l-full" />
                <div className="w-[20px] h-[20px] rounded-full border-2 text-[12px] font-semibold hover:shadow-md flex items-center justify-center">
                  19
                </div>
              </button>

              {is19AgeModal && <Login19AgePage closeModal={close19AgeModal} check={false} />}
            </div>
          )}

          {/* danh mục */}
          <div className="w-auto flex items-center xs:mx-2 sm:mx-5 overflow-x-auto">
            <ul className="flex overflow-x-auto gap-5 whitespace-nowrap">
              <Link to={`/originals`}>
                <li
                  className={`uppercase font-semibold text-lg cursor-pointer ${location.pathname.includes("/originals")
                    ? "text-yellow-500"
                    : "hover:text-yellow-500"
                    }`}
                >
                  {!language ? <span> Originals </span> : <span> 오리지널 </span>}
                </li>
              </Link>
              <Link to={`/videos`}>
                <li
                  className={`uppercase font-semibold text-lg cursor-pointer ${location.pathname.includes("/videos")
                    ? "text-yellow-500"
                    : "hover:text-yellow-500"
                    }`}
                >
                  {!language ? <span> Videos </span> : <span> 비디오 </span>}
                </li>
              </Link>
              <Link to={`/genres`}>
                <li
                  className={`uppercase font-semibold text-lg cursor-pointer ${location.pathname.includes("/genres")
                    ? "text-yellow-500"
                    : "hover:text-yellow-500"
                    }`}
                >
                  {!language ? <span> Genres </span> : <span> 장르 </span>}
                </li>
              </Link>
              <Link to={`/popular`}>
                <li
                  className={`uppercase font-semibold text-lg cursor-pointer ${location.pathname.includes("/popular")
                    ? "text-yellow-500"
                    : "hover:text-yellow-500"
                    }`}
                >
                  {!language ? <span> Popular </span> : <span> 인기 </span>}
                </li>
              </Link>
            </ul>
          </div>


          {/* Chức năng  */}
          <div className="flex items-center justify-center ml-auto xs:gap-1 sm:gap-3">

            {/* chức năng nút Publish và Login*/}
            {!User ?

              // Chưa đăng nhập tài khoản
              <div className="flex xs:gap-1 sm:gap-3">

                {/* Chức năng Publish */}
                < div className="flex items-center justify-center z-10">
                  <div className="hidden lg:block">
                    <button
                      className="xs:w-[50px] sm:w-[100px] xs:h-[20px] sm:h-[35px] bg-black rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-white flex items-center justify-center"
                      onClick={() => { openLoginModal(); handleCloseAccount(); }}
                    >
                      {!language ? <span> Publish </span> : <span> 발행</span>}
                    </button>

                  </div>
                  <div className="block lg:hidden">
                    <button
                      className="w-[35px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border flex items-center justify-center text-black font-semibold rounded-full"
                      onClick={() => { openLoginModal(); handleCloseAccount(); }}
                    >
                      <BackupIcon />
                    </button>
                  </div>
                  {isLoginModal && <LoginPage closeModal={closeLoginModal} />}
                </div>

                {/* Đăng nhập */}
                <div className="flex items-center justify-center">
                  <div className="hidden lg:block">
                    <button
                      className="xs:w-[50px] sm:w-[100px] xs:h-[20px] sm:h-[35px] bg-gray-50 hover:bg-gray-100 border rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-gray-500"
                      onClick={() => { openLoginModal(); handleCloseAccount(); }}
                    >
                      {!language ? <span> Log In </span> : <span> 로그인 </span>}
                    </button>

                  </div>
                  <div className="block lg:hidden">
                    <button
                      className="w-[35px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border flex items-center justify-center text-black font-semibold rounded-full"
                      onClick={() => { openLoginModal(); handleCloseAccount(); }}
                    >
                      <ExitToAppSharpIcon />
                    </button>
                  </div>

                  {isLoginModal && <LoginPage closeModal={closeLoginModal} />}
                </div>
              </div>
              :
              // Đã đăng nhập tài khoản
              <div className="flex xs:gap-1 sm:gap-3">

                {/* Menu Publish */}
                <div className="flex items-center justify-center z-10">
                  <button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <div className="hidden lg:block">
                      <span
                        className="w-[100px] h-[35px] bg-black rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-white flex items-center justify-center">
                        {!language ? <span> Publish </span> : <span> 발행 </span>}
                      </span>
                    </div>
                    <div className="block lg:hidden">
                      <span
                        className="w-[35px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border flex items-center justify-center text-black font-semibold rounded-full">
                        <BackupIcon />
                      </span>
                    </div>
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
                              <Link to={`/publish/original`} onClick={() => dispatch(setcurrentStepOriginal(1))}>
                                <MenuItem onClick={handleClose} className="flex gap-x-1">
                                  <PictureAsPdfOutlinedIcon />

                                  {!language ? <span> Original </span> : <span> 원본 </span>}

                                </MenuItem>
                              </Link>

                              <Link to={`/publish/video`} onClick={() => dispatch(setcurrentStepVideo(1))}>
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

                <div className="w-full flex items-center justify-center z-10">
                  <button
                    ref={anchorAccountRef}
                    id="composition-button"
                    aria-controls={openAccount ? 'composition-menu' : undefined}
                    aria-expanded={openAccount ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggleAccount}
                  >
                    <div className="w-full hidden lg:block">
                      <span className="w-full h-[35px] px-2 py-1 bg-gray-50 hover:bg-gray-100 border rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-gray-500">
                        {auth?.currentUser.displayName}
                      </span>
                    </div>
                    <div className="block lg:hidden">
                      <span className="w-[35px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border flex items-center justify-center text-black rounded-full">
                        <AccountCircleSharpIcon />
                      </span>
                    </div>
                  </button>
                  {/* Chọn menu Account*/}
                  <Popper
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
                              <Link to={`/subscribed`}>
                                <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                                  <GroupAddIcon />
                                  {!language ? <span> Subscribed </span> : <span> 구독 중 </span>}
                                </MenuItem>
                              </Link>

                              <Link to={`/dashboard`}>
                                <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                                  <PieChartIcon />
                                  {!language ? <span> Dashboard </span> : <span> 대시보드 </span>}
                                </MenuItem>
                              </Link>

                              <Link to={`/mycomment`}>
                                <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                                  <CommentIcon />
                                  {!language ? <span> Comments </span> : <span> 댓글 </span>}
                                </MenuItem>
                              </Link>

                              <Link to={`/creators`}>
                                <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                                  <EditNoteIcon />
                                  {!language ? <span> Creators </span> : <span> 창작자 </span>}
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

                              <MenuItem onClick={() => logouts()} className="flex gap-x-3">
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
            <div className="flex items-center xs:gap-2 sm:gap-3">

              {/* Chức năng tìm kiếm */}
              <div className="w-full h-full">
                <div className="hidden sm:block">
                  <button
                    className="w-[35px] h-[35px] bg-gray-50 hover:bg-gray-100 border rounded-full text-gray-500 flex items-center justify-center"
                    onClick={openSearchModal}
                  >
                    <SearchIcon sx={{ fontSize: 18 }} />
                  </button>
                </div>
                <div className="block sm:hidden">
                  <button
                    className="w-[35px] h-[35px] bg-gray-50 hover:bg-gray-100 border rounded-full text-gray-500 flex items-center justify-center"
                    onClick={openSearchModal}
                  >
                    <SearchIcon sx={{ fontSize: 18 }} />
                  </button>
                </div>

                {isSearchModal && <SearchPage closeModal={closeSearchModal} />}
              </div>

              {/* Nút chuyển ngữ */}
              <div className="w-full h-full">
                {!language ?
                  <div>
                    <div className="hidden sm:block">
                      <button className="w-[80px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border text-black font-semibold rounded-full" onClick={() => { dispatch(getlanguage()); localStorage.setItem("language", "en") }}>
                        English
                      </button>
                    </div>
                    <div className="block sm:hidden">
                      <button className="w-[35px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border flex items-center justify-center text-black font-semibold rounded-full" onClick={() => { dispatch(getlanguage()); localStorage.setItem("language", "en") }}>
                        En
                      </button>
                    </div>
                  </div>
                  :
                  <div>
                    <div className="hidden sm:block">
                      <button className="w-[80px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border text-black font-semibold rounded-full" onClick={() => { dispatch(getlanguage()); localStorage.setItem("language", "kr") }}>
                        한국어
                      </button>
                    </div>
                    <div className="block sm:hidden">
                      <button className="w-[35px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border flex items-center justify-center text-black font-semibold rounded-full" onClick={() => { dispatch(getlanguage()); localStorage.setItem("language", "kr") }}>
                        Ko
                      </button>
                    </div>
                  </div>

                }
              </div>
            </div>

          </div >
        </div >
      </div>

      {/* Giao diện Header trên máy tính bảng và laptop */}
      <div className="block sm:hidden">
        <div className=" w-full h-[100px] bg-white flex xs:px-[5px] sm:px-[30px]">
          {/* logo */}
          <div className="xs:w-[50px] sm:w-[100px] flex items-center justify-center cursor-pointer">
            <div className="hidden sm:block">
              <Link
                to={`/`}
                className="w-[100px] flex items-center justify-center cursor-pointer"
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-auto"
                />
              </Link>
            </div>
            <div className="block sm:hidden">
              <Link
                to={`/`}
                className="w-[65px] flex items-center justify-center cursor-pointer"
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-auto"
                />
              </Link>
            </div>
          </div>

          {/* Đăng nhập 19 tuổi*/}
          {!User ? (
            <div className="w-auto h-full flex justify-center">
              <button
                onClick={openLogin19Modal}
                className="flex items-center justify-center"
              >
                <div className="w-[20px] h-[20px] rounded-full border-2 text-[12px] font-semibold hover:shadow-md flex items-center justify-center">
                  19
                </div>
                <div className="border h-[5px] bg-gray-500 w-[15px] rounded-r-full" />
              </button>
              {isLogin19Modal && <LoginPage closeModal={closeLogin19Modal} />}
            </div>
          ) : !check19Modal ? (
            <div className="w-auto h-full flex justify-center">
              <button
                className="flex items-center justify-center"
                onClick={() => { open19AgeModal(); }}
              >
                <div className="w-[20px] h-[20px] rounded-full border-2 text-[12px] font-semibold hover:shadow-md flex items-center justify-center">
                  19
                </div>
                <div className="border h-[5px] bg-gray-500 w-[15px] rounded-r-full" />
              </button>
              {is19AgeModal && <Login19AgePage closeModal={close19AgeModal} check={true} />}
            </div>
          ) : (
            <div className="w-auto h-full flex justify-center">
              <button
                className="flex items-center justify-center"
                onClick={() => { open19AgeModal(); }}
              >
                <div className="border h-[5px] bg-gray-500 w-[15px] rounded-l-full" />
                <div className="w-[20px] h-[20px] rounded-full border-2 text-[12px] font-semibold hover:shadow-md flex items-center justify-center">
                  19
                </div>
              </button>

              {is19AgeModal && <Login19AgePage closeModal={close19AgeModal} check={false} />}
            </div>
          )}

          {/* danh mục */}
          <div className="w-auto flex items-center xs:mx-2 sm:mx-5 overflow-x-auto">
            <ul className="flex overflow-x-auto gap-5 whitespace-nowrap">
              <Link to={`/originals`}>
                <li
                  className={`uppercase font-semibold text-lg cursor-pointer ${location.pathname.includes("/originals")
                    ? "text-yellow-500"
                    : "hover:text-yellow-500"
                    }`}
                >
                  {!language ? <span> Originals </span> : <span> 오리지널 </span>}
                </li>
              </Link>
              <Link to={`/videos`}>
                <li
                  className={`uppercase font-semibold text-lg cursor-pointer ${location.pathname.includes("/videos")
                    ? "text-yellow-500"
                    : "hover:text-yellow-500"
                    }`}
                >
                  {!language ? <span> Videos </span> : <span> 비디오 </span>}
                </li>
              </Link>
              <Link to={`/genres`}>
                <li
                  className={`uppercase font-semibold text-lg cursor-pointer ${location.pathname.includes("/genres")
                    ? "text-yellow-500"
                    : "hover:text-yellow-500"
                    }`}
                >
                  {!language ? <span> Genres </span> : <span> 장르 </span>}
                </li>
              </Link>
              <Link to={`/popular`}>
                <li
                  className={`uppercase font-semibold text-lg cursor-pointer ${location.pathname.includes("/popular")
                    ? "text-yellow-500"
                    : "hover:text-yellow-500"
                    }`}
                >
                  {!language ? <span> Popular </span> : <span> 인기 </span>}
                </li>
              </Link>
            </ul>
          </div>


          {/* Chức năng  */}
          <div className="flex items-center justify-center ml-auto xs:gap-1 sm:gap-3">

            {/* chức năng nút Publish và Login*/}
            {!User ?

              // Chưa đăng nhập tài khoản
              <div className="flex xs:gap-1 sm:gap-3">

                {/* Chức năng Publish */}
                < div className="flex items-center justify-center z-10">
                  <div className="hidden lg:block">
                    <button
                      className="xs:w-[50px] sm:w-[100px] xs:h-[20px] sm:h-[35px] bg-black rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-white flex items-center justify-center"
                      onClick={() => { openLoginModal(); handleCloseAccount(); }}
                    >
                      {!language ? <span> Publish </span> : <span> 발행</span>}
                    </button>

                  </div>
                  <div className="block lg:hidden">
                    <button
                      className="w-[35px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border flex items-center justify-center text-black font-semibold rounded-full"
                      onClick={() => { openLoginModal(); handleCloseAccount(); }}
                    >
                      <BackupIcon />
                    </button>
                  </div>
                  {isLoginModal && <LoginPage closeModal={closeLoginModal} />}
                </div>

                {/* Đăng nhập */}
                <div className="flex items-center justify-center">
                  <div className="hidden lg:block">
                    <button
                      className="xs:w-[50px] sm:w-[100px] xs:h-[20px] sm:h-[35px] bg-gray-50 hover:bg-gray-100 border rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-gray-500"
                      onClick={() => { openLoginModal(); handleCloseAccount(); }}
                    >
                      {!language ? <span> Log In </span> : <span> 로그인 </span>}
                    </button>

                  </div>
                  <div className="block lg:hidden">
                    <button
                      className="w-[35px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border flex items-center justify-center text-black font-semibold rounded-full"
                      onClick={() => { openLoginModal(); handleCloseAccount(); }}
                    >
                      <ExitToAppSharpIcon />
                    </button>
                  </div>

                  {isLoginModal && <LoginPage closeModal={closeLoginModal} />}
                </div>
              </div>
              :
              // Đã đăng nhập tài khoản
              <div className="flex xs:gap-1 sm:gap-3">

                {/* Menu Publish */}
                <div className="flex items-center justify-center z-10">
                  <button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <div className="hidden lg:block">
                      <span
                        className="w-[100px] h-[35px] bg-black rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-white flex items-center justify-center">
                        {!language ? <span> Publish </span> : <span> 발행 </span>}
                      </span>
                    </div>
                    <div className="block lg:hidden">
                      <span
                        className="w-[35px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border flex items-center justify-center text-black font-semibold rounded-full">
                        <BackupIcon />
                      </span>
                    </div>
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
                              <Link to={`/publish/original`} onClick={() => dispatch(setcurrentStepOriginal(1))}>
                                <MenuItem onClick={handleClose} className="flex gap-x-1">
                                  <PictureAsPdfOutlinedIcon />

                                  {!language ? <span> Original </span> : <span> 원본 </span>}

                                </MenuItem>
                              </Link>

                              <Link to={`/publish/video`} onClick={() => dispatch(setcurrentStepVideo(1))}>
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

                <div className="w-full flex items-center justify-center z-10">
                  <button
                    ref={anchorAccountRef}
                    id="composition-button"
                    aria-controls={openAccount ? 'composition-menu' : undefined}
                    aria-expanded={openAccount ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggleAccount}
                  >
                    <div className="w-full hidden lg:block">
                      <span className="w-full h-[35px] px-2 py-1 bg-gray-50 hover:bg-gray-100 border rounded-full font-semibold xs:text-[10px] sm:text-[10px] md:text-lg text-gray-500">
                        {auth?.currentUser.displayName}
                      </span>
                    </div>
                    <div className="block lg:hidden">
                      <span className="w-[35px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border flex items-center justify-center text-black rounded-full">
                        <AccountCircleSharpIcon />
                      </span>
                    </div>
                  </button>
                  {/* Chọn menu Account*/}
                  <Popper
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
                              <Link to={`/subscribed`}>
                                <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                                  <GroupAddIcon />
                                  {!language ? <span> Subscribed </span> : <span> 구독 중 </span>}
                                </MenuItem>
                              </Link>

                              <Link to={`/dashboard`}>
                                <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                                  <PieChartIcon />
                                  {!language ? <span> Dashboard </span> : <span> 대시보드 </span>}
                                </MenuItem>
                              </Link>

                              <Link to={`/mycomment`}>
                                <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                                  <CommentIcon />
                                  {!language ? <span> Comments </span> : <span> 댓글 </span>}
                                </MenuItem>
                              </Link>

                              <Link to={`/creators`}>
                                <MenuItem onClick={handleCloseAccount} className="flex gap-x-3">
                                  <EditNoteIcon />
                                  {!language ? <span> Creators </span> : <span> 창작자 </span>}
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

                              <MenuItem onClick={() => logouts()} className="flex gap-x-3">
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
            <div className="flex items-center xs:gap-2 sm:gap-3">

              {/* Chức năng tìm kiếm */}
              <div className="w-full h-full">
                <div className="hidden sm:block">
                  <button
                    className="w-[35px] h-[35px] bg-gray-50 hover:bg-gray-100 border rounded-full text-gray-500 flex items-center justify-center"
                    onClick={openSearchModal}
                  >
                    <SearchIcon sx={{ fontSize: 18 }} />
                  </button>
                </div>
                <div className="block sm:hidden">
                  <button
                    className="w-[35px] h-[35px] bg-gray-50 hover:bg-gray-100 border rounded-full text-gray-500 flex items-center justify-center"
                    onClick={openSearchModal}
                  >
                    <SearchIcon sx={{ fontSize: 18 }} />
                  </button>
                </div>

                {isSearchModal && <SearchPage closeModal={closeSearchModal} />}
              </div>

              {/* Nút chuyển ngữ */}
              <div className="w-full h-full">
                {!language ?
                  <div>
                    <div className="hidden sm:block">
                      <button className="w-[80px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border text-black font-semibold rounded-full" onClick={() => { dispatch(getlanguage()); localStorage.setItem("language", "en") }}>
                        English
                      </button>
                    </div>
                    <div className="block sm:hidden">
                      <button className="w-[35px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border flex items-center justify-center text-black font-semibold rounded-full" onClick={() => { dispatch(getlanguage()); localStorage.setItem("language", "en") }}>
                        En
                      </button>
                    </div>
                  </div>
                  :
                  <div>
                    <div className="hidden sm:block">
                      <button className="w-[80px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border text-black font-semibold rounded-full" onClick={() => { dispatch(getlanguage()); localStorage.setItem("language", "kr") }}>
                        한국어
                      </button>
                    </div>
                    <div className="block sm:hidden">
                      <button className="w-[35px] h-[35px] px-2 bg-gray-50 hover:bg-gray-100 border flex items-center justify-center text-black font-semibold rounded-full" onClick={() => { dispatch(getlanguage()); localStorage.setItem("language", "kr") }}>
                        Ko
                      </button>
                    </div>
                  </div>

                }
              </div>
            </div>

          </div >
        </div >
      </div>
    </>

  );
};

export default HeaderPage;
