import React, { useState, useEffect } from "react";
import { Stack, TextField, Grid } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "src/actions/customer.action";
import { useNavigate } from "react-router-dom";
import Notifycation from "./Notifycation";
import useForm from "../../components/authentication/register/useForm";

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
  function handleDisable() {
    if (password !== "" && newPassword !== "" && reNewPassWord !== "") {
      return (btnDisabled = false);
    } else {
      return (btnDisabled = true);
    }
  }
  //console.log(userProfile);

  // console.log(userId);
  const initialFieldValues = {
    phone: phone,
    password: newPassword,
  };
  // const validate = (fieldValues = values) => {
  //   let temp = { ...errors };
  //   if ("newPassword" in fieldValues) {
  //     temp.newPassword = /^\w{6,200}$/.test(fieldValues.newPassword)
  //       ? ""
  //       : "Mật khẩu không được để trống và phải từ 6 kí tự trở lên";
  //   }
  //   setErrors({
  //     ...temp,
  //   });
  //   if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  // };
  // const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
  //   useForm(initialFieldValues, validate);
  console.log(newPassword);

  const handleSubmit = () => {
    dispatch(actions.updateUserById(initialFieldValues, userId));
    setNotify({
      isOpen: true,
      message: "Đổi mật khẩu thành công !",
      type: "success",
    });
    setInterval(() => {
      navigate("/dashboard", { replace: true });
    }, 4000);

    //navigate("/dashboard", { replace: true });
  };
  // const handleSubmitForm = () => {
  //   if (validate()) {
  //     handleSubmit();
  //   }
  // };

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
          onSubmit={handleSubmit}
        >
          <Stack spacing={3}>
            <TextField
              fullWidth
              size="large"
              label="Mật khẩu cũ"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              size="large"
              label="Mật khẩu mới"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassWord(e.target.value)}
              // onChange={handleInputChange}
              // {...(errors.newPassword && {
              //   error: true,
              //   helperText: errors.newPassword,
              // })}
            />

            <TextField
              fullWidth
              type="password"
              size="large"
              label="Xác nhận mật khẩu"
              name="reNewPassword"
              value={reNewPassWord}
              onChange={(e) => setReNewPassWord(e.target.value)}
            />

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
