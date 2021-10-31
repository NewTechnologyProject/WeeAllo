import React from 'react';
import { ScrollView, SectionList, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { ListItem, Avatar } from 'react-native-elements'
const styles = StyleSheet.create({
    container: {
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})

export default function ContactGroupList() {
    const list = [
        {
            name: 'Những ông trùm React',
            avatar_url: 'https://reactjs.org/logo-og.png',
            subtitle: 'Lô tụi mày =))'
        },
        {
            name: 'Tiếp thị điện tử',
            avatar_url: 'https://s120-ava-grp-talk.zadn.vn/c/1/0/a/6/120/b42ef556b0dbb3a6dec0fd74d3b5914e.jpg',
            subtitle: 'Chơi bê đê k mấy anh'
        },
        {
            name: 'Công nghệ mới',
            avatar_url: 'https://scontent.fsgn13-1.fna.fbcdn.net/v/t1.6435-9/71275484_555725115168480_5901479149981138944_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=ad2b24&_nc_ohc=yG6-UebJjEwAX-X-oyO&_nc_ht=scontent.fsgn13-1.fna&oh=44d94b3baba57e07a640ebd2c85c07c4&oe=61A3DAD7',
            subtitle: 'Chào thầy'
        },
    ]
    return (
        <View style={styles.container}>
            <View>
                <ScrollView>

                    <ListItem
                        containerStyle={{
                            marginTop: -5,
                        }}>
                        <Icon
                            reverse={true}
                            reverseColor='#098524'
                            name='users'
                            type='font-awesome-5'
                            color='#d8dfe5'
                            size={20}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{"Tạo nhóm mới"}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <Text style={{ padding: 10 }}>Nhóm đang tham gia (3)</Text>
                    {
                        list.map((l, i) => (
                            <ListItem.Swipeable key={i}
                            >
                                <Avatar rounded size={50} source={{ uri: l.avatar_url }} />
                                <ListItem.Content>
                                    <ListItem.Title>{l.name}</ListItem.Title>
                                </ListItem.Content>
                                <Icon
                                    name='comment-dots'
                                    type='font-awesome-5'
                                    color='gray'
                                    size={20}
                                />
                            </ListItem.Swipeable>
                        ))
                    }
                </ScrollView>
            </View>

        </View>
    );
}
