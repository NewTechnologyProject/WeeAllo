<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Route from './component/Navigation/Route';
import configureStore from './reducer/store';
import { Provider, useSelector } from "react-redux";
const store = configureStore()
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Route />
      </View>
    </Provider>
=======
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Fuck you bitch</Text>
      <StatusBar style="auto" />
    </View>
>>>>>>> 910de3c8e38f3bfe9d1617b12583767b9fdc66ad
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
=======
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
>>>>>>> 910de3c8e38f3bfe9d1617b12583767b9fdc66ad
  },
});
