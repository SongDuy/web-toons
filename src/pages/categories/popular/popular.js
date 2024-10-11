import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll';
import { useSelector } from 'react-redux';

import NewTrendingOriginalsPage from './childPopular/newTrendingOriginals';
import NewTrendingVideosPage from './childPopular/newTrendingVideos';
import OriginalsByGenrePage from './childPopular/originalsByGenre';

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
    const [selectedSection, setSelectedSection] = useState("section1");

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    return (
        <div className="w-full h-full bg-white pb-10">

            {/* Hiển thị tiêu đề */}
            <div className={`w-full h-[70px] mb-[-70px] bg-white shadow flex items-center justify-start overflow-x-auto border-t ${isSticky ? 'sticky top-0 z-20' : ''}`}>
                <ul
                    className="h-full flex w-max"
                >
                    <ScrollLink to="section1" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedSection("section1")}
                            className={`min-w-[280px] h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedSection === "section1" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            {!language ?
                                <span>
                                    NEW & TRENDING ORIGINALS
                                </span>
                                :
                                <span>
                                    새로운 및 인기 오리지널
                                </span>
                            }

                        </li>
                    </ScrollLink>

                    <ScrollLink to="section2" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedSection("section2")}
                            className={`min-w-[280px] h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedSection === "section2" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            {!language ?
                                <span>
                                    NEW & TRENDING VIDEOS
                                </span>
                                :
                                <span>
                                    새로운 및 인기 동영상
                                </span>
                            }

                        </li>
                    </ScrollLink>

                    <ScrollLink to="section3" smooth={true} duration={500}>
                        <li
                            onClick={() => setSelectedSection("section3")}
                            className={`min-w-[280px] h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center ${selectedSection === "section3" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            {!language ?
                                <span>
                                    ORIGINALS BY GENRE
                                </span>
                                :
                                <span>
                                    장르별 오리지널
                                </span>
                            }

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

                </div>
            </div>

        </div>
    );
}

export default PopularPage;
