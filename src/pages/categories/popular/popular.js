import React, { useState, useEffect } from 'react';
import { Link, Element } from 'react-scroll';

import NewTrendingPage from './newTrending';
import OriginalsByGenrePage from './originalsByGenre';
import VideosByGenrePage from './videosByGenre';

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

    //new 

    return (
        <div>

            <div className="w-full h-full bg-white">

                {/* Hiển thị tiêu đề */}
                <div className={`w-full h-[70px] bg-white shadow flex items-center justify-center border-t ${isSticky ? 'sticky top-0 z-50' : ''}`}>
                    <ul
                        className="flex gap-[70px]"
                    >
                        <Link to="section1" smooth={true} duration={500}>
                            <li
                                className="h-[60px] uppercase font-semibold text-md text-black hover:text-black cursor-pointer flex items-center justify-center"
                            >
                                NEW & TRENDING
                            </li>
                        </Link>
                        <Link to="section2" smooth={true} duration={500}>
                            <li
                                className="h-[60px] uppercase font-semibold text-md text-gray-400 hover:text-black cursor-pointer flex items-center justify-center"
                            >
                                ORIGINALS BY GENRE
                            </li>
                        </Link>
                        <Link to="section3" smooth={true} duration={500}>
                            <li
                                className="h-[60px] uppercase font-semibold text-md text-gray-400 hover:text-black cursor-pointer flex items-center justify-center"
                            >
                                VIDEOS BY GENRE
                            </li>
                        </Link>
                    </ul>
                </div>

                {/* Hiển thị nội dung */}
                <div className="w-full h-full pb-[100px]">

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
