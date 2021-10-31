import { Avatar, Grid, IconButton, Stack, TextField } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { LoadingButton } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "src/actions/customer.action";
import Notifycation from "./Notifycation";
import { useForm } from "react-hook-form";

export default function UserDetail() {
  var btnDisable = false;
  //const [disableButton, setDisableButton] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const imageAvatar = useRef(null);
  const [userProfile, setUserProfile] = useState([]);
  const [image, setImage] = useState();
  const [imageData, setImageData] = useState();
  const [userId, setUserId] = useState();
  const [firstname, setFirstName] = useState("");
  const [gender, setGender] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const url = " http://localhost:4000/api/storage/uploadFile";

  const user = useSelector((state) => state.customer.userAuth);
  const profile = useSelector((state) => state.customer.userById);
  useEffect(() => {
    dispatch(actions.findByIdUser(user));
  }, []);
  useEffect(() => {
    if (profile != undefined || profile != null) {
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
      setGender(userProfile.gender);
      setSelectedDate(userProfile.birthday);
    }
  }, [userProfile]);

  const handleImage = (e) => {
    const imageA = e.target.files[0];
    const formData = new FormData();
    formData.append("file", imageA);
    // fetch("http://localhost:4000/api/storage/uploadFile?key=file", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => console.log(response))
    //   .then((result) => {
    //     setImage(result);
    //     console.log("Success:", result);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    axios
      .post("http://localhost:4000/api/storage/uploadFile?key=file", formData)
      .then((response) => {
        setImage(response.data);
        //console.log(response.data);
      });
  };
  //console.log(image);

  const initialFieldValues = {
    firstname: firstname,
    lastname: lastname,
    gender: gender,
    birthday: selectedDate,
    phone: phone,
    avartar: image,
    //coverImage: "",
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.updateUserById(initialFieldValues, userId));
    setNotify({
      isOpen: true,
      message: "Cập nhật thông tin thành công !",
      type: "success",
    });
    // setInterval(() => {
    //   navigate("/user", { replace: true });
    // }, 4000);
    //console.log("data", data);
  };
  function onDisable() {
    if (firstname === "" && lastname === "") {
      return (btnDisable = true);
    } else {
      return (btnDisable = false);
    }
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={onSubmit}>
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
              name="file"
              ref={imageAvatar}
              style={{ display: "none" }}
              onChange={handleImage}
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
                    src={image}
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
              <div>
                <TextField
                  fullWidth
                  label="Họ"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  label="Tên"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </Stack>

            <TextField
              fullWidth
              label="Số điện thoại"
              name="phone"
              disabled={true}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Giới tính :</label>
            <Stack spacing={3}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <br />
                <label>Nam: </label>
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={gender === "Nam"}
                  style={{ transform: "scale(1.5)" }}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label>Nữ: </label>
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={gender === "Nữ"}
                  style={{ transform: "scale(1.5)" }}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Stack>
            </Stack>
            <TextField
              id="date"
              label="Ngày sinh"
              type="date"
              name="ngaysinh"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              //className={classes.textField}

              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: "1912-01-01",
                max: "2012-01-01",
              }}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={onDisable()}
            >
              Cập nhật
            </LoadingButton>
          </Stack>
        </form>
      </Grid>

      <Notifycation notify={notify} setNotify={setNotify} />
    </>
  );
}
