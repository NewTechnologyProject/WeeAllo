import React, { useEffect, useRef, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { ListItem, Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../action/user.action";
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

export default function Profile1({ navigation }) {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState();
  const [image, setImage] = useState(null);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const user = useSelector((state) => state.user.userAuth);
  const profile = useSelector((state) => state.user.userById);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(actions.findByIdUser(1));
  }, []);
  console.log(user)
  useEffect(() => {
    if (profile !== null) {
      setUserProfile(profile);
    }
  }, [profile]);
  useEffect(() => {
    if (userProfile !== null) {
      //setUserId(userProfile.id);
      setImage(userProfile ? userProfile.avartar : "");
      setFirstName(userProfile ? userProfile.firstname : "");
      setLastName(userProfile ? userProfile.lastname : "");
      //   setPhone(userProfile.phone);
      //   setGender(userProfile.gender);
      //   setDate(userProfile.birthday);
    }
  }, [userProfile]);
  const logout = () => {
    dispatch(actions.userlogout);
    console.log("id", user.id);
    navigation.navigate("Login");
  };
  const changeEdit = () => {
    navigation.navigate("EditProfile");
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(actions.fetchAllContact(1));
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View style={styles.container} on>
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <TouchableOpacity onPress={changeEdit}>
            <ListItem
              containerStyle={{
                marginTop: -5,
              }}
            >
              {/* <Icon
                reverse={true}
                reverseColor=""
                name="user-plus"
                type="font-awesome-5"
                color="#5cc8d7"
                size={20}
              /> */}
              <Avatar
                rounded
                source={{
                  uri: userProfile ? userProfile.avartar : "",
                }}
                size="large"
              />
              <ListItem.Content>
                <ListItem.Title>{userProfile ? userProfile.firstname + " " + userProfile.lastname : ""}</ListItem.Title>
                <Text>Sửa thông tin cá nhân</Text>
              </ListItem.Content>
              <Icon
                style={{}}
                reverse={true}
                reverseColor=""
                name="user-edit"
                type="font-awesome-5"
                color="#5cc8d7"
                size={12}
              />
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <ListItem
              topDivider
              containerStyle={{
                marginTop: -10,
              }}
            >
              <Icon
                reverse={true}
                reverseColor=""
                name="sign-out-alt"
                type="font-awesome-5"
                color="#447d00"
                size={25}
              />
              <ListItem.Content style={{ marginLeft: 21 }}>
                <ListItem.Title style={{ fontSize: 16 }}>
                  {"Đăng xuất"}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
