import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hidden: true,
  isLoginModal: false,
  isLogin19Modal: false,
  language: false,
  payment: false,
  check19Modal:false,
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
    setlanguage: (state,action) => {
      state.language = !action.payload;
    },
    setcheck19Modal: (state,action) => {
      state.check19Modal = action.payload;
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
  setcurrentStepVideo,
  setlanguage,
  setcheck19Modal
} = Hidden.actions;
export default Hidden.reducer;
