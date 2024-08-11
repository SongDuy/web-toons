import React from 'react';
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

                    <ul className="w-full h-full mt-10 bg-red-100 grid grid-cols-1 gap-y-5">

                        <li className="h-[50px] border bg-red-100">
                            k,kkk
                        </li>

                        <li className="h-[50px] bg-red-100">
                            kkk
                        </li>

                        <li className="h-[50px] bg-red-100">
                            kkk
                        </li>

                    </ul>
                </div>

            </div>

        </div>
    );
}

export default LoginPage;
