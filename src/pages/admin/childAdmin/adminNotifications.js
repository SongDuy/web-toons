import React, { useState, useEffect } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BankFireBase from "../../../common/services/Bank.services";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const AdminNotificationsPage = () => {
  const [loading, setloading] = useState(false);
  const [bank, setbank] = useState([]);
  const [open, setopen] = useState(false);
  const [Bankname, setBankname] = useState("");
  const [Accountnumber, setAccountnumber] = useState("");
  const [Accountname, setAccountname] = useState("");
  const [idbank, setidbank] = useState('');
  useEffect(() => {
    const get = async () => {
      try {
        setloading(false);
        const banks = await BankFireBase.getAll();
        setbank(banks.success ? banks.bank : []);
        setloading(true);
      } catch (error) { }
    };
    get();
  }, []);

  const handleClose = () => {
    setopen(false);
    setidbank('')
    setBankname("");
    setAccountname("");
    setAccountnumber("");
  };
  const handleid = async (id) => {
    try {
      const getidbank = await BankFireBase.getbyid(id)
      setBankname(getidbank.success ? getidbank.Bankname : '');
      setAccountname(getidbank.success ? getidbank.Accountname : '');
      setAccountnumber(getidbank.success ? getidbank.Accountnumber : '');
      setidbank(id)
      setopen(true)
    } catch (error) {

    }
  }
  const handleupdate = async () => {
    try {

      if (Bankname && Accountnumber && Accountname) {
        setloading(false);
        await BankFireBase.update({
          Bankname,
          Accountnumber,
          Accountname,
          createTime: new Date(Date.now()),
        }, idbank);
        const banks = await BankFireBase.getAll();
        setbank(banks.success ? banks.bank : []);
        setloading(true);
        setopen(false);
        setBankname("");
        setAccountname("");
        setAccountnumber("");
        setidbank('')
      }
    } catch (error) { }
  };
  const handledelete = async (id) => {
    try {
      let result = window.confirm("Do you want to delete this bank?");
      if (result) {
        setloading(false);
        await BankFireBase.Delete(id);
        const banks = await BankFireBase.getAll();
        setbank(banks.success ? banks.bank : []);
        setloading(true);

      }
    } catch (error) { }
  };
  const handleAdd = async () => {
    try {
      if (Bankname && Accountnumber && Accountname) {
        setloading(false);
        await BankFireBase.Add({
          Bankname,
          Accountnumber,
          Accountname,
          createTime: new Date(Date.now()),
        });
        const banks = await BankFireBase.getAll();
        setbank(banks.success ? banks.bank : []);
        setloading(true);
        setopen(false);
        setBankname("");
        setAccountname("");
        setAccountnumber("");
        setidbank('')
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
        <>
          <div className="w-full h-full pb-5 bg-white">

            {/* Ô tìm kiếm */}
            <div className="w-full flex justify-end">

              <input
                className="w-[250px] h-[35px] px-2 border-2 rounded-l"
                // onChange={handleSearch}
                placeholder="Search..."
              />

              <button className="w-[100px] h-[35px] mb-3 mr-3 text-white font-semibold relative bg-black rounded-r">
                Search
              </button>
            </div>

            <table className="w-full">
              <thead className="bg-gray-100">
                <tr className="w-full">
                  <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                    ID
                  </th>
                  <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                    Bank
                  </th>
                  <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                    Accountname
                  </th>
                  <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                    Accountnumber
                  </th>
                  <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                    Manager
                  </th>
                  {bank?.length === 0 &&
                    <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">
                      <button
                        onClick={() => setopen(true)}
                        className="w-[35px] h-[35px] text-red-500 mx-1 relative bg-gray-100 hover:bg-gray-200 rounded-full"
                      >
                        Add
                      </button>
                    </th>
                  }
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bank?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      {item.Bankname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      {item.Accountname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      {item.Accountnumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      <button onClick={() => handleid(item.id)} className="w-[35px] h-[35px] text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handledelete(item.id)}
                        className="w-[35px] h-[35px] text-red-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <React.Fragment>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  set bank
                </DialogContentText>

                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="Bankname"
                  name="Bankname"
                  value={Bankname}
                  onChange={(e) => setBankname(e.target.value)}
                  label="Bankname"
                  type="text"
                  fullWidth
                  variant="standard"
                />

                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="Accountname"
                  name="Accountname"
                  value={Accountname}
                  onChange={(e) => setAccountname(e.target.value)}
                  label="Accountname"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="Accountnumber"
                  name="Accountnumber"
                  value={Accountnumber}
                  onChange={(e) => setAccountnumber(e.target.value)}
                  label="Accountnumber"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={idbank ? handleupdate : handleAdd} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </>
      )}
    </>
  );
};

export default AdminNotificationsPage;
