import React, { useState, useEffect, useCallback } from "react";
import { ListItem, Avatar, Input, CheckBox } from "react-native-elements";
import {
  TouchableOpacity,
  TouchableHighlight,
  View,
  StyleSheet,
  FlatList,
} from "react-native";

const ListFriends = (props) => {
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const { listFriends, keyword, enableBtn, chosenMembers, selectMembers } =
    props;

  useEffect(() => {
    if (listFriends.length > 0) {
      setFriends([]);
      for (let friend of listFriends) {
        setFriends((prevState) => {
          return [...prevState, { ...friend, checked: false }];
        });
      }
    }
  }, [listFriends]);

  useEffect(() => {
    enableBtn(chosenMembers.length);
  }, [chosenMembers]);

  //Filter friends by keyword
  useEffect(() => {
    setFilteredFriends(friends);
    if (friends.length > 0 && keyword) {
      const demo = friends.filter((friend) => {
        const name = `${friend.firstname}${friend.lastname}`;
        return name.includes(keyword);
      });

      setFilteredFriends(demo);
    }
  }, [keyword, friends]);

  const getChosenMembers = (friend) => {
    if (!friend.checked) {
      selectMembers((prevState) => {
        return [...prevState, friend];
      });
    } else {
      const updatedListMember = chosenMembers.filter(
        (member) => member.id !== friend.id
      );

      selectMembers(updatedListMember);
    }
  };

  const onCheck = (id) => {
    let demo = friends;
    let friend = demo.find((friend) => friend.id === Number(id));

    //Add to chosenMembers
    getChosenMembers(friend);

    //set checked
    friend.checked = !friend.checked;
    setFriends([...demo]);
  };

  return (
    <FlatList
      data={filteredFriends}
      renderItem={(item) => {
        return (
          <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="#c3fae8"
            onPress={onCheck.bind(null, item.item.id)}
          >
            <ListItem>
              <Avatar
                rounded
                size={50}
                icon={{ name: "user", type: "font-awesome" }}
                source={{
                  uri: `${item.item.avartar ? item.item.avartar : "dummy.js"}`,
                }}
              />
              <ListItem.Content>
                <ListItem.Title>{`${item.item.firstname} ${item.item.lastname}`}</ListItem.Title>
              </ListItem.Content>
              <CheckBox
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={item.item.checked}
                onPress={onCheck.bind(null, item.item.id)}
                checkedColor="#37b24d"
              />
            </ListItem>
          </TouchableHighlight>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ListFriends;
