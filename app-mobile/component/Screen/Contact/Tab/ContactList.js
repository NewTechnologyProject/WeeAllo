import React, { useEffect, useRef, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { ListItem, Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../action/contact.action";
import QRCode from "react-native-qrcode-svg";

const styles = StyleSheet.create({
  container: {},
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

export default function ContactList({ navigation }) {
  const dispatch = useDispatch();
  const allContact = useSelector((state) => state.contact.listcontact);
  const [refreshing, setRefreshing] = useState(false);
  const [contact, setContact] = useState([]);
  const user = useSelector((state) => state.user.userAuth);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  console.log(user);
  useEffect(() => {
    dispatch(actions.fetchAllContact(user));
  }, [user]);
  useEffect(() => {
    if (allContact) {
      setContact(allContact);
    }
  }, [allContact]);
  const toReceive = () => {
    navigation.navigate("MyContact");
  };

  const toDevice = () => {
    dispatch(actions.getJsonString([], user));
    navigation.navigate("DeviceContact");
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(actions.fetchAllContact(user));
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const toDetail = (id) => {
    navigation.navigate('DetailContact', { idDetail: id })
  }

  return (
    <View style={styles.container}>
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <TouchableOpacity onPress={toReceive}>
            <ListItem
              containerStyle={{
                marginTop: -5,
              }}
            >
              <Icon
                reverse={true}
                reverseColor=""
                name="user-plus"
                type="font-awesome-5"
                color="#5cc8d7"
                size={20}
              />
              <ListItem.Content>
                <ListItem.Title>{"Lời mời kết bạn"}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={toDevice}>
            <ListItem
              topDivider
              containerStyle={{
                marginTop: -5,
              }}
            >
              <Icon
                reverse={true}
                reverseColor=""
                name="address-book"
                type="font-awesome-5"
                color="#447d00"
                size={20}
              />
              <ListItem.Content>
                <ListItem.Title>{"Duyệt trong danh bạ"}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
          <Text style={{ padding: 10 }}>
            Tất cả liên hệ ( {contact.length ? contact.length : "0"} )
          </Text>
          {contact.map((c, i) => (
            <ListItem key={i}>
              <Avatar rounded size={50} source={{ uri: c.avartar }} />
              <ListItem.Content>
                <ListItem.Title>
                  {c.firstname + " " + c.lastname}
                </ListItem.Title>
              </ListItem.Content>
              <TouchableOpacity
                onPress={() => toDetail(c.phone)}>
                <Icon
                  name="ellipsis-h"
                  type="font-awesome-5"
                  color={"#868e96"}
                  size={20}
                />
              </TouchableOpacity>
            </ListItem>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
