import React, { useState, useEffect } from "react";
import { Stack, TextField, Grid } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "src/actions/customer.action";
import { useNavigate } from "react-router-dom";
import Notifycation from "./Notifycation";
// import useForm from "../../components/authentication/register/useForm";
import { useForm } from "react-hook-form";
export default function ChangePasswordForm() {
  //const [btnDisabled, setBtnDisabled] = useState(false);
  var btnDisabled = true;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState([]);
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassWord] = useState("");
  const [reNewPassWord, setReNewPassWord] = useState("");
  const user = useSelector((state) => state.customer.userAuth);
  const profile = useSelector((state) => state.customer.userById);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(actions.findByIdUser(user));
  }, []);
  useEffect(() => {
    if (profile !== undefined) {
      setUserProfile(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (userProfile !== undefined) {
      setUserId(userProfile.id);
      setPhone(userProfile.phone);
      //setNewPassWord(userProfile.password);
    }
  }, [userProfile]);

  const onSubmit = (data) => {
    const initialFieldValues = {
      phone: phone,
      password: data.newPassword,
    };

    dispatch(actions.updateUserById(initialFieldValues, userId));
    setNotify({
      isOpen: true,
      message: "Đổi mật khẩu thành công !",
      type: "success",
    });
    // setTimeout(() => {
    //   navigate("/dashboard", { replace: true });
    // }, 4000);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <form
          style={{ width: "40%", margin: "auto", marginTop: "50px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <TextField
              fullWidth
              size="large"
              label="Mật khẩu mới"
              id="newPass"
              name="newPassword"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "Vui lòng nhập mật khẩu mới",
                },
                minLength: {
                  value: 6,
                  message: " Mật khẩu có từ 6 kí tự trở lên",
                },
              })}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassWord(e.target.value)}
            />
            <small style={{ color: "red" }}>
              {errors.newPassword?.message}
            </small>

            <TextField
              fullWidth
              type="password"
              size="large"
              label="Xác nhận mật khẩu"
              name="reNewPassword"
              {...register("reNewPassword", {
                required: {
                  value: true,
                  message: "Vui lòng xác nhận mật khẩu",
                },
                validate: (value) =>
                  value === getValues("newPassword") || " Mật khẩu không khớp",
              })}
              value={reNewPassWord}
              onChange={(e) => setReNewPassWord(e.target.value)}
            />
            <small style={{ color: "red" }}>
              {errors.reNewPassword?.message}
            </small>

            <LoadingButton
              fullWidth
              //disabled={handleDisable()}
              size="large"
              type="submit"
              variant="contained"
            >
              Cập nhật mật khẩu
            </LoadingButton>
          </Stack>
        </form>
      </Grid>
      <Notifycation notify={notify} setNotify={setNotify} />
    </>
  );
}
