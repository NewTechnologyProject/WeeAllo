import * as React from 'react';
import ChatContent from '../Screen/Chat/ChatScreen/ChatContent';
import TabRoute from './TabRoute';

export default function MainStack(Stack) {
    return (
        <>
            <Stack.Screen name="TabRoute" component={TabRoute} />
            <Stack.Screen name="ChatContent" component={ChatContent} />
        </>
    );
}