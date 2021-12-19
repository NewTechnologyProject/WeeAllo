import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../../action/user.action";
import { fetchAllMembersToGetName } from "../../../../action/roomchat.action";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { ListItem, Avatar } from "react-native-elements";
import { SOCKET_URL } from "../../../../services/api.service";
import { io } from "socket.io-client";

const URL = SOCKET_URL;

const styles = StyleSheet.create({
  container: {},
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default function ContactGroupList({ navigation, route }) {
  const [listRooms, setListRooms] = useState([]);
  const socket = useRef();

  // const userId = "1";
  const userId = useSelector((state) => state.user.userAuth);
  const rooms = useSelector((state) => state.user.listRooms);
  const dispatch = useDispatch();

  const loadRoomsHandler = useCallback(() => {
    dispatch(actions.fetchAllRoom(userId));
  }, [userId, actions.fetchAllRoom]);

  useEffect(() => {
    loadRoomsHandler();
  }, [loadRoomsHandler]);

  //Set members on room to get name
  const setListMembersOnRoom = useCallback(
    (rooms) => {
      if (rooms.length > 0) {
        rooms.map(async (room) => {
          let members = [];

          const res = await fetchAllMembersToGetName(room.id);
          const data = res.data;

          members = data;

          const newRoom = { ...room, userGroupList: members };
          setListRooms((prevState) => {
            return [...prevState, newRoom];
          });
        });
      }
    },
    [fetchAllMembersToGetName]
  );

  useEffect(() => {
    setListRooms([]);
    setListMembersOnRoom(rooms);
  }, [setListMembersOnRoom, rooms]);

  //show name depend on group members
  const showNameHandler = (roomId) => {
    let name = "Group";

    if (listRooms.length > 0) {
      const neededRoom = listRooms.find((room) => room.id === roomId);
      if (
        neededRoom &&
        neededRoom.userGroupList &&
        neededRoom.userGroupList.length > 2
      ) {
        const members = neededRoom.userGroupList.filter(
          (member) => member.id !== Number(userId)
        );
        name = `${members[0].firstname}, ${members[1].firstname},...`;
      } else if (
        neededRoom &&
        neededRoom.userGroupList &&
        neededRoom.userGroupList.length === 2
      ) {
        name =
          neededRoom.userGroupList[0].id === Number(userId)
            ? `${neededRoom.userGroupList[1].firstname} ${neededRoom.userGroupList[1].lastname}`
            : `${neededRoom.userGroupList[0].firstname} ${neededRoom.userGroupList[0].lastname}`;
      }
    }
    return name;
  };

  const toChatContent = (room) => {
    dispatch({ type: "SET ACTIVE ROOM", payload: { ...room } });
    navigation.navigate("ChatContent", { room: room });
  };

  const toAddGroup = () => {
    navigation.navigate("AddGroup");
  };

  // ----------------------------------------------------------------------
  //Real time
  useEffect(() => {
    socket.current = io(URL);

    socket.current.on("getNewRoom", (data) => {
      let user = data.find((member) => member.id === Number(userId));
      if (user) {
        loadRoomsHandler();
      }
    });

    socket.current.on("getNewMembers", (data) => {
      const { roomId, members } = data;
      let user = members.find((member) => member.id === Number(userId));
      if (user) {
        loadRoomsHandler();
      }
    });
  }, []);

  useEffect(() => {
    let unmount = true;

    socket.current.on("getDeletedRoom", (data) => {
      const { roomId, members } = data;
      let user = members.find((member) => member.id === Number(userId));
      if (user && unmount) {
        loadRoomsHandler();
      }
    });

    socket.current.on("getRemovedMember", (data) => {
      const { roomId, memberId } = data;
      let user = memberId === Number(userId);
      if (user && unmount) {
        loadRoomsHandler();
      }
    });

    socket.current.on("getUpdatedRoom", (data) => {
      const { room, members } = data;
      let user = members.find((member) => member.id === Number(userId));
      if (user) {
        loadRoomsHandler();
      }
    });

    return () => {
      unmount = false;
    };
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", Number(userId));
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [userId]);
  // ----------------------------------------------------------------------

  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <TouchableOpacity onPress={toAddGroup}>
            <ListItem
              containerStyle={{
                marginTop: -5,
              }}
            >
              <Icon
                reverse={true}
                reverseColor="#12b886"
                name="plus"
                type="font-awesome-5"
                color="#e6fcf5"
                size={20}
              />
              <ListItem.Content>
                <ListItem.Title>{"Tạo nhóm mới"}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>

          <Text style={{ padding: 10 }}>{`Nhóm đang tham gia `}</Text>

          {rooms.map((room) => {
            if (room.creator) {
              return (
                <TouchableOpacity
                  key={room.id}
                  onPress={toChatContent.bind(this, room)}
                >
                  <ListItem.Swipeable>
                    <Avatar
                      rounded
                      size={50}
                      icon={{ name: "users", type: "font-awesome" }}
                      source={{
                        uri: `${room.avatar ? room.avatar : "dummy.js"}`,
                      }}
                    />
                    <ListItem.Content>
                      <ListItem.Title>
                        {room.roomName
                          ? room.roomName
                          : showNameHandler(room.id)}
                      </ListItem.Title>
                    </ListItem.Content>
                    <Icon
                      name="comment-dots"
                      type="font-awesome-5"
                      color="gray"
                      size={20}
                    />
                  </ListItem.Swipeable>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </View>
    </View>
  );
}
