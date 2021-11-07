import * as React from 'react';
import { ScrollView, SectionList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StyleSheet, Alert } from "react-native";
import { ListItem, Avatar, Badge, ButtonGroup, Button } from 'react-native-elements'
import { useState } from 'react';
export default function SendContact({ navigation, route }) {
    const styles = StyleSheet.create({
        avatar: {
            borderRadius: 1
        },
        container: {
            flex: 1
        },
        chatInput: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            height: 55,
            borderWidth: 1,
            borderColor: 'white',
            borderTopColor: '#D8D8D8',
            flexDirection: 'row',
        },
        viewStyle: {
            flexDirection: 'row',
        },
    });
    const list = [
        {
            name: 'Nam Bùi',
            avatar_url: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/84716000_238082947203821_6433588429308559360_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vwNfbOyKw_oAX_A7PE-&_nc_ht=scontent.fsgn8-2.fna&oh=a19307606ed7a1ddfc5332c564b8254a&oe=619E2799',
            subtitle: 'Đi khách với em k anh'
        },
        {
            name: 'Nam Bùi',
            avatar_url: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/84716000_238082947203821_6433588429308559360_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vwNfbOyKw_oAX_A7PE-&_nc_ht=scontent.fsgn8-2.fna&oh=a19307606ed7a1ddfc5332c564b8254a&oe=619E2799',
            subtitle: 'Đi khách với em k anh'
        },
    ]
    const [isVisible, setIsVisible] = useState(false);
    const backToAllChat = () => {
        navigation.navigate('TabRoute')
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    list.map((l, i) => (
                        <ListItem.Swipeable key={i}
                        >
                            <Avatar rounded size={50} source={{ uri: l.avatar_url }} />
                            <ListItem.Content >
                                <ListItem.Title>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{"Đã gửi lời mời kết bạn !"}</ListItem.Subtitle>
                            </ListItem.Content>
                            <Button type="outline" title="Hủy lời mời"
                                containerStyle={{
                                    paddingTop: 5,
                                    paddingRight: 5
                                }}
                                buttonStyle={{
                                    height: 35,
                                    width: 90,
                                    borderColor: "#8B0016",
                                    borderRadius: 30,
                                    backgroundColor: '#8B0016',
                                }}
                                titleStyle={
                                    {
                                        fontSize: 13,
                                        color: '#ffffff'
                                    }
                                }
                            />
                        </ListItem.Swipeable>
                    ))
                }
            </ScrollView>
        </View>
    );
}