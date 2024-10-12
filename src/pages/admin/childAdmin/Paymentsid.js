import React, { useEffect, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PaymentFireBase from '../../../common/services/Payment.services';
import userFireBase from '../../../common/services/User.services';
import VideoFireBase from '../../../common/services/Video.services';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const AdminPaymentsPageid = () => {
    const [paymentid, setpaymentid] = useState([]);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const id = useParams();
    useEffect(() => {

        const get = async () => {
            try {
                setloading(false)
              const paymentid= await  PaymentFireBase.getbyid(id?.id)
              if(paymentid.success){
                const user=await userFireBase.getbyid(paymentid.uid)
              const Video=await VideoFireBase.getbyid(paymentid.idseries)
              setpaymentid({...paymentid,...user,...Video,createTime:paymentid?.createTime})
              }
                setloading(true)
            } catch (error) {
console.log(error)
            }
        }
        get()
    }, [id]);

  
   
    return (
        <>
            {loading ?
                <div className="w-full h-[600px] pb-5 bg-white custom-scrollbar">

                  

                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr className="w-full">
                                <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">ID</th>
                                <th className="w-[150px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">이미지</th>
                                <th className="w-[200px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">비디오 이름</th>
                                <th className="w-[100px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">사용자 ID</th>
                                <th className="w-[100px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">관리자</th>

                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">생성일</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">관리</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            
                                <tr >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                                        {id.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center text-gray-500">
                                        <img
                                            src={paymentid.horizontalThumbnail}
                                            alt="img"
                                            className="object-fill w-[100px] h-[100px] rounded-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {paymentid.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {paymentid.uid}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {paymentid?.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {new Date(paymentid?.createTime).getDate()}/{new Date(paymentid?.createTime).getMonth() + 1}/
                                        {new Date(paymentid?.createTime)?.getFullYear()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        <button onClick={() => navigate(`/admin/payments/`)} className="w-[35px] h-[35px] text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                                            <ArrowBackIcon />
                                        </button>
                                       
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
                : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                    <CircularProgress />
                </Box>}
        </>
    );
}

export default AdminPaymentsPageid;
