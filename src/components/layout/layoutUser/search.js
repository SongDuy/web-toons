import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';

import CloseIcon from '@mui/icons-material/Close';

import '../../../App.css';

const dataAlsoLike = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 6, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 8, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Mafia Nanny", auth: "sh00 , Violet Matter", look: "88.8M" },
];

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
        <div className="w-full h-full bg-black bg-opacity-50 flex py fixed inset-0 z-50 " onClick={handleBackdropClick}>

            <div className={`w-[310px] h-screen pl-3 pr-3 py-3 ml-auto bg-gray-50 relative  ${!isSearch ? "slide-in" : "slide-out"} `}
            >
                {/* nút tắt tìm kiếm */}
                <div className="w-[35px] h-[35px] bg-red-200 ml-auto hover:text-white cursor-pointer rounded-md flex items-center justify-center"
                    onClick={handleBackdropClick}
                >
                    <CloseIcon onClick={handleBackdropClick} />
                </div>

                {/* Ô tìm kiếm */}
                <div className="w-full my-3">
                    <input
                        className="w-full"
                    />
                </div>

                {/* Danh sách nội dung phù hợp cần tìm */}
                <div className="w-full h-full bg-white">
                    <ul className="grid grid-cols-1 gap-y-2">
                       
                        {dataAlsoLike.map(item => (
                            <Link to={`/original/series`}>
                                <li
                                    className="w-[290px] h-[80px] flex bg-red-50 rounded-xl shadow-md cursor-pointer hover:bg-red-100"
                                    key={item.id}
                                >

                                    <div className="w-[80px] h-[80px] bg-green-200 rounded-xl">
                                        <img
                                            src={item.img}
                                            alt="img"
                                            className="object-fill w-full h-full rounded-xl"
                                        />
                                    </div>

                                    <div className="h-full rounded-xl px-3 py-3">
                                        <div className="w-[180px] h-[75px] overflow-hidden">
                                            <span className="w-full text-lg font-semibold leading-[1.2] line-clamp-2">
                                                {item.name}
                                            </span>
                                            <span className="w-full line-clamp-1">
                                                {item.auth}
                                            </span>
                                        </div>

                                        <div className="w-full">
                                            <span className=" flex gap-1 text-green-500">
                                                <VisibilityIcon />
                                                {item.look}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default SearchPage;
