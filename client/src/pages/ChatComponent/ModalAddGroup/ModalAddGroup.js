import React from "react";
import { useState } from "react";

import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import classes from "./ModalAddGroup.module.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import IconButton from "@material-ui/core/IconButton";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CloseIcon from "@material-ui/icons/Close";
import ChoosingMember from "./ChoosingMember";
// import Backdrop from "@material-ui/core/Backdrop";s

const ModalAddGroup = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.openModal}
      onClose={props.onCloseModal}
      closeAfterTransition
      //   BackdropComponent={Backdrop}
      //   BackdropProps={{
      //     timeout: 500,
      //   }}
    >
      <Fade in={props.openModal}>
        <div className={classes.paper}>
          {/* button cancel */}
          <div className={classes.cancel}>
            <IconButton aria-label="delete" onClick={props.onCloseModal}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>

          {/* Tao nhom moi */}
          <h3 id="transition-modal-title">Tạo nhóm mới</h3>
          <form className={classes["form-control"]} onSubmit={submitHandler}>
            <hr />

            {/* Hinh dai dien */}
            <div className={classes["avatar"]}>
              <IconButton aria-label="delete">
                <CameraAltIcon fontSize="large" />
              </IconButton>
              <p>Chọn hình đại diện</p>
            </div>

            {/* Ten nhom */}
            <div className={classes["title-input"]}>
              <TextField
                id="standard-basic"
                label="Tên nhóm"
                placeholder="Tên nhóm"
                fullWidth
                margin="normal"
                size="medium"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PeopleAltIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* Them thanh vien */}
            <div className={classes["title-input"]}>
              <TextField
                className={classes.margin}
                id="input-with-icon-textfield"
                placeholder="Thêm thành viên"
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  className: classes["group-name"],
                }}
              />
            </div>

            {/* danh sach ban be */}
            <ChoosingMember />

            {/* buttons */}
            <div className={classes.actions}>
              <button className={classes.submit}>Tạo</button>
              <button onClick={props.onCloseModal}>Hủy</button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalAddGroup;
