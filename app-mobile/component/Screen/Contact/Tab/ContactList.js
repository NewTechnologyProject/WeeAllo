import React from "react";

import { ScrollView, SectionList, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { ListItem, Avatar } from "react-native-elements";
const styles = StyleSheet.create({
  container: {},
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default function ContactList() {
  const list = [
    {
      name: "Nam Bùi",
      avatar_url:
        "https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/84716000_238082947203821_6433588429308559360_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vwNfbOyKw_oAX_A7PE-&_nc_ht=scontent.fsgn8-2.fna&oh=a19307606ed7a1ddfc5332c564b8254a&oe=619E2799",
      subtitle: "Đi khách với em k anh",
    },
    {
      name: "Bùi Nam",
      avatar_url:
        "https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.6435-9/70992407_2402905143369728_3337010892582682624_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ad2b24&_nc_ohc=TlHe4q5tX0QAX_PqyOI&_nc_ht=scontent.fsgn8-1.fna&oh=40e20e88ce13b1cebdfd93a4f514578d&oe=619ECDB2",
      subtitle: "Quất em đi",
    },
    {
      name: "Nam Thành Bùi",
      avatar_url:
        "https://scontent.fsgn13-1.fna.fbcdn.net/v/t1.6435-9/71275484_555725115168480_5901479149981138944_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=ad2b24&_nc_ohc=yG6-UebJjEwAX-X-oyO&_nc_ht=scontent.fsgn13-1.fna&oh=44d94b3baba57e07a640ebd2c85c07c4&oe=61A3DAD7",
      subtitle: "Em nhớ anh quá <3",
    },
    {
      name: "Bùi Thành Nam",
      avatar_url:
        "https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/66426146_187649098913873_5774804080337616896_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=174925&_nc_ohc=wj7mJlm-ZY0AX8UxEX0&_nc_ht=scontent.fsgn8-2.fna&oh=ccc4c1758c2001405a79e4181f39f141&oe=61A20369",
      subtitle: "Anh nhớ em k :))",
    },
    {
      name: "Nam Bùi Thành",
      avatar_url:
        "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/48429385_134897407522376_8759135099208859648_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=174925&_nc_ohc=LqyPurR1UFYAX8EHzUD&_nc_ht=scontent.fsgn4-1.fna&oh=cda97197288b808bc12d98f63e5bc622&oe=61A0E966",
      subtitle: "Em ngại lắm",
    },
    {
      name: "Bùi Nam",
      avatar_url:
        "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/46756087_119658695712914_8390071866588397568_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_ohc=TrYP_VpZO6YAX_R-ROC&_nc_ht=scontent.fsgn4-1.fna&oh=f3061c30e2c3e85774d7d41315f837fc&oe=61A25529",
      subtitle: "Quất em đi",
    },
    {
      name: "Nam Bùi",
      avatar_url:
        "https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/84716000_238082947203821_6433588429308559360_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vwNfbOyKw_oAX_A7PE-&_nc_ht=scontent.fsgn8-2.fna&oh=a19307606ed7a1ddfc5332c564b8254a&oe=619E2799",
      subtitle: "Đi khách với em k anh",
    },
    {
      name: "Bùi Nam",
      avatar_url:
        "https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.6435-9/70992407_2402905143369728_3337010892582682624_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ad2b24&_nc_ohc=TlHe4q5tX0QAX_PqyOI&_nc_ht=scontent.fsgn8-1.fna&oh=40e20e88ce13b1cebdfd93a4f514578d&oe=619ECDB2",
      subtitle: "Quất em đi",
    },
    {
      name: "Nam Bùi",
      avatar_url:
        "https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/84716000_238082947203821_6433588429308559360_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vwNfbOyKw_oAX_A7PE-&_nc_ht=scontent.fsgn8-2.fna&oh=a19307606ed7a1ddfc5332c564b8254a&oe=619E2799",
      subtitle: "Đi khách với em k anh",
    },
    {
      name: "Bùi Nam",
      avatar_url:
        "https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.6435-9/70992407_2402905143369728_3337010892582682624_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ad2b24&_nc_ohc=TlHe4q5tX0QAX_PqyOI&_nc_ht=scontent.fsgn8-1.fna&oh=40e20e88ce13b1cebdfd93a4f514578d&oe=619ECDB2",
      subtitle: "Quất em đi",
    },
    {
      name: "Bùi Nam",
      avatar_url:
        "https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.6435-9/70992407_2402905143369728_3337010892582682624_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ad2b24&_nc_ohc=TlHe4q5tX0QAX_PqyOI&_nc_ht=scontent.fsgn8-1.fna&oh=40e20e88ce13b1cebdfd93a4f514578d&oe=619ECDB2",
      subtitle: "Quất em đi",
    },
  ];
  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <ListItem
            containerStyle={{
              marginTop: -5,
            }}
          >
            <Icon
              reverse={true}
              reverseColor=""
              name="user-plus"
              type="font-awesome-5"
              color="#5cc8d7"
              size={20}
            />
            <ListItem.Content>
              <ListItem.Title>{"Lời mời kết bạn"}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem
            topDivider
            containerStyle={{
              marginTop: -5,
            }}
          >
            <Icon
              reverse={true}
              reverseColor=""
              name="address-book"
              type="font-awesome-5"
              color="#447d00"
              size={20}
            />
            <ListItem.Content>
              <ListItem.Title>{"Duyệt trong danh bạ"}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <Text style={{ padding: 10 }}>Tất cả liên hệ</Text>
          {list.map((l, i) => (
            <ListItem.Swipeable key={i}>
              <Avatar rounded size={50} source={{ uri: l.avatar_url }} />
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
              </ListItem.Content>
              <Icon
                name="comment-dots"
                type="font-awesome-5"
                color="gray"
                size={20}
              />
            </ListItem.Swipeable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
