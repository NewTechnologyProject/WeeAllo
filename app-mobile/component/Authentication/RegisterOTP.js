import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import { Avatar, Icon, Tab } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import imagePath from "../../constants/imagePath";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../action/user.action";
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

export default function RegisterOTP({ navigation }) {
  const [disable, setDisable] = React.useState(false);
  const dispatch = useDispatch();
  const [otp, setOtp] = React.useState("");
  const initialFieldValues = {
    otp: otp,
  };
  const registerOTP = (e) => {
    onSubmitOTP();
    setTimeout(() => {
      setDisable(true);
      navigation.navigate("Login");
    }, 8000);
  };
  const onSubmitOTP = (e) => {
    // e.preventDefault();
    const code = initialFieldValues.otp;
    console.log(code);
    if (code.length) {
      window.confirmationResult.confirm(code).then((result) => {
        //    const user = result.user;
        //    console.log(JSON.stringify(user));
        //     dispatch(actions.register(values));
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      });
    } else {
      //   console.log("hihi");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>XÁC THỰC OTP</Text>
      <Avatar
        size={60}
        source={imagePath.icLogo}
        containerStyle={{
          marginBottom: 25,
        }}
      />
      <Input
        placeholder="OTP"
        name="OTP"
        onChangeText={(e) => setOtp(e)}
        value={otp}
        leftIcon={
          <Icon
            name="user-alt"
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
        onPress={() => registerOTP()}
      />
    </View>
  );
}
