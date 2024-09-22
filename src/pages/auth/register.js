import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
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
      console.log(selectedDate)
      const rg = await dispatch(handleRegister({ email, password, displayName,birthday:selectedDate }));
      unwrapResult(rg)

      navigate('/')

    } catch (error) {

    }
  }

  //chọn ngày tháng năm sinh

  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      {" "}
      {/* backdrop-blur-sm */}
      <div className="w-[400px] h-auto my-10 px-5 pt-5 pb-8 bg-white shadow rounded-lg">
        <div>
          <span className="text-[25px] flex justify-center font-semibold">
            Sign Up
          </span>

          <span className="pt-3 pb-5 flex items-center justify-center">
            Welcome! Let's take you to your registration page.
          </span>

          {/* Đăng nhập bằng email */}
          <div className="grid grid-cols-1 gap-y-3">

            <div className="w-full h-[50px] grid grid-cols-2 gap-3">
              {/* Nhập tên tài khoản */}
              <input
                type="text"
                className="w-full h-[50px] px-2 border rounded shadow"
                placeholder="Full Name"
                value={displayName}
                onChange={(e) => setdisplayName(e.target.value)}
              />

              {/* chọn ngày tháng năm sinh */}
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"  // Định dạng ngày
                className="w-full h-[50px] px-2 border rounded shadow "  // Sử dụng Tailwind CSS để style
                placeholderText="Select Date"
                showYearDropdown  // Hiển thị danh sách năm
                showMonthDropdown  // Hiển thị danh sách tháng
                dropdownMode="select"  // Chuyển dropdown sang chế độ select để dễ chọn
              />
            </div>

            {/* Nhập địa chỉ email */}
            <input
              type="email"
              className="w-full h-[50px] px-2 border rounded shadow"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Nhập mật khẩu */}
            <input
              type="password"
              className="w-full h-[50px] px-2 border rounded shadow"
              placeholder="Password"
              value={password}
              form="off"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link
              to="/forgot-password"
              className="w-[160px] text-blue-800 cursor-pointer"
            >
              Reset your password?
            </Link>
            {err && <p>{err.message}</p>}

            <button
              className="w-full h-[50px] bg-black text-white rounded font-semibold"
              onClick={getRegister}
            >
              Continue to Verify Email
            </button>

            <div className="w-full h-[50px] flex gap-x-1 items-center justify-center border rounded">
              <span className="">Already have an account?</span>

              <Link to="/" className="text-blue-800 font-semibold">
                Login
              </Link>
            </div>

          </div>

          <div class="w-full my-5 flex items-center">
            <hr class="flex-1 border-t border-gray-300" />
            <span class="px-4">OR</span>
            <hr class="flex-1 border-t border-gray-300" />
          </div>

          <div className="w-full h-full grid grid-cols-1 gap-y-5">
            <button className="w-full h-[50px] cursor-pointer px-5 py-2 bg-red-50 hover:bg-red-100 shadow-md flex items-center justify-center rounded">
              <span className="mr-auto">
                <GoogleIcon />
              </span>

              <span className="mr-auto font-semibold">
                Continue with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
