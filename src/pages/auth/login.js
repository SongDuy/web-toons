import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import '../../App.css';

const LoginPage = ({ closeModal }) => {

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal(); // Gọi hàm closeModal khi nhấp vào nền
        }
    };

    return (
        <div className="w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center fixed inset-0 z-50" onClick={handleBackdropClick}> {/* backdrop-blur-sm */}

            <div className="w-[350px] h-[500px] px-5 py-5 bg-white shadow rounded-lg">
                <div>
                    <span className="text-[25px] flex justify-center font-semibold">Log In Now</span>

                    <ul className="w-full h-full mt-10 grid grid-cols-1 gap-y-5">

                        <li className="w-full h-[50px] cursor-pointer px-5 py-2 bg-red-50 hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <EmailIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Continue with Email
                            </span>
                        </li>

                        <li className="w-full h-[50px] cursor-pointer px-5 py-2 bg-red-50 hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <GoogleIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Continue with Google
                            </span>
                        </li>

                        <li className="w-full h-[50px] cursor-pointer px-5 py-2 bg-red-50 hover:bg-red-100 shadow-md flex items-center justify-center rounded">
                            <span className="mr-auto">
                                <FacebookIcon />
                            </span>

                            <span className="mr-auto font-semibold">
                                Continue with Facebook
                            </span>
                        </li>

                    </ul>
                </div>

            </div>

        </div>
    );
}

export default LoginPage;
