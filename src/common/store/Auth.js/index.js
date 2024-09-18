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
    return true;

   }else{
    auth.signOut()
    throw new Error ( '400');

   }
   
  } catch (error) {
    // console.log(error);
    throw error.message === '400'? new Error ( "Please verify your email before logging in."):new Error ( "Incorrect email or password.");
    // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
  }
  //throw error
});
export const handleAdmin = createAsyncThunk("user/loginadmin", async (payload) => {
  try {
   const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);
   const finduser=await userFireBase.getbyid(userCredential?.user?.uid)
   if(userCredential.user.emailVerified && finduser.success && finduser.role==='admin'){

    const token = await auth.currentUser.getIdToken(true);
    localStorage.setItem("sadsad", token);
    return true;

   }else{
    auth.signOut()
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
        await userFireBase.Add({email:payload.email,uid: userCredential?.user?.uid,role:'user',name: payload?.displayName}, userCredential.user.uid)
        if(!auth.currentUser.emailVerified){
          auth.signOut()
          return false
        }
        return true
      
     
        // Ở đây, bạn có thể chuyển hướng người dùng đến trang khác hoặc thực hiện các hành động khác sau khi đăng ký thành công
      } catch (error) {
        throw new Error('Email already exists.')
        // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
      }
  });
  export const logout = createAsyncThunk("user/logout", async () => {
    try {
        await auth.signOut();
        localStorage.removeItem('sadsadas');
        return false
      } catch (error) {
        throw error
      }
  });
  export const logoutadmin = createAsyncThunk("admin/logout", async () => {
    try {
        await auth.signOut();
        localStorage.removeItem('sadsadas');
        return false
      } catch (error) {
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
        console.log(result)
        await userFireBase.Add({email:result?.user?.email,uid: result?.user?.uid,role:'user',name: result?.user?.displayName},result?.user?.uid)
      }
      return true
      // console.log(token, result.user);
    } catch (error) {
      // Xử lý lỗi đăng nhập
   
      throw error
    }
  });
const authRedux = createSlice({
  name: "AuthRedux",
  initialState: {
    User: false,
    error: null,
    errorregister:null,
    admin: false,
  },
  reducers: {
    setuser:(state,action)=>{
          state.User=action.payload
        
      },
      setad:(state,action)=>{
        state.admin=action.payload
      
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
      .addCase(logoutadmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        
        state.error = null;
        state.errorregister = null;
      })
      .addCase(logoutadmin.rejected, (state, action) => {
        state.admin = false; // Kết thúc quá trình đăng nhập
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
      builder
      .addCase(handleAdmin.fulfilled, (state, action) => {
        state.error = null;
        state.admin = action.payload;
      })
      .addCase(handleAdmin.rejected, (state, action) => {
        state.User = false; // Kết thúc quá trình đăng nhập
        state.error = action.error; // Lưu thông báo lỗi để hiển thị cho người dùng
      });
  },
});
export const {setuser,seterregister,seterr,setad}=authRedux.actions

export default authRedux.reducer;
