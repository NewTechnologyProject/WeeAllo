import React from "react";

import classes from "./ListFriendsSearch.module.css";
import Scrollbar from "src/components/Scrollbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";

const ListFriendSearch = (props) => {
  return (
    <div className={classes["current-friends"]}>
      <Scrollbar
        sx={{
          height: "100%",
        }}
      >
        <List dense>
          {props.listFriends &&
            props.listFriends.map((friend) => {
              return (
                <ListItem className={classes.listItem} key={friend.id}>
                  <ListItemAvatar>
                    <Avatar
                      className={classes["avatar-size-small"]}
                      alt={friend.firstname}
                      src={"dummy.js"}
                    ></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={friend.firstname} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={props.onCheckMember}
                      value={friend.id}
                      checked={friend.checked}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>
      </Scrollbar>
    </div>
  );
};

export default ListFriendSearch;
