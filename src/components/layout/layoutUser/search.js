import React from 'react';
import '../../../App.css';

const SearchPage = ({ closeModal }) => {

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal(); // Gọi hàm closeModal khi nhấp vào nền
        }
    };

    return (
        <div className="w-screen h-screen bg-black bg-opacity-50 flex py fixed inset-0 z-50 " onClick={handleBackdropClick}>
            <div className="w-[310px] h-screen ml-auto bg-gray-50 relative slide-in">
                <div className="w-[100px] h-[50px] bg-red-200">
                    <div className="w-[50px] h-[50px] bg-white animate-slideLeft">
                         4
                    </div>
                   
                </div>
            </div>

        </div>
    );
}

export default SearchPage;
