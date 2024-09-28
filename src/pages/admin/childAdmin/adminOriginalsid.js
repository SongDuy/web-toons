import React, { useEffect, useState } from 'react';


import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CheckIcon from "@mui/icons-material/Check";
import { useSelector, useDispatch } from 'react-redux';
import { getchaptersComic } from '../../../common/store/comic';
import { unwrapResult } from '@reduxjs/toolkit';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import comicFireBase from '../../../common/services/Comic.services';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminOriginalsidPage = () => {
    const id = useParams();
    const chapters = useSelector(state => state.comic.Chapters);
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        const get = async () => {
            try {
                setloading(false)
                const chap = await dispatch(getchaptersComic(id.id))
                unwrapResult(chap)

                setloading(true)
            } catch (error) {

            }
        }
        get()
    }, [dispatch, id.id]);
    const handlecheck = async (idchap, check) => {
        try {
            let result = window.confirm(`Do you want to ${check ? "Check" : "Uncheck"} this comic?`);
            if (result) {
                setloading(false)

                await comicFireBase.updateep({ check: !check }, id.id, idchap)
                const chap = await dispatch(getchaptersComic(id.id))
                unwrapResult(chap)
                setloading(true)
            }
        } catch (error) {

        }
    }
    const handledelete = async (idchap) => {
        try {
            let result = window.confirm("Do you want to delete this chap comic?");
            if (result) {
                setloading(false)

                await comicFireBase.Deletechap(id.id, idchap)
                const chap = await dispatch(getchaptersComic(id.id))
                unwrapResult(chap)
                setloading(true)
            }
        } catch (error) {

        }
    }
    return (
        <>
            {loading ?
                <div className="w-full h-[600px] pb-5 bg-white custom-scrollbar">

                    {/* Ô tìm kiếm */}
                    <div className="w-full flex justify-end">

                        <input
                            className="w-[250px] h-[35px] px-2 border-2 rounded-l"
                            // onChange={handleSearch}
                            placeholder="Search..."
                        />

                        <button className="w-[100px] h-[35px] mb-3 mr-3 text-white font-semibold relative bg-black rounded-r">
                            Search
                        </button>
                    </div>

                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr className="w-full">
                                <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">ID</th>
                                <th className="w-[150px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Image</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Originals Name</th>
                                <th className="w-[100px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">ID User</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Date created</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Manager</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {chapters?.chaps?.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                                        {item.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center text-gray-500">
                                        <img
                                            src={item.horizontalThumbnail}
                                            alt="img"
                                            className="object-fill w-[100px] h-[100px] rounded-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {item.chapterTitle}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {item.uid}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {new Date(item.createTime).getDate()}/{new Date(item.createTime).getMonth() + 1}/
                                        {new Date(item.createTime)?.getFullYear()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        <button onClick={() => navigate(`/admin/originals/${id.id}/${item.id}`)} className="w-[35px] h-[35px] text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                                            <RemoveRedEyeIcon />
                                        </button>

                                        <button onClick={() => handlecheck(item.id, item.check)} className={`w-[35px] h-[35px] ${item.check ? "text-blue-500" : "text-red-500"} mx-1 bg-gray-100 hover:bg-gray-200 rounded-full`}>
                                            <CheckIcon />
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

export default AdminOriginalsidPage;
