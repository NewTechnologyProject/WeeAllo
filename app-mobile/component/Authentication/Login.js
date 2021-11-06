import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon, Tab } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';
import imagePath from '../../constants/imagePath';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../../action/user.action'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: '30%',
        padding: 40,
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5
    },
    // img: {
    //     textAlign: 'center',
    // }
})

export default function Login({ navigation }) {
    const dispatch = useDispatch()
    const login = () => {
        navigation.navigate('TabRoute')
    }
    const getMyStringValue = async () => {
        try {
            const a = await AsyncStorage.getItem('user_authenticated')
            console.log(a)
        } catch (e) {
            // read error
        }

        console.log('Done.')

    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ĐĂNG NHẬP</Text>
            <Avatar size={60} source={imagePath.icLogo}
                containerStyle={{
                    marginBottom: 25
                }}
            />
            <Input
                placeholder='Nhập số điện thoại'
                leftIcon={
                    <Icon
                        name='user-alt'
                        type='font-awesome-5'
                        color={'#098524'}
                        style={{ paddingRight: 15 }}
                    />
                }
            />
            <Input placeholder="Nhập mật khẩu" secureTextEntry={true}
                leftIcon={
                    <Icon
                        name='key'
                        type='font-awesome-5'
                        color={'#098524'}
                        style={{ paddingRight: 15 }}
                    />
                }
            />
            <Button
                title="ĐĂNG NHẬP"
                type="outline"
                containerStyle={{
                    backgroundColor: '#098524',
                    borderRadius: 20,
                    border: 'none',
                    width: '100%',
                    color: 'white'
                }}
                titleStyle={
                    {
                        color: 'white'
                    }
                }
                onPress={() =>
                    login()
                }
            />
        </View>
    );
}
