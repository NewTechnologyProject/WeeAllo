import * as React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
export default function Profile({ navigation }) {
  const [getValue, setGetValue] = React.useState("");
  const logout = () => {
    navigation.navigate("Login");
  };
  const register = () => {
    navigation.navigate("Register");
  };
  const forgototp = () => {
    navigation.navigate("ForgotOTP");
  };
  const forgotnewpass = () => {
    navigation.navigate("ForgotNewPass");
  };
  const registerotp = () => {
    navigation.navigate("RegisterOTP");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Dang xuat"
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
        onPress={logout}
      />
      <Button
        title="Dang ky"
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
        onPress={register}
      ></Button>
      <Button
        title="Xac thuc OTP"
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
        onPress={forgototp}
      ></Button>
      <Button
        title="Mat khau moi"
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
        onPress={forgotnewpass}
      ></Button>
      <Button
        title="Dang ky otp"
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
        onPress={registerotp}
      ></Button>
    </View>
  );
}
