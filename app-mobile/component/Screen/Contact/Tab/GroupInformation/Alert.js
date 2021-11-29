import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Overlay, Button } from "react-native-elements";
import { Text, View, StyleSheet } from "react-native";

const Alert = (props) => {
  const { visible, toggleOverlay, func, memberId } = props;

  const executeFunction = (func) => {
    if (func) {
      if (memberId) {
        func.function(memberId);
      } else {
        func.function();
      }
    }
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={styles.overlay}
    >
      <View style={styles.container}>
        {func && func.key === 1 && <Text>Bạn có chắc muốn rời nhóm?</Text>}
        {func && func.key === 2 && <Text>Bạn có chắc muốn xóa nhóm?</Text>}
        {func && func.key === 3 && (
          <Text>Bạn có chắc muốn mời thành viên này ra khỏi nhóm?</Text>
        )}
        <View style={styles.btns}>
          <Button
            type="clear"
            buttonStyle={styles.btn}
            titleStyle={styles.title}
            title={"Đồng ý"}
            onPress={executeFunction.bind(this, func)}
          />
          <Button
            type="clear"
            buttonStyle={styles.btn}
            titleStyle={{ color: "#868e96" }}
            title={"Hủy"}
            onPress={toggleOverlay.bind(this, func)}
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
    width: "60%",
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

export default Alert;
