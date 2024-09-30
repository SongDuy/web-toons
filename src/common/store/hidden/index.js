import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hidden: true,
  isLoginModal: false,
  isLogin19Modal: false,
  language: false,
  payment: false,
  currentStepOriginal:1,
  currentStepVideo:1,
} ;
const Hidden = createSlice({
  name: 'hidden',
  initialState,
  reducers: {
    setIsLoginModal: (state,action) => {
      state.isLoginModal= action.payload;
    },
    setIsLogin19Modal: (state,action) => {
      state.isLogin19Modal= action.payload;
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
    setcurrentStepOriginal: (state,action) => {
      state.currentStepOriginal= action.payload;
    },
    setcurrentStepVideo: (state,action) => {
      state.currentStepVideo= action.payload;
    },
  },
});
export const {
  setIsLoginModal,
  getHidden,
  getlanguage,
  setIspayment,
  setIsLogin19Modal,
  setcurrentStepOriginal,
  setcurrentStepVideo
} = Hidden.actions;
export default Hidden.reducer;
