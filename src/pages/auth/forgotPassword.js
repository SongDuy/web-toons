import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    return (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center fixed inset-0 z-50"> {/* backdrop-blur-sm */}

            <div className="w-[400px] h-[350px] px-5 py-5 bg-white shadow rounded-lg">
                <div>
                    <span className="text-[25px] flex justify-center font-semibold">Forgot Password?</span>
                    <div className="pt-3 pb-5">
                        <span class="flex items-center justify-center mx-auto">We will send you a link to reset your password.</span>
                        <span class="flex items-center justify-center mx-auto">Enter your email address below.</span>
                    </div>

                    {/* Đăng nhập bằng email */}
                    <div className="grid grid-cols-1 gap-y-3">

                        {/* Nhập địa chỉ email */}
                        <input
                            type="text"
                            className="w-full h-[50px] px-2 border rounded shadow"
                            placeholder="Email Address"
                        />

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

                </div>

            </div>

        </div>
    );
}

export default ForgotPasswordPage;
