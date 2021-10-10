import React, { useState } from "react";

import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Badge from "@material-ui/core/Badge";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

export default function UserDetail() {
  var btnDisabled = true;
  const [firstname, setFirstName] = useState("abc");
  const [lastname, setLastName] = useState("bdf");
  const [phone, setPhone] = useState("0936064271");
  const [email, setEmail] = useState("hungnguyen");
  function handleDisable() {
    if (firstname !== "" && lastname !== "" && email !== "") {
      return (btnDisabled = false);
    } else {
      return (btnDisabled = true);
    }
  }
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <form autoComplete="off">
        <div
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginBottom: "20px",
            zIndex: "2",
          }}
        >
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            style={{ display: "none" }}
            type="file"
          />
          <label htmlFor="contained-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={<PhotoCamera style={{ fontSize: "27px" }} />}
              >
                <Avatar
                  src="/static/mock-images/avatars/avatar_default.jpg"
                  style={{
                    width: "150px",
                    height: "150px",
                  }}
                  variant="circle"
                ></Avatar>
              </Badge>
            </IconButton>
          </label>
        </div>

        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Họ"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              fullWidth
              label="Tên"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Stack>

          <TextField
            fullWidth
            label="Số điện thoại"
            name="phone"
            disabled={true}
            value={phone}
          />
          <TextField
            fullWidth
            label="Email"
            name="password"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={handleDisable()}
          >
            Cập nhật
          </LoadingButton>
        </Stack>
      </form>
    </Grid>
  );
}
