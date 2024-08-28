import { auth } from "../themes/firebase";

import { signInWithEmailAndPassword,signInWithPopup ,GoogleAuthProvider,createUserWithEmailAndPassword,updateProfile   } from "firebase/auth";
import userFireBase from "../services/User.services"; 
export const handleLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const token = await auth.currentUser.getIdToken(true);
    localStorage.setItem('sadsadas', token);
    console.log("Đăng nhập thành công!", token);
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
  }
};

export const handleGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const token = await auth.currentUser.getIdToken(true);
    localStorage.setItem('sadsadas', token);
    const finduser=await userFireBase.getbyid(result?.user?.uid)
    if(!finduser?.success){
      await userFireBase.Add({email:result?.user?.email,uid: result?.user?.uid,role:'user'},result?.user?.uid)
    }
    // console.log(token, result.user);
  } catch (error) {
    // Xử lý lỗi đăng nhập
    console.error("Lỗi đăng nhập:", error);
  }
};
export  const handleRegister = async  (email, password,displayName) => {
    try {
      console.log(email, password,displayName);
    const userCredential = await createUserWithEmailAndPassword (auth, email, password);
       await updateProfile(userCredential.user,{ displayName: displayName })
      await userFireBase.Add({email,uid: userCredential?.user?.uid,role:'user'}, userCredential.user.uid)
      console.log("Đăng  ký thành công!");
      console.log(auth.currentUser)

      // Ở đây, bạn có thể chuyển hướng người dùng đến trang khác hoặc thực hiện các hành động khác sau khi đăng ký thành công
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
  };

export const logout = async () => {
  try {
    await auth.signOut();
    console.log('Đăng xuất thành công',process.env,auth.currentUser);
    localStorage.removeItem('sadsadas');
  } catch (error) {
    console.error('Lỗi đăng xuất:', error);
  }
};
  