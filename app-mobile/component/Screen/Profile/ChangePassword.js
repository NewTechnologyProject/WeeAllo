import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Avatar, Icon, Tab } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../action/user.action";
import { isAuthenticated } from "../../../action/user.action";
function ChangePassword(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword1, setHidePassword1] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validnewPassword, setValidnewPassword] = useState(true);
  const user = useSelector((state) => state.user.userAuth);
  const profile = useSelector((state) => state.user.userById);
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState();
  const [userProfile, setUserProfile] = useState([]);
  useEffect(() => {
    dispatch(actions.findByIdUser(user));
  }, []);
  useEffect(() => {
    if (profile !== undefined) {
      setUserProfile(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (userProfile !== undefined) {
      setUserId(userProfile.id);
      setPhone(userProfile.phone);
      //setNewPassWord(userProfile.password);
    }
  }, [userProfile]);
  //console.log("id", phone);
  function showToast() {
    ToastAndroid.show("Đổi mật khẩu thành công", ToastAndroid.SHORT);
  }

  const onUpdate = (data) => {
    const initialFieldValues = {
      phone: phone,
      password: newPassword,
    };
    console.log("newpass", newPassword);

    dispatch(actions.updateUserById(initialFieldValues, userId));
    setPassword("");
    setNewpassword("");
    Alert.alert("Đổi mật khẩu thành công !");
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Nhập mật khẩu mới"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={hidePassword ? true : false}
        leftIcon={
          <Icon
            name="lock"
            secureTextEntry={true}
            type="font-awesome-5"
            color={"#098524"}
            style={{ paddingRight: 15 }}
          />
        }
        rightIcon={
          <Icon
            name={hidePassword ? "visibility" : "visibility-off"}
            size={30}
            color="grey"
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      {/* <Animatable.View animation="fadeInleft" duration={500}>
        <Text style={styles.errMss}>Mật khẩu phải trên 6 kí tự</Text>
      </Animatable.View> */}
      <Input
        placeholder="Nhập lại mật khẩu mới"
        value={newPassword}
        onChangeText={(text) => setNewpassword(text)}
        secureTextEntry={hidePassword1 ? true : false}
        leftIcon={
          <Icon
            name="lock"
            secureTextEntry={true}
            type="font-awesome-5"
            color={"#098524"}
            style={{ paddingRight: 15 }}
          />
        }
        rightIcon={
          <Icon
            name={hidePassword1 ? "visibility" : "visibility-off"}
            size={30}
            color="grey"
            onPress={() => setHidePassword1(!hidePassword1)}
          />
        }
      />

      <TouchableOpacity style={styles.commandButton} onPress={onUpdate}>
        <Text style={styles.panelButtonTitle1}>Đổi mật khẩu</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ChangePassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: "10%",
    padding: 30,
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "green",
    alignItems: "center",
    marginTop: 30,
    width: 350,
  },
  panelButtonTitle1: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  errMss: {
    color: "red",
    fontSize: 15,
    marginLeft: -150,
    marginTop: -5,
  },
  // img: {
  //     textAlign: 'center',
  // }
});
