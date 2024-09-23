import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userFireBase from "../../services/User.services";
export const getAccount = createAsyncThunk("Account/get", async (id) => {
    try {
      const User=  await userFireBase.getbyid(id)
        return User.success?User:[]
    } catch (error) {
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  export const updateAccount = createAsyncThunk("Account/update", async (payload) => {
    try {
      await userFireBase.update(payload,payload?.id)
      const User=  await userFireBase.getbyid(payload?.id)
        return User.success?User:[]
    } catch (error) {
      // console.log(error);
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  const AccountRedux = createSlice({
    name: "AccountRedux",
    initialState: {
      Account: {},
      error: null,
      loading:false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAccount.fulfilled, (state, action) => {
          state.error = null;
          state.Account = action.payload;
          state.loading=true
        })
        .addCase(getAccount.rejected, (state, action) => {
          state.Account = {};
          state.loading=false
          state.error = action.error;
        });
        builder
        .addCase(updateAccount.fulfilled, (state, action) => {
          state.error = null;
          state.Account = action.payload;
          state.loading=true
        })
        .addCase(updateAccount.rejected, (state, action) => {
          state.Account = {};
          state.loading=false
          state.error = action.error;
        });
     
    },
  });
  
  export default AccountRedux.reducer;