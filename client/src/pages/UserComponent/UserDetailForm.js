import { Avatar, Grid, IconButton, Stack, TextField } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { LoadingButton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "src/actions/customer.action";

export default function UserDetail() {
  var btnDisabled = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState([]);
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
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
      setImage(userProfile.avartar);
      setFirstName(userProfile.firstname);
      setLastName(userProfile.lastname);
      setPhone(userProfile.phone);
    }
  }, [userProfile]);
  console.log(userProfile);
  // console.log(firstname);
  //console.log(lastname);
  console.log(userId);

  const initialFieldValues = {
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    avartar: "access/UserImage/user.png",
    coverImage: "",
  };
  console.log(initialFieldValues);

  const handleSubmit = () => {
    dispatch(actions.updateUserById(initialFieldValues, userId));
    navigate("/dashboard", { replace: true });
  };
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                  //src="/static/mock-images/avatars/avatar_default.jpg"
                  alt={image}
                  src={(e) => setImage(e.target.value)}
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
              value={userProfile ? firstname : "abc"}
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
            onChange={(e) => setPhone(e.target.value)}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Cập nhật
          </LoadingButton>
        </Stack>
      </form>
    </Grid>
  );
}
