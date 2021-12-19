import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actionuser from "src/actions/customer.action";
import classes from "./ModalAddMember.module.css";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ChoosingMember from "./ChoosingMember";
import { addUserGroup } from "src/actions/usergroup.action";
import { io } from "socket.io-client";
import { SOCKET_URL } from "src/services/api.service";

const URL = SOCKET_URL;

const ModalAddMember = (props) => {
  const [keyWord, setKeyWord] = useState("");
  const [loading, setLoading] = useState(false);
  const socket = useRef();

  const dispatch = useDispatch();
  const userId = localStorage.getItem("user_authenticated");
  const profile = useSelector((state) => state.customer.userById);
  let listMembers = [];

  useEffect(() => {
    dispatch(actionuser.findByIdUser(userId));
  }, []);

  const getChosenMembersHandler = (chosenMembers) => {
    listMembers = chosenMembers;
  };

  const searchFriendFilter = (event) => {
    setKeyWord(event.target.value);
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
        userAdd: {
          id: Number(userId),
          firstname: profile.firstname,
          lastname: profile.lastname,
        },
      };

      addUserGroup(userGroup)
        .then((response) => {
          console.log("Add usergroup successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (props.openModal) {
      createUserGroup(props.activeRoomId, listMembers);
      props.onNeedLoad(listMembers);
      props.onCloseModal();

      socket.current.emit("newMembers", {
        members: listMembers,
        roomId: props.activeRoomId,
      });
    }
  };

  // ----------------------------------------------------------------------
  //Real time
  useEffect(() => {
    socket.current = io(URL);
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", Number(userId));
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [userId]);
  // ----------------------------------------------------------------------

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.openModal}
      onClose={props.onCloseModal}
      closeAfterTransition
    >
      <Fade in={props.openModal}>
        <div className={classes.paper}>
          {/* Group chat information */}
          <div className={classes.info}>
            {/* button cancel */}
            <div className={classes.cancel}>
              <IconButton aria-label="delete" onClick={props.onCloseModal}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>

            <h3 id="transition-modal-title">Thêm thành viên</h3>
            <form className={classes["form-control"]} onSubmit={submitHandler}>
              <hr />

              {/* Add members */}
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
                addedMembers={props.members}
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

export default ModalAddMember;
