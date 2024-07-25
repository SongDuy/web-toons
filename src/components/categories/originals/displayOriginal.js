import React from 'react';

import FooterPage from '../../layout/footer';

const DisplayOriginalPage = () => {
    return (
        <div>
            <div className="w-full h-full bg-white">
                {/* Thanh công cụ */}
                <div className="w-full h-[50px] px-5 bg-black flex items-center">
                    <ul className="w-full flex">

                        <li className="mr-auto">
                            <div className="">
                                <span className="text-white">Logo</span>
                            </div>

                            <div className="">

                            </div>
                        </li>

                        <li className="">
                            <span className="text-white">kk</span>
                        </li>

                        <li className="ml-auto">
                            <span className="text-white">jjjjjjjjjjk k k kk k k k k jjjjj</span>
                        </li>

                    </ul>
                </div>

                {/* Hiển thị nội dung truyện */}
                <div className="w-full h-[500px] bg-white">

                </div>

                {/* Hiển thị yêu thích theo dõi */}
                <div className="w-full h-[250px] bg-green-200 flex items-center justify-center">
                    <div>
                        <div className="flex gap-3 pt-10 pb-5">
                            <span className="w-[35px] h-[35px] uppercase bg-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                Up
                            </span>
                            <span className="text-xl font-semibold flex items-center">
                                EVERY MONDAY
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-[100px] h-[35px] rounded-full bg-gray-300 flex items-center justify-center px-2 py-2">
                                lll
                            </div>
                            <div className="w-[100px] h-[35px] rounded-full bg-gray-300 flex items-center justify-center px-2 py-2">
                                kkk
                            </div>
                        </div>
                    </div>

                </div>

                {/* Hiển thị bình luận và danh sách truyện nổi bật */}
                <div className="w-full h-[500px] bg-white">

                </div>
            </div>

            <FooterPage />
        </div>

    );
}

export default DisplayOriginalPage;
