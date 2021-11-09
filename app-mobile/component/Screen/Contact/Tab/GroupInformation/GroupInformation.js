import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BottomSheet,
  Icon,
  Input,
  ListItem,
  Avatar,
  Badge,
} from "react-native-elements";
import {
  ScrollView,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  Alert,
} from "react-native";

import { fetchAllMembers } from "../../../../../action/roomchat.action";
import { Header } from "react-native-elements/dist/header/Header";

const GroupInformation = ({ navigation }) => {
  const activeRoom = useSelector((state) => state.roomchat.activeRoom);
  const dispatch = useDispatch();
  const listMembers = useSelector((state) => state.roomchat.listMembers);
  const userId = "2";

  useEffect(() => {
    dispatch(fetchAllMembers(activeRoom.id));
  }, [fetchAllMembers, activeRoom.id]);

  const backToChatContent = () => {
    navigation.navigate("ChatContent");
  };

  const toGroupMembers = () => {
    navigation.navigate("GroupMembers");
  };

  const toGroupMedia = () => {
    navigation.navigate("GroupMedia");
  };

  const list = [
    {
      title: `Thành viên (${listMembers.length})`,
      icon: "users",
      function: toGroupMembers,
    },
    {
      title: "Hình ảnh/Video",
      icon: "image",
      function: toGroupMedia,
    },
    {
      title: " Tập tin",
      icon: "file",
    },
    {
      title: " Cài đặt khác",
      icon: "cog",
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        centerComponent={{
          text: "Thông tin nhóm chat",
          style: { color: "#fff" },
        }}
        leftComponent={
          <TouchableOpacity onPress={backToChatContent}>
            <Icon
              name="chevron-left"
              type="font-awesome-5"
              color={"white"}
              size={25}
            />
          </TouchableOpacity>
        }
        containerStyle={{
          backgroundColor: "#37b24d",
          justifyContent: "space-around",
        }}
      />
      <View style={styles.content}>
        <View style={styles.image}>
          <Avatar
            rounded
            size={100}
            icon={{ name: "user", type: "font-awesome" }}
            source={{
              uri: `${activeRoom.avatar ? activeRoom.avatar : "dummy.js"}`,
            }}
            activeOpacity={0.7}
            containerStyle={{ backgroundColor: "gray" }}
          />
        </View>
        <View>
          <Text style={styles.text}>{activeRoom.roomName}</Text>
        </View>

        <View style={styles.options}>
          {list.map((item, i) => {
            if (!activeRoom.creator) {
              if (item.icon === "users" || item.icon === "cog") {
                return;
              }
            }

            return (
              <TouchableOpacity key={i} onPress={item.function}>
                <ListItem bottomDivider>
                  <Icon
                    name={item.icon}
                    type={"font-awesome"}
                    color="#868e96"
                  />
                  <ListItem.Content>
                    <ListItem.Title style={{ color: "#495057" }}>
                      {item.title}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
  image: {
    marginBottom: 20,
  },
  text: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 30,
  },
  options: {
    width: "100%",
  },
});

export default GroupInformation;
