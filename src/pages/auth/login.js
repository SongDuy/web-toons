import React from 'react';
import { Link } from 'react-router-dom';

import GoogleIcon from '@mui/icons-material/Google';


import '../../App.css';

const LoginPage = ({ closeModal }) => {

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal(); // Gọi hàm closeModal khi nhấp vào nền
        }
    };

    return (
        <div className="w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center fixed inset-0 z-50" onClick={handleBackdropClick}> {/* backdrop-blur-sm */}

            <div className="w-[400px] h-[550px] px-5 py-5 bg-white shadow rounded-lg">
                <div>
                    <span className="text-[25px] flex justify-center font-semibold">Log In</span>

                    <span className="pt-3 pb-5 flex items-center justify-center">Welcome back! Let's take you to your account.</span>

                    {/* Đăng nhập bằng email */}
                    <div className="w-full grid grid-cols-1 gap-y-3">

                        {/* Nhập địa chỉ email */}
                        <input
                            type="text"
                            className="w-full h-[50px] px-2 border rounded shadow"
                            placeholder="Email Address"
                        />

                        {/* Nhập mật khẩu */}
                        <input
                            type="text"
                            className="w-full h-[50px] px-2 border rounded shadow"
                            placeholder="Password"
                        />

                        <Link
                            to="/forgot-password"
                            className="w-[160px] text-blue-800 cursor-pointer"
                        >
                            Reset your password?
                        </Link>

                        <button
                            className="w-full h-[50px] bg-black text-white rounded font-semibold"
                        >
                            Continue
                        </button>

                        <div className="w-full h-[50px] flex gap-x-1 items-center justify-center border rounded">
                            <span className="">
                                Don't have an account?

                            </span>

                            <Link
                                to="/register"
                                className="text-blue-800 font-semibold"
                            >
                                Sign up
                            </Link>

                        </div>
                    </div >

                    <div class="w-full my-5 flex items-center">
                        <hr class="flex-1 border-t border-gray-300" />
                        <span class="px-4">OR</span>
                        <hr class="flex-1 border-t border-gray-300" />
                    </div>

                    <ul className="w-full h-full grid grid-cols-1 gap-y-5">

                        <li className="w-full h-[50px] cursor-pointer px-5 py-2 bg-red-50 hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <GoogleIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Continue with Google
                            </span>
                        </li>

                    </ul>
                </div>

            </div>

        </div>
    );
}

export default LoginPage;
