import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "src/actions/customer.action";
import useForm from "../register/useForm";
import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import { useLocation } from "react-router";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

//import { values } from "lodash";

// ----------------------------------------------------------------------

export default function Forgot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOTP] = useState("");
  const [disable, setDisable] = React.useState(false);
  const [registerComponent, setRegisterComponent] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [openF, setOpenF] = React.useState(false);
  const [userId, setUserId] = useState();
  const [forgotComponent, setForgotComponent] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useLocation();
  const { phone } = state;
  const initialFieldValues = {
    newpass: "",
  };
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if (values.newpass != values.confirmpass)
      setErrors({
        ...temp,
      });
    if ("phone" in fieldValues)
      temp.phone = /^[0]{1}\d{9}$/.test(fieldValues.phone)
        ? ""
        : "Số điện thoại không được để rỗng và gồm 10 kí tự số.";
    setErrors({
      ...temp,
    });
    if ("newpass" in fieldValues)
      temp.newpass = /^\w{6,200}$/.test(fieldValues.newpass)
        ? ""
        : "Mật khẩu không được để trống và phải từ 6 kí tự trở lên";
    setErrors({
      ...temp,
    });
    if ("confirmpass" in fieldValues)
      temp.confirmpass = /^\w{6,200}$/.test(fieldValues.confirmpass)
        ? ""
        : "Mật khẩu không được để trống và phải từ 6 kí tự trở lên";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate);
  const onSubmitOTP = () => {
    const code = otp;
    console.log(code);

    window.confirmationResult
      .confirm(code)
      .then((result) => {
        setRegisterComponent(false);
      })
      .catch((error) => {
        handleClickOpen();
      });
  };
  const handleSubmidOTP = (e) => {
    e.preventDefault();
    onSubmitOTP();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleOpenRegister = () => {
    setOpenF(true);
  };
  const handleCloseRegister = () => {
    navigate("/login", { replace: true });
    setOpenF(false);
  };
  const forgotpass = (e) => {
    e.preventDefault();
    const confirmpass = values.confirmpass;
    dispatch(actions.forgotpass(phone, confirmpass));
    handleOpenRegister();
  };
  return registerComponent ? (
    <div>
      <Alert severity="warning" style={{ marginBottom: 10 }}>
        <AlertTitle>Cảnh báo</AlertTitle>
        <strong>Vui lòng nhập mã xác thực!</strong>
      </Alert>
      <form autoComplete="off" noValidate onSubmit={handleSubmidOTP}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="OTP"
              name="OTP"
              onChange={(e) => setOTP(e.target.value)}
            />
          </Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Xác nhận
          </LoadingButton>
        </Stack>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClickClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Cảnh báo"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Mã xác nhận OTP không phù hợp!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose} color="primary">
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  ) : (
    <div>
      <Alert severity="success" style={{ marginBottom: 10 }}>
        <AlertTitle>Thông báo</AlertTitle>
        <strong>Vui lòng nhập mật khẩu mới!</strong>
      </Alert>
      <form autoComplete="off" noValidate onSubmit={forgotpass}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              disabled
              type={showPassword ? "text" : "password"}
              label="Mật khẩu cũ"
              name="pass"
            />
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Mật khẩu mới"
              name="confirmpass"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={values.password}
              onChange={handleInputChange}
              {...(errors.password && {
                error: true,
                helperText: errors.password,
              })}
            />
          </Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Xác nhận
          </LoadingButton>
        </Stack>
        <Dialog
          open={openF}
          keepMounted
          onClose={handleCloseRegister}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Cảnh báo"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Thay đổi mật khẩu thành công!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRegister} color="primary">
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
