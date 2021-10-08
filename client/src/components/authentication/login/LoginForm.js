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
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const user = useSelector((state) => state.customer.login);
  const { handleSubmit } = useForm({});

  useEffect(() => {
    dispatch(actions.login(phone, pass));
  }, [phone, pass]);

  const onLogin = () => {
    if (user === "" || user === "undefined") {
      window.alert("Fail");
    } else {
      dispatch(isAuthenticated(user.id));
      navigate("/dashboard", { replace: true });
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

  const { values, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  // const handleForgot = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     dispatch(actions.register(values));

  //     navigate("/forgotpass",{ replace: true });
  //   }
  // };
  return (
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
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Quên mật khẩu?
          </Link>
        </Stack>

        <Button fullWidth size="large" type="submit" variant="contained">
          Đăng nhập
        </Button>
      </Form>
    </FormikProvider>
  );
}
