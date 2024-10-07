import React, { useState, useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
// import Switch from "@mui/material/Switch";
import Nav from "../../components/Account/nav";
import { useSelector, useDispatch } from 'react-redux';
import { auth } from "../../common/themes/firebase";
import { updateAccount } from "../../common/store/Account";
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
const Account = () => {
  const [openName, setopenName] = useState(false);
  const [openEmail, setopenEmail] = useState(false);
  const [openDate, setopenDate] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const Account = useSelector(state => state.Account.Account);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(Account?.name)
    setEmail(Account?.email)
    setSelectedDate(s => Account.birthday ? new Date(Account.birthday) : s);
  }, [Account]);
  const handleName = async () => {
    try {
      // Kiểm tra độ dài và các ký tự hợp lệ
      if (name.length <= 20 && /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/.test(name)) {
        const updatename = await dispatch(updateAccount({
          name,
          id: Account.uid
        }))

        unwrapResult(updatename)
        setIsValid(false);
        setopenName(!openName)
      } else {
        setIsValid(true);
      }
    } catch (error) {

    }
  };
  const handleBirthday = async () => {
    try {
      const updatename = await dispatch(updateAccount({
        birthday: selectedDate,
        id: Account.uid
      }))

      unwrapResult(updatename)
      setopenDate(!openDate)

    } catch (error) {
      console.log(error)
    }
  };
  const handleEmail = async () => {
    try {
      // Kiểm tra độ dài và các ký tự hợp lệ
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const updateemail = await dispatch(updateAccount({
          email,
          id: Account.uid
        }))

        unwrapResult(updateemail)
        setopenEmail(!openEmail)
      } else {
      }
    } catch (error) {

    }
  };

  return (
    <div>
      <div className="w-full h-full bg-gray-100">
        <Nav />
        <div className="py-[30px] px-[200px] flex-row justify-center items-center container mx-auto my-auto">
          <div className="mb-5">
            <h1 className="font-semibold text-2xl text-black">
              Login information
            </h1>
          </div>

          <div className="w-full h-full flex   bg-white border border-white p-5">
            <div className="rounded-full  bg-gray-200 flex justify-center items-center p-2 w-[8%] ml-5">
              {auth?.currentUser?.providerData[0].providerId ? <GoogleIcon sx={{ fontSize: 40 }} /> : ""}
            </div>
            <div className="flex-row ml-5 my-5">
              <div>
                <span className="font-semibold text-base text-black">
                  {auth?.currentUser?.providerData[0].providerId ? "Google" : ""}
                </span>
              </div>
              <div>
                <span className="font-semibold text-base text-gray-400">
                  {auth?.currentUser?.displayName}

                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[30px] px-[200px] flex-row justify-center items-center container mx-auto">
          <div className="mb-5">
            <h1 className="font-semibold text-2xl text-black">
              Birthday
            </h1>
          </div>

          {openDate ? (
            <div className="w-full h-full flex   bg-white border border-white p-5">
              <div className=" flex justify-center items-center p-2 w-[10%]">
                <span className="font-semibold  text-black"></span>
              </div>

              <div className="flex  ml-5 my-5">
                <div className="flex-row ml-5 my-8">
                  <div>
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

                </div>
                <button
                  onClick={handleBirthday}
                  className="font-semibold sm:w-1/2 md:w-1/3 lg:w-1/6 my-8  bg-gray-200   h-[50px]  text-gray-400"
                >
                  Add
                </button>

              </div>
            </div>
          ) : (
            <div className="w-full h-full flex-row justify-center items-center  bg-white border border-white p-5">
              <div className=" flex justify-center items-center p-2 w-[10%] ">
                <span className="font-semibold  text-black"></span>
              </div>
              <div className="w-[80%] h-full mx-auto my-auto   bg-white border border-white p-2">
                <div className=" flex justify-center items-center p-2 w-[10%]">
                  <span className="font-semibold  text-black"></span>
                </div>
                <div className="grid grid-cols-8 gap-4   ml-5 my-5 p-5 border-b border-gray-300">
                  <div className="my-2 col-span-7">
                    {selectedDate ?
                      <p className="font-semibold  text-lg text-black">
                        {new Date(selectedDate).getDate()}/{new Date(selectedDate).getMonth() + 1}/
                        {new Date(selectedDate)?.getFullYear()}
                      </p>
                      : <p className="font-semibold  text-lg text-black">
                        Not Birthday
                      </p>}
                  </div>
                  <button
                    onClick={() => setopenDate(!openDate)}
                    className="font-semibold bg-gray-200 w-[90px] h-[35px]  text-base text-gray-400"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="py-[30px] px-[200px] flex-row justify-center items-center container mx-auto">
          <div className="mb-5">
            <h1 className="font-semibold text-2xl text-black">
              Nickname
            </h1>
          </div>

          {openName ? (
            <div className="w-full h-full flex   bg-white border border-white p-5">
              <div className=" flex justify-center items-center p-2 w-[10%]">
                <h1 className="font-semibold  text-black">

                </h1>
              </div>

              <div className="flex  ml-5 my-5">
                <div className="flex-row ml-5 my-8">
                  <div>
                    <input
                      value={name}
                      className={` outline-none text-lg ${isValid && "text-red-500"}`}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {isValid && <div className="my-2">
                    <span className="font-semibold text-base text-gray-400 ">
                      Nickname already exists.
                    </span>
                  </div>}
                </div>
                <button
                  onClick={handleName}
                  className="font-semibold sm:w-1/2 md:w-1/3 lg:w-1/6 my-8  bg-gray-200   h-[35px]  text-gray-400"
                >
                  Check for availability
                </button>
                <p className=" text-sm ml-5  text-gray-400 w-1/3 my-5">
                  Create your nickname for WEBTOON. - You may enter a maximum of
                  20 characters containing alphabets, numbers, and symbols.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex-row justify-center items-center  bg-white border border-white p-5">
              <div className=" flex justify-center items-center p-2 w-[10%] ">
                <span className="font-semibold  text-black"></span>
              </div>
              <div className="w-[80%] h-full mx-auto my-auto   bg-white border border-white p-2">
                <div className=" flex justify-center items-center p-2 w-[10%]">
                  <span className="font-semibold  text-black"></span>
                </div>
                <div className="grid grid-cols-8 gap-4   ml-5 my-5 p-5 border-b border-gray-300">
                  <div className="my-2 col-span-7">
                    <p className="font-semibold  text-lg text-black">
                      {name}
                    </p>

                  </div>
                  <button
                    onClick={() => setopenName(!openName)}
                    className="font-semibold bg-gray-200 w-[90px] h-[35px]  text-base text-gray-400"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="py-[30px] px-[200px] flex-row justify-center items-center container mx-auto">
          <div className="mb-5">
            <h1 className="font-semibold text-2xl text-black">
              Email
            </h1>
          </div>

          <div className="w-full h-full flex-row justify-center items-center  bg-white border border-white p-5">
            <div className=" flex justify-center items-center p-2 w-[10%] ">
              <span className="font-semibold  text-black"></span>
            </div>

            <div className="w-[80%] h-full mx-auto my-auto   bg-white border border-white p-2">
              <div className=" flex justify-center items-center p-2 w-[10%]">
                <span className="font-semibold  text-black"></span>
              </div>
              {openEmail ?
                <div className="flex  ml-5 my-5">
                  <div className="flex-row ml-5 my-8">
                    <div>
                      <input
                        value={email}
                        className=" outline-none text-lg"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="my-2">
                      <span className="font-semibold text-base text-gray-400 ">
                        Enter your email address for new updates and latest news.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleEmail}
                    className="font-semibold sm:w-1/2 md:w-1/3 lg:w-1/6 my-8  bg-gray-200   h-[35px]  text-gray-400"
                  >
                    Verify
                  </button>

                </div> :
                <div className="grid grid-cols-8 gap-4   ml-5 my-5 p-5 border-b border-gray-300">
                  <div className="my-2 col-span-7">
                    <p className="font-semibold  text-lg text-black">
                      {email}
                    </p>
                    <span className="font-semibold text-sm text-gray-400 ">
                      Enter your email address for new updates and latest news.
                    </span>
                  </div>
                  <button
                    onClick={() => setopenEmail(!openEmail)}
                    className="font-semibold bg-gray-200 w-[90px] h-[35px]  text-base text-gray-400"
                  >
                    Edit
                  </button>
                </div>
              }

              {/* <div className="  ml-5 my-5 border-b border-gray-300 ">
                <div className="grid grid-cols-8 gap-4  ml-5 my-5">
                  <div className="my-2 col-span-7">
                    <p className="font-semibold  text-lg text-gray-700">
                      Service Emails
                    </p>
                  </div>
                  <div className="font-semibold  w-full h-[35px]  text-base ">
                    <Switch
                      sx={{
                        width: 90,
                        height: 60,
                        "& .MuiSwitch-thumb": {
                          width: 30,
                          height: 40,
                        },
                        "& .MuiSwitch-track": {
                          borderRadius: 26 / 2,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          transform: "translateX(40px)",
                        },
                        "&.Mui-checked": {
                          transform: "translateX(40px)",
                        },
                      }}
                      color="default"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-8 gap-4  ml-5 my-5">
                  <div className="my-2 col-span-7">
                    <p className="font-semibold  text-lg text-gray-500">
                      Subscriptions
                    </p>
                  </div>
                  <div className="font-semibold  w-full h-[35px]  text-base ">
                    <Switch
                      sx={{
                        width: 90,
                        height: 60,
                        "& .MuiSwitch-thumb": {
                          width: 30,
                          height: 40,
                        },
                        "& .MuiSwitch-track": {
                          borderRadius: 26 / 2,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          transform: "translateX(40px)",
                        },
                        "&.Mui-checked": {
                          transform: "translateX(40px)",
                        },
                      }}
                      color="default"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-8 gap-4  ml-5 my-5">
                  <div className="my-2 col-span-7">
                    <p className="font-semibold  text-lg text-gray-500">
                      Top Comments/Comments
                    </p>
                  </div>
                  <div className="font-semibold  w-full h-[35px]  text-base ">
                    <Switch
                      sx={{
                        width: 90,
                        height: 60,
                        "& .MuiSwitch-thumb": {
                          width: 30,
                          height: 40,
                        },
                        "& .MuiSwitch-track": {
                          borderRadius: 26 / 2,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          transform: "translateX(40px)",
                        },
                        "&.Mui-checked": {
                          transform: "translateX(40px)",
                        },
                      }}
                      color="default"
                    />
                  </div>
                </div>
              </div> */}
              {/* <div className=" ml-5 my-5">
                <div className="grid grid-cols-8 gap-4  ml-5 my-5  ">
                  <div className="my-2 col-span-7">
                    <p className="font-semibold  text-lg text-gray-700">
                      Marketing Emails
                    </p>
                  </div>
                  <div className="font-semibold  w-full h-[35px]  text-base ">
                    <Switch
                      sx={{
                        width: 90,
                        height: 60,
                        "& .MuiSwitch-thumb": {
                          width: 30,
                          height: 40,
                        },
                        "& .MuiSwitch-track": {
                          borderRadius: 26 / 2,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          transform: "translateX(40px)",
                        },
                        "&.Mui-checked": {
                          transform: "translateX(40px)",
                        },
                      }}
                      color="default"
                    />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="py-[30px] flex-row justify-center items-center container mx-auto">
            <div className="">
              <Link to={`/account/delete`}>
                <span className="font-semibold text-2xl text-gray-400 hover:text-black">
                  Do you want to delete your account?
                </span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Account;
