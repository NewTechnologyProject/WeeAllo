import * as React from 'react';
import { ScrollView, SectionList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StyleSheet, Button, Alert } from "react-native";
import { Header } from 'react-native-elements/dist/header/Header';
import { BottomSheet, Icon, Input } from 'react-native-elements'
import { ListItem, Avatar, Badge } from 'react-native-elements'
import { useState } from 'react';
export default function ChatContent({ navigation, route }) {
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
        }
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
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                barStyle="light-content"
                centerComponent={{ text: 'ChatContent', style: { color: '#fff' } }}
                leftComponent={
                    < Icon
                        name='chevron-left'
                        type='font-awesome-5'
                        color={'white'}
                        size={25}
                        onPress={backToAllChat}
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
            <View style={styles.chatInput}>
                <View style={{ flex: 1 }}>
                    <TextInput multiline={true} placeholder="Nhập tin nhắn"
                        style={{
                            fontSize: 16,
                            height: 50
                        }}
                    />
                </View>
                <View >
                    <TouchableOpacity onPress={() => setIsVisible(true)}>
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
            <View style={styles.chatInput}>
                <View style={{ flex: 1 }}>
                    <TextInput multiline={true} placeholder="Nhập tin nhắn"
                        style={{
                            fontSize: 16,
                            height: 50
                        }}
                    />
                </View>
                <View >
                    <TouchableOpacity onPress={() => setIsVisible(true)}>
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
        </View>
    );
}