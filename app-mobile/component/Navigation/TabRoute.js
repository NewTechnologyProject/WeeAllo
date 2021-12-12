import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Chat from "../Screen/Chat/Chat";
import Contact from "../Screen/Contact/Contact";
import Profile from "../Screen/Profile/Profile";
import { Icon } from "react-native-elements";
import { Color } from "../Color/Color";

const Tab = createBottomTabNavigator();

export default function TabRoute({ navigation, route }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#37b24d",
        },
        headerTintColor: "white",
        tabBarActiveTintColor: "#37b24d",
        tabBarInactiveTintColor: "#868e96",
        tabBarShowLabel: true,
        size: 20,
        tabBarItemStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Tin Nhắn"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="comment"
                type="font-awesome-5"
                color={focused ? "#37b24d" : "#868e96"}
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
                color={focused ? "#37b24d" : "#868e96"}
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
                color={focused ? "#37b24d" : "#868e96"}
                size={focused ? 21 : 17}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
