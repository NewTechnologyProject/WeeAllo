import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Scrollbar from "src/components/Scrollbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { fetchAllMembers } from "src/actions/roomchat.action";
import { set } from "lodash";
// import { makeStyles } from "@material-ui/core/styles";
// import ImageIcon from "@material-ui/icons/Image";
// import WorkIcon from "@material-ui/icons/Work";
// import BeachAccessIcon from "@material-ui/icons/BeachAccess";

// const SORT_OPTIONS = [
//   { value: "latest", label: "Latest" },
//   { value: "popular", label: "Popular" },
//   { value: "oldest", label: "Oldest" },
// ];

// ----------------------------------------------------------------------

export default function ListFriendChat(props) {
  const userId = localStorage.getItem("user_authenticated");
  const [listRooms, setListRooms] = useState([]);

  const setListMembersOnRoom = useCallback(
    (rooms) => {
      if (rooms.length > 0) {
        rooms.map(async (room) => {
          let members = [];

          const res = await fetchAllMembers(room.id);
          const data = res.data;

          members = data;

          const newRoom = { ...room, userGroupList: members };
          setListRooms((prevState) => {
            return [...prevState, newRoom];
          });
        });
      }
    },
    [fetchAllMembers]
  );

  useEffect(() => {
    setListMembersOnRoom(props.listRooms);
  }, [setListMembersOnRoom, props.listRooms]);

  const showNameHandler = (roomId) => {
    let name = "Group";

    if (listRooms.length > 0) {
      const neededRoom = listRooms.find((room) => room.id === roomId);
      if (neededRoom && neededRoom.userGroupList.length > 2) {
        const members = neededRoom.userGroupList.filter(
          (member) => member.id !== Number(userId)
        );
        name = `${members[0].firstname}, ${members[1].firstname},...`;
      } else if (neededRoom && neededRoom.userGroupList.length === 2) {
        //Chat one to one
      }
    }
    return name;
  };

  const getMembersByRoomId = (roomId) => {
    const neededRoom = listRooms.find((room) => room.id === roomId);
    let members = [];
    if (neededRoom && neededRoom.userGroupList.length > 0) {
      members = neededRoom.userGroupList;
    }

    return members;
  };

  return (
    <Scrollbar
      sx={{
        height: "100%",
      }}
    >
      <List>
        {props.listRooms &&
          props.listRooms.map((room) => {
            let name = room.roomName;
            if (!name) {
              name = showNameHandler(room.id);
            }
            return (
              <ListItem
                button
                key={room.id}
                onClick={props.getActiveRoom.bind(
                  null,
                  room,
                  name,
                  getMembersByRoomId(room.id)
                )}
                selected={props.activeRoom && room.id === props.activeRoom.id}
              >
                <ListItemAvatar>
                  <Avatar alt={name} src={"dummy.js"}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={room.createAt} />
              </ListItem>
            );
          })}
      </List>
    </Scrollbar>
  );
}
