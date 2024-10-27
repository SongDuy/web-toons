import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll';
import { useSelector } from 'react-redux';

import NewTrendingOriginalsPage from './childPopular/newTrendingOriginals';
import NewTrendingVideosPage from './childPopular/newTrendingVideos';
import OriginalsByGenrePage from './childPopular/originalsByGenre';
import CircularProgress from "@mui/material/CircularProgress";

const PopularPage = () => {

    //kích hoạt dính vào trên cùng
    const [isSticky, setIsSticky] = useState(false);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        // Bắt đầu quá trình tải lại dữ liệu
        setloading(true);

        const threshold = window.innerWidth < 640 ? 50 : 100; // Ngưỡng để kích hoạt dính vào trên cùng

        const handleScroll = () => {
            if (window.scrollY > threshold) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Tắt loading sau một khoảng thời gian nhất định
        const loadingTimeout = setTimeout(() => {
            setloading(false); // Tắt loading sau khoảng thời gian 1000ms (1 giây)
        }, 1000); // Thay đổi thời gian tại đây nếu cần

        return () => {
            window.removeEventListener('scroll', handleScroll); // Clean up sự kiện cuộn
            clearTimeout(loadingTimeout); // Clean up timeout
        };
    }, []); // Chạy một lần khi component mount


    //Chọn nội dung theo tiêu đề
    const [selectedSection, setSelectedSection] = useState("section1");

    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    return (
        <>
            {!loading ? (
                <div className="w-full h-full bg-white pb-10">
                    {/* Hiển thị tiêu đề */}
                    <div className={`w-full h-[70px] mb-[-70px] bg-white shadow overflow-x-auto border-t ${isSticky ? 'sticky top-0 z-30' : ''}`}>
                        <div className="w-full h-full flex items-center justify-center">
                            <ul
                                className="h-full flex w-max overflow-x-auto scroll-snap-x scroll-snap-mandatory"
                            >
                                <ScrollLink to="section1" smooth={true} duration={500}>
                                    <li
                                        onClick={() => setSelectedSection("section1")}
                                        className={`w-[250px] h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center scroll-snap-start ${selectedSection === "section1" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
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
                                        className={`w-[250px] h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center scroll-snap-start ${selectedSection === "section2" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
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
                                        className={`w-[250px] h-full uppercase font-semibold text-md hover:text-black cursor-pointer flex items-center justify-center scroll-snap-start ${selectedSection === "section3" ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
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
                    </div>

                    <div className="w-full h-full xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px]">
                        <div className="w-full h-full ml-auto mr-auto">

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
            ) : (
                <div className="w-full h-[48vh] flex items-center justify-center">
                    <CircularProgress />
                </div>
            )}
        </>
    );
}

export default PopularPage;
