import * as React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Profile() {
  const [getValue, setGetValue] = React.useState("");

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user_authenticated").then(() => {});
    } catch (exception) {
      return false;
    }
  };

  const a = () => {
    AsyncStorage.getItem("user_authenticated").then((value) =>
      setGetValue(value)
    );
    console.log(getValue);
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
        onPress={a}
      />
    </View>
  );
}
