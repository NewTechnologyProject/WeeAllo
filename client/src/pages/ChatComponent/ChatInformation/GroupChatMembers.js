import React, { useState, Fragment, useCallback, useEffect } from "react";

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
import classes from "./GroupChatMembers.module.css";

const GroupChatMember = (props) => {
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
          {props.members &&
            props.members.map((user) => {
              return (
                <ListItem button key={user.id}>
                  <ListItemIcon>
                    <Avatar
                      alt={user.firstname}
                      src="dummy.js"
                      className={classes["avatar-size-small"]}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes["primary-text"],
                      secondary: classes["secondary-text"],
                    }}
                    primary={user.firstname}
                    secondary={user.id === props.creator ? "Trưởng nhóm" : ""}
                  />
                </ListItem>
              );
            })}
        </List>
      </Collapse>
    </List>
  );
};

export default GroupChatMember;
