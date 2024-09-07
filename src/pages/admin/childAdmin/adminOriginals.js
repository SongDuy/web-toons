import React,{useEffect,useState} from 'react';


import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LockClockIcon from '@mui/icons-material/LockClock';
import { useSelector,useDispatch} from 'react-redux';
import { getAlladComic } from '../../../common/store/comic';
import { unwrapResult } from '@reduxjs/toolkit';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import comicFireBase from '../../../common/services/Comic.services';


const AdminOriginalsPage = () => {
    const comic = useSelector(state => state.comic.comic);
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {    

        const get=async ()=>{
            try {
                setloading(false)
                const lg=await dispatch(getAlladComic())
              unwrapResult(lg)
              
                setloading(true)
            } catch (error) {
                
            }
        }
        get()
    }, [dispatch]);
    const handlelock=async (id,lock)=>{
        try {
            let result = window.confirm(`Do you want to ${lock?"lock":"Unlocked"} this comic?`);
            if(result){
            setloading(false)

      await comicFireBase.update({lock:!lock},id)
           const lg=await dispatch(getAlladComic())
           unwrapResult(lg)
           setloading(true)
            }
        } catch (error) {
            
        }
    }
    const handledelete=async (id)=>{
        try {
            let result = window.confirm("Do you want to delete this comic?");
            if(result){
            setloading(false)

      await comicFireBase.Delete(id)
           const lg=await dispatch(getAlladComic())
           unwrapResult(lg)
           setloading(true)
            }
        } catch (error) {
            
        }
    }
    return (
        <>
         {loading?
        <div className="w-full h-[600px] py-5 bg-white custom-scrollbar">
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
                    {comic.comic?.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                                {item.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center text-gray-500">
                                <img
                                    src={item.squareThumbnail}
                                    alt="img"
                                    className="object-fill w-[100px] h-[100px] rounded-md"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {item.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {item.schedule}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                            {new Date(item.createTime).getDate()}/{new Date(item.createTime).getMonth()+1}/
                                                        {new Date(item.createTime)?.getFullYear()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                <button className="w-[35px] h-[35px] text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                                    <RemoveRedEyeIcon />
                                </button>

                                <button onClick={()=>handlelock(item.id,item.lock)} className={`w-[35px] h-[35px] ${item.lock? "text-blue-500":"text-red-500"} mx-1 bg-gray-100 hover:bg-gray-200 rounded-full`}>
                                    <LockClockIcon />
                                </button>

                                <button onClick={()=>handledelete(item.id)} className="w-[35px] h-[35px] text-red-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                                    <DeleteIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
: <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',margin:5 }}>
<CircularProgress />
</Box>}
        </>
    );
}

export default AdminOriginalsPage;
