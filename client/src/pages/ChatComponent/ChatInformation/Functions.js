import React, { Fragment, useState, useRef, useEffect } from "react";

import classes from "./Functions.module.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Alert from "./alert/alert";
import { deleteUserGroup } from "src/actions/usergroup.action";
import { deleteRoomChat, updateCreator } from "src/actions/roomchat.action";
import { io } from "socket.io-client";
import { SOCKET_URL } from "src/services/api.service";

const URL = SOCKET_URL;

const Functions = (props) => {
  const [open, setOpen] = useState(false);
  const [contentAlert, setContentAlert] = useState({});
  const socket = useRef();
  const userId = localStorage.getItem("user_authenticated");

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeAdmin = (roomId, members, creator) => {
    const newMembers = members.filter((member) => member.id !== creator);
    const newCreator = newMembers[0].id;

    // console.log(newMembers, newCreator, creator);
    updateCreator(roomId, newCreator);

    return newCreator;
  };

  const removeGroupChat = () => {
    deleteRoomChat(props.roomId)
      .then((response) => {
        console.log("remove");
        props.onNeedLoad(props.roomId);
        props.onSetActiveRoomNull();

        socket.current.emit("deletedRoom", {
          roomId: props.roomId,
          members: props.members.filter((mem) => mem.id !== Number(userId)),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const outGroupChat = () => {
    let newCreator = null;
    if (props.members.length <= 1) {
      removeGroupChat();
    } else {
      if (Number(userId) === props.creator) {
        newCreator = changeAdmin(props.roomId, props.members, props.creator);
      }

      deleteUserGroup(props.roomId, userId)
        .then((response) => {
          props.onNeedLoad(props.roomId);
          props.onSetActiveRoomNull();
          console.log("out");

          socket.current.emit("memberOutRoom", {
            memberId: userId,
            roomId: props.roomId,
            newCreator: newCreator,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const setRemoveGroupContent = () => {
    const content = {
      title: "Bạn có chắc muốn xóa nhóm chat?",
      function: removeGroupChat,
    };
    setContentAlert(content);

    handleClickOpen();
  };

  const setOutGroupContent = () => {
    const content = {
      title: "Bạn có chắc muốn rởi khỏi nhóm chat?",
      function: outGroupChat,
    };
    setContentAlert(content);

    handleClickOpen();
  };

  return (
    <Fragment>
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem button onClick={props.onClickSetting}>
          <ListItemText primary="Cài đặt khác" />
          {props.openSetting ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={props.openSetting} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {Number(userId) === props.creator && (
              <ListItem
                button
                className={classes.textcolor}
                onClick={setRemoveGroupContent}
              >
                <ListItemIcon>
                  <DeleteOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Xóa nhóm" />
              </ListItem>
            )}

            <ListItem
              button
              className={classes.textcolor}
              onClick={setOutGroupContent}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Rời nhóm" color="secondary" />
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Alert open={open} onClose={handleClose} content={contentAlert} />
    </Fragment>
  );
};

export default Functions;
