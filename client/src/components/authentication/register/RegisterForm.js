import * as Yup from "yup";
import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "src/actions/customer.action";
import useForm from "./useForm";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

// import firebase from "./firebase";

// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Container,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { isAfter } from "date-fns";
import firebase from "./firebase";
import { database } from "faker";
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOTP] = useState("");
  const [disable, setDisable] = React.useState(false);
  const [registerComponent, setRegisterComponent] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const initialFieldValues = {
    firstname: "",
    lastname: "",
    email: null,
    phone: "",
    password: "",
    isActive: "false",
    createAt: null,
    updateAt: null,
    avartar: "access/UserImage/user.png",
    coverImage: null,
    status: null,
    contactList: null,
    contactList1: null,
    toDoUserList: null,
    messageList: null,
    userGroupList: null,
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstname" in fieldValues)
      temp.firstname =
        /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*\s*[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*$/.test(
          fieldValues.firstname
        )
          ? ""
          : "Họ không được để rỗng và bắt đầu là chữ in hoa."; //toán tử 3 ngôi
    if ("lastname" in fieldValues)
      temp.lastname =
        /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*\s*[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*$/.test(
          fieldValues.lastname
        )
          ? ""
          : "Tên không được để rỗng và bắt đầu là chữ in hoa.";
    if ("phone" in fieldValues)
      temp.phone = /^[0]{1}\d{9}$/.test(fieldValues.phone)
        ? ""
        : "Số điện thoại không được để rỗng và gồm 10 kí tự số.";
    setErrors({
      ...temp,
    });
    //if("phone" in fieldValues ===)
    if ("password" in fieldValues)
      temp.password = /^\w{6,200}$/.test(fieldValues.password)
        ? ""
        : "Mật khẩu không được để trống và phải từ 6 kí tự trở lên";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // if (actions.searchContact(true)) {
      // if ((values.phone = actions.register(values.phone))) {
      //   handleClickOpen();
      //   console.log("Số điện thoại đã được đăng ký");
      // } else {
      onSignInSubmit(e);
      setDisable(true);
      setTimeout(() => {
        setRegisterComponent(false);
      }, 8000);
    }
  };

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };
  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = "+84" + values.phone;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP đã gởi");
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log("SMS không được gởi");
        navigate("/register", { replace: true });
      });
  };
  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        dispatch(actions.register(values));
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);

        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
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
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const comeBack = () => {
    navigate("/register", { replace: true });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
    comeBack();
  };

  return registerComponent ? (
    <form id="otp" autoComplete="off" noValidate>
      <div id="sign-in-button"></div>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Họ"
            name="firstname"
            value={values.firstname}
            onChange={handleInputChange}
            {...(errors.firstname && {
              error: true,
              helperText: errors.firstname,
            })}
          />

          <TextField
            fullWidth
            label="Tên"
            name="lastname"
            value={values.lastname}
            onChange={handleInputChange}
            {...(errors.lastname && {
              error: true,
              helperText: errors.lastname,
            })}
          />
        </Stack>
        <TextField
          fullWidth
          label="Số điện thoại"
          name="phone"
          value={values.phone}
          onChange={handleInputChange}
          {...(errors.phone && {
            error: true,
            helperText: errors.phone,
          })}
        />

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Mật khẩu"
          name="password"
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

        <LoadingButton
          disabled={disable}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Đăng kí
        </LoadingButton>
        <Dialog
          open={open}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClickClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Cảnh báo"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Số điện thoại của bạn đã được sử dụng để đăng ký một tài khoản
              trong web chat này
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose} color="primary">
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </form>
  ) : (
    <div>
      <Alert severity="warning" style={{ marginBottom: 10 }}>
        <AlertTitle>Cảnh báo</AlertTitle>
        <strong>Vui lòng nhập mã xác thực!</strong>
      </Alert>
      <form autoComplete="off" noValidate onSubmit={onSubmitOTP}>
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
            //  disabled={disable}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleClick}
          >
            Xác nhận
          </LoadingButton>
          <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Đăng ký thành công
            </Alert>
          </Snackbar>
        </Stack>
      </form>
    </div>
  );
}
