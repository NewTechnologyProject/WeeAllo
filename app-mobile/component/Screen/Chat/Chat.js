import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from "react-native";
import { ListItem, Avatar, Icon, SpeedDial } from 'react-native-elements'
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { useState } from 'react';
export default function Chat({ navigation }) {
    const [textSearch, setTextSearch] = useState('')
    const [open, setOpen] = useState(false)

    const styles = StyleSheet.create({
        avatar: {
            borderRadius: 1
        }
    });

    const list = [
        {
            name: 'Nam Bùi',
            avatar_url: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/84716000_238082947203821_6433588429308559360_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vwNfbOyKw_oAX_A7PE-&_nc_ht=scontent.fsgn8-2.fna&oh=a19307606ed7a1ddfc5332c564b8254a&oe=619E2799',
            subtitle: 'Đi khách với em k anh'
        },
        {
            name: 'Bùi Nam',
            avatar_url: 'https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.6435-9/70992407_2402905143369728_3337010892582682624_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ad2b24&_nc_ohc=TlHe4q5tX0QAX_PqyOI&_nc_ht=scontent.fsgn8-1.fna&oh=40e20e88ce13b1cebdfd93a4f514578d&oe=619ECDB2',
            subtitle: 'Quất em đi'
        },
        {
            name: 'Nam Thành Bùi',
            avatar_url: 'https://scontent.fsgn13-1.fna.fbcdn.net/v/t1.6435-9/71275484_555725115168480_5901479149981138944_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=ad2b24&_nc_ohc=yG6-UebJjEwAX-X-oyO&_nc_ht=scontent.fsgn13-1.fna&oh=44d94b3baba57e07a640ebd2c85c07c4&oe=61A3DAD7',
            subtitle: 'Em nhớ anh quá <3'
        },
        {
            name: 'Bùi Thành Nam',
            avatar_url: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/66426146_187649098913873_5774804080337616896_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=174925&_nc_ohc=wj7mJlm-ZY0AX8UxEX0&_nc_ht=scontent.fsgn8-2.fna&oh=ccc4c1758c2001405a79e4181f39f141&oe=61A20369',
            subtitle: 'Anh nhớ em k :))'
        },
        {
            name: 'Nam Bùi Thành',
            avatar_url: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/48429385_134897407522376_8759135099208859648_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=174925&_nc_ohc=LqyPurR1UFYAX8EHzUD&_nc_ht=scontent.fsgn4-1.fna&oh=cda97197288b808bc12d98f63e5bc622&oe=61A0E966',
            subtitle: 'Em ngại lắm'
        },
        {
            name: 'Nam Thành Bùi',
            avatar_url: 'https://scontent.fsgn13-1.fna.fbcdn.net/v/t1.6435-9/71275484_555725115168480_5901479149981138944_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=ad2b24&_nc_ohc=yG6-UebJjEwAX-X-oyO&_nc_ht=scontent.fsgn13-1.fna&oh=44d94b3baba57e07a640ebd2c85c07c4&oe=61A3DAD7',
            subtitle: 'Em nhớ anh quá <3'
        },
        {
            name: 'Bùi Thành Nam',
            avatar_url: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/66426146_187649098913873_5774804080337616896_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=174925&_nc_ohc=wj7mJlm-ZY0AX8UxEX0&_nc_ht=scontent.fsgn8-2.fna&oh=ccc4c1758c2001405a79e4181f39f141&oe=61A20369',
            subtitle: 'Anh nhớ em k :))'
        },
        {
            name: 'Bùi Thành Nam',
            avatar_url: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/66426146_187649098913873_5774804080337616896_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=174925&_nc_ohc=wj7mJlm-ZY0AX8UxEX0&_nc_ht=scontent.fsgn8-2.fna&oh=ccc4c1758c2001405a79e4181f39f141&oe=61A20369',
            subtitle: 'Anh nhớ em k :))'
        },

    ]


    const updateSearch = (search) => {
        setTextSearch(search);
    };
    return (
        <View style={styles.container}>
            <SearchBar
                platform='default'
                cancelButtonTitle=''
                placeholder="Tìm bạn bè..."
                onChangeText={setTextSearch}
                value={textSearch}
                inputContainerStyle={{
                    height: 55,
                    paddingTop: 27
                }}
                inputStyle={{
                    color: 'black'
                }}
                placeholderTextColor='black'
            />
            <ScrollView>
                {
                    list.map((l, i) => (
                        <TouchableOpacity key={i} >
                            <ListItem.Swipeable onPress={() => navigation.navigate('ChatContent', { name: l.name })} >
                                <Avatar rounded size={50} source={{ uri: l.avatar_url }} />
                                <ListItem.Content>
                                    <ListItem.Title>{l.name}</ListItem.Title>
                                    <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem.Swipeable>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <SpeedDial
                isOpen={open}
                icon={{ name: 'add', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
                color={'#098524'}
                containerStyle={{
                    marginBottom: 80,
                }}
            >
                <SpeedDial.Action
                    color={'#098524'}
                    icon={<Icon
                        name='user-plus'
                        type='font-awesome-5'
                        color='#ffffff'
                        size={15}
                    />}
                    title="Thêm bạn bè"
                    onPress={() => console.log('Add Something')}
                />
                <SpeedDial.Action
                    color={'#098524'}
                    icon={<Icon
                        name='users'
                        type='font-awesome-5'
                        color='#ffffff'
                        size={15}
                    />}
                    title="Thêm nhóm chat"
                    onPress={() => console.log('Delete Something')}
                />
            </SpeedDial>
        </View>
    );
}