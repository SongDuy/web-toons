import React, { useState, useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
// import Switch from "@mui/material/Switch";
import Nav from "../../components/Account/nav";
import CircularProgress from "@mui/material/CircularProgress";
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

  //Lấy ngôn ngữ
  const language = useSelector(state => state.hidden.language);

  // State for loading spinner
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after 1 second
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, []);

  return (
    <>
      {!loading ? (
        <div>
          <Nav />
          <div className="w-full h-full xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px] bg-gray-100 pb-10">

            {/* Tài khoản đăng nhập */}
            <div className="py-[30px] w-full flex-row justify-center items-center">
              <div className="mb-5">
                <h1 className="font-semibold text-2xl text-black">
                  {!language ?
                    "Login information"
                    :
                    "로그인 정보"
                  }
                </h1>
              </div>

              <div className="w-full min-h-[150px] flex items-center bg-white border border-white xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px]">
                <div className="w-[80px] h-[80px] bg-gray-200 flex justify-center items-center rounded-full">
                  {auth?.currentUser?.providerData[0].providerId ?
                    <GoogleIcon sx={{ fontSize: 60 }} /> : ""}
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

            {/* Ngày sinh */}
            <div className="py-[30px] w-full flex-row justify-center items-center">
              <div className="mb-5">

                <h1 className="font-semibold text-2xl text-black">
                  {!language ?
                    "Birthday"
                    :
                    " 생일"
                  }
                </h1>
              </div>

              <div className="w-full min-h-[150px] flex items-center justify-center xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px] bg-white">
                {openDate ? (
                  <div className="w-full flex items-center justify-center">

                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"  // Định dạng ngày
                      className="w-full h-[40px] px-2 border rounded shadow "  // Sử dụng Tailwind CSS để style
                      placeholderText={!language ? "Select date of birth" : "생년월일 선택"}
                      showYearDropdown  // Hiển thị danh sách năm
                      showMonthDropdown  // Hiển thị danh sách tháng
                      dropdownMode="select"  // Chuyển dropdown sang chế độ select để dễ chọn
                    />

                    <button
                      onClick={handleBirthday}
                      className="w-[150px] h-[40px] font-semibold bg-green-500 text-white"
                    >
                      {!language ?
                        "Add"
                        :
                        "추가"
                      }
                    </button>
                  </div>
                ) : (
                  <div className="w-full grid grid-cols-12 border">
                    <div className="w-full col-span-9 px-2 flex items-center">
                      {selectedDate ?
                        <p className="font-semibold text-lg text-black">
                          {new Date(selectedDate).getDate()}/{new Date(selectedDate).getMonth() + 1}/
                          {new Date(selectedDate)?.getFullYear()}
                        </p>
                        :
                        <p className="font-semibold text-lg text-black">
                          {!language ?
                            "Not Birthday"
                            :
                            "생일 아님"
                          }
                        </p>
                      }
                    </div>

                    <button
                      onClick={() => setopenDate(!openDate)}
                      className="w-full h-[40px] col-span-3 font-semibold bg-black text-white"
                    >
                      {!language ?
                        "Edit"
                        :
                        "편집"
                      }
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tên gọi */}
            <div className="py-[30px] w-full flex-row justify-center items-center">
              <div className="mb-5">

                <h1 className="font-semibold text-2xl text-black">
                  {!language ?
                    "Nickname"
                    :
                    "별명"
                  }
                </h1>

              </div>

              <div className="w-full min-h-[150px] flex items-center xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px] bg-white">
                {openName ? (
                  <div className="w-full">
                    <div className="w-full grid grid-cols-12 mb-3">
                      <div className="w-full h-[40px] col-span-9 px-2 flex items-center border">
                        <input
                          value={name}
                          className={`w-full outline-none font-semibold text-lg ${isValid && "text-red-500"}`}
                          onChange={(e) => setName(e.target.value)}
                        />

                        {isValid &&
                          <div className="my-2">
                            <span className="font-semibold text-base text-gray-400 ">
                              {!language ?
                                "Nickname already exists."
                                :
                                "별명이 이미 있습니다."
                              }
                            </span>
                          </div>
                        }
                      </div>

                      <button
                        onClick={handleName}
                        className="w-full h-[40px] col-span-3 px-2 flex items-center justify-center font-semibold bg-green-500 text-white leading-tight"
                      >
                        {!language ?
                          "Check now"
                          :
                          "지금 확인"
                        }
                      </button>
                    </div>

                    <div className="w-full px-2 flex items-center">
                      <p className=" text-sm text-gray-400">
                        {!language ?
                          "Create your nickname. - You may enter a maximum of 20 characters containing alphabets, numbers, and symbols."
                          :
                          "별명을 만듭니다. - 최대 다음 항목을 입력할 수 있습니다 알파벳, 숫자 및 기호가 포함된 20글자입니다."
                        }
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full grid grid-cols-12 border mb-8">
                    <div className="w-full col-span-9 px-2 flex items-center">
                      <p className="font-semibold text-lg text-black">
                        {name}
                      </p>
                    </div>

                    <button
                      onClick={() => setopenName(!openName)}
                      className="w-full h-[40px] col-span-3 font-semibold bg-black text-white"
                    >
                      {!language ?
                        "Edit"
                        :
                        "편집"
                      }
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Phần email */}
            <div className="py-[30px] w-full flex-row justify-center items-center">
              <div className="mb-5">
                <h1 className="font-semibold text-2xl text-black">
                  {!language ?
                    "Email"
                    :
                    "이메일"
                  }
                </h1>
              </div>

              <div className="w-full min-h-[150px] flex items-center xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px] bg-white">

                {openEmail ?
                  <div className="w-full">

                    <div className="w-full grid grid-cols-12">
                      <div className="w-full h-[40px] col-span-9 px-2 flex items-center border">
                        <input
                          value={email}
                          className="w-full outline-none text-lg"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <button
                        onClick={handleEmail}
                        className="w-full h-[40px] col-span-3 font-semibold bg-green-500 text-white"
                      >
                        {!language ?
                          "Verify"
                          :
                          "확인"
                        }
                      </button>
                    </div>

                    <div>
                      <p className="font-semibold px-2 mt-3 text-base text-gray-400 ">
                        {!language ?
                          " Enter your email address for new updates and latest news."
                          :
                          "최신 업데이트 및 뉴스 수신을 위한 이메일 주소 입력하세요."
                        }
                      </p>
                    </div>
                  </div>
                  :
                  <div className="w-full">
                    <div className="w-full grid grid-cols-12">

                      <div className="w-full h-[40px] col-span-9 px-2 flex items-center border">
                        <p className="font-semibold text-lg text-black truncate">
                          {email}
                        </p>
                      </div>

                      <button
                        onClick={() => setopenEmail(!openEmail)}
                        className="w-full h-[40px] col-span-3 font-semibold bg-black text-white"
                      >
                        {!language ?
                          "Edit"
                          :
                          "편집"
                        }
                      </button>
                    </div>

                    <div>
                      <p className="font-semibold px-2 mt-3 text-base text-gray-400 ">
                        {!language ?
                          "Enter your email address for new updates and latest news."
                          :
                          "새로운 업데이트 및 최신 소식을 받기 위해 이메일 주소를 입력하세요."
                        }
                      </p>
                    </div>
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

            {/* Phần xóa tài khoản */}
            <div className="py-[30px] flex-row justify-center items-center">
              <div className="">
                <Link to={`/account/delete`}>
                  <h1 className="font-semibold text-2xl text-gray-400 hover:text-black">
                    {!language ?
                      "Do you want to delete your account?"
                      :
                      "계정을 삭제하시겠습니까?"
                    }
                  </h1>

                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[48vh] flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Account;
