import { RefreshControl, ScrollView, SectionList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StyleSheet, Alert } from "react-native";
import { ListItem, Avatar, Badge, ButtonGroup, Button } from 'react-native-elements'
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../action/contact.action"
export default function SendContact({ navigation, route }) {
    const styles = StyleSheet.create({
        avatar: {
            borderRadius: 1
        },
        container: {
            flex: 1
        },
        chatInput: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            height: 55,
            borderWidth: 1,
            borderColor: 'white',
            borderTopColor: '#D8D8D8',
            flexDirection: 'row',
        },
        viewStyle: {
            flexDirection: 'row',
        },
    });
    const dispatch = useDispatch();
    const sendContact = useSelector((state) => state.contact.listSend);
    const [refreshing, setRefreshing] = useState(false);
    const [allSendContact, setAllSendContact] = useState([])
    const user = useSelector((state) => state.user.userAuth);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    useEffect(() => {
        dispatch(actions.fetchSendContact(user));
    }, []);
    useEffect(() => {
        if (sendContact) {
            setAllSendContact(sendContact)
        }
    }, [sendContact])
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(actions.fetchSendContact(user));
        wait(2000).then(() => setRefreshing(false));
    }, []);
    const onAccept = () => {

    }
    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >

                {
                    allSendContact.length ?
                        allSendContact.map((c, i) => (
                            <ListItem key={i}
                            >
                                <Avatar rounded size={50} source={{ uri: c.avartar }} />
                                <ListItem.Content >
                                    <ListItem.Title>{c.firstname + " " + c.lastname}</ListItem.Title>
                                    <ListItem.Subtitle>{"Đã gửi lời mời kết bạn !"}</ListItem.Subtitle>
                                </ListItem.Content>
                                <View>
                                    <Button type="outline" title="Hủy lời mời"
                                        containerStyle={{
                                            paddingTop: 5,
                                            paddingRight: 5
                                        }}
                                        buttonStyle={{
                                            height: 35,
                                            width: 90,
                                            borderColor: "#8B0016",
                                            borderRadius: 30,
                                            backgroundColor: '#8B0016',
                                        }}
                                        titleStyle={
                                            {
                                                fontSize: 13,
                                                color: '#ffffff'
                                            }
                                        }
                                        onPress={() => {
                                            dispatch(actions.deleteSendContact(user, c.id))
                                            Alert.alert(
                                                "Bạn bè",
                                                "Đã hủy lời mời kết bạn đến " + c.firstname + " " + c.lastname,
                                                [
                                                    {
                                                        text: "Xác nhận",
                                                        style: "default"
                                                    },
                                                ]
                                            );
                                        }}
                                    />
                                </View>

                            </ListItem>
                        ))
                        :
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ paddingTop: 40 }}>Chưa gửi lời mời kết bạn nào !</Text>
                        </View>
                }
            </ScrollView>
        </View>
    );
}