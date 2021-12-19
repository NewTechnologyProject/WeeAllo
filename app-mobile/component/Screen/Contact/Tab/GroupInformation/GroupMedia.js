import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image, Icon } from "react-native-elements";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { FlatGrid } from "react-native-super-grid";
import { Header } from "react-native-elements/dist/header/Header";
import * as actions from "../../../../../action/roomchat.action";
import { SOCKET_URL } from "../../../../../services/api.service";
import { io } from "socket.io-client";

const URL = SOCKET_URL;

const GroupMedia = ({ navigation }) => {
  const [listMedia, setListMedia] = useState([]);
  const dispatch = useDispatch();
  const activeRoom = useSelector((state) => state.roomchat.activeRoom);
  const listMessages = useSelector((state) => state.roomchat.listMessages);
  const userId = useSelector((state) => state.user.userAuth);
  const socket = useRef();

  useEffect(() => {
    if (activeRoom) {
      dispatch(actions.fetchAllMessages(activeRoom.id));
    }
  }, [activeRoom]);

  useEffect(() => {
    setListMedia([]);

    for (let message of listMessages) {
      if (message.image) {
        setListMedia((prevState) => {
          return [...prevState, message.image];
        });
      }
    }
  }, [listMessages]);

  // ----------------------------------------------------------------------
  //Real time
  useEffect(() => {
    socket.current = io(URL);
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

  const backToGroupInformation = () => {
    navigation.navigate("GroupInformation");
  };

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        centerComponent={{
          text: "Hình ảnh/Video",
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

      {listMedia.length <= 0 && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>Chưa có hình ảnh/Video</Text>
        </View>
      )}

      {listMedia.length > 0 && (
        <View style={styles.images}>
          <FlatGrid
            itemDimension={130}
            data={listMedia}
            style={styles.gridView}
            renderItem={(item) => {
              return (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.item }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
    color: "#adb5bd",
  },
  images: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 5,
  },
  imageContainer: { flex: 1, flexDirection: "column", margin: 2 },
  image: { height: 120 },
  gridView: {
    flex: 1,
  },
});

export default GroupMedia;
