import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import { View, StyleSheet, LogBox, TouchableOpacity, Text, Image, Keyboard, Modal } from "react-native";

import { GiftedChat, Bubble, Actions, Composer, Send, renderChatEmpty, MessageImage, renderChatFooter } from "react-native-gifted-chat";
import { Header } from "react-native-elements/dist/header/Header";
import * as actions from "../../../../action/roomchat.action";
import * as action from "../../../../action/message.action";

import EmojiSelector, { Categories } from "react-native-emoji-selector";
// import DocumentPicker from 'react-native-document-picker'
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from "expo-image-picker";
import ImageViewer from 'react-native-image-zoom-viewer'
import axios from "axios";

export default function ChatContent({ navigation, route }) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const activeRoom = useSelector((state) => state.roomchat.activeRoom);
  const listMessages = useSelector((state) => state.roomchat.listMessages);
  const [messages, setMessages] = useState([]);
  const [customText, setCustomText] = useState(null);
  const [statusEmoji, setStatusEmoji] = useState(false);
  const [statusImage, setStatusImage] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [link, setLink] = useState();
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const userId = "2";

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    sentMessage(messages[0], null, null);
    // handleFile(messages[0]);
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, [])


  const sentMessage = (message, file, image) => {
    const messageText = {
      status: "send",
      content: message.text,
      image,
      file,
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
              image: message.image ? message.image : null,
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

  // const styles = StyleSheet.create({
  //   avatar: {
  //     borderRadius: 1,
  //   },
  //   container: {
  //     flex: 1,
  //   },
  //   chatInput: {
  //     position: "absolute",
  //     left: 0,
  //     right: 0,
  //     bottom: 0,
  //     backgroundColor: "white",
  //     height: 55,
  //     borderWidth: 1,
  //     borderColor: "white",
  //     borderTopColor: "#D8D8D8",
  //     flexDirection: "row",
  //   },
  //   footer: {
  //     position: "absolute",
  //     backgroundColor: "blue",
  //     height: 150,
  //     width: `100%`,
  //     bottom: 0
  //   }
  // });

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
            onPress={() => setStatusEmoji(!statusEmoji)}
            style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
          />
          <Composer {...props} />
          <TouchableOpacity onPress={() => setStatusImage(!statusImage)}
            style={{ marginTop: 0, marginLeft: 10, marginRight: 10 }}>
            <Icon
              name="image"
              type="font-awesome-5"
              color={"#868e96"}
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickDocument}>
            <Icon
              name="paperclip"
              type="font-awesome-5"
              color={"#868e96"}
              size={25}
            />
          </TouchableOpacity>
        </View >
      )
    }  //Text not empty
    if (props.text.trim())
      return (
        <View style={{ flexDirection: 'row', justiftyContent: "center", alignItems: "center" }}>
          <Icon
            name="laugh"
            type="font-awesome-5"
            color={"#868e96"}
            size={25}
            onPress={() => setStatusEmoji(!statusEmoji)}
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

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    const formData = new FormData();
    formData.append("file", {
      uri: result.uri,
      type: result.mimeType,
      name: result.name
    });
    axios
      .post("http://192.168.43.141:4000/api/storage/uploadFile?key=file", formData)
      .then((response) => {
        // setFile(response.data);
        console.log("===> file ===>", response.data);
        // console.log("fileeeee", file);
        sentMessage({}, response.data, null);
      });

  };
  // ======================================IMAGE============================


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({});
    console.log(result);
    setLink(result.uri);
    console.log("link", link);
    const imageType = result.uri.split(".")[1];
    const formData = new FormData();
    formData.append("file", {
      uri: result.uri,
      type: `image/${imageType}`,
      name: `photo.${result.type}`
    });
    console.log("fromdta", formData);
    axios
      .post("http://192.168.43.141:4000/api/storage/uploadFile?key=file", formData)
      .then((response) => {
        // setImage(response.data);
        console.log("===> IMAGE ===>", image);
        sentMessage({}, null, response.data);
      });
  };

  const wait = (timeout) => {
    return
    new Promise((resolve) => setTimeout(resolve, timeout))
  }

  // ===============================OPEN  CAMERA========================
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    const formData = new FormData();
    const imageUri = result.uri.replace("file:/data", "file:///data");
    const imageType = result.uri.split(".")[1];

    formData.append("file", {
      uri: imageUri,
      type: `image/${imageType}`,
      name: `photo.${imageType}`,
    });

    if (!result.cancelled) {
      axios
        .post(
          "http://192.168.43.141:4000/api/storage/uploadFile?key=file",
          formData
        )
        .then((response) => {
          sentMessage({}, null, response.data);
          setStatusImage(false)
        });
    }
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

  // ==========================CHAT FOOTER ====================================

  const renderChatFooter = () => {
    if (link) {
      return (
        <View>
          <Text>Image loaded:</Text>
          <TouchableOpacity onPress={() => setLink()}>
            <Image
              source={{ uri: link }}
              style={{ height: 75, width: 75 }}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };
  // ==================================SCREEN CHAT====================================================================================
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
        renderChatEmpty={renderChatEmpty}
        renderComposer={renderComposer}
      // renderChatFooter={renderChatFooter}
      // renderMessageImage={renderMessageImage}
      // inverted={false}
      />
      {statusEmoji === true ? (
        <EmojiSelector
          category={Categories.symbols}
          onEmojiSelected={emoji => setCustomText(customText + emoji)}
          columns={9}
        />
      ) : (
        <View />
      )}

      {statusImage ? (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
            <Text style={styles.panelButtonTitle}>Chụp ảnh mới</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
            <Text style={styles.panelButtonTitle}>
              Chọn ảnh từ thiết bị
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => setStatusImage(false)}
          >
            <Text style={styles.panelButtonTitle}>Hủy</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}
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
  footer: {
    // position: "absolute",
    backgroundColor: "white",
    height: `auto`,
    width: `100%`,
    bottom: 0
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 7,
    width: 210,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0099FF",
    // color: "white"
  },
});