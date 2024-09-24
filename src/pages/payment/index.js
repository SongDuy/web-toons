import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Import icon copy

const PaymentPage = ({ closeModal }) => {

    const handleBackdropClick = (event) => {
        console.log(event.target); // Log để kiểm tra
        console.log(event.currentTarget); // Log để kiểm tra
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center fixed inset-0 z-50" onClick={handleBackdropClick}> {/* backdrop-blur-sm */}

            <div className="w-[940px] h-auto bg-white rounded-xl shadow flex items-center justify-center">

                <div className="w-full h-full px-5 py-5">

                    <h1 className="flex items-center justify-center text-2xl">
                        Payment Video Series
                    </h1>

                    <div className="w-full h-full mt-3">
                        <h1 className="font-semibold text-xl">
                            Receiving account
                        </h1>
                        <div className="grid grid-cols-2 gap-3 py-3 mt-3">

                            <div className="w-full h-[70px] bg-gray-100 border shadow rounded-xl px-3 flex items-center">
                                <div className="w-full h-auto space-y-2">
                                    <h1 className="font-semibold">
                                        Account number
                                    </h1>
                                    <div className="ml-auto flex items-center space-x-2">
                                        {/* Giá tiền */}
                                        <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                                            011xx90890xx567
                                        </span>

                                        {/* Icon copy */}
                                        <ContentCopyIcon
                                            className="cursor-pointer text-gray-600 hover:text-black"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[70px] bg-gray-100 border shadow rounded-xl px-3 flex items-center">
                                <div className="w-full h-auto space-y-2">
                                    <h1 className="font-semibold">
                                        Account name
                                    </h1>
                                    <div className="ml-auto flex items-center space-x-2">
                                        {/* Giá tiền */}
                                        <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                                            Nguyen Van A
                                        </span>

                                        {/* Icon copy */}
                                        <ContentCopyIcon
                                            className="cursor-pointer text-gray-600 hover:text-black"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[70px] bg-gray-100 border shadow rounded-xl px-3 flex items-center">
                                <div className="w-full h-auto space-y-2">
                                    <h1 className="font-semibold">
                                        Selling price
                                    </h1>
                                    <div className="ml-auto flex items-center space-x-2">
                                        {/* Giá tiền */}
                                        <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                                            255.000
                                        </span>

                                        {/* Icon copy */}
                                        <ContentCopyIcon
                                            className="cursor-pointer text-gray-600 hover:text-black"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[70px] bg-gray-100 border shadow rounded-xl px-3 flex items-center">
                                <div className="w-full h-auto space-y-2">
                                    <h1 className="font-semibold">
                                        Bank name
                                    </h1>
                                    <div className="ml-auto flex items-center space-x-2">
                                        {/* Giá tiền */}
                                        <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                                            Bank Korea
                                        </span>

                                        {/* Icon copy */}
                                        <ContentCopyIcon
                                            className="cursor-pointer text-gray-600 hover:text-black"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="w-full h-full mt-3">
                        <h1 className="font-semibold text-xl">
                            Remittance account
                        </h1>
                        <div className="grid grid-cols-2 gap-3 py-3 mt-3">

                            <input
                                type="text"
                                className="w-full h-[50px] px-2 border rounded shadow"
                                placeholder="Account name"
                                form="off"
                            />

                            <input
                                type="text"
                                className="w-full h-[50px] px-2 border rounded shadow"
                                placeholder="Account number"
                                form="off"
                            />

                        </div>
                    </div>

                    <div className="w-full h-full mt-10 flex items-center justify-center">
                        <div className="w-1/2 h-[50px] flex gap-10">
                            <button
                                className="w-1/2 h-[50px] text-white font-semibold bg-red-500 hover:bg-red-600 shadow rounded-full flex items-center justify-center"
                                onClick={handleBackdropClick}
                            >
                                Cancel
                            </button>
                            <button className="w-1/2 h-[50px] text-white font-semibold bg-green-500 hover:bg-green-600 shadow rounded-full flex items-center justify-center">
                                Completed
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default PaymentPage;
