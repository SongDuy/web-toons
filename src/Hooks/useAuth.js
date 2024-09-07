import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setuser } from '../common/store/Auth.js';
import { getAccount } from '../common/store/Account';
import { auth } from '../common/themes/firebase';
import { unwrapResult } from '@reduxjs/toolkit';

export const AuthProvider = ({ children }) => {
 const   dispatch = useDispatch();
 const navigate = useNavigate();

 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          dispatch(setuser(true));
       const account= await  dispatch(getAccount(user.uid));
       unwrapResult(account)
       } else {
          dispatch(setuser(false));
         navigate('/');
       }
      } catch (error) {
        
      }
   });

   return () => unsubscribe();
 }, [dispatch, navigate]);
return children

};