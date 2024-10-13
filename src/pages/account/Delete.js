import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckIcon from "@mui/icons-material/Check";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../../common/themes/firebase";
import CommentFireBase from "../../common/services/Comment.services";
import comicFireBase from "../../common/services/Comic.services";
import postFireBase from "../../common/services/post.services";
import RateFireBase from "../../common/services/Rate.services";
import SubscribeFireBase from "../../common/services/Subscribe.services";
import { useDispatch } from "react-redux";
import userFireBase from "../../common/services/User.services";
import { logout } from "../../common/store/Auth.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import VideoFireBase from "../../common/services/Video.services";
import FollowFireBase from "../../common/services/Follow.services";
import PaymentFireBase from "../../common/services/Payment.services";


const Delete = () => {
  // Nhấn vào ô check đồng ý xóa tài khoản
  const [isChecked, setIsChecked] = useState(false);
  const [Password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const [checkgoogle, setcheckgoogle] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    const user = auth.currentUser;
    console.log(user.providerData)
    const isGoogleProvider = user.providerData.some(
      (provider) => provider.providerId === "password"
    );
    setcheckgoogle(isGoogleProvider)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };
  const deleteAccount = async () => {
    const user = auth.currentUser; // Lấy người dùng hiện tại

    if (user) {
      try {
        const credential = checkgoogle && EmailAuthProvider.credential(user.email, Password); // Giả sử bạn đã lấy được mật khẩu từ người dùng
        checkgoogle && await reauthenticateWithCredential(user, credential);
        await CommentFireBase.deleteAccount(auth.currentUser.uid);
        await comicFireBase.deleteAccount(auth.currentUser.uid);
        await postFireBase.deleteAccount(auth.currentUser.uid);
        await RateFireBase.deleteAccount(auth.currentUser.uid);
        await SubscribeFireBase.deleteAccount(auth.currentUser.uid);
        await userFireBase.deleteAccount(auth.currentUser.uid);
        await VideoFireBase.deleteAccount(auth.currentUser.uid);
        await FollowFireBase.deleteAccount(auth.currentUser.uid);
        await PaymentFireBase.deleteAccount(auth.currentUser.uid)
        await user.delete()
        dispatch(logout());
        setOpen(false);

        // Thực hiện các hành động cần thiết sau khi xóa tài khoản, ví dụ: chuyển hướng người dùng, xóa dữ liệu liên quan, ...
      } catch (error) {
        seterror(!language ? 'Incorrect  password.' : "잘못된 비밀번호입니다.");
        console.error("Lỗi khi xóa tài khoản:", error);
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
      }
    } else {
      console.log("Không có người dùng nào đang đăng nhập.");
      // Xử lý trường hợp không có người dùng đăng nhập
    }
  };

  //Lấy ngôn ngữ
  const language = useSelector((state) => state.hidden.language);

  return (
    <div className="w-full h-full bg-gray-100 py-[40px] flex justify-center items-center">
      <div className="w-[1112px] h-full">
        {/* Tiêu đề */}
        <h1 className="text-[22px] font-semibold">

          {!language ?
            (<span> Account Delete </span>)
            :
            (<span> 계정 삭제 </span>)
          }
        </h1>

        {/* Nội dung */}
        <div className="w-auto border h-full mt-[15px] xs:px-[20px] sm:px-[60px] md:px-[90px] lg:px-[110px] xl:px-[130px] 2xl:px-[145px] 3xl:px-[155px] py-[80px] bg-white">
          <div className="w-full grid grid-cols-1 gap-2">
            <h1 className="text-[18px] font-semibold">
              {!language ?
                (<span>
                  Are you sure you want to delete your account?
                </span>)
                :
                (<span>
                  정말로 계정을 삭제하시겠습니까?
                </span>)
              }

            </h1>
            <span className="w-full">
              {!language ?
                (<span>
                  Deleting your account is permanent and will remove all subscription history.
                </span>)
                :
                (<span>
                  계정을 삭제하면 구독 기록이 영구적으로 삭제됩니다.
                </span>)
              }

            </span>
          </div>

          <div className="w-full mt-[60px] grid grid-cols-1 gap-2">
            <h1 className="text-[18px] font-semibold">
              {!language ?
                (<span>
                  Before you go...
                </span>)
                :
                (<span>
                  가기 전에...
                </span>)
              }

            </h1>
            <ul className="grid grid-cols-1 gap-1">
              <li className="flex flex-wrap">
                {!language ?
                  (<span className="min-w-full">
                    &#9679; If you wish to unsubscribe from receiving email notifications, you can change your
                  </span>)
                  :
                  (<span className="min-w-full">
                    &#9679; 이메일 알림 수신 구독을 취소하려면 다음을 변경할 수 있습니다
                  </span>)
                }

                {!language ?
                  (<span>
                    &nbsp;&nbsp; settings at{" "}
                    <Link to={`/account`} className="text-blue-500">
                      {" "}
                      ACCOUNT <NavigateNextIcon /> Email Notification.{" "}
                    </Link>
                  </span>)
                  :
                  (<span>
                    &nbsp;&nbsp; 설정 위치{" "}
                    <Link to={`/account`} className="text-blue-500">
                      {" "}
                      계정 <NavigateNextIcon /> 이메일 알림.{" "}
                    </Link>
                  </span>)
                }

              </li>
              <li className="flex flex-wrap">
                {!language ?
                  (<span className="min-w-full">
                    &#9679; Any comments you wrote will not be deleted automatically.
                  </span>)
                  :
                  (<span className="min-w-full">
                    &#9679; 작성하신 댓글은 자동으로 삭제되지 않습니다.
                  </span>)
                }

                {!language ?
                  (<span>
                    &nbsp;&nbsp; Please go to{" "}
                    <Link to={`/mycomment`} className="text-blue-500">
                      {" "}
                      MY <NavigateNextIcon /> Comments{" "}
                    </Link>{" "}
                    to delete any comments before deleting your account.
                  </span>)
                  :
                  (<span>
                    &nbsp;&nbsp; 가주세요{" "}
                    <Link to={`/mycomment`} className="text-blue-500">
                      {" "}
                      나의 <NavigateNextIcon /> 댓글{" "}
                    </Link>{" "}
                    계정을 삭제하기 전에 댓글을 삭제합니다.
                  </span>)
                }
              </li>
              <li className="flex flex-wrap">
                {!language ?
                  (<span>
                    &#9679; Coins remaining on your account will be permanently
                    deleted upon account deletion.
                  </span>)
                  :
                  (<span>
                    &#9679; 계정 삭제 시 남은 코인은 영구적으로 삭제됩니다.
                  </span>)
                }
              </li>
              <li className="flex flex-wrap">
                {!language ?
                  (<span>
                    &#9679; By deleting your account, you will also lose access to
                    all digital content including your unlocked episodes.
                  </span>)
                  :
                  (<span>
                    &#9679; 계정을 삭제하면 잠금 해제된 에피소드를 포함한 모든 디지털 콘텐츠에 대한 액세스 권한을 잃게 됩니다.
                  </span>)
                }

                {!language ?
                  (<span>
                    &nbsp;&nbsp; Once deleted, your access cannot be restored.
                  </span>)
                  :
                  (<span>
                    &nbsp;&nbsp; 삭제되면 복구할 수 없습니다.
                  </span>)
                }

              </li>
            </ul>
          </div>

          <div>
            <div className="mt-[60px]">
              <button
                className={`w-[35px] h-[35px] border-2 rounded-full ${isChecked ? "bg-green-500 text-white" : ""
                  }`}
                onClick={handleCheckboxClick}
              >
                <CheckIcon />
              </button>
              {!language ?
                (<span className="ml-2"> I understand and want to delete my account. </span>)
                :
                (<span className="ml-2"> 이해했으며 내 계정을 삭제하고 싶습니다. </span>)
              }

            </div>

            <div className="w-full mt-[60px] flex gap-3">
              <Link to={`/`} className="w-1/2 h-[50px] bg-green-500 rounded-full shadow text-white font-semibold flex items-center justify-center">
                {!language ? "Keep My Account" : "내 계정을 유지합니다"}
              </Link>

              <button
                className={`w-1/2 h-[50px] ${isChecked ? "bg-black" : "bg-gray-200 cursor-not-allowed"} rounded-full shadow text-white font-semibold`}
                disabled={!isChecked}
                onClick={handleClickOpen}
              >

                {!language ?
                  (<span className="ml-2">  Delete My Account </span>)
                  :
                  (<span className="ml-2"> 내 계정을 삭제합니다 </span>)
                }
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
          {!language ? "Re-enter password?" : "암호를 다시 입력하다"}
        </DialogTitle>
        {checkgoogle &&
          <DialogContent>

            <TextField
              autoFocus
              margin="dense"
              id="password"
              label={!language ? "Password" : "비밀번호"}
              type="password"
              fullWidth
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <DialogContentText id="alert-dialog-description">
                {error}
              </DialogContentText>
            )}

          </DialogContent>
        }
        <DialogActions>
          <Button onClick={handleClose}>
            {!language ?
              "Disagree"
              :
              "비동의"
            }
          </Button>
          <Button onClick={deleteAccount} autoFocus>
            {!language ?
              "Agree"
              :
              "동의"
            }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Delete;
