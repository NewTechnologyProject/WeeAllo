import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ToastAndroid, LogBox } from "react-native";
import Route from "./component/Navigation/Route";
import configureStore from "./reducer/store";
import { Provider, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";

// realtime
import { io } from "socket.io-client";
import { SOCKET_URL } from "./services/api.service";
// components

// ----------------------------------------------------------------------
const URL = SOCKET_URL;
const store = configureStore();

export default function App() {
  const user = 1;
  //Ignore all warning
  LogBox.ignoreAllLogs();
  const socket = useRef();
  useEffect(() => {
    socket.current = io(URL);
    socket.current.on("send", (data) => {
      if (data.userReceive === Number(user)) {
        ToastAndroid.showWithGravityAndOffset(
          `Bạn nhận được lời mời kết bạn từ ! ${data.userSend}`,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50
        );
      }
    });
  }, []);
  useEffect(() => {
    socket.current = io(URL);
    socket.current.on("accept", (data) => {
      if (data.userSend === Number(user)) {
        ToastAndroid.showWithGravityAndOffset(
          `Bạn đã trở thành bạn bè với ${data.userReceive} !`,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50
        );
      }
      console.log(data);
    });
  }, []);
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Route />
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
