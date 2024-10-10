import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../common/themes/firebase';
import {
    sendPasswordResetEmail
} from "firebase/auth";
import useTimeout from '../../Hooks/useTimeout';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useTimeout(() => {
        setSuccess(false);
    }, success ? 3000 : null);

    const handleForgotPw = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
        } catch (err) {
            setError(err.message);

        }
    }

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    return (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center"> {/* backdrop-blur-sm */}
            <div className="w-[450px] h-auto my-[170px] px-5 py-5 bg-white shadow rounded-lg">
                <div>
                    <h1 className="text-[25px] flex justify-center font-semibold">
                        {!language ?
                            <span> Forgot Password? </span>
                            :
                            <span> 비밀번호를 잊어버리셨나요? </span>
                        }
                    </h1>
                    <div className="pt-3 pb-5">
                        {!language ?
                            <span class="flex items-center justify-center mx-auto">
                                We will send you a link to reset your password.
                            </span>
                            :
                            <span class="flex items-center justify-center mx-auto">
                                비밀번호를 재설정할 수 있는 링크를 보내드리겠습니다.
                            </span>
                        }
                        {!language ?
                            <span class="flex items-center justify-center mx-auto">
                                Enter your email address below.
                            </span>
                            :
                            <span class="flex items-center justify-center mx-auto">
                                아래에 이메일 주소를 입력하세요.
                            </span>
                        }
                    </div>

                    {/* Đăng nhập bằng email */}
                    <div className="grid grid-cols-1 gap-y-3">

                        {/* Nhập địa chỉ email */}
                        <input
                            type="email"
                            className="w-full h-[50px] px-2 border rounded shadow"
                            placeholder={!language ? "Email Address" : "이메일주소"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p>  {!language ?"A password reset email has been sent. Please check your inbox.":"비밀번호 재설정 이메일이 발송되었습니다. 받은 편지함을 확인해 주세요."}</p>}

                        <button
                            className="w-full h-[50px] bg-black text-white rounded font-semibold"
                            onClick={handleForgotPw}
                        >
                            {!language ?
                                "Continue"
                                :
                                "계속해요"
                            }
                        </button>

                        <div className="w-full h-[50px] flex gap-x-1 items-center justify-center border rounded">

                            {!language ?
                                "Don't have an account?"
                                :
                                "계정이 없으신가요?"
                            }

                            <Link
                                to="/register"
                                className="text-blue-800 font-semibold"
                            >
                                {!language ?
                                    "Sign up"
                                    :
                                    "가입하세요"
                                }

                            </Link>

                        </div>
                    </div >

                </div>

            </div>
        </div>
    );
}

export default ForgotPasswordPage;
