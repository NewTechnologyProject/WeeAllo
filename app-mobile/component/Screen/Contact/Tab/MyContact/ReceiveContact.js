import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../action/contact.action"
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from "react-native";
import { ListItem, Avatar, Button } from 'react-native-elements'
export default function ReceiveContact({ navigation }) {
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
    const receiveContact = useSelector((state) => state.contact.listReceive);
    const [refreshing, setRefreshing] = useState(false);
    const [allReceiveContact, setAllReceiveContact] = useState([])
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    useEffect(() => {
        dispatch(actions.fetchReceiveContact(1));
    }, []);
    useEffect(() => {
        if (receiveContact) {
            setAllReceiveContact(receiveContact)
        }
    }, [receiveContact])
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(actions.fetchReceiveContact(1));
        wait(2000).then(() => setRefreshing(false));
    }, []);
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
                    allReceiveContact.length ?
                        allReceiveContact.map((c, i) => (
                            <ListItem.Swipeable key={i}
                            >
                                <Avatar rounded size={50} source={{ uri: c.avartar }} />
                                <ListItem.Content >
                                    <ListItem.Title>{c.firstname + " " + c.lastname}</ListItem.Title>
                                    <ListItem.Subtitle>{"Muốn kết bạn"}</ListItem.Subtitle>
                                    <View style={styles.viewStyle}>
                                        <Button type="outline" title="Chấp nhận"
                                            containerStyle={{
                                                paddingTop: 5,
                                                paddingRight: 5
                                            }}
                                            buttonStyle={{
                                                height: 35,
                                                width: 140,
                                                borderColor: "#098524",
                                                borderRadius: 30,
                                                backgroundColor: '#098524',
                                            }}
                                            titleStyle={
                                                {
                                                    fontSize: 13,
                                                    color: '#ffffff'
                                                }
                                            }
                                        />
                                        <Button type="outline" title="Từ chối"
                                            containerStyle={{
                                                paddingTop: 5,
                                                paddingRight: 10
                                            }}
                                            buttonStyle={{
                                                height: 35,
                                                width: 140,
                                                borderRadius: 30,
                                                borderColor: "#EEEEEE",
                                                backgroundColor: '#EEEEEE',
                                            }}
                                            titleStyle={
                                                {
                                                    fontSize: 13,
                                                    color: 'black'
                                                }
                                            }
                                        />
                                    </View>

                                </ListItem.Content>
                            </ListItem.Swipeable>
                        ))
                        : <View style={{ alignItems: 'center' }}>
                            <Text style={{ paddingTop: 40 }}>Chưa nhận lời mời kết bạn nào !</Text>
                        </View>
                }
            </ScrollView>
        </View>
    );
}