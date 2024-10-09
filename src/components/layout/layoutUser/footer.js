import React from 'react';
//import '../../App.css'
import { Link } from 'react-router-dom';

const FooterPage = () => {
    return (
        <footer className="w-full border-t-2 bg-gray-100 text-black py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Column 1: Company Information */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Rison</h2>
                        <p className="text-sm">
                            Rison
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    {/* <div>
                        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                        <ul className="text-sm grid grid-cols-4">
                            <li><a href="/" className="hover:text-gray-300">Home</a></li>
                            <li><a href="/about" className="hover:text-gray-300">About</a></li>
                            <li><a href="/services" className="hover:text-gray-300">Services</a></li>
                            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
                        </ul>
                    </div> */}

                    {/* Column 3: Contact */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            연락
                        </h2>
                        <p className="text-sm">Email: support@rison.com</p>
                        <p className="text-sm">Phone: +84 123 456 789</p>
                        <div className="mt-4 flex space-x-4">
                            <Link to="#" className="hover:text-gray-300">Facebook</Link>
                            <Link to="#" className="hover:text-gray-300">Twitter</Link>
                            <Link to="#" className="hover:text-gray-300">LinkedIn</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 text-center text-sm">
                    ⓒ 2024 Rison. 모든 권리는 보호됩니다.
                </div>
            </div>
        </footer>
    );
}

export default FooterPage;
