import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useState } from "react";
import ContactList from './Tab/ContactList';
import { Header } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ContactGroupList from './Tab/ContactGroupList';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

const Tab = createMaterialTopTabNavigator();
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
const theme = {
    Tab: {
        titleStyle: {
            color: 'red',
        },
        variant: {
            color: 'red'
        }

    },
};
export default function Contact() {
    const [textSearch, setTextSearch] = useState('')
    const [index, setIndex] = useState(0);
    return (
        <View style={styles.container}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                barStyle="light-content"
                centerComponent={<SearchBar
                    platform='default'
                    cancelButtonTitle=''
                    placeholder="Tìm bạn bè..."
                    onChangeText={setTextSearch}
                    value={textSearch}
                    inputStyle={{
                        color: 'black',
                        width: 300,
                    }}
                    containerStyle={{


                    }}
                    placeholderTextColor='black'
                />}
                containerStyle={{
                    backgroundColor: '#f2f2f2',
                    justifyContent: 'space-around',
                    height: 80

                }}
                centerContainerStyle={{
                    flex: 6
                }}
                leftContainerStyle={{
                    flex: 0
                }}
                rightContainerStyle={{
                    flex: 0
                }}
            />
            {/* <Header
                statusBarProps={{ barStyle: 'light-content' }}
                barStyle="light-content"
                componentStyle={
                    {
                        height: 50
                    }
                }
            // centerComponent={<SearchBar
            //     platform='default'
            //     cancelButtonTitle=''
            //     placeholder="Tìm bạn bè..."
            //     onChangeText={setTextSearch}
            //     value={textSearch}
            //     inputStyle={{
            //         color: 'black'
            //     }}
            //     placeholderTextColor='black'
            // />}
            centerContainerStyle={{
                padding: 0,
                margin: 0
            }}
            /> */}

            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarActiveTintColor: '#098524',
                    tabBarPressColor: 'black',
                    tabBarStyle: { backgroundColor: 'white' },
                }}
            >
                <Tab.Screen name="Liên hệ của tôi" component={ContactList} />
                <Tab.Screen name="Nhóm" component={ContactGroupList} />
            </Tab.Navigator>
        </View >
    );
}
