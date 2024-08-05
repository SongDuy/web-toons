import React, { useState, useEffect } from 'react';
import { Link, Element } from 'react-scroll';

import NewTrendingPage from './childPopular/newTrending';
import OriginalsByGenrePage from './childPopular/originalsByGenre';
import VideosByGenrePage from './childPopular/videosByGenre';

const PopularPage = () => {

    //kích hoạt dính vào trên cùng
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const threshold = 100; // Ngưỡng để kích hoạt dính vào trên cùng

        const handleScroll = () => {
            if (window.scrollY > threshold) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    //Chọn nội dung theo tiêu đề
    const [selectedTitle, setSelectedTitle] = useState("new & trending");

    return (
        <div className="w-full h-full bg-white pb-10">

            {/* Hiển thị tiêu đề */}
            <div className={`w-full h-[70px] mb-[-70px] bg-white shadow flex items-center justify-center border-t ${isSticky ? 'sticky top-0 z-50' : ''}`}>
                <ul
                    className="h-full flex gap-[70px]"
                >
                    <Link to="section1" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedTitle("new & trending")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedTitle === "new & trending" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            NEW & TRENDING
                        </li>
                    </Link>
                    <Link to="section2" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedTitle("originals by genre")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedTitle === "originals by genre" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            ORIGINALS BY GENRE
                        </li>
                    </Link>
                    <Link to="section3" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedTitle("videos by genre")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedTitle === "videos by genre" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            VIDEOS BY GENRE
                        </li>
                    </Link>
                </ul>
            </div>

            <div className="w-full h-full ">
            <div className="max-w-[1120px] h-full border ml-auto mr-auto">

                    {/* Hiển thị NEW & TRENDING */}
                    <Element name="section1" className="element">
                        <NewTrendingPage />
                    </Element>

                    {/* Hiển thị ORIGINALS BY GENRE */}
                    <Element name="section2" className="element">
                        <OriginalsByGenrePage />
                    </Element>

                    {/* Hiển thị VIDEOS BY GENRE */}
                    <Element name="section3" className="element">
                        <VideosByGenrePage />
                    </Element>

                </div>
            </div>
            
        </div>
    );
}

export default PopularPage;
