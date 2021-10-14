import React, { useState, useEffect } from "react";
import { Stack, TextField, Grid } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "src/actions/customer.action";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordForm() {
  //const [btnDisabled, setBtnDisabled] = useState(false);
  var btnDisabled = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState([]);
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassWord, setNewPassWord] = useState("");
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
    if (password !== "" && newPassWord !== "" && reNewPassWord !== "") {
      return (btnDisabled = false);
    } else {
      return (btnDisabled = true);
    }
  }
  //console.log(userProfile);
  console.log(newPassWord);
  // console.log(userId);
  const initialFieldValues = {
    phone: phone,
    password: newPassWord,
  };
  const handleSubmit = (e) => {
    dispatch(actions.updateUserById(initialFieldValues, userId));
    navigate("/dashboard", { replace: true });
  };

  return (
    // <Grid container style={{ width: "80%" }}>
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
          value={newPassWord}
          onChange={(e) => setNewPassWord(e.target.value)}
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
          disabled={handleDisable()}
          size="large"
          type="submit"
          variant="contained"
        >
          Cập nhật mật khẩu
        </LoadingButton>
      </Stack>
    </form>
    //</Grid>
  );
}
