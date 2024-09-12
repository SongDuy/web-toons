import React, { useState } from "react";

import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckIcon from '@mui/icons-material/Check';

const Delete = () => {

    // Nhấn vào ô check đồng ý xóa tài khoản
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="w-full h-full bg-gray-100 py-[40px] flex justify-center items-center">
            <div className="w-[1112px] h-full">
                {/* Tiêu đề */}
                <h1 className="text-[22px] font-semibold">
                    Account Delete
                </h1>

                {/* Nội dung */}
                <div className="w-full h-full mt-[15px] px-[155px] py-[80px] bg-white">
                    <div className="w-full grid grid-cols-1 gap-2">
                        <h1 className="text-[18px] font-semibold">
                            Are you sure you want to delete your account?
                        </h1>
                        <span className="w-full">
                            Deleting your account is permanent and will remove all subscription history.
                        </span>
                    </div>

                    <div className="w-full mt-[60px] grid grid-cols-1 gap-2">
                        <h1 className="text-[18px] font-semibold">
                            Before you go...
                        </h1>
                        <ul className="grid grid-cols-1 gap-1">
                            <li className="flex flex-wrap">
                                <span>
                                    &#9679; If you wish to unsubscribe from receiving email notifications, you can change your
                                </span>
                                <span>
                                    &nbsp;&nbsp; settings at <Link to={`/account`} className="text-blue-500"> ACCOUNT <NavigateNextIcon /> Email Notification. </Link>
                                </span>
                            </li>
                            <li className="flex flex-wrap">
                                <span>
                                    &#9679; Any comments you wrote will not be deleted automatically.
                                </span>
                                <span>
                                    &nbsp;&nbsp; Please go to <Link to={`/mycomment`} className="text-blue-500"> MY <NavigateNextIcon /> Comments </Link> to delete any comments before deleting your account.
                                </span>
                            </li>
                            <li className="flex flex-wrap">
                                <span>
                                    &#9679; Coins remaining on your account will be permanently deleted upon account deletion.
                                </span>
                            </li>
                            <li className="flex flex-wrap">
                                <span>
                                    &#9679; By deleting your account, you will also lose access to all digital content including your unlocked episodes.
                                </span>
                                <span>
                                    &nbsp;&nbsp; Once deleted, your access cannot be restored.
                                </span>

                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="mt-[60px]">
                            <button
                                className={`w-[35px] h-[35px] border-2 rounded-full ${isChecked ? 'bg-green-500 text-white' : ''}`}
                                onClick={handleCheckboxClick}
                            >
                                <CheckIcon />
                            </button>
                            <span className="ml-2">
                                I understand and want to delete my account
                            </span>
                        </div>

                        <div className="w-full mt-[60px] flex gap-2 items-center justify-center">
                            <Link to={`/`}>
                                <button className="w-[240px] h-[50px] bg-green-500 rounded-full shadow text-white font-semibold">
                                    Keep My Account
                                </button>
                            </Link>

                            <button
                                className={`w-[240px] h-[50px] ${isChecked ? 'bg-black' : 'bg-gray-200 cursor-not-allowed'
                                    } rounded-full shadow text-white font-semibold`}
                                disabled={!isChecked}
                            >
                                Delete My Account
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Delete;
