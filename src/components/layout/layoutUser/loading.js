import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getAllComic } from '../../../common/store/comic';
import { getAllVideo } from '../../../common/store/Video';

const Loading = ({ children }) => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const get = async () => {
            try {
                setloading(false)
                const comic = await dispatch(getAllComic())
                const video = await dispatch(getAllVideo())
                unwrapResult(comic)
                unwrapResult(video)
                setloading(true)
            } catch (error) {

            }
        }
        get()
    }, [dispatch]);
    return (
        <div>
            {loading ? children : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <CircularProgress />
            </Box>

            }
        </div>
    );
}

export default Loading;
