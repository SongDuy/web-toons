import React, { useState } from 'react';
import '../../../App.css';

import CloseIcon from '@mui/icons-material/Close';

const SearchPage = ({ closeModal }) => {

    const [isSearch, setIsSearch] = useState(false);
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {

            setIsSearch(true);

            setTimeout(() => {
                closeModal(); // Gọi hàm closeModal khi nhấp vào nền
                setIsSearch(false);
            }, 800);
        }
    };

    return (
        <div className="w-screen h-screen bg-black bg-opacity-50 flex py fixed inset-0 z-50 " onClick={handleBackdropClick}>

            <div className={`w-[310px] h-screen pl-2 pr-5 py-3 ml-auto bg-gray-50 relative  ${!isSearch ? "slide-in" : "slide-out"} `}
            >
                {/* nút tắt tìm kiếm */}
                <div className="w-[35px] h-[35px] bg-red-200 ml-auto hover:text-white cursor-pointer rounded-md flex items-center justify-center"
                    onClick={handleBackdropClick}
                >
                    <CloseIcon onClick={handleBackdropClick} />
                </div>

                {/* Ô tìm kiếm */}
                <div className="w-full h-[50px] my-3 bg-green-500">
                    kkkk
                </div>

                {/* Danh sách nội dung phù hợp cần tìm */}
                <div className="w-full h-full bg-green-200">
                    kkkk
                </div>
            </div>

        </div>
    );
}

export default SearchPage;
