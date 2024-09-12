import React from "react";

const Delete = () => {

    return (
        <div className="w-full h-full bg-gray-100 py-[40px] flex justify-center items-center">
            <div className="w-[1112px] h-full">
                {/* Tiêu đề */}
                <span className="text-[22px] font-semibold">
                    Account Delete
                </span>

                {/* Nội dung */}
                <div className="w-full h-[500px] mt-[15px] px-[155px] py-[85px] bg-white">
                    <div className="w-full">
                        <h1 className="text-[18px] font-semibold">
                            Are you sure you want to delete your account?
                        </h1>
                        <span className="">
                            Deleting your account is permanent and will remove all subscription history.
                        </span>
                    </div>

                    <div className="w-full mt-[60px]">
                        <h1 className="">Before you go...</h1>
                        <ul className="">
                            <li className="">
                                If you wish to unsubscribe from receiving email notifications, you can change your
                            settings at ACCOUNT > Email Notification.
                            </li>
                            <li className="">
                                Any comments you wrote will not be deleted automatically.
                            Please go to MY > Comments to delete any comments before deleting your account.
                            </li>
                            <li className="">
                                Coins remaining on your account will be permanently deleted upon account deletion.
                            </li>
                            <li className="">
                                By deleting your account, you will also lose access to all digital content including your unlocked episodes. Once deleted, your access cannot be restored.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Delete;
