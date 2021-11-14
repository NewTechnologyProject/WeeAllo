import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, ListItem } from "react-native-elements";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { FlatGrid } from "react-native-super-grid";
import { Header } from "react-native-elements/dist/header/Header";

const GroupFile = ({ navigation }) => {
  const listMessages = useSelector((state) => state.roomchat.listMessages);
  const [listFiles, setListFiles] = useState([]);

  useEffect(() => {
    setListFiles([]);

    for (let message of listMessages) {
      if (message.file) {
        setListFiles((prevState) => {
          return [...prevState, { id: message.id, file: message.file }];
        });
      }
    }
  }, [listMessages]);

  const getFileName = (str) => {
    const str1 = str.split("/")[3];
    const str2 = str1.substring(str1.indexOf("-") + 1);
    return str2;
  };

  const getType = (str) => {
    const str1 = str.split(".")[5];
    return str1;
  };

  const getIconType = (url) => {
    const type = getType(url);
    let value;
    switch (type) {
      case "docx":
        value = "file-word-o";
        break;
      case "pdf":
        value = "file-pdf-o";
        break;
      case "ppt":
        value = "file-powerpoint-o";
        break;
      case "xls":
      case "csv":
        value = "file-excel-o";
        break;

      default:
        value = "file";
        break;
    }
    return value;
  };

  const backToGroupInformation = () => {
    navigation.navigate("GroupInformation");
  };

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        centerComponent={{
          text: "Tập tin",
          style: { color: "#fff" },
        }}
        leftComponent={
          <TouchableOpacity onPress={backToGroupInformation}>
            <Icon
              name="chevron-left"
              type="font-awesome-5"
              color={"white"}
              size={25}
            />
          </TouchableOpacity>
        }
        containerStyle={{
          backgroundColor: "#37b24d",
          justifyContent: "space-around",
        }}
      />

      {listFiles.length <= 0 && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>Chưa có tập tin</Text>
        </View>
      )}

      {listFiles.length > 0 && (
        <View>
          <FlatList
            data={listFiles}
            renderItem={(item) => {
              return (
                <TouchableOpacity>
                  <ListItem bottomDivider>
                    <Icon
                      name={getIconType(item.item.file)}
                      type={"font-awesome"}
                      color="#868e96"
                    />
                    <ListItem.Content>
                      <ListItem.Title>
                        {getFileName(item.item.file)}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
    color: "#adb5bd",
  },
  images: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 5,
  },
  imageContainer: { flex: 1, flexDirection: "column", margin: 2 },
  image: { height: 120 },
  gridView: {
    flex: 1,
  },
});

export default GroupFile;
