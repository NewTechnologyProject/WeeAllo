import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Input, Button } from "react-native-elements";
import { TouchableOpacity, View, StyleSheet } from "react-native";

import Spinner from "react-native-loading-spinner-overlay";
import { Header } from "react-native-elements/dist/header/Header";
import { addUserGroup } from "../../../../../action/usergroup.action";
import ListFriends from "./ListFriend";
import * as actions from "../../../../../action/user.action";

const addMember = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const [chosenMembers, setChosenMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = "2";
  const dispatch = useDispatch();
  const listFriends = useSelector((state) => state.user.listFriends);
  const activeRoom = useSelector((state) => state.roomchat.activeRoom);

  //fetch all friends
  useEffect(() => {
    dispatch(actions.fetchAllFriend(userId));
  }, [userId]);

  const getChosenMembers = (members) => {
    setChosenMembers(members);
  };

  const getKeyword = (input) => {
    setKeyword(input);
  };

  const backToGroupInformation = () => {
    navigation.navigate("GroupInformation", { members: chosenMembers });
  };

  //Enable button submit
  const enableBtn = useCallback((length) => {
    if (length >= 1) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, []);

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
      };

      addUserGroup(userGroup)
        .then((response) => {
          console.log("Add usergroup successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const submitHandler = () => {
    createUserGroup(activeRoom.id, chosenMembers);
    backToGroupInformation();
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
          text: "Thêm thành viên",
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

      <View style={styles.container}>
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
          title="Thêm vào nhóm"
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
    color: "#FFF",
  },
});

export default addMember;
