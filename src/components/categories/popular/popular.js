import React from 'react';

import HeaderPage from '../../layout/header';
import FooterPage from '../../layout/footer';

const PopularPage = () => {
    return (
        <div>
            <HeaderPage />

            <div className="w-full h-full bg-gray-100">
                <div className="w-full h-[70px] bg-white shadow flex items-center justify-center border-t">
                    <ul
                        className="flex gap-[70px]"
                    >
                        <li
                            className="h-[60px] uppercase font-semibold text-md text-black hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            NEW & TRENDING
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-md text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            ORIGINALS BY GENRE
                        </li>

                        <li
                            className="h-[60px] uppercase font-semibold text-md text-gray-300 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                            VIDEOS BY GENRE
                        </li>

                    </ul>
                </div>

                <div className="w-full h-full">
                    <div className="h-[70px] mx-[160px] border-b-2 flex items-center">
                        <span className="uppercase font-semibold text-xl">NEW & TRENDING</span>
                    </div>

                    <div className="h-full mx-[160px] py-5 gap-5 flex items-center justify-center">
                        <div className="w-1/2 h-[600px] bg-white">
                            Column 1
                        </div>

                        <div className="w-1/2 h-[600px] bg-white">
                            Column 2
                        </div>
                    </div>
                </div>
            </div>

            <FooterPage />
        </div>
    );
}

export default PopularPage;
