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
const checkIfOneDayLeft = (sentTime) => {
  const currentTime = new Date(Date.now());
  const oneDayInMs = 24 * 60 * 60 * 1000; 

  const timeDifference = currentTime - new Date(sentTime); 

  if (timeDifference >= oneDayInMs) {
    return false; 
  } else {
    return true; 
  }
};
export const handleLogin = createAsyncThunk("user/login", async (payload) => {
  try {
   const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);
   const finduser=await userFireBase.getbyid(userCredential?.user?.uid)
   const lock=finduser.success?finduser?.lock:true
 
   if(userCredential.user.emailVerified ){
     if(!lock){
      auth.signOut()

        throw new Error('401')
     }
    const token = await auth.currentUser.getIdToken(true);
    localStorage.setItem("sadsadas", token);
    return true;

   }else{
    if(finduser.success){
      if(!checkIfOneDayLeft(finduser?.EmailVerification)){
        await userFireBase.update({EmailVerification:new Date(Date.now())},auth?.currentUser?.uid)
        await sendEmailVerification(auth.currentUser)

      }
    }
    auth.signOut()
    throw new Error ( '400');

   }
   
  } catch (error) {
  
    if (error.message === '400') {
  
      throw new Error(!payload?.language?"Please verify your email before logging in.":"로그인하기 전에 이메일을 확인해 주세요.");
    } else if (error.message === '401') {
      throw new Error(!payload?.language?"Account Locked":"계정이 잠겼습니다.");
    } else {
      throw new Error(!payload?.language?"Incorrect email or password.":"잘못된 이메일 또는 비밀번호입니다.");
    }
    
    // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
  }
  //throw error
});
export const handleLogin19 = createAsyncThunk("user/login19", async (payload) => {
  try {
   const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);
   await userFireBase.update({checkage:true},userCredential?.user?.uid)
   const finduser=await userFireBase.getbyid(userCredential?.user?.uid)
   const lock=finduser.success?finduser?.lock:true
   if(userCredential.user.emailVerified ){
     if(!lock){
      auth.signOut()

        throw new Error('401')
     }
    const token = await auth.currentUser.getIdToken(true);
    localStorage.setItem("sadsadas", token);
    return true;

   }else{
    if(finduser.success){
      if(!checkIfOneDayLeft(finduser?.EmailVerification)){
        await userFireBase.update({EmailVerification:new Date(Date.now())},auth?.currentUser?.uid)
        await sendEmailVerification(auth.currentUser)

      }
    }
    auth.signOut()
    throw new Error ( '400');

   }
   
  } catch (error) {
    // console.log(error);
    if (error.message === '400') {
  
      throw new Error(!payload?.language?"Please verify your email before logging in.":"로그인하기 전에 이메일을 확인해 주세요.");
    } else if (error.message === '401') {
      throw new Error(!payload?.language?"Account Locked":"계정이 잠겼습니다.");
    } else {
      throw new Error(!payload?.language?"Incorrect email or password.":"잘못된 이메일 또는 비밀번호입니다.");
    }
    
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
     
    if(finduser.success){
      if(!checkIfOneDayLeft(finduser?.EmailVerification)){
        await userFireBase.update({EmailVerification:new Date(Date.now())},auth?.currentUser?.uid)
        await sendEmailVerification(auth.currentUser)

      }
    }

    auth.signOut()
    throw new Error ( '400');

   }
  
  } catch (error) {
   
    throw error.message === '400'? new Error ( "로그인하기 전에 이메일을 확인해 주세요."):new Error ( "잘못된 이메일 또는 비밀번호입니다.");
    // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
  }
  //throw error
});
export const handleRegister = createAsyncThunk("user/Register", async (payload) => {
    try {
      const userCredential = await createUserWithEmailAndPassword (auth, payload.email, payload.password);
         await updateProfile(userCredential.user,{ displayName: payload.displayName })
        await sendEmailVerification(auth.currentUser)
        await userFireBase.Add({email:payload.email,uid: userCredential?.user?.uid,role:'user',name: payload?.displayName,follow:0,birthday:payload?.birthday,lock:true,checkage:false, createTime: new Date(Date.now()), EmailVerification:new Date(Date.now())}, userCredential.user.uid)
        if(!auth.currentUser.emailVerified){
          auth.signOut()
          return false
        }
        return true
      
     
        // Ở đây, bạn có thể chuyển hướng người dùng đến trang khác hoặc thực hiện các hành động khác sau khi đăng ký thành công
      } catch (error) {
      
        throw new Error(!payload?.language?'Email already exists.':"이미 이메일이 존재합니다")
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
        await userFireBase.Add({email:result?.user?.email,uid: result?.user?.uid,role:'user',name: result?.user?.displayName,follow:0,lock:true,checkage:false,createTime: new Date(Date.now()), EmailVerification:new Date(Date.now())},result?.user?.uid)
      }else{
        if(!finduser.lock){
          auth.signOut()
          return false
        }
      }
      
      return true
      // console.log(token, result.user);
    } catch (error) {
      // Xử lý lỗi đăng nhập
   
      throw error
    }
  });
  export const handleGoogle19 = createAsyncThunk("user/loginGoogle19", async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await auth.currentUser.getIdToken(true);

      localStorage.setItem('sadsadas', token);
      const finduser=await userFireBase.getbyid(result?.user?.uid)
      if(!finduser?.success){
        await userFireBase.Add({email:result?.user?.email,uid: result?.user?.uid,role:'user',name: result?.user?.displayName,follow:0,lock:true,checkage:true,createTime: new Date(Date.now()), EmailVerification:new Date(Date.now())},result?.user?.uid)
      }else{
        await userFireBase.update({checkage:true},result?.user?.uid)

        if(!finduser.lock){
          auth.signOut()
          return false
        }
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
      .addCase(handleLogin19.fulfilled, (state, action) => {
        state.error = null;
        state.User = action.payload;
      })
      .addCase(handleLogin19.rejected, (state, action) => {
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
      .addCase(handleGoogle19.fulfilled, (state, action) => {
        state.User = action.payload;
      })
      .addCase(handleGoogle19.rejected, (state, action) => {
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
