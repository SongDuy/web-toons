import React,{useEffect,useState} from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getAllComic } from '../../../common/store/comic';

const Loading = ({children}) => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    useEffect(() => {
        const get=async ()=>{
            try {
                setloading(false)
                const lg=await dispatch(getAllComic())
              unwrapResult(lg)
                setloading(true)
            } catch (error) {
                
            }
        }
        get()
    }, [dispatch]);
    return (
        <div>
            {loading?children:  <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',margin:5 }}>
      <CircularProgress />
    </Box>
            
}           
        </div>
    );
}

export default Loading;
