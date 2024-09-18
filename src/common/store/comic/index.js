import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import comicFireBase from "../../services/Comic.services";
export const getAllComic = createAsyncThunk("comic/get", async () => {
    try {
      const comic=  await comicFireBase.get()
        return comic.success?comic:[]
    } catch (error) {
      // console.log(error);
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  export const getAlladComic = createAsyncThunk("comic/getad", async () => {
    try {
      const comic=  await comicFireBase.getad()
        return comic.success?comic:[]
    } catch (error) {
      // console.log(error);
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  export const getidComic = createAsyncThunk("comic/getid", async (id) => {
    try {
      const comic=  await comicFireBase.getbyid(id)
        return comic.success?comic:[]
    } catch (error) {
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  export const getrandomComic = createAsyncThunk("comic/getrandom", async (getlimit) => {
    try {
      const comic=  await comicFireBase.getrandom(getlimit)
        return comic.success?comic:[]
    } catch (error) {
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  export const getchaptersComic = createAsyncThunk("comic/chapters", async (id) => {
    try {
      const Chapters=  await comicFireBase.getchapters(id)
        return Chapters.success?Chapters:[]
    } catch (error) {
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  export const getchaptersidComic = createAsyncThunk("comic/chaptersid", async (payload) => {
    try {
      const Chapters=  await comicFireBase.getchapters(payload.id)
        return Chapters.success?Chapters:[]
    } catch (error) {
      throw error
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
    //throw error
  });
  
  const comicRedux = createSlice({
    name: "comicRedux",
    initialState: {
      comic: {},
      comicid:{},
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
        .addCase(getAllComic.fulfilled, (state, action) => {
          state.error = null;
          state.comic = action.payload;
          state.loading=true
        })
        .addCase(getAllComic.rejected, (state, action) => {
          state.comic = {};
          state.loading=false
          state.error = action.error;
        });
        builder
        .addCase(getAlladComic.fulfilled, (state, action) => {
          state.error = null;
          state.comic = action.payload;
          state.loading=true
        })
        .addCase(getAlladComic.rejected, (state, action) => {
          state.comic = {};
          state.loading=false
          state.error = action.error;
        });
        builder
        .addCase(getidComic.fulfilled, (state, action) => {
          state.error = null;
          state.comicid = action.payload;
          state.loadingid=true
        })
        .addCase(getidComic.rejected, (state, action) => {
          state.comicid = {};
          state.loadingid=false
          state.error = action.error;
        });
        builder
        .addCase(getchaptersComic.fulfilled, (state, action) => {
          state.error = null;
          state.Chapters = action.payload;
        })
        .addCase(getchaptersComic.rejected, (state, action) => {
          state.Chapters = {};
          state.error = action.error;
        });
        builder
        .addCase(getrandomComic.fulfilled, (state, action) => {
          state.error = null;
          state.random = action.payload;
        })
        .addCase(getrandomComic.rejected, (state, action) => {
          state.random = {};
          state.error = action.error;
        });
    },
  });
  
  export default comicRedux.reducer;