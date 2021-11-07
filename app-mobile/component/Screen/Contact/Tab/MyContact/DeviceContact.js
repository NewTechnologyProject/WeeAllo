import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { StyleSheet } from "react-native";
import { Header } from 'react-native-elements/dist/header/Header';
import { Button, Icon } from 'react-native-elements'
import { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import imagePath from '../../../../../constants/imagePath';
const Tab = createMaterialTopTabNavigator();
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
    const list = [
        {
            name: 'Nam Bùi',
            avatar_url: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/84716000_238082947203821_6433588429308559360_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vwNfbOyKw_oAX_A7PE-&_nc_ht=scontent.fsgn8-2.fna&oh=a19307606ed7a1ddfc5332c564b8254a&oe=619E2799',
            subtitle: 'Đi khách với em k anh'
        },
        {
            name: 'Nam Bùi',
            avatar_url: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/84716000_238082947203821_6433588429308559360_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vwNfbOyKw_oAX_A7PE-&_nc_ht=scontent.fsgn8-2.fna&oh=a19307606ed7a1ddfc5332c564b8254a&oe=619E2799',
            subtitle: 'Đi khách với em k anh'
        }
    ]
    const [isVisible, setIsVisible] = useState(false);
    const backToAllChat = () => {
        navigation.navigate('TabRoute')
    }
    return (
        <View style={styles.container}>
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
            <Image source={imagePath.info}
                style={{ width: 200, height: 400 }}
            />
            <Text>Kiểm tra danh bạ của bạn xem các tài khoản đã tham gia WeeAllo</Text>
            <Button type="outline" title="KIỂM TRA DANH BẠ"
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
    );
}