import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  Animated,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-datepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";
//import ImagePicker from "react-native-image-crop-picker";

export default function EditProfile() {
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
              <TouchableOpacity style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>Chụp ảnh mới</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.panelButton}
                onPress={choosePhoto}
              >
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
  const [date, setDate] = useState("");
  const [animationValue, setAnimationValue] = useState(-1000);
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

  //   const takePhoto = () => {
  //     ImagePicker.openPicker({
  //       width: 300,
  //       height: 400,
  //       cropping: true,
  //     }).then((image) => {
  //       console.log(image);
  //     });
  //   };

  const choosePhoto = () => {
    console.log("ckci");
  };

  return (
    <>
      <BottomSheet
        onCancel={() => {
          toggleAnimation();
        }}
        animation={showAnimation}
      />
      <View
        style={styles.container}
        onTouchStart={() => {
          if (animationValue === 0) {
            toggleAnimation();
          }
        }}
      >
        <View style={{ margin: -50 }}>
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
                    uri: "https://avatarfiles.alphacoders.com/299/thumb-299996.jpg",
                  }}
                  style={{ height: 150, width: 150 }}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <View style={{ marginTop: 126, marginLeft: 124 }}>
                    <Icon
                      name="camera"
                      size={25}
                      style={{
                        opacity: 0.7,
                        color: "green",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    ></Icon>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{ marginTop: 35, fontSize: 18, fontWeight: "bold" }}>
              Alex Nguyễn
            </Text>
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} />
            <TextInput
              placeholder="Họ"
              autoCorrect={false}
              placeholderTextColor="#666666"
              style={styles.textInput}
            />
            {/* <FontAwesome name="user-o" size={20} />
            <TextInput
              placeholder="Tên"
              autoCorrect={false}
              placeholderTextColor="#666666"
              style={styles.textInput}
            /> */}
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} />
            <TextInput
              placeholder="Tên"
              autoCorrect={false}
              placeholderTextColor="#666666"
              style={styles.textInput}
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
            />
          </View>

          <View style={styles.action}>
            <DatePicker
              style={{ width: 200, marginLeft: -7 }}
              date={date}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="1925-01-01"
              maxDate="2021-12-12"
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
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.commandButton}
            onPress={() => {
              alert("commit success");
            }}
          >
            <Text style={styles.panelButtonTitle1}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    //marginLeft: -80,
    // marginRight: -80,
  },
  header1: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    // marginLeft: -80,
    //marginLeft: -80,
    //marginRight: -80,
  },
  panelHeader: {
    alignItems: "center",
    //justifyContent: "center",
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
    //marginLeft: -120,
  },
  action1: {
    // flexDirection: "row",
    marginTop: 30,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    //marginLeft: -120,
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
    //marginTop: Platform.OS === "android" ? 0 : -7,
    paddingLeft: 10,
    color: "#05375a",
  },
});
