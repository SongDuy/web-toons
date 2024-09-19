import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import VideoFireBase from "../../services/Video.services";
export const getAllVideo = createAsyncThunk("Video/get", async () => {
    try {
      const Video=  await VideoFireBase.get()
        return Video.success?Video:[]
    } catch (error) {
      // console.log(error);
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  export const getAlladVideo = createAsyncThunk("Video/getad", async () => {
    try {
      const Video=  await VideoFireBase.getad()
        return Video.success?Video:[]
    } catch (error) {
      // console.log(error);
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  export const getidVideo = createAsyncThunk("Video/getid", async (id) => {
    try {
      const Video=  await VideoFireBase.getbyid(id)
        return Video.success?Video:[]
    } catch (error) {
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  export const getrandomVideo = createAsyncThunk("Video/getrandom", async (getlimit) => {
    try {
      const Video=  await VideoFireBase.getrandom(getlimit)
        return Video.success?Video:[]
    } catch (error) {
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  export const getchaptersVideo = createAsyncThunk("Video/chapters", async (id) => {
    try {
      const Chapters=  await VideoFireBase.getchapters(id)
        return Chapters.success?Chapters:[]
    } catch (error) {
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  export const getchaptersidVideo = createAsyncThunk("Video/chaptersid", async (payload) => {
    try {
      const Chapters=  await VideoFireBase.getchapters(payload.id)
        return Chapters.success?Chapters:[]
    } catch (error) {
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  
  const videoRedux = createSlice({
    name: "videoRedux",
    initialState: {
      video: {},
      videoid:{},
      random:{},
      Chapters:{},
      error: null,
      loading:false,
      loadingid: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllVideo.fulfilled, (state, action) => {
          state.error = null;
          state.video = action.payload;
          state.loading=true
        })
        .addCase(getAllVideo.rejected, (state, action) => {
          state.video = {};
          state.loading=false
          state.error = action.error;
        });
        builder
        .addCase(getAlladVideo.fulfilled, (state, action) => {
          state.error = null;
          state.video = action.payload;
          state.loading=true
        })
        .addCase(getAlladVideo.rejected, (state, action) => {
          state.video = {};
          state.loading=false
          state.error = action.error;
        });
        builder
        .addCase(getidVideo.fulfilled, (state, action) => {
          state.error = null;
          state.videoid = action.payload;
          state.loadingid=true
        })
        .addCase(getidVideo.rejected, (state, action) => {
          state.videoid = {};
          state.loadingid=false
          state.error = action.error;
        });
        builder
        .addCase(getchaptersVideo.fulfilled, (state, action) => {
          state.error = null;
          state.Chapters = action.payload;
        })
        .addCase(getchaptersVideo.rejected, (state, action) => {
          state.Chapters = {};
          state.error = action.error;
        });
        builder
        .addCase(getrandomVideo.fulfilled, (state, action) => {
          state.error = null;
          state.random = action.payload;
        })
        .addCase(getrandomVideo.rejected, (state, action) => {
          state.random = {};
          state.error = action.error;
        });
    },
  });
  
  export default videoRedux.reducer;