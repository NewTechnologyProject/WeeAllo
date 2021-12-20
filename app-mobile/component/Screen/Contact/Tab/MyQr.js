import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { Camera } from 'expo-camera';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon } from 'react-native-elements';
import ViewShot from "react-native-view-shot";
import * as actions from "../../../../action/user.action"
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
export default function MyQr() {
    const dispatch = useDispatch()
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [userProfile, setUserProfile] = useState(null);
    const user = useSelector((state) => state.user.userAuth);
    const user1 = useSelector((state) => state.user.userById);
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
            const image_source = 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';
            FileSystem.downloadAsync(
                image_source,
                FileSystem.documentDirectory + '.png'
            )
                .then(({ uri }) => {
                    FileSystem.writeAsStringAsync(
                        uri,
                        data,
                        { 'encoding': FileSystem.EncodingType.Base64 }
                    )
                        .then(() => {
                            Sharing.shareAsync(uri);
                        })
                })
                .catch(error => {
                    console.error(error);
                });
        });

    }
    const dowloadQR = async () => {
        const res = await MediaLibrary.requestPermissionsAsync()
        if (res.granted) {
            ToastAndroid.showWithGravityAndOffset(
                `Đã lưu mã QR vào thư viện !`,
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50
            );
            svg.current.toDataURL((data) => {
                const filename = FileSystem.documentDirectory + "qr.png";
                FileSystem.writeAsStringAsync(filename, data, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                MediaLibrary.saveToLibraryAsync(filename);

            });
        }
    }
    return (
        <View>
            <ViewShot ref={viewShot} options={{ width: 100, height: 100, format: "jpg", quality: 1.0 }}>
                <View style={{ alignContent: 'center', alignItems: 'center', padding: 50 }}>
                    <QRCode
                        size={250}
                        value={userProfile !== null ? userProfile.phone : "123"}
                        getRef={(r) => (svg.current = r)}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Icon
                            raised
                            name='share'
                            type='font-awesome'
                            color='#37b24d'
                            onPress={shareQR} />
                        <Text>Chia sẻ</Text>
                    </View>
                    <View style={{ padding: 30 }}></View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Icon
                            raised
                            name='download'
                            type='font-awesome'
                            color='#37b24d'
                            onPress={dowloadQR} />
                        <Text>Tải về</Text>
                    </View>
                </View>
            </ViewShot>
        </View>
    );
}
