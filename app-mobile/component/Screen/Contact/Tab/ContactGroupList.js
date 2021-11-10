import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../../action/user.action";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { ListItem, Avatar } from "react-native-elements";

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

export default function ContactGroupList({ navigation }) {
  const userId = "2";
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

  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
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
          <Text
            style={{ padding: 10 }}
          >{`Nhóm đang tham gia (${listRooms.length})`}</Text>

          {listRooms.map((room) => {
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
                      <ListItem.Title>{room.roomName}</ListItem.Title>
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
