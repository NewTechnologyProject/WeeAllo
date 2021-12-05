import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Input, Button } from "react-native-elements";
import { TouchableOpacity, View, StyleSheet } from "react-native";

import Spinner from "react-native-loading-spinner-overlay";
import { Header } from "react-native-elements/dist/header/Header";
import ListFriends from "./ListFriends";
import ChooseAvatar from "./ChooseAvatar";
import * as actions from "../../../../../action/user.action";
import {
  addNewGroupChat,
  uploadAvatar,
} from "../../../../../action/roomchat.action";
import { addUserGroup } from "../../../../../action/usergroup.action";

const AddGroup = ({ navigation }) => {
  const [groupName, setGroupName] = useState("");
  const [helperText, setHelperText] = useState({ error: false, text: "" });
  const [keyword, setKeyword] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [chosenMembers, setChosenMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // const userId = "1";
  const userId = useSelector((state) => state.user.userAuth);
  const dispatch = useDispatch();
  const listFriends = useSelector((state) => state.user.listFriends);
  const profile = useSelector((state) => state.user.userById);

  //fetch all friends
  useEffect(() => {
    dispatch(actions.fetchAllFriend(userId));
    dispatch(actions.findByIdUser(userId));
  }, [userId]);

  const getChosenMembers = (members) => {
    setChosenMembers(members);
  };

  const getGroupName = (input) => {
    const name = input;
    const regex = new RegExp("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$");
    if (name.length > 18) {
      setHelperText({ error: true, text: "Tên phải bé hơn 18 kí tự" });
    } else if (!regex.test(name)) {
      setHelperText({
        error: true,
        text: "Tên bắt đầu là chữ cái hoặc số và không có kí tự đặc biệt",
      });
    } else {
      setHelperText({ error: false, text: " " });
    }
    setGroupName(name);
  };

  const getKeyword = (input) => {
    setKeyword(input);
  };

  const backTabRoute = (id) => {
    navigation.navigate("TabRoute", {
      screen: "Tin Nhắn",
      params: { members: chosenMembers, id: id },
    });
  };

  const getAvatar = (avatar) => {
    setAvatar(avatar);
  };

  //Enable button submit
  const enableBtn = useCallback((length) => {
    if (length >= 2) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, []);

  //add usergroup
  const createUserGroup = (roomId, members) => {
    members.map((member) => {
      const userGroup = {
        id: null,
        roomChatId: {
          id: roomId,
        },
        userId: {
          id: member.id,
        },
        userAdd: {
          id: Number(userId),
          firstname: profile.firstname,
          lastname: profile.lastname,
        },
      };

      addUserGroup(userGroup).catch((error) => {
        console.log(error);
      });
    });
  };

  //add new group chat
  const createGroupChat = (room) => {
    addNewGroupChat(room)
      .then((response) => {
        const newListMembers = [...chosenMembers, { id: userId }];
        createUserGroup(response.data.id, newListMembers);

        //Need to reload rooms
        backTabRoute(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createGroupChatWithAvatar = (avatar) => {
    const today = new Date();
    const getDate =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();

    const room = {
      id: null,
      creator: Number(userId),
      roomName: groupName,
      createAt: getDate,
      avatar: avatar,
      messageList: [],
      userGroupList: [],
    };

    //Api
    createGroupChat(room);
  };

  const submitHandler = () => {
    setLoading(true);

    // Get avatar link from aws s3
    if (avatar) {
      const formData = new FormData();
      formData.append("file", avatar);

      uploadAvatar(formData)
        .then((response) => {
          // console.log(response.data);
          createGroupChatWithAvatar(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createGroupChatWithAvatar(null);
    }
  };

  return (
    <View style={styles.main}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Loading..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />

      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        centerComponent={{
          text: "Tạo nhóm mới",
          style: { color: "#fff" },
        }}
        leftComponent={
          <TouchableOpacity onPress={backTabRoute.bind(null, 1)}>
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

      <View style={styles.container}>
        <ChooseAvatar avatar={avatar} getAvatar={getAvatar} />

        <Input
          value={groupName}
          label="Tên nhóm"
          placeholder="Tên nhóm"
          onChangeText={getGroupName}
          errorMessage={helperText.text}
        />
        <Input
          leftIcon={{ type: "font-awesome", name: "search" }}
          placeholder="Tìm kiếm"
          value={keyword}
          onChangeText={getKeyword}
        />

        <View style={styles.list}>
          <ListFriends
            listFriends={listFriends}
            keyword={keyword}
            enableBtn={enableBtn}
            chosenMembers={chosenMembers}
            selectMembers={getChosenMembers}
          />
        </View>
      </View>

      <View style={styles.btnContainer}>
        <Button
          title="Tạo Nhóm"
          buttonStyle={{ backgroundColor: "#e6fcf5", height: "100%" }}
          titleStyle={{ color: "#12b886", fontWeight: "700", fontSize: 18 }}
          disabled={disableBtn}
          onPress={submitHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 0,
    padding: 10,
    paddingBottom: 0,
    flexDirection: "column",
    position: "relative",
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    backgroundColor: "white",
    flex: 1,
  },
  btnContainer: {
    height: "6%",
  },
  list: { flex: 1, width: "100%" },
  spinnerTextStyle: {
    color: "#fff",
  },
});

export default AddGroup;
