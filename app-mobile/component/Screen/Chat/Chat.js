import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  ScrollView,
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

export default function Chat({ navigation, route }) {
  const [textSearch, setTextSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [listRooms, setListRooms] = useState([]);

  const userId = "1";
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.user.listRooms);

  const loadRoomsHandler = useCallback(() => {
    dispatch(actions.fetchAllRoom(userId));
  }, [userId, actions.fetchAllRoom]);

  useEffect(() => {
    loadRoomsHandler();
  }, [loadRoomsHandler, route.params]);

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

  const toChatContent = (room, name) => {
    dispatch({ type: "SET ACTIVE ROOM", payload: { ...room } });
    navigation.navigate("ChatContent", { name: name });
  };

  const updateSearch = (search) => {
    setTextSearch(search);
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
            placeholder="Tìm bạn bè..."
            onChangeText={setTextSearch}
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
          data={rooms}
          renderItem={(item) => {
            let groupName = item.item.roomName;
            if (!item.item.roomName) {
              groupName = showNameHandler(item.item.id);
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
                      uri: `${item.item.avatar ? item.item.avatar : "dummy"}`,
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>
                      {item.item.roomName ? item.item.roomName : groupName}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      {/* {item.item.roomName ? item.item.roomName : "room"} */}
                    </ListItem.Subtitle>
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
