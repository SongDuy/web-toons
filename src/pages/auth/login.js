import React from 'react';
import '../../App.css';

const LoginPage = ({ closeModal }) => {

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal(); // Gọi hàm closeModal khi nhấp vào nền
        }
    };

    return (
        <div className="min-h-screen bg-black bg-opacity-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 fixed inset-0 z-50" onClick={handleBackdropClick}> {/* backdrop-blur-sm */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white shadow rounded-lg">
                
                <div className="w-[200px] h-[500px] bg-red-200">
                    <div className="w-[50px] h-[50px] bg-white animate-slideLeft">
                        4
                    </div>
                </div>

            </div>

        </div>
    );
}

export default LoginPage;
