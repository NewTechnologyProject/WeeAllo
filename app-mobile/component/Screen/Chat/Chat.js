import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import {
  ListItem,
  Avatar,
  Icon,
  SpeedDial,
  Header,
} from "react-native-elements";

import * as actions from "../../../action/user.action";
import {
  fetchAllMembersToGetName,
  fetchAllMembers,
} from "../../../action/roomchat.action";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import { set } from "react-hook-form";
import { SOCKET_URL } from "../../../services/api.service";
import { io } from "socket.io-client";

const URL = SOCKET_URL;

export default function Chat({ navigation, route }) {
  const [textSearch, setTextSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [listRooms, setListRooms] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const socket = useRef();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  // const userId = "1";
  const userId = useSelector((state) => state.user.userAuth);
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.user.listRooms);

  const loadRoomsHandler = useCallback(() => {
    dispatch(actions.fetchAllRoom(userId));
  }, [userId, actions.fetchAllRoom]);

  useEffect(() => {
    loadRoomsHandler();
  }, [loadRoomsHandler, route.params]);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(actions.fetchAllRoom(userId));
    wait(2000).then(() => setRefreshing(false));
  }, [userId]);

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

  //show avatar depend on group members
  const showAvatarHandler = (roomId) => {
    let avatar = "dummy.js";
    if (listRooms.length > 0) {
      const neededRoom = listRooms.find((room) => room.id === roomId);

      if (
        neededRoom &&
        neededRoom.userGroupList &&
        neededRoom.userGroupList.length === 2
      ) {
        let roomAvatar =
          neededRoom.userGroupList[0].id === Number(userId)
            ? neededRoom.userGroupList[1].avartar
            : neededRoom.userGroupList[0].avartar;

        avatar = roomAvatar ? roomAvatar : "dummy.js";
      }
    }

    return avatar;
  };

  const toChatContent = (room, name) => {
    dispatch({ type: "SET ACTIVE ROOM", payload: { ...room } });
    navigation.navigate("ChatContent", { room: room });
  };

  const updateSearch = (search) => {
    setTextSearch(search);
  };

  const getFilteredRooms = (rooms, key) => {
    if (key === "") {
      return rooms;
    }
    return rooms.filter((room) => {
      if (room.roomName) {
        return room.roomName.toLowerCase().includes(key.toLowerCase());
      }
    });
  };

  const toAddGroup = () => {
    navigation.navigate("AddGroup");
  };

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: "dark-content" }}
        barStyle="dark-content"
        style={styles.header}
        centerComponent={
          <SearchBar
            platform="default"
            cancelButtonTitle=""
            placeholder="Tìm kIếm ..."
            onChangeText={updateSearch}
            value={textSearch}
            inputStyle={{
              color: "#e6fcf5",
              width: 300,
            }}
            placeholderTextColor="#e6fcf5"
            searchIcon={{ color: "#e6fcf5" }}
            clearIcon={{ color: "#e6fcf5" }}
          />
        }
        containerStyle={{
          backgroundColor: "#37b24d",
          justifyContent: "space-around",
          height: 80,
        }}
        centerContainerStyle={{
          flex: 6,
        }}
        leftContainerStyle={{
          flex: 0,
        }}
        rightContainerStyle={{
          flex: 0,
        }}
      />

      {/* List rooms */}
      <View>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={getFilteredRooms(rooms, textSearch)}
          renderItem={(item) => {
            let groupName = item.item.roomName;
            let groupAvatar = item.item.avatar;
            if (!item.item.roomName) {
              groupName = showNameHandler(item.item.id);
            }
            if (!item.item.avatar) {
              groupAvatar = showAvatarHandler(item.item.id);
            }
            return (
              <TouchableOpacity>
                <ListItem
                  onPress={toChatContent.bind(this, item.item, groupName)}
                >
                  <Avatar
                    icon={{ name: "users", type: "font-awesome" }}
                    rounded
                    size={50}
                    source={{
                      uri: `${item.item.avatar ? item.item.avatar : groupAvatar}`,
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>
                      {item.item.roomName ? item.item.roomName : groupName}
                    </ListItem.Title>
                    <ListItem.Subtitle>{item.item.createAt}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Button add */}
      <SpeedDial
        isOpen={open}
        icon={{ name: "add", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        color={"#37b24d"}
        style={styles.btnAdd}
      >
        <SpeedDial.Action
          color={"#37b24d"}
          icon={
            <Icon
              name="users"
              type="font-awesome-5"
              color="#ffffff"
              size={15}
            />
          }
          title="Thêm nhóm chat"
          onPress={() => toAddGroup()}
        />
      </SpeedDial>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
  },
  btnAdd: { position: "absolute", bottom: 0, right: 0 },
  avatar: {
    borderRadius: 1,
  },
  search: {
    backgroundColor: "#37b24d",
  },
});
