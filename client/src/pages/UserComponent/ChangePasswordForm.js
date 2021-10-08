import React, { useState } from "react";
import { Stack, TextField, Grid } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

export default function ChangePasswordForm() {
  //const [btnDisabled, setBtnDisabled] = useState(false);
  var btnDisabled = true;
  const [password, setPassword] = useState("");
  const [newPassWord, setNewPassWord] = useState("");
  const [reNewPassWord, setReNewPassWord] = useState("");
  function handleDisable() {
    if (password !== "" && newPassWord !== "" && reNewPassWord !== "") {
      return (btnDisabled = false);
    } else {
      return (btnDisabled = true);
    }
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <form>
        <Stack spacing={3}>
          <TextField
            fullWidth
            size="large"
            label="Mật khẩu cũ"
            name="phone"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            size="large"
            label="Mật khẩu mới"
            name="phone"
            type="password"
            value={newPassWord}
            onChange={(e) => setNewPassWord(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            size="large"
            label="Xác nhận mật khẩu"
            name="password"
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
    </Grid>
  );
}
