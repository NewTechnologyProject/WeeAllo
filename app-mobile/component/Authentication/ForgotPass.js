import React from "react";

import {
  SectionList,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from "react-native";
import { Avatar, Icon, Tab } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import imagePath from "../../constants/imagePath";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../action/user.action";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 40,
    height: 55,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "black",
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
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
try {
  firebase.initializeApp({
    apiKey: "AIzaSyC7KjSz0O2gNyhnNJALV6kqlaNPnKtking",
    authDomain: "otpweallo.firebaseapp.com",
    projectId: "otpweallo",
    storageBucket: "otpweallo.appspot.com",
    messagingSenderId: "901919772342",
    appId: "1:901919772342:web:24a4881f61fcacf70c2017",
    measurementId: "G-6WM7TLPPPQ",
  });
} catch (err) {}

export default function ForgotPass({ navigation }) {
  const [confirmPass, setConfirmPass] = React.useState("");
  const [errorOtp, setErrorOtp] = React.useState("");
  const [code, setCode] = React.useState("");
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
          text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );
  const initialFieldValues = {
    phone: phone,
  };
  const [screen, setScreen] = React.useState(true);
  const recaptchaVerifier = React.useRef(null);
  const [verificationId, setVerificationId] = React.useState();
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const [phone, setPhone] = React.useState("");
  const [phoneerror, setPhoneError] = React.useState(false);
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Thay đổi mật khẩu thành công ! Đăng nhập ngay",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };
  const onSignInSubmit = async () => {
    const phoneNumber = "+84" + phone;
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      showMessage({
        text: "Đã gữi mã OTP đến số điện thoại này",
      });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: "red" });
    }
    setScreen(false);
  };

  const onSubitOTP = async () => {
    const phoneNumber = phone;
    const newpass = confirmPass;
    console.log(phoneNumber);
    console.log(newpass);
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await firebase.auth().signInWithCredential(credential);
      setErrorOtp("");
      showToastWithGravity();
      navigation.navigate("Login");
      dispatch(actions.forgotpass(phoneNumber, newpass));
    } catch (err) {
      setErrorOtp("Mã xác thực sai ! Vui lòng kiểm tra lại");
    }
  };
  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        title="Vui lòng xác nhận!"
        cancelLabel="Đóng"
        containerStyle={{
          textAlign: "center",
        }}
      />
      <Text style={styles.text}>QUÊN MẬT KHẨU</Text>
      <Avatar
        size={60}
        source={imagePath.icLogo}
        containerStyle={{
          marginBottom: 25,
        }}
      />
      {screen ? (
        <View style={{ width: "100%" }}>
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

          <Button
            title="XÁC NHẬN"
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
            onPress={() => onSignInSubmit()}
          />
        </View>
      ) : (
        <View style={{ width: "100%" }}>
          <Input
            placeholder="Nhập mã OTP"
            leftIcon={
              <Icon
                name="key"
                type="font-awesome-5"
                color={"#098524"}
                style={{ paddingRight: 15 }}
              />
            }
            onChangeText={(c) => {
              setCode(c);
            }}
          />
          <Text style={{ color: "red", paddingBottom: 10, paddingTop: 10 }}>
            {errorOtp}
          </Text>
          <Input
            type="text"
            placeholder="Nhập mật khẩu mới"
            name="confirmpass"
            onChangeText={(e) => setConfirmPass(e)}
            value={confirmPass}
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
            title="XÁC NHẬN"
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
            onPress={() => onSubitOTP()}
          />
        </View>
      )}
    </View>
  );
}
