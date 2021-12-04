import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Overlay, Button } from "react-native-elements";
import { Text, View, StyleSheet } from "react-native";

const FileAlert = (props) => {
  return (
    <Overlay
      isVisible={props.open}
      onBackdropPress={props.onClose}
      overlayStyle={styles.overlay}
    >
      <View style={styles.container}>
        <Text>Không thể gửi file có dung lượng lớn hơn 30MB</Text>

        <View style={styles.btns}>
          <Button
            type="clear"
            buttonStyle={styles.btn}
            titleStyle={{ color: "#868e96" }}
            title={"Hủy"}
            onPress={props.onClose}
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  overlay: {
    borderRadius: 10,
    width: "70%",
    height: "18%",
  },
  btns: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    padding: 10,
  },
  title: { color: "#37b24d" },
});

export default FileAlert;
