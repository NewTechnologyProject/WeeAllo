import React, { useState } from "react";

import * as actions from "src/actions/roomchat.action";
import { addUserGroup } from "src/actions/usergroup.action";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import classes from "./ModalAddGroup.module.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import ChoosingMember from "./ChoosingMember";
import Spinner from "../ui/Spinner";

const ModalAddGroup = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("user_authenticated");
  let listMembers = [];

  const exitModal = () => {
    props.onCloseModal();
    setAvatarUrl("");
  };

  const getAvatarUrl = (event) => {
    setAvatarUrl(event.target.files[0]);
  };

  const removeAvatarUrl = () => {
    setAvatarUrl("");
  };

  const getNameInput = (event) => {
    setNameInput(event.target.value);
  };

  const getChosenMembersHandler = (chosenMembers) => {
    listMembers = chosenMembers;

    // dispatch({
    //   type: "ABLE TO CREATE",
    //   payload: chosenMembers,
    // });
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

  const createGroupChatWithAvatar = (avatar) => {
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
      avatar: avatar,
      messageList: [],
      userGroupList: [],
    };

    //Api
    createGroupChat(room);

    //Reload page
    exitModal();
    setNameInput("");
    setLoading(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    if (props.openModal === true) {
      // Get avatar link from aws s3
      if (avatarUrl) {
        const formData = new FormData();
        formData.append("file", avatarUrl);

        actions
          .uploadAvatar(formData)
          .then((response) => {
            createGroupChatWithAvatar(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        createGroupChatWithAvatar(null);
      }
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
      onClose={exitModal}
      closeAfterTransition
    >
      <Fade in={props.openModal}>
        <div className={classes.paper}>
          {/* Group chat information */}
          <div className={classes.info}>
            {/* button cancel */}
            <div className={classes.cancel}>
              <IconButton aria-label="delete" onClick={exitModal}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>

            {/* Create new group */}
            <h3 id="transition-modal-title">Tạo nhóm mới</h3>
            <form className={classes["form-control"]} onSubmit={submitHandler}>
              <hr />

              {/* Avatar */}
              <div className={classes["avatar"]}>
                <Avatar
                  alt="Avatar"
                  className={classes.image}
                  src={avatarUrl ? URL.createObjectURL(avatarUrl) : "dummy.js"}
                />

                <div className={classes["button-upload"]}>
                  {/* upload image */}
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={getAvatarUrl}
                  />
                  <label htmlFor="icon-button-file">
                    <Button variant="outlined" component="span" size="small">
                      Upload
                    </Button>
                  </label>

                  {/* remove image */}
                  <Button
                    component="span"
                    size="small"
                    onClick={removeAvatarUrl}
                  >
                    Xóa
                  </Button>
                </div>
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
                onCloseModal={exitModal}
              />
            </form>
          </div>

          {/* Loading spinner */}
          {loading && <Spinner />}
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalAddGroup;
