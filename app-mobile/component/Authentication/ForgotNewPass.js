import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

import { Avatar, Icon, Tab } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import imagePath from "../../constants/imagePath";
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

export default function ForgotNewPass({ navigation }) {
  const forgotnewpass = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MẬT KHẨU MỚI</Text>
      <Avatar
        size={60}
        source={imagePath.icLogo}
        containerStyle={{
          marginBottom: 25,
        }}
      />
      <Input
        placeholder="Mật khẩu cũ"
        leftIcon={
          <Icon
            name="unlock-alt"
            type="font-awesome-5"
            color={"#098524"}
            style={{ paddingRight: 15 }}
          />
        }
      />
      <Input
        placeholder="Mật khẩu mới"
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
        onPress={() => forgotnewpass()}
      />
    </View>
  );
}
