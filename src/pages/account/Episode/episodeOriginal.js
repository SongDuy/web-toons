import React, { useEffect, useState } from 'react';
import Nav from "../../../components/Account/nav";
import AddIcon from '@mui/icons-material/Add';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { Link } from "react-router-dom";
import { getchaptersComic } from '../../../common/store/comic';
import { unwrapResult } from '@reduxjs/toolkit';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import comicFireBase from '../../../common/services/Comic.services';
import { setcurrentStepOriginal } from '../../../common/store/hidden';

const EpisodeOriginal = () => {
    const id = useParams();
    const chapters = useSelector(state => state.comic.Chapters);
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
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
            {!loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <CircularProgress />
            </Box> :
                <div>
                    <Nav />
                    <div className="w-full h-full border bg-gray-100 flex items-center justify-center pb-10">
                        <div className="w-[1130px]  min-h-[550px]">
                            <div className="w-full h-full mt-4">
                                <div className="w-full h-full flex items-center">
                                    <h1 className="font-semibold text-xl">
                                        <Link to={`/dashboard`} className="hover:text-yellow-500">
                                            Original Series
                                        </Link>

                                        <NavigateNextIcon sx={{ fontSize: 30 }} />

                                        Episode Management
                                    </h1>

                                    <div className="ml-auto flex gap-5">
                                        <button onClick={() => navigate(`/publish/original/${id.id}`)} className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded-full shadow">
                                            <AddIcon />
                                            Add Episode
                                        </button>
                                    </div>

                                </div>

                                <div className="w-full h-full mt-4">
                                    <ul className="grid grid-cols-2 gap-4">

                                        {/* khung nội dung */}
                                        {chapters?.chaps?.map((item) => (
                                            <li className="w-full h-[210px] bg-white rounded flex shadow">
                                                <div className="w-[210px] h-[210px] bg-red-200 rounded">
                                                    <img
                                                        src={item.horizontalThumbnail}
                                                        alt="img"
                                                        className="w-full h-full object-fill rounded"
                                                    />
                                                </div>

                                                <div className="h-full px-3 py-3">
                                                    <div className="w-[320px]">
                                                        <div className="flex items-center">
                                                            <span className="text-gray-500">
                                                                {item.genre1}, {item.genre2}
                                                            </span>

                                                            <div className="flex ml-auto gap-2">
                                                                <button  onClick={() =>{ navigate(`/publish/original/${id.id}/${item.id}`);      dispatch(setcurrentStepOriginal(2)) }} className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                                                                    Edit
                                                                </button>

                                                                <button onClick={() => handledelete(item.id)} className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="w-full mt-2">
                                                            <h1 className="font-semibold text-xl">
                                                                {item.chapterTitle}
                                                            </h1>
                                                        </div>
                                                    </div>



                                                    <div className="w-full mt-12">

                                                        <div className="flex gap-5">
                                                            <span className="text-gray-500 text-sm flex gap-2">
                                                                Published  {monthNames[new Date(item.createTime).getMonth()]}{" "}
                                                                {new Date(item.createTime).getDate()},
                                                                {new Date(item.createTime)?.getFullYear()}
                                                            </span>

                                                            <span className="text-gray-500 text-sm">
                                                                Likes {item.likes}
                                                            </span>

                                                            <span className="text-gray-500 text-sm">
                                                                Views {item.views}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default EpisodeOriginal;
