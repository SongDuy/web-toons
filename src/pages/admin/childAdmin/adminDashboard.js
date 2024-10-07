import React,{ useEffect, useState } from 'react';
import comicFireBase from '../../../common/services/Comic.services';
import PaymentFireBase from '../../../common/services/Payment.services';
import userFireBase from '../../../common/services/User.services';

import VideoFireBase from '../../../common/services/Video.services';

const AdminDashboardPage = () => {
    const [lengthVideo, setlengthVideo] = useState(0);
    const [lengthComic, setlengthComic] = useState(0);
    const [lengthUsers, setlengthUsers] = useState(0);
const [lengthpayment, setlengthpayment] = useState(0);
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const countvideo=await VideoFireBase.getcountvideo()
                const countcomic=await comicFireBase.getcountcomic()
                const countusers=await userFireBase.getcountUsers()
                const countpayment=await PaymentFireBase.getcountpayments()
                setlengthpayment(countpayment)
                setlengthUsers(countusers)
                setlengthComic(countcomic)
                setlengthVideo(countvideo)
            } catch (error) {
              console.error("Error counting documents: ", error);
            }
          };
      
          fetchCount();
    }, []);
    return (
        <div className="w-full h-full py-5 bg-white">
            <div className="w-full flex items-center justify-center">
                <ul className="grid grid-cols-4 gap-10">
                    <li className="w-[250px] h-[150px] font-semibold px-3 py-3 rounded bg-blue-300 hover:bg-green-300">
                        <div className="text-[20px]">Users</div>

                        <div className="text-[35px] text-center">{lengthUsers}</div>
                    </li>

                    <li className="w-[250px] h-[150px] font-semibold px-3 py-3 rounded bg-green-200 hover:bg-green-300">
                        <div className="text-[20px]">Originals</div>

                        <div className="text-[35px] text-center">{lengthComic}</div>
                    </li>

                    <li className="w-[250px] h-[150px] font-semibold px-3 py-3 rounded bg-orange-300 hover:bg-green-300">
                        <div className="text-[20px]">Videos</div>

                        <div className="text-[35px] text-center">{lengthVideo}</div>
                    </li>

                    <li className="w-[250px] h-[150px] font-semibold px-3 py-3 rounded bg-red-300 hover:bg-green-300">
                        <div className="text-[20px]">Payment</div>

                        <div className="text-[35px] text-center">{lengthpayment}</div>
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default AdminDashboardPage;
