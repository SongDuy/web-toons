import React, { useState, useEffect } from 'react';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dataListGenre from "../../../../components/layout/layoutUser/dataListGenre";

const OriginalsByGenrePage = () => {
    const comic = useSelector((state) => state.comic.comic);
    const [selectedOriginalsByGenre, setSelectedOriginalsByGenre] = useState('Action');
    const [comicid, setcomicid] = useState(comic?.comic?.filter(data => data.genre1.toLowerCase() === selectedOriginalsByGenre.toLowerCase() || data.genre2.toLowerCase() === selectedOriginalsByGenre.toLowerCase()).slice(0, 1)?.sort((a, b) => b.views - a.views)[0]);
    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredOriginalItem, setHoveredOriginalItem] = useState(null);
    useEffect(() => {
        setcomicid(comic?.comic?.filter(data => data.genre1.toLowerCase() === selectedOriginalsByGenre.toLowerCase() || data.genre2.toLowerCase() === selectedOriginalsByGenre.toLowerCase()).slice(0, 1)?.sort((a, b) => b.views - a.views)[0])
    }, [selectedOriginalsByGenre, comic.comic]);
    //Lấy ngôn ngữ
    const language = useSelector(state => state.hidden.language);

    return (
        <div className="w-full h-full pt-[70px]">

            <div className="h-[70px] flex items-center uppercase font-semibold text-xl">
                {!language ? <span> ORIGINALS BY GENRE </span> : <span> 장르별 오리지널 </span>}
            </div>

            <div className="h-[70px] mb-5 bg-white flex items-center justify-center border-t border-b">
                <ul className="grid grid-rows-2 grid-flow-col w-max overflow-x-auto scroll-snap-x scroll-snap-mandatory gap-x-4 gap-y-2">
                    {/* khung nội dung */}
                    {dataListGenre.map(item => (
                        <li
                            key={item.id}
                            onClick={() => setSelectedOriginalsByGenre(item.name)}
                            className={`min-w-[97px] uppercase font-semibold text-sm hover:text-black cursor-pointer flex items-center justify-center ${selectedOriginalsByGenre === (item.name || "Action") ? 'text-black' : 'text-gray-400'}`}
                        >
                            {!language ? item.name : item.nameKorean}
                        </li>
                    ))}

                </ul>
            </div>

            <div className="w-full grid xs:grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Hien thị top 1 */}
                <div className="w-full full bg-white">
                    {comicid?.id &&
                        <Link
                            to={`/originals/original/series/${comicid?.id}`}
                            className="h-full bg-white py-1"
                        >
                            <div
                                className="w-full h-full"
                                onMouseEnter={() => setHoveredOriginalItem("choice")}
                                onMouseLeave={() => setHoveredOriginalItem(null)}
                            >

                                <div className="w-full h-full">
                                    <div className="w-full mr-auto h-auto rounded-md flex items-center justify-center relative">
                                        <div className="w-full relative">
                                            <img
                                                src={comicid?.squareThumbnail}
                                                alt="img"
                                                className="object-cover w-full rounded-md"
                                                style={{ aspectRatio: "1 / 1" }} // Đảm bảo tỷ lệ 1:1
                                            />

                                            {hoveredOriginalItem === "choice" && (
                                                <div className="absolute inset-0 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                    <AutoStoriesIcon sx={{ fontSize: 60 }} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                            <div className="w-full h-[120px] mb-auto overflow-hidden">
                                                <div className="w-[80px] h-[80px] flex items-center justify-center mx-2">
                                                    <span className="mx-3 text-[60px] text-white text-shadow-black font-bold">
                                                        1
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full min-h-[200px] mt-3">
                                        <div className="w-full">
                                            {(comicid?.genre1 === comicid?.genre2) ?
                                                <span className="text-gray-400">
                                                    {!language ? comicid?.genre1 : dataListGenre?.filter(itm => itm.name.toLowerCase() === comicid?.genre1.toLowerCase())[0]?.nameKorean}
                                                </span>
                                                :
                                                <span className="text-gray-400 text-sm">
                                                    {!language ? comicid?.genre1 : dataListGenre?.filter(itm => itm.name.toLowerCase() === comicid?.genre1.toLowerCase())[0]?.nameKorean}
                                                    {`, `}
                                                    {!language ? comicid?.genre2 : dataListGenre?.filter(itm => itm.name.toLowerCase() === comicid?.genre2.toLowerCase())[0]?.nameKorean}
                                                </span>
                                            }
                                        </div>


                                        <div className="w-full h-[95px] overflow-hidden">
                                            <span className="text-[30px] font-semibold leading-[1.2] line-clamp-2">
                                                {comicid?.title}
                                            </span> 
                                            <span className="block font-semibold">
                                                {comicid?.Author}
                                            </span>
                                        </div>

                                        <div className="w-full h-full mt-2 overflow-hidden">
                                            <span className="w-full line-clamp-5">
                                                {comicid?.summary}
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Link>
                    }
                </div>

                {/* Hien thị danh sách */}
                <div className="w-full h-full bg-white">
                    <div className="w-full h-full">
                        <ul className="w-full h-full ">

                            {/* khung nội dung */}
                            {comic.comic?.filter(data => data.genre1.toLowerCase() === selectedOriginalsByGenre.toLowerCase() || data.genre2.toLowerCase() === selectedOriginalsByGenre.toLowerCase())?.slice(1, 10).sort((a, b) => b?.views - a?.views).map((item, index) => (
                                <Link
                                    key={item.id}
                                    to={`/originals/original/series/${item.id}`}
                                >
                                    <li
                                        className="w-full h-[90px] px-2 rounded-md border-b cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="w-full h-full flex items-center">
                                            <div className="w-[80px] h-[80px]">
                                                <img
                                                    src={item.squareThumbnail}
                                                    alt="img"
                                                    className="object-cover min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] rounded-md"
                                                />
                                            </div>
                                            <div className="w-[30px] h-[30px] mx-3 flex items-center justify-center">
                                                <span className="mx-3 text-xl text-white text-shadow-black font-bold">
                                                    {index + 2}
                                                </span>
                                            </div>
                                            <div className="w-[420px] mt-auto mb-auto overflow-hidden">
                                                {(item.genre1 === item.genre2) ?
                                                    <span className="text-gray-400 text-sm">
                                                        {!language ? item.genre1 : dataListGenre?.filter(itm => itm.name.toLowerCase() === item.genre1.toLowerCase())[0]?.nameKorean}
                                                    </span>
                                                    :
                                                    <span className="text-gray-400 text-sm">
                                                        {!language ? item.genre1 : dataListGenre?.filter(itm => itm.name.toLowerCase() === item.genre1.toLowerCase())[0]?.nameKorean}
                                                        {`, `}
                                                        {!language ? item.genre2 : dataListGenre?.filter(itm => itm.name.toLowerCase() === item.genre2.toLowerCase())[0]?.nameKorean}
                                                    </span>
                                                }
                                                <span className="text-md font-semibold line-clamp-1">
                                                    {item.title}
                                                </span>
                                                <span className="text-sm line-clamp-1">
                                                    {item.Author}
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
        </div>
    );
}

export default OriginalsByGenrePage;
