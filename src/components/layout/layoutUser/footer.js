import React from 'react';
//import '../../App.css'
//import { Link } from 'react-router-dom';
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
                        <li>
                            <FacebookIcon sx={{ fontSize: 30 }} />
                        </li>
                        <li>
                            <InstagramIcon sx={{ fontSize: 30 }} />
                        </li>
                        <li>
                            <TwitterIcon sx={{ fontSize: 30 }} />
                        </li>
                        <li>
                            <YouTubeIcon sx={{ fontSize: 30 }} />
                        </li>
                    </ul>
                </div>

                {/* Thông tin điều khoản chính sách */}
                <div className="flex justify-center mt-10">
                    <ul className="grid xs:grid-cols-4 sm:grid-cols-7 gap-x-5 gap-y-3 mt-auto">
                        <li className="h-full">
                           About
                        </li>
                        <li className="h-full">
                            Feedback
                        </li>
                        <li className="h-full">
                           Help
                        </li>
                        <li className="h-full">
                           Terms
                        </li>
                        <li className="h-full">
                            Privacy
                        </li>
                        <li className="h-full">
                            Advertise
                        </li>
                        <li className="h-full">
                            Contact
                        </li>
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
