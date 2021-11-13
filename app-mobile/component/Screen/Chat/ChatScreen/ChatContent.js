import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import { View, StyleSheet, LogBox, TouchableOpacity, Text, Image, Keyboard } from "react-native";

import { GiftedChat, Bubble, Actions, Composer, Send, renderChatEmpty } from "react-native-gifted-chat";
import { Header } from "react-native-elements/dist/header/Header";
import * as actions from "../../../../action/roomchat.action";
import * as action from "../../../../action/message.action";

import EmojiSelector, { Categories } from "react-native-emoji-selector";
// import DocumentPicker from 'react-native-document-picker'
import * as DocumentPicker from 'expo-document-picker';
import axios from "axios";

export default function ChatContent({ navigation, route }) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const activeRoom = useSelector((state) => state.roomchat.activeRoom);
  const listMessages = useSelector((state) => state.roomchat.listMessages);
  const [messages, setMessages] = useState([]);
  const [customText, setCustomText] = useState(null);
  const [statusEmoji, setStatusEmoji] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const userId = "2";

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    sentMessage(messages[0]);
    // handleFile(messages[0]);
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
  // =======================================KEYBOARD===============================================
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isKeyboardVisible === true)
      setStatusEmoji(false);
  });

  // =======================================GET MESSAGES=============================================

  useEffect(() => {
    setMessages([]);
    if (listMessages.length > 0) {
      listMessages.map((message) =>
        setMessages((prevState) => {
          return [
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
            ...prevState
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

  // const backToAllChat = () => {
  //   navigation.navigate("TabRoute");
  // };

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

  // =================================INPUT CHAT=========================================
  const renderComposer = props => {
    if (!props.text.trim()) { // text box empty
      return (
        <View style={{ flexDirection: 'row', justiftyContent: "center", alignItems: "center", marginRight: 10, marginLeft: 10 }}>
          <Icon
            name="laugh"
            type="font-awesome-5"
            color={"#868e96"}
            size={25}
            onPress={() => {
              Keyboard.addListener(
                'keyboardDidHide',
                () => {
                  setKeyboardVisible(false); // or some other action
                }
              ), setStatusEmoji(!statusEmoji)
            }}
            style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
          />
          <Composer {...props} />
          <Icon
            name="image"
            type="font-awesome-5"
            color={"#868e96"}
            size={25}
            style={{ marginTop: 0, marginLeft: 10, marginRight: 10 }}
          />
          <Icon
            name="paperclip"
            type="font-awesome-5"
            color={"#868e96"}
            size={25}
            style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
            onPress={pickDocument}
          />
        </View >
      )
    }  //Text not empty
    return (
      <View style={{ flexDirection: 'row', justiftyContent: "center", alignItems: "center" }}>
        <Icon
          name="laugh"
          type="font-awesome-5"
          color={"#868e96"}
          size={25}
          onPress={() => { setStatusEmoji(!statusEmoji); console.log(statusEmoji) }}
          style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
        />
        <Composer {...props} />
        <Send {...props} style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginRight: 10, marginLeft: 10 }}>
          <Icon
            name="paper-plane"
            type="font-awesome-5"
            color={"#0084ff"}
            size={30}
            style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}
          /></Send>
      </View >
    )
  }

  // ======================================DOCUMENT============================
  const [file, setFile] = useState();

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result.uri);
    console.log(result);
    const formData = new FormData();
    formData.append("file", result);
    // axios
    //   .post("http://192.168.43.141:4000/api/storage/uploadFile?key=file", formData)
    //   .then((err, response) => {
    //     console.log(err);
    //     setFile(response.data);
    //     console.log("file", response.data);
    //   });
    dispatch(action.upFile(formData));
  };

  const handleFile = (message) => {
    // const imageA = e.target.files[0];
    const messageText = {
      status: "send",
      content: message.text,
      image: null,
      file: null,
      roomChatId: activeRoom.id,
      time: new Date(),
      userId: 2,
    };
    const formData = new FormData();
    // formData.append("file", messageText);
    axios
      .post("http://localhost:4000/api/messages/chat", messageText)
      .then((response) => {
        setSFile(response.data);
      });
  };

  //====================================ON LONG PRESS BUBBLE====================
  const onLongPress = (context, message) => {
    console.log(context, message);
    const options = ['Thu hồi tin nhắn', 'Copy', 'Hủy'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex
    }, (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          // Your delete logic
          break;
        case 1:
          // 
          break;
        case 2:
          break;
      }
    });
  }

  // ================================SCREEN CHAT EMPTY
  const renderChatEmpty = () => {
    return <View style={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    }}>
      <Text style={{
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      }}>
        Hãy gửi cho nhau những lời yêu thương đi nào!!
      </Text>
    </View>
  }
  // ==================================SCREEN CHAT===================================
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
            onPress={() => navigation.goBack()}
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
      {/* ==========================GIFTED CHAT========================================== */}
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
        text={customText}
        onInputTextChanged={(text) => setCustomText(text)}
        onLongPress={onLongPress}
        renderAvatarOnTop={true}
        renderUsernameOnMessage={true} //show username
        renderComposer={renderComposer}
        renderChatEmpty={renderChatEmpty}
      // inverted={false}
      />
      {statusEmoji === true ? (
        <EmojiSelector
          category={Categories.symbols}
          onEmojiSelected={emoji => setCustomText(customText + emoji)}
          columns={9}
        />
      ) : (
        <View style={{}} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  sendingContainer: {
    marginRight: 25
  }
});