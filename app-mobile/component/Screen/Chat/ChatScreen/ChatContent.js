import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import { View, StyleSheet, LogBox, Touchable, Text } from "react-native";

import { GiftedChat, Bubble, Actions, Composer, Send, renderAccessory } from "react-native-gifted-chat";
import { Header } from "react-native-elements/dist/header/Header";
import * as actions from "../../../../action/roomchat.action";
import * as action from "../../../../action/message.action";

import EmojiSelector, { Categories } from "react-native-emoji-selector";
import DocumentPicker from 'react-native-document-picker'

export default function ChatContent({ navigation, route }) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const activeRoom = useSelector((state) => state.roomchat.activeRoom);
  const listMessages = useSelector((state) => state.roomchat.listMessages);
  const [messages, setMessages] = useState([]);
  const userId = "2";

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    sentMessage(messages[0]);
  }, []);

  const sentMessage = (message) => {
    const messageText = {
      status: "send",
      content: message.text,
      image: null,
      file: null,
      roomChatId: activeRoom.id,
      time: new Date(),
      userId: 2,
    };
    console.log(messageText);
    dispatch(action.addMessage(messageText));
  };

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
              createdAt: message.time,
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

  // LogBox.ignoreLogs(['Remote debugger']);
  const renderActions = (props) => {
    return (
      <Actions
        {...props}
        options={{
          ['Document']: async (props) => {
            try {
              const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
              });
              console.log("image file", result)
            } catch (e) {
              if (DocumentPicker.isCancel(e)) {
                console.log("User cancelled!")
              } else {
                throw e;
              }
            }

          },
          Cancel: (props) => { console.log("Cancel") }
        }}
        onSend={args => console.log(args)}
      />
    )
  };

  const [statusEmoji, setStatusEmoji] = useState(false);
  const renderComposer = props => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {/* <Touchable > */}
        <Icon
          name="laugh"
          type="font-awesome-5"
          color={"#868e96"}
          size={20}
          style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
          onPress={() => { setStatusEmoji(!statusEmoji); console.log(statusEmoji) }}
        />

        {/* </Touchable> */}
        <Composer {...props} />
      </View>
    )
  }

  const renderAccessory = props => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {statusEmoji === true ? (
          <EmojiSelector
            category={Categories.symbols}
            onEmojiSelected={emoji => console.log(emoji)}
          />
        ) : (
          <View style={{}} />
        )}
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        centerComponent={{
          text: activeRoom.roomName,
          style: { color: "#fff", fontWeight: "bold" },
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
        onSend={(messages) => onSend(messages)}
        user={{
          _id: Number(userId),
        }}
        listViewProps={{
          style: {
            backgroundColor: "white",
          },
        }}
        renderActions={() => renderActions()}
        // renderAccessory={renderAccessory} //under input
        renderAvatarOnTop={true}
        renderUsernameOnMessage={true} //show username
        renderComposer={renderComposer}

      />

      {statusEmoji === true ? (
        <EmojiSelector
          category={Categories.symbols}
          onEmojiSelected={emoji => console.log(emoji)}
        />
      ) : (
        <View style={{}} />
      )}


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

  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 15,
  },
});