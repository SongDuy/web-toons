import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile, sendEmailVerification 
} from "firebase/auth";
import userFireBase from "../../services/User.services";
import { auth } from "../../themes/firebase";
export const handleLogin = createAsyncThunk("user/login", async (payload) => {
  try {
   const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);
   if(userCredential.user.emailVerified){
    const token = await auth.currentUser.getIdToken(true);
    localStorage.setItem("sadsadas", token);
    console.log("Đăng nhập thành công!", token);
    return true;

   }else{
    auth.signOut()
    console.log("Vui lòng xác nhận email trước khi đăng nhập.");
    throw new Error ( '400');

   }
   
  } catch (error) {
    // console.log(error);
    throw error.message === '400'? new Error ( "Please verify your email before logging in."):new Error ( "Incorrect email or password.");
    // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
  }
  //throw error
});
export const handleRegister = createAsyncThunk("user/Register", async (payload) => {
    try {
      const userCredential = await createUserWithEmailAndPassword (auth, payload.email, payload.password);
         await updateProfile(userCredential.user,{ displayName: payload.displayName })
        await sendEmailVerification(auth.currentUser)
        await userFireBase.Add({email:payload.email,uid: userCredential?.user?.uid,role:'user'}, userCredential.user.uid)
        console.log("Đăng  ký thành công!");
        if(!auth.currentUser.emailVerified){
          auth.signOut()
          return false
        }
        return true
      
     
        // Ở đây, bạn có thể chuyển hướng người dùng đến trang khác hoặc thực hiện các hành động khác sau khi đăng ký thành công
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        throw new Error('Email already exists.')
        // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
      }
  });
  export const logout = createAsyncThunk("user/logout", async () => {
    try {
        await auth.signOut();
        console.log('Đăng xuất thành công',process.env,auth.currentUser);
        localStorage.removeItem('sadsadas');
        return false
      } catch (error) {
        console.error('Lỗi đăng xuất:', error);
        throw error
      }
  });
  export const handleGoogle = createAsyncThunk("user/loginGoogle", async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await auth.currentUser.getIdToken(true);
      localStorage.setItem('sadsadas', token);
      const finduser=await userFireBase.getbyid(result?.user?.uid)
      if(!finduser?.success){
        await userFireBase.Add({email:result?.user?.email,uid: result?.user?.uid,role:'user'},result?.user?.uid)
      }
      return true
      // console.log(token, result.user);
    } catch (error) {
      // Xử lý lỗi đăng nhập
      console.error("Lỗi đăng nhập:", error);
      throw error
    }
  });
const authRedux = createSlice({
  name: "AuthRedux",
  initialState: {
    User: false,
    error: null,
    errorregister:null,
    admin: true,
  },
  reducers: {
    setuser:(state,action)=>{
          state.User=action.payload
        
      },
      seterr:(state,action)=>{
        state.error=action.payload
      
    },
    seterregister:(state,action)=>{
      console.log(action.payload)
      state.errorregister=action.payload
    
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.error = null;
        state.User = action.payload;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.User = false; // Kết thúc quá trình đăng nhập
        state.error = action.error; // Lưu thông báo lỗi để hiển thị cho người dùng
      });
      builder
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.User = action.payload;
        state.errorregister = null;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.User = false; // Kết thúc quá trình đăng nhập
        state.errorregister = action.error; // Lưu thông báo lỗi để hiển thị cho người dùng
      });
      builder
      .addCase(logout.fulfilled, (state, action) => {
        state.User = action.payload;
        state.error = null;
        state.errorregister = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.User = false; // Kết thúc quá trình đăng nhập
        state.error = action.error; // Lưu thông báo lỗi để hiển thị cho người dùng
      });
      builder
      .addCase(handleGoogle.fulfilled, (state, action) => {
        state.User = action.payload;
      })
      .addCase(handleGoogle.rejected, (state, action) => {
        state.User = false; // Kết thúc quá trình đăng nhập
        state.error = action.error; // Lưu thông báo lỗi để hiển thị cho người dùng
      });
  },
});
export const {setuser,seterregister,seterr}=authRedux.actions

export default authRedux.reducer;
