import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { handleAdmin } from '../../common/store/Auth.js';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const GetLogin = async () => {
        try {
            const lg = await dispatch(handleAdmin({ email, password }));
            unwrapResult(lg)
            navigate('/admin')
        } catch (error) {
        }

    }
   
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
                            <label htmlFor="username" className="w-full h-full font-semibold">
                                Username
                            </label>

                            <input
                                type="email"
                                className="w-full h-[50px] px-2 mt-3 border rounded shadow"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Nhập mật khẩu */}
                        <div className="w-full h-full">
                            <label htmlFor="password" className="w-full h-full font-semibold">
                                Password
                            </label>

                            <input
                                type="password"
                                className="w-full h-[50px] px-2 mt-3 border rounded shadow"
                                placeholder="Password"
                                value={password}
                                form="off"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Đăng nhập */}
                        <button
                            className="w-full h-[50px] mt-8 bg-black text-white rounded font-semibold"
                            onClick={GetLogin}
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
