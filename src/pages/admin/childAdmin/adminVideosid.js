import React, { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import VideoFireBase from '../../../common/services/Video.services';
import { getchaptersadVideo } from '../../../common/store/Video';
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const AdminVideosPageid = () => {
    const chapters = useSelector(state => state.Video.Chapters);
    const [Chapters, setChapters] = useState([]);
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {

        const get = async () => {
            try {
                setloading(false)
                const chap = await dispatch(getchaptersadVideo(id.id))
                const chaps=  unwrapResult(chap)
                setChapters(chaps?.success?chaps?.chaps:[])
                setloading(true)
            } catch (error) {

            }
        }
        get()
    }, [dispatch, id]);

    const handledelete = async (idchap) => {
        try {
            let result = window.confirm("Do you want to delete this chap video?");
            if (result) {
                setloading(false)

                await VideoFireBase.Deletechap(id.id, idchap)
                const chap = await dispatch(getchaptersadVideo(id.id))
                const chaps=  unwrapResult(chap)
                setChapters(chaps?.success?chaps?.chaps:[])               
                
                setloading(true)
            }
        } catch (error) {

        }
    }
    const handlecheck = async (idchap, check) => {
        try {
            let result = window.confirm(`Do you want to ${check ? "Check" : "Uncheck"} this Video?`);
            if (result) {
                setloading(false)

                await VideoFireBase.updateep({ check: !check }, id.id, idchap)
                const chap = await dispatch(getchaptersadVideo(id.id))
                const chaps=  unwrapResult(chap)
                setChapters(chaps?.success?chaps?.chaps:[])
                setloading(true)
            }
        } catch (error) {

        }
    }
    const handleSearch = () => {
        if(searchTerm===""){
            setChapters(chapters?.chaps)
    
        }
    const filteredTop30Films =chapters?.chaps?.filter(item =>
        item.chapterTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setChapters(filteredTop30Films)
    };
    return (
        <>
            {loading ?
                <div className="w-full h-[600px] pb-5 bg-white custom-scrollbar">

                    {/* Ô tìm kiếm */}
                    <div className="w-full flex justify-end">

                        <input
                            className="w-[250px] h-[35px] px-2 border-2 rounded-l"
                            onChange={(e)=>   setSearchTerm(e.target.value)}
                            value={searchTerm}
                            placeholder="Search..."
                        />

                        <button onClick={handleSearch}  className="w-[100px] h-[35px] mb-3 mr-3 text-white font-semibold relative bg-black rounded-r">
                            Search
                        </button>
                    </div>

                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr className="w-full">
                                <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">ID</th>
                                <th className="w-[150px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Image</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Videos Name</th>
                                <th className="w-[100px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">ID User</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Date created</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Manager</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Chapters?.map((item) => (
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
                                        <button onClick={() => navigate(`/admin/videos/${id.id}/${item.id}`)} className="w-[35px] h-[35px] text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
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

export default AdminVideosPageid;
