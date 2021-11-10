import * as React from 'react';
import { Keyboard, ScrollView, SectionList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StyleSheet, Button, Alert } from "react-native";
import { Header } from 'react-native-elements/dist/header/Header';
import { BottomSheet, Icon, Input } from 'react-native-elements'
import { ListItem, Avatar, Badge } from 'react-native-elements'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../../../action/message.action';
import EmojiSelector from 'react-native-emoji-selector'
export default function ChatContent({ navigation, route }) {

    const styles = StyleSheet.create({
        avatar: {
            borderRadius: 1
        },
        container: {
            flex: 1
        },
        chatInput: {
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            height: 55,
            borderWidth: 1,
            borderColor: 'white',
            borderTopColor: '#D8D8D8',
            flexDirection: 'row',
        }
    });
    const list = [
        {
            name: route.params.name,
            avatar_url: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/84716000_238082947203821_6433588429308559360_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vwNfbOyKw_oAX_A7PE-&_nc_ht=scontent.fsgn8-2.fna&oh=a19307606ed7a1ddfc5332c564b8254a&oe=619E2799',
            subtitle: 'Đi khách với em k anh'
        },
        {
            name: route.params.name,
            avatar_url: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/84716000_238082947203821_6433588429308559360_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vwNfbOyKw_oAX_A7PE-&_nc_ht=scontent.fsgn8-2.fna&oh=a19307606ed7a1ddfc5332c564b8254a&oe=619E2799',
            subtitle: 'Đi đi mà'
        },
    ]
    const today = new Date();
    const time =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        " " +
        today.getHours() +
        ":" +
        today.getMinutes();
    const [emojiStaus, setEmojiStatus] = useState(false);
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);
    const [chatInputContent, setChatInputContent] = useState("");


    const onChangeChatInput = (text) => {
        setChatInputContent(text);
    }

    const onChangeEmoji = (emoji) => {
        setChatInputContent(chatInputContent + emoji);
    }

    const handleMessageKeyPressEvent = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (chatInputContent != "") {
            const messageText = {
                status: "send",
                content: chatInputContent.trim(),
                image: null,
                file: null,
                roomChatId: 1,
                time,
                userId: 1,
            };
            setChatInputContent("");
            dispatch(actions.addMessage(messageText));
            console.log(messageText);
        }
    }

    return (
        <View style={styles.container}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                barStyle="light-content"
                centerComponent={{ text: route.params.name, style: { color: '#fff' } }}
                leftComponent={
                    < Icon
                        name='chevron-left'
                        type='font-awesome-5'
                        color={'white'}
                        size={25}
                        onPress={() => navigation.goBack()}
                        Title="Go"
                    />
                }
                rightComponent={<Icon
                    name='bars'
                    type='font-awesome-5'
                    color={'white'}
                    size={25}
                />}
                containerStyle={{
                    backgroundColor: '#098524',
                    justifyContent: 'space-around',
                }}
            />
            <ScrollView>
                {
                    list.map((l, i) => (
                        <ListItem.Swipeable key={i}
                        >
                            <Avatar rounded size={50} source={{ uri: l.avatar_url }} />
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem.Swipeable>
                    ))
                }
            </ScrollView>
            <View>
                <View style={styles.chatInput}>
                    <View>
                        <TouchableOpacity onPress={() => setEmojiStatus(!emojiStaus)}>
                            <Icon
                                reverseColor=''
                                name='smile'
                                type='font-awesome-5'
                                color='black'
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TextInput multiline={true} placeholder="Nhập tin nhắn"
                            value={chatInputContent}
                            onChangeText={(text) => onChangeChatInput(text)}
                            onKeyPress={(e) => handleMessageKeyPressEvent(e)}
                            autoFocus={true}
                            style={{
                                fontSize: 16,
                                height: 50
                            }}
                        />
                    </View>
                    <View >
                        <TouchableOpacity onPress={() => setIsVisible(true), sendMessage}>
                            <Icon
                                reverse={true}
                                reverseColor=''
                                name='location-arrow'
                                type='font-awesome-5'
                                color='#098524'
                                size={18}

                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {emojiStaus === true ? (
                    <EmojiSelector
                        onEmojiSelected={emoji => onChangeEmoji(emoji)}
                        columns={10}
                        showSearchBar={false}
                        style={{ height: 250 }}
                    />
                ) : (
                    <Text></Text>
                )}
            </View>
        </View>
    );
}