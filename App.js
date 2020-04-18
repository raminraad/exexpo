// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} options={{title: 'Login'}}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
