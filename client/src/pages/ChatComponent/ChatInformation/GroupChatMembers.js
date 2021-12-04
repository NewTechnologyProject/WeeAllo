import React, { useState, Fragment, useCallback, useEffect } from "react";

import { deleteUserGroup } from "src/actions/usergroup.action";
import Alert from "./alert/alert";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { Avatar } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Popper from "@material-ui/core/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import classes from "./GroupChatMembers.module.css";

const GroupChatMember = (props) => {
  const [open, setOpen] = useState(false);
  const [memberId, setMemberId] = useState(null);

  const userId = localStorage.getItem("user_authenticated");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeMember = (memberId) => {
    deleteUserGroup(props.roomId, memberId)
      .then((response) => {
        props.onNeedLoad(memberId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showRemoveAlert = (id) => {
    handleClickOpen();
    setMemberId(id);
  };

  const contentRemove = {
    title: "Bạn có chắc muốn mời thành viên này ra khỏi nhóm chat?",
    function: removeMember,
  };

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem button onClick={props.handleClick}>
        <ListItemText
          primary={`Thành viên nhóm: ${
            props.members && props.members.length > 0 ? props.members.length : 0
          }`}
        />
        {props.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={props.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Button add new members */}
          {props.members && props.members.length > 0 && (
            <ListItem className={classes["button-add-member"]}>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={props.onOpenModal}
                startIcon={<AddIcon />}
              >
                Thêm thành viên
              </Button>
            </ListItem>
          )}

          {/* List members */}
          {props.membersWithUserAdd &&
            props.membersWithUserAdd.map((ug) => {
              let userAddName = "";
              if (ug.userAdd) {
                userAddName = `${ug.userAdd.firstname} ${ug.userAdd.lastname}`;
              }

              return (
                <ListItem button key={ug.userId.id}>
                  <ListItemIcon>
                    <Avatar
                      alt={ug.userId.firstname}
                      src="dummy.js"
                      className={classes["avatar-size-small"]}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes["primary-text"],
                      secondary: classes["secondary-text"],
                    }}
                    primary={`${ug.userId.firstname} ${ug.userId.lastname}`}
                    secondary={
                      ug.userId.id === props.creator
                        ? "Trưởng nhóm"
                        : `Thêm bởi ${userAddName}`
                    }
                  />

                  {/* Actions */}
                  {!(ug.userId.id === props.creator) &&
                    Number(userId) === props.creator && (
                      <ListItemSecondaryAction>
                        <PopupState
                          variant="popper"
                          popupId="demo-popup-popper"
                        >
                          {(popupState) => (
                            <Fragment>
                              <IconButton {...bindToggle(popupState)}>
                                <MoreVertIcon fontSize="small" />
                              </IconButton>

                              <Popper
                                {...bindPopper(popupState)}
                                transition
                                placement="bottom-end"
                              >
                                {({ TransitionProps }) => (
                                  <Fade {...TransitionProps} timeout={100}>
                                    <Paper>
                                      <List
                                        component="div"
                                        disablePadding
                                        className={classes["choice-titles"]}
                                      >
                                        <ListItem
                                          className={classes["choice-title"]}
                                          button
                                          onClick={showRemoveAlert.bind(
                                            this,
                                            ug.userId.id
                                          )}
                                        >
                                          <ListItemText
                                            primary="Mời ra nhóm"
                                            primaryTypographyProps={{
                                              fontSize: 14,
                                            }}
                                          />
                                        </ListItem>
                                      </List>
                                    </Paper>
                                  </Fade>
                                )}
                              </Popper>
                            </Fragment>
                          )}
                        </PopupState>
                      </ListItemSecondaryAction>
                    )}
                </ListItem>
              );
            })}
        </List>
        <Alert
          open={open}
          onClose={handleClose}
          content={contentRemove}
          memberId={memberId}
        />
      </Collapse>
    </List>
  );
};

export default GroupChatMember;
