import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Overlay } from "react-native-elements";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Text,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import mime from "mime";

const ChooseAvatar = (props) => {
  const [visible, setVisible] = useState(false);

  const { avatar, getAvatar } = props;

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //access permission to camera roll
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const getAvatarObj = (result) => {
    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    // let match = /\.(\w+)$/.exec(filename);
    // let type = match ? `image/${match[1]}` : `image`;
    let type = mime.getType(result.uri);

    const avatarObj = { type: type, uri: localUri, name: filename };

    return avatarObj;
  };

  //pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      const avatarObj = getAvatarObj(result);
      getAvatar(avatarObj);
    }

    toggleOverlay();
  };

  //Take image
  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      const avatarObj = getAvatarObj(result);
      getAvatar(avatarObj);
    }

    toggleOverlay();
  };

  //Delete image
  const deleteImage = () => {
    getAvatar(null);
    toggleOverlay();
  };

  const content = avatar ? (
    <Avatar
      rounded
      size={65}
      icon={{ name: "camera", type: "font-awesome" }}
      activeOpacity={0.7}
      containerStyle={{ backgroundColor: "gray" }}
      source={{
        uri: `${avatar.uri}`,
      }}
    />
  ) : (
    <Avatar
      rounded
      size={65}
      icon={{ name: "camera", type: "font-awesome" }}
      activeOpacity={0.7}
      containerStyle={{ backgroundColor: "gray" }}
    />
  );

  return (
    <Fragment>
      <TouchableOpacity activeOpacity={0.5} onPress={toggleOverlay}>
        {content}
      </TouchableOpacity>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Chọn hình đại diện</Text>
          </View>

          <Button
            type="outline"
            title="Chụp ảnh mới"
            titleStyle={{ color: "#339af0" }}
            buttonStyle={styles.btn}
            onPress={takeImage}
          />
          <Button
            type="outline"
            title="Chọn ảnh từ điện thoại"
            titleStyle={{ color: "#339af0" }}
            buttonStyle={styles.btn}
            onPress={pickImage}
          />
          <Button
            type="outline"
            title="Xóa ảnh"
            titleStyle={{ color: "#339af0" }}
            buttonStyle={styles.btn}
            onPress={deleteImage}
          />
        </View>
      </Overlay>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
    margin: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  overlay: { width: "90%", height: "35%", borderRadius: 10 },
  btn: { padding: 12, borderColor: "#fff" },
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  titleContainer: {
    marginBottom: 10,
    width: "100%",
    borderColor: "black",

    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#dee2e6",
  },
});

export default ChooseAvatar;
