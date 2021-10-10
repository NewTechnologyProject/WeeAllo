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
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOTP] = useState("");
  const [disable, setDisable] = React.useState(false);
  const [registerComponent, setRegisterComponent] = useState(true);
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
      temp.firstname = /^[A-Z]{1}[a-z]*$/.test(fieldValues.firstname)
        ? ""
        : "Họ không được để rỗng và bắt đầu là chữ in hoa."; //toán tử 3 ngôi
    if ("lastname" in fieldValues)
      temp.lastname = /^[A-Z]{1}[a-z]*$/.test(fieldValues.lastname)
        ? ""
        : "Tên không được để rỗng và bắt đầu là chữ in hoa.";
    if ("phone" in fieldValues)
      temp.phone = /^[0]{1}\d{9}$/.test(fieldValues.phone)
        ? ""
        : "Số điện thoại không được để rỗng và gồm 10 kí tự số.";
    setErrors({
      ...temp,
    });
    if ("password" in fieldValues)
      temp.password = /^\w{10,200}$/.test(fieldValues.password)
        ? ""
<<<<<<< HEAD
        : "Mật khẩu không được để trống và phải từ 6 kí tự trở lên";
=======
        : "Mật khẩu không được để trống, ít nhất 10 kí tự";
>>>>>>> 50d5e1be5bf97d614fcdcea3ff351a47ef303cbb

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
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log("SMS not sent");
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
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
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
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Xác nhận
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
}
