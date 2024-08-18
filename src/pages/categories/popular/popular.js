import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll';

import NewTrendingOriginalsPage from './childPopular/newTrendingOriginals';
import NewTrendingVideosPage from './childPopular/newTrendingVideos';
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
    const [selectedTitle, setSelectedTitle] = useState("new & trending originals");

    return (
        <div className="w-full h-full bg-white pb-10">

            {/* Hiển thị tiêu đề */}
            <div className={`w-full h-[70px] mb-[-70px] bg-white shadow flex items-center justify-center border-t ${isSticky ? 'sticky top-0 z-10' : ''}`}>
                <ul
                    className="h-full flex gap-10"
                >
                    <ScrollLink to="section1" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedTitle("new & trending originals")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedTitle === "new & trending originals" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            NEW & TRENDING ORIGINALS
                        </li>
                    </ScrollLink>

                    <ScrollLink to="section2" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedTitle("new & trending videos")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedTitle === "new & trending videos" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            NEW & TRENDING VIDEOS
                        </li>
                    </ScrollLink>

                    <ScrollLink to="section3" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedTitle("originals by genre")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedTitle === "originals by genre" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            ORIGINALS BY GENRE
                        </li>
                    </ScrollLink>

                    <ScrollLink to="section4" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedTitle("videos by genre")}
                            className={`h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedTitle === "videos by genre" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            VIDEOS BY GENRE
                        </li>
                    </ScrollLink>
                </ul>
            </div>

            <div className="w-full h-full ">
                <div className="max-w-[1120px] h-full ml-auto mr-auto">

                    {/* Hiển thị NEW & TRENDING ORIGINALS*/}
                    <ScrollElement name="section1" className="element">
                        <NewTrendingOriginalsPage />
                    </ScrollElement>

                    {/* Hiển thị NEW & TRENDING VIDEOS*/}
                    <ScrollElement name="section2" className="element">
                        <NewTrendingVideosPage />
                    </ScrollElement>

                    {/* Hiển thị ORIGINALS BY GENRE */}
                    <ScrollElement name="section3" className="element">
                        <OriginalsByGenrePage />
                    </ScrollElement>

                    {/* Hiển thị VIDEOS BY GENRE */}
                    <ScrollElement name="section4" className="element">
                        <VideosByGenrePage />
                    </ScrollElement>

                </div>
            </div>

        </div>
    );
}

export default PopularPage;
