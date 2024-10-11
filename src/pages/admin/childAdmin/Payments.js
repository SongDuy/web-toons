import React, { useEffect, useState } from "react";
import PaymentFireBase from "../../../common/services/Payment.services";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const AdminPaymentsPage = () => {
  const [loading, setloading] = useState(false);
  const [Payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const get = async () => {
      try {
        setloading(false);
        const payment = await PaymentFireBase.getad();
        setPayments(
          payment.success
            ? payment?.payment?.filter((item) => item?.status === "other")
            : []
        );
        setloading(true);
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);
  const handlecheck = async (id) => {
    try {
      let result = window.confirm(`이 결제를 확인하시겠습니까?`);
      if (result) {
        setloading(false);
        await PaymentFireBase.update({ status: "success" }, id);

        const payment = await PaymentFireBase.getad();
        setPayments(
          payment.success
            ? payment?.payment?.filter((item) => item?.status === "other")
            : []
        );
        setloading(true);
      }
    } catch (error) { }
  };
  const handledelete = async (id) => {
    try {
      let result = window.confirm(`이 결제를 삭제하시겠습니까?`);
      if (result) {
        setloading(false);
        await PaymentFireBase.update({ status: "error" }, id);
        const payment = await PaymentFireBase.getad();
        setPayments(
          payment.success
            ? payment?.payment?.filter((item) => item?.status === "other")
            : []
        );
        setloading(true);
      }
    } catch (error) { }
  };
  const handleSearch = async () => {
    try {
      const payment = await PaymentFireBase.getad();
      if (payment.success) {
        if (searchTerm === "") {

          setPayments(
            payment.success
              ? payment?.payment?.filter((item) => item?.status === "other")
              : []
          );

        }
        const filteredTop30Films = payment?.payment?.filter((item) => item?.status === "other").filter(item =>
          item.Account.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPayments(filteredTop30Films)
      }
    } catch (error) {

    }
  };
  return (
    <>
      {loading ? (
        <div className="w-full h-full pb-5 bg-white">
          {/* Ô tìm kiếm */}
          <div className="w-full flex justify-end">
            <input
              className="w-[250px] h-[35px] px-2 border-2 rounded-l"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              placeholder="검색..."
            />

            <button onClick={handleSearch} className="w-[100px] h-[35px] mb-3 mr-3 text-white font-semibold relative bg-black rounded-r">
              검색
            </button>
          </div>

          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="w-full">
                <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                  ID
                </th>
                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                  계좌 이름
                </th>
                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                  계좌 번호
                </th>
                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                  가격
                </th>
                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                  생성일
                </th>
                <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Payments?.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {item.Accountname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {item.Account}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {new Date(item.createTime).getDate()}/
                    {new Date(item.createTime).getMonth() + 1}/
                    {new Date(item.createTime)?.getFullYear()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    <button
                      onClick={() => handlecheck(item.id)}
                      className="w-[35px] h-[35px] text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full"
                    >
                      <CheckIcon />
                    </button>
                    <button
                      onClick={() => handledelete(item.id)}
                      className="w-[35px] h-[35px] text-red-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full"
                    >
                      <CloseIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default AdminPaymentsPage;
