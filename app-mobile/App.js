import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Route from "./component/Navigation/Route";
import configureStore from "./reducer/store";
import { Provider, useSelector } from "react-redux";
const store = configureStore();
export default function App() {
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
