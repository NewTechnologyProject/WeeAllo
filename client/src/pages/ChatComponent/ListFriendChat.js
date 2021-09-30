import Scrollbar from "src/components/Scrollbar";
// ----------------------------------------------------------------------
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------

export default function ListFriendChat(props) {
  return (
    <Scrollbar
      sx={{
        height: "100%",
      }}
    >
      <List>
        {props.listRooms &&
          props.listRooms.map((room) => (
            <ListItem
              key={room.id}
              onClick={props.getActiveRoom.bind(null, room)}
            >
              <ListItemAvatar>
                <Avatar>K</Avatar>
              </ListItemAvatar>
              <ListItemText primary={room.roomName} secondary={room.createAt} />
            </ListItem>
          ))}
      </List>
    </Scrollbar>
  );
}
