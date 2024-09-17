import React, { useState, useEffect, useCallback } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Import icon copy

const PaymentInformationPage = () => {
    // Hàm tạo mã ngẫu nhiên
    const generateOrderCode = () => {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    // Lấy thời gian còn lại
    const initialTime = () => {
        const storedTime = localStorage.getItem('timeLeft');
        if (storedTime) {
            return parseInt(storedTime, 10);
        } else {
            return 5 * 60;
        }
    };

    // Lấy mã đơn hàng
    const initialOrderCode = () => {
        const storedCode = localStorage.getItem('orderCode');
        if (storedCode) {
            return storedCode;
        } else {
            const newCode = generateOrderCode();
            localStorage.setItem('orderCode', newCode);
            return newCode;
        }
    };

    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [orderCode, setOrderCode] = useState(initialOrderCode);

    // Hàm cập nhật thời gian
    const updateTime = useCallback(() => {
        setTimeLeft((prevTime) => {
            const newTime = prevTime - 1;
            localStorage.setItem('timeLeft', newTime);

            if (newTime <= 0) {
                const newCode = generateOrderCode();
                localStorage.setItem('orderCode', newCode);
                localStorage.setItem('timeLeft', 5 * 60);
                setOrderCode(newCode);
                return 5 * 60;
            }
            return newTime;
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(updateTime, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [updateTime]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Hàm copy giá trị vào clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied: ' + text);
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center pt-2 pb-5">
            <div className="w-[1300px] h-[640px] bg-white rounded-xl shadow">
                <div className="flex">
                    <div className="w-[360px] h-full px-5 py-5">

                        {/* Phần thời gian chờ thanh toán */}
                        <div className="w-full h-full border-b-2">
                            <h1 className="font-semibold text-lg">Awaiting payment</h1>
                            <div className="w-full h-[60px] mt-[10px] flex items-center justify-center ">
                                <span className="text-xl font-bold">{formatTime(timeLeft)}</span>
                            </div>
                        </div>

                        {/* Phần thông tin Sản phẩm */}
                        <div className="w-full h-full border-b-2 py-3">
                            <h1 className="font-semibold text-lg">Service name: Videos</h1>
                            <div className="flex items-center gap-5">
                                <h1 className="font-semibold text-lg">Order code:</h1>
                                <span className="text-yellow-500 text-shadow-black font-bold ">
                                    {orderCode}
                                </span>
                            </div>
                        </div>

                        {/* Phần giá tiền cần thanh toán */}
                        <div className="w-full h-full py-3">
                            <h1 className="font-semibold text-lg">Payment details</h1>
                            <div className="w-full h-[50px] bg-gray-100 border shadow rounded-xl mt-2 px-3 flex items-center">
                                <h1 className="font-semibold text-lg">Selling price:</h1>
                                <div className="ml-auto flex items-center space-x-2">
                                    {/* Giá tiền */}
                                    <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                                        255.000
                                    </span>

                                    {/* Icon copy */}
                                    <ContentCopyIcon
                                        className="cursor-pointer text-gray-600 hover:text-black"
                                        onClick={() => copyToClipboard("255.000")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[940px] h-full pl-5 pr-10 py-5">
                        <div className="w-full">
                            <h1 className="font-semibold text-2xl">Transfer accounts by QR</h1>

                            <div className="py-3 flex gap-5">
                                <div className="w-[150px] h-[150px] border shadow">
                                    <img
                                        src="" alt="img QR" className="w-full h-full container-fill"
                                    />
                                </div>

                                <div className="">
                                    <ul className="">
                                        <li className="text-lg">
                                            Step 1: Open the banking app and scan the QR code.
                                        </li>
                                        <li className="text-lg flex gap-2">
                                            <span className="">
                                                Step 2: Make sure the transfer content is
                                            </span>
                                            <span className="text-yellow-500 text-shadow-black font-bold ">
                                                {orderCode}
                                            </span>
                                        </li>
                                        <li className="text-lg">
                                            Step 3: Make the payment.

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-5">
                            <h1 className="font-semibold text-2xl">Manual transfer</h1>
                            <div className="grid grid-cols-2 gap-3 py-3">
                                <div className="w-full h-[50px] bg-gray-100 border shadow rounded-xl px-3 flex items-center">
                                    <h1 className="font-semibold text-lg">Selling price:</h1>
                                    <div className="ml-auto flex items-center space-x-2">
                                        {/* Giá tiền */}
                                        <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                                            255.000
                                        </span>

                                        {/* Icon copy */}
                                        <ContentCopyIcon
                                            className="cursor-pointer text-gray-600 hover:text-black"
                                            onClick={() => copyToClipboard("255.000")}
                                        />
                                    </div>
                                </div>

                                <div className="w-full h-[50px] bg-gray-100 border shadow rounded-xl px-3 flex items-center">
                                    <h1 className="font-semibold text-lg">Selling price:</h1>
                                    <div className="ml-auto flex items-center space-x-2">
                                        {/* Giá tiền */}
                                        <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                                            255.000
                                        </span>

                                        {/* Icon copy */}
                                        <ContentCopyIcon
                                            className="cursor-pointer text-gray-600 hover:text-black"
                                            onClick={() => copyToClipboard("255.000")}
                                        />
                                    </div>
                                </div>

                                <div className="w-full h-[50px] bg-gray-100 border shadow rounded-xl px-3 flex items-center">
                                    <h1 className="font-semibold text-lg">Selling price:</h1>
                                    <div className="ml-auto flex items-center space-x-2">
                                        {/* Giá tiền */}
                                        <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                                            255.000
                                        </span>

                                        {/* Icon copy */}
                                        <ContentCopyIcon
                                            className="cursor-pointer text-gray-600 hover:text-black"
                                            onClick={() => copyToClipboard("255.000")}
                                        />
                                    </div>
                                </div>

                                <div className="w-full h-[50px] bg-gray-100 border shadow rounded-xl px-3 flex items-center">
                                    <h1 className="font-semibold text-lg">Selling price:</h1>
                                    <div className="ml-auto flex items-center space-x-2">
                                        {/* Giá tiền */}
                                        <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                                            255.000
                                        </span>

                                        {/* Icon copy */}
                                        <ContentCopyIcon
                                            className="cursor-pointer text-gray-600 hover:text-black"
                                            onClick={() => copyToClipboard("255.000")}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="w-full h-full mt-10 flex items-center justify-center">
                            <div className="w-1/2 h-[50px] flex gap-10">
                                <button className="w-1/2 h-[50px] text-white font-semibold bg-red-500 hover:bg-red-600 shadow rounded-full flex items-center justify-center">
                                    Cancel
                                </button>
                                <button className="w-1/2 h-[50px] text-white font-semibold bg-green-500 hover:bg-green-600 shadow rounded-full flex items-center justify-center">
                                    Completed
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentInformationPage;
