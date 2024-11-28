import React, { useState, useEffect } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import advertiseFireBase from "../../../common/services/Advertise.services";
const AdminAdvertise = () => {
  const [loading, setloading] = useState(false);
  const [ advertise, seadvertise] = useState([]);
  const [relay, setrelay] = useState(false);
  useEffect(() => {
    const get = async () => {
      try {
        setloading(false);
        const advertise= await advertiseFireBase.getAll();
        seadvertise(advertise.success ? advertise.advertise : []);
        setloading(true);
      } catch (error) { 
        console.log(error)
      }
    };
    get();
  }, [relay]);
  const handlePhotoChange1 = async (e) => {
    try {
      setloading(false);
      const file = e.target.files[0];
      if (file) {
      const a=await  advertiseFireBase.Add({ createTime: new Date(Date.now())})
       await advertiseFireBase.uploadToAdd(file, file.name,a);
      }
    
     
      setrelay(!relay)
      setloading(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleupdate = async (e, id) => {
    try {
      console.log(e.target.files[0], id);

      setloading(false);
      const file = e.target.files[0];
      if (file) {
        await advertiseFireBase.uploadToAdd(file, file.name, id)
      }
      setrelay(!relay)

      setloading(true);
    } catch (error) { }
  };
  const handledelete = async (id) => {
    try {
      let result = window.confirm("이 파일을 삭제하시겠습니까?");
      if (result) {
        setloading(false);
        await advertiseFireBase.Delete(id);
        setrelay(!relay)

        setloading(true);
      }
    } catch (error) { }
  };
  return (
    <>
      {!loading ? (
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
      ) : (
        <div className="w-full h-[600px] pb-5 bg-white custom-scrollbar">

          <div className="w-full flex justify-end">
            {advertise?.length<=0&&
            <button className="w-[100px] h-[35px] mb-3 mr-3 text-white mx-1 font-semibold relative bg-green-500 hover:bg-green-600 rounded">
              추가
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handlePhotoChange1(e)}
                className="absolute inset-0 opacity-0 cursor-pointer "
              />
            </button>
}
          </div>

          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="w-full">
                <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                  ID
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
              {advertise?.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                    {item.id}
                  </td>
                 

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {new Date(item.createTime).getDate()}/
                    {new Date(item.createTime).getMonth() + 1}/
                    {new Date(item.createTime)?.getFullYear()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    <button className="w-[35px] h-[35px] relative text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer">
                      <EditIcon />
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleupdate(e, item.id)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </button>
                    <button onClick={() => handledelete(item.id)} className="w-[35px] h-[35px] text-red-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AdminAdvertise;
