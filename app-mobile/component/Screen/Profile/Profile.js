import * as React from "react";
import { useState } from "react";
import { Text, View, ScrollVie, StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import EditProfile from "./EditProfile";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../action/user.action";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChangePassword from "./ChangePassword";
import Profile1 from "./Profile1";
export default function Profile({ navigation }) {
  const Tab = createMaterialTopTabNavigator();
  const SET_USER_AUTHENTICATE = "user_authenticated";
  const user = useSelector((state) => state.user.userAuth);
  const [getValue, setGetValue] = React.useState("");
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(actions.userlogout);
    console.log("id", user.id);
    navigation.navigate("Login");
  };
  const navigateEdit = () => {
    navigation.navigate("EditProfile");
  };
  const [textSearch, setTextSearch] = useState("");
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        centerComponent={<Text>Cài đặt chung</Text>}
        containerStyle={{
          backgroundColor: "#f2f2f2",
          justifyContent: "space-around",
          height: 80,
        }}
        centerContainerStyle={{
          flex: 6,
        }}
        leftContainerStyle={{
          flex: 0,
        }}
        rightContainerStyle={{
          flex: 0,
        }}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: "#098524",
          tabBarPressColor: "black",
          tabBarStyle: { backgroundColor: "white" },
        }}
      >
        <Tab.Screen name=" Thông tin cá nhân" component={Profile1} />
        <Tab.Screen name="Đổi mật khẩu" component={ChangePassword} />
      </Tab.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
