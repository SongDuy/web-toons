import React, { useEffect, useState } from 'react';


import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LockClockIcon from '@mui/icons-material/LockClock';
import { useSelector, useDispatch } from 'react-redux';
import { getAlladComic } from '../../../common/store/comic';
import { unwrapResult } from '@reduxjs/toolkit';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import comicFireBase from '../../../common/services/Comic.services';
import { useNavigate } from 'react-router-dom';
import CheckIcon from "@mui/icons-material/Check";
import RateFireBase from '../../../common/services/Rate.services';
import SubscribeFireBase from '../../../common/services/Subscribe.services';
import CommentFireBase from '../../../common/services/Comment.services';


const AdminOriginalsPage = () => {
    const comic = useSelector(state => state.comic.comic);
    const [Comics, setComics] = useState([]);
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Hiển thị nội dung giống nội dung cần tìm
    const [searchTerm, setSearchTerm] = useState('');
    const days = [
        { day: 'Mon', daysInKorean: '월요일' },
        { day: 'Tue', daysInKorean: '화요일' },
        { day: 'Wed', daysInKorean: '수요일' },
        { day: 'Thu', daysInKorean: '목요일' },
        { day: 'Fri', daysInKorean: '금요일' },
        { day: 'Sat', daysInKorean: '토요일' },
        { day: 'Sun', daysInKorean: '일요일' }
      ];

    useEffect(() => {

        const get = async () => {
            try {
                setloading(false)
                const lg = await dispatch(getAlladComic())
                const getcomic = unwrapResult(lg)
                setComics(getcomic.success ? getcomic?.comic : [])
                setloading(true)
            } catch (error) {

            }
        }
        get()
    }, [dispatch]);
    const handlelock = async (id, lock) => {
        try {
            let result = window.confirm( ` ${lock ? "이 만화를 잠그고 싶으신가요?" : "이 만화를 풀고 싶으신가요?"}`);
            if (result) {
                setloading(false)

                await comicFireBase.update({ lock: !lock }, id)
                const lg = await dispatch(getAlladComic())
                const getcomic = unwrapResult(lg)
                setComics(getcomic.success ? getcomic?.comic : [])
                setloading(true)
            }
        } catch (error) {

        }
    }
    const handledelete = async (id) => {
        try {
            let result = window.confirm("이 만화를 삭제하시겠습니까?");
            if (result) {
                setloading(false)

                await comicFireBase.Delete(id)
                await RateFireBase.DeleteComic(id)
                await SubscribeFireBase.DeleteComic(id)
                await CommentFireBase.DeleteComic(id)
                const lg = await dispatch(getAlladComic())
                const getcomic = unwrapResult(lg)
                setComics(getcomic.success ? getcomic?.comic : [])
                setloading(true)
            }
        } catch (error) {

        }
    }
    const handlecheck = async (id, check) => {
        try {
            // let result = window.confirm(`Do you want to ${check ? "check" : "Unlocked"} this comic?`);
            // if (result) {
                setloading(false)

                await comicFireBase.update({ check: !check }, id)
                const lg = await dispatch(getAlladComic())
                const getcomic = unwrapResult(lg)
                setComics(getcomic.success ? getcomic?.comic : [])
                setloading(true)
            // }
        } catch (error) {

        }
    }
    const handleSearch = () => {
        if (searchTerm === "") {
            console.log(comic?.comic)
            setComics(comic?.comic)

        }
        const filteredTop30Films = comic.comic?.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setComics(filteredTop30Films)
    };
    return (
        <>
            {loading ?
                <div className="w-full h-[600px] pb-5 bg-white custom-scrollbar">

                    {/* Ô tìm kiếm */}
                    <div className="w-full flex justify-end">
                        <input
                            className="w-[250px] h-[35px] px-2 border-2 rounded-l"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            placeholder="검색..."
                        />

                        <button onClick={handleSearch} className="w-[100px] h-[35px] mb-3 mr-3 text-white font-semibold relative bg-black rounded-r">
                            검색
                        </button>
                    </div>

                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr className="w-full">
                                <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">ID</th>
                                <th className="w-[250px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">이미지</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">오리지널 이름</th>
                                <th className="w-[100px] px-4 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">사용자 ID</th>
                                <th className="w-[200px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">스케쥴</th>
                                <th className="w-[100px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">생성일</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">관리</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Comics?.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                                        {item.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center text-gray-500">
                                        <img
                                            src={item.squareThumbnail}
                                            alt="img"
                                            className="object-fill min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] rounded-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {item.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {item.uid}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        { days?.find(it => it.day === item.schedule)?.daysInKorean}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {new Date(item.createTime).getDate()}/{new Date(item.createTime).getMonth() + 1}/
                                        {new Date(item.createTime)?.getFullYear()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        <button onClick={() => navigate(`/admin/originals/${item.id}`)} className="w-[35px] h-[35px] text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                                            <RemoveRedEyeIcon />
                                        </button>
                                        <button onClick={() => handlecheck(item.id, item.check)} className={`w-[35px] h-[35px] ${item.check ? "text-blue-500" : "text-red-500"} mx-1 bg-gray-100 hover:bg-gray-200 rounded-full`}>
                                            <CheckIcon />
                                        </button>

                                        <button onClick={() => handlelock(item.id, item.lock)} className={`w-[35px] h-[35px] ${item.lock ? "text-blue-500" : "text-red-500"} mx-1 bg-gray-100 hover:bg-gray-200 rounded-full`}>
                                            <LockClockIcon />
                                        </button>

                                        <button onClick={() => handledelete(item.id)} className="w-[35px] h-[35px] text-red-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                                            <DeleteIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                    <CircularProgress />
                </Box>}
        </>
    );
}

export default AdminOriginalsPage;
