import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hidden: true,
  isLoginModal: false,
  Address: true,
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
    getAddress: (state) => {
      state.Address = !state.Address;
    },
    getWithDrawal: (state) => {
      state.WithDrawal = !state.WithDrawal;
    },
    getBage: (state, action) => {
      state.Bage = action.payload;
    },
    getAccess: (state, action) => {
      state.Access = action.payload;
    },
  },
});
export const {
  setIsLoginModal,
  getHidden,
  getAddress,
  getWithDrawal,
  getBage,
  getAccess
} = Hidden.actions;
export default Hidden.reducer;
