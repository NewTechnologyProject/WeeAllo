import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoute from './TabRoute';
import MainStack from './MainStack';

const Stack = createNativeStackNavigator();

export default function Route() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {MainStack(Stack)}
            </Stack.Navigator>
        </NavigationContainer>
    );
}