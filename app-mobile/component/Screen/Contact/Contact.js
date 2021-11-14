import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ContactList from "./Tab/ContactList";
import { Avatar, Badge, Header, ListItem } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ContactGroupList from "./Tab/ContactGroupList";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import * as actions from "../../../action/contact.action";
import { Icon } from "react-native-elements/dist/icons/Icon";
// import { QRCode } from 'react-native-custom-qr-codes-expo';
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

export default function Contact({ navigation }) {
  const dispatch = useDispatch();
  const [textSearch, setTextSearch] = useState("");
  const listSearch = useSelector((state) => state.contact.listSearchMobile);
  const [listSearchFriend, setListSearch] = useState([]);
  const [change, setChange] = useState(false);
  const [change1, setChange1] = useState(false);
  const [change2, setChange2] = useState(false);
  useEffect(() => {
    if (listSearch) {
      setListSearch(listSearch);
    }
  });
  const renderStatus = (status) => {
    if (status === "none") {
      return !change1 ? (
        <Badge
          containerStyle={{ fontSize: 10 }}
          value="Chưa là bạn bè"
          status="error"
        />
      ) : (
        <Badge
          containerStyle={{ fontSize: 10 }}
          value="Đã gửi lời mời kết bạn"
          status="primary"
        />
      );
    } else if (status === "friend") {
      return (
        <Badge
          containerStyle={{ fontSize: 10 }}
          value="Bạn bè"
          status="success"
        />
      );
    } else if (status === "receive") {
      return !change2 ? (
        <Badge
          containerStyle={{ fontSize: 10 }}
          value="Đã gửi lời mời kết bạn"
          status="primary"
        />
      ) : (
        <Badge
          containerStyle={{ fontSize: 10 }}
          value="Chưa là bạn bè"
          status="error"
        />
      );
    } else if (status === "send") {
      return change ? (
        <Badge
          containerStyle={{ fontSize: 10 }}
          value="Bạn bè"
          status="success"
        />
      ) : (
        <Badge
          containerStyle={{ fontSize: 10 }}
          value="Đã nhận lời mời kết bạn"
          status="warning"
        />
      );
    } else if (status === "you") {
      return (
        <Badge
          containerStyle={{ fontSize: 10 }}
          value="Tài khoản của bạn"
          status="success"
        />
      );
    }
  };
  const toDetail = (id) => {
    navigation.navigate("DetailContact", { idDetail: id });
  };
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
            onChangeText={(e) => {
              setTextSearch(e);
              dispatch(actions.searchContactMobile(1, e));
            }}
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
      {!textSearch.length ? (
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
      ) : (
        <View>
          <Text style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }}>
            Danh sách người dùng được tìm thấy ({" "}
            {listSearchFriend.length ? listSearchFriend.length : "0"} )
          </Text>
          <ScrollView>
            {listSearchFriend.length ? (
              listSearchFriend.map((c, i) => (
                <TouchableOpacity key={i}>
                  <ListItem
                    containerStyle={{
                      marginTop: -5,
                    }}
                  >
                    <Avatar rounded size={50} source={{ uri: c.avartar }} />
                    <ListItem.Content>
                      <ListItem.Title>
                        {c.firstname && c.lastname
                          ? c.firstname + " " + c.lastname
                          : "Noname"}
                      </ListItem.Title>
                      <Text style={{ paddingTop: 5, paddingBottom: 5 }}>
                        {renderStatus(c.status)}
                      </Text>
                      <ListItem.Subtitle>
                        {c.phone ? c.phone : "000-000-0000"}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <TouchableOpacity onPress={() => toDetail(c.id)}>
                      <Icon
                        name="ellipsis-h"
                        type="font-awesome-5"
                        color={"#868e96"}
                        size={20}
                      />
                    </TouchableOpacity>
                  </ListItem>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ alignItems: "center" }}>
                <Icon
                  name="search"
                  type="font-awesome-5"
                  color={"gray"}
                  size={50}
                  containerStyle={{
                    margin: 30,
                  }}
                />
                <Text>Không tìm thấy kết quả</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
