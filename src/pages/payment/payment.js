import React, { useState, useEffect, useCallback } from 'react';

const PaymentPage = () => {

    // Hàm tạo mã ngẫu nhiên
    const generateOrderCode = () => {
        // Tạo một chuỗi ngẫu nhiên và chuyển đổi nó thành chữ hoa
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    // Hàm lấy thời gian còn lại từ localStorage hoặc thiết lập giá trị mặc định là 5 phút
    const initialTime = () => {
        const storedTime = localStorage.getItem('timeLeft');
        if (storedTime) {
            // Nếu thời gian còn lại đã được lưu trữ, chuyển đổi nó từ chuỗi sang số nguyên và trả về
            return parseInt(storedTime, 10);
        } else {
            // Nếu không có thời gian được lưu trữ, trả về 5 phút tính bằng giây (300 giây)
            return 5 * 60;
        }
    };

    // Hàm lấy mã đơn hàng từ localStorage hoặc tạo mã mới nếu chưa có
    const initialOrderCode = () => {
        const storedCode = localStorage.getItem('orderCode');
        if (storedCode) {
            // Nếu mã đơn hàng đã được lưu trữ, trả về mã đó
            return storedCode;
        } else {
            // Nếu không có mã đơn hàng, tạo mã mới, lưu trữ và trả về
            const newCode = generateOrderCode();
            localStorage.setItem('orderCode', newCode);
            return newCode;
        }
    };

    // Khởi tạo trạng thái cho thời gian còn lại và mã đơn hàng
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [orderCode, setOrderCode] = useState(initialOrderCode);

    // Hàm cập nhật thời gian còn lại
    const updateTime = useCallback(() => {
        setTimeLeft((prevTime) => {
            const newTime = prevTime - 1; // Giảm thời gian còn lại đi 1 giây
            localStorage.setItem('timeLeft', newTime); // Cập nhật thời gian còn lại trong localStorage

            if (newTime <= 0) {
                // Khi thời gian kết thúc, tạo mã mới và đặt lại thời gian
                const newCode = generateOrderCode();
                localStorage.setItem('orderCode', newCode); // Lưu mã mới vào localStorage
                localStorage.setItem('timeLeft', 5 * 60); // Đặt lại thời gian 5 phút
                setOrderCode(newCode); // Cập nhật mã đơn hàng trong trạng thái
                return 5 * 60; // Đặt lại thời gian còn lại
            }
            return newTime; // Trả về thời gian còn lại nếu chưa kết thúc
        });
    }, []);

    // Thiết lập một hiệu ứng để cập nhật thời gian mỗi giây
    useEffect(() => {
        const timer = setInterval(updateTime, 1000);

        return () => {
            clearInterval(timer); // Dọn dẹp timer khi component bị gỡ bỏ
        };
    }, [updateTime]);

    // Hàm định dạng thời gian từ giây thành định dạng "MM:SS"
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60); // Tính số phút
        const secs = seconds % 60; // Tính số giây
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; // Định dạng và trả về chuỗi thời gian
    };


    // new 
    return (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center pt-2 pb-5">
            <div className="w-[1300px] h-[640px] bg-white rounded-xl shadow">
                <div className="flex">

                    <div className="w-[360px] h-full px-5 py-5">
                        {/* Tiêu đề */}
                        <h1 className="font-semibold text-lg">
                            Awaiting payment
                        </h1>
                        <div className="w-full h-[60px] mt-[10px] flex items-center justify-center border-b-2">
                            <span className="text-xl font-bold">
                                {formatTime(timeLeft)}
                            </span>

                        </div>
                    </div>

                    <div className="w-[940px] h-full bg-green-100 px-5 py-5">
                        {/* Tiêu đề */}
                        <h1 className="font-semibold text-2xl">
                            Transfer accounts by QR
                        </h1>
                        <div>
                            <h1 className="font-semibold text-2xl">
                                Manual transfer
                            </h1>
                            <span className="text-yellow-500 text-shadow-black font-bold ">
                                {orderCode}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
