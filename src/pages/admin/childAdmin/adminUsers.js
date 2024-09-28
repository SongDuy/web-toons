import React, { useEffect, useState } from 'react';
import LockClockIcon from '@mui/icons-material/LockClock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import userFireBase from '../../../common/services/User.services';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const AdminUsersPage = () => {
    const [loading, setloading] = useState(false);
    const [Users, setUsers] = useState([]);

    useEffect(() => {

        const get = async () => {
            try {
                setloading(false)
                const lg = await userFireBase.getALL()
                console.log(lg)
                setUsers(lg.success ? lg?.Users : [])
                setloading(true)
            } catch (error) {
                console.log(error)
            }
        }
        get()
    }, []);
    const handlelock = async (id, lock) => {
        try {
            let result = window.confirm(`Do you want to ${lock ? "lock" : "Unlocked"} this User?`);
            if (result) {
                setloading(false)
                await userFireBase.update({ lock: !lock }, id)
                const lg = await userFireBase.getALL()
                setUsers(lg.success ? lg?.Users : [])
                setloading(true)
            }
        } catch (error) {

        }
    }
    return (
        <>
            {loading ?
                <div className="w-full h-full py-5 bg-white">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr className="w-full">
                                <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">ID</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Name</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Email</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Age</th>
                                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Manager</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Users?.map((item) => (
                                <tr key={item.uid}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                                        {item.uid}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {item?.birthday ? new Date(Date.now())?.getFullYear() - new Date(item.birthday)?.getFullYear() : 'Not Birthday '}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">

                                        <button onClick={() => handlelock(item.uid, item.lock)} className={`w-[35px] h-[35px] ${item?.lock ? "text-blue-500" : "text-red-500"} mx-1 bg-gray-100 hover:bg-gray-200 rounded-full`}>
                                            <LockClockIcon />
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

export default AdminUsersPage;
