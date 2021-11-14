import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

import { Avatar, Icon, Tab } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import imagePath from "../../constants/imagePath";
import firebase from "firebase";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: "30%",
    padding: 40,
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  // img: {
  //     textAlign: 'center',
  // }
});

export default function ForgotPass({ navigation }) {
  const [phone, setPhone] = React.useState(false);
  const forgotpass = () => {
    navigation.navigate("ForgotOTP");
  };
  const initialFieldValues = {
    phone: phone,
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
      .catch((error) => {});
  };
  return (
    <View style={styles.container}>
      <div id="sign-in-button"></div>
      <Text style={styles.text}>QUÊN MẬT KHẨU</Text>
      <Avatar
        size={60}
        source={imagePath.icLogo}
        containerStyle={{
          marginBottom: 25,
        }}
      />
      <Input
        placeholder="Nhập số điện thoại"
        name="phone"
        onChangeText={(e) => setPhone(e)}
        value={phone}
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
        title="Xác nhận"
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
        onPress={() => forgotpass()}
      />
    </View>
  );
}
