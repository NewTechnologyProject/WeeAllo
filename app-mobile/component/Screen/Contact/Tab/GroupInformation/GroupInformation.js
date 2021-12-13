import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, ListItem, Avatar, Overlay } from "react-native-elements";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Touchable,
} from "react-native";

import {
  fetchAllMembers,
  updateCreator,
  deleteRoomChat,
  fetchAllMembersWithUserAdd,
} from "../../../../../action/roomchat.action";
import { deleteUserGroup } from "../../../../../action/usergroup.action";
import { Header } from "react-native-elements/dist/header/Header";
import Alert from "./Alert";

const GroupInformation = ({ navigation, route }) => {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [func, setFunc] = useState(null);

  const dispatch = useDispatch();
  const activeRoom = useSelector((state) => state.roomchat.activeRoom);
  const listMembers = useSelector((state) => state.roomchat.listMembers);
  // const userId = "1";
  const userId = useSelector((state) => state.user.userAuth);

  useEffect(() => {
    dispatch(fetchAllMembers(activeRoom.id));

    dispatch(fetchAllMembersWithUserAdd(activeRoom.id));
  }, [fetchAllMembers, activeRoom.id, route.params]);

  const toggleOverlay = (item) => {
    setVisible(!visible);
    setFunc(item);
  };

  const backToChatContent = () => {
    navigation.navigate("ChatContent");
  };

  const toGroupMembers = () => {
    navigation.navigate("GroupMembers");
  };

  const toGroupMedia = () => {
    navigation.navigate("GroupMedia");
  };

  const toGroupFile = () => {
    navigation.navigate("GroupFile");
  };

  const backToChat = () => {
    navigation.navigate("TabRoute", {
      screen: "Tin Nhắn",
      params: {
        content: "Load room",
        deletedRoom: activeRoom,
      },
    });
  };

  const showNameHandler = () => {
    let name = "Group";
    if (listMembers.length > 2) {
      const members = listMembers.filter(
        (member) => member.id !== Number(userId)
      );
      name = `${members[0].firstname}, ${members[1].firstname},...`;
    } else if (listMembers.length === 2) {
      name =
        listMembers[0].id === Number(userId)
          ? `${listMembers[1].firstname} ${listMembers[1].lastname}`
          : `${listMembers[0].firstname} ${listMembers[0].lastname}`;
    }

    return name;
  };

  const changeAdmin = (roomId, members, creator) => {
    const newMembers = members.filter((member) => member.id !== creator);
    const newCreator = newMembers[0].id;

    console.log(newMembers, newCreator, creator);
    updateCreator(roomId, newCreator);
  };

  const removeGroupChat = () => {
    deleteRoomChat(activeRoom.id)
      .then((response) => {
        console.log("removed");
        backToChat();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const outGroupChat = () => {
    if (listMembers.length <= 2) {
      removeGroupChat();
    } else {
      if (Number(userId) === activeRoom.creator) {
        changeAdmin(activeRoom.id, listMembers, activeRoom.creator);
      }

      deleteUserGroup(activeRoom.id, userId)
        .then((response) => {
          console.log("out");
          backToChat();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteGroup = () => {
    removeGroupChat();
  };

  const outGroup = () => {
    outGroupChat();
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
      function: toGroupFile,
    },
    {
      title: " Cài đặt khác",
      icon: "cog",
    },
  ];

  const list2 = [
    {
      key: 1,
      title: "Rời nhóm",
      icon: "sign-out",
      function: outGroup,
    },
    {
      key: 2,
      title: " Xóa nhóm",
      icon: "trash",
      function: deleteGroup,
    },
  ];

  return (
    <View style={styles.container}>
      <Alert visible={visible} toggleOverlay={toggleOverlay} func={func} />

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
          <TouchableOpacity>
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
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>
            {activeRoom.roomName ? activeRoom.roomName : showNameHandler()}
          </Text>
        </View>

        {/* options */}
        <View style={styles.options}>
          {list.map((item, i) => {
            if (!activeRoom.creator) {
              if (item.icon === "users" || item.icon === "cog") {
                return;
              }
            }

            // Setting
            if (item.icon === "cog") {
              return (
                <ListItem.Accordion
                  key={i}
                  bottomDivider
                  content={
                    <>
                      <Icon
                        name={item.icon}
                        type={"font-awesome"}
                        color="#868e96"
                        size={28}
                      />
                      <ListItem.Content>
                        <ListItem.Title
                          style={{ color: "#495057", marginLeft: 10 }}
                        >
                          {item.title}
                        </ListItem.Title>
                      </ListItem.Content>
                    </>
                  }
                  isExpanded={expanded}
                  onPress={() => {
                    setExpanded(!expanded);
                  }}
                >
                  {list2.map((ob) => {
                    if (activeRoom.creator !== Number(userId) && ob.key === 2) {
                      return;
                    }

                    return (
                      <TouchableOpacity
                        key={ob.key}
                        onPress={toggleOverlay.bind(this, ob)}
                      >
                        <ListItem bottomDivider>
                          <Icon
                            name={ob.icon}
                            type={"font-awesome"}
                            color="#c92a2a"
                            size={28}
                            style={{ marginLeft: 15 }}
                          />
                          <ListItem.Content>
                            <ListItem.Title style={{ color: "#e03131" }}>
                              {ob.title}
                            </ListItem.Title>
                          </ListItem.Content>
                        </ListItem>
                      </TouchableOpacity>
                    );
                  })}
                </ListItem.Accordion>
              );
            }

            //other options
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
  overlay: {},
});

export default GroupInformation;
