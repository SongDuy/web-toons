import React, { useState } from "react";

import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckIcon from '@mui/icons-material/Check';
import {   reauthenticateWithCredential, 
    EmailAuthProvider, 
    deleteUser  } from 'firebase/auth';
import { auth } from "../../common/themes/firebase";
import CommentFireBase from "../../common/services/Comment.services";
import comicFireBase from "../../common/services/Comic.services";
import postFireBase from "../../common/services/post.services";
import RateFireBase from "../../common/services/Rate.services";
import SubscribeFireBase from "../../common/services/Subscribe.services";
import {  useDispatch } from 'react-redux';
import userFireBase from "../../common/services/User.services";
import { logout } from "../../common/store/Auth.js";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';   
import DialogContentText from '@mui/material/DialogContentText';

const Delete = () => {

    // Nhấn vào ô check đồng ý xóa tài khoản
    const [isChecked, setIsChecked] = useState(false);
    const [Password, setPassword] = useState('');
    const [error, seterror] = useState('');

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
      const user = auth.currentUser;
      const isGoogleProvider = user.providerData.some(provider => provider.providerId === 'google.com');
      console.log(isGoogleProvider)
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };
  const  deleteAccount=async ()=> {
        const user = auth.currentUser; // Lấy người dùng hiện tại
      
        if (user) {
          try {
            const credential = EmailAuthProvider.credential(user.email, Password); // Giả sử bạn đã lấy được mật khẩu từ người dùng
            await reauthenticateWithCredential(user, credential);
           await   CommentFireBase.deleteAccount(auth.currentUser.uid)
           await   comicFireBase.deleteAccount(auth.currentUser.uid)
           await   postFireBase.deleteAccount(auth.currentUser.uid)
           await   RateFireBase.deleteAccount(auth.currentUser.uid)
           await   SubscribeFireBase.deleteAccount(auth.currentUser.uid)
           await   userFireBase.deleteAccount(auth.currentUser.uid)

            await deleteUser(user);
            dispatch(logout())
            setOpen(false);

            // Thực hiện các hành động cần thiết sau khi xóa tài khoản, ví dụ: chuyển hướng người dùng, xóa dữ liệu liên quan, ...
          } catch (error) {
            seterror('"Incorrect  password.')
            console.error('Lỗi khi xóa tài khoản:', error);
            // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
          }
        } else {
          console.log('Không có người dùng nào đang đăng nhập.');
          // Xử lý trường hợp không có người dùng đăng nhập
        }
      }
    return (
        <div className="w-full h-full bg-gray-100 py-[40px] flex justify-center items-center">
            <div className="w-[1112px] h-full">
                {/* Tiêu đề */}
                <h1 className="text-[22px] font-semibold">
                    Account Delete
                </h1>

                {/* Nội dung */}
                <div className="w-full h-full mt-[15px] px-[155px] py-[80px] bg-white">
                    <div className="w-full grid grid-cols-1 gap-2">
                        <h1 className="text-[18px] font-semibold">
                            Are you sure you want to delete your account?
                        </h1>
                        <span className="w-full">
                            Deleting your account is permanent and will remove all subscription history.
                        </span>
                    </div>

                    <div className="w-full mt-[60px] grid grid-cols-1 gap-2">
                        <h1 className="text-[18px] font-semibold">
                            Before you go...
                        </h1>
                        <ul className="grid grid-cols-1 gap-1">
                            <li className="flex flex-wrap">
                                <span>
                                    &#9679; If you wish to unsubscribe from receiving email notifications, you can change your
                                </span>
                                <span>
                                    &nbsp;&nbsp; settings at <Link to={`/account`} className="text-blue-500"> ACCOUNT <NavigateNextIcon /> Email Notification. </Link>
                                </span>
                            </li>
                            <li className="flex flex-wrap">
                                <span>
                                    &#9679; Any comments you wrote will not be deleted automatically.
                                </span>
                                <span>
                                    &nbsp;&nbsp; Please go to <Link to={`/mycomment`} className="text-blue-500"> MY <NavigateNextIcon /> Comments </Link> to delete any comments before deleting your account.
                                </span>
                            </li>
                            <li className="flex flex-wrap">
                                <span>
                                    &#9679; Coins remaining on your account will be permanently deleted upon account deletion.
                                </span>
                            </li>
                            <li className="flex flex-wrap">
                                <span>
                                    &#9679; By deleting your account, you will also lose access to all digital content including your unlocked episodes.
                                </span>
                                <span>
                                    &nbsp;&nbsp; Once deleted, your access cannot be restored.
                                </span>

                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="mt-[60px]">
                            <button
                                className={`w-[35px] h-[35px] border-2 rounded-full ${isChecked ? 'bg-green-500 text-white' : ''}`}
                                onClick={handleCheckboxClick}
                            >
                                <CheckIcon />
                            </button>
                            <span className="ml-2">
                                I understand and want to delete my account
                            </span>
                        </div>

                        <div className="w-full mt-[60px] flex gap-3 items-center justify-center">
                            <Link to={`/`}>
                                <button className="w-[240px] h-[50px] bg-green-500 rounded-full shadow text-white font-semibold">
                                    Keep My Account
                                </button>
                            </Link>

                            <button
                                className={`w-[240px] h-[50px] ${isChecked ? 'bg-black' : 'bg-gray-200 cursor-not-allowed'
                                    } rounded-full shadow text-white font-semibold`}
                                disabled={!isChecked}
                                onClick={handleClickOpen }
                            >
                                Delete My Account
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Re-enter password?"}
        </DialogTitle>
        <DialogContent>
          
          <TextField
          autoFocus
          margin="dense"   

          id="password"
          label="Re-enter password"
          type="password"
          fullWidth
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error&&
         <DialogContentText id="alert-dialog-description">
           {error}
          </DialogContentText>
}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={deleteAccount} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
};

export default Delete;
