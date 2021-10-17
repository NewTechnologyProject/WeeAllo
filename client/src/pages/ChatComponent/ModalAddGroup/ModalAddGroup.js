import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import * as actions from "src/actions/roomchat.action";
import { addUserGroup } from "src/actions/usergroup.action";
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
  const [nameInput, setNameInput] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const userId = localStorage.getItem("user_authenticated");
  const dispatch = useDispatch();
  let listMembers = [];

  const getNameInput = (event) => {
    setNameInput(event.target.value);
  };

  const getChosenMembersHandler = (chosenMembers) => {
    listMembers = chosenMembers;

    dispatch({
      type: "ABLE TO CREATE",
      payload: chosenMembers,
    });
  };

  const createUserGroup = (roomId, members) => {
    members.map((member) => {
      const userGroup = {
        id: null,
        roomChatId: {
          id: roomId,
        },
        userId: {
          id: member.id,
        },
      };

      addUserGroup(userGroup).catch((error) => {
        console.log(error);
      });
    });
  };

  const createGroupChat = (room) => {
    actions
      .addNewGroupChat(room)
      .then((response) => {
        const newListMembers = [...listMembers, { id: userId }];
        createUserGroup(response.data.id, newListMembers);

        //Need to reload rooms
        props.onNeedLoad(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (props.openModal === true) {
      const today = new Date();
      const getDate =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();

      const room = {
        id: null,
        creator: Number(userId),
        roomName: nameInput,
        createAt: getDate,
        messageList: [],
        userGroupList: [],
      };

      //Api
      createGroupChat(room);

      //Reload page
      props.onCloseModal();
      setNameInput("");
    }
  };

  const searchFriendFilter = (event) => {
    setKeyWord(event.target.value);
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
                onChange={getNameInput}
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
                onChange={searchFriendFilter}
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

            {/* Add members to group and actions */}
            <ChoosingMember
              onGetChosenMembers={getChosenMembersHandler}
              keyWord={keyWord}
              onCloseModal={props.onCloseModal}
            />
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalAddGroup;
