import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';

import '../../../App.css';
import { useSelector,useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getAllComic } from '../../../common/store/comic';


const SearchPage = ({ closeModal }) => {

    // Mở và đóng modal tìm kiếm
    const [isSearch, setIsSearch] = useState(false);
    const comic = useSelector(state => state.comic.comic);
    const dispatch = useDispatch();

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {

            setIsSearch(true);

            setTimeout(() => {
                closeModal(); // Gọi hàm closeModal khi nhấp vào nền
                setIsSearch(false);
            }, 800);
        }
    };
    useEffect(() => {
        const get=async ()=>{
            try {
                console.log(comic.comic)
              if(!comic?.comic){  
                const lg=await dispatch(getAllComic())
              unwrapResult(lg)
              }
            } catch (error) {
                
            }
        }
        get()
    }, [dispatch,comic]);
    // Hiển thị nội dung giống nội dung cần tìm
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredTop30Films = comic.comic?.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
        //|| item.auth.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const showNoResultsMessage = (searchTerm.trim() !== '' && filteredTop30Films?.length === 0) || searchTerm.trim() === '';

    return (
        <div className="w-screen h-screen bg-black bg-opacity-50 flex fixed inset-0 z-50 " onClick={handleBackdropClick}>

            <div className={`w-[450px] h-screen pl-3 pr-8 py-3 ml-auto bg-gray-50 relative  ${!isSearch ? "slide-in" : "slide-out"} `}
            >
                {/* nút tắt tìm kiếm */}
                <button className="w-[35px] h-[35px] z-50 bg-red-200 flex ml-auto hover:text-white rounded-md"
                    onClick={handleBackdropClick}
                >
                    <span
                        className="w-full h-full z-10 flex items-center justify-center"
                        onClick={handleBackdropClick}
                    >
                        <CloseIcon onClick={handleBackdropClick} sx={{ fontSize: 25 }}/>
                    </span>

                </button>

                {/* Ô tìm kiếm */}
                <div className="w-full mt-5 mb-3">
                    <input
                        className="w-full h-[35px] px-2 border-2 rounded-md"
                        onChange={handleSearch}
                        placeholder="Search..."
                    />
                </div>

                {/* Danh sách nội dung phù hợp cần tìm */}
                <div className="w-full h-[630px] custom-scrollbar">
                    <ul className="grid grid-cols-1">
                        {showNoResultsMessage ? (
                            <p className="text-center text-gray-500">No relevant results found.</p>
                        ) : (
                            filteredTop30Films?.map(item => (
                                <Link to={`/originals/original/series/${item.id}`} key={item.id} onClick={handleBackdropClick}>
                                    <li className="w-full h-[90px] hover:bg-gray-100 flex items-center border-t border-b cursor-pointer">

                                        <div className="w-[80px] h-[80px] rounded">
                                            <img
                                                src={item.squareThumbnail}
                                                alt="img"
                                                className="object-fill w-full h-full rounded"
                                            />
                                        </div>

                                        <div className="h-full rounded-xl px-3 py-3 flex items-center">
                                            <div className="w-[280px] overflow-hidden ">
                                                <span className="w-full text-[15px] font-semibold line-clamp-1">
                                                    {item.title}
                                                </span>
                                                <div className="flex">
                                                    <span className="max-w-[150px] pr-2 border-r-2 line-clamp-1">
                                                        {item.summary}
                                                    </span>
                                                    <span className="max-w-[110px] px-2 border-l line-clamp-1">
                                                        {item.genre1}
                                                    </span>
                                                </div>
                                                <span className="w-full text-[15px] text-yellow-500 flex items-center gap-1 font-semibold line-clamp-1">
                                                    <StarIcon />
                                                    {item.totalSubscribed}
                                                </span>
                                            </div>

                                        </div>
                                    </li>
                                </Link>
                            ))
                        )}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default SearchPage;
