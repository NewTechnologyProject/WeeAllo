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
  FlatList,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  Alert,
} from "react-native";

import { Header } from "react-native-elements/dist/header/Header";

const GroupMembers = ({ navigation }) => {
  const listMembers = useSelector((state) => state.roomchat.listMembers);
  const activeRoom = useSelector((state) => state.roomchat.activeRoom);

  const backToGroupInformation = () => {
    navigation.navigate("GroupInformation");
  };

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        centerComponent={{
          text: "Thành viên nhóm",
          style: { color: "#fff" },
        }}
        leftComponent={
          <TouchableOpacity onPress={backToGroupInformation}>
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
          <ListItem.Title>{"Thêm thành viên"}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <Text
        style={{ padding: 10 }}
      >{`Thành viên (${listMembers.length})`}</Text>

      <View style={styles.members}>
        {!listMembers ||
          (listMembers.length <= 0 && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>Chưa có thành viên</Text>
            </View>
          ))}

        {listMembers && listMembers.length > 0 && (
          <View>
            <FlatList
              data={listMembers}
              renderItem={(item) => {
                return (
                  <ListItem.Swipeable key={item.index}>
                    <Avatar
                      rounded
                      icon={{ name: "user", type: "font-awesome" }}
                      size={50}
                      source={{
                        uri: `${
                          item.item.avatar ? item.item.avatar : "dummy.js"
                        }`,
                      }}
                    />
                    <ListItem.Content>
                      <ListItem.Title>{`${item.item.firstname} ${item.item.lastname}`}</ListItem.Title>
                      <ListItem.Subtitle>{`${
                        activeRoom.creator === item.item.id ? "Trưởng nhóm" : ""
                      }`}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Icon
                      name="comment-dots"
                      type="font-awesome-5"
                      color="gray"
                      size={20}
                    />
                  </ListItem.Swipeable>
                );
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  members: {
    flex: 1,
    backgroundColor: "white",
  },
  textContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
    color: "#adb5bd",
  },
});

export default GroupMembers;
