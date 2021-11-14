import React from "react";

import classes from "./ChosenMember.module.css";
import CancelIcon from "@material-ui/icons/Cancel";
import Scrollbar from "src/components/Scrollbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const ChosenMember = (props) => {
  return (
    <div className={classes["choose-member"]}>
      <div className={classes.amount}>
        Đã thêm: <strong>{`${props.chosenMembers.length}`}</strong>{" "}
      </div>

      <Scrollbar
        sx={{
          height: "100%",
        }}
      >
        <List dense>
          {props.chosenMembers &&
            props.chosenMembers.map((member) => {
              return (
                <ListItem key={member.id}>
                  <ListItemAvatar>
                    <Avatar
                      className={classes["avatar-size-small"]}
                      alt={member.firstname}
                      src={"dummy.js"}
                    ></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${member.firstname} ${member.lastname}`} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="delete"
                      onClick={props.onDeleteMember.bind(null, member)}
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>
      </Scrollbar>
    </div>
  );
};

export default ChosenMember;
