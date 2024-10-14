import React from 'react';
//import '../../App.css'
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
const FooterPage = () => {
    return (
        <footer className="w-full border-t-2 bg-gray-100 text-black py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Liên kết mạng xã hội */}
                <div className="flex justify-center">
                    <ul className="flex gap-5">
                        <Link to={`#`}>
                            <li className="w-[50px] h-[50px] rounded-full border shadow flex items-center justify-center hover:bg-gray-200">
                                <FacebookIcon sx={{ fontSize: 30 }} />
                            </li>
                        </Link>

                        <Link to={`#`}>
                            <li className="w-[50px] h-[50px] rounded-full border shadow flex items-center justify-center hover:bg-gray-200">
                                <InstagramIcon sx={{ fontSize: 30 }} />
                            </li>
                        </Link>

                        <Link to={`#`}>
                            <li className="w-[50px] h-[50px] rounded-full border shadow flex items-center justify-center hover:bg-gray-200">
                                <TwitterIcon sx={{ fontSize: 30 }} />
                            </li>
                        </Link>

                        <Link to={`#`}>
                            <li className="w-[50px] h-[50px] rounded-full border shadow flex items-center justify-center hover:bg-gray-200">
                                <YouTubeIcon sx={{ fontSize: 30 }} />
                            </li>
                        </Link>



                    </ul>
                </div>

                {/* Thông tin điều khoản chính sách */}
                <div className="flex justify-center mt-10">
                    <ul className="grid xs:grid-cols-4 sm:grid-cols-5 gap-x-5 gap-y-3 mt-auto">
                        <Link to={`#`}>
                            <li className="h-full hover:text-yellow-500 flex items-center justify-center">
                                About
                            </li>
                        </Link>


                        <Link to={`#`}>
                            <li className="h-full hover:text-yellow-500 flex items-center justify-center">
                                Terms
                            </li>
                        </Link>

                        <Link to={`#`}>
                            <li className="h-full hover:text-yellow-500 flex items-center justify-center">
                                Privacy
                            </li>
                        </Link>

                        <Link to={`#`}>
                            <li className="h-full hover:text-yellow-500 flex items-center justify-center">
                                Advertise
                            </li>
                        </Link>

                        <Link to={`#`}>
                            <li className="h-full hover:text-yellow-500 flex items-center justify-center">
                                Contact
                            </li>
                        </Link>

                    </ul>
                </div>

                {/* Chân trang */}
                <div className="mt-10 pt-6 text-center text-sm">
                    ⓒ 2024 Rison. 모든 권리는 보호됩니다.
                </div>
            </div>
        </footer>
    );
}

export default FooterPage;
