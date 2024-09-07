import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CommentFireBase from "../../services/Comment.services";

export const getidseries = createAsyncThunk("Comment/idseries", async (id) => {
  try {
      const comment =await CommentFireBase.getbyidseries(id)
      return comment.success?comment:[]
    
    } catch (error) {
      throw error
     
    }
});
export const idusercomment = createAsyncThunk("Comment/iduser", async (id) => {
  try {
      const comment =await CommentFireBase.getbyid(id)
      console.log(comment)

      return comment.success?comment:[]
    
    } catch (error) {
      console.log(error)
      throw error
     
    }
});
export const AddComment = createAsyncThunk("Comment/Add", async (payload) => {
    try {
        await CommentFireBase.Add(payload)
        const comment =await CommentFireBase.getbyidseries(payload.id)
        return comment.success?comment:[]
       
      } catch (error) {
        throw error
      }
  });
 
  
const commentRedux = createSlice({
  name: "commentRedux",
  initialState: {
    comment: {},
    commentid: [],
    error: null,
  
  },
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
    .addCase(getidseries.fulfilled, (state, action) => {
      state.error = null;
      state.comment = action.payload;
    })
    .addCase(getidseries.rejected, (state, action) => {
      state.comment = {}; // Kết thúc quá trình đăng nhập
      state.error = action.error; // Lưu thông báo lỗi để hiển thị cho người dùng
    });
   
    builder
      .addCase(AddComment.fulfilled, (state, action) => {
        state.error = null;
        state.comment = action.payload;
      })
      .addCase(AddComment.rejected, (state, action) => {
        state.comment = {}; // Kết thúc quá trình đăng nhập
        state.error = action.error; // Lưu thông báo lỗi để hiển thị cho người dùng
      });
      builder
      .addCase(idusercomment.fulfilled, (state, action) => {
        state.error = null;
        state.commentid = action.payload;
      })
      .addCase(idusercomment.rejected, (state, action) => {
        state.commentid = []; // Kết thúc quá trình đăng nhập
        state.error = action.error; // Lưu thông báo lỗi để hiển thị cho người dùng
      });
  },
});

export default commentRedux.reducer;
