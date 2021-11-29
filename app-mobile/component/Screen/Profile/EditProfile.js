import { Picker } from "@react-native-picker/picker";
import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import DatePicker from "react-native-datepicker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../action/user.action";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { Header } from "react-native-elements/dist/header/Header";
import axios from "axios";

export default function EditProfile({ navigation }) {
  const BottomSheet = ({ animation, onCancel }) => {
    return (
      <Animated.View
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          padding: 20,
          position: "absolute",
          bottom: animation,
          zIndex: 3,
          alignItems: "center",
          justifyContent: "center",
          maxHeight: 300,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              height: 270,
              marginBottom: 8,
            }}
          >
            <View style={styles.panel}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.panelTitle}>Ảnh đại diện</Text>
                <Text style={styles.panelSubtitle}>Chọn ảnh của bạn </Text>
              </View>
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
                onPress={() => {
                  onCancel();
                }}
              >
                <Text style={styles.panelButtonTitle}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    );
  };
  const dispatch = useDispatch();
  var btnDisable = false;
  const imageAvatar = useRef(null);
  const [userProfile, setUserProfile] = useState([]);
  const [userId, setUserId] = useState();
  const [date, setDate] = useState("");
  const [gender, setGender] = useState();
  const [image, setImage] = useState(null);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [animationValue, setAnimationValue] = useState(-1000);
  const user = useSelector((state) => state.user.userAuth);
  const profile = useSelector((state) => state.user.userById);

  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
  }, []);

  useEffect(() => {
    dispatch(actions.findByIdUser(1));
  }, []);

  useEffect(() => {
    if (profile != undefined || profile != null) {
      setUserProfile(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (userProfile !== undefined) {
      setUserId(userProfile.id);
      setImage(userProfile.avartar);
      setFirstName(userProfile.firstname);
      setLastName(userProfile.lastname);
      setPhone(userProfile.phone);
      setGender(userProfile.gender);
      setDate(userProfile.birthday);
    }
  }, [userProfile]);

  //console.log("userid", userId);

  const initialFieldValues = {
    firstname: firstname,
    lastname: lastname,
    gender: gender,
    birthday: date,
    phone: phone,
    avartar: image,
    //coverImage: "",
  };

  function showToast() {
    ToastAndroid.show("Cập nhật thông tin thành công!", ToastAndroid.SHORT);
  }

  function onLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  const onUpdate = (e) => {
    e.preventDefault();
    if (firstname === "" || lastname === "") {
      Alert.alert("Cảnh báo", "Vui lòng nhập đầy đủ thông tin", [
        {
          text: "Xác nhận",
        },
      ]);
    } else {
      dispatch(actions.updateUserById(initialFieldValues, userId));
      onLoading();
      setTimeout(() => {
        Alert.alert("Cập nhật thông tin thành công ! ");
      }, 2000);
    }
  };

  const showAnimation = useRef(new Animated.Value(animationValue)).current;

  const toggleAnimation = () => {
    const val = animationValue === 0 ? -1000 : 0;
    Animated.timing(showAnimation, {
      useNativeDriver: false,
      toValue: val,
      duration: 350,
    }).start();
    setAnimationValue(val);
  };

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
          "http://192.168.1.12:4000/api/storage/uploadFile?key=file",
          formData
        )
        .then((response) => {
          setImage(response.data);
          console.log(response.data);
          //console.log(image);
        });
      // setImage(result.uri);
      // console.log(result);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

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
          "http://192.168.1.12:4000/api/storage/uploadFile?key=file",
          formData
        )
        .then((response) => {
          setImage(response.data);
          //console.log(response.data);
          //console.log(image);
        });
    }
  };
  const backToProfile = () => {
    navigation.navigate("TabRoute");
  };
  // function onDisable() {
  //   if (firstname === "" && lastname === "") {
  //     return (btnDisable = true);
  //   } else {
  //     return (btnDisable = false);
  //   }
  // }

  return (
    <>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        leftComponent={
          <Icon
            name="chevron-left"
            type="font-awesome-5"
            color={"green"}
            size={40}
            onPress={backToProfile}
          />
        }
      />

      <BottomSheet
        onCancel={() => {
          toggleAnimation();
        }}
        animation={showAnimation}
      />
      <View style={[styles.container2, styles.horizontal]}>
        <ActivityIndicator animating={loading} size="large" color="#0000ff" />
      </View>

      <View
        style={styles.container}
        onTouchStart={() => {
          if (animationValue === 0) {
            toggleAnimation();
          }
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ marginTop: -380 }}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => toggleAnimation()}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    marginTop: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: image,
                    }}
                    style={{ height: 140, width: 140 }}
                    imageStyle={{ borderRadius: 70 }}
                  >
                    <View style={{ marginTop: 110, marginLeft: 100 }}>
                      <Icon
                        name="camera"
                        size={30}
                        style={{
                          opacity: 0.7,
                          color: "green",
                          alignItems: "center",
                          justifyContent: "center",
                          //borderWidth: 1,
                          borderColor: "#fff",
                          borderRadius: 10,
                        }}
                      ></Icon>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
              <Text style={{ marginTop: 43, fontSize: 18, fontWeight: "bold" }}>
                {firstname + " " + lastname}
              </Text>
            </View>
            <View style={styles.action}>
              <FontAwesome name="user-o" size={20} />
              <TextInput
                placeholder="Họ"
                autoCorrect={false}
                placeholderTextColor="#666666"
                style={styles.textInput}
                value={firstname}
                onChangeText={(text) => setFirstName(text)}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome name="user-o" size={20} />
              <TextInput
                placeholder="Tên"
                autoCorrect={false}
                placeholderTextColor="#666666"
                style={styles.textInput}
                value={lastname}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome name="mobile" size={30} />

              <TextInput
                placeholder="Điện thoại"
                autoCorrect={false}
                placeholderTextColor="#666666"
                style={styles.textInput}
                editable={false}
                selectTextOnFocus={false}
                value={phone}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome name="genderless" size={20} />
              <Text style={{ fontSize: 20, fontWeight: "100", marginLeft: 10 }}>
                Giới tính :
              </Text>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                style={{
                  width: 100,
                  marginLeft: 5,
                  marginTop: -12,
                }}
              >
                <Picker.Item label="Nam" value="Nam" />
                <Picker.Item label="Nữ" value="Nữ" />
              </Picker>
            </View>
            <View style={styles.action}>
              <DatePicker
                style={{
                  width: 200,
                  marginLeft: -7,
                  fontSize: 20,
                  marginTop: -10,
                }}
                date={date}
                mode="date"
                placeholder="Ngày sinh"
                format="DD-MM-YYYY"
                minDate="01-01-1925-"
                maxDate="12-12-2021-"
                androidVariant
                confirmBtnText="Xác nhận"
                cancelBtnText="Hủy"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={(date) => {
                  setDate(date);
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.commandButton}
              //disabled={true}
              onPress={onUpdate}
            >
              <Text style={styles.panelButtonTitle1}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container3: {
    flex: 1,
    marginTop: 5,
  },
  container2: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  container1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    marginVertical: 5,
    fontSize: 15,
  },
  touchableOpacity: {
    alignSelf: "stretch",
    paddingHorizontal: 15,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "green",
    alignItems: "center",
    marginTop: 30,
    width: 350,
  },
  panel: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,

    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header1: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 60,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
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
    alignItems: "center",
    marginVertical: 7,
    width: 210,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0099FF",
  },
  panelButtonTitle1: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  action1: {
    marginTop: 2,
    flexDirection: "column",
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 20,
    // textAlign: "center",
    // fontWeight: "bold",
    // marginBottom: 5,
  },
});
