import * as React from 'react';
import Login from '../Authentication/Login';
import ChatContent from '../Screen/Chat/ChatScreen/ChatContent';
import TabRoute from './TabRoute';

export default function MainStack(Stack) {
    return (
        <>
            <Stack.Screen name="TabRoute" component={TabRoute} />
            <Stack.Screen name="ChatContent" component={ChatContent} />
            <Stack.Screen name="Login" component={Login} />
        </>
    );
}