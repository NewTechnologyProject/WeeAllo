import React from "react";

import {
  SectionList,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Alert,
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
import OTPInputView from "@twotalltotems/react-native-otp-input";
import PasswordInputText from "react-native-hide-show-password-input";

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
} catch (err) {
  // ignore app already initialized error in snack
}
export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const [phone, setPhone] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneerror, setPhoneError] = React.useState(false);
  const [firsterror, setFirstError] = React.useState("");
  const [lasterror, setLastError] = React.useState(false);
  const [passerror, setPassError] = React.useState(false);
  const [hidePass, setHidePass] = useState(true);
  const recaptchaVerifier = React.useRef(null);
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const [verificationId, setVerificationId] = React.useState();
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const [code, setCode] = React.useState("");
  const [errorOtp, setErrorOtp] = React.useState("");
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
        text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
      }
      : undefined
  );
  const [screen, setScreen] = React.useState(true);
  // let err = 0;
  // user.map((user) => {
  //   if (user.phone.toLowerCase() === fieldValues.phone.toLowerCase()) {
  //     err = err + 1;
  //   }
  // });
  // let temp = { ...errors };
  const handleSubmit = () => {
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
        "https://file-upload-weeallo-02937.s3.ap-southeast-1.amazonaws.com/1639117409210-user.png",
      coverImage: null,
      status: null,
      contactList: null,
      contactList1: null,
      toDoUserList: null,
      messageList: null,
      userGroupList: null,
    };
    dispatch(actions.register(initialFieldValues));
  };
  const first = () => {
    const regfirst =
      /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]+$/;
    if (regfirst.test(firstname) === false) {
      setFirstError(true);
    } else {
      setFirstError(false);
    }

    return true;
  };
  const last = () => {
    const reglast =
      /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]+$/;

    if (reglast.test(lastname) === false) setLastError(true);
    else setLastError(false);

    return true;
  };
  const phonee = () => {
    const regphone = /^[0]{1}\d{9}$/;

    if (regphone.test(phone) === false) setPhoneError(true);
    else setPhoneError(false);
    return true;

    // if (err >= 1) {
    //   Alert.alert(
    //     "Thông báo!",
    //     "Số điện thoại hoặc mật khẩu không chính xác - Vui lòng nhập lại !",
    //     [
    //       {
    //         text: "Xác nhận",
    //       },
    //     ]
    //   );
    // }
  };

  const pass = () => {
    const regpass = /^\w{6,200}$/;
    if (regpass.test(password) === false) setPassError(true);
    else setPassError(false);

    return true;
  };

  const validate = () => {
    first();
    last();
    phonee();
    pass();
  };
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Đăng kí thành công tài khoản ! Đăng nhập ngay",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };
  const sendOTP = () => {
    if (validate()) {
      onSignInSubmit();
    }
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
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await firebase.auth().signInWithCredential(credential);
      setErrorOtp("");
      handleSubmit();
      showToastWithGravity();
      setTimeout(() => {
        navigation.navigate("Login");
      }, 5000);
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
      <Text style={styles.text}>ĐĂNG KÝ</Text>
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
            placeholder="Họ"
            name="firstname"
            onChangeText={(e) => setFirstname(e)}
            value={firstname}
            errorStyle={{ color: "red" }}
            errorMessage={firsterror ? "Họ sai định dạng" : ""}
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
            autoCorrect
            errorStyle={{ color: "red" }}
            errorMessage={lasterror ? "Tên sai định dạng" : ""}
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
            autoFocusOnLoad={false}
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
            secureTextEntry={hidePass ? true : false}
            name="password"
            onChangeText={(e) => setPassword(e)}
            value={password}
            autoFocusOnLoad={false}
            errorStyle={{ color: "red" }}
            errorMessage={passerror ? "Mật khẩu sai định dạng" : ""}
            leftIcon={
              <Icon
                name="unlock-alt"
                type="font-awesome-5"
                color={"#098524"}
                style={{ paddingRight: 15 }}
              />
            }
            rightIcon={
              <Icon
                name={hidePass ? "eye-slash" : "eye"}
                type="font-awesome-5"
                size={15}
                color="grey"
                onPress={() => setHidePass(!hidePass)}
              />
            }
          />

          <Button
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
            onPress={() => onSignInSubmit()}
          //onPress={() => sendOTP()}
          //onKeyPress={validate()}
          />
        </View>
      ) : (
        <View style={{ width: "100%" }}>
          <Text>Vui lòng nhập mã OTP bạn đã nhận được</Text>
          <Input
            // style={{ width: '90%', height: 100, color: 'red' }}
            // pinCount={6}
            // placeholderTextColor='black'
            // code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onChangeText={(c) => {
              setCode(c);
            }}
          // leftIcon={
          //   <Icon
          //     name="unlock-alt"
          //     type="font-awesome-5"
          //     color={"#098524"}
          //     style={{ paddingRight: 15 }}
          //   />
          // }
          // editable
          // autoFocusOnLoad={false}
          // codeInputFieldStyle={styles.underlineStyleBase}
          // codeInputHighlightStyle={styles.underlineStyleHighLighted}
          />
          <Text style={{ color: "red", paddingBottom: 10, paddingTop: 10 }}>
            {errorOtp}
          </Text>
          <Button
            title="XÁC THỰC"
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
