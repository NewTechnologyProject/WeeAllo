import React from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import { Avatar, Icon, Tab } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import imagePath from "../../constants/imagePath";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../action/user.action";
import { isAuthenticated } from "../../action/user.action";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -300,
    padding: 40,
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  // img: {
  //     textAlign: 'center',
  // }
});

export default function Login({ navigation }) {
  const SET_USER_AUTHENTICATE = "user_authenticated";
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.login);
  const user1 = useSelector((state) => state.user.userAuth);
  const dispatch = useDispatch();
  console.log("userauth", user1);

  function onLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    dispatch(actions.login(phone, pass));
  }, [phone, pass]);
  const login = async () => {
    if (user === "") {
      Alert.alert(
        "Thông báo!",
        "Số điện thoại hoặc mật khẩu không chính xác - Vui lòng nhập lại !",
        [
          {
            text: "Xác nhận",
          },
        ]
      );
    } else {
      await dispatch(actions.isAuthenticated(user.id));
      //await AsyncStorage.setItem("user_authenticated", JSON.stringify(user.id));
      //AsyncStorage.setItem("user_authenticated", user.id);
      onLoading();
      setTimeout(() => {
        navigation.navigate("TabRoute", { screen: "Tin Nhắn" });
      }, 2000);
      const a = await AsyncStorage.getItem("user_authenticated");
      console.log(JSON.stringify(a));
    }
    //console.log("user id", user.id);
    //console.log("async", AsyncStorage.getItem("user_authenticated"));
    //console.log("userauth", user1);

    //navigation.navigate("TabRoute");
  };
  const getMyStringValue = async () => {
    try {
      const a = await AsyncStorage.getItem("user_authenticated");
      console.log(a);
    } catch (e) {
      // read error
    }

    console.log("Done.");
  };
  const register = () => {
    navigation.navigate("Register");
  };
  const forgot = () => {
    navigation.navigate("ForgotPass");
  };
  return (
    <>
      <View style={[styles.container1, styles.horizontal]}>
        <ActivityIndicator animating={loading} size="large" color="#0000ff" />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>ĐĂNG NHẬP</Text>
        <Avatar
          size={60}
          source={imagePath.icLogo}
          containerStyle={{
            marginBottom: 25,
          }}
        />
        <Input
          placeholder="Nhập số điện thoại"
          keyboardType="numeric"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          leftIcon={
            <Icon
              name="user-alt"
              type="font-awesome-5"
              color={"#098524"}
              style={{ paddingRight: 15 }}
            />
          }
        />
        <Input
          placeholder="Nhập mật khẩu"
          value={pass}
          onChangeText={(text) => setPass(text)}
          secureTextEntry={true}
          leftIcon={
            <Icon
              name="key"
              type="font-awesome-5"
              color={"#098524"}
              style={{ paddingRight: 15 }}
            />
          }
        />
        <Button
          title="ĐĂNG NHẬP"
          type="outline"
          containerStyle={{
            backgroundColor: "#098524",
            borderRadius: 20,
            border: "none",
            width: "100%",
            color: "white",
          }}
          titleStyle={{
            color: "white",
          }}
          onPress={() => login()}
        />
        <Button
          title="Đăng ký"
          onPress={() => register()}
          titleStyle={{
            color: "#039BE5",
          }}
          type="clear"
        />
        <Button
          title="Quên mật khẩu"
          onPress={() => forgot()}
          titleStyle={{
            color: "#039BE5",
          }}
          type="clear"
        />
      </View>
    </>
  );
}
