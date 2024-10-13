import React from 'react';
import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import userFireBase from '../../../common/services/User.services';
import { auth } from '../../../common/themes/firebase';
import { useDispatch } from 'react-redux';
import { setcheck19Modal } from '../../../common/store/hidden';
import { getAccount } from '../../../common/store/Account';
import { unwrapResult } from '@reduxjs/toolkit';

const Login19AgePage = ({ closeModal,check }) => {
    // Mở và đóng modal login 19 tuổi
    const dispatch = useDispatch();

    const handleBackdropClick =async (event) => {
        try {
            if (event.target === event.currentTarget && auth?.currentUser) {
                if(check){
                    await userFireBase.update({checkage:true},auth?.currentUser?.uid)
                    dispatch(setcheck19Modal(true))
                    const account = await dispatch(getAccount(auth?.currentUser?.uid));
                    unwrapResult(account);
                    closeModal();
                }else{
                    await userFireBase.update({checkage:false},auth?.currentUser?.uid)
                    dispatch(setcheck19Modal(false))
                    const account = await dispatch(getAccount(auth?.currentUser?.uid));
                     unwrapResult(account); 
                    closeModal();
                }
              
            }
        } catch (error) {
            
        }
    };

    const language = useSelector(state => state.hidden.language);
    return (
      <>
      {check?  <div
            className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center fixed inset-0 z-50"
            onClick={handleBackdropClick}
        >
            <div className="w-[350px] bg-white rounded-lg shadow-lg pt-10 pb-10 text-center transform transition-all duration-300">
                <h2 className="text-2xl font-bold mb-2">
                    {!language ? "Login Successful!" : "로그인 성공!"}
                </h2>
                <p className="text-gray-600">
                    {!language
                        ? "You have successfully logged in to access 19+ content."
                        : "19+ 콘텐츠에 대한 로그인에 성공했습니다."}
                </p>

                <div className="w-full mt-2 flex items-center justify-center gap-2">
                    <div className="w-[35px] h-[35px] text-white rounded-full bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 flex items-center justify-center">
                        <CheckIcon />
                    </div>
                    <h1 className="text-shadow-black text-yellow-500 text-xl">19+</h1>
                </div>

                <div className="w-full mt-10 flex items-center justify-center">
                    <button
                        className="w-1/2 h-[50px] text-white font-semibold bg-red-500 hover:bg-red-600 shadow rounded-full flex items-center justify-center"
                        onClick={handleBackdropClick}
                    >
                        {!language ? "Cancel" : "취소"}
                    </button>
                </div>
            </div>
        </div>:  <div
            className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center fixed inset-0 z-50"
            onClick={handleBackdropClick}
        >
            <div className="w-[350px] bg-white rounded-lg shadow-lg pt-10 pb-10 text-center transform transition-all duration-300">
                <h2 className="text-2xl font-bold mb-2">
                    {!language ? "Login Successful!" : "로그인 성공!"}
                </h2>
                <p className="text-gray-600">
                    {!language
                        ? "You have successfully logged in to access 19+ content."
                        : "19+ 콘텐츠에 대한 로그인에 성공했습니다."}
                </p>

                <div className="w-full mt-2 flex items-center justify-center gap-2">
                    <div className="w-[35px] h-[35px] text-white rounded-full bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 flex items-center justify-center">
                        <CheckIcon />
                    </div>
                    <h1 className="text-shadow-black text-yellow-500 text-xl">19+</h1>
                </div>

                <div className="w-full mt-10 flex items-center justify-center">
                    <button
                        className="w-1/2 h-[50px] text-white font-semibold bg-red-500 hover:bg-red-600 shadow rounded-full flex items-center justify-center"
                        onClick={handleBackdropClick}
                    >
                        {!language ? "Cancel" : "취소"}
                    </button>
                </div>
            </div>
        </div>}
      </>

    );
}

export default Login19AgePage;
