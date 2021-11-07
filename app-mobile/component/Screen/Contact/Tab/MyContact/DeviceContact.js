import React, { useEffect } from 'react';
import { Image, PermissionsAndroid, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from "react-native";
import { Header } from 'react-native-elements/dist/header/Header';
import { Button, Icon, ListItem, SearchBar } from 'react-native-elements'
import { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import imagePath from '../../../../../constants/imagePath';
import * as Contacts from 'expo-contacts';
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
    const [textSearch, setTextSearch] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    const backToAllChat = () => {
        navigation.navigate('TabRoute')
    }
    const [contacts, setContacts] = useState([])
    const getContactInDevice = () => {
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
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getContactInDevice()
        wait(2000).then(() => setRefreshing(false));
    }, []);
    console.log(contacts)
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
                    contacts.length ?
                        contacts.map((c, i) => (
                            <TouchableOpacity key={i}>
                                <ListItem
                                    containerStyle={{
                                        marginTop: -5,
                                    }}>
                                    <Icon
                                        reverse={true}
                                        reverseColor=''
                                        name='user-plus'
                                        type='font-awesome-5'
                                        color='#5cc8d7'
                                        size={20}
                                    />
                                    <ListItem.Content>
                                        <ListItem.Title>{c.firstName && c.lastName ? c.firstName + " " + c.lastName : c.firstName}</ListItem.Title>
                                        <ListItem.Subtitle>{c.phoneNumbers ? c.phoneNumbers[0].number : "o"}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            </TouchableOpacity>

                        )) :
                        <View style={styles.container}>
                            <Image source={imagePath.info}
                                style={{ width: 200, height: 400 }}
                            />
                            <Text style={{ textAlign: 'center' }}>Kiểm tra danh bạ của bạn xem các tài khoản đã tham gia WeeAllo</Text>
                            <Button type="outline" title="KIỂM TRA DANH BẠ"
                                onPress={getContactInDevice}
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
        </View>
    );
}