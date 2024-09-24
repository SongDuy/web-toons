import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hidden: true,
  isLoginModal: false,
  language: false,
  WithDrawal: true,
  Access:false,
  Bage: false,
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
  
  },
});
export const {
  setIsLoginModal,
  getHidden,
  getlanguage,
} = Hidden.actions;
export default Hidden.reducer;
