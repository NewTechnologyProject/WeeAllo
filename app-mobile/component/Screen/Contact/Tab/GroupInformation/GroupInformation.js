import React, { useState, useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, ListItem, Avatar, Input, Button } from "react-native-elements";
import { TouchableOpacity, View, StyleSheet } from "react-native";

import {
  fetchAllMembers,
  updateCreator,
  deleteRoomChat,
  fetchAllMembersWithUserAdd,
  uploadAvatar,
  updateInfo,
} from "../../../../../action/roomchat.action";
import { fetchAllRoom } from "../../../../../action/user.action";
import { deleteUserGroup } from "../../../../../action/usergroup.action";
import { Header } from "react-native-elements/dist/header/Header";
import Alert from "./Alert";
import Spinner from "react-native-loading-spinner-overlay";
import { color } from "react-native-elements/dist/helpers";
import UpdateAvatar from "./UpdateAvatar";
import { SOCKET_URL } from "../../../../../services/api.service";
import { io } from "socket.io-client";

const URL = SOCKET_URL;

const GroupInformation = ({ navigation, route }) => {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [func, setFunc] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomAvatar, setRoomAvatar] = useState(null);
  const [open, setOpen] = useState(false);
  const [outMember, setOutMember] = useState(null);
  const [newMembers, setNewMembers] = useState(null);
  const [helperText, setHelperText] = useState({ error: false, text: "" });
  const socket = useRef();

  const dispatch = useDispatch();
  const activeRoom = useSelector((state) => state.roomchat.activeRoom);
  const listMembers = useSelector((state) => state.roomchat.listMembers);
  // const userId = "1";
  const userId = useSelector((state) => state.user.userAuth);

  useEffect(() => {
    dispatch(fetchAllMembers(activeRoom.id));
    dispatch(fetchAllMembersWithUserAdd(activeRoom.id));
  }, [fetchAllMembers, activeRoom.id, route.params]);

  // ----------------------------------------------------------------------
  //Real time
  useEffect(() => {
    let unmount = true;

    socket.current = io(URL);

    socket.current.on("getMemberOutRoom", (data) => {
      if (unmount) {
        setOutMember(data);
      }
    });

    socket.current.on("getNewMembers", (data) => {
      const { roomId, members } = data;
      if (unmount) {
        setNewMembers(data);
      }
    });

    return () => {
      unmount = false;
    };
  }, []);

  useEffect(() => {
    let unmount = true;

    socket.current.on("getDeletedRoom", (data) => {
      const { roomId, members } = data;
      let user = members.find((member) => member.id === Number(userId));
      if (user && unmount) {
        navigation.navigate("TabRoute", {
          screen: "Tin Nhắn",
        });
      }
    });

    socket.current.on("getRemovedMember", (data) => {
      const { roomId, memberId } = data;
      let user = memberId === Number(userId);
      if (user && unmount) {
        navigation.navigate("TabRoute", {
          screen: "Tin Nhắn",
        });
      }
    });

    socket.current.on("getUpdatedRoom", (data) => {
      const { room, members } = data;
      let user = members.find((member) => member.id === Number(userId));
      if (user && unmount && room.id === activeRoom.id) {
        dispatch({ type: "SET ACTIVE ROOM", payload: { ...room } });
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

  useEffect(() => {
    if (outMember && activeRoom) {
      if (outMember.roomId === activeRoom.id) {
        dispatch(fetchAllMembers(activeRoom.id));
        dispatch(fetchAllMembersWithUserAdd(activeRoom.id));

        if (outMember.newCreator) {
          dispatch({
            type: "SET ACTIVE ROOM",
            payload: { ...activeRoom, creator: outMember.newCreator },
          });
        }
      }
    }
  }, [outMember]);

  useEffect(() => {
    if (newMembers && activeRoom) {
      if (newMembers.roomId === activeRoom.id) {
        dispatch(fetchAllMembers(activeRoom.id));
        dispatch(fetchAllMembersWithUserAdd(activeRoom.id));
      }
    }
  }, [newMembers]);

  const toggleOverlay = (item) => {
    setVisible(!visible);
    setFunc(item);
  };

  const getRoomAvatar = (avatar) => {
    setRoomAvatar(avatar);
  };

  const getRoomName = (input) => {
    const name = input;
    const regex = new RegExp("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$");
    if (name.length === 0 || !name) {
      setHelperText({ error: false, text: " " });
    } else if (name.length >= 18) {
      setHelperText({ error: true, text: "Tên phải bé hơn 18 kí tự" });
    } else if (!regex.test(name)) {
      setHelperText({
        error: true,
        text: "Tên không hợp lệ",
      });
    } else {
      setHelperText({ error: false, text: " " });
    }
    setRoomName(name);
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

    return newCreator;
  };

  const removeGroupChat = () => {
    deleteRoomChat(activeRoom.id)
      .then((response) => {
        console.log("removed");

        socket.current.emit("deletedRoom", {
          roomId: activeRoom.id,
          members: listMembers.filter((mem) => mem.id !== Number(userId)),
        });

        backToChat();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const outGroupChat = () => {
    let newCreator = null;
    if (listMembers.length <= 1) {
      removeGroupChat();
    } else {
      if (Number(userId) === activeRoom.creator) {
        newCreator = changeAdmin(
          activeRoom.id,
          listMembers,
          activeRoom.creator
        );
      }

      deleteUserGroup(activeRoom.id, userId)
        .then((response) => {
          console.log("out");

          socket.current.emit("memberOutRoom", {
            memberId: userId,
            roomId: activeRoom.id,
            newCreator: newCreator,
          });

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

  useEffect(() => {
    setRoomName(activeRoom.roomName);
    setRoomAvatar(null);
  }, [activeRoom]);

  const cancelUpdate = () => {
    setRoomName(activeRoom.roomName);
    setRoomAvatar(null);
  };

  const openOverlay = () => {
    setOpen(!open);
  };

  const returnAvatar = () => {
    if (roomAvatar) {
      return roomAvatar.uri;
    }
    if (activeRoom.avatar) {
      return activeRoom.avatar;
    }
    return "dummy.js";
  };

  const updateRoom = (name, avatar) => {
    let newName = name;
    if (newName === null || newName.length <= 0) {
      newName = activeRoom.roomName;
    }

    const newRoom = {
      ...activeRoom,
      roomName: newName,
      avatar: avatar,
    };

    updateInfo(activeRoom.id, newRoom)
      .then((res) => {
        console.log("success");
        setLoading(false);

        // reload data
        dispatch({ type: "SET ACTIVE ROOM", payload: { ...newRoom } });
        dispatch(fetchAllRoom(userId));

        socket.current.emit("updatedRoom", {
          room: newRoom,
          members: listMembers.filter((mem) => mem.id !== userId),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submit = () => {
    setLoading(true);
    if (roomAvatar) {
      const formData = new FormData();
      formData.append("file", roomAvatar);

      uploadAvatar(formData)
        .then((response) => {
          // console.log(response.data);
          updateRoom(roomName, response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      updateRoom(roomName, activeRoom.avatar);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Loading..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />

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
        {activeRoom.creator && (
          <Fragment>
            <UpdateAvatar
              visible={open}
              avatar={roomAvatar}
              getAvatar={getRoomAvatar}
              toggleOverlay={openOverlay}
            />

            <View style={styles.image}>
              <TouchableOpacity>
                <Avatar
                  rounded
                  size={100}
                  icon={{ name: "user", type: "font-awesome" }}
                  source={{
                    uri: `${returnAvatar()}`,
                  }}
                  activeOpacity={0.7}
                  containerStyle={{ backgroundColor: "gray" }}
                  onPress={openOverlay}
                >
                  <Avatar.Accessory size={25} />
                </Avatar>
              </TouchableOpacity>
            </View>

            <View style={styles.input}>
              <Input
                leftIcon={{
                  type: "font-awesome",
                  name: "pencil-square-o",
                  color: "#343a40",
                }}
                onChangeText={getRoomName}
                label="Tên Nhóm"
                labelStyle={{ color: "#343a40" }}
                placeholder={showNameHandler()}
                value={roomName ? roomName : ""}
                errorMessage={helperText.text}
              />
            </View>

            <View style={styles.buttons}>
              <Button
                buttonStyle={{
                  ...styles.button,
                  backgroundColor: "#37b24d",
                  marginRight: 20,
                }}
                titleStyle={styles.buttonTitle}
                title="Cập nhật"
                disabled={helperText.error}
                onPress={submit}
              />
              <Button
                type="outline"
                buttonStyle={{
                  ...styles.button,
                  borderColor: "#37b24d",
                  marginLeft: 20,
                }}
                titleStyle={{ ...styles.buttonTitle, color: "#37b24d" }}
                title="Hủy"
                onPress={cancelUpdate}
              />
            </View>
          </Fragment>
        )}

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
    backgroundColor: "#f8f9fa",
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
  input: {
    width: "100%",
    paddingHorizontal: 20,
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  button: {
    width: 85,
  },
  buttonTitle: {
    fontSize: 13,
  },
  spinnerTextStyle: {
    color: "#fff",
  },
});

export default GroupInformation;
