import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ContactList from "./Tab/ContactList";
import { Header } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ContactGroupList from "./Tab/ContactGroupList";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";

const Tab = createMaterialTopTabNavigator();
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
  search: {
    backgroundColor: "#37b24d",
  },
});
const theme = {
  Tab: {
    titleStyle: {
      color: "red",
    },
    variant: {
      color: "red",
    },
  },
};
export default function Contact() {
  const [textSearch, setTextSearch] = useState("");
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: "dark-content" }}
        barStyle="dark-content"
        style={styles.header}
        centerComponent={
          <SearchBar
            platform="default"
            cancelButtonTitle=""
            placeholder="Tìm bạn bè..."
            onChangeText={setTextSearch}
            value={textSearch}
            inputStyle={{
              color: "#e6fcf5",
              width: 300,
            }}
            placeholderTextColor="#e6fcf5"
            searchIcon={{ color: "#e6fcf5" }}
            clearIcon={{ color: "#e6fcf5" }}
          />
        }
        containerStyle={{
          backgroundColor: "#37b24d",
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
          tabBarLabelStyle: { fontSize: 12, fontWeight: "700" },
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#adb5bd",
          tabBarPressColor: "#ebfbee",
          tabBarStyle: { backgroundColor: "white" },
          tabBarIndicatorStyle: {
            backgroundColor: "#000",
          },
        }}
      >
        <Tab.Screen name="Liên hệ của tôi" component={ContactList} />
        <Tab.Screen name="Nhóm" component={ContactGroupList} />
      </Tab.Navigator>
    </View>
  );
}
