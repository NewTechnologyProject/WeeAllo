import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "src/actions/customer.action";
import useForm from "./useForm";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

// ----------------------------------------------------------------------

export default function RegisterFormOTP() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  return (
    <form autoComplete="off" noValidate >
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="OTP"
            name="OTP"
            // value={values.firstname}
            // onChange={handleInputChange}
            // {...(errors.firstname && {
            //   error: true,
            //   helperText: errors.firstname,
           // })}
          />
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Xác nhận
        </LoadingButton>
      </Stack>
    </form>
  );
}
