import React, { useState, useEffect } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; 
import { useParams } from "react-router-dom";
import PaymentFireBase from "../../common/services/Payment.services";
import { auth } from "../../common/themes/firebase";
import BankFireBase from "../../common/services/Bank.services";

const PaymentPage = ({ closeModal,price }) => {
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
  return (
    <>
      {payment.length === 0 ? (
        <div
          className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center fixed inset-0 z-50"
          onClick={handleBackdropClick}
        >
          {" "}
          {/* backdrop-blur-sm */}
          <div className="w-[940px] h-auto bg-white rounded-xl shadow flex items-center justify-center">
            <div className="w-full h-full px-5 py-5">
              <h1 className="flex items-center justify-center text-2xl">
                Payment Video Series
              </h1>

              <div className="w-full h-full mt-3">
                <h1 className="font-semibold text-xl">Receiving account</h1>
                <div className="grid grid-cols-2 gap-3 py-3 mt-3">
                  <div className="w-full h-[70px] bg-gray-100 border shadow rounded-xl px-3 flex items-center">
                    <div className="w-full h-auto space-y-2">
                      <h1 className="font-semibold">Account number</h1>
                      <div className="ml-auto flex items-center space-x-2">
                        {/* Giá tiền */}
                        <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                          {Bank.length!==0&& Bank[0]?.Accountnumber}
                        </span>

                        {/* Icon copy */}
                        <ContentCopyIcon className="cursor-pointer text-gray-600 hover:text-black" />
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[70px] bg-gray-100 border shadow rounded-xl px-3 flex items-center">
                    <div className="w-full h-auto space-y-2">
                      <h1 className="font-semibold">Account name</h1>
                      <div className="ml-auto flex items-center space-x-2">
                        {/* Giá tiền */}
                        <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                        { Bank.length!==0&&  Bank[0]?.Accountname}
                        </span>

                        {/* Icon copy */}
                        <ContentCopyIcon className="cursor-pointer text-gray-600 hover:text-black" />
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[70px] bg-gray-100 border shadow rounded-xl px-3 flex items-center">
                    <div className="w-full h-auto space-y-2">
                      <h1 className="font-semibold">Selling price</h1>
                      <div className="ml-auto flex items-center space-x-2">
                        {/* Giá tiền */}
                        <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                          {price}
                        </span>

                        {/* Icon copy */}
                        <ContentCopyIcon className="cursor-pointer text-gray-600 hover:text-black" />
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[70px] bg-gray-100 border shadow rounded-xl px-3 flex items-center">
                    <div className="w-full h-auto space-y-2">
                      <h1 className="font-semibold">Bank name</h1>
                      <div className="ml-auto flex items-center space-x-2">
                        {/* Giá tiền */}
                        <span className="font-semibold text-xl text-yellow-500 text-shadow-black">
                        {Bank.length!==0&&  Bank[0]?.Bankname}

                        </span>

                        {/* Icon copy */}
                        <ContentCopyIcon className="cursor-pointer text-gray-600 hover:text-black" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full mt-3">
                <h1 className="font-semibold text-xl">Remittance account</h1>
                <div className="grid grid-cols-2 gap-3 py-3 mt-3">
                  <input
                    type="text"
                    className="w-full h-[50px] px-2 border rounded shadow"
                    placeholder="Account name"
                    form="off"
                    value={Accountname}
                    onChange={(e) => setAccountname(e.target.value)}
                  />

                  <input
                    type="text"
                    className="w-full h-[50px] px-2 border rounded shadow"
                    placeholder="Account number"
                    form="off"
                    value={Account}
                    onChange={(e) => setAccount(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full h-full mt-10 flex items-center justify-center">
                <div className="w-1/2 h-[50px] flex gap-10">
                  <button
                    className="w-1/2 h-[50px] text-white font-semibold bg-red-500 hover:bg-red-600 shadow rounded-full flex items-center justify-center"
                    onClick={handleBackdropClick}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAdd()}
                    className="w-1/2 h-[50px] text-white font-semibold bg-green-500 hover:bg-green-600 shadow rounded-full flex items-center justify-center"
                  >
                    Completed
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
          {" "}
          {/* backdrop-blur-sm */}
        </div>
      ) : payment[0]?.status === "other" ? (
        <div
          className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center fixed inset-0 z-50"
          onClick={handleBackdropClick}
        >
          {" "}
          {/* backdrop-blur-sm */}
        </div>
      ) : (
        <div
          className="w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center fixed inset-0 z-50"
          onClick={handleBackdropClick}
        >
          {" "}
          {/* backdrop-blur-sm */}
        </div>
      )}
    </>
  );
};

export default PaymentPage;