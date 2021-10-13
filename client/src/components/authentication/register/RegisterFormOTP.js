import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "src/actions/customer.action";
import useForm from "./useForm";
import React from "react";
import firebase from "firebase";
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

export default function RegisterFormOTP() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [otp, setOTP ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    //if (validate()) {
   //   dispatch(actions.register(values));

      navigate("/login", { replace: true });
  //  }
  };
  const onSubmitOTP = (e) =>{
    e.preventDefault()
    const code = otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      alert("User is verified")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
  return (
    <form autoComplete="off" noValidate onSubmit={onSubmitOTP}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField fullWidth label="OTP" name="OTP"
            onChange={(e)=>setOTP(e.target.value)}
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
  );
}
