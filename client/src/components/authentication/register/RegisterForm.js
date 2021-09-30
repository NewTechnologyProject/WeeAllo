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

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

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
      temp.firstname = fieldValues.firstname ? "" : "Họ không được để rỗng."; //toán tử 3 ngôi
    if ("lastname" in fieldValues)
      temp.lastname = fieldValues.lastname ? "" : "Tên không được để rỗng.";
    if ("phone" in fieldValues)
      temp.phone = fieldValues.phone
        ? ""
        : "Số điện thoại không được để rỗng và gồm 10 kí tự số.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password
        ? ""
        : "Mật khẩu không được để trống";

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
      dispatch(actions.register(values));
      navigate("/registerotp", { replace: true });
    }
  };

  const register = () => {
    //e.preventDefault();
    //console.log(firstName + lastName + phone + password);
    dispatch(actions.register(phone, password, firstName, lastName));
    navigate("/login", { replace: true });
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
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

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Đăng kí
        </LoadingButton>
      </Stack>
    </form>
  );
}
