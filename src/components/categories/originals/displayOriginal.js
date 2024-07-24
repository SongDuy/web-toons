import React from 'react';

import FooterPage from '../../layout/footer';

const DisplayOriginalPage = () => {
    return (
        <div>
            <div className="w-full h-full bg-white">
                {/* Thanh công cụ */}
                <div className="w-full h-[50px] bg-black">
                    <ul>
                        <li className="">

                        </li>
                        <li className="">

                        </li>
                        <li className="">

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
