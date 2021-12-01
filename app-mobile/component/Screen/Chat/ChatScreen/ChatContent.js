import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, ListItem } from "react-native-elements";
import {
  View,
  StyleSheet,
  LogBox,
  TouchableOpacity,
  Text,
  Image,
  Keyboard,
} from "react-native";
import { io } from "socket.io-client";
import { GiftedChat, Composer, Send } from "react-native-gifted-chat";
import { Header } from "react-native-elements/dist/header/Header";
import * as actions from "../../../../action/roomchat.action";
import * as action from "../../../../action/message.action";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { SOCKET_URL } from "../../../../services/api.service";
import { uploadAvatar } from "../../../../action/roomchat.action";
import Spinner from "react-native-loading-spinner-overlay";
import apiService from "../../../../services/api.service";

const URL = SOCKET_URL;
export default function ChatContent({ navigation, route }) {
  const dispatch = useDispatch();
  const activeRoom = useSelector((state) => state.roomchat.activeRoom);
  const listMessages = useSelector((state) => state.roomchat.listMessages);
  const listMembers = useSelector((state) => state.roomchat.listMembers);
  const [receiverId, setReceiverId] = useState([]);
  const [messages, setMessages] = useState([]);
  const [customText, setCustomText] = useState(null);
  const [statusEmoji, setStatusEmoji] = useState(false);
  const [statusImage, setStatusImage] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [link, setLink] = useState();
  const [loading, setLoading] = useState(false);
  // ----------------------------------------------------------------------
  //RealTime
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // ----------------------------------------------------------------------
  const profile = useSelector((state) => state.user.userById);
  const userId = "1";

  LogBox.ignoreLogs(["Warning: ..."]);

  useEffect(() => {
    if (activeRoom) {
      dispatch(actions.fetchAllMessages(activeRoom.id));
    }
  }, [activeRoom]);

  useEffect(() => {
    if (activeRoom) {
      dispatch(actions.fetchAllMembers(activeRoom.id));
    }
  }, [activeRoom]);

  useEffect(() => {
    if (listMembers.length > 0) {
      console.log(listMembers);
      setReceiverId([]);
      for (let member of listMembers) {
        if (member.id !== Number(userId))
          setReceiverId((prevState) => [...prevState, { userId: member.id }]);
      }
    }
  }, [listMembers]);

  // ----------------------------------------------------------------------
  //RealTime
  useEffect(() => {
    socket.current = io(URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage(data.message);
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage && arrivalMessage.roomChatId.id === activeRoom.id) {
      //Add message
      const gifted_message = {
        _id: arrivalMessage.id,
        text: arrivalMessage.content ? arrivalMessage.content : "",
        createdAt: new Date(),
        image: arrivalMessage.image ? arrivalMessage.image : null,
        file: arrivalMessage.file ? arrivalMessage.file : null,
        user: {
          _id: arrivalMessage.userId.id,
          name: `${arrivalMessage.userId.firstname} ${arrivalMessage.userId.lastname}`,
          avatar: arrivalMessage.userId.avatar
            ? arrivalMessage.userId.avatar
            : "",
        },
      };

      setMessages((prevState) => [gifted_message, ...prevState]);
    }
  }, [arrivalMessage, activeRoom]);

  useEffect(() => {
    socket.current.emit("addUser", Number(userId));
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [userId]);
  // ----------------------------------------------------------------------

  if (route.params) {
    const { name } = route.params;
  }

  const onSend = (messages = []) => {
    sentMessage(messages[0], null, null);
  };

  const sentMessage = (message, file, image) => {
    const messageText = {
      status: "send",
      content: message.text,
      image,
      file,
      roomChatId: {
        id: activeRoom.id,
      },
      time: new Date(),
      userId: {
        id: Number(userId),
        firstname: "Huy",
        lastname: "Le",
      },
    };

    apiService
      .message()
      .addMessage(messageText)
      .then((response) => {
        //Ad to chat screen
        const gifted_message = {
          _id: response.data.id,
          text: response.data.content ? response.data.content : "",
          createdAt: new Date(),
          image: response.data.image ? response.data.image : null,
          file: response.data.file ? response.data.file : null,
          user: {
            _id: response.data.userId.id,
            name: `${response.data.userId.firstname} ${response.data.userId.lastname}`,
            avatar: response.data.userId.avatar
              ? response.data.userId.avatar
              : "",
          },
        };
        setMessages((prevState) => [gifted_message, ...prevState]);

        // ----------------------------------------------------------------------
        //RealTime
        // ws.send(JSON.stringify(messageRealTime));
        socket.current.emit("sendMessage", {
          senderId: Number(userId),
          receiverId,
          message: messageText,
        });
        // ---------------------------------------------------------------------
      })
      .catch((err) => console.log(err));

    setLoading(false);
  };

  // =======================================KEYBOARD===============================================
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
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
    if (isKeyboardVisible === true) setStatusEmoji(false);
  });

  // =======================================GET MESSAGES=============================================
  useEffect(() => {
    setMessages([]);
    if (listMessages.length > 0) {
      listMessages.map((message, i) =>
        setMessages((prevState) => {
          return [
            {
              _id: i,
              text: message.content ? message.content : "",
              createdAt: new Date(),
              image: message.image ? message.image : null,
              file: message.file ? message.file : null,
              user: {
                _id: message.userId.id,
                name: `${message.userId.firstname} ${message.userId.lastname}`,
                avatar: message.userId.avatar ? message.userId.avatar : "",
              },
            },
            ...prevState,
          ];
        })
      );
    }
  }, [listMessages]);

  const toGroupInformation = () => {
    navigation.navigate("GroupInformation");
  };

  // =================================INPUT CHAT=========================================
  const renderComposer = (props) => {
    if (!props.text.trim()) {
      // text box empty
      return (
        <View
          style={{
            flexDirection: "row",
            justiftyContent: "center",
            alignItems: "center",
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <Icon
            name="laugh"
            type="font-awesome-5"
            color={"#868e96"}
            size={25}
            onPress={() => {
              setStatusEmoji(!statusEmoji), Keyboard.dismiss();
            }}
            style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
          />
          <Composer {...props} />
          <TouchableOpacity
            onPress={() => setStatusImage(!statusImage)}
            style={{ marginTop: 0, marginLeft: 10, marginRight: 10 }}
          >
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
        </View>
      );
    }

    //Text not empty
    if (props.text.trim())
      return (
        <View
          style={{
            flexDirection: "row",
            justiftyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name="laugh"
            type="font-awesome-5"
            color={"#868e96"}
            size={25}
            onPress={() => setStatusEmoji(!statusEmoji)}
            style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
          />
          <Composer {...props} />
          <Send
            {...props}
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              marginRight: 10,
              marginLeft: 10,
            }}
          >
            <Icon
              name="paper-plane"
              type="font-awesome-5"
              color={"#0084ff"}
              size={30}
              style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}
            />
          </Send>
        </View>
      );
  };

  // ======================================DOCUMENT============================
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    const formData = new FormData();
    formData.append("file", {
      uri: result.uri,
      type: result.mimeType,
      name: result.name,
    });

    uploadAvatar(formData).then((response) => {
      sentMessage({}, response.data, null);
    });
  };
  // ======================================IMAGE============================
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    setLink(result.uri);
    const imageType = result.uri.split(".")[1];
    const formData = new FormData();
    formData.append("file", {
      uri: result.uri,
      type: `image/${imageType}`,
      name: `photo.${result.type}`,
    });

    setLoading(true);
    uploadAvatar(formData).then((response) => {
      sentMessage({}, null, response.data);
    });
  };

  const wait = (timeout) => {
    return;
    new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // ===============================OPEN  CAMERA========================
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    const formData = new FormData();
    const imageUri = result.uri.replace("file:/data", "file:///data");
    const imageType = result.uri.split(".")[1];

    formData.append("file", {
      uri: imageUri,
      type: `image/${imageType}`,
      name: `photo.${imageType}`,
    });

    uploadAvatar(formData).then((response) => {
      sentMessage({}, null, response.data);
    });
  };

  //====================================ON LONG PRESS BUBBLE====================
  const onLongPress = (context, message) => {
    console.log(context, message);
    const options = ["Thu hồi tin nhắn", "Copy", "Hủy"];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
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
      }
    );
  };

  // ================================SCREEN CHAT EMPTY==========================
  const renderChatEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#ecf0f1",
          padding: 8,
        }}
      >
        <Text
          style={{
            margin: 24,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Hãy gửi cho nhau những lời yêu thương đi nào!!
        </Text>
      </View>
    );
  };
  // ==================================================================

  const getFileName = (str) => {
    if (str) {
      const str1 = str.split("/")[3];
      const str2 = str1.substring(str1.indexOf("-") + 1);
      return str2;
    }
    return;
  };

  const getType = (str) => {
    const str1 = str.split(".")[5];
    return str1;
  };

  const getIconType = (url) => {
    if (url) {
      const type = getType(url);
      let value;
      switch (type) {
        case "docx":
          value = "file-word-o";
          break;
        case "pdf":
          value = "file-pdf-o";
          break;
        case "ppt":
          value = "file-powerpoint-o";
          break;
        case "xls":
        case "csv":
          value = "file-excel-o";
          break;

        default:
          value = "file";
          break;
      }
      return value;
    }
    return;
  };

  // ==========================CUSTOM VIEW====================================
  const renderCustomView = (props) => {
    if (props?.currentMessage?.file) {
      return (
        <TouchableOpacity>
          <View style={styles.messageFile}>
            <Icon
              name={getIconType(props?.currentMessage?.file)}
              type={"font-awesome"}
              color={
                props?.currentMessage?.user?._id === Number(userId)
                  ? "#fff"
                  : "#000"
              }
            />
            <Text
              style={{
                marginHorizontal: 10,
                color:
                  props?.currentMessage?.user?._id === Number(userId)
                    ? "#fff"
                    : "#000",
              }}
            >
              {getFileName(props?.currentMessage?.file)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return;
    }
  };

  // ==========================CHAT FOOTER ====================================
  const renderChatFooter = () => {
    if (link) {
      return (
        <View>
          <Text>Image loaded:</Text>
          <TouchableOpacity onPress={() => setLink()}>
            <Image source={{ uri: link }} style={{ height: 75, width: 75 }} />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  // ========================SCREEN CHAT=================================
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
        //renderChatEmpty={renderChatEmpty}
        // renderChatFooter={renderChatFooter}
        // renderMessageImage={renderMessageImage}
        // inverted={false}
        renderCustomView={renderCustomView}
      />
      {statusEmoji === true ? (
        <EmojiSelector
          category={Categories.symbols}
          onEmojiSelected={(emoji) => setCustomText(customText + emoji)}
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
            <Text style={styles.panelButtonTitle}>Chọn ảnh từ thiết bị</Text>
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
    bottom: 0,
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
  },
  spinnerTextStyle: {
    color: "#fff",
  },
  messageFile: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
