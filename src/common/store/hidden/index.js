import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hidden: true,
  isLoginModal: false,
  language: false,
  payment: false,

} ;
const Hidden = createSlice({
  name: 'hidden',
  initialState,
  reducers: {
    setIsLoginModal: (state,action) => {
      state.isLoginModal= action.payload;
    },
    getHidden: (state) => {
      state.hidden = !state.hidden;
    },
    getlanguage: (state) => {
      state.language = !state.language;
    },
    setIspayment: (state,action) => {
      state.payment= action.payload;
    },
  
  },
});
export const {
  setIsLoginModal,
  getHidden,
  getlanguage,
  setIspayment
} = Hidden.actions;
export default Hidden.reducer;
