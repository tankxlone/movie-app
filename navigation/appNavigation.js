import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import SearchScreen from '../screens/SearchScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function RootLayoutTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
    );
}

function RootLayoutNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" options={{ headerShown: false }} component={RootLayoutTab} />
            <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
        </Stack.Navigator>
    );
}

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <RootLayoutNav />
        </NavigationContainer>
    );
}
