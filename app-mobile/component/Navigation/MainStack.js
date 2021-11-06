import * as React from 'react';
import Login from '../Authentication/Login';
import ChatContent from '../Screen/Chat/ChatScreen/ChatContent';
import DeviceContact from '../Screen/Contact/Tab/MyContact/DeviceContact';
import MyContact from '../Screen/Contact/Tab/MyContact/MyContact';
import TabRoute from './TabRoute';

export default function MainStack(Stack) {
    return (
        <>
            <Stack.Screen name="TabRoute" component={TabRoute} />
            <Stack.Screen name="ChatContent" component={ChatContent} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="MyContact" component={MyContact} />
            <Stack.Screen name="DeviceContact" component={DeviceContact} />
        </>
    );
}