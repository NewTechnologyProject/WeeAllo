import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Chat from "../Screen/Chat/Chat";
import Contact from "../Screen/Contact/Contact";
import Profile from "../Screen/Profile/Profile";
import { Image } from "react-native";
import { Icon } from "react-native-elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { useState, useEffect } from "react";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import ForgotPass from "../Authentication/ForgotPass";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatContent from "../Screen/Chat/ChatScreen/ChatContent";
export default function TabRoute({ navigation }) {
  const [index, setIndex] = useState(0);
  const [getValue, setGetValue] = useState(null);
  // useEffect(() => {
  //     AsyncStorage.getItem("user_authenticated").then((value) => {
  //         setGetValue(value);
  //         console.log(value)
  //     })
  //         .then(res => {

  //         });

  // })
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#098524",
        },
        headerTintColor: "white",
        tabBarActiveTintColor: "#098524",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        size: 20,
        tabBarItemStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Tin nhắn"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="comment"
                type="font-awesome-5"
                color={focused ? "#098524" : "gray"}
                size={focused ? 21 : 17}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Danh bạ"
        component={Contact}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="address-book"
                type="font-awesome-5"
                color={focused ? "#098524" : "gray"}
                size={focused ? 21 : 17}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Tài khoản"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="user"
                type="font-awesome-5"
                color={focused ? "#098524" : "gray"}
                size={focused ? 21 : 17}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
