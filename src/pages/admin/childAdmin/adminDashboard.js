import React from 'react';

const AdminDashboardPage = () => {
    return (
        <div className="w-full h-full py-5 bg-white">
            <div className="w-full flex items-center justify-center">
                <ul className="grid grid-cols-4 gap-10">
                    <li className="w-[250px] h-[150px] font-semibold px-3 py-3 rounded bg-blue-300 hover:bg-green-300">
                        <div className="text-[20px]">Users</div>

                        <div className="text-[35px] text-center">25k</div>
                    </li>

                    <li className="w-[250px] h-[150px] font-semibold px-3 py-3 rounded bg-green-200 hover:bg-green-300">
                        <div className="text-[20px]">Originals</div>

                        <div className="text-[35px] text-center">25k</div>
                    </li>

                    <li className="w-[250px] h-[150px] font-semibold px-3 py-3 rounded bg-orange-300 hover:bg-green-300">
                        <div className="text-[20px]">Videos</div>

                        <div className="text-[35px] text-center">25k</div>
                    </li>

                    <li className="w-[250px] h-[150px] font-semibold px-3 py-3 rounded bg-red-300 hover:bg-green-300">
                        <div className="text-[20px]">Payment</div>

                        <div className="text-[35px] text-center">25k</div>
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default AdminDashboardPage;
