import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, Icon } from 'react-native-elements';

export default function Scanner({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const handleBarCodeScanned = ({ type, data }) => {
        navigation.navigate('DetailContact', { idDetail: data })
    };

    return (
        <View style={styles.container}>
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
            </Camera>
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
