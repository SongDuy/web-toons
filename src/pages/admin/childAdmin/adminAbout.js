import React, { useState, useEffect } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import aboutFireBase from "../../../common/services/About.services";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
const AdminAbout = () => {
  const [loading, setloading] = useState(false);
  const [ About, seAbout] = useState([]);
  const [relay, setrelay] = useState(false);
  const [open, setOpen] = useState(false);
  const [idc, setid] = useState("");

  const [valueNote, setValueNote] = useState("");

  useEffect(() => {
    const get = async () => {
      try {
        setloading(false);
        const Abouts = await aboutFireBase.getAll();
        seAbout(Abouts.success ? Abouts.about : []);
        setloading(true);
      } catch (error) { 
        console.log(error)
      }
    };
    get();
  }, [relay]);
  const handleClickOpen = (note,id) => {
    setOpen(true);
    id&& setid(id?id:"")
    note&&setValueNote(note?note:"")
  };

  const handleClose = () => {
    setOpen(false);
    setid("")

    setValueNote("")
  };
  const handlePhotoChange1 = async () => {
    try {
      setloading(false);
    
      await  aboutFireBase.Add({Note:valueNote ,createTime: new Date(Date.now())})
      
      

     
      setrelay(!relay)
      setOpen(false);
      setid("")
  
      setValueNote("")
      setloading(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleupdate = async ( id) => {
    try {

      setloading(false);
   
        await aboutFireBase.update({Note:valueNote ,createTime: new Date(Date.now())}, id)
      
      setrelay(!relay)
      setOpen(false);
      setid("")
  
      setValueNote("")
      setloading(true);
    } catch (error) { }
  };
  const handledelete = async (id) => {
    try {
      let result = window.confirm("이 파일을 삭제하시겠습니까?");
      if (result) {
        setloading(false);
        await aboutFireBase.Delete(id);
        setrelay(!relay)
        setOpen(false);
        setid("")
    
        setValueNote("")
        setloading(true);
      }
    } catch (error) { }
  };
  const handleNote = (event) => {
    const inputValueNote = event.target.value;
    
      setValueNote(inputValueNote);
    
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
            {About?.length<=0&&
            <button className="w-[100px] h-[35px] mb-3 mr-3 text-white mx-1 font-semibold relative bg-green-500 hover:bg-green-600 rounded"  onClick={()=>handleClickOpen("","")}>
              추가
             
            </button>
}
          </div>

          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="w-full">
                <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                  ID
                </th>
                <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                내용
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
              {About?.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                    {item.Note}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {new Date(item.createTime).getDate()}/
                    {new Date(item.createTime).getMonth() + 1}/
                    {new Date(item.createTime)?.getFullYear()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    <button className="w-[35px] h-[35px] relative text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer" onClick={() => handleClickOpen(item.Note,item.id)}>
                      <EditIcon />
                     
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
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"내용을 입력하다"}
        </DialogTitle>
        <DialogContent>
        <textarea
                        className="w-full h-[200px] border border-black mt-3  px-3 py-2"
                        placeholder={ "내용"}
                        value={valueNote}
                        onChange={handleNote}
                      />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>동의</Button>
          <Button onClick={()=>idc?handleupdate(idc):handlePhotoChange1()} autoFocus>
          동의
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminAbout;
