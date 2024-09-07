import React from 'react';
//import '../../App.css'
const AdminLoginPage = () => {
    return (
        <div className="w-screen h-screen bg-gray-100 flex items-center justify-center fixed inset-0 z-50">

            <div className="w-[400px] h-auto px-5 pt-5 pb-8 bg-white shadow rounded-lg">
                <div>
                    <span className="text-[25px] flex justify-center font-semibold">
                        Admin Login
                    </span>
                    <span className="pt-3 pb-8 flex items-center justify-center">Welcome back! Let's take you to your account.</span>

                    {/* Đăng nhập bằng Name */}
                    <div className="grid grid-cols-1 gap-y-5">

                        {/* Nhập tên tài khoản */}
                        <div className="w-full h-full">
                            <label for="username" className="w-full h-full font-semibold">
                                Username
                            </label>

                            <input
                                type="text"
                                className="w-full h-[50px] px-2 mt-3 border rounded shadow"
                                placeholder="Username"
                                value=""
                                onChange=""
                            />
                        </div>

                        {/* Nhập mật khẩu */}
                        <div className="w-full h-full">
                            <label for="password" className="w-full h-full font-semibold">
                                Password
                            </label>

                            <input
                                type="password"
                                className="w-full h-[50px] px-2 mt-3 border rounded shadow"
                                placeholder="Password"
                                form="off"
                                value=""
                                onChange=""
                            />
                        </div>

                        {/* Đăng nhập */}
                        <button
                            className="w-full h-[50px] mt-8 bg-black text-white rounded font-semibold"
                        // onClick={getRegister}
                        >
                            Continue
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminLoginPage;
