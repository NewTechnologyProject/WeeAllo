import React from "react";

import { SectionList, StyleSheet, Text, View } from "react-native";
import { Avatar, Icon, Tab } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import imagePath from "../../constants/imagePath";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../action/user.action";

import firebase from "./firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: "15%",
    padding: 40,
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const [disable, setDisable] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneerror, setPhoneError] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstnameerror, setFirstNameError] = React.useState(false);
  const [lastnameerror, setLastNameError] = React.useState(false);
  const [passworderror, setPassWordError] = React.useState(false);

  // const register = (e) => {


  const handleSubmit = (e) => {
    // console.log(initialFieldValues.phone);
    if (validate) {
      const initialFieldValues = {
        phone: phone,
        firstname: firstname,
        email: null,
        lastname: lastname,
        password: password,
        isActive: "false",
        createAt: null,
        updateAt: null,
        avartar:
          "https://file-upload-weeallo-02937.s3.ap-southeast-1.amazonaws.com/1635056501152-user.png",
        coverImage: null,
        status: null,
        contactList: null,
        contactList1: null,
        toDoUserList: null,
        messageList: null,
        userGroupList: null,
      };
      dispatch(actions.register(initialFieldValues));
    }
    // onSignInSubmit(e);
    // setTimeout(() => {
    //   setDisable(true);
    //   navigation.navigate("RegisterOTP");
    // }, 8000);
  };

  const validate = () => {
    const regphone = /^[0]{1}\d{9}$/;
    const regfirst =
      /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*\s*[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*$/;
    const reglast =
      /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*\s*[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*$/;
    const regpass = /^\w{6,200}$/;
    if (regphone.test(phone) === false) {
      setPhoneError(true);
      return false;
    } else if (regphone.test(phone) == false) {
      setPhoneError(false);
    } else if (regfirst.test(firstname) === false) {
      setFirstNameError(false);
      return false;
    } else if (reglast.test(lastname) === false) {
      setLastNameError(false);
      return false;
    } else if (regpass.test(password) === false) {
      setPassWordError(false);
      return false;
    }
    return true;
  };
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };
  const onSignInSubmit = () => {
    //e.preventDefault();
    configureCaptcha();
    const phoneNumber = "+84" + initialFieldValues.phone;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP đã gởi");
      })
      .catch((error) => { });
  };
  return (
    <View style={styles.container}>
      <View id="sign-in-button"></View>
      <Text style={styles.text}>ĐĂNG KÝ</Text>
      <Avatar
        size={60}
        source={imagePath.icLogo}
        containerStyle={{
          marginBottom: 25,
        }}
      />
      <Input
        type="text"
        placeholder="Họ"
        name="firstname"
        onChangeText={(e) => setFirstname(e)}
        value={firstname}
        errorStyle={{ color: "red" }}
        errorMessage={firstnameerror ? "Họ sai định dạng" : ""}
        leftIcon={
          <Icon
            name="user"
            type="font-awesome-5"
            color={"#098524"}
            style={{ paddingRight: 15 }}
          />
        }
      />
      <Input
        placeholder="Tên"
        name="lastname"
        onChangeText={(e) => setLastname(e)}
        value={lastname}
        errorStyle={{ color: "red" }}
        errorMessage={lastnameerror ? "Tên sai định dạng" : ""}
        leftIcon={
          <Icon
            name="user"
            type="font-awesome-5"
            color={"#098524"}
            style={{ paddingRight: 15 }}
          />
        }
      />
      <Input
        placeholder="Nhập số điện thoại"
        name="phone"
        onChangeText={(e) => setPhone(e)}
        value={phone}
        errorStyle={{ color: "red" }}
        errorMessage={phoneerror ? "Số điện thoại sai định dạng" : ""}
        leftIcon={
          <Icon
            name="phone"
            type="font-awesome-5"
            color={"#098524"}
            style={{ paddingRight: 15 }}
          />
        }
      />
      <Input
        ecureTextEntry={true}
        placeholder="Nhập mật khẩu"
        secureTextEntry={true}
        name="password"
        onChangeText={(e) => setPassword(e)}
        value={password}
        errorStyle={{ color: "red" }}
        errorMessage={passworderror ? "Mật khẩu sai định dạng" : ""}
        leftIcon={
          <Icon
            name="unlock-alt"
            type="font-awesome-5"
            color={"#098524"}
            style={{ paddingRight: 15 }}
          />
        }
      />
      <Button
        disabled={disable}
        title="ĐĂNG KÝ"
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
        onPress={() => handleSubmit()}
      />
    </View>
  );
}
