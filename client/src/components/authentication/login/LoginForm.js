import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import * as actions from "src/actions/customer.action";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "src/actions/customer.action";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Notifycation from "src/pages/UserComponent/Notifycation";
import { Alert, AlertTitle } from "@material-ui/lab";
import firebase from "firebase";
import userForm from "../register/useForm";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Container,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { styled } from "@material-ui/core/styles";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(12, 0),
  }));

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const user = useSelector((state) => state.customer.login);
  const [loginComponent, setLoginComponent] = useState(true);
  const [otp, setOTP] = useState("");
  const SET_USER_AUTHENTICATE = "user_authenticated";
  const { handleSubmit } = useForm({});
  const [disable, setDisable] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const initialFieldValues = {
    phone: "",
  };
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("phone" in fieldValues)
      temp.phone = /^[0]{1}\d{9}$/.test(fieldValues.phone)
        ? ""
        : "Số điện thoại không được để rỗng và gồm 10 kí tự số.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    userForm(initialFieldValues, validate);

  useEffect(() => {
    dispatch(actions.login(phone, pass));
  }, [phone, pass]);

  console.log(user);

  const onLogin = () => {
    if (user === "") {
      setNotify({
        isOpen: true,
        message:
          "Tài khoản hoặc mật khẩu không chính xác - Vui lòng nhập lại !",
        type: "error",
      });
    } else {
      dispatch(isAuthenticated(user.id));
      navigate("/dashboard", { replace: true });
    }
  };
  const onForgot = () => {
    const phone = values.phone;
    if (phone.length) {
      // dispatch(isAuthenticated(phone));
      navigate("/forgot", { replace: true });
    } else {
      setNotify({
        isOpen: true,
        message: "Số điện thoại không phù hợp - Vui lòng nhập lại !",
        type: "error",
      });
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate("/dashboard", { replace: true });
    },
  });
  const { getFieldProps } = formik;
  //const { values, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleForgot = (e) => {
    e.preventDefault();

    setLoginComponent(false);
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
    // const phoneNumber = "+84" + values.phone;
    const phoneNumber = values.phone;
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
        // navigate("/register", { replace: true });
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  const forgot = (e) => {
    e.preventDefault();
    const phone = values.phone;
    if (phone.length) {
      onSignInSubmit(e);
      setDisable(true);
      setTimeout(() => {
        navigate("/forgot", { state: { phone: values.phone }, replace: true });
      }, 8000);
    } else {
      handleClickOpen();
    }
  };

  console.log(values.phone);
  return loginComponent ? (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit(onLogin)}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Số điện thoại"
              onChange={(event) => setPhone(event.target.value)}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Mật khẩu"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(event) => setPass(event.target.value)}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <Link
              component={RouterLink}
              variant="subtitle2"
              to="#"
              onClick={handleForgot}
            >
              Quên mật khẩu?
            </Link>
          </Stack>
          <Button fullWidth size="large" type="submit" variant="contained">
            Đăng nhập
          </Button>
        </Form>
      </FormikProvider>
      <Notifycation notify={notify} setNotify={setNotify} />
    </>
  ) : (
    <form autoComplete="off" noValidate onSubmit={forgot}>
      <div id="sign-in-button"></div>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            value={values.phone}
            label="Số điện thoại"
            name="phone"
            onChange={handleInputChange}
            {...(errors.phone && {
              error: true,
              helperText: errors.phone,
            })}

          // onChange={(e) => setOTP(e.target.value)}
          />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={forgot}
        >
          Xác nhận
        </LoadingButton>
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
              Số điện thoại còn trống
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
  );
}
