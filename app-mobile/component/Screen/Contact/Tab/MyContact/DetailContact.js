import {
    Alert,
    Image,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Header } from "react-native-elements/dist/header/Header";
import { Avatar, Badge, Icon } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Button } from "react-native-elements/dist/buttons/Button";
import imagePath, * as cover from "../../../../../constants/imagePath.js"
import * as actions from "../../../../../action/contact.action"
export default function DetailContact({ navigation, route, props }) {
    const styles = StyleSheet.create({
        container: {
            borderRadius: 1,
            alignContent: 'center',
            alignItems: 'center',
            marginTop: -50
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
        },
        modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            marginLeft: 10
        },
        buttonOpen: {
            backgroundColor: "#F194FF",
        },
        buttonClose: {
            backgroundColor: "#2196F3",
        },
        textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center"
        }
    });
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.contact.detailContact);
    const [detailContact, setDetailContact] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [change, setChange] = useState(false);
    const [change1, setChange1] = useState(1);
    const [change2, setChange2] = useState(false);
    const { idDetail } = route.params;
    useEffect(() => {
        if (detail !== undefined) {
            setDetailContact(detail);
        }
    }, [detail]);
    console.log(idDetail)
    useEffect(() => {
        dispatch(actions.findUserByPhone(idDetail, 1));
    }, [])
    const renderButton = (status, id, lastname, firstname) => {
        if (status === 'none') {
            return (
                !change ?
                    <View style={{ flexDirection: 'row' }}>
                        <Button type="outline" title="Gửi lời mời kết bạn"
                            containerStyle={{
                                paddingTop: 5,
                                paddingRight: 10
                            }}
                            buttonStyle={{
                                height: 35,
                                width: 140,
                                borderRadius: 30,
                                borderColor: "#000066",
                                backgroundColor: '#000066',
                            }}
                            titleStyle={
                                {
                                    fontSize: 13,
                                    color: 'white'
                                }
                            }
                            onPress={() => {
                                setChange(true)
                                dispatch(actions.addContact(1, id))
                                Alert.alert(
                                    "Bạn bè",
                                    "Đã gửi lời mời kết bạn đến " + firstname + " " + lastname,
                                    [
                                        {
                                            text: "Xác nhận",
                                            style: "default"
                                        },
                                    ]
                                );
                            }
                            }
                        />
                    </View> :
                    <View style={{ flexDirection: 'row' }}>
                        <Button type="outline" title="Hủy lời mời đã gửi"
                            containerStyle={{
                                paddingTop: 5,
                                paddingRight: 10
                            }}
                            buttonStyle={{
                                height: 35,
                                width: 140,
                                borderRadius: 30,
                                borderColor: "#AA0000",
                                backgroundColor: '#AA0000',
                            }}
                            titleStyle={
                                {
                                    fontSize: 13,
                                    color: 'white'
                                }
                            }
                            onPress={() => {
                                setChange(!change)
                                dispatch(actions.deleteSendContact(1, id))
                                Alert.alert(
                                    "Bạn bè",
                                    "Đã hủy lời mời đã gửi đến " + firstname + " " + lastname,
                                    [
                                        {
                                            text: "Xác nhận",
                                            style: "default"
                                        },
                                    ]
                                );
                            }
                            }
                        />
                    </View>
            )
        }
        else if (status === 'friend') {
            if (change1 === 1) {
                return (
                    <View>
                        <Button type="outline" title="Xóa bạn"
                            containerStyle={{
                                paddingTop: 5,
                                paddingRight: 10
                            }}
                            buttonStyle={{
                                height: 35,
                                width: 140,
                                borderRadius: 30,
                                borderColor: "#000066",
                                backgroundColor: '#000066',
                            }}
                            titleStyle={
                                {
                                    fontSize: 13,
                                    color: 'white'
                                }
                            }
                            onPress={() => setModalVisible(true)}
                        />
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Xóa người bạn này khỏi danh sách bạn bè</Text>
                                    <View style={{ flexDirection: "row", padding: 20 }}>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => {
                                                setModalVisible(!modalVisible)
                                                dispatch(actions.deleteAllContact(1, id));
                                                setChange1(3)
                                                Alert.alert(
                                                    "Bạn bè",
                                                    "Đã xóa " + firstname + " " + lastname + " ra khỏi danh sách bạn bè",
                                                    [
                                                        {
                                                            text: "Xác nhận",
                                                            style: "default"
                                                        },
                                                    ]
                                                );
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Đồng ý</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}>Hủy</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )
            }
            else if (change1 === 3) {
                return (
                    <Button type="outline" title="Gửi lời mời kết bạn"
                        containerStyle={{
                            paddingTop: 5,
                            paddingRight: 10
                        }}
                        buttonStyle={{
                            height: 35,
                            width: 140,
                            borderRadius: 30,
                            borderColor: "#000066",
                            backgroundColor: '#000066',
                        }}
                        titleStyle={
                            {
                                fontSize: 13,
                                color: 'white'
                            }
                        }
                        onPress={() => {
                            setChange1(4)
                            dispatch(actions.addContact(1, id))
                            Alert.alert(
                                "Bạn bè",
                                "Đã gửi lời mời kết bạn đến " + firstname + " " + lastname,
                                [
                                    {
                                        text: "Xác nhận",
                                        style: "default"
                                    },
                                ]
                            );
                        }
                        }
                    />
                )
            }
            else if (change1 === 4) {
                return (
                    <Button type="outline" title="Hủy lời mời đã gửi"
                        containerStyle={{
                            paddingTop: 5,
                            paddingRight: 10
                        }}
                        buttonStyle={{
                            height: 35,
                            width: 140,
                            borderRadius: 30,
                            borderColor: "#AA0000",
                            backgroundColor: '#AA0000',
                        }}
                        titleStyle={
                            {
                                fontSize: 13,
                                color: 'white'
                            }
                        }
                        onPress={() => {
                            setChange1(3)
                            dispatch(actions.deleteSendContact(1, id))
                            Alert.alert(
                                "Bạn bè",
                                "Đã hủy lời mời kết bạn đến " + firstname + " " + lastname,
                                [
                                    {
                                        text: "Xác nhận",
                                        style: "default"
                                    },
                                ]
                            );
                        }
                        }
                    />
                )
            }
        }
        else if (status === 'receive') {
            return (
                !change ?
                    <View style={{ flexDirection: 'row' }}>
                        <Button type="outline" title="Hủy lời mời đã gửi"
                            containerStyle={{
                                paddingTop: 5,
                                paddingRight: 10
                            }}
                            buttonStyle={{
                                height: 35,
                                width: 140,
                                borderRadius: 30,
                                borderColor: "#AA0000",
                                backgroundColor: '#AA0000',
                            }}
                            titleStyle={
                                {
                                    fontSize: 13,
                                    color: 'white'
                                }
                            }
                            onPress={() => {
                                setChange(false)
                                dispatch(actions.deleteSendContact(1, id))
                                Alert.alert(
                                    "Bạn bè",
                                    "Đã hủy lời mời kết bạn đến " + firstname + " " + lastname,
                                    [
                                        {
                                            text: "Xác nhận",
                                            style: "default"
                                        },
                                    ]
                                );
                            }
                            }
                        />
                    </View> :
                    <Button type="outline" title="Gửi lời mời kết bạn"
                        containerStyle={{
                            paddingTop: 5,
                            paddingRight: 10
                        }}
                        buttonStyle={{
                            height: 35,
                            width: 140,
                            borderRadius: 30,
                            borderColor: "#000066",
                            backgroundColor: '#000066',
                        }}
                        titleStyle={
                            {
                                fontSize: 13,
                                color: 'white'
                            }
                        }
                        onPress={() => {
                            setChange(true)
                            dispatch(actions.addContact(1, id))
                            Alert.alert(
                                "Bạn bè",
                                "Đã gửi lời mời kết bạn đến " + firstname + " " + lastname,
                                [
                                    {
                                        text: "Xác nhận",
                                        style: "default"
                                    },
                                ]
                            );
                        }
                        }
                    />
            )
        }
        else if (status === 'send') {
            if (change1 === 1) {
                return (
                    <View style={{ flexDirection: 'row' }}>
                        <Button type="outline" title="Đồng ý kết bạn"
                            containerStyle={{
                                paddingTop: 5,
                                paddingRight: 10
                            }}
                            buttonStyle={{
                                height: 35,
                                width: 140,
                                borderRadius: 30,
                                borderColor: "#004dcf",
                                backgroundColor: '#004dcf',
                            }}
                            titleStyle={
                                {
                                    fontSize: 13,
                                    color: 'white'
                                }
                            }
                            onPress={() => {
                                setChange1(2)
                                dispatch(actions.acceptContact(id, 1))
                                Alert.alert(
                                    "Bạn bè",
                                    "Đã trở thành bạn bè với " + firstname + " " + lastname,
                                    [
                                        {
                                            text: "Xác nhận",
                                            style: "default"
                                        },
                                    ]
                                );
                            }
                            }
                        />
                        <Button type="outline" title="Từ chối lời mời"
                            containerStyle={{
                                paddingTop: 5,
                                paddingRight: 10
                            }}
                            buttonStyle={{
                                height: 35,
                                width: 140,
                                borderRadius: 30,
                                borderColor: "#ff9800",
                                backgroundColor: '#ff9800',
                            }}
                            titleStyle={
                                {
                                    fontSize: 13,
                                    color: 'white'
                                }
                            }
                            onPress={() => {
                                setChange1(3)
                                //dispatch(actions.deleteReceiveContact(1, id))
                                Alert.alert(
                                    "Bạn bè",
                                    "Đã từ chối trở thành bạn bè với " + firstname + " " + lastname,
                                    [
                                        {
                                            text: "Xác nhận",
                                            style: "default"
                                        },
                                    ]
                                );
                            }}
                        />
                    </View>
                )
            }
            if (change1 === 2) {
                return (
                    <View>
                        <Button type="outline" title="Xóa bạn"
                            containerStyle={{
                                paddingTop: 5,
                                paddingRight: 10
                            }}
                            buttonStyle={{
                                height: 35,
                                width: 140,
                                borderRadius: 30,
                                borderColor: "#000066",
                                backgroundColor: '#000066',
                            }}
                            titleStyle={
                                {
                                    fontSize: 13,
                                    color: 'white'
                                }
                            }
                            onPress={() => setModalVisible(true)}
                        />
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Xóa người bạn này khỏi danh sách bạn bè</Text>
                                    <View style={{ flexDirection: "row", padding: 20 }}>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => {
                                                setModalVisible(!modalVisible)
                                                dispatch(actions.deleteAllContact(1, id));
                                                setChange1(3)
                                                Alert.alert(
                                                    "Bạn bè",
                                                    "Đã xóa " + firstname + " " + lastname + " ra khỏi danh sách bạn bè",
                                                    [
                                                        {
                                                            text: "Xác nhận",
                                                            style: "default"
                                                        },
                                                    ]
                                                );
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Đồng ý</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}>Hủy</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )
            }
            else if (change1 === 3) {
                return (
                    <Button type="outline" title="Gửi lời mời kết bạn"
                        containerStyle={{
                            paddingTop: 5,
                            paddingRight: 10
                        }}
                        buttonStyle={{
                            height: 35,
                            width: 140,
                            borderRadius: 30,
                            borderColor: "#000066",
                            backgroundColor: '#000066',
                        }}
                        titleStyle={
                            {
                                fontSize: 13,
                                color: 'white'
                            }
                        }
                        onPress={() => {
                            setChange1(4)
                            dispatch(actions.addContact(1, id))
                            Alert.alert(
                                "Bạn bè",
                                "Đã gửi lời mời kết bạn đến " + firstname + " " + lastname,
                                [
                                    {
                                        text: "Xác nhận",
                                        style: "default"
                                    },
                                ]
                            );
                        }
                        }
                    />
                )
            }
            else if (change1 === 4) {
                return (
                    <Button type="outline" title="Hủy lời mời đã gửi"
                        containerStyle={{
                            paddingTop: 5,
                            paddingRight: 10
                        }}
                        buttonStyle={{
                            height: 35,
                            width: 140,
                            borderRadius: 30,
                            borderColor: "#AA0000",
                            backgroundColor: '#AA0000',
                        }}
                        titleStyle={
                            {
                                fontSize: 13,
                                color: 'white'
                            }
                        }
                        onPress={() => {
                            setChange1(3)
                            dispatch(actions.deleteSendContact(1, id))
                            Alert.alert(
                                "Bạn bè",
                                "Đã hủy lời mời kết bạn đến " + firstname + " " + lastname,
                                [
                                    {
                                        text: "Xác nhận",
                                        style: "default"
                                    },
                                ]
                            );
                        }
                        }
                    />
                )
            }
        }
        else if (status === 'you') {
            return (
                <></>
            )
        }
    }
    console.log(detailContact)
    const renderStatus = (status) => {
        if (status === 'none') {
            return (
                !change ?
                    <Badge containerStyle={{ fontSize: 10 }} value="Chưa là bạn bè" status="error" />
                    : <Badge containerStyle={{ fontSize: 10 }} value="Đã gửi lời mời kết bạn" status="primary" />
            )
        }
        else if (status === 'friend') {
            if (change1 === 1) {
                return (
                    <Badge containerStyle={{ fontSize: 10 }} value="Bạn bè" status="success" />
                )
            }
            else if (change1 === 3) {
                return (
                    <Badge containerStyle={{ fontSize: 10 }} value="Chưa là bạn bè" status="error" />
                )
            }
            else if (change1 === 4) {
                return (
                    <Badge containerStyle={{ fontSize: 10 }} value="Đã gửi lời mời kết bạn" status="primary" />
                )
            }
        }
        else if (status === 'receive') {
            return (
                !change ?
                    <Badge containerStyle={{ fontSize: 10 }} value="Đã gửi lời mời kết bạn" status="primary" /> :
                    <Badge containerStyle={{ fontSize: 10 }} value="Chưa là bạn bè" status="error" />
            )
        }
        else if (status === 'send') {
            if (change1 === 1) {
                return (
                    <Badge containerStyle={{ fontSize: 10 }} value="Đã nhận lời mời kết bạn" status="warning" />
                )
            }
            else if (change1 === 2) {
                return (
                    <Badge containerStyle={{ fontSize: 10 }} value="Bạn bè" status="success" />
                )
            }
            else if (change1 === 3) {
                return (
                    <Badge containerStyle={{ fontSize: 10 }} value="Chưa là bạn bè" status="error" />
                )
            }
            else if (change1 === 4) {
                return (
                    <Badge containerStyle={{ fontSize: 10 }} value="Đã gửi lời mời kết bạn" status="primary" />
                )
            }
        }
        else if (status === 'you') {
            return (
                <Badge containerStyle={{ fontSize: 10 }} value="Tài khoản của bạn" status="success" />
            )
        }
    }

    const backToAllChat = () => {
        navigation.goBack();
    };
    return (
        <View>
            <Header
                statusBarProps={{ barStyle: "light-content" }}
                barStyle="light-content"
                leftComponent={
                    <Icon
                        name="chevron-left"
                        type="font-awesome-5"
                        color={"white"}
                        size={25}
                        onPress={backToAllChat}
                    />
                }
                containerStyle={{
                    backgroundColor: "#37b24d",
                    justifyContent: "space-around",
                }}
            />
            <View style={{ height: 200, backgroundColor: 'black', width: '100%' }}>
                <Image source={imagePath.coverImage} style={{ height: "100%", width: "100%" }} />
            </View>
            <View style={styles.container}>
                <Avatar
                    size={100}
                    rounded
                    source={{
                        uri:
                            detailContact ? detailContact.avartar : "https://file-upload-weeallo-02937.s3.ap-southeast-1.amazonaws.com/1635056501152-user.png",
                    }}
                />
                <Text style={{ fontSize: 20 }}>{detailContact ? detailContact.firstname + " " + detailContact.lastname : "Người dùng"}</Text>

                {detailContact ? renderStatus(detailContact.status) : <></>}
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    {detailContact ? renderButton(detailContact.status, detailContact.id, detailContact.lastname, detailContact.firstname) : <></>}
                </View>
            </View>
        </View>
    );
}
