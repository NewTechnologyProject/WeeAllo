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
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";

export default function Chat({ navigation }) {
  const [textSearch, setTextSearch] = useState("");
  const [open, setOpen] = useState(false);

  const userId = "1";
  const dispatch = useDispatch();
  const listRooms = useSelector((state) => state.user.listRooms);

  const loadRoomsHandler = useCallback(() => {
    dispatch(actions.fetchAllRoom(userId));
  }, [userId, actions.fetchAllRoom]);

  useEffect(() => {
    loadRoomsHandler();
  }, [loadRoomsHandler]);

  const toChatContent = (room) => {
    dispatch({ type: "SET ACTIVE ROOM", payload: { ...room } });
    navigation.navigate("ChatContent");
  };

  const updateSearch = (search) => {
    setTextSearch(search);
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
          data={listRooms}
          renderItem={(item) => (
            <TouchableOpacity>
              <ListItem onPress={toChatContent.bind(this, item.item)}>
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
                    {item.item.roomName ? item.item.roomName : "room"}
                  </ListItem.Title>
                  <ListItem.Subtitle>{item.item.roomName}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Button add */}
      <SpeedDial
        isOpen={open}
        icon={{ name: "add", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        color={"#37b24d"}
        style={styles.btnAdd}
      >
        <SpeedDial.Action
          color={"#37b24d"}
          icon={
            <Icon
              name="user-plus"
              type="font-awesome-5"
              color="#ffffff"
              size={15}
            />
          }
          title="Thêm bạn bè"
          onPress={() => console.log("Add Something")}
        />
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
          onPress={() => console.log("Delete Something")}
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
