import React from 'react';
//import '../../App.css'
const PaymentPage = () => {
    return (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center pt-2 pb-5">
            <div className="w-[1300px] h-[640px] bg-white rounded-xl shadow">
                <div className="flex">
                    <div className="w-[360px] h-full bg-green-200 px-5 py-5 border-2">
                        <span className="font-semibold text-lg">
                            Awaiting payment
                        </span>
                    </div>
                    <div className="w-[940px] h-full bg-green-100 px-5 py-5">
                        <span className="font-semibold text-2xl">
                            Transfer accounts by QR
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
