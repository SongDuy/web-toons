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

                        <li className="bg-white ml-auto">
                            <span className="ml-auto">jjjjjjjjjjk k k kk k k k k jjjjj</span>

                        </li>

                    </ul>
                </div>

                {/* Hiển thị nội dung truyện */}
                <div className="w-full h-[1000px] bg-white">

                </div>

                {/* Hiển thị yêu thích theo dõi */}
                <div className="w-full h-[250px] bg-green-200">

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
