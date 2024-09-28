import React, { useEffect, useState } from 'react';
import PaymentFireBase from '../../../common/services/Payment.services';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from "@mui/icons-material/Check";

const AdminPaymentsPage = () => {
    const [loading, setloading] = useState(false);
    const [Payments, setPayments] = useState([]);

    useEffect(() => {

        const get = async () => {
            try {
                setloading(false)
                const payment = await PaymentFireBase.getad()
                setPayments(payment.success ? payment?.payment?.filter(item => item?.status === 'other') : [])
                setloading(true)
            } catch (error) {
                console.log(error)
            }
        }
        get()
    }, []);
    const handlecheck = async (id) => {
        try {
            let result = window.confirm(`Do you want to check this payment?`);
            if (result) {
                setloading(false)
                await PaymentFireBase.update({ status: "success" }, id)

                const payment = await PaymentFireBase.getad()
                setPayments(payment.success ? payment?.payment?.filter(item => item?.status === 'other') : [])
                setloading(true)
            }
        } catch (error) {

        }
    }
    const handledelete = async (id) => {
        try {
            let result = window.confirm(`Do you want to delete this payment?`);
            if (result) {
                setloading(false)
                await PaymentFireBase.update({ status: "error" }, id)
                const payment = await PaymentFireBase.getad()
                setPayments(payment.success ? payment?.payment?.filter(item => item?.status === 'other') : [])
                setloading(true)
            }
        } catch (error) {

        }
    }
    return (
        <>{
            loading ?

                <div className="w-full h-full pb-5 bg-white">

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
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">ID User</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Price</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Date created</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Manager</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Payments?.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                                        {item.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {item.uid}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {item.status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        <button onClick={() => handlecheck(item.id)} className="w-[35px] h-[35px] text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                                            <CheckIcon />
                                        </button>
                                        <button onClick={() => handledelete(item.id)} className="w-[35px] h-[35px] text-red-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                                            <CloseIcon />
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

export default AdminPaymentsPage;
