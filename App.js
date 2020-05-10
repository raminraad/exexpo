// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {MenuProvider} from 'react-native-popup-menu';
import {HomeDrawerScreen} from "./src/screens/HomeDrawerScreen";


const LoginStack = createStackNavigator();

function App() {
    return (
        <MenuProvider>
            <NavigationContainer>
                <LoginStack.Navigator initialRouteName="Login" screenOptions={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#E8F1F2',
                    },
                    headerTintColor: '#13293D',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}>
                    <LoginStack.Screen name="Home" component={HomeDrawerScreen}/>
                    <LoginStack.Screen name="Login" component={Login}/>
                    <LoginStack.Screen name="SignUp" component={SignUp}/>
                </LoginStack.Navigator>
            </NavigationContainer>
        </MenuProvider>
    );
}

export default App;
