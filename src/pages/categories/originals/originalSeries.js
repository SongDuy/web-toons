import React, { useEffect, useState } from 'react';

import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/Check';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { useParams } from 'react-router-dom';
import { getchaptersComic, getidComic } from '../../../common/store/comic';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Rating from '@mui/material/Rating';
import { auth } from '../../../common/themes/firebase';
import SubscribeFireBase from '../../../common/services/Subscribe.services';
import comicFireBase from '../../../common/services/Comic.services';
import RateFireBase from '../../../common/services/Rate.services';

const dataAlsoLike = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 6, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 8, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
];


const OriginalSeriesPage = () => {
    const id = useParams();
    const comicid = useSelector(state => state.comic.comicid);
    const chapters = useSelector(state => state.comic.Chapters);
    const [loading, setloading] = useState(false);
    const [isSubscribe, setIsSubscribe] = useState(false);
    const [Subscribe, setSubscribe] = useState([[]]);
    const language = useSelector(state => state.hidden.language);
    const [Rate, setRate] = useState(0);
    const dispatch = useDispatch();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    useEffect(() => {
        const get = async () => {
            try {
                setloading(false)
                const comicID = await dispatch(getidComic(id.id))
                const chap = await dispatch(getchaptersComic(id.id))
                unwrapResult(comicID)
                unwrapResult(chap)
                setloading(true)
                if (auth.currentUser) {
                    const subscribe = await SubscribeFireBase.getbycomic(auth.currentUser.uid, id.id)
                    const rateuser = await RateFireBase.getbyid(auth.currentUser.uid, id.id)
                    setRate(rateuser.success ? rateuser.rate[0].rate : 0);
                    subscribe.success ? setIsSubscribe(true) : setIsSubscribe(false)
                    subscribe.success ? setSubscribe(subscribe.subscribe) : setSubscribe([])
                }
            } catch (error) {
            }
        }
        get()
    }, [dispatch, id]);

    //Mở modal menu để chọn
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

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    // Nhấn nút đăng ký Subscribe

    const handlesubscribe = async () => {
        try {

            if (auth.currentUser) {
                await SubscribeFireBase.Add({ uid: auth.currentUser.uid, idcomic: id.id, createTime: new Date(Date.now()) })
                await comicFireBase.update({ totalSubscribed: comicid.totalSubscribed + 1 }, id.id)
                await dispatch(getidComic(id.id))

                const subscribe = await SubscribeFireBase.getbycomic(auth.currentUser.uid, id.id)

                subscribe.success ? setIsSubscribe(true) : setIsSubscribe(false)
                subscribe.success ? setSubscribe(subscribe.subscribe) : setSubscribe([])
            }
        } catch (error) {
        }
    }
    const handleDeleteSub = async () => {
        try {
            if (auth.currentUser) {
                await SubscribeFireBase.Delete(Subscribe[0].id)
                await comicFireBase.update({ totalSubscribed: comicid.totalSubscribed - 1 }, id.id)
                await dispatch(getidComic(id.id))
                const subscribe = await SubscribeFireBase.getbycomic(auth.currentUser.uid, id.id)
                subscribe.success ? setIsSubscribe(true) : setIsSubscribe(false)
                subscribe.success ? setSubscribe(subscribe.subscribe) : setSubscribe([])
            }
        } catch (error) {

        }
    }

    const handleRate = async (event, newValue) => {
        if (auth.currentUser) {
            setRate(newValue);
            try {
                const rateuser = await RateFireBase.getbyid(auth.currentUser.uid, id.id)

                if (!rateuser.success) {
                    await RateFireBase.Add({
                        createTime: new Date(Date.now()),
                        idcomic: id.id,
                        uid: auth.currentUser.uid,
                        rate: newValue
                    })
                    const comicrate = await RateFireBase.getbycomic(id.id)
                    const averageRating = comicrate.success ? (comicrate.rate.reduce((accumulator, currentValue) => accumulator + currentValue.rate, 0) / comicrate.rate.length) * 2 : 0;
                    await comicFireBase.update({ rate: averageRating }, id.id)
                    const idcomic = await dispatch(getidComic(id.id))
                    unwrapResult(idcomic)
                } else {
                    await RateFireBase.update({ rate: newValue, createTime: new Date(Date.now()) }, rateuser.rate[0].id)
                    const comicrate = await RateFireBase.getbycomic(id.id)
                    const averageRating = comicrate.success ? (comicrate.rate.reduce((accumulator, currentValue) => accumulator + currentValue.rate, 0) / comicrate.rate.length) * 2 : 0;
                    await comicFireBase.update({ rate: averageRating }, id.id)
                    const idcomic = await dispatch(getidComic(id.id))
                    unwrapResult(idcomic)
                }
            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <div>
            {loading ?
                <div className="w-full h-full bg-gradient-to-b from-white via-yellow-50 to-gray-100">
                    {/* Hiển thị ảnh nền */}
                    <div className="w-full flex items-center justify-center">
                        <div className="w-[1200px] h-[320px] relative ">

                            <img src={comicid.horizontalThumbnail}
                                className="object-cover w-full h-full rounded-t" alt="img"
                            />

                            {/* Hiện thị tiêu đề và tác giả truyện */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[1200px] overflow-hidden">
                                    <span className="font-semibold text-xl text-black text-shadow-white flex items-center justify-center">
                                        {comicid.genre1},{comicid.genre2}
                                    </span>

                                    <span className="max-h-[190px] px-[100px] font-semibold my-5 text-[50px] text-white text-shadow-black leading-[1.3] line-clamp-3 flex justify-center">
                                        {comicid.title}
                                    </span>

                                    <Link to={`/channel/creator/${comicid.uid}`}>
                                        <div className="w-full flex items-center justify-center gap-2">
                                            <div className="w-[250px] px-2 rounded-md overflow-hidden flex items-center justify-center gap-2">
                                                <span className="text-lg font-semibold text-yellow-500 hover:text-yellow-600 text-shadow-black line-clamp-1">
                                                    {comicid.Author}
                                                </span>
                                                <button className="w-[20px] h-[20px] bg-white rounded-full text-black flex items-center justify-center">
                                                    i
                                                </button>
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                            </div>

                            {/* Nút đăng ký theo dõi */}
                            <div className="absolute px-10 py-5 bottom-0 right-0 flex gap-2">
                                {!isSubscribe ?
                                    <button
                                        onClick={handlesubscribe}
                                        className="text-white hover:text-yellow-500 bg-black bg-opacity-30 py-2 px-2 rounded-full flex gap-1 items-center justify-center"
                                    >
                                        <AddCircleOutlineIcon />
                                        {!language ? <span> Subscribe </span> : <span> 구독하다 </span>}
                                    </button>
                                    :
                                    <button
                                        onClick={handleDeleteSub}
                                        className="text-white hover:text-yellow-500 bg-black bg-opacity-30 py-2 px-2 rounded-full flex gap-1 items-center justify-center"
                                    >
                                        <CheckIcon />
                                    </button>
                                }
                            </div>

                        </div>
                    </div>

                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-[1200px] h-full grid grid-cols-3 bg-white pt-6 pb-10 rounded-b">

                            <div className="col-span-2 h-full">
                                <div className="w-full px-5 pb-3 font-semibold text-md">
                                    {!language ? <span> Original Series Episodes </span> : <span> 시리즈 오리지널 </span>}
                                </div>
                                <div className="w-full h-[900px] px-3 custom-scrollbar">

                                    {/* danh sach series */}
                                    <ul className="w-full h-full ">

                                        {/* khung danh sách */}
                                        {chapters.chaps?.map(item => (
                                            <Link to={`/originals/original/series/display/${id.id}/${item.id}`} key={item.id}>
                                                <li
                                                    className="w-full h-[90px] border-b rounded-lg cursor-pointer hover:bg-gray-100 px-2"
                                                >
                                                    <div className="w-full h-full flex items-center">
                                                        <div className="w-[80px] h-[80px]">
                                                            <img
                                                                src={item.horizontalThumbnail}
                                                                alt="img"

                                                                className="object-fill w-full h-full rounded-md"
                                                            />
                                                        </div>

                                                        <div className="w-[350px] mr-auto ml-3 overflow-hidden">
                                                            <span className="text-black text-md leading-[1.2] line-clamp-2">
                                                                {item.chapterTitle}
                                                            </span>
                                                        </div>

                                                        <div className="ml-auto">
                                                            <span className="text-gray-400 text-md">
                                                                {monthNames[new Date(item.createTime).getMonth()]} {new Date(item.createTime).getDate()},
                                                                {new Date(item.createTime)?.getFullYear()}

                                                            </span>
                                                        </div>

                                                        <div className="ml-auto flex gap-1">
                                                            <span className="text-gray-400">
                                                                <FavoriteBorderSharpIcon />
                                                            </span>
                                                            <span className="text-gray-400 text-md line-clamp-1">
                                                                {item.likes}
                                                            </span>
                                                        </div>

                                                        <div className="ml-auto">
                                                            <span className="text-gray-400 text-md line-clamp-1">
                                                                {item.num}#
                                                            </span>
                                                        </div>
                                                    </div>

                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                </div>

                            </div>

                            <div className="h-full px-5">

                                <div className="w-full mb-auto">
                                    <ul className="grid grid-cols-4 gap-5">
                                        <li className="flex items-center justify-center">
                                            <span className="mx-1 text-yellow-500">
                                                <VisibilityIcon />
                                            </span>
                                            <span className="mx-1">
                                                8.5M
                                            </span>
                                        </li>
                                        <li className="flex items-center justify-center" >
                                            <span className="mx-1 text-yellow-500">
                                                <GroupAddSharpIcon />
                                            </span>
                                            <span className="mx-1">
                                                {comicid.totalSubscribed}
                                            </span>
                                        </li>
                                        <li className="flex items-center justify-center" >
                                            <span className="mx-1 text-yellow-500">
                                                <StarIcon />
                                            </span>
                                            <span className="mx-1">
                                                {comicid.rate}
                                            </span>

                                        </li>

                                        {/* Nút đánh giá xếp hạng Truyện */}
                                        <li className="flex items-center justify-center">
                                            <button
                                                className="w-[70px] h-[25px] rounded-full text-white bg-yellow-500 flex items-center justify-center"
                                                ref={anchorRef}
                                                id="composition-button"
                                                aria-controls={open ? 'composition-menu' : undefined}
                                                aria-expanded={open ? 'true' : undefined}
                                                aria-haspopup="true"
                                                onClick={handleToggle}
                                            >
                                                {!language ?
                                                    <span>
                                                        RATE
                                                    </span>
                                                    :
                                                    <span>
                                                        비율
                                                    </span>
                                                }
                                            </button>

                                            {/* Chọn đánh giá */}
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
                                                            <ClickAwayListener onClickAway={handleClose} >
                                                                <MenuList
                                                                    autoFocusItem={open}
                                                                    id="composition-menu"
                                                                    aria-labelledby="composition-button"
                                                                    onKeyDown={handleListKeyDown}
                                                                >
                                                                    <MenuItem onClick={handleClose}><ClickAwayListener onClickAway={handleClose}>
                                                                        <Rating
                                                                            name="half-rating-read"
                                                                            defaultValue={parseInt(Rate)}
                                                                            precision={0.5}
                                                                            onChange={handleRate}
                                                                        />
                                                                    </ClickAwayListener></MenuItem>
                                                                </MenuList>
                                                            </ClickAwayListener>
                                                        </Paper>
                                                    </Grow>
                                                )}
                                            </Popper>
                                        </li>

                                    </ul>
                                </div>

                                <div className="w-full h-full">

                                    <div className="flex gap-3 pt-5 pb-3">
                                        <span className="w-[35px] h-[35px] uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                            Up
                                        </span>
                                        <span className="text-xl font-semibold flex items-center">
                                            EVERY MONDAY
                                        </span>
                                    </div>
                                    <div className="w-full">
                                        <span className="">
                                            {comicid.summary}
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Phần hiển thị nội dung có thể bạn sẽ thích */}
                    <div className="w-full h-full  py-10 flex items-center justify-center">
                        <div className="w-[1200px] h-full ">
                            <div className="text-xl font-semibold">
                                {!language ? <span> You may also like </span> : <span> 당신은 또한 좋아할 수도 있습니다 </span>}
                            </div>
                            <div className="w-full min-h-[160px] bg-white my-5 px-5 py-5 rounded-md">
                                <ul className="w-full h-full grid grid-cols-3 gap-3">

                                    {/* khung danh sách */}
                                    {dataAlsoLike.map(item => (
                                        <Link to={`/originals/original/series`} key={item.id}>
                                            <li
                                                className="w-[375px] h-[120px] flex bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200"
                                            >

                                                <div className="w-[120px] h-[120px] rounded flex items-center justify-center">
                                                    <img
                                                        src={item.img}
                                                        alt="img"
                                                        className="object-fill w-[100px] h-[100px] rounded"
                                                    />
                                                </div>

                                                <div className="h-full rounded-xl px-3 py-3">
                                                    <div className="w-[230px] h-[75px] overflow-hidden">
                                                        <span className="w-full text-lg font-semibold leading-[1.2] line-clamp-2">
                                                            {item.name}
                                                        </span>
                                                        <span className="w-full line-clamp-1">
                                                            {item.auth}
                                                        </span>
                                                    </div>

                                                    <div className="w-full">
                                                        <span className=" flex gap-1 text-yellow-500">
                                                            <VisibilityIcon />
                                                            {item.look}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                    <CircularProgress />
                </Box>}
        </div>

    );
}

export default OriginalSeriesPage;
