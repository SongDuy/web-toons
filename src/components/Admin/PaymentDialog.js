import React, { memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useSelector, useDispatch } from 'react-redux';
import { setIspayment } from '../../common/store/hidden';
import TextField from '@mui/material/TextField';
import CheckIcon from "@mui/icons-material/Check";

function PaymentDialog(props) {
  const dispatch = useDispatch();
  const openpayment = useSelector(state => state.hidden.payment);


  const handleClose = () => {
    dispatch(setIspayment(false))
  };

  return (
    <React.Fragment>

      <Dialog
        open={openpayment}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            지불이 있나요?
            <Button onClick={() => props.setpayment(!props.payment)} className={`w-[35px] h-[35px] ${props.payment ? "text-blue-500" : "text-red-500"} mx-1 bg-gray-100 hover:bg-gray-200 rounded-full`}>
              <CheckIcon />
            </Button>
          </DialogContentText>

          {props.payment && <TextField
            autoFocus
            required
            margin="dense"
            id="가격"
            name="가격"
            value={props.price}
            onChange={(e) => props.setprice(e.target.value)}
            label="가격"
            type="number"
            fullWidth
            variant="standard"
          />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            비동의
          </Button>
          <Button onClick={props.handlecheck} autoFocus>
            동의
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default memo(PaymentDialog)