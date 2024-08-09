import React, { useState } from 'react';
import '../../../App.css';

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

            <div className={` w-[450px] h-screen ml-auto bg-gray-50 relative  ${!isSearch ? "slide-in" : "slide-out"} `}
            >
                <div className="w-[100px] h-[50px] bg-red-200"
                    onClick={handleBackdropClick}
                >
                    <div className="w-[50px] h-[50px] bg-white">
                        4
                    </div>

                </div>
            </div>

        </div>
    );
}

export default SearchPage;
