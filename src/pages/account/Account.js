import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Switch from "@mui/material/Switch";
import Nav from "../../components/Account/nav";

const Account = () => {
  const [openName, setopenName] = useState(false);
  const [openEmail, setopenEmail] = useState(false);
  return (
    <div>
      <div className="w-full h-full bg-gray-100">
      <Nav/>
        <div className="py-[30px] flex-row justify-center items-center container mx-auto my-auto">
          <div className="  m-2">
            <span className="font-semibold text-2xl text-black">
              Login information
            </span>
          </div>

          <div className="w-full h-full flex   bg-white border border-white p-5">
            <div className="rounded-full  bg-gray-200 flex justify-center items-center p-2 w-[8%] ml-5">
              <GoogleIcon sx={{ fontSize: 40 }} />
            </div>
            <div className="flex-row ml-5 my-5">
              <div>
                <span className="font-semibold text-base text-black">
                  Login information
                </span>
              </div>
              <div>
                <span className="font-semibold text-base text-gray-400">
                  Login information
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[30px] flex-row justify-center items-center container mx-auto">
          <div className="  m-2">
            <span className="font-semibold text-2xl text-black">Nickname</span>
          </div>

          {openName ? (
            <div className="w-full h-full flex   bg-white border border-white p-5">
              <div className=" flex justify-center items-center p-2 w-[10%]">
                <span className="font-semibold  text-black"></span>
              </div>

              <div className="flex  ml-5 my-5">
                <div className="flex-row ml-5 my-8">
                  <div>
                    <input
                      value="Login information"
                      className=" outline-none text-lg"
                    />
                  </div>
                  <div className="my-2">
                    <span className="font-semibold text-base text-gray-400 ">
                      Nickname already exists.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setopenName(!openName)}
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
                    Name
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
        <div className="py-[30px] flex-row justify-center items-center container mx-auto">
          <div className="  m-2">
            <span className="font-semibold text-2xl text-black">Email</span>
          </div>

          <div className="w-full h-full flex-row justify-center items-center  bg-white border border-white p-5">
            <div className=" flex justify-center items-center p-2 w-[10%] ">
              <span className="font-semibold  text-black"></span>
            </div>
           
            <div className="w-[80%] h-full mx-auto my-auto   bg-white border border-white p-2">
              <div className=" flex justify-center items-center p-2 w-[10%]">
                <span className="font-semibold  text-black"></span>
              </div>
              {openEmail?
                <div className="flex  ml-5 my-5">
                <div className="flex-row ml-5 my-8">
                  <div>
                    <input
                      placeholder="Enter email address"
                      className=" outline-none text-lg"
                    />
                  </div>
                  <div className="my-2">
                    <span className="font-semibold text-base text-gray-400 ">
                    Enter your email address for new updates and latest news.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>setopenEmail(!openEmail)}
                  className="font-semibold sm:w-1/2 md:w-1/3 lg:w-1/6 my-8  bg-gray-200   h-[35px]  text-gray-400"
                >
                  Verify
                </button>
                
              </div>:
              <div className="grid grid-cols-8 gap-4   ml-5 my-5 p-5 border-b border-gray-300">
                <div className="my-2 col-span-7">
                  <p className="font-semibold  text-lg text-black">
                    Enter email address
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
             <div className="  ml-5 my-5 border-b border-gray-300 ">
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
             </div>
            <div className=" ml-5 my-5">
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
            </div>
            </div>
          </div>
          <div className="py-[30px] flex-row justify-center items-center container mx-auto">
          <div className="  m-2">
            <span className="font-semibold text-2xl text-gray-400">Do you want to delete your account?</span>
          </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Account;
