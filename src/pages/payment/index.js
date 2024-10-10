import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useParams } from "react-router-dom";
import PaymentFireBase from "../../common/services/Payment.services";
import { auth } from "../../common/themes/firebase";
import BankFireBase from "../../common/services/Bank.services";
import CircularProgress from "@mui/material/CircularProgress";

const PaymentPage = ({ closeModal, price }) => {
  const [Bank, setBank] = useState([]);
  const [Accountname, setAccountname] = useState("");
  const [Account, setAccount] = useState(0);
  const id = useParams();
  const [payment, setpayment] = useState([]);

  useEffect(() => {
    const get = async () => {
      try {
        if (auth.currentUser) {
          const payment = await PaymentFireBase.getbyuser(
            auth?.currentUser?.uid,
            id?.id
          );
          setpayment(payment.success ? payment.payment : []);
          const banks = await BankFireBase.getAll();
          console.log(banks)
          setBank(banks.success ? banks.bank : []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, [id]);
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  const handleAdd = async () => {
    try {
      if (auth?.currentUser && Accountname && Account) {
        await PaymentFireBase.Add({
          status: "other",
          Account,
          Accountname,
          price,
          uid: auth?.currentUser?.uid,
          idseries: id.id,
          createTime: new Date(Date.now()),
        });
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Lấy ngôn ngữ
  const language = useSelector(state => state.hidden.language);

  // copy giá trị
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(true);
        // Thông báo biến mất sau 3 giây
        setTimeout(() => {
          setCopySuccess(false);
        }, 3000);
      })
      .catch(() => {
        setCopySuccess(false);
      });
  };

  return (
    <>
      {payment.length === 0 ? (
        <div
          className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center fixed inset-0 z-50"
          onClick={handleBackdropClick}
        >
          {" "}
          {/* backdrop-blur-sm */}
          <div className="w-[940px] h-auto bg-white rounded-xl shadow flex items-center justify-center pb-3">
            <div className="w-full h-full px-5 py-5">

              {!language ?
                <h1 className="flex items-center justify-center text-2xl">
                  Payment Video Series
                </h1>
                :
                <h1 className="flex items-center justify-center text-2xl">
                  결제 비디오 시리즈
                </h1>
              }

              <div className="w-full h-full mt-3">

                {!language ?
                  <h1 className="font-semibold text-xl">
                    Receiving account
                  </h1>
                  :
                  <h1 className="font-semibold text-xl">
                    수신 계좌
                  </h1>
                }
                <ul className="grid grid-cols-2 gap-3 py-3 mt-3 mx-2">
                  <li
                    className="w-full h-[70px] bg-gray-100 border shadow rounded-xl px-3 flex items-center"
                    onClick={() => handleCopy(Bank.length !== 0 && Bank[0]?.Accountnumber)}
                  >
                    <div className="w-full h-auto space-y-2">

                      {!language ?
                        <h1 className="font-semibold">
                          Account number
                        </h1>
                        :
                        <h1 className="font-semibold">
                          계좌 번호
                        </h1>
                      }

                      <div className="w-full ml-auto flex items-center space-x-2">
                        {/* Giá tiền */}
                        <span className="w-full font-semibold text-xl text-yellow-500 text-shadow-black">
                          {Bank.length !== 0 && Bank[0]?.Accountnumber}
                        </span>

                        {/* Icon copy */}
                        <button
                          className="text-gray-600 hover:text-black"
                          onClick={() => handleCopy(Bank.length !== 0 && Bank[0]?.Accountnumber)}
                        >
                          <ContentCopyIcon />
                        </button>

                        {/* Thông báo copy thành công */}
                        {copySuccess && (
                          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-gray-800 text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out">
                            Copy successfully!
                          </div>
                        )}
                      </div>

                    </div>
                  </li>

                  <li
                    className="w-full h-[70px] bg-gray-100 border shadow rounded-xl px-3 flex items-center"
                    onClick={() => handleCopy(Bank.length !== 0 && Bank[0]?.Accountname)}
                  >
                    <div className="w-full h-auto space-y-2">

                      {!language ?
                        <h1 className="font-semibold">
                          Account name
                        </h1>
                        :
                        <h1 className="font-semibold">
                          계좌 이름
                        </h1>
                      }

                      <div className="ml-auto flex items-center space-x-2">
                        {/* Giá tiền */}
                        <span className="w-full font-semibold text-xl text-yellow-500 text-shadow-black">
                          {Bank.length !== 0 && Bank[0]?.Accountname}
                        </span>

                        {/* Icon copy */}
                        <button
                          className="text-gray-600 hover:text-black"
                          onClick={() => handleCopy(Bank.length !== 0 && Bank[0]?.Accountname)}
                        >
                          <ContentCopyIcon />
                        </button>

                        {/* Thông báo copy thành công */}
                        {copySuccess && (
                          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-gray-800 text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out">
                            Copy successfully!
                          </div>
                        )}

                      </div>
                    </div>
                  </li>

                  <li
                    className="w-full h-[70px] bg-gray-100 border shadow rounded-xl px-3 flex items-center"
                    onClick={() => handleCopy(price)}
                  >
                    <div className="w-full h-auto space-y-2">

                      {!language ?
                        <h1 className="font-semibold">
                          Selling price
                        </h1>
                        :
                        <h1 className="font-semibold">
                          판매 가격
                        </h1>
                      }

                      <div className="ml-auto flex items-center space-x-2">
                        {/* Giá tiền */}
                        <span className="w-full font-semibold text-xl text-yellow-500 text-shadow-black">
                          {price}
                        </span>

                        {/* Icon copy */}
                        <button
                          className="text-gray-600 hover:text-black"
                          onClick={() => handleCopy(price)}
                        >
                          <ContentCopyIcon />
                        </button>

                        {/* Thông báo copy thành công */}
                        {copySuccess && (
                          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-gray-800 text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out">
                            Copy successfully!
                          </div>
                        )}

                      </div>

                    </div>
                  </li>

                  <li
                    className="w-full h-[70px] bg-gray-100 border shadow rounded-xl px-3 flex items-center"
                    onClick={() => handleCopy(Bank.length !== 0 && Bank[0]?.Bankname)}
                  >
                    <div className="w-full h-auto space-y-2">

                      {!language ?
                        <h1 className="font-semibold">
                          Bank name
                        </h1>
                        :
                        <h1 className="font-semibold">
                          은행 이름
                        </h1>
                      }

                      <div className="ml-auto flex items-center space-x-2">
                        {/* Giá tiền */}
                        <span className="w-full font-semibold text-xl text-yellow-500 text-shadow-black">
                          {Bank.length !== 0 && Bank[0]?.Bankname}
                        </span>

                        {/* Icon copy */}
                        <button
                          className="text-gray-600 hover:text-black"
                          onClick={() => handleCopy(Bank.length !== 0 && Bank[0]?.Bankname)}
                        >
                          <ContentCopyIcon />
                        </button>

                        {/* Thông báo copy thành công */}
                        {copySuccess && (
                          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-gray-800 text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out">
                            Copy successfully!
                          </div>
                        )}

                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="w-full h-full mt-3">

                {!language ?
                  <h1 className="font-semibold text-xl">
                    Remittance account
                  </h1>
                  :
                  <h1 className="font-semibold text-xl">
                    송금 계좌
                  </h1>
                }

                <ul className="grid grid-cols-2 gap-3 py-3 mt-3 mx-2">
                  <li className="w-full">

                    {!language ?
                      <label className="w-full">
                        Account name
                      </label>
                      :
                      <label className="w-full">
                        계좌 이름
                      </label>
                    }

                    <input
                      type="text"
                      className="w-full h-[50px] mt-2 px-2 border rounded shadow"
                      placeholder={!language ? "Account name" : "계좌 이름"}
                      form="off"
                      value={Accountname}
                      onChange={(e) => setAccountname(e.target.value)}
                    />
                  </li>

                  <li className="w-full">
                    {!language ?
                      <label className="w-full">
                        Account number
                      </label>
                      :
                      <label className="w-full">
                        계좌 번호
                      </label>
                    }

                    <input
                      type="text"
                      className="w-full h-[50px] mt-2 px-2 border rounded shadow"
                      placeholder={!language ? "Account number" : "계좌 번호"}
                      form="off"
                      value={Account}
                      onChange={(e) => setAccount(e.target.value)}
                    />
                  </li>

                </ul>
              </div>

              <div className="w-full h-full mt-10 flex items-center justify-center">
                <div className="w-1/2 h-[50px] flex gap-10">


                  <button
                    className="w-1/2 h-[50px] text-white font-semibold bg-red-500 hover:bg-red-600 shadow rounded-full flex items-center justify-center"
                    onClick={handleBackdropClick}
                  >
                    {!language ?
                      "Cancel"
                      :
                      "취소"
                    }
                  </button>

                  <button
                    onClick={() => handleAdd()}
                    className="w-1/2 h-[50px] text-white font-semibold bg-green-500 hover:bg-green-600 shadow rounded-full flex items-center justify-center"
                  >
                    {!language ?
                      "Completed"
                      :
                      "완료됨"
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : payment[0]?.status === "success" ? (
        <div
          className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center fixed inset-0 z-50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center transform transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-600">
              Your payment has been processed successfully.
            </p>
            <div className="w-full mt-3 flex items-center justify-center">
              <button
                className="w-1/2 h-[50px] text-white font-semibold bg-red-500 hover:bg-red-600 shadow rounded-full flex items-center justify-center"
                onClick={handleBackdropClick}
              >
                {!language ?
                  "Cancel"
                  :
                  "취소"
                }
              </button>
            </div>
          </div>
        </div>
      ) : payment[0]?.status === "other" ? (
        <div
          className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center fixed inset-0 z-50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-[450px] text-center transform transition-all duration-300">
            <h2 className="text-2xl font-bold my-2">Processing Payment Verification...</h2>
            <p className="text-gray-600 mb-3">Please wait while we verify your payment.</p>
            <CircularProgress />
            <div className="w-full mt-3 flex items-center justify-center">
              <button
                className="w-1/2 h-[50px] text-white font-semibold bg-red-500 hover:bg-red-600 shadow rounded-full flex items-center justify-center"
                onClick={handleBackdropClick}
              >
                {!language ?
                  "Cancel"
                  :
                  "취소"
                }
              </button>
            </div>
          </div>
        </div>

      ) : (
        <div
          className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center fixed inset-0 z-50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-[450px] text-center transform transition-all duration-300">
            <h2 className="text-2xl font-bold my-2">Processing Payment Verification...</h2>
            <p className="text-gray-600 mb-3">Please wait while we verify your payment.</p>
            <CircularProgress />
            <div className="w-full mt-3 flex items-center justify-center">
              <button
                className="w-1/2 h-[50px] text-white font-semibold bg-red-500 hover:bg-red-600 shadow rounded-full flex items-center justify-center"
                onClick={handleBackdropClick}
              >
                {!language ?
                  "Cancel"
                  :
                  "취소"
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
