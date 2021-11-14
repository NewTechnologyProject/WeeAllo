import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import { View, StyleSheet } from "react-native";

import { GiftedChat } from "react-native-gifted-chat";
import { Header } from "react-native-elements/dist/header/Header";
import * as actions from "../../../../action/roomchat.action";

export default function ChatContent({ navigation, route }) {
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const activeRoom = useSelector((state) => state.roomchat.activeRoom);
  const listMessages = useSelector((state) => state.roomchat.listMessages);
  const [messages, setMessages] = useState([]);
  const userId = "2";

  if (route.params) {
    const { name } = route.params;
  }

  // const onSend = useCallback((messages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  // }, []);

  useEffect(() => {
    setMessages([]);
    if (listMessages.length > 0) {
      listMessages.map((message) =>
        setMessages((prevState) => {
          return [
            ...prevState,
            {
              _id: message.id,
              text: message.content ? message.content : "",
              createdAt: new Date(),
              user: {
                _id: message.userId.id,
                name: `${message.userId.firstname} ${message.userId.lastname}`,
                avatar: message.userId.avatar ? message.userId.avatar : "",
              },
            },
          ];
        })
      );
    }
  }, [listMessages]);

  useEffect(() => {
    if (activeRoom) {
      dispatch(actions.fetchAllMessages(activeRoom.id));
    }
  }, [activeRoom]);

  const backToAllChat = () => {
    navigation.navigate("TabRoute");
  };

  const toGroupInformation = () => {
    navigation.navigate("GroupInformation");
  };

  const styles = StyleSheet.create({
    avatar: {
      borderRadius: 1,
    },
    container: {
      flex: 1,
    },
    chatInput: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "white",
      height: 55,
      borderWidth: 1,
      borderColor: "white",
      borderTopColor: "#D8D8D8",
      flexDirection: "row",
    },
  });

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        centerComponent={{
          text: `${activeRoom.roomName ? activeRoom.roomName : "Group"}`,
          style: { color: "#fff" },
        }}
        leftComponent={
          <Icon
            name="chevron-left"
            type="font-awesome-5"
            color={"white"}
            size={25}
            onPress={backToAllChat}
          />
        }
        rightComponent={
          <Icon
            name="bars"
            type="font-awesome-5"
            color={"white"}
            size={25}
            onPress={toGroupInformation}
          />
        }
        containerStyle={{
          backgroundColor: "#37b24d",
          justifyContent: "space-around",
        }}
      />

      <GiftedChat
        messages={messages}
        // onSend={(messages) => onSend(messages)}
        user={{
          _id: Number(userId),
        }}
        listViewProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      />

      {/* <ScrollView>
        {listMessages &&
          listMessages.map((message) => {
            if (message.content) {
              return (
                <ListItem key={message.id}>
                  <Avatar
                    rounded
                    size={50}
                    icon={{ name: "user", type: "font-awesome" }}
                    source={{
                      uri: `${
                        message.userId.avatar
                          ? message.userId.avatar
                          : "dummy.js"
                      }`,
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{`${message.userId.firstname} ${message.userId.lastname}`}</ListItem.Title>
                    <ListItem.Subtitle>
                      {message.content ? message.content : ""}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            }
          })}
      </ScrollView>

      <View style={styles.chatInput}>
        <View style={{ flex: 1 }}>
          <TextInput
            multiline={true}
            placeholder="Nhập tin nhắn"
            style={{
              fontSize: 16,
              height: 50,
            }}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Icon
              reverse={true}
              reverseColor=""
              name="location-arrow"
              type="font-awesome-5"
              color="#098524"
              size={18}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.chatInput}>
        <View style={{ flex: 1 }}>
          <TextInput
            multiline={true}
            placeholder="Nhập tin nhắn"
            style={{
              fontSize: 16,
              height: 50,
            }}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Icon
              reverse={true}
              reverseColor=""
              name="location-arrow"
              type="font-awesome-5"
              color="#098524"
              size={18}
            />
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
