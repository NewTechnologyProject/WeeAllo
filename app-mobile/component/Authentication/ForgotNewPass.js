import { PHONE_NUMBERS } from "expo-contacts";
import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

import { Avatar, Icon, Tab } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import imagePath from "../../constants/imagePath";
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

export default function ForgotNewPass({ navigation }) {
  const [newPass, setNewPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const { state } = useLocation();

  const { phone } = state;
  // const initialFieldValues = {
  //   newpass : newpass,
  //   confirmPass:confirmPass,
  // }
  const handleForgot = () => {
    const confirm = confirmPass;
    dispatch(actions.forgotpass(phone, confirm));
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
        type="text"
        placeholder="Mật khẩu mới"
        name="newpass"
        onChangeText={(e) => setNewPass(e)}
        value={newPass}
        leftIcon={
          <Icon
            name="key"
            type="font-awesome-5"
            color={"#098524"}
            style={{ paddingRight: 15 }}
          />
        }
      />
      <Input
        type="text"
        placeholder="Xác nhận mật khẩu "
        name="newpass"
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
        onPress={() => handleForgot()}
      />
    </View>
  );
}
