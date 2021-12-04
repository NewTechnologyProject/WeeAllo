import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header } from 'react-native-elements/dist/header/Header';
import { Badge, Button, Icon, ListItem, SearchBar } from 'react-native-elements'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import imagePath from '../../../../../constants/imagePath';
import * as actions from "../../../../../action/contact.action"
import * as Contacts from 'expo-contacts';
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
const Tab = createMaterialTopTabNavigator();
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function DeviceContact({ navigation, route }) {
    const styles = StyleSheet.create({
        avatar: {
            borderRadius: 1
        },
        container: {
            flex: 1,
            alignItems: 'center'
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
        }
    });
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState('')
    const listDevice = useSelector((state) => state.contact.listDeviceContact);
    const [refreshing, setRefreshing] = useState(false);
    const [contactDevice, setContactDevice] = useState([]);
    const [change, setChange] = useState(false);
    const [change1, setChange1] = useState(false);
    const [change2, setChange2] = useState(false);
    const [animate, setAnimate] = useState(false);
    const user = useSelector((state) => state.user.userAuth);
    const backToAllChat = () => {
        navigation.navigate('TabRoute')
        setNull()
    }
    const toDetail = (id) => {
        navigation.navigate('DetailContact', { idDetail: id })
    }
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    setContacts(data)
                }
            }
        })();
    }, []);
    const getContactInDevice = () => {
        if (contacts) {
            dispatch(actions.getJsonString(contacts, 1));
            wait(3000).then(() => setAnimate(false));
        }
    }
    const onRefresh = React.useCallback(() => {
        async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    setContacts(data)
                }
            }
        }
        setRefreshing(true);
        getContactInDevice()
        wait(2000).then(() => setRefreshing(false));
    }, []);
    useEffect(() => {
        if (listDevice) {
            setContactDevice(listDevice)
        }
    }, [listDevice])
    const setNull = () => {
        setContactDevice([])
    }
    const renderStatus = (status) => {
        if (status === 'none') {
            return (
                !change1 ?
                    <Badge containerStyle={{ fontSize: 10 }} value="Chưa là bạn bè" status="error" />
                    : <Badge containerStyle={{ fontSize: 10 }} value="Đã gửi lời mời kết bạn" status="primary" />
            )
        }
        else if (status === 'friend') {
            return (
                <Badge containerStyle={{ fontSize: 10 }} value="Bạn bè" status="success" />
            )
        }
        else if (status === 'receive') {
            return (
                !change2 ?
                    <Badge containerStyle={{ fontSize: 10 }} value="Đã gửi lời mời kết bạn" status="primary" /> :
                    <Badge containerStyle={{ fontSize: 10 }} value="Chưa là bạn bè" status="error" />
            )
        }
        else if (status === 'send') {
            return (
                change ? <Badge containerStyle={{ fontSize: 10 }} value="Bạn bè" status="success" />
                    :
                    <Badge containerStyle={{ fontSize: 10 }} value="Đã nhận lời mời kết bạn" status="warning" />
            )
        }
        else if (status === 'you') {
            return (
                <Badge containerStyle={{ fontSize: 10 }} value="Tài khoản của bạn" status="success" />
            )
        }
    }
    return (
        <View >
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                barStyle="light-content"
                centerComponent={{ text: 'Bạn từ danh bạ', style: { color: '#fff' } }}
                leftComponent={
                    < Icon
                        name='chevron-left'
                        type='font-awesome-5'
                        color={'white'}
                        size={25}
                        onPress={backToAllChat}
                    />
                }
                rightComponent={<Icon
                    name='bars'
                    type='font-awesome-5'
                    color={'white'}
                    size={25}
                />}
                containerStyle={{
                    backgroundColor: '#098524',
                    justifyContent: 'space-around',
                }}
            />

            {
                contacts.length ?
                    <View>
                        <SearchBar
                            platform='default'
                            lightTheme='white'
                            cancelButtonTitle=''
                            placeholder="Tìm danh bạ..."
                            onChangeText={setTextSearch}
                            value={textSearch}
                            inputStyle={{
                                color: 'black',
                                width: 300,
                                fontSize: 14,
                            }}
                            inputContainerStyle={{
                                height: 35
                            }}
                            containerStyle={{
                            }}
                            placeholderTextColor='black'
                        />
                        <Text style={{ padding: 10 }}>Danh bạ trong máy</Text>
                    </View>
                    : null
            }
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {
                    contactDevice.length ?
                        contactDevice.map((c, i) => (
                            <TouchableOpacity key={i}>
                                <ListItem
                                    containerStyle={{
                                        marginTop: -5,
                                    }}>
                                    <Avatar rounded size={50} source={{ uri: c.avartar }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{c.firstname && c.lastname ? c.firstname + " " + c.lastname : "Noname"}</ListItem.Title>
                                        <Text style={{ paddingTop: 5, paddingBottom: 5 }}>{renderStatus(c.status)}</Text>
                                        <ListItem.Subtitle>{c.phone ? c.phone : "000-000-0000"}</ListItem.Subtitle>
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
                            </TouchableOpacity>

                        )) :
                        <View style={styles.container}>
                            <Image source={imagePath.info}
                                style={{ width: 200, height: 400 }}
                            />
                            <Text style={{ textAlign: 'center' }}>Kiểm tra danh bạ của bạn xem các tài khoản đã tham gia WeeAllo</Text>
                            <Button type="outline" title="KIỂM TRA DANH BẠ"
                                onPress={() => {
                                    getContactInDevice();
                                }}
                                containerStyle={{
                                    paddingTop: 20,
                                    paddingRight: 10
                                }}
                                buttonStyle={{
                                    height: 35,
                                    width: 200,
                                    borderRadius: 30,
                                    borderColor: "#098524",
                                    backgroundColor: '#098524',
                                }}
                                titleStyle={
                                    {
                                        fontSize: 13,
                                        color: 'white',
                                    }
                                }
                            />

                        </View>
                }
            </ScrollView>
            <ActivityIndicator size="large" color="#00ff00" animating={animate} />
        </View>
    );
}