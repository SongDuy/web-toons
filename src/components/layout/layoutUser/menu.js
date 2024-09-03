import React, { useState } from 'react';
//import { Link } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';

const MenuPage = ({ closeModal }) => {

    // Mở và đóng modal tìm kiếm
    const [isMenu, setIsMenu] = useState(false);
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {

            setIsMenu(true);

            setTimeout(() => {
                closeModal(); // Gọi hàm closeModal khi nhấp vào nền
                setIsMenu(false);
            }, 800);
        }
    };

    return (
        <div className="w-screen h-screen bg-black bg-opacity-50 flex fixed inset-0 z-50 " onClick={handleBackdropClick}>

            <div
                className={`w-[450px] h-screen pl-3 pr-8 py-3 ml-auto bg-gray-50 relative  ${!isMenu ? "slide-in" : "slide-out"} `}
            >
                {/* nút tắt tìm kiếm */}
                <button className="w-[35px] h-[35px] z-50 bg-red-200 flex ml-auto hover:text-white rounded-md"
                    onClick={handleBackdropClick}
                >
                    <span
                        className="w-full h-full z-10 flex items-center justify-center"
                        onClick={handleBackdropClick}
                    >
                        <CloseIcon onClick={handleBackdropClick} sx={{ fontSize: 25 }} />
                    </span>

                </button>


            </div>

        </div>
    );
}

export default MenuPage;
