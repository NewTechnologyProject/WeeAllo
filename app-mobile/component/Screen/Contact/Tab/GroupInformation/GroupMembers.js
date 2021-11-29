import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, ListItem, Avatar, BottomSheet } from "react-native-elements";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { deleteUserGroup } from "../../../../../action/usergroup.action";
import { fetchAllMembers } from "../../../../../action/roomchat.action";
import Alert from "./Alert";
import { Header } from "react-native-elements/dist/header/Header";

const GroupMembers = ({ navigation }) => {
  const userId = "1";
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [func, setFunc] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const listMembers = useSelector((state) => state.roomchat.listMembers);
  const activeRoom = useSelector((state) => state.roomchat.activeRoom);
  const dispatch = useDispatch();

  const toggleOverlay = (item) => {
    setVisible(!visible);
    setFunc(item);
  };

  const backToGroupInformation = () => {
    navigation.navigate("GroupInformation");
  };

  const toAddMember = () => {
    navigation.navigate("AddMember");
  };

  const onPressBottomSheet = (id) => {
    setMemberId(id);
    setOpen(true);
  };

  const onCloseBottomSheet = () => {
    setOpen(false);
  };

  const removeMember = (memberId) => {
    deleteUserGroup(activeRoom.id, memberId)
      .then((response) => {
        dispatch(fetchAllMembers(activeRoom.id));
        setOpen(false);
        setVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Alert
        visible={visible}
        toggleOverlay={toggleOverlay}
        func={func}
        memberId={memberId}
      />

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

      <TouchableOpacity onPress={toAddMember}>
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
      </TouchableOpacity>

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
                  <TouchableOpacity
                    onPress={
                      activeRoom.creator !== item.item.id &&
                      Number(userId) === activeRoom.creator
                        ? onPressBottomSheet.bind(this, item.item.id)
                        : () => {}
                    }
                  >
                    <ListItem key={item.index}>
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
                          activeRoom.creator === item.item.id
                            ? "Trưởng nhóm"
                            : ""
                        }`}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </View>

      <BottomSheet isVisible={open}>
        <ListItem
          onPress={toggleOverlay.bind(this, { key: 3, function: removeMember })}
        >
          <ListItem.Content>
            <ListItem.Title style={{ color: "#e03131" }}>
              Mời ra nhóm
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        {/* Cancel */}
        <ListItem onPress={onCloseBottomSheet}>
          <ListItem.Content>
            <ListItem.Title style={{ color: "#868e96" }}>Cancel</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
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
