import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Header, ListItem } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import { Icon } from "react-native-elements/dist/icons/Icon";
import Scanner from "./Scanner";
import MyQr from "./MyQr";

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
export default function QrTab({ navigation }) {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState("");
    const listSearch = useSelector((state) => state.contact.listSearchMobile);
    const [listSearchFriend, setListSearch] = useState([]);
    useEffect(() => {
        if (listSearch) {
            setListSearch(listSearch)
        }
    })
    const toDetail = (id) => {
        navigation.navigate('DetailContact', { idDetail: id })
    }
    const toQR = () => {
        navigation.navigate('Scanner')
    }
    return (
        <View style={{ flex: 1, paddingTop: 30 }}>
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
                <Tab.Screen name="Quét Mã QR" component={Scanner} />
                <Tab.Screen name="QR Của Tôi" component={MyQr} />
            </Tab.Navigator>
        </View>
    );
}
