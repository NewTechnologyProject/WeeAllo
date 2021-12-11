import { Grid, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import * as actions from "../../actions/contact.action";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import userAvatar from "src/access/UserImage/user.png";
import { Search } from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function AllContact() {
  const dispatch = useDispatch();
  const allContact = useSelector((state) => state.contact.listcontact);
  const user = useSelector((state) => state.customer.userAuth);
  const [contact, setContact] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [openToast, setOpenToast] = React.useState(false);
  const [search, setSearch] = useState("");
  const handleClick = () => {
    setOpenToast(true);
  };
  const handleClickOpen = (id) => {
    setOpen(true);
    setIdDelete(id);
  };
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(actions.fetchAllContact(user));
  }, []);

  useEffect(() => {
    if (allContact) {
      setContact(
        allContact.filter((c) =>
          c.lastname.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, allContact]);
  const genderListAllContact = () => {
    if (!contact.length) {
      return (
        <div style={{ width: "100%", textAlign: "center" }}>
          <Search fontSize="large" />
          <Typography variant="h5">Không tìm thấy bạn bè nào</Typography>
        </div>
      );
    } else {
      return (
        <Grid container style={{ display: "flex", position: "inherit" }}>
          {contact.map((record, index) => (
            <Grid
              item
              xs={6}
              sm={12}
              md={3}
              style={{ padding: 10 }}
              key={index}
            >
              <Card>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="250"
                  image={record.avartar ? record.avartar : userAvatar}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {record.firstname + " " + record.lastname}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "center" }}>
                  <Button
                    size="medium"
                    color="error"
                    variant="outlined"
                    fullWidth
                    onClick={(ev) => {
                      handleClickOpen(record.id);
                    }}
                  >
                    Hủy Kết Bạn
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    }
  };
  return (
    <div
      style={{
        height: "100%",
        padding: "20px",
        width: "100%",
        display: "block",
        position: "inherit",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          style={{ padding: 10, textAlign: "right" }}
        >
          <TextField
            id="outlined-basic"
            label="Nhập tên cần tìm"
            name="search"
            variant="outlined"
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      {genderListAllContact()}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{""}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Người này sẽ không còn liên hệ <br /> với bạn
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              fontSize: 10,
              backgroundColor: "rgb(180, 0, 0)",
              color: "white",
            }}
            onClick={() => {
              dispatch(actions.deleteAllContact(user, idDelete));
              handleClick();
              handleClose();
            }}
            color="primary"
          >
            Xóa kết bạn
          </Button>
          <Button
            style={{
              fontSize: 10,
              backgroundColor: "#C67732 ",
              color: "white",
            }}
            onClick={handleClose}
            color="primary"
            autoFocus
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openToast}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleCloseToast}
        message="Đã từ chối lời đề nghị kết bạn"
      />
    </div>
  );
}
