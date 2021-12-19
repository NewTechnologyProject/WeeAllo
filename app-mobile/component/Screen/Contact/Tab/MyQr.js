import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-native-elements';
import ViewShot from "react-native-view-shot";
import * as actions from "../../../../action/user.action"
// import Share from 'react-native-share';
// import RNFS from "react-native link react-native-fs"
export default function MyQr() {
    const dispatch = useDispatch()
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [userProfile, setUserProfile] = useState(null);
    const user = useSelector((state) => state.user.userAuth);
    const user1 = useSelector((state) => state.user.userById);
    console.log(user)
    const viewShot = useRef(null);
    const svg = useRef();
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
    const shareQR = () => {
        svg.current.toDataURL((data) => {
            const shareImageBase64 = {
                title: "QR",
                message: "Ehi, this is my QR code",
                url: `data:image/png;base64,${data}`

            };
            // Share
            // console.log(data);
            // Share.s(shareImageBase64);
        });
    }
    return (
        <View>
            <ViewShot ref={viewShot} options={{ width: 100, height: 100, format: "jpg", quality: 1.0 }}>
                <View style={{ alignContent: 'center', alignItems: 'center', padding: 50 }}>
                    <QRCode
                        size={200}
                        value={userProfile !== null ? userProfile.phone : "123"}
                        getRef={(r) => (svg.current = r)}
                    />
                </View>
            </ViewShot>
            <Button onPress={shareQR} title="tải" />
        </View>
    );
}
