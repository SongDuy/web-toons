import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setad } from '../common/store/Auth.js/index.js';
import { getAccount } from '../common/store/Account';
import { auth } from '../common/themes/firebase';
import { unwrapResult } from '@reduxjs/toolkit';

export const AuthadProvider = ({ children }) => {
 const   dispatch = useDispatch();
 const navigate = useNavigate();

 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const account = await dispatch(getAccount(user.uid));
        const admin =unwrapResult(account); // Giả sử unwrapResult trích xuất payload
    
        if (admin.role === "admin") {
          dispatch(setad(true));
        } else {
          dispatch(setad(false));
          navigate('/admin/login');
        }
    
      } catch (error) {
        // Xử lý lỗi nếu có (ví dụ: không tìm thấy tài khoản)
        console.error("Lỗi khi lấy thông tin tài khoản:", error);
        navigate('/admin/login'); 
      }
    } else {
      navigate('/admin/login');
    }
   });

   return () => unsubscribe();
 }, [dispatch, navigate]);
return children

};