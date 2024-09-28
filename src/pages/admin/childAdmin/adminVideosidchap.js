import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getchaptersVideo } from '../../../common/store/Video';

import { useParams } from 'react-router-dom';
import ReactPlayer from "react-player";

const AdminVideosPageidchap = () => {
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const id = useParams();
    const [chapid, setchapid] = useState([]);

    useEffect(() => {

        const get = async () => {
            try {
                setloading(false)
                const chap = await dispatch(getchaptersVideo(id.id));

                const chapid = unwrapResult(chap);
                setchapid(
                    chapid.success
                        ? chapid?.chaps.filter((item) => item.id === id.idseries)[0]
                        : []
                );
                setloading(true)
            } catch (error) {

            }
        }
        get()
    }, [dispatch, id]);


    return (
        <>
            {loading ?
                <div className="w-full h-[600px] py-5 bg-white custom-scrollbar">
                    <ReactPlayer
                        url={
                            chapid?.fileURL
                                ? chapid?.fileURL
                                : "https://www.youtube.com/watch?v=CnDNIEe7G0I"
                        }
                        controls={true}
                        width="80%"
                        height="100%"
                    />
                </div>
                : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                    <CircularProgress />
                </Box>}
        </>
    );
}

export default AdminVideosPageidchap;
