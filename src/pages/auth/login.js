import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import GoogleIcon from '@mui/icons-material/Google';
// import { auth } from "../../common/themes/firebase";
// import { onIdTokenChanged  } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { setIsLoginModal,setIsLogin19Modal } from '../../common/store/hidden';
import { handleLogin, handleGoogle, seterr, handleLogin19, handleGoogle19 } from '../../common/store/Auth.js';
import useTimeout from '../../Hooks/useTimeout';

const LoginPage = ({ closeModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const err = useSelector(state => state.AuthJs.error);
    const isLogin19Modal = useSelector(state => state.hidden.isLogin19Modal);

    useTimeout(() => {
        dispatch(seterr(null));
    }, err ? 3000 : null);

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal(); // Gọi hàm closeModal khi nhấp vào nền
        }
    };
    const GetLogin = async () => {
        try {
          if(isLogin19Modal){
            const lg = await dispatch(handleLogin19({ email, password }));
            unwrapResult(lg)
            if (err === null) {
                dispatch(setIsLoginModal(false))
                dispatch(setIsLogin19Modal(false));
            }
            
          }else{
            const lg = await dispatch(handleLogin({ email, password }));
            unwrapResult(lg)
            if (err === null) {
                dispatch(setIsLoginModal(false))

            }
          }
        } catch (error) {
        }

    }
    const GetGoogle = async () => {
        try {
          if(isLogin19Modal){
            const lg = await dispatch(handleGoogle19());
            unwrapResult(lg)
            console.log(lg)
                dispatch(setIsLoginModal(false))
                dispatch(setIsLogin19Modal(false));

          }else{
            dispatch(handleGoogle());
            dispatch(setIsLoginModal(false)) 
          }
        } catch (error) {
        }

    }
    // useEffect(() => {
    //     onIdTokenChanged(auth, (user) => {
    //         if (user) {
    //           // Người dùng đã đăng nhập, lấy token mới
    //           user.getIdToken().then(async (idToken) => {
    //             const decodedToken = await auth.currentUser.getIdTokenResult(idToken);
    //             localStorage.setItem('sadsadas', idToken);
    //             // console.log(idToken,decodedToken)
    //             // Cập nhật token ở đây nếu cần
    //           });
    //         } else {
    //           // Người dùng đã đăng xuất
    //         }
    //       });
    // }, []);
    return (
        <div className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center fixed inset-0 z-50" onClick={handleBackdropClick}> {/* backdrop-blur-sm */}

            <div className="w-[400px] h-auto px-5 pt-5 pb-8 bg-white shadow rounded-lg">
                <div>
                    <span className="text-[25px] flex justify-center font-semibold">Log In</span>

                    <span className="pt-3 pb-5 flex items-center justify-center">Welcome back! Let's take you to your account.</span>

                    {/* Đăng nhập bằng email */}
                    <div className="w-full grid grid-cols-1 gap-y-3">

                        {/* Nhập địa chỉ email */}
                        <input
                            type="email"
                            className="w-full h-[50px] px-2 border rounded shadow"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* Nhập mật khẩu */}
                        <input
                            type="password"
                            value={password}
                            form="off"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-[50px] px-2 border rounded shadow"
                            placeholder="Password"
                        />

                        <Link
                            to="/forgot-password"
                            className="w-[160px] text-blue-800 cursor-pointer"
                            onClick={handleBackdropClick}
                        >
                            Reset your password?
                        </Link>
                        {err && <p>{err.message}</p>}
                        <button
                            className="w-full h-[50px] bg-black text-white rounded font-semibold"
                            onClick={GetLogin}

                        >
                            Continue
                        </button>

                        <div className="w-full h-[50px] flex gap-x-1 items-center justify-center border rounded">
                            <span>
                                Don't have an account?
                            </span>

                            <Link
                                to="/register"
                                className="text-blue-800 font-semibold"
                                onClick={handleBackdropClick}
                            >
                                Sign up
                            </Link>

                        </div>
                    </div >

                    <div className="w-full my-5 flex items-center">
                        <hr className="flex-1 border-t border-gray-300" />
                        <span className="px-4">OR</span>
                        <hr className="flex-1 border-t border-gray-300" />
                    </div>

                    <div className="w-full h-full grid grid-cols-1 gap-y-5">

                        <button onClick={GetGoogle}
                            className="w-full h-[50px] cursor-pointer px-5 py-2 bg-red-50 hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <GoogleIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Continue with Google
                            </span>
                        </button>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default LoginPage;
