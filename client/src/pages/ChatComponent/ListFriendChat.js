import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Scrollbar from "src/components/Scrollbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { fetchAllMembers } from "src/actions/roomchat.action";

export default function ListFriendChat(props) {
  const [listRooms, setListRooms] = useState([]);
  const userId = localStorage.getItem("user_authenticated");

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

  useEffect(() => {
    let room = props.updatedRoom;
    if (room) {
      let name = room.roomName;
      if (!name) {
        name = showNameHandler(room.id);
      }

      let neededRoom = props.listRooms.find((r) => r.id === room.id);

      if (neededRoom.roomName !== room.roomName) {
        neededRoom = { ...neededRoom, roomName: room.roomName };
      }
      if (neededRoom.avatar !== room.avatar) {
        neededRoom = { ...neededRoom, avatar: room.avatar };
      }

      props.getActiveRoom(room, name);
    }
  }, [props.updatedRoom]);

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
        name =
          neededRoom.userGroupList[0].id === Number(userId)
            ? `${neededRoom.userGroupList[1].firstname} ${neededRoom.userGroupList[1].lastname}`
            : `${neededRoom.userGroupList[0].firstname} ${neededRoom.userGroupList[0].lastname}`;
      }
    }
    return name;
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
                onClick={props.getActiveRoom.bind(null, room, name)}
                selected={props.activeRoom && room.id === props.activeRoom.id}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={name}
                    src={room.avatar ? room.avatar : "dummy.js"}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={name}
                  secondary={room.createAt}
                  primaryTypographyProps={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                />
              </ListItem>
            );
          })}
      </List>
    </Scrollbar>
  );
}
