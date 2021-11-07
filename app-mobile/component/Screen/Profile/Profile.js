import * as React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
export default function Profile({ navigation }) {
  const [getValue, setGetValue] = React.useState("");
  const logout = () => {
    navigation.navigate("Login");
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
    </View>
  );
}
