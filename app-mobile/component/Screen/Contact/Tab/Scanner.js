import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Linking } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as RNImagePicker from 'expo-image-picker'

import { Button, Icon } from 'react-native-elements';
import { Dialog } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
export default function Scanner({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isActive, setIsActive] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [link, setLink] = useState('');
    const isFocused = useIsFocused();
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const toggleDialog1 = () => {
        setVisible1(!visible1);
    };
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const decode = async () => {
        try {
            const { status } = await RNImagePicker.requestMediaLibraryPermissionsAsync()
            console.log(status)
            if (status === 'granted') {
                const result = await RNImagePicker.launchImageLibraryAsync({
                    mediaTypes: RNImagePicker.MediaTypeOptions.All,
                })
                if (result && result.uri) {
                    const results = await BarCodeScanner.scanFromURLAsync(result.uri)
                    let regex = /^[0]{1}\d{9}$/
                    setIsActive(true);
                    if (regex.test(results[0].data)) {
                        navigation.navigate('DetailContact', { idDetail: results[0].data })
                    } else {
                        let re = /^(https?: \/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
                        if (re.test(results[0].data)) {
                            toggleDialog1()
                            setLink(results[0].data)
                        }
                        else {
                            Alert.alert("Kết quả tìm thấy: " + results[0].data)
                        }
                    }
                }
            }
        } catch (error) {
            console.debug(error)
        }
    }

    const handleBarCodeScanned = ({ type, data }) => {
        let regex = /^[0]{1}\d{9}$/
        setIsActive(true);
        if (regex.test(data)) {
            navigation.navigate('DetailContact', { idDetail: data })
        } else {
            let re = /^(https?: \/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
            if (re.test(data)) {
                toggleDialog1()
                setLink(data)
                console.log(data)
            }
            else {
                Alert.alert("Kết quả tìm thấy: " + data)
            }
        }
    };

    return (
        <View style={styles.container}>
            {
                isFocused &&
                <Camera style={styles.camera} type={type}
                    onBarCodeScanned={isActive ? undefined : handleBarCodeScanned}
                    style={[StyleSheet.absoluteFillObject]}
                >

                    <View style={styles.buttonContainer}>
                        <Icon
                            name="arrow-left"
                            type="font-awesome-5"
                            color={"white"}
                            size={25}
                            marginTop={23}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Icon
                                    raised
                                    name='image'
                                    type='font-awesome'
                                    color='black'
                                    onPress={decode} />
                                <Text style={{ color: 'white' }}>Chọn từ thư viện</Text>
                            </View>
                        </View>
                        {isActive && <Button
                            containerStyle={{
                                paddingBottom: 15,
                                alignContent: 'center',
                                alignItems: 'center'
                            }}
                            buttonStyle={{
                                height: 50,
                                width: 140,
                                borderRadius: 30,
                                borderColor: "#EEEEEE",
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }}
                            titleStyle={
                                {
                                    fontSize: 13,
                                    color: 'white'
                                }
                            }
                            title={'Quét lại 1 lần nữa'} onPress={() => setIsActive(false)} />}
                    </View>
                </Camera>
            }


            <Dialog
                isVisible={visible1}
                onBackdropPress={toggleDialog1}
            >
                <Dialog.Title title="Đây là một liên kết" />
                <Text>Chọn liên kết để đi đến trang này:</Text>
                <TouchableOpacity onPress={() => Linking.openURL(link)}>
                    <Text style={{ color: 'blue' }}>
                        {link}
                    </Text>
                </TouchableOpacity>
            </Dialog>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
