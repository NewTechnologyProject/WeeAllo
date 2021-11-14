import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-native-elements';
import ViewShot from "react-native-view-shot";
import * as actions from "../../../../action/user.action"
export default function MyQr() {
    const dispatch = useDispatch()
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [userProfile, setUserProfile] = useState(null);
    const user = useSelector((state) => state.user.userAuth);
    const user1 = useSelector((state) => state.user.userById);
    console.log(user)
    const viewShot = useRef(null);
    const onSave = () => {
        console.log(userProfile)
    }
    useEffect(() => {
        dispatch(actions.findByIdUser(1));
    }, [])
    useEffect(() => {
        if (user1) {
            setUserProfile(user1)
        }
    })
    return (
        <View>
            <ViewShot ref={viewShot} options={{ width: 100, height: 100, format: "jpg", quality: 1.0 }}>
                <View style={{ alignContent: 'center', alignItems: 'center', padding: 50 }}>
                    <QRCode
                        size={200}
                        value={userProfile !== null ? userProfile.phone : "123"}
                    />
                </View>
            </ViewShot>
            <Button title="a" onPress={onSave} />
        </View>
    );
}
