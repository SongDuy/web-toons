import React, { useState } from "react";
import { Link } from "react-router-dom";
// import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch, useSelector } from 'react-redux';
import { handleRegister, seterregister } from '../../common/store/Auth.js';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import useTimeout from "../../Hooks/useTimeout.js";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import CSS của react-datepicker

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const err = useSelector(state => state.AuthJs.errorregister);
  useTimeout(() => {
    dispatch(seterregister(null));
  }, err ? 3000 : null);

  const getRegister = async () => {
    try {
      const rg = await dispatch(handleRegister({ email, password, displayName, birthday: selectedDate,language }));
      unwrapResult(rg)

      navigate('/')

    } catch (error) {
      console.log(error)
    }
  }

  //Lấy ngôn ngữ
  const language = useSelector(state => state.hidden.language);

  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      {" "}
      {/* backdrop-blur-sm */}
      <div className="w-[400px] h-auto my-10 px-5 pt-5 pb-8 bg-white shadow rounded-lg">
        <div>
          <h1 className="text-[25px] flex justify-center font-semibold">
            {!language ?
              "Sign Up"
              :
              "등록해요"
            }

          </h1>

          <span className="pt-3 pb-5 flex items-center justify-center">
            {!language ?
              " Welcome! Let's take you to your registration page."
              :
              "환영합니다! 등록 페이지로 안내해 드리겠습니다."
            }

          </span>

          {/* Đăng nhập bằng email */}
          <div className="grid grid-cols-1 gap-y-3">

            <div className="w-full h-[50px] grid grid-cols-2 gap-3">
              {/* Nhập tên tài khoản */}
              <input
                type="text"
                className="w-full h-[50px] px-2 border rounded shadow"
                placeholder={!language ? "Full Name" : "전체 이름"}
                value={displayName}
                onChange={(e) => setdisplayName(e.target.value)}
              />

              {/* chọn ngày tháng năm sinh */}
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"  // Định dạng ngày
                className="w-full h-[50px] px-2 border rounded shadow "  // Sử dụng Tailwind CSS để style
                placeholderText={!language ? "Select Date" : "날짜 선택"}
                //placeholderText="Select Date"
                showYearDropdown  // Hiển thị danh sách năm
                showMonthDropdown  // Hiển thị danh sách tháng
                dropdownMode="select"  // Chuyển dropdown sang chế độ select để dễ chọn
              />
            </div>

            {/* Nhập địa chỉ email */}
            <input
              type="email"
              className="w-full h-[50px] px-2 border rounded shadow"
              placeholder={!language ? "Email Address" : "이메일주소"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Nhập mật khẩu */}
            <input
              type="password"
              className="w-full h-[50px] px-2 border rounded shadow"
              placeholder={!language ? "Password" : "비밀번호"}
              value={password}
              form="off"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* <Link
              to="/forgot-password"
              className="w-[160px] text-blue-800 cursor-pointer"
            >
              {!language ?
                "Reset your password?"
                :
                "비밀번호를 재설정하시겠습니까?"
              }
            </Link> */}
            {!language ?
              <Link
                to="/forgot-password"
                className="w-[160px] text-blue-800 cursor-pointer"
              >
                Reset your password?
              </Link>
              :

              <Link
                to="/forgot-password"
                className="w-[240px] text-blue-800 cursor-pointer"
              >
                비밀번호를 재설정하시겠습니까?
              </Link>
            }
            {err && <p>{err.message}</p>}

            <button
              className="w-full h-[50px] bg-black text-white rounded font-semibold"
              onClick={getRegister}
            >
              {!language ?
                "Continue to Verify Email"
                :
                "이메일 확인을 계속 진행하세요"
              }

            </button>

            <div className="w-full h-[50px] flex gap-x-1 items-center justify-center border rounded">
              <span>
                {!language ?
                  " Already have an account?"
                  :
                  "이미 계정이 있으신가요?"
                }

              </span>

              <Link to="/" className="text-blue-800 font-semibold">
                {!language ?
                  "Login"
                  :
                  "로그인"
                }

              </Link>
            </div>

          </div>

          {/* <div class="w-full my-5 flex items-center">
            <hr class="flex-1 border-t border-gray-300" />
            <span class="px-4">
              {!language ?
                "OR"
                :
                "또는"
              }
            </span>
            <hr class="flex-1 border-t border-gray-300" />
          </div> */}

          {/* <div className="w-full h-full grid grid-cols-1 gap-y-5">
            <button className="w-full h-[50px] cursor-pointer px-5 py-2 bg-red-50 hover:bg-red-100 shadow-md flex items-center justify-center rounded">
              <span className="mr-auto">
                <GoogleIcon />
              </span>

              <span className="mr-auto font-semibold">
                {!language ?
                  " Continue with Google"
                  :
                  "Google로 계속 진행"
                }

              </span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
