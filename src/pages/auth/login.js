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

            <div className="w-[500px] h-[500px] px-5 py-5 bg-white shadow rounded-lg flex justify-center">

                <span className="text-[20px]">Log in now and enjoy free comics</span>

            </div>

        </div>
    );
}

export default LoginPage;
